import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShopSection from './components/ShopSection';
import AnimalsSection from './components/AnimalsSection';
import HelpSection from './components/HelpSection';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShopSection />
        <AnimalsSection />
        <HelpSection />
        <AboutSection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
