import { useEffect, useState } from 'react';
import { EXTRAS, MANTENIMIENTO, PRECIOS, QUOTE_TYPES } from '../../data/pricing';
import { cop } from '../../lib/format';
import { waLinkProps } from '../../lib/whatsapp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';
import './Estimator.css';

const unitText = (c, v) => `${v} ${v === 1 ? c.uno : c.unidad.toLowerCase()}`;

// Calcula el total y arma el mensaje de WhatsApp a partir de lo que eligió el visitante
function computeQuote({ type, size, extras, maint }) {
  const c = PRECIOS[type];
  const chosen = EXTRAS.filter((e) => extras[e.id]);
  const plan = MANTENIMIENTO.find((m) => m.id === maint);
  const project = c.base + c.extra(size) + chosen.reduce((s, e) => s + e.price, 0);
  // El mantenimiento empieza con la entrega: el primer mes se suma al total y al segundo pago
  const total = project + plan.price;
  const adv = Math.round(project / 2);
  const eta = c.eta(size);

  const lines = ['Hola, hice un estimado en su página:', `- Proyecto: ${c.nombre} (${unitText(c, size)})`];
  if (chosen.length) lines.push(`- Extras: ${chosen.map((e) => e.short).join(', ')}`);
  if (plan.price) lines.push(`- Mantenimiento: ${plan.label} (${cop(plan.price)} al mes)`);
  lines.push(`- Estimado: ${cop(total)}${plan.price ? ' con el primer mes de mantenimiento' : ''}, entrega en ${eta}`);
  lines.push('¿Me ayudan con la cotización formal?');

  return { c, total, adv, rest: total - adv, eta, plan, message: lines.join('\n') };
}

export default function Estimator() {
  const reduce = useReducedMotion();
  const [type, setType] = useState('landing');
  const [size, setSize] = useState(PRECIOS.landing.incl);
  const [extras, setExtras] = useState({});
  const [maint, setMaint] = useState('no');
  const [live, setLive] = useState('');

  const q = computeQuote({ type, size, extras, maint });
  const shownTotal = useAnimatedNumber(q.total, reduce);

  useEffect(() => {
    const t = setTimeout(() => setLive(`Estimado: ${cop(q.total)}. Entrega estimada: ${q.eta}.`), 650);
    return () => clearTimeout(t);
  }, [q.total, q.eta]);

  function chooseType(t) {
    setType(t);
    setSize(PRECIOS[t].incl);
  }

  return (
    <div className="quote" id="cotizador">
      <form className="quote-form" noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="quote-headline">
          <h3>Calcula tu inversión</h3>
          <p>Elige qué necesitas y mira el estimado al instante.</p>
        </div>
        <fieldset>
          <legend>¿Qué necesitas?</legend>
          <div className="opts">
            {QUOTE_TYPES.map((t) => (
              <label className="opt" key={t.value}>
                <input type="radio" name="qtype" value={t.value} checked={type === t.value} onChange={() => chooseType(t.value)} />
                <span className="opt-body"><strong>{t.label}</strong><small>desde {cop(PRECIOS[t.value].base)}</small></span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="range-field">
          <div className="range-head">
            <label htmlFor="qSize">{q.c.unidad}</label>
            <output htmlFor="qSize">{unitText(q.c, size)}</output>
          </div>
          <input type="range" id="qSize" min={q.c.min} max={q.c.max} step={q.c.step} value={size} onChange={(e) => setSize(parseInt(e.target.value, 10))} />
          <p className="range-hint">{q.c.hint}</p>
        </div>
        <fieldset>
          <legend>Extras</legend>
          <div className="checks-q">
            {EXTRAS.map((e) => (
              <label className="check" key={e.id}>
                <input type="checkbox" checked={!!extras[e.id]} onChange={(ev) => setExtras((x) => ({ ...x, [e.id]: ev.target.checked }))} />
                <span>{e.label}</span><b>+{cop(e.price)}</b>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Mantenimiento mensual</legend>
          <div className="chips">
            {MANTENIMIENTO.map((m) => (
              <label className="chip" key={m.id}>
                <input type="radio" name="qmant" value={m.id} checked={maint === m.id} onChange={() => setMaint(m.id)} />
                <span>{m.price ? `${m.label}, ${cop(m.price)}` : m.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
      <aside className="quote-out" aria-labelledby="qOutTitle">
        <p className="q-label" id="qOutTitle">Inversión estimada</p>
        <p className="q-total">{cop(shownTotal)}</p>
        <dl className="q-rows">
          <div><dt>Para empezar (50 %)</dt><dd>{cop(q.adv)}</dd></div>
          <div><dt>{q.plan.price ? 'Al entregar (50 % + primer mes)' : 'Al entregar (50 %)'}</dt><dd>{cop(q.rest)}</dd></div>
          <div><dt>Entrega estimada</dt><dd>{q.eta}</dd></div>
          {q.plan.price > 0 && <div><dt>Mantenimiento</dt><dd>{cop(q.plan.price)} al mes, desde la entrega</dd></div>}
        </dl>
        {type === 'landing' && (
          <p className="q-offer">Oferta de lanzamiento: si eres de los primeros 3 negocios de noviembre, la landing base queda en $400.000.</p>
        )}
        <a className="btn btn-mint" {...waLinkProps(q.message)}>Enviar esta cotización por WhatsApp</a>
        <p className="q-note">Incluye el dominio .com o .co por un año. Es un estimado: el precio final queda por escrito en tu cotización.</p>
        <p className="sr-only" aria-live="polite">{live}</p>
      </aside>
    </div>
  );
}
