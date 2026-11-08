import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Lo usa scripts/prerender.js para generar el HTML estático de la página al compilar
export function render() {
  return renderToString(<StrictMode><App /></StrictMode>);
}
