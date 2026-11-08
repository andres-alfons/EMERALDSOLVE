import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../../config/site';
import { useScrollFrame } from '../../hooks/useScrollFrame';
import { prefersReducedMotion } from '../../hooks/useReducedMotion';
import Brand from '../Brand';
import './Header.css';

const timelineOK = typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()');

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef(null);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  useScrollFrame(() => {
    const y = window.scrollY;
    setScrolled(y > 12);
    if (!timelineOK || prefersReducedMotion()) {
      const max = document.documentElement.scrollHeight - innerHeight;
      barRef.current.style.transform = `scaleX(${(max > 0 ? y / max : 0).toFixed(4)})`;
    }
    if (innerWidth > 820) setMenuOpen(false);
  });

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current.querySelector('a')?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { setMenuOpen(false); menuBtnRef.current.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const navClass = ['nav', scrolled && 'scrolled', menuOpen && 'menu-open'].filter(Boolean).join(' ');

  return (
    <header className={navClass}>
      <div className="wrap nav-in">
        <Brand />
        <nav className="nav-links" aria-label="Principal">
          {NAV_LINKS.filter((l) => !l.mobileOnly).map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-actions">
          <a className="btn btn-mint btn-sm nav-cta" href="#contacto">Cuéntame tu idea</a>
          <button
            ref={menuBtnRef}
            className="menu-btn"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <div
        className="mobile-menu"
        id="mobileMenu"
        ref={menuRef}
        hidden={!menuOpen}
        onClick={(e) => { if (e.target.closest('a')) setMenuOpen(false); }}
      >
        <nav className="wrap" aria-label="Menú">
          {NAV_LINKS.map((l) => <a key={l.href} className="m-link" href={l.href}>{l.label}</a>)}
          <a className="btn btn-mint" href="#contacto">Cuéntame tu idea</a>
        </nav>
      </div>
      <div className="progress" ref={barRef} aria-hidden="true" />
    </header>
  );
}
