import { useState } from 'react';
import LenisScroller from './components/LenisScroller';
import CustomCursor from './components/CustomCursor';
import NoiseOverlay from './components/NoiseOverlay';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollScrubManifesto from './components/ScrollScrubManifesto';
import TerminalSection from './components/TerminalSection';
import DynamicShowroom from './components/DynamicShowroom';
import ContactNexus from './components/ContactNexus';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LenisScroller>
      <CustomCursor />
      <NoiseOverlay />

      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <div className="font-body text-brand-mercury">
          <Navbar />

          <main>
            <section
              id="hero"
              aria-label="Hero introduction"
              className="relative h-screen flex flex-col justify-center items-start px-8 lg:px-24 overflow-hidden"
            >
              <HeroSection />
            </section>

            <section
              id="manifesto"
              aria-label="Personal manifesto"
              className="py-40 px-8 lg:px-32 bg-brand-abyss relative"
            >
              <h2 className="font-tech text-brand-neon tracking-widest uppercase text-sm mb-20">
                01 // Manifesto
              </h2>
              <ScrollScrubManifesto text="I do not build standard websites. I construct high-performance, cinematic digital showrooms that dominate search engines, load instantly, and ruthlessly convert visitors into clients." />
            </section>

            <section
              id="terminal"
              aria-label="Technical arsenal"
              className="py-20 px-8 lg:px-24 bg-brand-abyss"
            >
              <TerminalSection />
            </section>

            <div id="showroom">
              <DynamicShowroom />
            </div>

            <section
              id="contact"
              aria-label="Contact information"
              className="min-h-screen flex flex-col justify-center items-center text-center px-8 relative bg-brand-surface z-10"
            >
              <ContactNexus />
            </section>
          </main>
        </div>
      )}
    </LenisScroller>
  );
}
