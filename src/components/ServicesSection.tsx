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
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full border border-zinc-700" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-semibold">
              03 // What I actually do
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

        {/* Interactive Split — Left tabs with Shared-Layout Spring Indicator, Right detail */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
          
          {/* Left: Clickable & Hoverable Tab List with layoutId morphing */}
          <div className="w-full lg:w-[40%] flex flex-col lg:border-r border-white/10" role="tablist" aria-label="Capabilities tabs">
            {services.map((s, idx) => {
              const isSelected = active === idx;
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setActive(idx)}
                  className="relative text-left py-8 pr-8 pl-4 border-b border-white/10 transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] focus-visible:ring-inset active:bg-white/[0.02]"
                >
                  {/* Sliding layoutId Indicator & Pill Highlight */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCapabilityIndicator"
                      className="absolute inset-0 bg-white/[0.04] border-l-2 border-[#DEC1FC] shadow-[inset_8px_0_16px_-8px_rgba(222,193,252,0.2)]"
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    />
                  )}

                  <div className="relative z-10 flex items-baseline gap-4">
                    <span className={`font-mono text-xs transition-colors duration-300 tabular-nums ${isSelected ? 'text-[#DEC1FC] font-bold' : 'text-zinc-500'}`}>
                      {s.id}
                    </span>
                    <div>
                      <h3 className="font-tech text-2xl md:text-3xl font-bold text-white tracking-tight mb-1 group-hover:text-[#DEC1FC] transition-colors">
                        {s.title}
                      </h3>
                      <p className="font-body text-sm sm:text-base text-zinc-300 font-medium">
                        {s.oneLiner}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Expanded Detail — ALL 3 service panels stay permanently mounted in HTML DOM for crawlers & LLMs */}
          <div className="w-full lg:w-[60%] lg:pl-16 py-8 lg:py-12 min-h-[340px] relative grid grid-cols-1 items-center">
            {services.map((s, idx) => {
              const isActive = active === idx;
              return (
                <motion.div
                  key={s.id}
                  id={`panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${s.id}`}
                  aria-hidden={!isActive}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 8,
                    filter: isActive ? 'blur(0px)' : 'blur(3px)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                  transition={{
                    duration: isActive ? 0.22 : 0.10,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="col-start-1 row-start-1 flex flex-col justify-center transform-gpu"
                >
                  <p className="font-body text-base md:text-lg text-zinc-100 font-normal leading-relaxed mb-10">
                    {s.description}
                  </p>

                  {/* Tools as playful bouncing pills with stagger */}
                  <motion.div 
                    className="flex flex-wrap gap-2.5 mb-8"
                    initial="initial"
                    animate={isActive ? "animate" : "initial"}
                    transition={{ staggerChildren: 0.03 }}
                  >
                    {s.tools.map((t) => (
                      <motion.span
                        key={t}
                        variants={{
                          initial: { opacity: 0, scale: 0.95 },
                          animate: { opacity: 1, scale: 1 }
                        }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#DEC1FC]/50 hover:bg-white/[0.08] transition-colors duration-200 cursor-default shadow-sm"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Key stat — bold callout with pulse */}
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00B67A] animate-pulse" />
                    <span className="font-mono text-xs sm:text-sm text-[#00B67A] uppercase tracking-wider font-semibold">
                      {s.stat}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
