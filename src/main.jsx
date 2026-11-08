import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/manrope';
import '@fontsource-variable/playfair-display/wght.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import './styles/global.css';
import App from './App';

const root = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;

// En producción el HTML ya viene renderizado (scripts/prerender.js), así que React solo lo "hidrata".
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
