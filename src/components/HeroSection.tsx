import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import MouseParallax from './MouseParallax';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 20, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 50); // Max 50px offset
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-24 py-12 md:py-24">
      {/* Dynamic Ambient Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-brand-amethyst/20 blur-[120px] pointer-events-none -z-10"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Top Header / Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1, ease: luxuryEase }}
        className="w-full flex justify-between items-start pt-12 md:pt-0"
      >
        <div className="flex flex-col gap-1">
          <span className="font-tech text-xs tracking-[0.3em] text-brand-mutedsilver uppercase">
            Based in Lahore, PK
          </span>
          <span className="font-tech text-xs tracking-widest text-brand-neon uppercase">
            Global Reach
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-tech text-[10px] tracking-widest text-brand-mercury uppercase">
            Accepting New Clients
          </span>
        </div>
      </motion.div>

      {/* Massive Editorial Centerpiece */}
      <MouseParallax intensity={15} className="flex-1 flex flex-col justify-center items-center text-center w-full relative z-10">
        <h1 className="flex flex-col items-center justify-center w-full select-none cursor-default">
          {/* Line 1 */}
          <div className="overflow-hidden pb-2 md:pb-4">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 2.4, duration: 1.2, ease: luxuryEase }}
              className="block font-tech text-3xl sm:text-5xl md:text-7xl lg:text-[6rem] text-white tracking-tighter uppercase font-bold leading-none"
            >
              MUHAMMAD MAHAD
            </motion.span>
          </div>
          
          {/* Line 2 - Cinematic Italic Intersect */}
          <div className="overflow-hidden pb-4 md:pb-8 -mt-2 md:-mt-6">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 2.5, duration: 1.2, ease: luxuryEase }}
              className="block font-cinematic italic text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-[#D8B4FE] to-white leading-none drop-shadow-[0_0_40px_rgba(192,132,252,0.3)] pr-4"
            >
              Waqar Piracha
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 2.8, duration: 1, ease: luxuryEase }}
          className="mt-6 md:mt-10 font-body text-sm sm:text-base md:text-xl text-brand-mutedsilver max-w-2xl font-light tracking-wide"
        >
          I engineer unfair digital advantages for high-ticket brands. Cinematic web architecture, Awwwards-level interactions, and local SEO domination.
        </motion.p>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8, ease: luxuryEase }}
          className="mt-12"
        >
          <a
            href="#showroom"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full bg-brand-neon text-brand-abyss font-tech text-xs md:text-sm tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Explore Showroom <span className="text-lg leading-none">↓</span>
            </span>
          </a>
        </motion.div>
      </MouseParallax>

      {/* Bottom Footer Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="w-full flex justify-between items-end pb-8 md:pb-0"
      >
        <div className="font-tech text-[10px] tracking-widest text-brand-mutedsilver/60 uppercase">
          <p>Portfolio Version</p>
          <p className="text-brand-mercury">V2.0 — 2026</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-tech text-[9px] uppercase tracking-[0.4em] text-brand-mutedsilver/60">Scroll</span>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-brand-neon to-transparent animate-pulse" />
        </div>

        <div className="font-tech text-[10px] tracking-widest text-brand-mutedsilver/60 uppercase text-right">
          <p>Core Stack</p>
          <p className="text-brand-mercury">React • Framer</p>
        </div>
      </motion.div>
    </div>
  );
}
