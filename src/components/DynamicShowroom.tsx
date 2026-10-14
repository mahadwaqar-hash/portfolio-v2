import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';

interface ShowroomCardProps {
  project: PortfolioProject;
  index: number;
  domain: string;
  isLoaded: boolean;
  onMouseEnter: () => void;
  onClick: (url: string) => void;
}

function ShowroomCard({
  project,
  index,
  domain,
  isLoaded,
  onMouseEnter,
  onClick,
}: ShowroomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--card-mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${y}px`);
  };

  return (
    <div
      data-project-id={project.id}
      onMouseEnter={onMouseEnter}
      className="showroom-card-wrapper w-[78vw] sm:w-[540px] md:w-[580px] flex-shrink-0 snap-center"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={() => onClick(project.liveUrl)}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="group relative apple-glass-card rounded-3xl p-5 md:p-6 cursor-pointer border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden will-change-transform"
      >
        {/* Cursor-Tracking Spotlight Glow & Border Lighting */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(400px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(222, 193, 252, 0.12), rgba(0, 182, 122, 0.1), transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* 1px Specular Border Light */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background:
              'radial-gradient(300px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(0, 182, 122, 0.45), rgba(222, 193, 252, 0.35), transparent 70%)',
          }}
          aria-hidden="true"
        />

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
              <span className="truncate max-w-[140px] sm:max-w-[200px]">{domain}</span>
            </div>

            {/* Magnetic Pull VISIT ↗ Pill */}
            <motion.div
              whileHover={{ scale: 1.1, x: 2, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-tech uppercase tracking-wider text-[#DEC1FC] group-hover:text-[#00B67A] group-hover:border-[#00B67A]/50 group-hover:bg-[#00B67A]/10 group-hover:shadow-[0_0_12px_rgba(0,182,122,0.4)] transition-all duration-200 font-semibold"
            >
              <span className="hidden sm:inline">Visit</span>
              <span>↗</span>
            </motion.div>
          </div>

          {/* 2. Real Interactive Live Homepage Viewport with Smooth Hover Zoom */}
          <div className="relative w-full h-[190px] sm:h-[300px] overflow-hidden bg-black select-none pointer-events-none transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            {isLoaded ? (
              <iframe
                src={project.liveUrl}
                title={`${project.client} live preview`}
                loading="lazy"
                scrolling="no"
                tabIndex={-1}
                className="w-[1280px] h-[780px] border-0 transform origin-top-left scale-[0.24] sm:scale-[0.44] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300 will-change-transform transform-gpu"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#09090D] text-zinc-500 font-mono text-xs gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DEC1FC] animate-ping" />
                <span>Initializing live showroom...</span>
              </div>
            )}

            {/* Translucent sheen overlay */}
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

          <p className="font-body text-sm sm:text-[15px] text-zinc-300 font-normal leading-relaxed mb-5 line-clamp-2">
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

      </motion.div>
    </div>
  );
}

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Lazy load iframe only when card is in view or hovered
  const [visibleIframes, setVisibleIframes] = useState<Record<string, boolean>>({
    '01': true,
  });

  // Track active card on scroll for mobile pagination
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const card = el.querySelector('.showroom-card-wrapper') as HTMLElement | null;
      if (!card) return;
      const cardWidth = card.offsetWidth + 32;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(index, 0), PORTFOLIO_PROJECTS.length - 1));
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
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
              <span className="sr-only">Portfolio & Case Studies: </span>Live Client Deployments.
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 mt-3 max-w-xl font-light">
              Every card below is an active, production-grade website. Tap or click any card to test the live deployment directly in your browser.
            </p>
          </div>

          {/* Static Carousel Controls with Spring Feedback */}
          <div className="hidden sm:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => scrollByAmount(-560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC]"
              aria-label="Scroll showroom showcase backward"
            >
              ←
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={() => scrollByAmount(560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC]"
              aria-label="Scroll showroom showcase forward"
            >
              →
            </motion.button>
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
            <ShowroomCard
              key={project.id}
              project={project}
              index={index}
              domain={domain}
              isLoaded={isLoaded}
              onMouseEnter={() => handleMouseEnterCard(project.id)}
              onClick={handleProjectClick}
            />
          );
        })}
      </div>

      {/* Mobile Swipe Indicators & Pagination Dots with Spring Feedback */}
      <div className="flex sm:hidden items-center justify-between px-8 mt-2 mb-4">
        <div className="flex items-center gap-2">
          {PORTFOLIO_PROJECTS.map((_, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.92 }}
              onClick={() => {
                const el = scrollContainerRef.current;
                if (!el) return;
                const card = el.querySelector('.showroom-card-wrapper') as HTMLElement | null;
                const cardWidth = card ? card.offsetWidth + 32 : 320;
                el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? 'w-6 bg-[#DEC1FC]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
        <div className="apple-glass rounded-full px-3 py-1 flex items-center gap-2 text-xs font-mono text-zinc-300">
          <span>0{activeIndex + 1} / 0{PORTFOLIO_PROJECTS.length}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-[#DEC1FC]">Swipe →</span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-6">
        <p className="font-mono text-xs text-zinc-400 font-medium">
          Tip: Move cursor to screen edges for quick navigation, or tap any card to open the live site
        </p>
      </div>

    </section>
  );
}
