/* ================================================================
   TypeHub — Integración Teclado 3D
   Módulo autónomo: se engancha vía listeners al test existente.
   No toca STATE, WPM/ACC, ni el cinematic text player.

   API pública expuesta en window.Keyboard3D:
     init3DKeyboard()          — monta la escena Three.js
     destroy3DKeyboard()       — desmonta escena y listeners
     update3DKeyboardOnKey(key)— anima la tecla indicada (string)
   ================================================================ */

(function (global) {
  'use strict';

  /* ── Comprobación de THREE.js ─────────────────────────────── */
  // Se carga diferido: Three.js se inyecta antes de llamar a init3DKeyboard()

  /* ── Layout del teclado QWERTY (ISO/ANSI simplificado) ─────── */
  const KEYBOARD_LAYOUT = [
    // Fila 0 — números
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    // Fila 1 — QWERTY
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    // Fila 2 — home row
    ['CapsLock','a','s','d','f','g','h','j','k','l',';',"'",'Enter'],
    // Fila 3 — ZXCV
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    // Fila 4 — barra espaciadora
    ['Ctrl','Alt','Space','Alt','Ctrl'],
  ];

  // Anchos relativos para teclas especiales (1 unidad = 1 keycap estándar)
  const KEY_WIDTHS = {
    'Backspace': 2,
    'Tab':       1.5,
    '\\':        1.5,
    'CapsLock':  1.75,
    'Enter':     2.25,
    'Shift':     2.25,
    'Space':     6.25,
    'Ctrl':      1.25,
    'Alt':       1.25,
  };
  const KEY_W_DEFAULT = 1;
  const KEY_GAP       = 0.12;  // espacio entre teclas en unidades

  /* ── Constantes de geometría ─────────────────────────────── */
  const UNIT    = 0.88;   // tamaño de 1U en unidades Three.js
  const KEY_H   = 0.30;   // altura del keycap (eje Y)
  const KEY_D   = UNIT;   // profundidad (eje Z)
  const BASE_H  = 0.18;   // grosor de la base del teclado
  const BEVEL   = 0.06;   // radio de biselado

  /* ── Estado interno del módulo ───────────────────────────── */
  let _scene, _camera, _renderer, _animFrame;
  let _keyMeshes = {};    // { 'a': THREE.Mesh, ... }
  let _pressedKeys = {};  // { 'a': timeoutId }
  let _container = null;
  let _initialized = false;
  let _resizeObserver = null;

  /* ── Colores derivados de CSS vars (se leen en init/updateTheme) */
  let COLORS = {};

  /* ── Helpers CSS vars ──────────────────────────────────────── */
  function getCSSVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name).trim();
  }

  function cssColorToHex(cssColor) {
    // Crea un elemento temporal para resolver cualquier formato CSS a rgb()
    const tmp = document.createElement('div');
    tmp.style.color = cssColor;
    tmp.style.display = 'none';
    document.body.appendChild(tmp);
    const computed = getComputedStyle(tmp).color;
    document.body.removeChild(tmp);
    const m = computed.match(/\d+/g);
    if (!m) return 0x3a3c40;
    const r = parseInt(m[0]), g = parseInt(m[1]), b = parseInt(m[2]);
    return (r << 16) | (g << 8) | b;
  }

  function readThemeColors() {
    COLORS = {
      bg:          cssColorToHex(getCSSVar('--bg-2')),
      base:        cssColorToHex(getCSSVar('--bg-3')),
      keycap:      cssColorToHex(getCSSVar('--surface')),
      keycapTop:   cssColorToHex(getCSSVar('--surface-2')),
      legend:      cssColorToHex(getCSSVar('--text-sub')),
      accent:      cssColorToHex(getCSSVar('--accent')),
      accentGlow:  getCSSVar('--accent-glow'),   // string para el bloom/glow
      border:      cssColorToHex(getCSSVar('--border')),
    };
  }

  /* ── Detectar tema activo ──────────────────────────────────── */
  function getActiveTheme() {
    const classes = document.body.classList;
    if (classes.contains('theme-nord'))    return 'nord';
    if (classes.contains('theme-dracula')) return 'dracula';
    if (classes.contains('theme-monokai')) return 'monokai';
    if (classes.contains('theme-light'))   return 'light';
    return 'serika';
  }

  /* ── Parámetros de luz por tema ────────────────────────────── */
  function getLightParams(theme) {
    switch (theme) {
      case 'nord':    return { ambientInt: 0.55, dirInt: 0.9,  dirColor: 0xbfe8f0, accentInt: 0.4 };
      case 'dracula': return { ambientInt: 0.35, dirInt: 0.7,  dirColor: 0x9f82f0, accentInt: 0.7 };
      case 'monokai': return { ambientInt: 0.40, dirInt: 0.75, dirColor: 0xf0e68c, accentInt: 0.6 };
      case 'light':   return { ambientInt: 0.85, dirInt: 1.2,  dirColor: 0xffffff, accentInt: 0.2 };
      default:        return { ambientInt: 0.40, dirInt: 0.80, dirColor: 0xffe082, accentInt: 0.55 }; // serika
    }
  }

  /* ── Normaliza key string a la convención del layout ──────── */
  function normalizeKey(key) {
    if (!key || key.length === 0) return null;
    if (key === ' ')              return 'Space';
    if (key === 'Backspace')      return 'Backspace';
    if (key === 'Tab')            return 'Tab';
    if (key === 'CapsLock')       return 'CapsLock';
    if (key === 'Enter')          return 'Enter';
    if (key === 'Control')        return 'Ctrl';
    if (key === 'Alt')            return 'Alt';
    if (key.startsWith('Shift'))  return 'Shift';
    return key.length === 1 ? key.toLowerCase() : null;
  }

  /* ================================================================
     CONSTRUCCIÓN DE LA ESCENA
     ================================================================ */

  function buildKeyMesh(label, widthUnits) {
    const THREE = global.THREE;
    const w = widthUnits * UNIT + (widthUnits - 1) * KEY_GAP * UNIT;
    const h = KEY_H;
    const d = KEY_D;

    // Keycap con ChamferBox (BoxGeometry + pequeño bevel manual)
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
      color:     COLORS.keycap,
      roughness: 0.55,
      metalness: 0.15,
    });
    const mesh = new THREE.Mesh(geo, mat);

    // Cara superior ligeramente más clara
    mesh.userData.baseColor   = COLORS.keycap;
    mesh.userData.accentColor = COLORS.accent;
    mesh.userData.label       = label;

    return mesh;
  }

  function buildScene() {
    const THREE = global.THREE;

    _scene = new THREE.Scene();
    _scene.background = new THREE.Color(COLORS.base);

    // Cámara perspectiva: ajustada para ver todo el teclado
    const w = _container.clientWidth  || 900;
    const h = _container.clientHeight || 260;
    _camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
    // Posición ligeramente por encima y frontal
    _camera.position.set(0, 8, 12);
    _camera.lookAt(0, 0, 0);

    // Renderer
    _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    _renderer.setPixelRatio(Math.min(global.devicePixelRatio, 2));
    _renderer.setSize(w, h);
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    _container.appendChild(_renderer.domElement);

    // ── Luces ─────────────────────────────────────────────────
    const theme = getActiveTheme();
    const lp    = getLightParams(theme);

    const ambient = new THREE.AmbientLight(0xffffff, lp.ambientInt);
    ambient.name = 'ambient';
    _scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(lp.dirColor, lp.dirInt);
    dirLight.name = 'dirLight';
    dirLight.position.set(-6, 10, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width  = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far  = 40;
    dirLight.shadow.camera.left   = -12;
    dirLight.shadow.camera.right  =  12;
    dirLight.shadow.camera.top    =  8;
    dirLight.shadow.camera.bottom = -8;
    _scene.add(dirLight);

    // Luz de acento (desde abajo-frente, color accent del tema)
    const accentLight = new THREE.PointLight(COLORS.accent, lp.accentInt, 30);
    accentLight.name = 'accentLight';
    accentLight.position.set(0, -1, 6);
    _scene.add(accentLight);

    // ── Teclado base ──────────────────────────────────────────
    // Calculamos el ancho total para centrar
    // Fila más larga: fila 0 (14 teclas)
    const totalRows = KEYBOARD_LAYOUT.length;
    // Calcular ancho total de la fila más larga para centrar
    let maxRowW = 0;
    KEYBOARD_LAYOUT.forEach(row => {
      let rw = 0;
      row.forEach((k, i) => {
        const wu = KEY_WIDTHS[k] || KEY_W_DEFAULT;
        rw += wu * UNIT + (i > 0 ? KEY_GAP * UNIT : 0);
      });
      if (rw > maxRowW) maxRowW = rw;
    });

    const rowSpacing  = UNIT + KEY_GAP * UNIT;
    const totalHeight = totalRows * rowSpacing;

    // Base plate
    const baseMat = new THREE.MeshStandardMaterial({ color: COLORS.base, roughness: 0.7, metalness: 0.05 });
    const basePad = 0.35;
    const baseGeo = new THREE.BoxGeometry(maxRowW + basePad * 2, BASE_H, totalHeight + basePad * 2);
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.receiveShadow = true;
    baseMesh.position.set(0, -KEY_H / 2 - BASE_H / 2, 0);
    _scene.add(baseMesh);

    // ── Teclas ────────────────────────────────────────────────
    const startZ = (totalHeight / 2) - (rowSpacing / 2);

    KEYBOARD_LAYOUT.forEach((row, rowIdx) => {
      // Calcula el ancho total de esta fila
      let rowW = 0;
      row.forEach((k, i) => {
        const wu = KEY_WIDTHS[k] || KEY_W_DEFAULT;
        rowW += wu * UNIT + (i > 0 ? KEY_GAP * UNIT : 0);
      });

      let xOffset = -rowW / 2;
      const zPos   = startZ - rowIdx * rowSpacing;

      row.forEach((label) => {
        const wu   = KEY_WIDTHS[label] || KEY_W_DEFAULT;
        const kw   = wu * UNIT + (wu - 1) * KEY_GAP * UNIT;
        const xPos = xOffset + kw / 2;

        const mesh = buildKeyMesh(label, wu);
        mesh.castShadow    = true;
        mesh.receiveShadow = true;
        mesh.position.set(xPos, 0, zPos);
        _scene.add(mesh);

        // Registrar por etiqueta (puede haber duplicados: Shift x2, Alt x2, Ctrl x2)
        if (!_keyMeshes[label]) {
          _keyMeshes[label] = mesh;
        } else {
          // Para teclas duplicadas guardamos array
          if (!Array.isArray(_keyMeshes[label])) {
            _keyMeshes[label] = [_keyMeshes[label]];
          }
          _keyMeshes[label].push(mesh);
        }

        xOffset += kw + KEY_GAP * UNIT;
      });
    });
  }

  /* ── Loop de renderizado ──────────────────────────────────── */
  function renderLoop() {
    _animFrame = requestAnimationFrame(renderLoop);
    _renderer.render(_scene, _camera);
  }

  /* ── Resize handler ──────────────────────────────────────── */
  function handleResize() {
    if (!_renderer || !_camera || !_container) return;
    const w = _container.clientWidth;
    const h = _container.clientHeight;
    _camera.aspect = w / h;
    _camera.updateProjectionMatrix();
    _renderer.setSize(w, h);
  }

  /* ================================================================
     ANIMACIÓN DE TECLAS
     ================================================================ */

  const PRESS_DY    = -0.12;   // bajada en Y al presionar
  const PRESS_MS    = 80;      // ms de bajada
  const RELEASE_MS  = 150;     // ms de subida

  function getMeshes(label) {
    const v = _keyMeshes[label];
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  }

  function pressKey(label) {
    const meshes = getMeshes(label);
    if (meshes.length === 0) return;

    meshes.forEach(mesh => {
      // Animación: mueve la tecla hacia abajo y cambia color
      mesh.position.y = PRESS_DY;
      mesh.material.color.setHex(COLORS.accent);
      mesh.material.emissive = new global.THREE.Color(COLORS.accent);
      mesh.material.emissiveIntensity = 0.35;
    });

    // Cancelar release previo si existe
    if (_pressedKeys[label]) {
      clearTimeout(_pressedKeys[label]);
    }
    _pressedKeys[label] = setTimeout(() => releaseKey(label), PRESS_MS + RELEASE_MS);
  }

  function releaseKey(label) {
    const meshes = getMeshes(label);
    meshes.forEach(mesh => {
      mesh.position.y = 0;
      mesh.material.color.setHex(COLORS.keycap);
      mesh.material.emissive = new global.THREE.Color(0x000000);
      mesh.material.emissiveIntensity = 0;
    });
    delete _pressedKeys[label];
  }

  /* ================================================================
     ACTUALIZACIÓN DE TEMA
     ================================================================ */

  function applyThemeToScene() {
    if (!_scene) return;
    readThemeColors();

    const theme = getActiveTheme();
    const lp    = getLightParams(theme);

    // Fondo
    _scene.background = new global.THREE.Color(COLORS.base);

    // Luces
    const ambient     = _scene.getObjectByName('ambient');
    const dirLight    = _scene.getObjectByName('dirLight');
    const accentLight = _scene.getObjectByName('accentLight');

    if (ambient)     { ambient.intensity = lp.ambientInt; }
    if (dirLight)    { dirLight.intensity = lp.dirInt; dirLight.color.setHex(lp.dirColor); }
    if (accentLight) { accentLight.intensity = lp.accentInt; accentLight.color.setHex(COLORS.accent); }

    // Keycaps
    Object.values(_keyMeshes).forEach(v => {
      const meshes = Array.isArray(v) ? v : [v];
      meshes.forEach(m => {
        if (!m.userData._pressed) {
          m.material.color.setHex(COLORS.keycap);
        }
        m.userData.baseColor   = COLORS.keycap;
        m.userData.accentColor = COLORS.accent;
      });
    });

    // Base
    _scene.children.forEach(child => {
      if (child.isMesh && child.geometry && child.geometry.parameters
          && child.geometry.parameters.height === BASE_H) {
        child.material.color.setHex(COLORS.base);
      }
    });
  }

  /* ── Observar cambios de clase en body (tema) ─────────────── */
  let _themeObserver = null;

  function watchThemeChanges() {
    if (_themeObserver) _themeObserver.disconnect();
    _themeObserver = new MutationObserver(() => {
      applyThemeToScene();
      // Actualizar data-style del contenedor si el tema cambia
      if (_container) {
        _container.dataset.theme = getActiveTheme();
      }
    });
    _themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  /* ================================================================
     LISTENER DE TECLADO
     Nos enganchamos al testInput existente y al documento global,
     evitando interferir con cualquier lógica del test.
     ================================================================ */

  function _onKeyDown(e) {
    if (!_initialized) return;
    const label = normalizeKey(e.key);
    if (label) update3DKeyboardOnKey(label);
  }

  /* ================================================================
     API PÚBLICA
     ================================================================ */

  /**
   * init3DKeyboard()
   * Monta la escena Three.js dentro de #keyboard3d-container
   * y conecta listeners al testInput existente.
   */
  function init3DKeyboard() {
    if (_initialized) return;

    _container = document.getElementById('keyboard3d-container');
    if (!_container) {
      console.warn('[Keyboard3D] No se encontró #keyboard3d-container');
      return;
    }

    if (!global.THREE) {
      console.warn('[Keyboard3D] THREE.js no está cargado todavía.');
      return;
    }

    readThemeColors();
    buildScene();
    renderLoop();

    // Ajuste responsive
    _resizeObserver = new ResizeObserver(handleResize);
    _resizeObserver.observe(_container);

    // Escuchar cambios de tema
    watchThemeChanges();

    // Engancharse al teclado SIN duplicar ni bloquear el listener del test
    document.addEventListener('keydown', _onKeyDown, { passive: true });

    _initialized = true;
    _container.dataset.theme = getActiveTheme();
    _container.setAttribute('data-style', _container.dataset.style || 'default');

    console.log('[Keyboard3D] Inicializado correctamente.');
  }

  /**
   * update3DKeyboardOnKey(key)
   * Anima la tecla indicada. Se puede llamar desde fuera si se necesita.
   * @param {string} key — etiqueta del layout (ej: 'a', 'Space', 'Backspace')
   */
  function update3DKeyboardOnKey(key) {
    if (!_initialized) return;
    pressKey(key);
  }

  /**
   * destroy3DKeyboard()
   * Desmonta la escena y elimina todos los listeners.
   */
  function destroy3DKeyboard() {
    if (!_initialized) return;

    cancelAnimationFrame(_animFrame);
    document.removeEventListener('keydown', _onKeyDown);

    if (_resizeObserver)  { _resizeObserver.disconnect();  _resizeObserver  = null; }
    if (_themeObserver)   { _themeObserver.disconnect();   _themeObserver   = null; }

    if (_renderer) {
      _renderer.dispose();
      if (_renderer.domElement && _renderer.domElement.parentNode) {
        _renderer.domElement.parentNode.removeChild(_renderer.domElement);
      }
      _renderer = null;
    }

    // Liberar geometrías y materiales
    if (_scene) {
      _scene.traverse(obj => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      _scene = null;
    }

    _camera     = null;
    _keyMeshes  = {};
    _pressedKeys = {};
    _initialized = false;

    console.log('[Keyboard3D] Destruido correctamente.');
  }

  /* Exponer en global */
  global.Keyboard3D = {
    init3DKeyboard,
    update3DKeyboardOnKey,
    destroy3DKeyboard,
  };

})(window);
