import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MouseParallax from './MouseParallax';

const services = [
  {
    id: '01',
    title: 'Cinematic Web Architecture',
    subtitle: 'Bespoke Digital Flagships',
    description: 'I do not build standard websites. I engineer high-impact, Awwwards-caliber digital flagships. Utilizing React, Framer Motion, and WebGL to create immersive experiences that instantly position your brand as the absolute premium choice in your market.',
    deliverables: ['Custom UI/UX Editorial Design', 'Framer Motion & Scroll Physics', 'Sub-second Load Times', 'Flawless Mobile Fluidity'],
  },
  {
    id: '02',
    title: 'Local SEO Domination',
    subtitle: 'Search Engine Authority',
    description: 'Beautiful websites are useless if no one sees them. I build technical SEO systems designed to ruthlessly outrank your competitors. Leveraging advanced JSON-LD schemas and Geo-Radius strategies to make you dominate the Maps 3-pack.',
    deliverables: ['JSON-LD LocalBusiness Schema', 'Geo-Targeted "Areas We Serve"', '95+ Core Web Vitals Optimization', 'Keyword & Competitor Recon'],
  },
  {
    id: '03',
    title: 'Conversion Engineering',
    subtitle: 'Making The Phone Ring',
    description: 'Every design choice is a psychological trigger engineered to drive action. Using the PAS (Problem-Agitate-Solve) copywriting framework, strategic microcopy, and magnetic CTAs, I turn passive scrollers into high-ticket clients.',
    deliverables: ['PAS Framework Copywriting', 'Frictionless Contact Nexuses', 'Interactive Pricing Tiers', 'Analytics & CRM Routing'],
  }
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 relative border-t border-brand-ms-graphite/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-tech text-brand-ms-graphite/40 tracking-[0.2em] uppercase text-xs mb-6">
              02 // Core Capabilities
            </h2>
            <h3 className="font-cinematic italic text-5xl md:text-7xl text-brand-ms-graphite leading-[1.1]">
              Engineered for Unfair Advantages.
            </h3>
          </div>
          <p className="font-body text-sm md:text-base text-brand-ms-graphite/60 max-w-sm">
            Fusing high-ticket editorial design with ruthless conversion science. Three pillars to establish absolute market dominance.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column: Interactive List */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {services.map((service, idx) => (
              <div 
                key={service.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`py-8 border-b transition-all duration-500 cursor-pointer ${hoveredIndex === idx ? 'border-brand-ms-graphite/20' : 'border-brand-ms-graphite/5'}`}
              >
                <div className="flex items-start gap-6">
                  <span className={`font-tech text-sm tracking-widest transition-colors duration-500 ${hoveredIndex === idx ? 'text-brand-ms-graphite' : 'text-brand-ms-graphite/30'}`}>
                    {service.id}
                  </span>
                  <div>
                    <h4 className={`font-cinematic italic text-3xl md:text-5xl transition-colors duration-500 ${hoveredIndex === idx ? 'text-brand-ms-graphite' : 'text-brand-ms-graphite/40'}`}>
                      {service.title}
                    </h4>
                    <p className={`font-tech text-xs tracking-widest uppercase mt-3 transition-colors duration-500 ${hoveredIndex === idx ? 'text-brand-ms-graphite/60' : 'text-brand-ms-graphite/30'}`}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Detail Panel (Bubbly Liquid Glass) */}
          <div className="w-full lg:w-1/2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 md:p-12 rounded-[2rem] border border-black/5 bg-white/40 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.03)] absolute inset-0 flex flex-col justify-center"
                >
                  <MouseParallax intensity={3}>
                    <p className="font-body text-base md:text-lg text-brand-ms-graphite/80 leading-relaxed mb-10">
                      {services[hoveredIndex].description}
                    </p>
                    
                    <div className="space-y-4">
                      <p className="font-tech text-xs tracking-[0.2em] text-brand-ms-graphite/40 uppercase">Deliverables</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
                        {services[hoveredIndex].deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-brand-ms-bronze text-sm leading-none mt-0.5">✦</span>
                            <span className="font-tech text-xs tracking-wide text-brand-ms-graphite/70 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MouseParallax>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
