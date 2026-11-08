import { useRef, useState } from 'react';
import { SITE } from '../../config/site';
import { waHref, waLinkProps } from '../../lib/whatsapp';
import { Icon } from '../icons';
import './Contact.css';

const SERVICES = [
  'Una landing page',
  'Un sitio web informativo',
  'Una tienda virtual',
  'Un dashboard o sistema interno',
  'Una app o plataforma a la medida',
  'Todavía no sé, quiero asesoría',
];

const CHANNELS = [
  { label: 'WhatsApp', icon: 'wa', value: SITE.whatsapp.label, link: waLinkProps('Hola, vi la página de Emerald Solve y quiero más información.') },
  { label: 'Instagram', icon: 'ig', value: SITE.instagram.label, link: { href: SITE.instagram.url, target: '_blank', rel: 'noopener' } },
  { label: 'TikTok', icon: 'tt', value: SITE.tiktok.label, link: { href: SITE.tiktok.url, target: '_blank', rel: 'noopener' } },
];

// Arma el mensaje de WhatsApp que el visitante se envía con sus datos
export default function Contact() {
  const [form, setForm] = useState({ nombre: '', negocio: '', servicio: SERVICES[0], idea: '' });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const refs = { nombre: useRef(null), negocio: useRef(null) };
  const waLinkRef = useRef(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function submit(e) {
    e.preventDefault();
    const nombre = form.nombre.trim(), negocio = form.negocio.trim(), idea = form.idea.trim();
    const fail = (field, text) => { setError({ field, text }); refs[field].current.focus(); };
    if (!nombre) return fail('nombre', 'Escribe tu nombre para preparar el mensaje.');
    if (!negocio) return fail('negocio', 'Escribe el nombre de tu negocio para preparar el mensaje.');
    setError(null);
    setMessage(`Hola, soy ${nombre} de ${negocio}.\nMe interesa: ${form.servicio}.${idea ? `\nMi idea: ${idea}` : ''}`);
    requestAnimationFrame(() => waLinkRef.current?.focus());
  }

  const invalid = (field) => error?.field === field ? { 'aria-invalid': true, 'aria-describedby': 'formError' } : {};

  return (
    <section id="contacto">
      <div className="wrap">
        <div className="contact-card">
          <div className="contact-copy">
            <h2>¿Tienes una idea? Démosle forma.</h2>
            <p>Cuéntanos qué necesitas y en menos de 48 horas tienes una propuesta con precio y fecha de entrega.</p>
            <ul className="contact-list">
              {CHANNELS.map((c) => (
                <li key={c.label}>
                  <Icon id={c.icon} className="c-icon" />
                  <div className="c-text"><span>{c.label}</span><a {...c.link}>{c.value}</a></div>
                </li>
              ))}
              <li>
                <div className="c-text"><span>Ubicación</span><strong>{SITE.location}</strong></div>
              </li>
            </ul>
          </div>
          <form className="idea-form" noValidate onSubmit={submit}>
            <p className="form-title">Arma tu mensaje</p>
            <div className="form-row">
              <div className="field">
                <label htmlFor="f-nombre">Tu nombre</label>
                <input id="f-nombre" ref={refs.nombre} autoComplete="name" placeholder="Ej.: Laura Gómez" value={form.nombre} onChange={update('nombre')} {...invalid('nombre')} />
              </div>
              <div className="field">
                <label htmlFor="f-negocio">Tu negocio</label>
                <input id="f-negocio" ref={refs.negocio} autoComplete="organization" placeholder="Ej.: Panadería La Espiga" value={form.negocio} onChange={update('negocio')} {...invalid('negocio')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-servicio">¿Qué necesitas?</label>
              <select id="f-servicio" value={form.servicio} onChange={update('servicio')}>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-idea">Cuéntanos tu idea</label>
              <textarea id="f-idea" placeholder="Ej.: Quiero que mis clientes vean el menú y hagan pedidos desde el celular." value={form.idea} onChange={update('idea')} />
            </div>
            {error && <p className="form-error" id="formError" role="alert">{error.text}</p>}
            <button className="btn btn-mint" type="submit">Preparar mensaje de WhatsApp</button>
            {message && (
              <div className="wa-out">
                <p>{message}</p>
                <a className="btn btn-mint" ref={waLinkRef} href={waHref(message)} target="_blank" rel="noopener">Abrir WhatsApp con este mensaje</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
