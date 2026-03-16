/* ================================================================
   TypeHub — Integración Teclado 3D
   Renderer Canvas 2D con proyección isométrica. Sin dependencias.

   API pública (window.Keyboard3D):
     init3DKeyboard()           — monta la escena
     destroy3DKeyboard()        — desmonta escena y listeners
     update3DKeyboardOnKey(key) — anima una tecla (string)
   ================================================================ */

(function (global) {
  'use strict';

  /* ── Layout QWERTY ────────────────────────────────────────────
     l = etiqueta visible, w = ancho en unidades (1u = tecla estándar)
  ──────────────────────────────────────────────────────────────── */
  var ROWS = [
    [{l:'`',w:1},{l:'1',w:1},{l:'2',w:1},{l:'3',w:1},{l:'4',w:1},{l:'5',w:1},
     {l:'6',w:1},{l:'7',w:1},{l:'8',w:1},{l:'9',w:1},{l:'0',w:1},{l:'-',w:1},
     {l:'=',w:1},{l:'⌫',w:2}],
    [{l:'Tab',w:1.5},{l:'q',w:1},{l:'w',w:1},{l:'e',w:1},{l:'r',w:1},
     {l:'t',w:1},{l:'y',w:1},{l:'u',w:1},{l:'i',w:1},{l:'o',w:1},{l:'p',w:1},
     {l:'[',w:1},{l:']',w:1},{l:'\\',w:1.5}],
    [{l:'Caps',w:1.75},{l:'a',w:1},{l:'s',w:1},{l:'d',w:1},{l:'f',w:1},
     {l:'g',w:1},{l:'h',w:1},{l:'j',w:1},{l:'k',w:1},{l:'l',w:1},
     {l:';',w:1},{l:"'",w:1},{l:'↵',w:2.25}],
    [{l:'Shift',w:2.25},{l:'z',w:1},{l:'x',w:1},{l:'c',w:1},{l:'v',w:1},
     {l:'b',w:1},{l:'n',w:1},{l:'m',w:1},{l:',',w:1},{l:'.',w:1},
     {l:'/',w:1},{l:'Shift',w:2.25}],
    [{l:'Ctrl',w:1.25},{l:'Alt',w:1.25},{l:'Space',w:6.25},
     {l:'Alt',w:1.25},{l:'Ctrl',w:1.25}]
  ];

  /* ── Mapa DOM key → etiqueta del layout ─────────────────────── */
  var KEY_MAP = {
    ' ':'Space','Backspace':'⌫','Enter':'↵','Tab':'Tab',
    'CapsLock':'Caps','Control':'Ctrl','Alt':'Alt','Shift':'Shift','Meta':'Ctrl'
  };

  function normalizeKey(k) {
    if (!k) return null;
    if (KEY_MAP[k]) return KEY_MAP[k];
    if (k.length === 1) return k.toLowerCase();
    return null;
  }

  /* ── Helpers de color ─────────────────────────────────────────
     Leemos los CSS vars y los convertimos a [r,g,b] para operar.
  ──────────────────────────────────────────────────────────────── */
  var _colorDiv = null;

  function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  function cssToRgb(css) {
    if (!_colorDiv) {
      _colorDiv = document.createElement('div');
      _colorDiv.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;';
      document.body.appendChild(_colorDiv);
    }
    _colorDiv.style.color = css;
    var c = getComputedStyle(_colorDiv).color;          // "rgb(r, g, b)"
    var m = c.match(/[\d.]+/g);
    return m ? [+m[0], +m[1], +m[2]] : [80, 80, 80];
  }

  function mix(a, b, t) {
    return [
      Math.round(a[0]+(b[0]-a[0])*t) | 0,
      Math.round(a[1]+(b[1]-a[1])*t) | 0,
      Math.round(a[2]+(b[2]-a[2])*t) | 0
    ];
  }

  function lighter(c, a) { return mix(c, [255,255,255], a); }
  function darker(c, a)   { return mix(c, [0,0,0], a); }

  function rgb(c, alpha) {
    if (alpha !== undefined) return 'rgba('+c[0]+','+c[1]+','+c[2]+','+alpha+')';
    return 'rgb('+c[0]+','+c[1]+','+c[2]+')';
  }

  /* Paleta activa — se rellena en readColors() */
  var C = {};

  function readColors() {
    var bg      = cssToRgb(cssVar('--bg-3'));
    var surface = cssToRgb(cssVar('--surface'));
    var accent  = cssToRgb(cssVar('--accent'));
    var sub     = cssToRgb(cssVar('--text-sub'));
    var text    = cssToRgb(cssVar('--text'));

    C.bg       = bg;
    C.bgLight  = lighter(bg, 0.10);
    C.bgDark   = darker(bg,  0.18);

    C.top      = lighter(surface, 0.18);
    C.front    = darker(surface,  0.14);
    C.side     = darker(surface,  0.26);

    C.aTop     = lighter(accent, 0.20);
    C.aFront   = darker(accent,  0.18);
    C.aSide    = darker(accent,  0.32);

    C.legend   = sub;
    C.legAct   = text;
    C.accent   = accent;
    C.shadow   = darker(bg, 0.40);

    C.baseTop  = lighter(bg, 0.07);
    C.baseFr   = darker(bg,  0.22);
    C.baseSide = darker(bg,  0.32);
  }

  /* ── Geometría de la escena ───────────────────────────────────
     Unidades del mundo: 1u = 1 tecla estándar (~18mm físicos)
     GAP   = espacio entre teclas
     KEY_H = altura visible del keycap (cara superior sobre la base)
     BASE  = grosor de la base del teclado
  ──────────────────────────────────────────────────────────────── */
  var GAP   = 0.09;
  var KEY_H = 0.26;
  var BASE  = 0.20;

  /* ── Proyección axonométrica ──────────────────────────────────
     wx,wz = posición en el plano del teclado (horizontal, profundidad)
     wy    = altura (positivo = arriba)
     Devuelve {x,y} en píxeles (sin escala ni offset aplicados todavía)
  ──────────────────────────────────────────────────────────────── */
  function proj(wx, wz, wy) {
    // Ángulo de visión: ~25° inclinación, ligeramente desde la derecha
    var sx =  wx * 0.90 - wz * 0.22;
    var sy = -wy * 0.90 - wx * 0.10 - wz * 0.55;
    return { x: sx, y: sy };
  }

  /* ── Datos del layout calculados ────────────────────────────── */
  var _keys   = [];  // [{label, x, z, w, pressed, pressT}]
  var _layoutW = 0;
  var _layoutH = 0;

  function buildLayout() {
    _keys = [];
    var maxW = 0;

    /* Calcular ancho de cada fila */
    var rowWidths = ROWS.map(function(row) {
      return row.reduce(function(acc, k) { return acc + k.w; }, 0) + (row.length - 1) * GAP;
    });
    rowWidths.forEach(function(w) { if (w > maxW) maxW = w; });
    _layoutW = maxW;
    _layoutH = ROWS.length + (ROWS.length - 1) * GAP;

    ROWS.forEach(function(row, ri) {
      /* Centrar la fila respecto a la más ancha */
      var xOff = (maxW - rowWidths[ri]) / 2;
      var zPos = ri * (1 + GAP);

      row.forEach(function(key) {
        _keys.push({
          label:   key.l,
          x:       xOff + key.w / 2,   // centro X de la tecla
          z:       zPos + 0.5,          // centro Z de la tecla (profundidad)
          w:       key.w,
          pressed: false,
          pressT:  0,
        });
        xOff += key.w + GAP;
      });
    });
  }

  /* ── Estado del canvas ────────────────────────────────────────*/
  var _canvas  = null;
  var _ctx     = null;
  var _cont    = null;    // el div #keyboard3d-container
  var _raf     = null;    // requestAnimationFrame handle
  var _inited  = false;
  var _dirty   = true;    // forzar primer frame

  /* Transform para centrar todo el teclado en el canvas */
  var _tx = { scale: 1, ox: 0, oy: 0 };

  /* ── Calcular transform (escala + offset) ─────────────────────
     Proyectamos todos los vértices con scale=1 para obtener el
     bounding-box real, luego escalamos para llenar el canvas.
  ──────────────────────────────────────────────────────────────── */
  function computeTransform(cw, ch) {
    var minX = Infinity, maxX = -Infinity;
    var minY = Infinity, maxY = -Infinity;

    function testPt(wx, wz, wy) {
      var p = proj(wx, wz, wy);
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }

    /* Esquinas de la base completa */
    var px = _layoutW / 2;
    var pz = _layoutH / 2;
    var pad = 0.30;
    [
      [-px-pad, -pz-pad, 0],  [px+pad, -pz-pad, 0],
      [px+pad,  pz+pad,  0],  [-px-pad, pz+pad, 0],
      [-px-pad, pz+pad, -BASE],[ px+pad, pz+pad, -BASE],
      [px+pad, -pz-pad, KEY_H],[-px-pad, -pz-pad, KEY_H],
    ].forEach(function(v) {
      testPt(v[0] + px, v[1] + pz, v[2]);
    });

    var bw = maxX - minX;
    var bh = maxY - minY;
    if (bw === 0 || bh === 0) return;

    var margin = 0.86;
    var scale  = Math.min(cw / bw, ch / bh) * margin;

    /* Centrar: el origen del mundo (0,0,0) queda en (ox,oy) */
    _tx.scale = scale;
    _tx.ox    = cw / 2 - ((minX + maxX) / 2) * scale;
    _tx.oy    = ch / 2 - ((minY + maxY) / 2) * scale;
  }

  /* Helper: convierte coordenadas del mundo → píxeles del canvas */
  function wp(wx, wz, wy) {
    var p = proj(wx, wz, wy);
    return { x: p.x * _tx.scale + _tx.ox, y: p.y * _tx.scale + _tx.oy };
  }

  /* ── Resize ───────────────────────────────────────────────────*/
  function resize() {
    if (!_cont || !_canvas) return;
    var dpr = Math.min(global.devicePixelRatio || 1, 2);
    var cw  = _cont.clientWidth  || 900;
    var ch  = _cont.clientHeight || 260;

    /* Dimensiones físicas del canvas (sin acumular la escala DPI) */
    _canvas.width  = Math.round(cw * dpr);
    _canvas.height = Math.round(ch * dpr);
    _canvas.style.width  = cw + 'px';
    _canvas.style.height = ch + 'px';

    /* Guardamos resolución lógica para los cálculos */
    _canvas._lw = cw;
    _canvas._lh = ch;
    _canvas._dpr = dpr;

    computeTransform(cw, ch);
    _dirty = true;
  }

  /* ── Fondo ────────────────────────────────────────────────────*/
  function drawBg(ctx, lw, lh) {
    var g = ctx.createRadialGradient(lw*0.5, lh*0.45, 0, lw*0.5, lh*0.5, lw*0.65);
    g.addColorStop(0,   rgb(C.bgLight));
    g.addColorStop(0.7, rgb(C.bg));
    g.addColorStop(1,   rgb(C.bgDark));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, lw, lh);
  }

  /* ── Base del teclado ─────────────────────────────────────────*/
  function drawBase(ctx) {
    var pad = 0.30;
    var x0 = 0    - pad;
    var x1 = _layoutW + pad;
    var z0 = 0    - pad;
    var z1 = _layoutH + pad;
    var yT = 0;      /* cara superior de la base */
    var yB = -BASE;  /* cara inferior */

    var TL = wp(x0,z0,yT), TR = wp(x1,z0,yT);
    var BR = wp(x1,z1,yT), BL = wp(x0,z1,yT);
    var FL = wp(x0,z1,yB), FR = wp(x1,z1,yB);
    var RL = wp(x1,z0,yB);

    /* Cara frontal */
    ctx.beginPath();
    ctx.moveTo(BL.x,BL.y); ctx.lineTo(BR.x,BR.y);
    ctx.lineTo(FR.x,FR.y); ctx.lineTo(FL.x,FL.y);
    ctx.closePath();
    ctx.fillStyle = rgb(C.baseFr);
    ctx.fill();

    /* Cara lateral derecha */
    ctx.beginPath();
    ctx.moveTo(TR.x,TR.y); ctx.lineTo(BR.x,BR.y);
    ctx.lineTo(FR.x,FR.y); ctx.lineTo(RL.x,RL.y);
    ctx.closePath();
    ctx.fillStyle = rgb(C.baseSide);
    ctx.fill();

    /* Cara superior */
    ctx.beginPath();
    ctx.moveTo(TL.x,TL.y); ctx.lineTo(TR.x,TR.y);
    ctx.lineTo(BR.x,BR.y); ctx.lineTo(BL.x,BL.y);
    ctx.closePath();
    ctx.fillStyle = rgb(C.baseTop);
    ctx.fill();
  }

  /* ── Tecla individual ─────────────────────────────────────────*/
  var PRESS_DUR  = 200;   // ms que dura la animación de press
  var PRESS_SINK = 0.12;  // cuánto se hunde (unidades del mundo)

  function drawKey(ctx, key, now) {
    /* Calcular presión (0…1) con ease-out */
    var pressAmt = 0;
    if (key.pressed) {
      var elapsed = now - key.pressT;
      if (elapsed < PRESS_DUR) {
        var t = elapsed / PRESS_DUR;
        /* ease-out cuadrática: sube rápido, baja suave */
        pressAmt = t < 0.3
          ? (t / 0.3)
          : 1 - ((t - 0.3) / 0.7);
        pressAmt = Math.max(0, Math.min(1, pressAmt));
      } else {
        key.pressed = false;
      }
    }

    var isPressed = pressAmt > 0.01;
    var sink = PRESS_SINK * pressAmt;

    var kw  = key.w;
    var kd  = 1;           /* profundidad de la tecla = 1u */
    var yTop = KEY_H - sink;  /* cara superior */
    var yBot = 0;          /* base del keycap */

    var x  = key.x;
    var z  = key.z;
    var hw = kw / 2;
    var hd = kd / 2;

    /* 4 esquinas de la cara superior */
    var TL = wp(x-hw, z-hd, yTop);
    var TR = wp(x+hw, z-hd, yTop);
    var BR = wp(x+hw, z+hd, yTop);
    var BL = wp(x-hw, z+hd, yTop);

    /* Aristas inferiores visibles */
    var FL = wp(x-hw, z+hd, yBot);
    var FR = wp(x+hw, z+hd, yBot);
    var RB = wp(x+hw, z-hd, yBot);

    /* ── Sombra ─────────────────────────────────────────────── */
    var sOff = (KEY_H - sink) * _tx.scale * 0.18;
    ctx.save();
    ctx.globalAlpha = 0.15 * (1 - pressAmt * 0.5);
    ctx.fillStyle = rgb(C.shadow);
    ctx.beginPath();
    ctx.moveTo(BL.x + sOff, BL.y + sOff);
    ctx.lineTo(BR.x + sOff, BR.y + sOff);
    ctx.lineTo(FR.x + sOff, FR.y + sOff);
    ctx.lineTo(FL.x + sOff, FL.y + sOff);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    /* ── Cara frontal ───────────────────────────────────────── */
    ctx.beginPath();
    ctx.moveTo(BL.x,BL.y); ctx.lineTo(BR.x,BR.y);
    ctx.lineTo(FR.x,FR.y); ctx.lineTo(FL.x,FL.y);
    ctx.closePath();
    ctx.fillStyle = rgb(isPressed ? C.aFront : C.front);
    ctx.fill();

    /* ── Cara lateral derecha ───────────────────────────────── */
    ctx.beginPath();
    ctx.moveTo(TR.x,TR.y); ctx.lineTo(BR.x,BR.y);
    ctx.lineTo(FR.x,FR.y); ctx.lineTo(RB.x,RB.y);
    ctx.closePath();
    ctx.fillStyle = rgb(isPressed ? C.aSide : C.side);
    ctx.fill();

    /* ── Cara superior (gradiente suave) ────────────────────── */
    ctx.beginPath();
    ctx.moveTo(TL.x,TL.y); ctx.lineTo(TR.x,TR.y);
    ctx.lineTo(BR.x,BR.y); ctx.lineTo(BL.x,BL.y);
    ctx.closePath();

    try {
      var grd = ctx.createLinearGradient(TL.x, TL.y, BR.x, BR.y);
      var topA = isPressed ? C.aTop : C.top;
      grd.addColorStop(0,   rgb(lighter(topA, 0.08)));
      grd.addColorStop(0.5, rgb(topA));
      grd.addColorStop(1,   rgb(darker(topA,  0.06)));
      ctx.fillStyle = grd;
    } catch(e) {
      ctx.fillStyle = rgb(isPressed ? C.aTop : C.top);
    }
    ctx.fill();

    /* ── Borde fino ─────────────────────────────────────────── */
    ctx.strokeStyle = rgb(darker(isPressed ? C.accent : C.top, 0.40), 0.55);
    ctx.lineWidth   = 0.7;
    ctx.stroke();

    /* ── Leyenda ────────────────────────────────────────────── */
    var cx = (TL.x+TR.x+BR.x+BL.x)/4;
    var cy = (TL.y+TR.y+BR.y+BL.y)/4 - _tx.scale * 0.025;
    var fs = Math.max(8, Math.min(14, _tx.scale * 0.23));

    ctx.font         = '500 ' + fs + 'px "JetBrains Mono",monospace';
    ctx.fillStyle    = rgb(isPressed ? C.legAct : C.legend);
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';

    var lbl = key.label;
    if (lbl === 'Space') lbl = '';
    ctx.fillText(lbl, cx, cy);

    /* ── Glow al presionar ──────────────────────────────────── */
    if (pressAmt > 0.05) {
      ctx.save();
      ctx.globalAlpha = pressAmt * 0.40;
      var r  = _tx.scale * kw * 0.7;
      var gl = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      gl.addColorStop(0,   rgb(C.accent, 0.80));
      gl.addColorStop(0.5, rgb(C.accent, 0.30));
      gl.addColorStop(1,   rgb(C.accent, 0.00));
      ctx.fillStyle = gl;
      ctx.beginPath();
      ctx.moveTo(TL.x,TL.y); ctx.lineTo(TR.x,TR.y);
      ctx.lineTo(BR.x,BR.y); ctx.lineTo(BL.x,BL.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Loop de render ───────────────────────────────────────────*/
  function frame() {
    _raf = requestAnimationFrame(frame);
    if (!_canvas || !_ctx) return;

    var now      = Date.now();
    var anyAnim  = _keys.some(function(k) { return k.pressed; });
    if (!anyAnim && !_dirty) return;
    _dirty = false;

    var dpr = _canvas._dpr || 1;
    var lw  = _canvas._lw  || _canvas.width;
    var lh  = _canvas._lh  || _canvas.height;

    /* Reiniciar transform DPI para este frame (sin acumulación) */
    _ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    _ctx.clearRect(0, 0, lw, lh);

    drawBg(_ctx, lw, lh);
    drawBase(_ctx);

    /* Ordenar de atrás a delante (menor z primero = fila de arriba) */
    var sorted = _keys.slice().sort(function(a,b){ return a.z - b.z; });
    sorted.forEach(function(k) { drawKey(_ctx, k, now); });

    /* Seguir animando mientras haya teclas en movimiento */
    if (anyAnim) _dirty = true;
  }

  /* ── Presionar tecla ──────────────────────────────────────────*/
  function pressKey(label) {
    var found = false;
    _keys.forEach(function(k) {
      if (k.label === label) {
        k.pressed = true;
        k.pressT  = Date.now();
        found = true;
      }
    });
    if (found) _dirty = true;
  }

  /* ── Observers ────────────────────────────────────────────────*/
  var _resObs   = null;
  var _themeObs = null;

  function watchTheme() {
    _themeObs = new MutationObserver(function() {
      readColors();
      _dirty = true;
    });
    _themeObs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  /* ── Listener teclado ─────────────────────────────────────────*/
  function _onKeyDown(e) {
    if (!_inited) return;
    var lbl = normalizeKey(e.key);
    if (lbl) pressKey(lbl);
  }

  /* ================================================================
     API PÚBLICA
  ================================================================ */

  function init3DKeyboard() {
    if (_inited) return;

    _cont = document.getElementById('keyboard3d-container');
    if (!_cont) { console.warn('[Keyboard3D] #keyboard3d-container no encontrado'); return; }

    readColors();
    buildLayout();

    /* Crear canvas */
    _canvas = document.createElement('canvas');
    _canvas.style.cssText = 'display:block;width:100%;height:100%;';
    _cont.appendChild(_canvas);
    _ctx = _canvas.getContext('2d');

    /* Primera medida */
    resize();

    /* Loop */
    frame();

    /* Observers */
    _resObs = new ResizeObserver(function() { resize(); });
    _resObs.observe(_cont);

    watchTheme();

    document.addEventListener('keydown', _onKeyDown, { passive: true });

    _inited = true;
    console.log('[Keyboard3D] Listo (Canvas 2D isométrico, sin dependencias).');
  }

  function update3DKeyboardOnKey(key) {
    if (_inited) pressKey(key);
  }

  function destroy3DKeyboard() {
    if (!_inited) return;
    cancelAnimationFrame(_raf);
    document.removeEventListener('keydown', _onKeyDown);
    if (_resObs)   { _resObs.disconnect();   _resObs   = null; }
    if (_themeObs) { _themeObs.disconnect(); _themeObs = null; }
    if (_canvas && _canvas.parentNode) _canvas.parentNode.removeChild(_canvas);
    if (_colorDiv && _colorDiv.parentNode) { _colorDiv.parentNode.removeChild(_colorDiv); _colorDiv = null; }
    _canvas = _ctx = _cont = null;
    _keys   = [];
    _inited = false;
    _dirty  = true;
    console.log('[Keyboard3D] Destruido.');
  }

  global.Keyboard3D = { init3DKeyboard, update3DKeyboardOnKey, destroy3DKeyboard };

})(window);
