# Emerald Solve

Página de Emerald Solve hecha con Vite + React.

```bash
npm install
npm run dev      # servidor local en http://localhost:5173
npm run build    # genera la carpeta dist/ para publicar
```

## Dónde cambiar cada cosa

- `src/config/site.js`: WhatsApp, Instagram, TikTok, ubicación y menú
- `src/data/`: precios del cotizador, paquetes, preguntas frecuentes y negocios de la vista previa
- `src/components/`: una carpeta por sección, cada una con su `.jsx` y su `.css`
- `src/styles/global.css`: colores, tipografías y estilos compartidos
- `public/logo.png`: el logo (fondo transparente), también usado como favicon

## SEO y rendimiento

- **Título, descripción, dominio e imagen para redes**: `SITE.url` y `SITE.seo` en `src/config/site.js`.
  Si compras un dominio propio, cambia `SITE.url` y se actualizan solos la URL canónica, las etiquetas
  Open Graph, los datos estructurados, `robots.txt` y `sitemap.xml`.
- **`robots.txt`, `sitemap.xml` y `site.webmanifest`** se generan al compilar (`scripts/seo-plugin.js`).
- **Datos estructurados** (negocio, paquetes con precios y preguntas frecuentes): `src/seo/structuredData.js`,
  armados con los mismos datos de `src/data/`.
- **Prerender**: `npm run build` genera el HTML completo de la página (`scripts/prerender.js`), así Google y
  las redes sociales ven todo el contenido sin ejecutar JavaScript. El CSS va dentro del HTML y las fuentes
  se sirven desde el mismo dominio.
- **Imagen para compartir**: `public/og-image.png` (1200 × 630).
- La página debe tener **un solo `<h1>`** (está en `src/components/Hero/Hero.jsx`); las secciones usan `<h2>`.
