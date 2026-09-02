import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import MouseParallax from './MouseParallax';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

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
      const cardWidth = window.innerWidth * 0.8; // roughly 80vw
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
        <h2 className="font-tech text-brand-neon tracking-widest uppercase text-sm">
          03 // Showroom
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={() => scrollBy(-window.innerWidth * 0.5)}
            className="w-12 h-12 rounded-full border border-brand-amethyst/30 flex items-center justify-center text-brand-mutedsilver hover:text-brand-neon hover:border-brand-neon transition-colors"
            data-cursor="text"
          >
            ←
          </button>
          <button 
            onClick={() => scrollBy(window.innerWidth * 0.5)}
            className="w-12 h-12 rounded-full border border-brand-amethyst/30 flex items-center justify-center text-brand-mutedsilver hover:text-brand-neon hover:border-brand-neon transition-colors"
            data-cursor="text"
          >
            →
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 md:px-12 lg:px-24 pb-12 relative z-10"
      >
        {PORTFOLIO_PROJECTS.map((project, i) => (
          <div 
            key={project.id} 
            className="w-[90vw] md:min-w-[60vw] lg:min-w-[45vw] flex-shrink-0 snap-center pr-4 md:pr-12"
          >
            <MouseParallax intensity={10} className="w-full h-full">
              <div 
                className={`w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden cyber-glass group relative flex flex-col justify-end p-4 md:p-8 ${project.imagePlaceholder}`}
                data-cursor="image"
                style={{ transform: "translateZ(20px)" }}
              >
                {/* Project Info Overlay */}
                <div className="relative z-10 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out" style={{ transform: "translateZ(50px)" }}>
                  <div className="flex justify-between items-end mb-2 md:mb-4">
                    <div>
                      <p className="font-tech text-[10px] md:text-xs text-brand-mutedsilver mb-1 md:mb-2">{project.client}</p>
                      <h3 className="font-cinematic text-2xl md:text-4xl text-white">{project.title}</h3>
                    </div>
                    <span className="font-tech text-brand-neon text-xs md:text-sm hidden sm:block">{project.id}</span>
                  </div>
                  
                  <div className="h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <p className="font-mono text-xs md:text-sm text-brand-mercury mb-3 md:mb-4 max-w-md hidden sm:block">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-4">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-1.5 py-0.5 md:px-2 md:py-1 rounded bg-brand-surface border border-brand-amethyst/20 font-tech text-[10px] md:text-xs text-brand-mutedsilver">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.metrics && (
                      <p className="font-tech text-[10px] md:text-xs text-green-400">
                        {project.metrics}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-abyss via-brand-abyss/60 sm:via-brand-abyss/40 to-transparent opacity-90 sm:opacity-80" />
              </div>
            </MouseParallax>
          </div>
        ))}
      </div>
    </section>
  );
}
