import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import MouseParallax from './MouseParallax';

export default function DynamicShowroom() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (url: string) => {
    if (!url || url === '#') return;
    window.location.href = url;
  };

  const scrollBy = (amount: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen py-24 md:py-48 flex flex-col justify-center overflow-hidden border-t border-brand-ms-alabaster/10">
      
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24 mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className="font-ms-heading italic text-brand-ms-bronze text-xl md:text-2xl mb-4 text-left">
            III. The Showroom
          </h2>
          <h3 className="font-ms-heading text-4xl md:text-7xl text-brand-ms-alabaster leading-[1.1] mb-6">
            Live Deployments.
          </h3>
          <p className="font-ms-body text-xs md:text-sm text-brand-ms-alabaster/60 max-w-lg leading-relaxed font-light">
            Every card below is a real, high-performance web experience. Tap or click any project to launch and test it live in your browser.
          </p>
        </div>
        <div className="hidden lg:flex gap-6">
          <button 
            onClick={() => scrollBy(-window.innerWidth * 0.4)}
            className="w-16 h-16 rounded-full border border-brand-ms-alabaster/20 flex items-center justify-center text-brand-ms-alabaster hover:border-brand-ms-bronze hover:text-brand-ms-bronze transition-colors duration-500"
          >
            ←
          </button>
          <button 
            onClick={() => scrollBy(window.innerWidth * 0.4)}
            className="w-16 h-16 rounded-full border border-brand-ms-alabaster/20 flex items-center justify-center text-brand-ms-alabaster hover:border-brand-ms-bronze hover:text-brand-ms-bronze transition-colors duration-500"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollContainerRef}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-12 relative z-10 gap-8 md:gap-16"
      >
        {PORTFOLIO_PROJECTS.map((project, index) => {
          return (
            <div 
              key={project.id} 
              className="w-[75vw] sm:w-[50vw] md:min-w-[35vw] lg:min-w-[28vw] max-w-[400px] flex-shrink-0 snap-center"
            >
              <MouseParallax intensity={4} className="w-full h-full">
                <button 
                  onClick={() => handleProjectClick(project.liveUrl)}
                  type="button"
                  className="text-left block w-full group relative flex flex-col cursor-pointer"
                >
                  
                  {/* Image Container - Lighter, more visible */}
                  <div className="w-full aspect-[4/3] md:aspect-square relative overflow-hidden mb-6 rounded-2xl shadow-lg bg-[#2A2A2A]">
                    <div 
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 pointer-events-none ${project.imagePlaceholder}`}
                    />
                    
                    {/* Subtle Hover Overlay instead of fully black */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="font-ms-body text-[10px] tracking-[0.2em] text-white uppercase border border-white/40 bg-black/40 px-6 py-2.5 rounded-full shadow-xl">
                        Launch Project
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-ms-heading italic text-lg text-brand-ms-bronze">
                        0{index + 1}.
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                      <span className="font-ms-body text-[9px] tracking-[0.2em] uppercase text-brand-ms-alabaster/60">
                        {project.category}
                      </span>
                    </div>
                    
                    <h4 className="font-ms-heading text-3xl md:text-4xl text-brand-ms-alabaster leading-tight mb-3 group-hover:text-brand-ms-bronze transition-colors duration-500">
                      {project.title}
                    </h4>
                    
                    <p className="font-ms-body text-[11px] text-brand-ms-alabaster/70 leading-relaxed line-clamp-2 max-w-sm">
                      {project.description}
                    </p>
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
