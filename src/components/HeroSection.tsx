import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

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

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(true);

  // Check for fine pointer (desktop mouse) vs touch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(pointer: fine)');
      setIsFinePointer(media.matches);
      const listener = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Framer Motion spring physics for 3D Monolith Tilt (zero re-render)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 25, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Scroll indicator fadeout when scrollY > 80
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  const glareRafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xPct = (clientX - rect.left) / rect.width - 0.5;
      const yPct = (clientY - rect.top) / rect.height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    }

    if (cardRef.current && !glareRafRef.current) {
      glareRafRef.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          const cardRect = cardRef.current.getBoundingClientRect();
          cardRef.current.style.setProperty('--mouse-x', `${clientX - cardRect.left}px`);
          cardRef.current.style.setProperty('--mouse-y', `${clientY - cardRect.top}px`);
        }
        glareRafRef.current = null;
      });
    }
  };

  const handleMouseLeave = () => {
    if (glareRafRef.current) {
      cancelAnimationFrame(glareRafRef.current);
      glareRafRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-[#070709] flex flex-col justify-between pt-24 pb-12 px-6 md:px-12 lg:px-24"
    >
      {/* Skip to Main Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#showroom"
        className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#DEC1FC] focus:text-black focus:font-mono focus:text-xs focus:rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Skip to main content
      </a>
      
      {/* Optimized static ambient gradients (GPU layer promoted) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transform-gpu" 
        style={{ transform: 'translate3d(0, 0, 0)', backfaceVisibility: 'hidden' }}
        aria-hidden="true"
      >
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

        {/* 3D TILT MONOLITH — Oversized Visual Brand Identity */}
        <div style={{ perspective: 1000 }} className="relative select-none z-10 mb-8">
          <motion.div
            ref={cardRef}
            role="heading"
            aria-level={2}
            aria-label="Mahad Waqar"
            style={{
              rotateX: isFinePointer ? rotateX : 0,
              rotateY: isFinePointer ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            className="group apple-glass-card rounded-3xl px-6 py-6 sm:px-10 sm:py-8 md:px-16 md:py-10 relative transform-gpu cursor-default will-change-transform shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden"
          >
            {/* Cursor-Tracking Specular Radial Glare Overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.14), rgba(139, 92, 246, 0.10), transparent 45%)',
              }}
              aria-hidden="true"
            />

            {/* Glowing Border Beam Tracing the Perimeter */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none rounded-3xl overflow-visible"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="1"
                width="calc(100% - 2px)"
                height="calc(100% - 2px)"
                rx="24"
                fill="none"
                stroke="url(#hero-beam-grad)"
                strokeWidth="1.5"
                strokeDasharray="180 520"
                className="animate-border-beam"
              />
              <defs>
                <linearGradient id="hero-beam-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00B67A" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#DEC1FC" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#00B67A" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>

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
          </motion.div>
        </div>

        {/* Primary Page H1 — Sole H1 Tag with Core SEO Keywords & Zero LCP Delay (Immediately 100% visible) */}
        <h1
          className="font-body text-[15px] sm:text-base md:text-[17px] text-[#b8b8b8] max-w-2xl text-center font-normal leading-relaxed px-4 [text-wrap:balance]"
        >
          <span className="text-white font-medium">
            Custom Web Architecture, Local SEO &amp; Conversion Design for High-Ticket Brands.
          </span>{' '}
          <span className="block mt-1 text-zinc-300 text-sm sm:text-[15px] font-normal">
            I build the kind of websites that make your competitors quietly wonder who built yours.
          </span>
        </h1>
      </div>

      {/* Bottom Indicator — Traveling Light Pulse Loop fading out on scroll */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-2 mt-4 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1.5px] h-10 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut',
            }}
            className="w-full h-full bg-gradient-to-b from-transparent via-[#00B67A] to-transparent shadow-[0_0_8px_#00B67A]"
          />
        </div>
      </motion.div>
    </div>
  );
}
