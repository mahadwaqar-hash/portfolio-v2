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
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['#71717A', '#FFFFFF']);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]);
  
  return (
    <motion.span 
      style={{ opacity, color, y }} 
      className="inline-block mr-[0.3em]"
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
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-24 md:py-40 px-6 md:px-12">
      
      {/* Asymmetric glow */}
      <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[40vh] bg-[#DEC1FC]/12 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section label */}
      <div className="flex items-center gap-4 mb-12 md:mb-20">
        <div className="w-3 h-3 rounded-full border border-zinc-500" />
        <span className="font-mono text-xs tracking-widest uppercase text-zinc-400 font-semibold">
          What I believe
        </span>
        <div className="flex-1 h-[1px] bg-zinc-700" />
      </div>

      {/* Scrubbing Text */}
      <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-tech font-bold leading-[1.25] tracking-tight">
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

      {/* Conversational aside with enhanced contrast */}
      <div className="mt-16 md:mt-24 flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm text-zinc-300 font-normal leading-relaxed">
        <p className="max-w-xs">
          I've turned down projects that wanted "just a quick website." 
          If it's not going to be remarkable, I'm not interested.
        </p>
        <p className="max-w-xs">
          Every line of code ships with intention. Zero filler components, 
          zero placeholder copy, zero Lorem Ipsum energy.
        </p>
      </div>
    </div>
  );
};

export default ScrollScrubManifesto;
