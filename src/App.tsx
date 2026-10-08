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
      
      <div className="font-ms-body text-brand-ms-alabaster bg-brand-ms-obsidian min-h-screen selection:bg-brand-ms-bronze selection:text-white">
        <Navbar />

          <main>
            <section
              id="hero"
              aria-label="Hero introduction"
              className="relative min-h-screen flex flex-col justify-center items-start pt-20"
            >
              <HeroSection />
            </section>

            <section
              id="manifesto"
              aria-label="Personal manifesto"
              className="py-24 md:py-48 px-6 md:px-12 lg:px-24 relative"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="font-ms-heading italic text-brand-ms-bronze text-xl md:text-2xl mb-8 md:mb-16 text-left">
                  I. The Manifesto
                </h2>
                <ScrollScrubManifesto text="I build cinematic digital showrooms. High-performance, meticulously engineered web experiences that instantly position your brand as the premium choice." />
              </div>
            </section>

            <ServicesSection />

            <div id="showroom">
              <DynamicShowroom />
            </div>

            <TrustMetricsSection />

            <section
              id="contact"
              aria-label="Contact information"
              className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8 relative z-10"
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
