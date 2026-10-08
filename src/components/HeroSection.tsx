import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Lightweight scramble text effect without heavy interval re-renders
function useTextScramble(finalText: string, delay: number = 0) {
  const chars = '!<>-_/[]{}—=+*^?#_MHWAQR';
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) { setDisplay(''); return; }
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        finalText
          .split('')
          .map((char, idx) => {
            if (idx < iteration) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= finalText.length) {
        setDisplay(finalText);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, finalText]);

  return display;
}

export default function HeroSection() {
  const nameTop = useTextScramble('MAHAD', 300);
  const nameBot = useTextScramble('WAQAR', 600);

  // High performance CSS-variable based tilt (no React state re-renders)
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#070709] flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-24">
      
      {/* Optimized static ambient gradients (no layout recalculations) */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
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
          />
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-zinc-300 font-semibold">
            Muhammad Mahad Waqar Piracha
          </span>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1, ease: EXPO, delay: 0.3 }}
            className="w-10 h-[1px] bg-[#00B67A] origin-right" 
          />
        </motion.div>

        {/* SCRAMBLE TEXT WORDMARK — Ultra-smooth Hardware Accelerated Card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transition: 'transform 0.15s ease-out' }}
          className="apple-glass-card rounded-3xl px-8 py-8 sm:px-14 sm:py-12 md:px-20 md:py-14 mb-8 relative select-none transform-gpu cursor-default will-change-transform"
        >
          {/* Subtle sheen highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none rounded-3xl" />
          
          <div className="flex flex-col items-center leading-tight tracking-tighter font-tech font-black">
            <div className="overflow-hidden pb-[2vw]">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EXPO, delay: 0.25 }}
                className="text-[16vw] sm:text-[13vw] md:text-[10vw] uppercase text-white text-center drop-shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
              >
                {nameTop || '\u00A0'}
              </motion.div>
            </div>
            <div className="overflow-hidden pb-[3vw]">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EXPO, delay: 0.4 }}
                className="text-[16vw] sm:text-[13vw] md:text-[10vw] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A] text-center drop-shadow-[0_4px_30px_rgba(222,193,252,0.25)]"
              >
                {nameBot || '\u00A0'}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tagline with enhanced readability & contrast */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO, delay: 0.55 }}
          className="font-body text-sm sm:text-base md:text-lg text-zinc-200 max-w-xl text-center font-normal leading-relaxed px-4"
        >
          I build the kind of websites that make your competitors 
          quietly wonder who built yours.
        </motion.p>
      </div>

      {/* Bottom Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-2 mt-4"
      >
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
      </motion.div>
    </div>
  );
}
