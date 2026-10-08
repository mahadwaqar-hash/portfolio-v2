import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  // Lazy load iframe only when card is in view or hovered to guarantee 60fps smooth scrolling
  const [visibleIframes, setVisibleIframes] = useState<Record<string, boolean>>({
    '01': true, // First card loaded by default
  });

  const handleProjectClick = (url: string) => {
    if (!url || url === '#') return;
    window.location.href = url;
  };

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleMouseEnterCard = (id: string) => {
    setVisibleIframes((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  // Preload on intersection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-project-id');
            if (id) {
              setVisibleIframes((prev) => ({ ...prev, [id]: true }));
            }
          }
        });
      },
      { root: scrollContainerRef.current, rootMargin: '200px' }
    );

    const cards = document.querySelectorAll('.showroom-card-wrapper');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleMouseMoveSection = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.18) {
      setHoverSide('left');
    } else if (x > width * 0.82) {
      setHoverSide('right');
    } else {
      setHoverSide(null);
    }
  };

  const handleMouseLeaveSection = () => {
    setHoverSide(null);
  };

  const domainMap: Record<string, string> = {
    '01': 'vanguardpartners.law',
    '02': 'auradentistry.com',
    '03': 'zingwrap.pk',
    '04': 'maisonstone.arch',
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMoveSection}
      onMouseLeave={handleMouseLeaveSection}
      className="relative w-full py-24 md:py-36 overflow-hidden border-t border-white/5 bg-[#070709]"
    >
      
      {/* Ambient Apple Glow in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-gradient-to-b from-[#DEC1FC]/10 via-[#00B67A]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Floating Dynamic Edge Scroll Buttons */}
      <AnimatePresence>
        {hoverSide === 'left' && (
          <motion.button
            key="left-scroll-btn"
            initial={{ opacity: 0, x: -25, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -25, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => scrollByAmount(-560)}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/25 shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex items-center justify-center font-mono text-xl transition-colors duration-200"
            aria-label="Scroll left"
          >
            ←
          </motion.button>
        )}
        {hoverSide === 'right' && (
          <motion.button
            key="right-scroll-btn"
            initial={{ opacity: 0, x: 25, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 25, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => scrollByAmount(560)}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/25 shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex items-center justify-center font-mono text-xl transition-colors duration-200"
            aria-label="Scroll right"
          >
            →
          </motion.button>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="apple-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
                02 // Interactive Showroom
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white tracking-tight">
              Live Client Deployments.
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 mt-3 max-w-xl font-light">
              Every card below is an active, production-grade website. Tap or click any card to test the live deployment directly in your browser.
            </p>
          </div>

          {/* Static Carousel Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollByAmount(560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all hover:scale-105 active:scale-95"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Showroom Carousel — Hardware Accelerated */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-8 gap-8 scroll-smooth will-change-scroll"
      >
        {PORTFOLIO_PROJECTS.map((project, index) => {
          const domain = domainMap[project.id] || `${project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
          const isLoaded = visibleIframes[project.id];

          return (
            <div
              key={project.id}
              data-project-id={project.id}
              onMouseEnter={() => handleMouseEnterCard(project.id)}
              className="showroom-card-wrapper w-[88vw] sm:w-[540px] md:w-[580px] flex-shrink-0 snap-center"
            >
              <div
                onClick={() => handleProjectClick(project.liveUrl)}
                className="group relative apple-glass-card rounded-3xl p-5 md:p-6 cursor-pointer transition-all duration-500 hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] hover:-translate-y-2 flex flex-col justify-between"
              >
                
                {/* 1. Apple Safari macOS Browser Window Frame */}
                <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E12] shadow-inner mb-6 transition-all duration-300 group-hover:border-white/25">
                  
                  {/* macOS Title Bar */}
                  <div className="h-9 px-4 bg-[#14141B] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* URL Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/50 border border-white/5 text-[11px] font-mono text-zinc-300">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-[#00B67A]" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="truncate max-w-[200px]">{domain}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-tech uppercase tracking-wider text-[#DEC1FC] font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Visit</span>
                      <span>↗</span>
                    </div>
                  </div>

                  {/* 2. Real Interactive Live Homepage Viewport (GPU Optimized) */}
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-black select-none pointer-events-none transform-gpu">
                    {isLoaded ? (
                      <iframe
                        src={project.liveUrl}
                        title={`${project.client} live preview`}
                        loading="lazy"
                        scrolling="no"
                        tabIndex={-1}
                        className="w-[1280px] h-[780px] border-0 transform origin-top-left scale-[0.38] sm:scale-[0.44] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300 will-change-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#09090D] text-zinc-600 font-mono text-xs">
                        Loading preview...
                      </div>
                    )}

                    {/* Translucent sheen overlay (doesn't trigger repaint) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none group-hover:opacity-20 transition-opacity" />

                    {/* Floating Launch Pill Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-5 py-2.5 rounded-full bg-white text-black font-tech text-xs uppercase tracking-widest font-bold shadow-2xl flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                        <span>Launch Full Website</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. Card Meta Information */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-tech text-xs tracking-[0.2em] uppercase text-[#DEC1FC] font-medium">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      0{index + 1} // 04
                    </span>
                  </div>

                  <h3 className="font-tech text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 group-hover:text-[#DEC1FC] transition-colors">
                    {project.client}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics Badge & Tech Stack */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#00B67A] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" />
                      <span className="truncate max-w-[200px]">{project.metrics.split('•')[0] || project.metrics}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-10">
        <p className="font-mono text-xs text-zinc-400 font-medium">
          Tip: Move cursor to screen edges for quick navigation, or tap any card to open the live site
        </p>
      </div>

    </section>
  );
}
