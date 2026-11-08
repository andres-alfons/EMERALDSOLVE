import { SITE } from '../src/config/site.js';
import { structuredData } from '../src/seo/structuredData.js';

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE.url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

function webManifest() {
  return JSON.stringify({
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.seo.description,
    lang: 'es-CO',
    start_url: '/',
    display: 'standalone',
    background_color: '#0E1012',
    theme_color: '#0E1012',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }, null, 2);
}

// Completa las etiquetas del <head> con los datos de src/config/site.js y genera robots.txt, sitemap.xml
// y site.webmanifest al compilar, para que el dominio y los textos vivan en un solo lugar.
export default function seoPlugin() {
  const tokens = {
    '%SITE_URL%': SITE.url,
    '%SEO_TITLE%': escapeAttr(SITE.seo.title),
    '%SEO_DESCRIPTION%': escapeAttr(SITE.seo.description),
    '%SEO_IMAGE%': SITE.url + SITE.seo.image,
    '%SEO_IMAGE_ALT%': escapeAttr(SITE.seo.imageAlt),
    '%SITE_NAME%': escapeAttr(SITE.name),
  };

  return {
    name: 'emerald-seo',
    transformIndexHtml(html) {
      let out = html;
      for (const [token, value] of Object.entries(tokens)) out = out.split(token).join(value);
      const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c');
      return out.replace('<!--structured-data-->', `<script type="application/ld+json">${json}</script>`);
    },
    configureServer(server) {
      const files = { '/robots.txt': ['text/plain', robotsTxt], '/sitemap.xml': ['application/xml', sitemapXml], '/site.webmanifest': ['application/manifest+json', webManifest] };
      server.middlewares.use((req, res, next) => {
        const file = files[req.url];
        if (!file) return next();
        res.setHeader('Content-Type', `${file[0]}; charset=utf-8`);
        res.end(file[1]());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: webManifest() });
    },
  };
}
