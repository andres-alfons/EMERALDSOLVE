import { waLinkProps } from '../../lib/whatsapp';
import { Icon } from '../icons';
import './WhatsAppFloat.css';

export default function WhatsAppFloat() {
  return (
    <a className="wa-float" {...waLinkProps('Hola, vi la página de Emerald Solve y quiero más información.')} aria-label="Escribir por WhatsApp">
      <Icon id="wa" />
      <span>WhatsApp</span>
    </a>
  );
}
