import React from 'react';
import { motion } from 'framer-motion';
import MouseParallax from './MouseParallax';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden px-6 md:px-12 lg:px-24 py-12 md:py-24">
      {/* Light Mode Subtly Frosted Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-ms-alabaster via-white to-brand-ms-linen -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-brand-ms-bronze/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#1C1C1C]/3 blur-[100px] pointer-events-none -z-10" />

      {/* Top Header / Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1, ease: luxuryEase }}
        className="w-full flex justify-between items-start pt-12 md:pt-0"
      >
        <div className="flex flex-col gap-1">
          <span className="font-tech text-xs tracking-[0.3em] text-brand-ms-graphite/50 uppercase">
            Lahore, PK
          </span>
          <span className="font-tech text-xs tracking-widest text-brand-ms-graphite uppercase">
            Global Reach
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/5 bg-white/40 backdrop-blur-xl shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="font-tech text-[10px] tracking-widest text-brand-ms-graphite uppercase font-medium">
            Accepting New Clients
          </span>
        </div>
      </motion.div>

      {/* Massive Editorial Centerpiece */}
      <MouseParallax intensity={10} className="flex-1 flex flex-col justify-center items-center text-center w-full relative z-10">
        <h1 className="flex flex-col items-center justify-center w-full select-none cursor-default">
          <div className="overflow-hidden pb-2 md:pb-4">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.4, duration: 1.2, ease: luxuryEase }}
              className="block font-tech text-sm md:text-lg text-brand-ms-graphite/60 tracking-[0.4em] uppercase font-medium mb-4"
            >
              Muhammad Mahad
            </motion.span>
          </div>
          
          <div className="overflow-hidden pb-4 md:pb-8">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 1.5, duration: 1.2, ease: luxuryEase }}
              className="block font-cinematic italic text-6xl sm:text-8xl md:text-[10rem] lg:text-[11rem] text-brand-ms-graphite leading-none tracking-tight pr-4"
            >
              Digital Atelier
            </motion.span>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.8, duration: 1, ease: luxuryEase }}
          className="mt-4 md:mt-8 font-body text-sm sm:text-base md:text-lg text-brand-ms-graphite/70 max-w-2xl font-light tracking-wide leading-relaxed"
        >
          High-ticket web architecture & conversion engineering. Meticulously crafting fluid, editorial showrooms for brands demanding absolute market distinction.
        </motion.p>

        {/* Call to action - Bubbly Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8, ease: luxuryEase }}
          className="mt-12"
        >
          <a
            href="#showroom"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-black/5 bg-white/60 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-brand-ms-graphite font-tech text-xs md:text-sm tracking-widest uppercase font-semibold transition-all duration-500 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Showroom <span className="text-lg leading-none transition-transform group-hover:translate-y-1">↓</span>
            </span>
          </a>
        </motion.div>
      </MouseParallax>

      {/* Bottom Footer Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="w-full flex justify-between items-end pb-8 md:pb-0"
      >
        <div className="font-tech text-[10px] tracking-widest text-brand-ms-graphite/40 uppercase">
          <p>Portfolio Version</p>
          <p className="text-brand-ms-graphite/80 font-medium">V2.0 — 2026</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-tech text-[9px] uppercase tracking-[0.4em] text-brand-ms-graphite/40">Scroll</span>
          <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-brand-ms-graphite/30 to-transparent animate-pulse" />
        </div>

        <div className="font-tech text-[10px] tracking-widest text-brand-ms-graphite/40 uppercase text-right">
          <p>Core Stack</p>
          <p className="text-brand-ms-graphite/80 font-medium">React • Lenis</p>
        </div>
      </motion.div>
    </div>
  );
}
