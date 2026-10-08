import React from 'react';
import { motion } from 'framer-motion';
import MouseParallax from './MouseParallax';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <div className="w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
      
      {/* Super Subtle Bronze Glow */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-brand-ms-bronze/5 blur-[120px] pointer-events-none -z-10" />

      <MouseParallax intensity={10} className="w-full max-w-7xl mx-auto flex flex-col">
        
        {/* Top Alignment Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: luxuryEase }}
          className="w-16 md:w-32 h-[1px] bg-brand-ms-bronze mb-8 md:mb-12 origin-left"
        />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-24">
          
          {/* Main Massive Title */}
          <h1 className="flex flex-col select-none cursor-default z-10 relative">
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.2, duration: 1.2, ease: luxuryEase }}
                className="block font-ms-body text-xs md:text-sm text-brand-ms-alabaster/60 tracking-[0.4em] uppercase font-light mb-4"
              >
                M. Waqar — Portfolio
              </motion.span>
            </div>
            
            <div className="overflow-hidden pb-4 md:pb-6">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.3, duration: 1.2, ease: luxuryEase }}
                className="block font-ms-heading text-6xl sm:text-8xl md:text-[8rem] lg:text-[10rem] text-brand-ms-alabaster leading-[0.9] tracking-tight"
              >
                Digital
              </motion.span>
            </div>

            <div className="overflow-hidden pb-4 md:pb-8">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.4, duration: 1.2, ease: luxuryEase }}
                className="block font-ms-heading italic text-6xl sm:text-8xl md:text-[8rem] lg:text-[10rem] text-brand-ms-bronze leading-[0.9] tracking-tight pr-4"
              >
                Atelier.
              </motion.span>
            </div>
          </h1>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: luxuryEase }}
            className="lg:max-w-sm flex flex-col gap-8 pb-4"
          >
            <p className="font-ms-body text-sm md:text-base text-brand-ms-alabaster/70 font-light leading-relaxed">
              Meticulously crafting fluid, editorial showrooms for high-ticket brands. I engineer conversion systems that demand absolute market distinction.
            </p>

            <a
              href="#showroom"
              data-cursor="hover"
              className="group inline-flex items-center gap-4 text-brand-ms-alabaster transition-colors hover:text-brand-ms-bronze w-fit"
            >
              <span className="font-ms-body text-xs tracking-widest uppercase pb-1 border-b border-brand-ms-bronze/40 group-hover:border-brand-ms-bronze transition-colors">
                Explore Showroom
              </span>
              <span className="text-brand-ms-bronze transform group-hover:translate-x-2 transition-transform duration-500 ease-out">
                ⟶
              </span>
            </a>
          </motion.div>
        </div>
      </MouseParallax>
    </div>
  );
}
