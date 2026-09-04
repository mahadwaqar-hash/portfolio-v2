import { useState, useEffect } from 'react';
import LenisScroller from './components/LenisScroller';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollScrubManifesto from './components/ScrollScrubManifesto';
import TerminalSection from './components/TerminalSection';
import DynamicShowroom from './components/DynamicShowroom';
import ContactNexus from './components/ContactNexus';
import MaisonStoneApp from './pages/maison-stone/MaisonStoneApp';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('pushstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('pushstate', handlePopState);
    };
  }, []);

  if (currentPath === '/maison-stone' || currentPath === '/maison-stone/') {
    return (
      <LenisScroller>
        <MaisonStoneApp />
      </LenisScroller>
    );
  }

  return (
    <LenisScroller>
      <CustomCursor />
      <NoiseOverlay />

      <div className="font-body text-brand-mercury">
        <Navbar />

          <main>
            <section
              id="hero"
              aria-label="Hero introduction"
              className="relative min-h-screen flex flex-col justify-center items-start"
            >
              <HeroSection />
            </section>

            <section
              id="manifesto"
              aria-label="Personal manifesto"
              className="py-20 md:py-40 px-4 md:px-8 lg:px-32 bg-brand-abyss relative"
            >
              <h2 className="font-tech text-brand-neon tracking-widest uppercase text-xs md:text-sm mb-10 md:mb-20">
                01 // Manifesto
              </h2>
              <ScrollScrubManifesto text="I do not build standard websites. I construct high-performance, cinematic digital showrooms that dominate search engines, load instantly, and ruthlessly convert visitors into clients." />
            </section>

            <section
              id="terminal"
              aria-label="Technical arsenal"
              className="py-12 md:py-20 px-4 md:px-8 lg:px-24 bg-brand-abyss"
            >
              <TerminalSection />
            </section>

            <div id="showroom">
              <DynamicShowroom />
            </div>

            <section
              id="contact"
              aria-label="Contact information"
              className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 relative bg-brand-surface z-10"
            >
              <ContactNexus />
            </section>
          </main>
        </div>
    </LenisScroller>
  );
}
