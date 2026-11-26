/**
 * Visor 3D real en Three.js para los activos del Equipo 4 (Sentir la Calle):
 *  - Modo 'three_ply': carga data/08_lidar_3d/merida_centro_inegi_mdt_1_5m_real.ply (11,554 pts reales)
 *  - Modo 'three_glb': carga data/09_realidad_aumentada_ar/merida_centro_historico_lod1_real.glb (105 edificios reales)
 * Cero generación aleatoria y cero geometría sintética.
 */
window.DataStoryApp = window.DataStoryApp || {};

window.DataStoryApp.ThreeModule = (function () {
  let scene, camera, renderer, controls, animId, currentGroup;
  let activeContainer = null;

  function dispose() {
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (controls) {
      controls.dispose();
      controls = null;
    }
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    if (activeContainer) activeContainer.innerHTML = "";
    scene = null;
    camera = null;
    currentGroup = null;
  }

  function setupScene(containerId) {
    dispose();
    const container = document.getElementById(containerId);
    if (!container) return null;
    activeContainer = container;

    const width = container.clientWidth || 840;
    const height = container.clientHeight || 420;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0a16);

    camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 5000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
    }

    const hemi = new THREE.HemisphereLight(0xf3e8ff, 0x1e1b2e, 1.1);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(120, 220, 140);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xed9f22, 0.55);
    rim.position.set(-140, 90, -100);
    scene.add(rim);

    // Etiqueta de estado real en esquina
    const hud = document.createElement("div");
    hud.id = "threeHudLabel";
    hud.style.cssText = "position:absolute;bottom:10px;left:12px;background:rgba(12,9,18,0.82);color:#f3e8ff;border:1px solid rgba(192,132,252,0.45);padding:5px 10px;border-radius:8px;font-size:11.5px;font-family:'JetBrains Mono',monospace;pointer-events:none;";
    hud.textContent = "Cargando archivo 3D real…";
    container.appendChild(hud);

    function animate() {
      animId = requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return { container, hud };
  }

  function parseAsciiPly(text) {
    const lines = text.split(/\r?\n/);
    let headerEnd = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "end_header") {
        headerEnd = i + 1;
        break;
      }
    }
    const pts = [];
    for (let i = headerEnd; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split(/\s+/);
      if (parts.length < 3) continue;
      const x = parseFloat(parts[0]);
      const y = parseFloat(parts[1]);
      const z = parseFloat(parts[2]);
      if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
        pts.push([x, y, z]);
      }
    }
    return pts;
  }

  async function initRealPly(containerId, plyPath = "data/08_lidar_3d/merida_centro_inegi_mdt_1_5m_real.ply") {
    const ctx = setupScene(containerId);
    if (!ctx) return;

    try {
      const resp = await fetch(plyPath);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      const pts = parseAsciiPly(text);

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
      for (const [x, y, z] of pts) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const zRange = Math.max(0.01, maxZ - minZ);
      const span = Math.max(maxX - minX, maxY - minY, 1);
      const scale = 120 / span;

      const positions = new Float32Array(pts.length * 3);
      const colors = new Float32Array(pts.length * 3);
      const cLow = new THREE.Color("#ed9f22");   // Oro: cotas bajas (encharcamiento)
      const cMid = new THREE.Color("#a855f7");   // Lila intermedio
      const cHigh = new THREE.Color("#600d8b");  // Morado: cotas altas

      for (let i = 0; i < pts.length; i++) {
        const [x, y, z] = pts[i];
        const t = (z - minZ) / zRange;
        positions[i * 3] = (x - cx) * scale;
        // Exageración vertical legible para terreno plano de Mérida (escala explícita en HUD)
        positions[i * 3 + 1] = (z - minZ) * scale * 6.0;
        positions[i * 3 + 2] = -(y - cy) * scale;

        const col = t < 0.5
          ? cLow.clone().lerp(cMid, t * 2)
          : cMid.clone().lerp(cHigh, (t - 0.5) * 2);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({ size: 1.8, vertexColors: true });
      const cloud = new THREE.Points(geom, mat);
      currentGroup = new THREE.Group();
      currentGroup.add(cloud);

      const grid = new THREE.GridHelper(130, 16, 0x600d8b, 0x261d38);
      currentGroup.add(grid);
      scene.add(currentGroup);

      camera.position.set(85, 62, 95);
      camera.lookAt(0, 6, 0);
      if (controls) controls.target.set(0, 6, 0);

      ctx.hud.textContent = `PLY REAL: ${pts.length.toLocaleString("es-MX")} pts INEGI MDT 1.5 m (${minZ.toFixed(1)}–${maxZ.toFixed(1)} msnm · escala Z ×6)`;
    } catch (err) {
      ctx.hud.textContent = `Error al leer ${plyPath}: ${err.message}`;
    }
  }

  function initRealGlb(containerId, glbPath = "data/09_realidad_aumentada_ar/merida_centro_historico_lod1_real.glb") {
    const ctx = setupScene(containerId);
    if (!ctx) return;

    if (!THREE.GLTFLoader) {
      ctx.hud.textContent = "No se pudo cargar THREE.GLTFLoader.";
      return;
    }

    const loader = new THREE.GLTFLoader();
    loader.load(
      glbPath,
      (gltf) => {
        const model = gltf.scene;
        let meshCount = 0;

        model.traverse((child) => {
          if (child.isMesh) {
            meshCount++;
            child.material = new THREE.MeshStandardMaterial({
              color: meshCount % 4 === 0 ? 0xed9f22 : 0x7e22ce,
              roughness: 0.55,
              metalness: 0.15
            });
            const edges = new THREE.EdgesGeometry(child.geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xf3e8ff, transparent: true, opacity: 0.35 }));
            child.add(line);
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 1);
        const normScale = 110 / maxDim;

        model.position.sub(center);
        currentGroup = new THREE.Group();
        currentGroup.add(model);
        currentGroup.scale.setScalar(normScale);

        const grid = new THREE.GridHelper(130, 18, 0xed9f22, 0x261d38);
        grid.position.y = -(size.y * normScale) / 2;
        scene.add(grid);
        scene.add(currentGroup);

        camera.position.set(78, 56, 86);
        camera.lookAt(0, 0, 0);
        if (controls) controls.target.set(0, 0, 0);

        ctx.hud.textContent = `GLB REAL: Centro Histórico de Mérida (105 edificios OSM + MDT INEGI 1.5 m)`;
      },
      undefined,
      (err) => {
        ctx.hud.textContent = `Error al cargar ${glbPath}: ${err.message || err}`;
      }
    );
  }

  function setCameraPreset(preset) {
    if (!camera) return;
    if (preset === "top") {
      camera.position.set(0, 130, 0.1);
    } else if (preset === "street") {
      camera.position.set(42, 16, 48);
    } else {
      camera.position.set(82, 58, 90);
    }
    camera.lookAt(0, 0, 0);
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }

  return { initRealPly, initRealGlb, setCameraPreset, dispose };
})();
