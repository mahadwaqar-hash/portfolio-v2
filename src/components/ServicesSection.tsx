import React, { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Bespoke Digital Flagships',
    category: 'Architecture & Craft',
    description:
      'High-impact web presences tailored for high-ticket brands, aesthetic practices, and boutique studios demanding distinction.',
    deliverables: [
      'Art-directed visual identity & editorial layout',
      'Framer Motion micro-interactions & liquid physics',
      'Sub-second page speeds with zero layout shifting',
      'Full mobile fluidity with bespoke mobile navigation',
    ],
    highlight: 'Conversion + Brand Equity',
  },
  {
    number: '02',
    title: 'Local SEO Domination Systems',
    category: 'Growth & Visibility',
    description:
      'Engineered structured data, hyper-localized landing networks, and Google Maps signal architectures to outrank competitors 10km+ away.',
    deliverables: [
      'Comprehensive JSON-LD LocalBusiness schema',
      'Geo-targeted neighborhood keyword networks',
      'Core Web Vitals 95+ score optimization',
      'Google Business Profile integration & velocity playbook',
    ],
    highlight: 'Top 3-Pack Placement',
  },
  {
    number: '03',
    title: 'Interactive Web Apps & Portals',
    category: 'Engineering & Scalability',
    description:
      'Custom React web applications, client portals, and booking nexus platforms designed with bulletproof type safety and smooth SPA routing.',
    deliverables: [
      'React 18 + TypeScript production architecture',
      'Real-time WhatsApp / CRM automated lead routing',
      'State-driven interactive filters & calculators',
      'Zero-compromise security and global edge deployment',
    ],
    highlight: 'Scalable Infrastructure',
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="services" className="py-24 md:py-36 px-5 sm:px-10 md:px-16 lg:px-28 bg-brand-abyss relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-amethyst/20 border border-brand-amethyst/40 text-brand-neon text-[10px] md:text-xs font-tech tracking-widest uppercase mb-4">
              <span>02 // Core Capabilities</span>
            </div>
            <h2 className="font-cinematic italic text-4xl sm:text-5xl md:text-7xl text-white leading-tight">
              Crafted for High-Ticket Distinction.
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm md:text-base text-brand-mutedsilver max-w-md leading-relaxed">
            I partner with ambitious brands to transform ordinary digital footprints into unmistakable commercial authority.
          </p>
        </div>

        {/* Desktop Interactive Tabs / Accordion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isSelected = activeTab === index;
            return (
              <motion.div
                key={service.number}
                onClick={() => setActiveTab(index)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer rounded-2xl p-7 md:p-9 transition-all duration-500 relative overflow-hidden flex flex-col justify-between border ${
                  isSelected
                    ? 'cyber-glass border-brand-neon/60 shadow-[0_15px_40px_rgba(192,132,252,0.18)] bg-gradient-to-b from-brand-surface/90 to-brand-abyss'
                    : 'bg-brand-surface/50 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Background Accent glow */}
                {isSelected && (
                  <div className="absolute top-0 right-0 w-36 h-36 bg-brand-amethyst/25 rounded-full blur-3xl pointer-events-none" />
                )}

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-tech text-xs tracking-widest text-brand-neon font-bold">
                      {service.number}
                    </span>
                    <span className="font-tech text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 text-brand-mercury border border-white/10">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-cinematic italic text-3xl sm:text-4xl text-white mb-4">
                    {service.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-brand-mutedsilver leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="font-tech text-[11px] uppercase tracking-wider text-brand-neon mb-3">
                    Deliverables:
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-mercury/80 font-body">
                        <span className="text-brand-neon font-bold leading-none mt-1">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-[11px] font-tech text-brand-neon bg-brand-neon/10 px-3 py-1.5 rounded-lg border border-brand-neon/25">
                    <span>Outcome:</span>
                    <span className="text-white font-medium">{service.highlight}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
