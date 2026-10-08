import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollScrubManifestoProps {
  text: string;
}

const AnimatedWord = ({ 
  word, 
  index, 
  total, 
  scrollYProgress 
}: { 
  word: string; 
  index: number; 
  total: number; 
  scrollYProgress: MotionValue<number> 
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Word opacity & color transition from dark muted to pure radiant white
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['#52525B', '#FFFFFF']);
  
  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block mr-[0.28em] transition-all duration-150"
    >
      {word}
    </motion.span>
  );
};

const ScrollScrubManifesto: React.FC<ScrollScrubManifestoProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start 0.85', 'center center'] 
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-20 md:py-36 px-6 md:px-12">
      
      {/* Radiant Ambient Liquid Glass Glow Orb behind Manifesto */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[55vh] bg-gradient-to-tr from-[#DEC1FC]/15 via-[#00B67A]/10 to-[#6D28D9]/20 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Floating Apple Glass Index Pill */}
      <div className="flex items-center gap-3 mb-10 md:mb-16">
        <div className="apple-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DEC1FC] animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
            01 // The Manifesto
          </span>
        </div>
      </div>

      {/* Scrubbing Text */}
      <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-tech font-bold leading-[1.12] tracking-tight">
        {words.map((word, index) => (
          <AnimatedWord 
            key={index}
            word={word}
            index={index}
            total={words.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>

      {/* Bottom Sub-annotation */}
      <div className="mt-12 md:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-zinc-500">
        <span>Architectural Philosophy</span>
        <span>0% Templates • 100% Bespoke Code</span>
      </div>
    </div>
  );
};

export default ScrollScrubManifesto;
