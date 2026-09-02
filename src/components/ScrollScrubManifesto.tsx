import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MouseParallax from './MouseParallax';

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
  const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const color = useTransform(scrollYProgress, [start, end], ['#64748B', '#C084FC']);
  
  return (
    <motion.span 
      style={{ opacity, color }} 
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
    offset: ['start 0.8', 'end 0.2'] 
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto py-32 px-8">
      <MouseParallax intensity={10}>
        <p className="text-4xl lg:text-6xl font-tech leading-tight" style={{ transform: 'translateZ(50px)' }}>
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
      </MouseParallax>
    </div>
  );
};

export default ScrollScrubManifesto;
