import { SITE } from '../config/site';

// Enlace a WhatsApp con el mensaje ya escrito, dirigido al usuario de SITE.whatsapp.
export function waHref(text = '') {
  return (
    'https://api.whatsapp.com/send/?text=' + encodeURIComponent(text) +
    '&username=' + encodeURIComponent(SITE.whatsapp.username) +
    '&type=username&app_absent=0'
  );
}

// Props para un <a> que abre WhatsApp en otra pestaña.
export function waLinkProps(text) {
  return { href: waHref(text), target: '_blank', rel: 'noopener' };
}
