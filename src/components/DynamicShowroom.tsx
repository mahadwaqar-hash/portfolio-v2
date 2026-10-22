import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '../data/portfolioData';

interface ShowroomCardProps {
  project: PortfolioProject;
  index: number;
  domain: string;
  onClick: (url: string) => void;
}

const ShowroomCard = React.memo(function ShowroomCard({
  project,
  index,
  domain,
  onClick,
}: ShowroomCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.5 };
  const springX = useSpring(cardX, springConfig);
  const springY = useSpring(cardY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(xPct);
    cardY.set(yPct);
    cardRef.current.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <div
      data-project-id={project.id}
      style={{ perspective: 1400 }}
      className="showroom-card-wrapper w-[82vw] sm:w-[540px] md:w-[580px] flex-shrink-0"
    >
      <motion.div
        ref={cardRef}
        onClick={() => onClick(project.liveUrl)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="group relative rounded-3xl p-5 md:p-6 cursor-pointer bg-[#0D0D12] border border-white/10 hover:border-[#DEC1FC]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(222,193,252,0.15)] transition-colors duration-200 transition-shadow duration-300 flex flex-col justify-between overflow-hidden transform-gpu will-change-transform"
      >
        {/* Subtle Ambient Hover Sheen */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{
            background:
              'radial-gradient(450px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(222, 193, 252, 0.12), rgba(0, 182, 122, 0.08), transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* 1. Apple Safari macOS Browser Window Frame with 3D Depth */}
        <div 
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
          className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0E0E12] shadow-inner mb-6 transition-all duration-300 group-hover:border-white/25"
        >
          
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

            {/* VISIT ↗ Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-tech uppercase tracking-wider text-[#DEC1FC] group-hover:text-[#00B67A] group-hover:border-[#00B67A]/50 group-hover:bg-[#00B67A]/10 transition-all duration-200 font-semibold">
              <span className="hidden sm:inline">Visit</span>
              <span>↗</span>
            </div>
          </div>

          {/* 2. Real Interactive Live Client Deployment Viewport */}
          <div className="relative w-full h-[190px] sm:h-[300px] overflow-hidden bg-black select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <iframe
              src={project.liveUrl}
              title={`${project.client} live preview`}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
              aria-hidden="true"
              className="w-[1280px] h-[780px] border-0 transform origin-top-left scale-[0.24] sm:scale-[0.44] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />

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
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" aria-hidden="true" />
              <span className="truncate max-w-[200px]">{project.metrics.split('•')[0] || project.metrics}</span>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
});

// Isolated Mobile Pagination to prevent re-rendering the whole showroom on touch scroll
function MobilePagination({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || window.innerWidth >= 640) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            const cardWidth = el.clientWidth * 0.82;
            const index = Math.round(el.scrollLeft / cardWidth);
            setActiveIndex(Math.min(Math.max(index, 0), PORTFOLIO_PROJECTS.length - 1));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="flex sm:hidden items-center justify-between px-8 mt-4 mb-2">
      <div className="flex items-center gap-2">
        {PORTFOLIO_PROJECTS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollContainerRef.current;
              if (!el) return;
              const cardWidth = el.clientWidth * 0.82;
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
  );
}

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = useCallback((url: string) => {
    if (!url || url === '#') return;
    window.location.href = url;
  }, []);

  const scrollByAmount = useCallback((amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  }, []);

  const domainMap: Record<string, string> = {
    '01': 'vanguardpartners.law',
    '02': 'auradentistry.com',
    '03': 'zingwrap.pk',
    '04': 'maisonstone.arch',
  };

  return (
    <section 
      className="relative w-full py-24 md:py-36 overflow-hidden border-t border-white/5 bg-[#070709]"
    >
      {/* Ambient Gradient in Background — Pure GPU Gradient, zero blur pass */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] pointer-events-none -z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(222, 193, 252, 0.08) 0%, rgba(0, 182, 122, 0.06) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />

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
              <span className="sr-only">Portfolio &amp; Case Studies: </span>Live Client Deployments.
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-300 mt-3 max-w-xl font-light">
              Every card below is an active, production-grade website. Tap or click any card to test the live deployment directly in your browser.
            </p>
          </div>

          {/* Desktop Carousel Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => scrollByAmount(-560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] active:scale-95"
              aria-label="Scroll showroom showcase backward"
            >
              ←
            </button>
            <button
              onClick={() => scrollByAmount(560)}
              className="w-12 h-12 rounded-full apple-glass flex items-center justify-center text-white hover:border-white/30 hover:bg-white hover:text-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] active:scale-95"
              aria-label="Scroll showroom showcase forward"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Showroom Carousel — 60fps Native Touch & Wheel Inertia */}
      <div
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-24 pb-8 gap-8"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {PORTFOLIO_PROJECTS.map((project, index) => {
          const domain = domainMap[project.id] || `${project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

          return (
            <ShowroomCard
              key={project.id}
              project={project}
              index={index}
              domain={domain}
              onClick={handleProjectClick}
            />
          );
        })}
      </div>

      {/* Mobile Swipe Indicators & Pagination Dots (Isolated Component) */}
      <MobilePagination scrollContainerRef={scrollContainerRef} />

      {/* Bottom Hint */}
      <div className="text-center mt-6">
        <p className="font-mono text-xs text-zinc-400 font-medium">
          Tip: Tap or click any card to launch the live client deployment
        </p>
      </div>

    </section>
  );
}
