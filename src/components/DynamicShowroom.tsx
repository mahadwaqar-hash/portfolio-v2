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

      <div className="px-6 md:px-12 lg:px-24 mb-8 md:mb-12 flex justify-between items-end relative z-40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/15 border border-brand-neon/40 text-brand-neon text-[10px] md:text-[11px] font-tech tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(192,132,252,0.2)]">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-ping" />
            <span>Interactive Deployments • 100% Functional</span>
          </div>
          <h2 className="font-tech text-white text-2xl md:text-3xl font-bold tracking-tight mb-2">
            03 // Live Showroom
          </h2>
          <p className="font-body text-xs md:text-sm text-brand-mutedsilver flex items-center flex-wrap gap-2">
            <span className="text-white font-medium">Every card below is a real, live website.</span>
            <span>Tap or click any project to launch and test it live in your browser.</span>
            <span className="relative inline-block group">
              <button 
                type="button"
                className="cursor-help inline-flex items-center focus:outline-none"
                onClick={(e) => e.preventDefault()}
                aria-label="Showroom disclaimer"
              >
                <span className="text-brand-mutedsilver/70 group-hover:text-brand-neon group-focus:text-brand-neon transition-colors text-[10px] md:text-xs border border-brand-mutedsilver/30 rounded-full px-2 py-0.5 font-tech tracking-wider">
                  ⓘ Disclaimer
                </span>
              </button>
              <span className="absolute left-0 top-full mt-2 w-[85vw] max-w-[340px] p-4 rounded-xl bg-[#0e0e14]/95 backdrop-blur-2xl border border-brand-amethyst/50 text-[11px] md:text-xs text-brand-mutedsilver leading-relaxed opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus:opacity-100 group-focus:pointer-events-auto transition-all duration-300 z-[80] shadow-[0_15px_50px_rgba(0,0,0,0.8)] text-left">
                All showcased projects are either high-performance demonstration pieces created for portfolio reference purposes, or live client deployments displayed with the consent of the respective owners.
              </span>
            </span>
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
          const isAura = project.id === '02' || project.client.toLowerCase().includes('aura');
          const isZingWrap = project.id === '03' || project.client.toLowerCase().includes('zing');

          return (
            <div 
              key={project.id} 
              className="w-[78vw] sm:w-[50vw] md:min-w-[34vw] lg:min-w-[26vw] max-w-[380px] flex-shrink-0 snap-center pr-3 md:pr-6"
            >
              <MouseParallax intensity={8} className="w-full h-full">
                <button 
                  onClick={() => {
                    if (project.liveUrl && project.liveUrl !== '#') {
                      window.location.href = project.liveUrl;
                    }
                  }}
                  type="button"
                  className={`text-left block w-full h-[345px] sm:h-[355px] md:h-[365px] rounded-2xl overflow-hidden cyber-glass group relative flex flex-col justify-between p-4 sm:p-4.5 md:p-5 cursor-pointer border border-brand-amethyst/40 hover:border-brand-neon transition-colors duration-300 hover:shadow-[0_0_40px_rgba(192,132,252,0.35)] ${project.imagePlaceholder}`}
                >
                  {/* Card Top / Browser Mockup Bar */}
                  <div className="flex items-center justify-between z-10 pointer-events-none">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                      <span className="w-2 h-2 rounded-full bg-green-500/80" />
                      <span className="font-mono text-[9px] md:text-[10px] text-brand-mutedsilver ml-1 px-2 py-0.5 rounded-full bg-black/40 border border-white/5 truncate max-w-[110px]">
                        {project.client}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-neon/15 border border-brand-neon/50 text-brand-neon text-[10px] font-tech tracking-wider uppercase group-hover:bg-brand-neon group-hover:text-black transition-all duration-300 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-bold">LIVE SITE ↗</span>
                    </div>
                  </div>

                  {/* Card Center / High-Fidelity UI Visual Preview */}
                  <div className="my-auto z-10 py-1.5 md:py-2 pointer-events-none w-full">
                    {isVanguard && (
                      <div className="border border-[#D4AF37]/30 bg-black/65 backdrop-blur-md rounded-xl p-3 shadow-xl transform origin-left">
                        <p className="font-tech text-[#D4AF37] text-[8px] tracking-[0.25em] uppercase mb-1">
                          Vanguard & Partners
                        </p>
                        <h4 className="font-serif italic text-base md:text-lg text-white font-normal leading-tight mb-1.5">
                          Ruthless Precision.<br />
                          <span className="text-[#D4AF37]">Global Architecture.</span>
                        </h4>
                        <div className="flex gap-1.5 mt-2">
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                            Mergers & Acquisitions
                          </span>
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-brand-mutedsilver border border-white/10">
                            UK • US • PK
                          </span>
                        </div>
                      </div>
                    )}

                    {isAura && (
                      <div className="border border-[#8A9A86]/40 bg-[#161816]/75 backdrop-blur-md rounded-xl p-3 shadow-xl transform origin-left">
                        <p className="font-serif italic text-[#8A9A86] text-[8px] tracking-[0.25em] uppercase mb-1">
                          Aura Cosmetic Dentistry
                        </p>
                        <h4 className="font-serif text-base md:text-lg text-[#F9F9F7] font-normal leading-tight mb-1.5">
                          The Art of the<br />
                          <span className="text-[#8A9A86] italic">Unseen.</span>
                        </h4>
                        <div className="flex gap-1.5 mt-2">
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#8A9A86]/15 text-[#8A9A86] border border-[#8A9A86]/30">
                            Zen Spa Dentistry
                          </span>
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-[#D5D0C5] border border-white/10">
                            Porcelain Studio
                          </span>
                        </div>
                      </div>
                    )}

                    {isZingWrap && (
                      <div className="border border-[#FF6B6B]/40 bg-[#1f1614]/80 backdrop-blur-md rounded-xl p-3 shadow-xl transform origin-left">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-heading font-bold text-[#FF9E9E] text-[8px] tracking-wider uppercase">
                            Zing & Wrap • Fast Food
                          </p>
                          <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-[#FFD93D] text-[#4A3B32] font-bold">
                            WhatsApp Live
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-base md:text-lg text-white leading-tight mb-1.5">
                          Hot Loaded Zingers.<br />
                          <span className="text-[#FFA06A]">Direct Cart Delivery.</span>
                        </h4>
                        <div className="flex gap-1.5 mt-2">
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#FF6B6B]/20 text-[#FF9E9E] border border-[#FF6B6B]/40">
                            0% App Fees
                          </span>
                          <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/15">
                            Lahore • 20-30m
                          </span>
                        </div>
                      </div>
                    )}

                    {!isVanguard && !isAura && !isZingWrap && (
                      <div className="border border-brand-amethyst/30 bg-black/60 backdrop-blur-md rounded-xl p-4 shadow-xl">
                        <p className="font-tech text-brand-neon text-[9px] tracking-[0.25em] uppercase mb-1">
                          {project.category}
                        </p>
                        <h4 className="font-cinematic italic text-xl md:text-2xl text-white leading-tight mb-1.5">
                          {project.title}
                        </h4>
                        <p className="font-body text-xs text-brand-mutedsilver line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Prominent Clickable Action Bar (Unmistakable CTA) */}
                  <div className="relative z-10 w-full pointer-events-none py-1">
                    <div className="w-full py-2 px-3 rounded-xl bg-black/65 border border-brand-amethyst/40 group-hover:border-brand-neon group-hover:bg-brand-neon/20 group-hover:shadow-[0_0_25px_rgba(192,132,252,0.4)] transition-all duration-300 flex items-center justify-between">
                      <span className="font-tech text-[10px] sm:text-[11px] text-white font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-neon group-hover:scale-125 transition-transform" />
                        Launch Live App
                      </span>
                      <span className="font-tech text-[10px] text-brand-neon group-hover:text-white uppercase tracking-wider font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Visit Site</span>
                        <span>↗</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom / Info Bar */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-amethyst/20 font-tech text-[9px] text-brand-mutedsilver">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.metrics && (
                      <p className="font-tech text-[9px] text-green-400 font-medium truncate max-w-[120px]">
                        {project.metrics.split('•')[0] || project.metrics.split('?')[0]}
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

      {/* Touch & Click Prompt Indicator */}
      <div className="px-6 text-center mt-6 relative z-30 flex items-center justify-center">
        <span className="font-tech text-[10px] sm:text-[11px] uppercase tracking-widest text-brand-mutedsilver/80 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm">
          <span className="text-brand-neon animate-bounce">👆</span>
          <span>Tap or click any project above to launch live site in browser</span>
        </span>
      </div>
    </section>
  );
}
