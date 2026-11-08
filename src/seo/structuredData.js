import { SITE } from '../config/site.js';
import { PACKAGES } from '../data/packages.js';
import { FAQ } from '../data/faq.js';

const priceNumber = (price) => Number(price.replace(/\D/g, ''));

// Datos estructurados (schema.org) que Google lee para entender el negocio. Se generan con los mismos
// datos que muestra la página, así que si cambias un precio o una pregunta, también cambian aquí.
export function structuredData() {
  const url = SITE.url + '/';
  const business = {
    '@type': 'ProfessionalService',
    '@id': url + '#negocio',
    name: SITE.name,
    slogan: SITE.slogan,
    description: SITE.seo.description,
    url,
    logo: SITE.url + '/icon-512.png',
    image: SITE.url + SITE.seo.image,
    priceRange: '$$',
    currenciesAccepted: 'COP',
    areaServed: { '@type': 'Country', name: 'Colombia' },
    address: { '@type': 'PostalAddress', addressLocality: 'Valledupar', addressRegion: 'Cesar', addressCountry: 'CO' },
    founder: { '@type': 'Person', name: SITE.founder },
    sameAs: [SITE.instagram.url, SITE.tiktok.url],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'ventas',
      availableLanguage: 'es',
      url: `https://api.whatsapp.com/send/?username=${SITE.whatsapp.username}&type=username`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Paquetes de desarrollo web y software',
      itemListElement: PACKAGES.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${p.name}: ${p.sub}`, description: p.features.join('. ') + '.' },
        ...(p.price && {
          priceSpecification: { '@type': 'PriceSpecification', minPrice: priceNumber(p.price), priceCurrency: 'COP' },
        }),
      })),
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      business,
      {
        '@type': 'WebSite',
        '@id': url + '#sitio',
        url,
        name: SITE.name,
        inLanguage: 'es-CO',
        publisher: { '@id': url + '#negocio' },
      },
      {
        '@type': 'FAQPage',
        '@id': url + '#preguntas',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
