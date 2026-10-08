import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: '100%', label: 'Deployment Reliability' },
  { value: '< 0.8s', label: 'Average LCP Speed' },
  { value: '10km+', label: 'Geo-Radius Dominance' },
  { value: '95+', label: 'Core Web Vitals' },
];

export default function TrustMetricsSection() {
  return (
    <section id="process" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-brand-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 mb-32">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border-l border-white/10 pl-6"
            >
              <p className="font-tech text-4xl md:text-6xl text-brand-neon font-bold tracking-tighter mb-4">
                {m.value}
              </p>
              <p className="font-tech text-xs md:text-sm text-brand-mercury uppercase tracking-widest">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process / Delivery Cadence */}
        <div className="border-t border-white/10 pt-24 flex flex-col lg:flex-row justify-between gap-16">
          <div className="lg:w-1/3">
            <h2 className="font-tech text-brand-neon tracking-[0.2em] uppercase text-xs mb-6">
              03 // Proven Methodology
            </h2>
            <h3 className="font-cinematic italic text-5xl md:text-6xl text-white leading-tight mb-6">
              The High-Velocity Delivery Cadence.
            </h3>
            <p className="font-body text-sm text-brand-mutedsilver leading-relaxed">
              No endless delays. No amateur templates. A strict, battle-tested pipeline designed to deploy your digital flagship in weeks, not months.
            </p>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-12">
            <div className="flex gap-6 group">
              <span className="font-tech text-brand-neon text-xl font-bold pt-1">01</span>
              <div>
                <h4 className="font-tech text-xl md:text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-brand-neon transition-colors">
                  Discovery & Market Recon
                </h4>
                <p className="font-body text-brand-mutedsilver text-sm md:text-base leading-relaxed">
                  We strip your competitors' strategies down to the studs. Identifying local SEO gaps, brand positioning opportunities, and crafting the exact technical architecture needed for you to dominate.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="flex gap-6 group">
              <span className="font-tech text-brand-neon text-xl font-bold pt-1">02</span>
              <div>
                <h4 className="font-tech text-xl md:text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-brand-neon transition-colors">
                  Art Direction & UI Engineering
                </h4>
                <p className="font-body text-brand-mutedsilver text-sm md:text-base leading-relaxed">
                  Where the magic happens. I construct the front-end using React, Framer Motion, and Tailwind CSS. Implementing cinematic preloaders, custom cursors, and buttery smooth scroll physics.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            <div className="flex gap-6 group">
              <span className="font-tech text-brand-neon text-xl font-bold pt-1">03</span>
              <div>
                <h4 className="font-tech text-xl md:text-2xl text-white uppercase tracking-wider mb-2 group-hover:text-brand-neon transition-colors">
                  Deployment & SEO Handoff
                </h4>
                <p className="font-body text-brand-mutedsilver text-sm md:text-base leading-relaxed">
                  The site is launched to global edge servers. I execute the final technical SEO sweep, verify JSON-LD schemas, and hand over your custom 6-month SEO growth plan.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
