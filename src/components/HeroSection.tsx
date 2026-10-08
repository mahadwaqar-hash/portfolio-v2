import React from 'react';
import { motion } from 'framer-motion';

const EXPO = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#070709] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-24">
      
      {/* 1. AMBIENT MESH GLOW (Flows seamlessly through the background & letters) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-gradient-to-r from-[#DEC1FC]/25 via-[#00B67A]/20 to-[#6D28D9]/25 blur-[140px] rounded-full" />
        <div className="absolute -bottom-10 right-10 w-[40vw] h-[30vh] bg-[#DEC1FC]/10 blur-[100px] rounded-full" />
      </div>

      {/* 2. KNOCKOUT TITLE / WORDMARK AREA */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center my-auto">
        
        {/* Editorial Sub-eyebrow Badge with Apple Glass */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="apple-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2.5 shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
          <span className="font-tech text-[10px] md:text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
            Muhammad Mahad Waqar Piracha • Atelier
          </span>
        </motion.div>

        {/* Massive Knockout Typography */}
        <div className="w-full flex flex-col items-center justify-center leading-[0.82] tracking-tighter font-tech font-black select-none">
          <div className="overflow-hidden pb-1">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EXPO, delay: 0.15 }}
              className="text-[17vw] sm:text-[15vw] md:text-[13vw] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_10px_35px_rgba(255,255,255,0.12)] text-center"
            >
              MAHAD
            </motion.h1>
          </div>
          
          <div className="overflow-hidden -mt-[2.5vw] pb-3">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease: EXPO, delay: 0.28 }}
              className="block text-[17vw] sm:text-[15vw] md:text-[13vw] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A] drop-shadow-[0_10px_45px_rgba(222,193,252,0.25)] text-center"
            >
              WAQAR
            </motion.span>
          </div>
        </div>

        {/* Narrative Description & Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: 0.45 }}
          className="mt-6 md:mt-8 font-body text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl text-center font-light leading-relaxed px-4"
        >
          Engineering high-ticket digital flagships that command market authority.
          Fusing Awwwards-caliber interaction design, sub-second latency, and ruthless search dominance.
        </motion.p>
      </div>

      {/* 3. BOTTOM INTRO BAR (Apple Liquid Glass Dock) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EXPO, delay: 0.6 }}
        className="relative z-10 w-full max-w-5xl mx-auto apple-glass-card rounded-2xl md:rounded-full p-4 md:px-8 md:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 mt-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#DEC1FC] animate-ping" />
          <span className="font-tech text-xs tracking-wider uppercase text-zinc-300 font-medium">
            Live Deployments Below
          </span>
        </div>

        <p className="font-mono text-xs text-zinc-400 text-center">
          Tap any showroom project below to launch the live site
        </p>

        <a
          href="#showroom"
          className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-white hover:text-[#DEC1FC] transition-colors"
        >
          <span>Explore Showroom</span>
          <span className="text-base animate-bounce">↓</span>
        </a>
      </motion.div>

    </div>
  );
}
