import { useState, useEffect } from 'react';
import LenisScroller from './components/LenisScroller';
import NoiseOverlay from './components/NoiseOverlay';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollScrubManifesto from './components/ScrollScrubManifesto';
import DynamicShowroom from './components/DynamicShowroom';
import ServicesSection from './components/ServicesSection';
import TrustMetricsSection from './components/TrustMetricsSection';
import ContactNexus from './components/ContactNexus';
import MaisonStoneApp from './pages/maison-stone/MaisonStoneApp';

export default function App() {
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
      {/* Subtle atmospheric film grain */}
      <NoiseOverlay />

      <div className="font-body text-[#F4F4F5] bg-[#070709] min-h-screen selection:bg-[#DEC1FC] selection:text-[#070709]">
        {/* Apple Liquid Glass Floating Navbar */}
        <Navbar />

        <main>
          {/* 1. Hero Section with Knockout Title */}
          <section id="hero" aria-label="Hero section">
            <HeroSection />
          </section>

          {/* 2. Interactive Showroom with Real Homepage Viewports */}
          <div id="showroom">
            <DynamicShowroom />
          </div>

          {/* 3. The Manifesto with Radiant Liquid Glow */}
          <section id="manifesto" aria-label="Philosophy and manifesto">
            <ScrollScrubManifesto text="I engineer high-performance, cinematic digital flagships. No generic templates or commodity builders. Every interaction, schema, and layout is calculated to outrank competitors and turn passive visitors into high-ticket clients." />
          </section>

          {/* 4. Core Capabilities (Bento Glass Grid) */}
          <section id="services" aria-label="Core services and capabilities">
            <ServicesSection />
          </section>

          {/* 5. Proven Delivery Methodology & Hard Performance Metrics */}
          <section id="process" aria-label="Delivery process and metrics">
            <TrustMetricsSection />
          </section>

          {/* 6. Contact & Engagement Nexus */}
          <section id="contact" aria-label="Contact nexus">
            <ContactNexus />
          </section>
        </main>
      </div>
    </LenisScroller>
  );
}
