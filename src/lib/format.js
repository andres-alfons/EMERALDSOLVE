export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function smooth(t) {
  t = clamp(t, 0, 1);
  return t * t * (3 - 2 * t);
}

// Pesos colombianos: 1500000 -> "$1.500.000"
export function cop(n) {
  return '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
