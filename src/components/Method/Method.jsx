import { useRef, useState } from 'react';
import { clamp, smooth } from '../../lib/format';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import './Method.css';

const STEPS = [
  {
    num: 'Etapa 1 de 3: escuchar', title: 'La idea en bruto',
    text: 'Hablamos 20 minutos, gratis. Me cuentas qué vendes, qué te quita tiempo y qué quieres lograr. En 48 horas recibes una cotización con precio, alcance y fecha de entrega.',
    tags: ['Charla gratis', 'Cotización en 48 h'],
  },
  {
    num: 'Etapa 2 de 3: diseñar', title: 'El tallado',
    text: 'Diseño cada pantalla y te la muestro antes de escribir una línea de código. Ajustamos colores, textos y secciones hasta que se sienta tuya.',
    tags: ['Maqueta visual', '2 rondas de cambios'],
  },
  {
    num: 'Etapa 3 de 3: construir', title: 'La pieza pulida',
    text: 'Programo, pruebo en celular y computador, y la publico con tu dominio. Te enseño a usarla y te quedas con todo: el sitio, el dominio y el código.',
    tags: ['Publicación', 'Capacitación', 'Garantía de 30 días'],
  },
];

const FACETS = [
  ['0,60 100,0 100,50 45,82', '#34E0A6'],
  ['100,0 200,60 155,82 100,50', '#1FB884'],
  ['200,60 200,180 155,158 155,82', '#0E8F65'],
  ['200,180 100,240 100,190 155,158', '#06523B'],
  ['100,240 0,180 45,158 100,190', '#0A6B4C'],
  ['0,180 0,60 45,82 45,158', '#14A576'],
  ['100,50 155,82 155,158 100,190 45,158 45,82', '#0B7A55'],
];
const CRACKS = ['70,10 84,70 60,122', '180,32 142,94 166,152', '34,212 94,170 150,226'];
const BRACKETS = ['88,96 64,120 88,144', '112,96 136,120 112,144'];

const MINT = [124, 255, 201], INK = [6, 42, 31];
const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
const localProgress = (el, line) => { const r = el.getBoundingClientRect(); return clamp((line - r.top) / r.height, 0, 1); };

// La piedra se talla al ritmo del scroll: roca, facetas, color y el < > del logo.
export default function Method() {
  const [stage, setStage] = useState(3);
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const stepRefs = useRef([]);

  useScrollFrame(() => {
    const sr = sectionRef.current.getBoundingClientRect();
    if (sr.bottom < -300 || sr.top > innerHeight + 300) return;
    const svg = svgRef.current;
    const line = innerHeight * 0.55;
    let [l1, l2, l3] = stepRefs.current.map((s) => localProgress(s, line));
    if (prefersReducedMotion()) { l1 = l1 > 0 ? 1 : 0; l2 = l2 > 0 ? 1 : 0; l3 = l3 > 0 ? 1 : 0; }

    const rock = svg.querySelector('.rock');
    rock.style.opacity = (1 - smooth(l2 * 1.4)).toFixed(3);
    rock.style.transform = `rotate(${((1 - l1) * -8).toFixed(2)}deg) scale(${(1 - 0.08 * smooth(l2)).toFixed(3)})`;
    svg.querySelectorAll('.rock-crack').forEach((c, i) => {
      c.style.strokeDashoffset = (100 * (1 - smooth(l1 * 1.4 - i * 0.15))).toFixed(1);
    });
    svg.querySelectorAll('.facet').forEach((f, i) => {
      const drawn = smooth(l2 * 1.5 - i * 0.07), filled = smooth(l3 * 1.7 - i * 0.1);
      f.style.strokeDashoffset = (100 * (1 - drawn)).toFixed(1);
      f.style.fillOpacity = filled.toFixed(3);
      f.style.stroke = mix(MINT, INK, filled);
      f.style.strokeWidth = (2.6 - filled * 1.1).toFixed(2);
    });
    const bd = smooth(l3 * 2 - 0.7);
    svg.querySelectorAll('.bracket').forEach((b) => { b.style.strokeDashoffset = (100 * (1 - bd)).toFixed(1); });
    const spark = svg.querySelector('.spark'), sp = smooth((l3 - 0.82) * 6);
    spark.style.opacity = sp.toFixed(3);
    spark.style.transform = `scale(${(0.4 + 0.6 * sp).toFixed(3)}) rotate(${((1 - sp) * -45).toFixed(1)}deg)`;

    setStage(l3 > 0 ? 3 : l2 > 0 ? 2 : 1);
  });

  return (
    <section className="sec" id="metodo" style={{ paddingTop: 0 }} ref={sectionRef}>
      <div className="wrap">
        <header className="sec-head">
          <h2>Una esmeralda no nace pulida. Tu software tampoco.</h2>
          <p>Cada proyecto pasa por tres etapas, y tú apruebas cada una antes de seguir a la siguiente.</p>
        </header>
        <div className="story-grid">
          <div className="story-visual">
            <div className="story-sticky">
              <svg className="story-gem" ref={svgRef} data-stage={stage} viewBox="-24 -24 248 288" aria-hidden="true">
                <g className="rock">
                  <polygon className="rock-body" points="24,58 70,10 128,0 180,32 200,98 194,172 150,226 90,240 34,212 4,146" />
                  <polygon className="rock-face" points="84,70 142,94 166,152 94,170 60,122" />
                  {CRACKS.map((pts) => <polyline key={pts} className="rock-crack" pathLength="100" points={pts} />)}
                </g>
                {FACETS.map(([pts, fill]) => <polygon key={pts} className="facet" pathLength="100" points={pts} fill={fill} />)}
                {BRACKETS.map((pts) => <polyline key={pts} className="bracket" pathLength="100" points={pts} />)}
                <path className="spark" d="M172 6 L177 21 L192 26 L177 31 L172 46 L167 31 L152 26 L167 21 Z" />
              </svg>
              <p className="stage-label" aria-live="polite">{STEPS[stage - 1].title}</p>
              <div className="stage-dots" aria-hidden="true"><span /><span /><span /></div>
            </div>
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`step${stage === i + 1 ? ' active' : ''}`} ref={(el) => { stepRefs.current[i] = el; }}>
                <p className="step-num">{s.num}</p>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="tag-row">{s.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
