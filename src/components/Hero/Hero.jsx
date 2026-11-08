import { useEffect, useRef } from 'react';
import { clamp } from '../../lib/format';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { createFacetField } from './facetField';
import './Hero.css';

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

  // Gema 3D: three.js se carga aparte, solo si hay WebGL y no se pidió reducir el movimiento
  useEffect(() => {
    if (reduce || !hasWebGL()) return;
    const hero = heroRef.current;
    let api = null, cancelled = false;
    const onMove = (e) => api?.pointer(e.clientX / innerWidth * 2 - 1, e.clientY / innerHeight * 2 - 1);
    const onLeave = () => api?.pointer(0, 0);

    Promise.all([import('three'), import('./gem3d')])
      .then(([THREE, { createGem }]) => {
        if (cancelled) return;
        api = createGem(THREE, holderRef.current, gemCanvasRef.current);
        gemApi.current = api;
        api.scroll(clamp(window.scrollY / Math.max(1, hero.offsetHeight), 0, 1));
      })
      .catch((err) => console.warn('La gema 3D no se pudo iniciar; se muestra la versión plana.', err));

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      cancelled = true;
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
          <p className="code-label">&lt;software a la medida /&gt;</p>
          <h1>Le damos forma <em>digital</em> a tu idea.</h1>
          <p className="lead">Páginas web, tiendas virtuales, dashboards y apps hechas a la medida de tu negocio. Precio fijo por escrito, entrega a tiempo y trato directo con quien programa tu proyecto.</p>
          <div className="cta-row">
            <a className="btn btn-mint" href="#contacto">Cuéntame tu idea</a>
            <a className="btn btn-ghost" href="#vista-previa">Mira tu negocio en línea</a>
          </div>
          <ul className="trust">
            <li>Entrega desde 7 días</li>
            <li>Garantía de 30 días</li>
            <li>Desde Valledupar para toda Colombia</li>
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
