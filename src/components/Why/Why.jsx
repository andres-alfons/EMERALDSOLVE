import './Why.css';

const REASONS = [
  {
    title: 'Precio fijo por escrito',
    text: 'Sabes cuánto vas a pagar antes de empezar. Sin cobros sorpresa al final.',
    icon: <><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6M10 17h4" /></>,
  },
  {
    title: 'Hablas con quien programa',
    text: 'Sin intermediarios. Escribes por WhatsApp y te responde la misma persona que construye tu proyecto.',
    icon: <><path d="M4 19l1.3-3.9A8 8 0 1 1 8.9 18.7z" /><path d="M9 11h.01M12 11h.01M15 11h.01" /></>,
  },
  {
    title: 'Avances cada semana',
    text: 'Recibes un enlace de prueba para ver cómo crece tu página antes de la entrega.',
    icon: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /><path d="M8 14l2.5 2.5L16 13" /></>,
  },
  {
    title: 'Es tuyo',
    text: 'Al terminar de pagar, el sitio, el dominio y el código quedan a tu nombre.',
    icon: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></>,
  },
];

export default function Why() {
  return (
    <section className="sec why">
      <div className="wrap">
        <header className="sec-head">
          <h2>Lo que te llevas al trabajar con nosotros.</h2>
        </header>
        <div className="why-grid">
          {REASONS.map((r) => (
            <article className="why-item" key={r.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{r.icon}</svg>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
