import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EXPO = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // Trigger the entrance animations on mount
    const timer = setTimeout(() => setIsEntering(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black isolation-isolate">
      
      {/* 1. MEDIA LAYER (Shows through the text) */}
      <div className="absolute inset-0 z-0">
        {/* We use a high-end abstract mesh gradient instead of the video */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DEC1FC] via-[#00B67A] to-[#1a0b1f] opacity-80 mix-blend-screen" />
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #DEC1FC 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00B67A 0%, transparent 40%)',
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* 2. KNOCKOUT MASK LAYER (Black background, white text = multiply blend) */}
      <div className="absolute inset-0 z-10 bg-black text-white flex flex-col justify-center items-center mix-blend-multiply pointer-events-none">
        
        {/* The SOSCALE style wordmark but for MAHAD WAQAR */}
        <div className="w-full flex flex-col items-center justify-center leading-[0.85] tracking-tighter font-tech font-black">
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: isEntering ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: EXPO, delay: 0.1 }}
              className="text-[18vw] uppercase"
            >
              MAHAD
            </motion.div>
          </div>
          <div className="relative overflow-hidden -mt-[2vw]">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: isEntering ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: EXPO, delay: 0.2 }}
              className="text-[18vw] uppercase"
            >
              WAQAR
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. UI LAYER (Nav, Copy, CTAs) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        
        {/* Top Header Row (Nav Columns + Tagline + CTA) */}
        <div className="flex flex-wrap md:flex-nowrap justify-between items-start w-full">
          
          {/* Nav Columns */}
          <div className="flex gap-12 font-tech font-light text-[#c2c2c2] text-xs uppercase tracking-widest pointer-events-auto">
            <motion.ul 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 10 : 0 }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.5 }}
              className="flex flex-col gap-2"
            >
              <li><a href="#showroom" className="hover:opacity-60 transition-opacity">Showroom</a></li>
              <li><a href="#services" className="hover:opacity-60 transition-opacity">Capabilities</a></li>
            </motion.ul>
            <motion.ul 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 10 : 0 }}
              transition={{ duration: 0.8, ease: EXPO, delay: 0.56 }}
              className="hidden md:flex flex-col gap-2"
            >
              <li><a href="#process" className="hover:opacity-60 transition-opacity">Process</a></li>
              <li><a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a></li>
            </motion.ul>
          </div>

          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 10 : 0 }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.7 }}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 font-tech font-light text-[#c2c2c2] text-xs uppercase tracking-[0.2em]"
          >
            BECAUSE ARCHITECTURE MATTERS
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: isEntering ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)' }}
            transition={{ duration: 0.75, ease: EXPO, delay: 1.1 }}
            className="pointer-events-auto"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 bg-[#DEC1FC] text-[#1a0b1f] px-6 py-2.5 rounded-full font-tech text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all"
            >
              <svg viewBox="0 0 9 9" className="w-3 h-3" aria-hidden="true"><path d="M1.6 .4V6H6.2" fill="none" stroke="currentColor" strokeWidth="1.35"/><path d="M5.6 3.6 8.6 6 5.6 8.4Z" fill="currentColor"/></svg>
              <span>Book Consultation</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Copy Row */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center w-full gap-6">
          
          {/* Headline */}
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: isEntering ? "100%" : "0%", opacity: isEntering ? 0 : 1 }}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.85 }}
              className="font-tech font-medium text-white text-lg md:text-3xl uppercase tracking-widest leading-tight max-w-xl"
            >
              YOUR BRAND DESERVES BETTER WEB ARCHITECTURE
            </motion.p>
          </div>

          {/* Metrics/Trust Area */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 15 : 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: 1.2 }}
            className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-auto"
          >
            <div className="flex items-center gap-1">
              {/* Star SVG inspired by Trustpilot green star styling */}
              <svg viewBox="0 0 160 19" className="w-24 h-4" aria-hidden="true">
                <path fill="#00B67A" d="M8 0.9L9.796 6.428L15.608 6.428L10.906 9.844L12.702 15.372L8 11.956L3.298 15.372L5.094 9.844L0.392 6.428L6.204 6.428Z"/>
                <rect x="75" y="1.7" width="15.6" height="15.4" fill="#00B67A"/><rect x="92" y="1.7" width="15.6" height="15.4" fill="#00B67A"/><rect x="109" y="1.7" width="15.6" height="15.4" fill="#00B67A"/><rect x="126" y="1.7" width="15.6" height="15.4" fill="#00B67A"/><rect x="143" y="1.7" width="15.6" height="15.4" fill="#00B67A"/>
                <path fill="#000" d="M82.8 5.1L83.855 8.347L87.27 8.348L84.508 10.355L85.563 13.602L82.8 11.595L80.037 13.602L81.092 10.355L78.33 8.348L81.745 8.347ZM99.8 5.1L100.855 8.347L104.27 8.348L101.508 10.355L102.563 13.602L99.8 11.595L97.037 13.602L98.092 10.355L95.33 8.348L98.745 8.347ZM116.8 5.1L117.855 8.347L121.27 8.348L118.508 10.355L119.563 13.602L116.8 11.595L114.037 13.602L115.092 10.355L112.33 8.348L115.745 8.347ZM133.8 5.1L134.855 8.347L138.27 8.348L135.508 10.355L136.563 13.602L133.8 11.595L131.037 13.602L132.092 10.355L129.33 8.348L132.745 8.347ZM150.8 5.1L151.855 8.347L155.27 8.348L152.508 10.355L153.563 13.602L150.8 11.595L148.037 13.602L149.092 10.355L146.33 8.348L149.745 8.347Z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-tech text-white text-xs font-bold tracking-wider">Awwwards</span>
              <span className="font-mono text-[#c2c2c2] text-[9px] uppercase">14 Deployments • Excellence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
