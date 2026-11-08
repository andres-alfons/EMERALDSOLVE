import { forwardRef } from 'react';
import { BusinessIcon, Icon } from '../icons';

const STATUS_CLASS = ['s0', 's1', 's2'];
const BARS = [46, 62, 54, 70, 58, 88, 76];
const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function initials(n) {
  let w = n.split(' ').filter((x) => x && !/^(la|el|los|las|de|del|y)$/i.test(x));
  if (!w.length) w = n.split(' ');
  return ((w[0]?.charAt(0) ?? '') + (w[1]?.charAt(0) ?? '')).toUpperCase() || 'ES';
}

// El celular con la página de ejemplo (vista del cliente) y el panel de control (vista del dueño).
const PhoneMock = forwardRef(function PhoneMock({ biz, name, view }, siteRef) {
  const p = biz.pal;
  const palette = {
    '--s-bg': p.bg, '--s-ink': p.ink, '--s-head': p.head, '--s-acc': p.acc,
    '--s-tile': p.tile, '--s-card': p.card, '--s-price': p.price,
  };

  return (
    <div className="pv-phone">
      <div className="site" ref={siteRef} data-view={view} style={palette}>
        <div className="view v-client">
          <div className="s-bar"><span className="s-logo">{initials(name)}</span><span className="s-name">{name}</span><span className="s-menu" /></div>
          <div className="s-hero">
            <BusinessIcon name={biz.icon} />
            <span className="s-kind">{biz.label}</span>
            <span className="s-tag">{biz.tag}</span>
            <span className="s-cta">{biz.cta}</span>
          </div>
          <span className="s-sec">{biz.sec}</span>
          <div className="s-grid">
            {biz.items.map(([item, price]) => (
              <div className="s-item" key={item}>
                <span className="s-thumb"><BusinessIcon name={biz.icon} /></span>
                <span className="s-iname">{item}</span>
                <span className="s-price">{price}</span>
              </div>
            ))}
          </div>
          <div className="s-foot">
            <div className="s-info"><span>Valledupar, Cesar</span><span>{biz.info}</span></div>
            <span className="s-wa"><Icon id="wa" />Escríbenos por WhatsApp</span>
          </div>
        </div>
        <div className="view v-admin">
          <div className="a-head"><span className="a-small">Panel de control</span><span className="a-title">{name}</span></div>
          <div className="a-kpis">
            <div className="a-kpi"><span>{biz.kpi[0]}</span><b>{biz.kpi[1]}</b></div>
            <div className="a-kpi"><span>{biz.kpi[2]}</span><b>{biz.kpi[3]}</b></div>
          </div>
          <div className="a-chart">
            <p><span>Ventas de la semana</span><span>Ejemplo</span></p>
            <div className="a-bars">{BARS.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="a-days">{DAYS.map((d, i) => <span key={i}>{d}</span>)}</div>
          </div>
          <span className="s-sec">{biz.osec}</span>
          <div className="a-list">
            {biz.orders.map(([order, status], i) => (
              <div className="a-row" key={i}><span>{order}</span><span className={`a-st ${STATUS_CLASS[i]}`}>{status}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default PhoneMock;
