// Fondo del hero: un campo quieto de facetas que se ilumina alrededor del puntero.
export function createFacetField(canvas) {
  const ctx = canvas.getContext('2d');
  let tris = [], W = 0, H = 0, pending = false;
  const mouse = { x: -9999, y: -9999 };

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cell = W < 600 ? 70 : 96, cols = Math.ceil(W / cell) + 2, rows = Math.ceil(H / cell) + 2, pts = [];
    for (let r = 0; r < rows; r++) {
      pts[r] = [];
      for (let c = 0; c < cols; c++) {
        const jx = (r === 0 || r === rows - 1) ? 0 : (Math.random() - 0.5) * cell * 0.7;
        const jy = (c === 0 || c === cols - 1) ? 0 : (Math.random() - 0.5) * cell * 0.7;
        pts[r][c] = [(c - 1) * cell + jx, (r - 1) * cell + jy];
      }
    }
    tris = [];
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = pts[r][c], b = pts[r][c + 1], d = pts[r + 1][c], e = pts[r + 1][c + 1], flip = Math.random() > 0.5;
      [flip ? [a, b, e] : [a, b, d], flip ? [a, e, d] : [b, e, d]].forEach((t) => {
        tris.push({ p: t, cx: (t[0][0] + t[1][0] + t[2][0]) / 3, cy: (t[0][1] + t[1][1] + t[2][1]) / 3, base: Math.random() });
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const t of tris) {
      const wave = Math.sin(1.5 + t.cx * 0.004 + t.cy * 0.003) * 0.5 + 0.5;
      const dx = t.cx - mouse.x, dy = t.cy - mouse.y, glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 260);
      const l = 5 + t.base * 2.5 + wave * 2.2 + glow * 5;
      ctx.fillStyle = `hsl(160, 46%, ${l.toFixed(2)}%)`;
      ctx.strokeStyle = `rgba(124,255,201,${(0.035 + glow * 0.12).toFixed(3)})`;
      ctx.beginPath(); ctx.moveTo(t.p[0][0], t.p[0][1]); ctx.lineTo(t.p[1][0], t.p[1][1]); ctx.lineTo(t.p[2][0], t.p[2][1]);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
  }

  function request() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; draw(); });
  }

  build(); draw();

  return {
    resize() { build(); draw(); },
    pointer(x, y) { mouse.x = x; mouse.y = y; request(); },
    leave() { mouse.x = mouse.y = -9999; request(); },
  };
}
