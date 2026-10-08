import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: '01',
    title: 'Cinematic Architecture',
    subtitle: 'Bespoke Digital Flagships',
    description: 'I do not build standard websites. I engineer high-impact, Awwwards-caliber digital flagships. Utilizing React, Framer Motion, and WebGL to create immersive experiences that instantly position your brand as the absolute premium choice in your market.',
    deliverables: ['Custom UI/UX Editorial Design', 'Framer Motion & Scroll Physics', 'Sub-second Load Times', 'Flawless Mobile Fluidity'],
  },
  {
    id: '02',
    title: 'SEO Domination',
    subtitle: 'Search Engine Authority',
    description: 'Beautiful websites are useless if no one sees them. I build technical SEO systems designed to ruthlessly outrank your competitors. Leveraging advanced JSON-LD schemas and Geo-Radius strategies to make you dominate the Maps 3-pack.',
    deliverables: ['JSON-LD LocalBusiness Schema', 'Geo-Targeted "Areas We Serve"', '95+ Core Web Vitals Optimization', 'Keyword & Competitor Recon'],
  },
  {
    id: '03',
    title: 'Conversion Engine',
    subtitle: 'Making The Phone Ring',
    description: 'Every design choice is a psychological trigger engineered to drive action. Using the PAS (Problem-Agitate-Solve) copywriting framework, strategic microcopy, and magnetic CTAs, I turn passive scrollers into high-ticket clients.',
    deliverables: ['PAS Framework Copywriting', 'Frictionless Contact Nexuses', 'Interactive Pricing Tiers', 'Analytics & CRM Routing'],
  }
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="services" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-ms-heading italic text-brand-ms-bronze text-xl md:text-2xl mb-12 md:mb-24 text-left">
          II. Core Capabilities
        </h2>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left Column: Interactive List */}
          <div className="w-full lg:w-[45%] flex flex-col">
            {services.map((service, idx) => (
              <div 
                key={service.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className="py-10 border-b border-white/10 transition-colors duration-700 cursor-pointer group"
              >
                <div className="flex flex-col">
                  <span className={`font-ms-body text-[10px] tracking-[0.3em] transition-colors duration-500 mb-4 ${hoveredIndex === idx ? 'text-brand-ms-bronze' : 'text-brand-ms-alabaster/30'}`}>
                    {service.id} // {service.subtitle}
                  </span>
                  <h4 className={`font-ms-heading italic text-4xl md:text-6xl transition-colors duration-700 ${hoveredIndex === idx ? 'text-brand-ms-alabaster' : 'text-brand-ms-alabaster/40'}`}>
                    {service.title}.
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dynamic Detail Panel */}
          <div className="w-full lg:w-[55%] relative min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col justify-center pr-8"
                >
                  <p className="font-ms-body text-base md:text-xl text-brand-ms-alabaster/80 leading-relaxed font-light mb-12">
                    {services[hoveredIndex].description}
                  </p>
                  
                  <div className="space-y-6">
                    <p className="font-ms-body text-[10px] tracking-[0.3em] text-brand-ms-bronze uppercase">Deliverables.</p>
                    <div className="w-12 h-[1px] bg-brand-ms-bronze/40" />
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {services[hoveredIndex].deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="text-brand-ms-bronze text-sm leading-none mt-1">/</span>
                          <span className="font-ms-body text-xs tracking-wide text-brand-ms-alabaster/60 uppercase">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
