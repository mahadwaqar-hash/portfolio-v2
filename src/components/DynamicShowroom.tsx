import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

// High-fidelity handcrafted snapshot mockups for zero-lag smooth scrolling
const projectPreviews: Record<string, { bg: string; badge: string; badgeColor: string; headline: string; sub: string; tag1: string; tag2: string }> = {
  '01': {
    bg: 'from-[#0C0B0A] via-[#1A1814] to-[#0A0908]',
    badge: 'M&A and Cross-Border Counsel',
    badgeColor: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10',
    headline: 'Ruthless Precision. Global Architecture.',
    sub: 'International corporate law firm specializing in M&A, Cross-Border Pathways, and Commercial Litigation.',
    tag1: 'UK • US • PK',
    tag2: 'Sub-0.4s FCP',
  },
  '02': {
    bg: 'from-[#121412] via-[#1A1E1A] to-[#0E100E]',
    badge: 'Zen Spa Cosmetic Dentistry',
    badgeColor: 'text-[#A3B8A0] border-[#A3B8A0]/30 bg-[#A3B8A0]/10',
    headline: 'The Art of the Unseen Smile.',
    sub: 'Ultra-luxury cosmetic dental clinic website designed to evoke the serene elegance of a bespoke medical spa.',
    tag1: 'Porcelain Studio',
    tag2: 'High-Trust Booking',
  },
  '03': {
    bg: 'from-[#1C1210] via-[#241614] to-[#120B0A]',
    badge: 'Direct WhatsApp Fast-Food Commerce',
    badgeColor: 'text-[#FF8A65] border-[#FF8A65]/30 bg-[#FF8A65]/10',
    headline: 'Loaded Zingers. Zero Platform Fees.',
    sub: 'High-conversion fast-food mobile web application with instant 1-click WhatsApp cart checkout.',
    tag1: 'WhatsApp API',
    tag2: '15-20m Delivery',
  },
  '04': {
    bg: 'from-[#141210] via-[#1C1814] to-[#0C0A09]',
    badge: 'Haute Couture Architecture',
    badgeColor: 'text-[#B89768] border-[#B89768]/30 bg-[#B89768]/10',
    headline: 'Monolithic Form. Quiet Permanence.',
    sub: 'Bespoke narrative digital showroom for high-end residential and commercial architectural commissions.',
    tag1: 'Framer Physics',
    tag2: 'Custom Atelier',
  },
};

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);

  const handleProjectClick = (url: string) => {
    if (!url || url === '#') return;
    window.location.href = url;
  };

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Track mouse coordinates over the showroom section to pop up left/right floating scroll buttons
  const handleMouseMoveSection = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width * 0.22) {
      setHoverSide('left');
    } else if (x > width * 0.78) {
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
      
      {/* Dynamic Pop-up Floating Scroll Buttons on Left and Right hover zones */}
      <AnimatePresence>
        {hoverSide === 'left' && (
          <motion.button
            key="left-scroll-btn"
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => scrollByAmount(-520)}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center justify-center font-mono text-xl transition-colors duration-200"
            aria-label="Scroll left"
          >
            ←
          </motion.button>
        )}
        {hoverSide === 'right' && (
          <motion.button
            key="right-scroll-btn"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => scrollByAmount(520)}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex items-center justify-center font-mono text-xl transition-colors duration-200"
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
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase text-zinc-300 font-semibold">
                02 // Interactive Showroom
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white tracking-tight">
              Live Client Deployments.
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 mt-3 max-w-xl font-normal leading-relaxed">
              Every card below is an active, production-grade website. Tap or click any card to launch and explore the live deployment.
            </p>
          </div>

          {/* Static Carousel Arrow Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-520)}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scrollByAmount(520)}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 active:scale-95"
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Showroom Carousel — Ultra-smooth, GPU-accelerated scroll */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-24 pb-8 gap-8 scroll-smooth"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {PORTFOLIO_PROJECTS.map((project, index) => {
          const domain = domainMap[project.id] || `${project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
          const preview = projectPreviews[project.id] || {
            bg: 'from-[#121216] via-[#1A1A22] to-[#0E0E14]',
            badge: project.category,
            badgeColor: 'text-[#DEC1FC] border-[#DEC1FC]/30 bg-[#DEC1FC]/10',
            headline: project.title,
            sub: project.description,
            tag1: 'React 18',
            tag2: 'Vite',
          };

          return (
            <motion.div
              key={project.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-[88vw] sm:w-[500px] md:w-[540px] flex-shrink-0"
            >
              <div
                onClick={() => handleProjectClick(project.liveUrl)}
                className="group relative apple-glass-card rounded-3xl p-5 md:p-6 cursor-pointer border border-white/10 hover:border-white/30 transition-colors duration-300 flex flex-col justify-between"
              >
                
                {/* 1. Apple Safari macOS Browser Window Frame */}
                <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E12] mb-6 transition-colors duration-300 group-hover:border-white/20">
                  
                  {/* macOS Title Bar */}
                  <div className="h-9 px-4 bg-[#14141B] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* URL Pill */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/50 border border-white/5 text-[11px] font-mono text-zinc-300">
                      <span className="text-[#00B67A] text-xs">🔒</span>
                      <span className="truncate max-w-[200px]">{domain}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-[#DEC1FC] font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Visit ↗</span>
                    </div>
                  </div>

                  {/* 2. Ultra-crisp, ZERO-LAG Homepage Mockup Stage */}
                  <div className={`relative w-full h-[240px] sm:h-[270px] p-6 bg-gradient-to-br ${preview.bg} flex flex-col justify-between overflow-hidden select-none`}>
                    
                    {/* Mockup Brand Badge */}
                    <div className="flex items-center justify-between z-10">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${preview.badgeColor}`}>
                        {preview.badge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        Live Showroom
                      </span>
                    </div>

                    {/* Mockup Hero Headline & Subcopy */}
                    <div className="z-10 my-auto">
                      <h4 className="font-tech text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
                        {preview.headline}
                      </h4>
                      <p className="font-body text-xs text-zinc-300 font-normal leading-relaxed line-clamp-2">
                        {preview.sub}
                      </p>
                    </div>

                    {/* Mockup Footer Chips */}
                    <div className="flex items-center justify-between z-10 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400">
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">{preview.tag1}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">{preview.tag2}</span>
                      </div>
                      <span className="text-[#00B67A] font-semibold">● Production Ready</span>
                    </div>

                    {/* Hover Glow Accent that pops up */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="px-5 py-2.5 rounded-full bg-white text-black font-tech text-xs uppercase tracking-widest font-bold shadow-2xl transform group-hover:scale-105 transition-transform">
                        Launch Live Site ↗
                      </div>
                    </div>

                  </div>

                </div>

                {/* 3. Card Meta Information with High-Contrast Text */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-xs tracking-wider uppercase text-[#DEC1FC] font-semibold">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      0{index + 1} // 04
                    </span>
                  </div>

                  <h3 className="font-tech text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 group-hover:text-[#DEC1FC] transition-colors">
                    {project.client}
                  </h3>

                  <p className="font-body text-sm text-zinc-300 font-normal leading-relaxed mb-5 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Metrics Badge & Tech Stack */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300 font-medium"
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
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Helper Banner */}
      <div className="text-center mt-10">
        <p className="font-mono text-xs text-zinc-400 font-medium">
          Move your mouse to the left or right edge of the screen to pop up instant scroll controls
        </p>
      </div>

    </section>
  );
}
