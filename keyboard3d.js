/* ================================================================
   TypeHub — Integración Teclado 3D
   Renderer propio con Canvas 2D + proyección isométrica.
   Sin dependencias externas — cero CDNs, cero descargas.

   API pública expuesta en window.Keyboard3D:
     init3DKeyboard()           — monta la escena
     destroy3DKeyboard()        — desmonta escena y listeners
     update3DKeyboardOnKey(key) — anima la tecla indicada (string)
   ================================================================ */

(function (global) {
  'use strict';

  /* ================================================================
     LAYOUT QWERTY
     Cada fila es un array de { label, w } donde w = ancho en unidades.
     1u = ancho estándar de una tecla.
     ================================================================ */
  var ROWS = [
    [
      {l:'`',w:1},{l:'1',w:1},{l:'2',w:1},{l:'3',w:1},{l:'4',w:1},
      {l:'5',w:1},{l:'6',w:1},{l:'7',w:1},{l:'8',w:1},{l:'9',w:1},
      {l:'0',w:1},{l:'-',w:1},{l:'=',w:1},{l:'⌫',w:2}
    ],
    [
      {l:'Tab',w:1.5},{l:'q',w:1},{l:'w',w:1},{l:'e',w:1},{l:'r',w:1},
      {l:'t',w:1},{l:'y',w:1},{l:'u',w:1},{l:'i',w:1},{l:'o',w:1},
      {l:'p',w:1},{l:'[',w:1},{l:']',w:1},{l:'\\',w:1.5}
    ],
    [
      {l:'Caps',w:1.75},{l:'a',w:1},{l:'s',w:1},{l:'d',w:1},{l:'f',w:1},
      {l:'g',w:1},{l:'h',w:1},{l:'j',w:1},{l:'k',w:1},{l:'l',w:1},
      {l:';',w:1},{l:"'",w:1},{l:'↵',w:2.25}
    ],
    [
      {l:'Shift',w:2.25},{l:'z',w:1},{l:'x',w:1},{l:'c',w:1},{l:'v',w:1},
      {l:'b',w:1},{l:'n',w:1},{l:'m',w:1},{l:',',w:1},{l:'.',w:1},
      {l:'/',w:1},{l:'Shift',w:2.25}
    ],
    [
      {l:'Ctrl',w:1.25},{l:'Alt',w:1.25},{l:'Space',w:6.25},
      {l:'Alt',w:1.25},{l:'Ctrl',w:1.25}
    ]
  ];

  /* ── Mapa de teclas del DOM a etiquetas del layout ──────────── */
  var KEY_MAP = {
    ' ':         'Space',
    'Backspace': '⌫',
    'Enter':     '↵',
    'Tab':       'Tab',
    'CapsLock':  'Caps',
    'Control':   'Ctrl',
    'Alt':       'Alt',
    'Shift':     'Shift',
    'Meta':      'Ctrl',
  };

  function normalizeKey(key) {
    if (!key) return null;
    if (KEY_MAP[key])      return KEY_MAP[key];
    if (key.length === 1)  return key.toLowerCase();
    return null;
  }

  /* ================================================================
     LEER CSS VARS
     ================================================================ */
  var _tmp = null;
  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  function cssColorToRgb(css) {
    if (!_tmp) { _tmp = document.createElement('div'); _tmp.style.display='none'; document.body.appendChild(_tmp); }
    _tmp.style.color = css;
    var c = getComputedStyle(_tmp).color;
    var m = c.match(/[\d.]+/g);
    if (!m) return [58,60,64];
    return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
  }

  function rgbStr(arr, alpha) {
    if (alpha !== undefined) return 'rgba('+arr[0]+','+arr[1]+','+arr[2]+','+alpha+')';
    return 'rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
  }

  function mixRgb(a, b, t) {
    return [
      Math.round(a[0] + (b[0]-a[0])*t),
      Math.round(a[1] + (b[1]-a[1])*t),
      Math.round(a[2] + (b[2]-a[2])*t)
    ];
  }

  function lighten(rgb, amt) { return mixRgb(rgb, [255,255,255], amt); }
  function darken(rgb, amt)  { return mixRgb(rgb, [0,0,0], amt); }

  var COLORS = {};
  function readColors() {
    var bg3     = cssColorToRgb(cssVar('--bg-3'));
    var surface = cssColorToRgb(cssVar('--surface'));
    var accent  = cssColorToRgb(cssVar('--accent'));
    var textSub = cssColorToRgb(cssVar('--text-sub'));
    var text    = cssColorToRgb(cssVar('--text'));

    COLORS = {
      base:        bg3,
      baseTop:     lighten(bg3, 0.06),
      keycap:      surface,
      keycapTop:   lighten(surface, 0.14),
      keycapLeft:  darken(surface, 0.22),
      keycapFront: darken(surface, 0.12),
      legend:      textSub,
      legendActive:text,
      accent:      accent,
      accentTop:   lighten(accent, 0.20),
      accentLeft:  darken(accent, 0.25),
      accentFront: darken(accent, 0.15),
      shadow:      darken(bg3, 0.35),
    };
  }

  /* ================================================================
     ESTADO INTERNO
     ================================================================ */
  var _canvas      = null;
  var _ctx         = null;
  var _container   = null;
  var _animFrame   = null;
  var _initialized = false;
  var _resizeObs   = null;
  var _themeObs    = null;

  // Teclas actualmente presionadas: { label: pressTime (ms) }
  var _pressed     = {};
  var PRESS_DUR    = 180; // ms que dura el efecto "hundida"

  // Dimensiones de la escena calculadas en buildLayout()
  var _keys        = []; // [{ label, col, row, w, x, y, pressed }]
  var _layoutW     = 0;  // ancho total en unidades
  var _layoutH     = 0;  // alto total en unidades

  /* ================================================================
     PROYECCIÓN ISOMÉTRICA SIMPLIFICADA
     Usamos un eje axonométrico suave:
       x_screen =  (x - z) * cos30
       y_screen = -(x + z) * sin30 + y  (y = altura, sube al presionar)
     donde x,z son posición horizontal/profundidad, y = elevación.
     ================================================================ */
  var ISO_SCALE = 1; // se recalcula en resize

  // Ángulo de visión: ligera inclinación top-down
  var AX = Math.cos(Math.PI / 6) * 0.55;  // factor X horizontal
  var AZ = Math.sin(Math.PI / 6) * 0.42;  // factor Z vertical (profundidad)

  function isoProject(wx, wz, wy, scale) {
    // wx = posición X en unidades, wz = profundidad, wy = elevación
    var sx = (wx - wz * 0.3) * scale;
    var sy = (-wy - wz * AZ - wx * 0.08) * scale;
    return { x: sx, y: sy };
  }

  /* ================================================================
     CONSTRUCCIÓN DEL LAYOUT
     ================================================================ */
  var UNIT = 1;       // 1 unidad del mundo
  var GAP  = 0.08;    // espacio entre teclas
  var KEY_H_3D = 0.22; // altura del keycap (cara superior vs frontal)
  var KEY_DEPTH = 0.72; // profundidad visual de cada tecla

  function buildLayout() {
    _keys = [];
    var rowCount = ROWS.length;
    // Fila más ancha para centrado
    var maxW = 0;
    ROWS.forEach(function(row) {
      var w = row.reduce(function(acc,k){ return acc + k.w + GAP; }, -GAP);
      if (w > maxW) maxW = w;
    });
    _layoutW = maxW;
    _layoutH = rowCount * (UNIT + GAP) - GAP;

    ROWS.forEach(function(row, ri) {
      var rowW = row.reduce(function(acc,k){ return acc + k.w + GAP; }, -GAP);
      var xOff = (maxW - rowW) / 2; // centrar filas más cortas
      var zPos = ri * (UNIT + GAP);

      row.forEach(function(key) {
        _keys.push({
          label: key.l,
          x:     xOff + key.w / 2,  // centro X
          z:     zPos + UNIT / 2,    // centro Z (profundidad)
          w:     key.w,
          pressed: false,
          pressT: 0,
        });
        xOff += key.w + GAP;
      });
    });
  }

  /* ================================================================
     CÁLCULO DE ESCALA Y OFFSET PARA CENTRAR EN CANVAS
     ================================================================ */
  function computeTransform() {
    var cw = _canvas.width;
    var ch = _canvas.height;

    // Calcular bounding box de todos los puntos proyectados
    var minX=Infinity, maxX=-Infinity, minY=Infinity, maxY=-Infinity;
    var testScale = 40;

    _keys.forEach(function(k) {
      // 4 esquinas de la cara superior
      var corners = [
        [-k.w/2, 0, -UNIT/2],
        [ k.w/2, 0, -UNIT/2],
        [ k.w/2, 0,  UNIT/2],
        [-k.w/2, 0,  UNIT/2],
        // esquinas inferiores (frontal)
        [-k.w/2, -KEY_H_3D - KEY_DEPTH*AZ*testScale/testScale, UNIT/2],
        [ k.w/2, -KEY_H_3D - KEY_DEPTH*AZ*testScale/testScale, UNIT/2],
      ];
      corners.forEach(function(c) {
        var p = isoProject(k.x + c[0], k.z + c[2], c[1], testScale);
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
      });
    });

    var bboxW = maxX - minX;
    var bboxH = maxY - minY;
    var padding = 0.88; // margen
    var scale = Math.min(cw / bboxW, ch / bboxH) * padding;

    // Centro del canvas
    var cx = cw / 2 - (minX + bboxW/2) * scale;
    var cy = ch / 2 - (minY + bboxH/2) * scale;

    return { scale: scale, cx: cx, cy: cy };
  }

  var _transform = null;

  /* ================================================================
     DIBUJO DE UNA TECLA
     ================================================================ */
  function drawKey(ctx, key, tx, scale) {
    var t = Date.now();
    var pressAmt = 0;
    if (key.pressed) {
      var elapsed = t - key.pressT;
      if (elapsed < PRESS_DUR) {
        // ease-in-out
        var pct = elapsed / PRESS_DUR;
        pressAmt = pct < 0.5
          ? 2 * pct * pct
          : 1 - Math.pow(-2*pct+2,2)/2;
        pressAmt = Math.min(pressAmt, 1);
      } else {
        key.pressed = false;
        pressAmt = 0;
      }
    }

    var PRESS_SINK = 0.10 * pressAmt; // cuánto se hunde la tecla

    var kw = key.w;
    var kd = UNIT;       // profundidad de la tecla
    var kh = KEY_H_3D - PRESS_SINK;  // altura del keycap

    var x = key.x;
    var z = key.z;
    var y = kh; // elevación base (la cara superior está en y=kh)

    // ── Proyectar las 8 esquinas del keycap ──────────────────────
    // Cara superior (y = kh)
    var tl = isoProject(x - kw/2, z - kd/2, y, scale);
    var tr = isoProject(x + kw/2, z - kd/2, y, scale);
    var br = isoProject(x + kw/2, z + kd/2, y, scale);
    var bl = isoProject(x - kw/2, z + kd/2, y, scale);

    // Cara frontal inferior (y = 0)
    var fl = isoProject(x - kw/2, z + kd/2, 0, scale);
    var fr = isoProject(x + kw/2, z + kd/2, 0, scale);

    // Cara lateral derecha (y = 0)
    var rl = isoProject(x + kw/2, z - kd/2, 0, scale);

    // Offset de traslación
    var ox = tx.cx;
    var oy = tx.cy;

    var C = key.pressed ? COLORS.accent : COLORS.keycap;
    var Ct = key.pressed ? COLORS.accentTop   : COLORS.keycapTop;
    var Cl = key.pressed ? COLORS.accentLeft  : COLORS.keycapLeft;
    var Cf = key.pressed ? COLORS.accentFront : COLORS.keycapFront;

    // ── Sombra proyectada (muy sutil) ────────────────────────────
    ctx.save();
    ctx.globalAlpha = 0.18 - pressAmt * 0.10;
    ctx.fillStyle = rgbStr(COLORS.shadow);
    ctx.beginPath();
    ctx.moveTo(ox + bl.x + 2, oy + bl.y + 4);
    ctx.lineTo(ox + br.x + 2, oy + br.y + 4);
    ctx.lineTo(ox + fr.x + 2, oy + fr.y + 4);
    ctx.lineTo(ox + fl.x + 2, oy + fl.y + 4);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // ── Cara FRONTAL (facing viewer, parte inferior) ─────────────
    ctx.beginPath();
    ctx.moveTo(ox + bl.x, oy + bl.y);
    ctx.lineTo(ox + br.x, oy + br.y);
    ctx.lineTo(ox + fr.x, oy + fr.y);
    ctx.lineTo(ox + fl.x, oy + fl.y);
    ctx.closePath();
    ctx.fillStyle = rgbStr(Cf);
    ctx.fill();

    // ── Cara DERECHA (lateral visible) ───────────────────────────
    ctx.beginPath();
    ctx.moveTo(ox + tr.x, oy + tr.y);
    ctx.lineTo(ox + br.x, oy + br.y);
    ctx.lineTo(ox + fr.x, oy + fr.y);
    ctx.lineTo(ox + rl.x, oy + rl.y);
    ctx.closePath();
    ctx.fillStyle = rgbStr(Cl);
    ctx.fill();

    // ── Cara SUPERIOR ─────────────────────────────────────────────
    ctx.beginPath();
    ctx.moveTo(ox + tl.x, oy + tl.y);
    ctx.lineTo(ox + tr.x, oy + tr.y);
    ctx.lineTo(ox + br.x, oy + br.y);
    ctx.lineTo(ox + bl.x, oy + bl.y);
    ctx.closePath();

    // Gradiente sutil en la cara superior
    var gx1 = ox + tl.x, gy1 = oy + tl.y;
    var gx2 = ox + br.x, gy2 = oy + br.y;
    try {
      var grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
      grad.addColorStop(0,   rgbStr(lighten(Ct, 0.08)));
      grad.addColorStop(0.5, rgbStr(Ct));
      grad.addColorStop(1,   rgbStr(darken(Ct, 0.06)));
      ctx.fillStyle = grad;
    } catch(e) {
      ctx.fillStyle = rgbStr(Ct);
    }
    ctx.fill();

    // ── Borde sutil en cara superior ──────────────────────────────
    ctx.strokeStyle = rgbStr(darken(C, 0.35), 0.6);
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(ox + tl.x, oy + tl.y);
    ctx.lineTo(ox + tr.x, oy + tr.y);
    ctx.lineTo(ox + br.x, oy + br.y);
    ctx.lineTo(ox + bl.x, oy + bl.y);
    ctx.closePath();
    ctx.stroke();

    // ── Leyenda (letra de la tecla) ───────────────────────────────
    var labelColor = key.pressed ? rgbStr(COLORS.legendActive) : rgbStr(COLORS.legend);
    // Centro de la cara superior
    var cx2 = ox + (tl.x + tr.x + br.x + bl.x) / 4;
    var cy2 = oy + (tl.y + tr.y + br.y + bl.y) / 4 - scale * 0.02;

    var fontSize = Math.max(7, Math.min(scale * 0.22, 13));
    ctx.font = '500 ' + fontSize + 'px JetBrains Mono, monospace';
    ctx.fillStyle = labelColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    var label = key.label;
    // Teclas largas: mostrar solo primer token
    if (label === 'Space') label = '';
    else if (label.length > 3) label = label.slice(0,4);

    ctx.fillText(label, cx2, cy2);

    // ── Glow al presionar ─────────────────────────────────────────
    if (pressAmt > 0.05) {
      ctx.save();
      ctx.globalAlpha = pressAmt * 0.35;
      var glowGrad = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, scale * kw * 0.7);
      glowGrad.addColorStop(0,   rgbStr(COLORS.accent, 0.7));
      glowGrad.addColorStop(0.5, rgbStr(COLORS.accent, 0.25));
      glowGrad.addColorStop(1,   rgbStr(COLORS.accent, 0));
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.moveTo(ox + tl.x, oy + tl.y);
      ctx.lineTo(ox + tr.x, oy + tr.y);
      ctx.lineTo(ox + br.x, oy + br.y);
      ctx.lineTo(ox + bl.x, oy + bl.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  /* ================================================================
     DIBUJO DE LA BASE DEL TECLADO
     ================================================================ */
  function drawBase(ctx, tx) {
    var scale = tx.scale;
    var ox = tx.cx, oy = tx.cy;
    var pad = 0.28;
    var bh  = 0.18; // grosor de la base

    var x1 = -pad, x2 = _layoutW + pad;
    var z1 = -pad, z2 = _layoutH + pad;

    // Cara superior de la base (nivel y=0)
    var tl = isoProject(x1, z1, 0, scale);
    var tr = isoProject(x2, z1, 0, scale);
    var br = isoProject(x2, z2, 0, scale);
    var bl = isoProject(x1, z2, 0, scale);

    // Cara frontal
    var fl = isoProject(x1, z2, -bh, scale);
    var fr = isoProject(x2, z2, -bh, scale);
    // Cara lateral derecha
    var rl = isoProject(x2, z1, -bh, scale);

    // Cara frontal base
    ctx.beginPath();
    ctx.moveTo(ox+bl.x, oy+bl.y); ctx.lineTo(ox+br.x, oy+br.y);
    ctx.lineTo(ox+fr.x, oy+fr.y); ctx.lineTo(ox+fl.x, oy+fl.y);
    ctx.closePath();
    ctx.fillStyle = rgbStr(darken(COLORS.base, 0.20));
    ctx.fill();

    // Cara lateral base
    ctx.beginPath();
    ctx.moveTo(ox+tr.x, oy+tr.y); ctx.lineTo(ox+br.x, oy+br.y);
    ctx.lineTo(ox+fr.x, oy+fr.y); ctx.lineTo(ox+rl.x, oy+rl.y);
    ctx.closePath();
    ctx.fillStyle = rgbStr(darken(COLORS.base, 0.30));
    ctx.fill();

    // Cara superior base
    ctx.beginPath();
    ctx.moveTo(ox+tl.x, oy+tl.y); ctx.lineTo(ox+tr.x, oy+tr.y);
    ctx.lineTo(ox+br.x, oy+br.y); ctx.lineTo(ox+bl.x, oy+bl.y);
    ctx.closePath();
    ctx.fillStyle = rgbStr(COLORS.baseTop);
    ctx.fill();
  }

  /* ================================================================
     FONDO CON GRADIENTE
     ================================================================ */
  function drawBackground(ctx) {
    var w = _canvas.width, h = _canvas.height;
    var grad = ctx.createRadialGradient(w*0.5, h*0.4, 0, w*0.5, h*0.5, w*0.7);
    grad.addColorStop(0,   rgbStr(lighten(COLORS.base, 0.06)));
    grad.addColorStop(0.6, rgbStr(COLORS.base));
    grad.addColorStop(1,   rgbStr(darken(COLORS.base, 0.08)));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  /* ================================================================
     LOOP DE RENDERIZADO
     ================================================================ */
  var _needsRedraw = true; // redibuja cuando hay pulsaciones

  function renderFrame() {
    _animFrame = requestAnimationFrame(renderFrame);

    // Verificar si alguna tecla está animándose
    var anyActive = false;
    _keys.forEach(function(k) { if (k.pressed) anyActive = true; });

    if (!anyActive && !_needsRedraw) return;
    _needsRedraw = false;

    var ctx = _ctx;
    var tx  = _transform;
    if (!ctx || !tx) return;

    ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    drawBackground(ctx);
    drawBase(ctx, tx);

    // Dibujar teclas de atrás hacia adelante (orden Z)
    var sorted = _keys.slice().sort(function(a,b){ return a.z - b.z; });
    sorted.forEach(function(key) { drawKey(ctx, key, tx, tx.scale); });
  }

  /* ================================================================
     PRESIONAR TECLA
     ================================================================ */
  function pressKey(label) {
    _keys.forEach(function(k) {
      if (k.label === label) {
        k.pressed = true;
        k.pressT  = Date.now();
      }
    });
    _needsRedraw = true;

    // Programar liberación visual
    setTimeout(function() { _needsRedraw = true; }, PRESS_DUR + 20);
  }

  /* ================================================================
     RESIZE
     ================================================================ */
  function onResize() {
    if (!_container || !_canvas) return;
    var w = _container.clientWidth  || 900;
    var h = _container.clientHeight || 260;
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    _canvas.width  = w * dpr;
    _canvas.height = h * dpr;
    _canvas.style.width  = w + 'px';
    _canvas.style.height = h + 'px';
    _ctx.scale(dpr, dpr);
    _transform   = computeTransform();
    _needsRedraw = true;
  }

  /* ================================================================
     TEMA: observar cambios en body.classList
     ================================================================ */
  function watchTheme() {
    if (_themeObs) _themeObs.disconnect();
    _themeObs = new MutationObserver(function() {
      readColors();
      if (_container) _container.dataset.theme = getTheme();
      _needsRedraw = true;
    });
    _themeObs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  function getTheme() {
    var c = document.body.classList;
    if (c.contains('theme-nord'))    return 'nord';
    if (c.contains('theme-dracula')) return 'dracula';
    if (c.contains('theme-monokai')) return 'monokai';
    if (c.contains('theme-light'))   return 'light';
    return 'serika';
  }

  /* ================================================================
     LISTENER DE TECLADO
     ================================================================ */
  function _onKeyDown(e) {
    if (!_initialized) return;
    var label = normalizeKey(e.key);
    if (label) pressKey(label);
  }

  /* ================================================================
     API PÚBLICA
     ================================================================ */

  /**
   * init3DKeyboard()
   * Monta el canvas isométrico dentro de #keyboard3d-container.
   */
  function init3DKeyboard() {
    if (_initialized) return;

    _container = document.getElementById('keyboard3d-container');
    if (!_container) { console.warn('[Keyboard3D] #keyboard3d-container no encontrado'); return; }

    readColors();
    buildLayout();

    // Crear canvas
    _canvas = document.createElement('canvas');
    _canvas.style.display = 'block';
    _canvas.style.width   = '100%';
    _canvas.style.height  = '100%';
    _container.appendChild(_canvas);
    _ctx = _canvas.getContext('2d');

    onResize();
    renderFrame();

    // Resize observer
    _resizeObs = new ResizeObserver(function() { onResize(); });
    _resizeObs.observe(_container);

    // Tema
    watchTheme();
    _container.dataset.theme = getTheme();

    // Teclado
    document.addEventListener('keydown', _onKeyDown, { passive: true });

    _initialized = true;
    console.log('[Keyboard3D] Listo — renderer Canvas 2D isométrico.');
  }

  /**
   * update3DKeyboardOnKey(key)
   * Anima la tecla dada (puede llamarse desde fuera).
   */
  function update3DKeyboardOnKey(key) {
    if (!_initialized) return;
    pressKey(key);
  }

  /**
   * destroy3DKeyboard()
   * Desmonta la escena y libera recursos.
   */
  function destroy3DKeyboard() {
    if (!_initialized) return;

    cancelAnimationFrame(_animFrame);
    document.removeEventListener('keydown', _onKeyDown);
    if (_resizeObs) { _resizeObs.disconnect(); _resizeObs = null; }
    if (_themeObs)  { _themeObs.disconnect();  _themeObs  = null; }

    if (_canvas && _canvas.parentNode) _canvas.parentNode.removeChild(_canvas);
    if (_tmp && _tmp.parentNode) { _tmp.parentNode.removeChild(_tmp); _tmp = null; }

    _canvas = _ctx = _container = null;
    _keys   = [];
    _pressed = {};
    _transform = null;
    _initialized = false;
    console.log('[Keyboard3D] Destruido.');
  }

  global.Keyboard3D = { init3DKeyboard, update3DKeyboardOnKey, destroy3DKeyboard };

})(window);
