import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Optimized lightweight scramble text effect using single requestAnimationFrame ticker
function useTextScramble(finalText: string, delay: number = 0) {
  const chars = '!<>-_/[]{}—=+*^?#_MHWAQR';
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    let timeoutId: number;
    let frameId: number;
    let iteration = 0;
    let lastTime = 0;

    timeoutId = window.setTimeout(() => {
      function tick(time: number) {
        if (!lastTime || time - lastTime > 45) {
          lastTime = time;
          setDisplay(
            finalText
              .split('')
              .map((char, idx) => {
                if (idx < iteration) return char;
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );
          iteration += 0.6;
        }

        if (iteration < finalText.length) {
          frameId = requestAnimationFrame(tick);
        } else {
          setDisplay(finalText);
        }
      }
      frameId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [finalText, delay]);

  return display;
}

export default function HeroSection() {
  const nameTop = useTextScramble('MAHAD', 250);
  const nameBot = useTextScramble('WAQAR', 500);

  // Throttled 60fps CSS transform using requestAnimationFrame
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) {
        rafRef.current = null;
        return;
      }
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((clientY - rect.top) / rect.height - 0.5) * -8;
      cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden bg-[#070709] flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-24">
      {/* Skip to Main Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#showroom"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#DEC1FC] focus:text-black focus:font-mono focus:text-xs focus:rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip to main content
      </a>
      
      {/* Optimized static ambient gradients (no layout recalculations) */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu" aria-hidden="true">
        <div className="absolute top-[18%] left-[20%] w-[40vw] h-[35vh] bg-[#DEC1FC]/15 blur-[120px] rounded-full" />
        <div className="absolute bottom-[12%] right-[15%] w-[30vw] h-[25vh] bg-[#00B67A]/10 blur-[100px] rounded-full" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center my-auto">
        
        {/* Intro Sub-line with high-contrast text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1, ease: EXPO, delay: 0.2 }}
            className="w-10 h-[1px] bg-[#DEC1FC] origin-left" 
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-zinc-300 font-semibold select-none">
            Muhammad Mahad Waqar Piracha
          </span>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1, ease: EXPO, delay: 0.3 }}
            className="w-10 h-[1px] bg-[#00B67A] origin-right" 
            aria-hidden="true"
          />
        </motion.div>

        {/* SCRAMBLE TEXT WORDMARK — Oversized Visual Brand Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
          className="relative select-none z-10 mb-8"
        >
          <div
            ref={cardRef}
            role="heading"
            aria-level={2}
            aria-label="Mahad Waqar"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.15s ease-out' }}
            className="apple-glass-card rounded-3xl px-6 py-6 sm:px-10 sm:py-8 md:px-16 md:py-10 relative transform-gpu cursor-default will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Subtle sheen highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none rounded-3xl" aria-hidden="true" />
            
            <div className="flex flex-col items-center leading-[0.85] tracking-tighter font-tech font-black" aria-hidden="true">
              <div className="overflow-hidden pb-4 -mb-4">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.35 }}
                  className="text-[16vw] sm:text-[13vw] md:text-[10vw] uppercase text-white text-center drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
                >
                  {nameTop || '\u00A0'}
                </motion.div>
              </div>
              <div className="overflow-hidden pb-8 -mb-8">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, ease: EXPO, delay: 0.5 }}
                  className="text-[16vw] sm:text-[13vw] md:text-[10vw] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A] text-center drop-shadow-[0_4px_30px_rgba(222,193,252,0.25)]"
                >
                  {nameBot || '\u00A0'}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Page H1 — Sole H1 Tag with Core SEO Keywords & Clean Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO, delay: 0.55 }}
          className="font-body text-[15px] sm:text-base md:text-[17px] text-[#b8b8b8] max-w-2xl text-center font-normal leading-relaxed px-4 [text-wrap:balance]"
        >
          <span className="text-white font-medium">
            Custom Web Architecture, Local SEO & Conversion Design for High-Ticket Brands.
          </span>{' '}
          <span className="block mt-1 text-zinc-300 text-sm sm:text-[15px] font-normal">
            I build the kind of websites that make your competitors quietly wonder who built yours.
          </span>
        </motion.h1>
      </div>

      {/* Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-2 mt-4"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
      </motion.div>
    </div>
  );
}
