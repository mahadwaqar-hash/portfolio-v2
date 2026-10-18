import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollScrubManifestoProps {
  text: string;
}

const getWordAccentColor = (cleanWord: string): string => {
  const lower = cleanWord.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (lower === 'schema' || lower === 'flagships') return '#DEC1FC';
  if (lower === 'outrank' || lower === 'calculated') return '#00B67A';
  if (lower === 'high-ticket' || lower === 'cinematic') return '#DEC1FC';
  return '#FFFFFF';
};

interface WordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

// Memoized Word Component — executes 100% on GPU outside React re-render cycles
const Word = React.memo(function Word({ 
  word, 
  index, 
  total, 
  scrollYProgress 
}: WordProps) {
  const start = index / total;
  const end = Math.min((index + 1) / total, 1);
  const targetColor = useMemo(() => getWordAccentColor(word), [word]);

  // Strict contrast floor of 0.45 opacity with direct Lenis 1:1 scroll tracking
  const opacity = useTransform(scrollYProgress, [start, end], [0.45, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['#8a8a93', targetColor]);
  
  return (
    <motion.span 
      style={{ opacity, color }} 
      className="inline-block mr-[0.3em]"
    >
      {word}
    </motion.span>
  );
});

const ScrollScrubManifesto: React.FC<ScrollScrubManifestoProps> = ({ text }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Single useScroll instance with optimized trigger offset
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start 0.85', 'end 0.35'] 
  });

  const words = useMemo(() => text.split(' '), [text]);

  return (
    <div ref={containerRef} className="relative max-w-6xl mx-auto py-24 md:py-40 px-6 md:px-12">
      
      {/* Asymmetric glow — Pure GPU radial gradient (zero blur cost) */}
      <div 
        className="absolute top-[30%] -left-[10%] w-[50vw] h-[40vh] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(222, 193, 252, 0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

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
          <Word 
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

export default React.memo(ScrollScrubManifesto);
