import React, { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: '01',
    title: 'Web Architecture',
    oneLiner: 'The sites your competitors wish they had.',
    description: 'React 18, Framer Motion physics, Lenis inertial scrolling. Not a Wix site with extra steps — actual engineering that makes people stop scrolling and start paying attention.',
    tools: ['React 18', 'Framer Motion', 'Lenis', 'TypeScript'],
    stat: '60fps on everything',
  },
  {
    id: '02',
    title: 'Local SEO',
    oneLiner: 'Showing up before businesses that are literally closer.',
    description: 'Deep JSON-LD schemas, radius-concentric geo targeting, and obsessive Core Web Vitals tuning. I\'ve ranked clients above competitors who are physically 3x closer to the searcher.',
    tools: ['JSON-LD', 'Schema.org', 'GSC', 'Geo-Targeting'],
    stat: '10km+ radius dominance',
  },
  {
    id: '03',
    title: 'Conversion Design',
    oneLiner: 'Making the phone actually ring.',
    description: 'Pretty websites that don\'t convert are expensive art. I wire every scroll depth, every CTA placement, and every friction point to one goal: getting your ideal client to reach out.',
    tools: ['PAS Copy', 'WhatsApp API', 'CRM Routing', 'A/B Logic'],
    stat: 'Zero-friction funnels',
  }
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header — conversational, not corporate */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full border border-zinc-700" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
              What I actually do
            </span>
            <div className="flex-1 h-[1px] bg-zinc-800" />
          </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white tracking-tight leading-[1.05]">
              <span className="sr-only">Services: Web Architecture, Local SEO & Conversion Design — </span>
              Three things,<br />
              <span className="text-zinc-400">done unreasonably well.</span>
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 max-w-xs font-normal md:text-right">
              I don't do "full-service digital marketing." 
              I do three things and I do them better than anyone you'll find on Fiverr.
            </p>
          </div>
        </div>

        {/* Interactive Split — Left tabs, Right detail */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          
          {/* Left: Clickable List */}
          <div className="w-full lg:w-[40%] flex flex-col lg:border-r border-white/10" role="tablist" aria-label="Capabilities tabs">
            {services.map((s, idx) => (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={active === idx}
                aria-controls={`panel-${s.id}`}
                onClick={() => setActive(idx)}
                className={`text-left py-8 pr-8 border-b border-white/10 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] focus-visible:ring-inset ${
                  active === idx ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className={`font-mono text-xs transition-colors duration-300 tabular-nums ${active === idx ? 'text-[#DEC1FC] font-bold' : 'text-zinc-500'}`}>
                    {s.id}
                  </span>
                  <div>
                    <h3 className="font-tech text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                      {s.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-zinc-300 font-medium">
                      {s.oneLiner}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Expanded Detail — ALL 3 service panels stay permanently mounted in HTML DOM for crawlers & LLMs */}
          <div className="w-full lg:w-[60%] lg:pl-16 py-8 lg:py-12 min-h-[340px] relative grid grid-cols-1 items-center">
            {services.map((s, idx) => {
              const isActive = active === idx;
              return (
                <div
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 transition-all duration-400 ease-out flex flex-col justify-center ${
                    isActive
                      ? 'opacity-100 pointer-events-auto translate-x-0 z-10'
                      : 'opacity-0 pointer-events-none -translate-x-3 z-0 select-none'
                  }`}
                >
                  <p className="font-body text-base md:text-lg text-zinc-100 font-normal leading-relaxed mb-10">
                    {s.description}
                  </p>

                  {/* Tools as minimal inline tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {s.tools.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Key stat — bold callout */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#00B67A]" />
                    <span className="font-mono text-xs sm:text-sm text-[#00B67A] uppercase tracking-wider font-semibold">
                      {s.stat}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
