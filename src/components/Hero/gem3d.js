import { clamp } from '../../lib/format';

// La gema del logo en 3D. Si WebGL o la librería no están disponibles, se queda el logo plano.
export function createGem(T, holder, canvas) {
  const legacy = !(T.ColorManagement && T.ColorManagement.legacyMode === false);
  const col = (hex) => { const c = new T.Color(hex); if (legacy) c.convertSRGBToLinear(); return c; };

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0, 6.2);

  // Paneles de luz suave para que las facetas reflejen
  const pmrem = new T.PMREMGenerator(renderer), env = new T.Scene();
  env.background = col('#0A0F0D');
  function panel(w, h, x, y, z, hex, k) {
    const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: col(hex).multiplyScalar(k), side: T.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  }
  panel(5, 2.2, -3.5, 4, 3.5, '#FFFFFF', 4);
  panel(1.4, 6, 5, 0.5, 1.5, '#7CFFC9', 2.4);
  panel(6, 1, 0, -4.5, 2.5, '#E9FFF6', 1.2);
  panel(4, 4, 0, 1, -6, '#1FB884', 1.6);
  panel(1, 4, -5, -1, -1, '#FFFFFF', 1.6);
  scene.environment = pmrem.fromScene(env, 0.03).texture;

  // El corte hexagonal del logo: mesa, seis facetas de corona, filetín y pabellón
  const OUT = [[0, 1.2], [1, 0.6], [1, -0.6], [0, -1.2], [-1, -0.6], [-1, 0.6]];
  const S = 0.57, ZT = 0.34, ZB = -0.1, ZA = -1.05, CZ = -0.25;
  const top = OUT.map((p) => [p[0] * S, p[1] * S, ZT]);
  const gir = OUT.map((p) => [p[0], p[1], 0]);
  const bot = OUT.map((p) => [p[0], p[1], ZB]);
  const apex = [0, 0, ZA];
  const CROWN = ['#1FB884', '#0E8F65', '#06523B', '#0A6B4C', '#14A576', '#34E0A6'];
  const pos = [], colr = [];
  function tri(a, b, c, hex) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const gx = (a[0] + b[0] + c[0]) / 3, gy = (a[1] + b[1] + c[1]) / 3, gz = (a[2] + b[2] + c[2]) / 3 - CZ;
    if (nx * gx + ny * gy + nz * gz < 0) [b, c] = [c, b];
    pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
    const k = col(hex); colr.push(k.r, k.g, k.b, k.r, k.g, k.b, k.r, k.g, k.b);
  }
  for (let i = 1; i < 5; i++) tri(top[0], top[i], top[i + 1], '#0B7A55');
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    tri(top[i], gir[i], gir[j], CROWN[i]); tri(top[i], gir[j], top[j], CROWN[i]);
    tri(gir[i], bot[i], bot[j], '#0A6B4C'); tri(gir[i], bot[j], gir[j], '#0A6B4C');
    tri(bot[i], bot[j], apex, i % 2 ? '#06523B' : '#0B6A4C');
  }
  const geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new T.Float32BufferAttribute(colr, 3));
  geo.computeVertexNormals();
  const gem = new T.Group();
  gem.add(new T.Mesh(geo, new T.MeshPhysicalMaterial({ vertexColors: true, flatShading: true, roughness: 0.34, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, ior: 1.57, envMapIntensity: 1.15 })));
  gem.add(new T.LineSegments(new T.EdgesGeometry(geo, 8), new T.LineBasicMaterial({ color: col('#062A1F'), transparent: true, opacity: 0.9 })));

  // El < > tallado en la mesa
  const bm = new T.MeshBasicMaterial({ color: col('#7CFFC9'), toneMapped: false }), bz = ZT + 0.012;
  function strokeLine(pts, r) {
    pts.forEach((p) => { const s = new T.Mesh(new T.SphereGeometry(r, 20, 14), bm); s.position.set(p[0], p[1], p[2]); gem.add(s); });
    for (let k = 0; k < pts.length - 1; k++) {
      const a = new T.Vector3(...pts[k]), b = new T.Vector3(...pts[k + 1]);
      const cyl = new T.Mesh(new T.CylinderGeometry(r, r, a.distanceTo(b), 20, 1, true), bm);
      cyl.position.copy(a).add(b).multiplyScalar(0.5);
      cyl.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), b.clone().sub(a).normalize());
      gem.add(cyl);
    }
  }
  strokeLine([[-0.12, 0.24, bz], [-0.36, 0, bz], [-0.12, -0.24, bz]], 0.052);
  strokeLine([[0.12, 0.24, bz], [0.36, 0, bz], [0.12, -0.24, bz]], 0.052);
  scene.add(gem);

  const key = new T.DirectionalLight(0xffffff, 1.0); key.position.set(-3, 4, 5); scene.add(key);
  const rim = new T.PointLight(col('#7CFFC9'), 1.4, 14); rim.position.set(3.2, -2.2, 2.6); scene.add(rim);
  scene.add(new T.AmbientLight(0xffffff, 0.2));

  const pointer = { x: 0, y: 0 }, cur = { rx: 0.5, ry: -1.3 };
  let scrollP = 0, start = null, raf = 0, shown = false;
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  function frame(now) {
    raf = 0;
    if (start === null) start = now;
    const k = clamp((now - start) / 1700, 0, 1), e = 1 - Math.pow(1 - k, 3);
    const tx = pointer.y * 0.3, ty = pointer.x * 0.55 + scrollP * 1.15;
    if (k < 1) { cur.rx = 0.5 + (tx - 0.5) * e; cur.ry = -1.3 + (ty + 1.3) * e; }
    else { cur.rx += (tx - cur.rx) * 0.085; cur.ry += (ty - cur.ry) * 0.085; }
    gem.rotation.set(cur.rx, cur.ry, 0);
    gem.scale.setScalar(0.84 + 0.16 * e);
    key.position.set(-3 + pointer.x * 5, 4 - pointer.y * 4, 5);
    renderer.render(scene, camera);
    if (!shown) { shown = true; holder.classList.add('is-3d'); }
    if (k < 1 || Math.abs(tx - cur.rx) > 1e-4 || Math.abs(ty - cur.ry) > 1e-4) kick();
  }
  function size() {
    const w = holder.clientWidth, h = holder.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); kick();
  }
  const ro = new ResizeObserver(size);
  ro.observe(holder);
  size();

  return {
    pointer(x, y) { pointer.x = clamp(x, -1, 1); pointer.y = clamp(y, -1, 1); kick(); },
    scroll(p) { if (Math.abs(p - scrollP) > 1e-4) { scrollP = p; kick(); } },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      holder.classList.remove('is-3d');
      renderer.dispose();
    },
  };
}
