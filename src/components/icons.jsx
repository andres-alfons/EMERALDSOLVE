// Sprite SVG con la gema del logo y el ícono de WhatsApp. Se monta una vez en App y se usa con <use href="#gem">.
export function SvgSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <symbol id="gem" viewBox="0 0 200 240">
        <g stroke="#062A1F" strokeWidth="1.5" strokeLinejoin="round">
          <polygon points="0,60 100,0 100,50 45,82" fill="#34E0A6" />
          <polygon points="100,0 200,60 155,82 100,50" fill="#1FB884" />
          <polygon points="200,60 200,180 155,158 155,82" fill="#0E8F65" />
          <polygon points="200,180 100,240 100,190 155,158" fill="#06523B" />
          <polygon points="100,240 0,180 45,158 100,190" fill="#0A6B4C" />
          <polygon points="0,180 0,60 45,82 45,158" fill="#14A576" />
          <polygon points="100,50 155,82 155,158 100,190 45,158 45,82" fill="#0B7A55" />
        </g>
        <polyline points="88,96 64,120 88,144" fill="none" stroke="#7CFFC9" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="112,96 136,120 112,144" fill="none" stroke="#7CFFC9" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="wa" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
      </symbol>
      <symbol id="ig" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.2" />
      </symbol>
      <symbol id="tt" viewBox="0 0 24 24">
        <path d="M16.6 2.5c.4 2.4 1.9 4 4.4 4.3v3.3a7.8 7.8 0 0 1-4.3-1.3v6.6a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.4a2.9 2.9 0 1 0 2 2.7V2.5z" />
      </symbol>
    </svg>
  );
}

export function Icon({ id, className }) {
  return <svg className={className} aria-hidden="true"><use href={`#${id}`} /></svg>;
}

// Íconos de línea para la vista previa de negocios
export const BUSINESS_ICONS = {
  pan: <><path d="M4 12c0-3.3 3.6-6 8-6s8 2.7 8 6v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M9 10l1.5 2.5M12.5 9.5l1.5 2.5M16 10.5l1 2" /></>,
  tijeras: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="M8.2 15 18 4M15.8 15 6 4" /></>,
  plato: <><circle cx="13" cy="13" r="6.5" /><circle cx="13" cy="13" r="3" /><path d="M3.5 4v4.5a1.5 1.5 0 0 0 3 0V4M5 9v11" /></>,
  martillo: <><path d="M14.5 3.5h5v4l-2 2-5-5z" /><path d="M12.5 5.5 4 14a2.1 2.1 0 0 0 3 3l8.5-8.5" /></>,
  camisa: <path d="M8 4 4 6.5 5.5 11 8 10v10h8V10l2.5 1L20 6.5 16 4c-.6 1.5-2 2.5-4 2.5S8.6 5.5 8 4z" />,
  diente: <path d="M7 3.5c-2 0-3.5 1.6-3.5 4 0 2.6 1.2 4 1.8 6.6.5 2.3.8 6.4 2.6 6.4 1.6 0 1.6-4.5 4.1-4.5s2.5 4.5 4.1 4.5c1.8 0 2.1-4.1 2.6-6.4.6-2.6 1.8-4 1.8-6.6 0-2.4-1.5-4-3.5-4-1.9 0-3 1-5 1s-3.1-1-5-1z" />,
};

export function BusinessIcon({ name }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true">{BUSINESS_ICONS[name]}</svg>;
}
