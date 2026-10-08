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
    <section id="process" className="py-24 md:py-48 px-6 md:px-12 lg:px-24 relative border-t border-brand-ms-alabaster/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Process / Delivery Cadence */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-32">
          <div className="lg:w-1/3">
            <h2 className="font-ms-heading italic text-brand-ms-bronze text-xl md:text-2xl mb-8 text-left">
              IV. Methodology
            </h2>
            <h3 className="font-ms-heading text-4xl md:text-6xl text-brand-ms-alabaster leading-tight mb-8">
              The High-Velocity Delivery.
            </h3>
            <p className="font-ms-body text-sm text-brand-ms-alabaster/60 leading-relaxed font-light">
              No endless delays. No amateur templates. A strict, battle-tested pipeline designed to deploy your digital flagship in weeks, not months.
            </p>
          </div>

          <div className="lg:w-1/2 flex flex-col gap-12 mt-4 lg:mt-0">
            <div className="flex gap-8 group">
              <span className="font-ms-heading italic text-brand-ms-bronze/50 text-2xl group-hover:text-brand-ms-bronze transition-colors">I.</span>
              <div>
                <h4 className="font-ms-body text-[11px] tracking-[0.2em] text-brand-ms-alabaster uppercase mb-4">
                  Discovery & Market Recon
                </h4>
                <p className="font-ms-body text-brand-ms-alabaster/50 text-sm leading-relaxed font-light">
                  We strip your competitors' strategies down to the studs. Identifying local SEO gaps, brand positioning opportunities, and crafting the exact technical architecture needed for you to dominate.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex gap-8 group">
              <span className="font-ms-heading italic text-brand-ms-bronze/50 text-2xl group-hover:text-brand-ms-bronze transition-colors">II.</span>
              <div>
                <h4 className="font-ms-body text-[11px] tracking-[0.2em] text-brand-ms-alabaster uppercase mb-4">
                  Art Direction & UI Engineering
                </h4>
                <p className="font-ms-body text-brand-ms-alabaster/50 text-sm leading-relaxed font-light">
                  Where the magic happens. I construct the front-end using React, Framer Motion, and Tailwind CSS. Implementing cinematic preloaders, custom cursors, and buttery smooth scroll physics.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="flex gap-8 group">
              <span className="font-ms-heading italic text-brand-ms-bronze/50 text-2xl group-hover:text-brand-ms-bronze transition-colors">III.</span>
              <div>
                <h4 className="font-ms-body text-[11px] tracking-[0.2em] text-brand-ms-alabaster uppercase mb-4">
                  Deployment & SEO Handoff
                </h4>
                <p className="font-ms-body text-brand-ms-alabaster/50 text-sm leading-relaxed font-light">
                  The site is launched to global edge servers. I execute the final technical SEO sweep, verify JSON-LD schemas, and hand over your custom 6-month SEO growth plan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 pt-24 border-t border-white/10">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border-l border-brand-ms-bronze/30 pl-8"
            >
              <p className="font-ms-heading italic text-4xl md:text-6xl text-brand-ms-alabaster mb-4">
                {m.value}
              </p>
              <p className="font-ms-body text-[10px] text-brand-ms-alabaster/50 uppercase tracking-[0.2em]">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
