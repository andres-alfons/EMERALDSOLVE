// Precios del cotizador, en pesos colombianos
export const PRECIOS = {
  landing: {
    nombre: 'Landing page', base: 700000, unidad: 'Secciones', uno: 'sección', min: 3, max: 12, step: 1, incl: 5,
    extra: (v) => Math.max(0, v - 5) * 80000,
    eta: (v) => { const a = Math.ceil(Math.max(0, v - 5) / 2); return `${5 + a} a ${7 + a} días hábiles`; },
    hint: 'Incluye 5 secciones. Cada sección adicional suma $80.000.',
  },
  sitio: {
    nombre: 'Sitio web informativo', base: 1500000, unidad: 'Páginas', uno: 'página', min: 3, max: 15, step: 1, incl: 6,
    extra: (v) => Math.max(0, v - 6) * 150000,
    eta: (v) => { const a = Math.ceil(Math.max(0, v - 6) / 4); return `${2 + a} a ${3 + a} semanas`; },
    hint: 'Incluye 6 páginas. Cada página adicional suma $150.000.',
  },
  tienda: {
    nombre: 'Tienda virtual', base: 2500000, unidad: 'Productos', uno: 'producto', min: 10, max: 300, step: 10, incl: 50,
    extra: (v) => Math.ceil(Math.max(0, v - 50) / 50) * 300000,
    eta: (v) => { const a = Math.ceil(Math.max(0, v - 50) / 100); return `${3 + a} a ${5 + a} semanas`; },
    hint: 'Incluye hasta 50 productos. Cada 50 adicionales suman $300.000.',
  },
  dashboard: {
    nombre: 'Dashboard', base: 3500000, unidad: 'Módulos', uno: 'módulo', min: 1, max: 8, step: 1, incl: 3,
    extra: (v) => Math.max(0, v - 3) * 600000,
    eta: (v) => { const a = Math.max(0, v - 3); return `${4 + a} a ${6 + a} semanas`; },
    hint: 'Incluye 3 módulos, como inventario, ventas y clientes. Cada módulo adicional suma $600.000.',
  },
};

export const QUOTE_TYPES = [
  { value: 'landing', label: 'Landing page' },
  { value: 'sitio', label: 'Sitio web' },
  { value: 'tienda', label: 'Tienda virtual' },
  { value: 'dashboard', label: 'Dashboard' },
];

export const EXTRAS = [
  { id: 'textos', short: 'textos', label: 'Te escribimos los textos', price: 200000 },
  { id: 'logo', short: 'logo', label: 'Logo sencillo', price: 150000 },
  { id: 'dominio', short: 'dominio', label: 'Dominio .com o .co por un año', price: 80000 },
];

export const MANTENIMIENTO = [
  { id: 'no', label: 'Sin plan', price: 0 },
  { id: 'brillo', label: 'Plan Brillo', price: 120000 },
  { id: 'pulido', label: 'Plan Pulido', price: 250000 },
];
