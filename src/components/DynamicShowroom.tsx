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
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-12 lg:px-24 pb-12 relative z-10 gap-12 md:gap-24"
      >
        {PORTFOLIO_PROJECTS.map((project, index) => {
          return (
            <div 
              key={project.id} 
              className="w-[85vw] sm:w-[60vw] md:min-w-[45vw] lg:min-w-[38vw] max-w-[500px] flex-shrink-0 snap-center"
            >
              <MouseParallax intensity={4} className="w-full h-full">
                <button 
                  onClick={() => handleProjectClick(project.liveUrl)}
                  type="button"
                  className="text-left block w-full group relative flex flex-col cursor-pointer"
                >
                  
                  {/* Image Container */}
                  <div className="w-full aspect-[4/5] relative overflow-hidden mb-8 border border-white/5">
                    <div 
                      className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 pointer-events-none grayscale group-hover:grayscale-0 ${project.imagePlaceholder}`}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-brand-ms-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-ms-body text-[10px] tracking-[0.3em] text-brand-ms-alabaster uppercase border border-brand-ms-alabaster/30 px-6 py-3 rounded-full">
                        Launch Live App
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-ms-heading italic text-xl text-brand-ms-bronze">
                        0{index + 1}.
                      </span>
                      <div className="h-[1px] flex-1 bg-white/10" />
                      <span className="font-ms-body text-[10px] tracking-[0.2em] uppercase text-brand-ms-alabaster/40">
                        {project.category}
                      </span>
                    </div>
                    
                    <h4 className="font-ms-heading text-4xl md:text-5xl text-brand-ms-alabaster leading-tight mb-4 group-hover:text-brand-ms-bronze transition-colors duration-500">
                      {project.title}
                    </h4>
                    
                    <p className="font-ms-body text-xs text-brand-ms-alabaster/50 leading-relaxed line-clamp-2">
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
