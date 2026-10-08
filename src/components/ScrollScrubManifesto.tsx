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
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['#3F3F46', '#FFFFFF']);
  const y = useTransform(scrollYProgress, [start, end], [8, 0]);
  
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
      
      {/* Asymmetric glow — intentionally off-center for a hand-placed feel */}
      <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[40vh] bg-[#DEC1FC]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section label — just a quiet left-aligned marker, not a pill */}
      <div className="flex items-center gap-4 mb-12 md:mb-20">
        <div className="w-3 h-3 rounded-full border border-zinc-700" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
          What I believe
        </span>
        <div className="flex-1 h-[1px] bg-zinc-800" />
      </div>

      {/* Scrubbing Text */}
      <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-tech font-semibold leading-[1.25] tracking-tight">
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

      {/* Conversational aside — breaks the corporate monotony */}
      <div className="mt-16 md:mt-24 flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm text-zinc-500 font-light leading-relaxed">
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
