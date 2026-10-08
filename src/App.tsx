import { useState, useEffect } from 'react';
import LenisScroller from './components/LenisScroller';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollScrubManifesto from './components/ScrollScrubManifesto';
import TerminalSection from './components/TerminalSection';
import ServicesSection from './components/ServicesSection';
import TrustMetricsSection from './components/TrustMetricsSection';
import DynamicShowroom from './components/DynamicShowroom';
import ContactNexus from './components/ContactNexus';
import MaisonStoneApp from './pages/maison-stone/MaisonStoneApp';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentPath.includes('/maison-stone')) {
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

      <div className="font-body text-brand-ms-graphite bg-brand-ms-alabaster min-h-screen selection:bg-brand-ms-graphite selection:text-white">
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
              className="py-20 md:py-40 px-4 md:px-8 lg:px-32 relative border-t border-brand-ms-graphite/5"
            >
              <h2 className="font-tech text-brand-ms-graphite/40 tracking-widest uppercase text-xs md:text-sm mb-10 md:mb-20 text-center md:text-left">
                01 // Manifesto
              </h2>
              <ScrollScrubManifesto text="I build cinematic digital showrooms. High-performance, meticulously engineered web experiences that instantly position your brand as the premium choice." />
            </section>

            <ServicesSection />

            <div id="showroom">
              <DynamicShowroom />
            </div>

            <TrustMetricsSection />

            <section
              id="contact"
              aria-label="Contact information"
              className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 relative z-10 border-t border-brand-ms-graphite/5"
            >
              <ContactNexus />
            </section>
          </main>
        </div>

      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}
    </LenisScroller>
  );
}
