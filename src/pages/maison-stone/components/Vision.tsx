import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function AnimatedWord({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
}

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text = "We do not merely decorate rooms. We orchestrate light, texture, and geometry to craft living narratives that elevate the human experience.";
  const words = text.split(" ");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.4"]
  });

  return (
    <section className="py-40 px-6 md:px-24 bg-brand-ms-obsidian text-center flex flex-col items-center relative z-10">
      <h3 className="text-xs tracking-[0.3em] text-brand-ms-bronze uppercase mb-12 font-ms-body">
        01 &mdash; The Approach
      </h3>
      
      <div ref={containerRef} className="max-w-4xl mx-auto">
        <p className="text-3xl md:text-5xl font-ms-heading leading-relaxed text-brand-ms-alabaster">
          {words.map((word, i) => (
            <AnimatedWord 
              key={i} 
              word={word} 
              index={i} 
              total={words.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </p>
      </div>
    </section>
  );
}
