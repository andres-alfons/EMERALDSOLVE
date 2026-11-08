import { SITE } from '../config/site';

export default function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label={`${SITE.name}, ir al inicio`}>
      <img className="brand-gem" src="/logo.png" alt="" width="30" height="36" />
      <span>Emerald <em>Solve</em></span>
    </a>
  );
}
