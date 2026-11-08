import { SvgSprite } from './components/icons';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import MadeFor from './components/MadeFor/MadeFor';
import Preview from './components/Preview/Preview';
import Method from './components/Method/Method';
import Packages from './components/Packages/Packages';
import Why from './components/Why/Why';
import Founder from './components/Founder/Founder';
import Faq from './components/Faq/Faq';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';

// Un mundo oscuro tallado en gema: el hero es la esmeralda del logo en 3D. Luego el visitante ve su propio negocio
// en línea, mira cómo se talla la piedra al hacer scroll, calcula su precio, conoce a quien está detrás
// y sale con un mensaje de WhatsApp ya escrito.
export default function App() {
  return (
    <>
      <SvgSprite />
      <a className="skip" href="#main">Saltar al contenido</a>
      <Header />
      <main id="main">
        <Hero />
        <MadeFor />
        <Preview />
        <Method />
        <Packages />
        <Why />
        <Founder />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
