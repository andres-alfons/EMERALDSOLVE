import { SITE } from '../../config/site';
import './Founder.css';

const STACK = ['React', '.NET 8', 'PostgreSQL', 'Supabase', 'Vercel'];

export default function Founder() {
  return (
    <section className="sec" id="nosotros">
      <div className="wrap founder">
        <div className="founder-head">
          <h2>Quién está detrás</h2>
          <p className="founder-sign">{SITE.founder}</p>
          <p className="founder-role">Fundador y desarrollador de {SITE.name}</p>
        </div>
        <div className="founder-body">
          <p>Soy desarrollador de software en Valledupar. Atiendo cada proyecto personalmente, desde la primera charla hasta la entrega, para que siempre sepas quién está construyendo lo tuyo.</p>
          <p>Trabajo con <strong>React</strong>, <strong>.NET</strong> y <strong>PostgreSQL</strong>, las mismas tecnologías que usan empresas grandes, y publico en servicios en la nube como Vercel para que tu página cargue rápido.</p>
          <ul className="stack" aria-label="Tecnologías">{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
