import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: 'Sub-0.4s', label: 'First Contentful Paint', sub: 'Instant Global Edge Delivery' },
  { value: '100 / 100', label: 'Core Web Vitals', sub: 'Zero Layout Shift or Stutter' },
  { value: '10km+', label: 'Geo-Radius Dominance', sub: 'Multi-Entity JSON-LD Schema' },
  { value: '14+', label: 'Flagship Deployments', sub: 'Awwwards-Level Interaction' },
];

const steps = [
  {
    num: '01',
    title: 'Market Recon & Technical Blueprint',
    desc: 'We analyze your top 5 competitors’ backlink profiles, entity graphs, and conversion loopholes. We architect the exact site structure and geo-radius plan required to capture high-ticket demand.',
  },
  {
    num: '02',
    title: 'Bespoke UI & Interaction Engineering',
    desc: 'Crafting the frontend in React 18, Tailwind, and Framer Motion. Zero templates. Custom fluid typography, micro-interactions, and 60fps scroll physics designed to make your visitors stay.',
  },
  {
    num: '03',
    title: 'Edge Deployment & Post-Launch SEO',
    desc: 'Deployed on Vercel Edge with zero latency. We audit all JSON-LD schemas, verify Google Search Console indexing, and deliver a comprehensive 6-month organic growth roadmap.',
  },
];

export default function TrustMetricsSection() {
  return (
    <section id="process" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Apple Liquid Glass Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="apple-glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1"
            >
              <div className="font-tech text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#DEC1FC] tracking-tight mb-2">
                {m.value}
              </div>
              <div>
                <p className="font-tech text-xs tracking-wider uppercase text-zinc-200 font-semibold mb-1">
                  {m.label}
                </p>
                <p className="font-mono text-[10px] text-zinc-500">
                  {m.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology & Delivery Cadence */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 pt-16 border-t border-white/10">
          
          <div className="lg:w-1/3">
            <div className="apple-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
                04 // Proven Methodology
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold text-white tracking-tight mb-6">
              The High-Velocity Delivery Cadence.
            </h3>
            <p className="font-body text-sm text-zinc-400 font-light leading-relaxed">
              No endless delays or agency bloat. A battle-tested pipeline that takes you from initial discovery to live production deployment in 2 to 3 weeks.
            </p>
          </div>

          <div className="lg:w-2/3 flex flex-col gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="apple-glass rounded-2xl p-8 flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:border-white/20 group"
              >
                <span className="font-mono text-xl text-[#DEC1FC] font-bold">
                  {step.num}
                </span>
                <div>
                  <h4 className="font-tech text-xl text-white font-bold tracking-tight mb-2 group-hover:text-[#DEC1FC] transition-colors">
                    {step.title}
                  </h4>
                  <p className="font-body text-sm text-zinc-400 font-light leading-relaxed">
                    {step.desc}
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
