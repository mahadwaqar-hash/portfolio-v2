import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';
import MouseParallax from './MouseParallax';

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // For horizontal manual scrolling (if no trackpad)
  const scrollBy = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Track scroll position to update active index for background glow
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = window.innerWidth * 0.8;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < PORTFOLIO_PROJECTS.length) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden">
      {/* Dynamic Background Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full blur-[200px] -z-10 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: PORTFOLIO_PROJECTS[activeIndex]?.accentColor || 'rgba(0,0,0,0)' }}
      />

      <div className="px-6 md:px-12 lg:px-24 mb-12 flex justify-between items-end relative z-10">
        <div>
          <h2 className="font-tech text-brand-neon tracking-widest uppercase text-xs md:text-sm mb-2">
            03 // Showroom
          </h2>
          <p className="font-body text-xs md:text-sm text-brand-mutedsilver">
            Click any project to launch the interactive live case study preview.
            <button 
              type="button"
              className="relative ml-2 group cursor-help inline-flex items-center focus:outline-none"
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-brand-mutedsilver/60 group-hover:text-brand-neon group-focus:text-brand-neon transition-colors text-[10px] md:text-xs border border-brand-mutedsilver/30 rounded-full px-1.5 py-0.5 font-tech tracking-wider">
                ⓘ Disclaimer
              </span>
              <span className="absolute top-full left-0 mt-2 w-[80vw] max-w-[320px] p-4 rounded-xl bg-brand-surface border border-brand-amethyst/30 text-[11px] md:text-xs text-brand-mutedsilver leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus:opacity-100 group-focus:pointer-events-auto transition-opacity duration-300 z-50 shadow-2xl text-left">
                All showcased projects are either fictional demonstration pieces created for portfolio reference purposes, or live client sites displayed with the explicit consent of the respective owners.
              </span>
            </button>
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => scrollBy(-window.innerWidth * 0.5)}
            className="w-12 h-12 rounded-full border border-brand-amethyst/30 flex items-center justify-center text-brand-mutedsilver hover:text-brand-neon hover:border-brand-neon transition-colors"
            data-cursor="text"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button 
            onClick={() => scrollBy(window.innerWidth * 0.5)}
            className="w-12 h-12 rounded-full border border-brand-amethyst/30 flex items-center justify-center text-brand-mutedsilver hover:text-brand-neon hover:border-brand-neon transition-colors"
            data-cursor="text"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-12 lg:px-24 pb-12 relative z-10 gap-4 md:gap-10"
      >
        {PORTFOLIO_PROJECTS.map((project) => {
          const isVanguard = project.id === '01' || project.client.toLowerCase().includes('vanguard');
          const isToothcare = project.id === '02' || project.client.toLowerCase().includes('tooth');

          return (
            <div 
              key={project.id} 
              className="w-[80vw] md:min-w-[45vw] lg:min-w-[32vw] flex-shrink-0 snap-center pr-4 md:pr-10"
            >
              <MouseParallax intensity={10} className="w-full h-full">
                <button 
                  onClick={() => {
                    if (project.liveUrl && project.liveUrl !== '#') {
                      window.location.href = project.liveUrl;
                    }
                  }}
                  type="button"
                  className={`text-left block w-full aspect-[4/3] rounded-3xl overflow-hidden cyber-glass group relative flex flex-col justify-between p-5 md:p-6 cursor-pointer border border-brand-amethyst/30 hover:border-brand-neon transition-all duration-500 hover:shadow-[0_0_50px_rgba(192,132,252,0.2)] ${project.imagePlaceholder}`}
                  data-cursor="image"
                >
                  {/* Card Top / Browser Mockup Bar */}
                  <div className="flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      <span className="font-mono text-[9px] md:text-[10px] text-brand-mutedsilver ml-1 md:ml-2 px-2 py-0.5 rounded-full bg-black/40 border border-white/5 truncate max-w-[100px] md:max-w-none">
                        {project.client}
                      </span>
                    </div>
                    <span className="font-tech text-[9px] md:text-[10px] text-brand-neon uppercase tracking-wider group-hover:scale-105 transition-transform flex items-center gap-1 md:gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
                      Open Site +-
                    </span>
                  </div>

                  {/* Card Center / High-Fidelity UI Visual Preview */}
                  <div className="my-auto z-10 py-2 md:py-3 pointer-events-none">
                    {isVanguard && (
                      <div className="border border-[#D4AF37]/30 bg-black/60 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-2xl scale-95 md:scale-100 transform origin-left">
                        <p className="font-tech text-[#D4AF37] text-[8px] md:text-[9px] tracking-[0.25em] uppercase mb-1">
                          Vanguard & Partners
                        </p>
                        <h4 className="font-serif italic text-lg md:text-xl text-white font-normal leading-tight mb-2">
                          Ruthless Precision.<br />
                          <span className="text-[#D4AF37]">Global Architecture.</span>
                        </h4>
                        <div className="flex gap-1.5 md:gap-2 mt-2 md:mt-3">
                          <span className="font-mono text-[8px] md:text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                            Mergers & Acquisitions
                          </span>
                          <span className="font-mono text-[8px] md:text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-brand-mutedsilver border border-white/10">
                            UK ? US ? PK
                          </span>
                        </div>
                      </div>
                    )}

                    {isToothcare && (
                      <div className="border border-sky-500/30 bg-black/60 backdrop-blur-md rounded-xl p-4 shadow-2xl scale-95 md:scale-100 transform origin-left">
                        <p className="font-tech text-sky-400 text-[8px] md:text-[9px] tracking-[0.25em] uppercase mb-1">
                          Tooth Care Clinic
                        </p>
                        <h4 className="font-tech font-bold text-lg md:text-2xl text-white uppercase leading-tight mb-2">
                          Elevated Clinical<br />
                          <span className="text-sky-400">Minimalism.</span>
                        </h4>
                        <div className="flex gap-1.5 mt-2 md:mt-3">
                          <span className="font-mono text-[8px] md:text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                            Instant Booking
                          </span>
                          <span className="font-mono text-[8px] md:text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-brand-mutedsilver border border-white/10">
                            SEO Dominance
                          </span>
                        </div>
                      </div>
                    )}

                    {!isVanguard && !isToothcare && (
                      <div className="border border-brand-amethyst/30 bg-black/60 backdrop-blur-md rounded-xl p-5 shadow-2xl">
                        <p className="font-tech text-brand-neon text-[10px] tracking-[0.25em] uppercase mb-1">
                          {project.category}
                        </p>
                        <h4 className="font-cinematic italic text-2xl md:text-3xl text-white leading-tight mb-2">
                          {project.title}
                        </h4>
                        <p className="font-body text-xs text-brand-mutedsilver line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom / Info Bar */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-brand-surface border border-brand-amethyst/20 font-tech text-[10px] text-brand-mutedsilver">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.metrics && (
                      <p className="font-tech text-[10px] text-green-400 font-medium">
                        {project.metrics.split('?')[0]}
                      </p>
                    )}
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-abyss via-brand-abyss/40 to-transparent opacity-80 pointer-events-none" />
                </button>
              </MouseParallax>
            </div>
          );
        })}
      </div>
    </section>
  );
}
