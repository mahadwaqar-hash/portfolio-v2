import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: '01',
    badge: 'Aesthetic Authority',
    title: 'Cinematic Web Architecture',
    description: 'Transforming commodity businesses into category-defining luxury authorities. Custom React 18 & Framer Motion physics, 60fps Lenis inertial scrolling, and responsive fluid typography that keeps visitors mesmerized.',
    deliverables: [
      'Bespoke Interactive Art Direction',
      'Framer Motion & WebGL Physics',
      'Sub-0.4s First Contentful Paint',
      'Flawless Retina Fluidity'
    ],
    highlight: '60fps Inertial Scroll',
  },
  {
    id: '02',
    badge: 'Search Supremacy',
    title: 'Technical Local SEO Domination',
    description: 'A breathtaking site is worthless if your ideal clients cannot find you. Engineered with deep JSON-LD LocalBusiness schemas, radius-concentric geo targeting, and 95+ Core Web Vitals to systematically outrank established competitors.',
    deliverables: [
      'JSON-LD Multi-Entity Schemas',
      'Geo-Targeted "Areas We Serve" Architecture',
      'Google Maps 3-Pack Authority Engine',
      'Semantic Heading & Entity Graph'
    ],
    highlight: '10km+ Geo-Dominance',
  },
  {
    id: '03',
    badge: 'Revenue Velocity',
    title: 'High-Ticket Conversion Engineering',
    description: 'Eliminating every friction point between curiosity and contract signing. Combining the PAS (Problem-Agitate-Solve) copywriting framework with instant 1-click WhatsApp checkout pipelines and magnetic interactive pricing tiers.',
    deliverables: [
      'PAS Psychological Copywriting',
      'Frictionless 1-Click WhatsApp Nexuses',
      'Interactive ROI & Pricing Tiers',
      'Direct Lead Routing & CRM Sync'
    ],
    highlight: 'Zero Friction Funnels',
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[50vw] h-[40vh] bg-gradient-to-r from-[#DEC1FC]/10 to-[#00B67A]/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <div className="apple-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DEC1FC] animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
                03 // Core Capabilities
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white tracking-tight">
              Engineered for Category Dominance.
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-zinc-400 max-w-md font-light leading-relaxed">
            Fusing luxury editorial design with hard technical SEO and behavioral conversion science.
          </p>
        </div>

        {/* Bento Grid of Apple Liquid Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="apple-glass-card rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] group hover:-translate-y-1.5"
            >
              <div>
                {/* Card Top Pill */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-zinc-500 font-medium">
                    {service.id} // 03
                  </span>
                  <span className="apple-glass px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#DEC1FC] border border-white/10">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-tech text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-[#DEC1FC] transition-colors">
                  {service.title}
                </h3>

                <p className="font-body text-sm text-zinc-400 font-light leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="pt-6 border-t border-white/10">
                <span className="font-tech text-[10px] tracking-[0.2em] uppercase text-zinc-400 block mb-4">
                  Signature Deliverables
                </span>
                <ul className="space-y-2.5">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                      <span className="text-[#00B67A] text-sm leading-none mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Standard</span>
                  <span className="text-[#00B67A]">{service.highlight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
