import { useEffect, useRef, useState } from 'react';
import { BUSINESS_TYPES } from '../../data/businessTypes';
import { waLinkProps } from '../../lib/whatsapp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { BusinessIcon, Icon } from '../icons';
import PhoneMock from './PhoneMock';
import './Preview.css';

const VIEWS = [
  { id: 'cliente', label: 'Lo que ve tu cliente' },
  { id: 'admin', label: 'Lo que ves tú' },
];

// Reinicia una animación CSS quitando y volviendo a poner la clase
function restart(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

export default function Preview() {
  const reduce = useReducedMotion();
  const [type, setType] = useState('panaderia');
  const [view, setView] = useState('cliente');
  const [typed, setTyped] = useState('');
  const [live, setLive] = useState('');
  const siteRef = useRef(null);
  const chatRef = useRef(null);
  const prevType = useRef(type);

  const biz = BUSINESS_TYPES[type];
  const clean = typed.replace(/\s+/g, ' ').trim();
  const name = clean || biz.sample;

  useEffect(() => {
    if (prevType.current === type) return;
    prevType.current = type;
    if (!reduce) { restart(siteRef.current, 'swap'); restart(chatRef.current, 'pop'); }
  }, [type, reduce]);

  // Anuncio para lectores de pantalla, con un pequeño retraso para no interrumpir mientras se escribe
  useEffect(() => {
    const t = setTimeout(() => setLive(`Vista previa: ${biz.label}, ${name}${view === 'admin' ? ', panel de control.' : '.'}`), 700);
    return () => clearTimeout(t);
  }, [biz, name, view]);

  const ctaText = `Hola, tengo ${biz.art}${clean ? ` llamada ${clean}` : ''} y quiero una página como la vista previa de su web.`;

  return (
    <section className="sec" id="vista-previa">
      <div className="wrap">
        <header className="sec-head">
          <h2>Mira tu negocio en línea, ahora mismo.</h2>
          <p>Escribe el nombre de tu negocio y elige a qué te dedicas. Así se vería tu página en el celular de tus clientes, y así verías tú los pedidos.</p>
        </header>
        <div className="preview">
          <form className="pv-controls" noValidate onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="pvName">Nombre de tu negocio</label>
              <input id="pvName" maxLength={28} autoComplete="organization" placeholder={`Ej.: ${biz.sample}`} value={typed} onChange={(e) => setTyped(e.target.value)} />
            </div>
            <fieldset>
              <legend>¿A qué se dedica?</legend>
              <div className="chips">
                {Object.entries(BUSINESS_TYPES).map(([id, b]) => (
                  <label className="chip" key={id}>
                    <input type="radio" name="pvtype" value={id} checked={type === id} onChange={() => setType(id)} />
                    <span><BusinessIcon name={b.icon} />{b.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <p className="pv-legend" id="viewLbl">¿Qué quieres ver?</p>
              <div className="seg" role="group" aria-labelledby="viewLbl">
                {VIEWS.map((v) => (
                  <button key={v.id} type="button" aria-pressed={view === v.id} onClick={() => setView(v.id)}>{v.label}</button>
                ))}
              </div>
            </div>
            <div><a className="btn btn-mint" {...waLinkProps(ctaText)}>Quiero una página así</a></div>
            <p className="pv-note">Es una vista previa de ejemplo. Tu página se diseña desde cero con tus fotos, tus productos y tus colores.</p>
            <p className="sr-only" aria-live="polite">{live}</p>
          </form>

          <div className="pv-stage" aria-hidden="true">
            <PhoneMock ref={siteRef} biz={biz} name={name} view={view} />
            <div className="pv-chat" ref={chatRef}>
              <div className="chat-head"><span className="chat-ico"><Icon id="wa" /></span><span>Nuevo mensaje para <b>{name}</b></span></div>
              <p className="chat-msg">{biz.chat}</p>
              <span className="chat-time">Hace un momento</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
