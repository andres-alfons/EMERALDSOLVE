import { FAQ } from '../../data/faq';
import './Faq.css';

export default function Faq() {
  return (
    <section className="sec" id="preguntas" style={{ paddingTop: 0 }}>
      <div className="wrap faq-wrap">
        <header className="sec-head">
          <h2>Preguntas frecuentes</h2>
          <p>¿Tienes otra duda? Escríbenos por WhatsApp y te respondemos en horario de atención.</p>
        </header>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
