import { useEffect, useRef } from 'react';
import { clamp } from '../../lib/format';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { createFacetField } from './facetField';
import './Hero.css';

const DESKTOP_3D = '(min-width: 861px) and (pointer: fine)';

function hasWebGL() {
  try {
    const probe = document.createElement('canvas');
    return !!(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const fieldRef = useRef(null);
  const holderRef = useRef(null);
  const gemCanvasRef = useRef(null);
  const gemApi = useRef(null);

  // Campo de facetas del fondo
  useEffect(() => {
    const hero = heroRef.current;
    const field = createFacetField(fieldRef.current);
    let t = 0;
    const onResize = () => { clearTimeout(t); t = setTimeout(field.resize, 150); };
    const onMove = (e) => {
      const r = fieldRef.current.getBoundingClientRect();
      field.pointer(e.clientX - r.left, e.clientY - r.top);
    };
    addEventListener('resize', onResize);
    if (!reduce) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', field.leave);
    }
    return () => {
      clearTimeout(t);
      removeEventListener('resize', onResize);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', field.leave);
    };
  }, [reduce]);

  // Gema 3D: solo en pantallas grandes, con WebGL, sin ahorro de datos y sin pedir menos movimiento.
  // En celulares se queda la gema plana del logo, que se ve casi igual y no gasta batería ni datos.
  useEffect(() => {
    if (reduce || !matchMedia(DESKTOP_3D).matches || navigator.connection?.saveData || !hasWebGL()) return;
    const hero = heroRef.current;
    let api = null, cancelled = false;
    const onMove = (e) => api?.pointer(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1);
    const onLeave = () => api?.pointer(0, 0);

    const load = () => Promise.all([import('three'), import('./gem3d')])
      .then(([THREE, { createGem }]) => {
        if (cancelled) return;
        api = createGem(THREE, holderRef.current, gemCanvasRef.current);
        gemApi.current = api;
        api.scroll(clamp(window.scrollY / Math.max(1, hero.offsetHeight), 0, 1));
      })
      .catch((err) => console.warn('La gema 3D no se pudo iniciar; se muestra la versión plana.', err));

    // three.js pesa ~600 kB: se descarga con la primera interacción, así no compite con la carga inicial
    const TRIGGERS = ['pointermove', 'scroll', 'keydown', 'touchstart'];
    const start = () => { TRIGGERS.forEach((t) => removeEventListener(t, start)); load(); };
    TRIGGERS.forEach((t) => addEventListener(t, start, { once: true, passive: true }));

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      cancelled = true;
      TRIGGERS.forEach((t) => removeEventListener(t, start));
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      api?.dispose();
      gemApi.current = null;
    };
  }, [reduce]);

  useScrollFrame(() => {
    gemApi.current?.scroll(clamp(window.scrollY / Math.max(1, heroRef.current.offsetHeight), 0, 1));
  });

  return (
    <section className="hero" id="inicio" ref={heroRef}>
      <canvas id="facets" ref={fieldRef} aria-hidden="true" />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="code-label">&lt;desarrollo web en Valledupar /&gt;</p>
          <h1>Páginas web y software <em>a la medida</em> para tu negocio.</h1>
          <p className="lead">Diseñamos y programamos páginas web, tiendas virtuales, dashboards y apps para negocios de Valledupar y toda Colombia. Precio fijo por escrito, entrega a tiempo y trato directo con quien programa tu proyecto.</p>
          <div className="cta-row">
            <a className="btn btn-mint" href="#contacto">Cuéntame tu idea</a>
            <a className="btn btn-ghost" href="#vista-previa">Mira tu negocio en línea</a>
          </div>
          <ul className="trust">
            <li>Entrega desde 7 días</li>
            <li>Garantía de 30 días</li>
            <li>Cotización en 48 horas</li>
          </ul>
        </div>
        <div className="hero-gem" ref={holderRef}>
          <div className="gem-glow" aria-hidden="true" />
          <svg className="gem-svg" viewBox="0 0 200 240" role="img" aria-label="Esmeralda facetada de Emerald Solve con los símbolos de código tallados en el centro">
            <use href="#gem" />
          </svg>
          <canvas id="gem3d" ref={gemCanvasRef} aria-hidden="true" />
          <svg className="spark-svg" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" /></svg>
        </div>
      </div>
    </section>
  );
}
