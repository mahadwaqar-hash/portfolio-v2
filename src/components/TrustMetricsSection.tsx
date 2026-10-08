import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: '0.4s', prefix: '<', label: 'First paint', color: '#DEC1FC' },
  { value: '100', prefix: '', label: 'Lighthouse score', color: '#00B67A' },
  { value: '10km', prefix: '', label: 'Geo-radius reach', color: '#DEC1FC' },
  { value: '14', prefix: '', label: 'Ships deployed', color: '#00B67A' },
];

const steps = [
  {
    num: '01',
    title: 'Tear apart the competition',
    desc: 'I look at your top 5 competitors\' sites, their backlink profiles, their schema markup (or lack of it), and their conversion paths. Then I build the blueprint to beat all of them.',
    duration: 'Week 1',
  },
  {
    num: '02',
    title: 'Build something unreasonable',
    desc: 'Zero templates. I write every component from scratch in React, wire up Framer Motion physics, obsess over the typography scale, and test on 12+ device viewports before you see a single preview.',
    duration: 'Weeks 2–3',
  },
  {
    num: '03',
    title: 'Launch and hand you the keys',
    desc: 'Deployed to Vercel edge nodes worldwide. I audit every JSON-LD schema, verify GSC indexing, run a final Lighthouse sweep, and hand over a 6-month SEO growth roadmap you can actually follow.',
    duration: 'Week 4',
  },
];

export default function TrustMetricsSection() {
  return (
    <section id="process" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Metrics — horizontal ticker strip, not cards */}
        <div className="flex flex-wrap justify-between items-end gap-y-10 gap-x-4 mb-28 pb-16 border-b border-white/5">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-1">
                {m.prefix && <span className="font-mono text-lg text-zinc-500">{m.prefix}</span>}
                <span 
                  className="font-tech text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter"
                  style={{ color: m.color }}
                >
                  {m.value}
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-2">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Methodology — timeline format, not identical glass cards */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Header */}
          <div className="lg:w-[35%] lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-3 h-3 rounded-full border border-zinc-700" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
                How it works
              </span>
              <div className="flex-1 h-[1px] bg-zinc-800" />
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold text-white tracking-tight leading-[1.05] mb-6">
              Four weeks.<br />
              <span className="text-zinc-500">Zero hand-waving.</span>
            </h3>
            <p className="font-body text-sm text-zinc-500 font-light leading-relaxed">
              Not "4–6 months" like an agency quotes you. 
              I run a tight, battle-tested pipeline because I've done this enough times 
              to know exactly what's needed and in what order.
            </p>
          </div>

          {/* Right: Timeline Steps */}
          <div className="lg:w-[65%] flex flex-col">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className={`flex gap-6 md:gap-8 py-10 ${idx < steps.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                {/* Timeline line + number */}
                <div className="flex flex-col items-center gap-2 pt-1">
                  <span className="font-mono text-xs text-[#DEC1FC] font-bold w-8 text-center">{step.num}</span>
                  {idx < steps.length - 1 && <div className="w-[1px] flex-1 bg-zinc-800" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-tech text-xl md:text-2xl text-white font-bold tracking-tight">
                      {step.title}
                    </h4>
                    <span className="font-mono text-[10px] text-zinc-600 border border-zinc-800 rounded-full px-2.5 py-0.5 uppercase tracking-wider">
                      {step.duration}
                    </span>
                  </div>
                  <p className="font-body text-sm text-zinc-400 font-light leading-relaxed max-w-lg">
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
