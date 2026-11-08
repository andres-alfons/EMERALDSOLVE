// Inserta el HTML de la página ya renderizado en dist/index.html, para que buscadores y redes sociales
// vean todo el contenido sin ejecutar JavaScript y para que el primer pintado sea inmediato.
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const ssrDir = fileURLToPath(new URL('../dist-ssr/', import.meta.url));

const { render } = await import(pathToFileURL(ssrDir + 'entry-server.js').href);
let html = readFileSync(dist + 'index.html', 'utf8');
if (!html.includes('<!--app-html-->')) throw new Error('No se encontró <!--app-html--> en dist/index.html');
html = html.replace('<!--app-html-->', render());

// El CSS (~8 kB comprimido) va dentro del HTML: así no hay que esperar otra descarga antes del primer pintado
html = html.replace(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/g, (_, file) => {
  const css = readFileSync(dist + 'assets/' + file, 'utf8').replace(/<\/style/gi, '<\\/style');
  return `<style>${css}</style>`;
});

// Precarga las fuentes del texto principal (subconjunto latino) para que no cambie la tipografía al cargar
const fonts = readdirSync(dist + 'assets').filter((f) => /^(manrope|playfair-display)-latin-wght-normal.*\.woff2$/.test(f));
const preload = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ');
html = html.replace('</title>', `</title>\n    ${preload}`);

writeFileSync(dist + 'index.html', html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerender listo: ${(html.length / 1024).toFixed(1)} kB, ${fonts.length} fuentes precargadas.`);
