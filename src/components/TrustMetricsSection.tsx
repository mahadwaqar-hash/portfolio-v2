import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  {
    value: '100%',
    label: 'Deployment Reliability',
    detail: 'Zero broken links, 100% functional live interactive codebases.',
  },
  {
    value: '< 0.8s',
    label: 'Average LCP Speed',
    detail: 'Optimized assets, GPU layer acceleration, sub-second loads.',
  },
  {
    value: '10km+',
    label: 'Geo-Radius Dominance',
    detail: 'Targeted local schema & area-served search engine outranking.',
  },
  {
    value: '95+',
    label: 'Core Web Vitals',
    detail: 'Engineered against Google Lighthouse performance standards.',
  },
];

const processSteps = [
  {
    phase: '01',
    name: 'Discovery & Market Recon',
    duration: 'Day 1–3',
    description:
      'Deep dive into competitive gaps in your market, search terms, and brand positioning to design an unfair edge.',
  },
  {
    phase: '02',
    name: 'Art Direction & Architecture',
    duration: 'Day 4–8',
    description:
      'High-fidelity typography, fluid motion systems, and custom UI components built from the ground up in React.',
  },
  {
    phase: '03',
    name: 'Engineered Launch & SEO Handoff',
    duration: 'Day 9–14',
    description:
      'Production deployment on edge servers, Google Business verification, JSON-LD schema verification, and turn-key client handoff.',
  },
];

export default function TrustMetricsSection() {
  return (
    <section id="process" className="py-24 md:py-36 px-5 sm:px-10 md:px-16 lg:px-28 bg-brand-surface relative border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-6 md:p-8 rounded-2xl cyber-glass border border-white/10 hover:border-brand-neon/40 transition-all flex flex-col justify-between"
            >
              <div>
                <p className="font-cinematic italic text-4xl sm:text-5xl md:text-6xl text-brand-neon font-bold mb-2">
                  {m.value}
                </p>
                <p className="font-tech text-xs sm:text-sm text-white uppercase tracking-wider font-semibold mb-2">
                  {m.label}
                </p>
              </div>
              <p className="font-body text-xs text-brand-mutedsilver leading-relaxed">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/15 border border-brand-neon/40 text-brand-neon text-[10px] md:text-xs font-tech tracking-widest uppercase mb-4">
            <span>03 // Proven Methodology</span>
          </div>
          <h2 className="font-cinematic italic text-4xl sm:text-5xl md:text-6xl text-white mb-12">
            The High-Velocity Delivery Cadence.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {processSteps.map((step, idx) => (
              <div 
                key={step.phase}
                className="relative flex flex-col justify-between p-8 rounded-2xl bg-brand-abyss/60 border border-white/10 hover:border-brand-neon/30 transition-all"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-tech text-2xl text-brand-neon font-bold">
                      {step.phase}
                    </span>
                    <span className="font-tech text-xs text-brand-mutedsilver px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-tech text-lg text-white font-semibold mb-3">
                    {step.name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-brand-mutedsilver leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
