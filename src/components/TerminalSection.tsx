import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MouseParallax from './MouseParallax';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const lines = [
  { prompt: '> ', text: 'init mahad.portfolio', color: 'text-brand-neon' },
  { prompt: '> ', text: 'loading tech_stack... [React, Next.js, Framer, Tailwind]', color: 'text-brand-mercury' },
  { prompt: '> ', text: 'status: Available for freelance deployment.', color: 'text-green-400' },
  { prompt: '> ', text: 'location: Lahore, Pakistan.', color: 'text-brand-mutedsilver' },
  { prompt: '> ', text: 'compiling flawless logic... Done in 0.04s.', color: 'text-brand-bioglow' },
];

export default function TerminalSection() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<{ text: string; color: string; prompt: string }[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentLine]);
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentLineIndex, currentCharIndex, isInView]);

  return (
    <section ref={containerRef} className="py-12 md:py-24 relative z-10 w-full overflow-hidden">
      <h2 className="font-tech text-brand-neon tracking-widest uppercase text-xs md:text-sm mb-8 md:mb-12">
        02 // Arsenal
      </h2>
      <div className="w-full max-w-4xl mx-auto">
        <MouseParallax intensity={10}>
          <div className="cyber-glass rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(109,40,217,0.15)]" style={{ transform: "translateZ(30px)" }}>
            <header className="flex items-center gap-2 px-4 py-3 border-b border-brand-amethyst/20">
              <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
              <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
              <div className="font-tech text-[10px] sm:text-xs text-brand-mutedsilver ml-2 sm:ml-4">
                mahad@portfolio:~
              </div>
            </header>
            <div className="p-4 sm:p-6 md:p-8 font-mono text-xs sm:text-sm md:text-base break-words whitespace-pre-wrap">
              {displayedLines.map((line, i) => (
                <div key={i} className="mb-2">
                  <span className="text-brand-mutedsilver">{line.prompt}</span>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}
              {currentLineIndex < lines.length && (
                <div className="mb-2">
                  <span className="text-brand-mutedsilver">{lines[currentLineIndex].prompt}</span>
                  <span className={lines[currentLineIndex].color}>
                    {lines[currentLineIndex].text.substring(0, currentCharIndex)}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block ml-1"
                  >
                    │
                  </motion.span>
                </div>
              )}
              {currentLineIndex >= lines.length && (
                <div className="mb-2">
                  <span className="text-brand-mutedsilver">{"> "}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block ml-1"
                  >
                    │
                  </motion.span>
                </div>
              )}
            </div>
          </div>
        </MouseParallax>
      </div>
    </section>
  );
}
