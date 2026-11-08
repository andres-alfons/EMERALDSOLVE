import { LAUNCH_OFFER, PACKAGES } from '../../data/packages';
import { waLinkProps } from '../../lib/whatsapp';
import Estimator from '../Estimator/Estimator';
import './Packages.css';

function PackageCard({ pkg }) {
  return (
    <article className={`pkg${pkg.wide ? ' pkg-wide' : ''}`}>
      <div className="pkg-top">
        <p className="pkg-tag">{pkg.tag}</p>
        {pkg.badge && <span className="badge">{pkg.badge}</span>}
      </div>
      <h3>{pkg.name}</h3>
      <p className="pkg-sub">{pkg.sub}</p>
      {pkg.price
        ? <p className="price"><span>Desde</span>{pkg.price}<small>COP</small></p>
        : <p className="price">Cotización</p>}
      <ul className="checks">{pkg.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <p className="eta">{pkg.eta}</p>
      <a className={`btn ${pkg.primary ? 'btn-mint' : 'btn-ghost'}`} {...waLinkProps(pkg.wa)}>{pkg.cta ?? 'Quiero este paquete'}</a>
    </article>
  );
}

export default function Packages() {
  return (
    <section className="sec" id="paquetes" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <header className="sec-head">
          <h2>Precios claros desde el primer mensaje.</h2>
          <p>Precios base en pesos colombianos. Cada proyecto se cotiza por escrito antes de empezar, y pagas 50 % al iniciar y 50 % al recibir.</p>
        </header>
        <div className="launch">
          <span className="pill">Lanzamiento</span>
          <p><strong>{LAUNCH_OFFER.text}</strong> {LAUNCH_OFFER.detail}</p>
          <a {...waLinkProps(LAUNCH_OFFER.wa)}>Separar mi cupo</a>
        </div>
        <div className="pkgs">
          {PACKAGES.map((p) => <PackageCard key={p.name} pkg={p} />)}
        </div>
        <p className="pkg-note">Todos los paquetes incluyen el dominio .com o .co por un año. Mantenimiento opcional desde $120.000 al mes: hosting, copias de seguridad y cambios pequeños.</p>

        <Estimator />
      </div>
    </section>
  );
}
