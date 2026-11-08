import { NAV_LINKS, SITE } from '../../config/site';
import { Icon } from '../icons';
import Brand from '../Brand';
import './Footer.css';

const SOCIAL = [
  { label: 'Instagram', icon: 'ig', href: SITE.instagram.url },
  { label: 'TikTok', icon: 'tt', href: SITE.tiktok.url },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <Brand />
            <p className="slogan">{SITE.slogan}</p>
            <div className="social">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`${SITE.name} en ${s.label}`}>
                  <Icon id={s.icon} />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Pie de página">
            <h3>Navegación</h3>
            <ul>{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li><a href="#contacto">Escríbenos</a></li>
              <li><a href={SITE.instagram.url} target="_blank" rel="noopener">Instagram</a></li>
              <li><a href={SITE.tiktok.url} target="_blank" rel="noopener">TikTok</a></li>
              <li>{SITE.city}</li>
            </ul>
          </div>
        </div>
        <div className="foot-legal"><p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p><p>Hecho en Valledupar, Colombia.</p></div>
      </div>
    </footer>
  );
}
