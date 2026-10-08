import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import MouseParallax from './MouseParallax';

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleProjectClick = (url: string) => {
    if (!url || url === '#') return;
    window.location.href = url;
  };

  const scrollBy = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

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
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden bg-brand-ms-alabaster border-t border-brand-ms-graphite/5">
      
      {/* Light Bubbly Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] rounded-full blur-[100px] -z-10 pointer-events-none transition-colors duration-1000 opacity-10"
        style={{ backgroundColor: PORTFOLIO_PROJECTS[activeIndex]?.accentColor || 'rgba(0,0,0,0)' }}
      />

      <div className="px-6 md:px-12 lg:px-24 mb-8 md:mb-12 flex justify-between items-end relative z-40">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-black/5 backdrop-blur-xl text-brand-ms-graphite text-[10px] md:text-[11px] font-tech tracking-widest uppercase mb-4 shadow-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Live Interactive Deployments</span>
          </div>
          <h2 className="font-cinematic italic text-brand-ms-graphite text-4xl md:text-6xl font-bold tracking-tight mb-3">
            The Digital Showroom.
          </h2>
          <p className="font-body text-xs md:text-sm text-brand-ms-graphite/60 flex items-center flex-wrap gap-2 max-w-xl leading-relaxed">
            <span className="font-medium text-brand-ms-graphite">Every card below is a real, live website.</span>
            <span>Tap or click any project to launch and test it live in your browser.</span>
          </p>
        </div>
        <div className="hidden lg:flex gap-4">
          <button 
            onClick={() => scrollBy(-window.innerWidth * 0.3)}
            className="w-12 h-12 rounded-full border border-black/10 bg-white/40 backdrop-blur-xl shadow-sm flex items-center justify-center text-brand-ms-graphite hover:text-black hover:bg-white hover:border-black/20 transition-colors"
          >
            ←
          </button>
          <button 
            onClick={() => scrollBy(window.innerWidth * 0.3)}
            className="w-12 h-12 rounded-full border border-black/10 bg-white/40 backdrop-blur-xl shadow-sm flex items-center justify-center text-brand-ms-graphite hover:text-black hover:bg-white hover:border-black/20 transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-12 relative z-10 gap-6 md:gap-10"
      >
        {PORTFOLIO_PROJECTS.map((project) => {
          return (
            <div 
              key={project.id} 
              className="w-[85vw] sm:w-[50vw] md:min-w-[40vw] lg:min-w-[32vw] max-w-[420px] flex-shrink-0 snap-center"
            >
              <MouseParallax intensity={4} className="w-full h-full">
                <button 
                  onClick={() => handleProjectClick(project.liveUrl)}
                  type="button"
                  className={`text-left block w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden group relative flex flex-col justify-between p-6 cursor-pointer border border-black/5 hover:border-black/10 bg-white/40 backdrop-blur-3xl transition-all duration-500 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2`}
                >
                  {/* Background Image / Texture Layer */}
                  <div 
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-multiply transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${project.imagePlaceholder}`}
                  />

                  {/* Card Top */}
                  <div className="flex items-center justify-between z-10 pointer-events-none relative">
                    <div className="flex flex-col gap-1">
                      <span className="font-tech text-[10px] tracking-widest uppercase text-brand-ms-graphite/40">
                        {project.category}
                      </span>
                      <span className="font-tech text-xs tracking-widest uppercase text-brand-ms-graphite font-semibold">
                        {project.client}
                      </span>
                    </div>
                  </div>

                  {/* Card Center (Cinematic Typography) */}
                  <div className="my-auto z-10 w-full relative">
                    <h4 className="font-cinematic italic text-4xl md:text-5xl text-brand-ms-graphite leading-tight mb-3">
                      {project.title}
                    </h4>
                    <p className="font-body text-xs md:text-sm text-brand-ms-graphite/70 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Prominent Clickable Action Bar */}
                  <div className="relative z-10 w-full pointer-events-none">
                    <div className="w-full py-3 px-4 rounded-xl bg-white/60 backdrop-blur-md border border-black/5 group-hover:bg-white group-hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 flex items-center justify-between mb-4">
                      <span className="font-tech text-xs text-brand-ms-graphite font-bold uppercase tracking-widest">
                        Launch Live App
                      </span>
                      <span className="font-tech text-xs text-brand-ms-graphite uppercase tracking-widest font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Visit</span>
                        <span>↗</span>
                      </span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map(tech => (
                        <span key={tech} className="px-2 py-1 rounded bg-white/40 border border-black/5 font-tech text-[9px] uppercase tracking-widest text-brand-ms-graphite/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </MouseParallax>
            </div>
          );
        })}
      </div>

    </section>
  );
}
