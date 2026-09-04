import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ScrambleText from './ScrambleText';
import MouseParallax from './MouseParallax';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HeroSection: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 25, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 35 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const line1 = 'Muhammad Mahad';
  const line2 = 'Waqar Piracha';

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-start overflow-hidden px-5 sm:px-10 md:px-16 lg:px-28 py-24">
      {/* Dynamic Multi-Layer Ambient Luminescence (Mouse-Responsive) */}
      <motion.div 
        className="absolute w-[350px] h-[350px] md:w-[750px] md:h-[750px] rounded-full bg-gradient-to-tr from-brand-amethyst/30 via-brand-neon/20 to-cyan-500/10 blur-[90px] md:blur-[160px] pointer-events-none transform-gpu -z-10"
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />

      <MouseParallax intensity={10} className="relative z-10 w-full">
        <div className="flex flex-col justify-center items-start w-full max-w-6xl">
          
          {/* Status Eyebrow Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 2.0, duration: 0.9, ease: luxuryEase }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full cyber-glass border border-brand-amethyst/40 mb-6 md:mb-8 shadow-[0_0_20px_rgba(192,132,252,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-tech text-[10px] md:text-xs tracking-[0.3em] uppercase text-brand-mercury">
              Available for Commissions // Lahore • Global
            </span>
          </motion.div>

          {/* Majestic Unified Name Title */}
          <h1 className="flex flex-col w-full text-left select-none" style={{ transformStyle: "preserve-3d" }}>
            <span className="sr-only">Muhammad Mahad Waqar Piracha. Frontend Architect & Designer.</span>
            
            {/* Line 1: Muhammad Mahad */}
            <div className="overflow-hidden py-1 w-full flex flex-wrap" aria-hidden="true" style={{ transform: "translateZ(50px)" }}>
              {line1.split('').map((char, index) => (
                <span key={`l1-${index}`} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block font-cinematic italic text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC] drop-shadow-[0_0_30px_rgba(192,132,252,0.4)] leading-[1.0] tracking-tight cursor-default"
                    initial={{ y: '120%', opacity: 0, filter: 'blur(14px)', rotateX: 30 }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.06, 
                      filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.9))',
                      transition: { duration: 0.2 }
                    }}
                    transition={{ delay: 2.2 + index * 0.03, duration: 1.0, ease: luxuryEase }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Line 2: Waqar Piracha */}
            <div className="overflow-hidden py-1 w-full flex flex-wrap -mt-2 sm:-mt-4 md:-mt-6" aria-hidden="true" style={{ transform: "translateZ(70px)" }}>
              {line2.split('').map((char, index) => (
                <span key={`l2-${index}`} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block font-cinematic italic text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#D8B4FE] to-[#C084FC] drop-shadow-[0_0_30px_rgba(192,132,252,0.4)] leading-[1.0] tracking-tight cursor-default"
                    initial={{ y: '120%', opacity: 0, filter: 'blur(14px)', rotateX: 30 }}
                    animate={{ y: '0%', opacity: 1, filter: 'blur(0px)', rotateX: 0 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.06, 
                      filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.9))',
                      transition: { duration: 0.2 }
                    }}
                    transition={{ delay: 2.6 + index * 0.03, duration: 1.0, ease: luxuryEase }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                </span>
              ))}
            </div>
          </h1>

          {/* Refined Decoder Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.9, ease: luxuryEase }}
            style={{ transform: "translateZ(40px)" }} 
            className="mt-6 md:mt-10 w-full max-w-2xl"
          >
            <ScrambleText 
              text="Architecting high-velocity digital flagships, fluid systems & unfair market advantages." 
              className="text-base sm:text-xl md:text-2xl text-brand-mutedsilver leading-relaxed" 
            />
          </motion.div>

          {/* High-End Atelier Metadata Triad */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.9, ease: luxuryEase }}
            className="mt-10 pt-8 border-t border-white/10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
            style={{ transform: "translateZ(30px)" }}
          >
            <div>
              <p className="font-tech text-[10px] text-brand-neon uppercase tracking-widest">01 // Craft</p>
              <p className="font-body text-xs sm:text-sm text-brand-mercury mt-1 font-medium">Frontend Architecture & UI Engineering</p>
            </div>
            <div>
              <p className="font-tech text-[10px] text-brand-neon uppercase tracking-widest">02 // Stack</p>
              <p className="font-body text-xs sm:text-sm text-brand-mercury mt-1 font-medium">React • TypeScript • Framer Motion • Vite</p>
            </div>
            <div>
              <p className="font-tech text-[10px] text-brand-neon uppercase tracking-widest">03 // Location</p>
              <p className="font-body text-xs sm:text-sm text-brand-mercury mt-1 font-medium">Lahore, PK (31.5204° N, 74.3587° E)</p>
            </div>
          </motion.div>

          {/* Quick Interaction Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.9, ease: luxuryEase }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <a
              href="#showroom"
              className="px-6 py-3 rounded-full bg-brand-neon text-brand-abyss font-tech text-xs tracking-wider uppercase font-bold hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(192,132,252,0.3)] flex items-center gap-2"
            >
              <span>Explore Showroom</span>
              <span>↓</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full cyber-glass border border-brand-amethyst/40 hover:border-brand-neon text-brand-mercury hover:text-white font-tech text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Initiate Contact</span>
              <span>↗</span>
            </a>
          </motion.div>
        </div>
      </MouseParallax>

      {/* Elegant Minimalist Scroll Affordance */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-tech text-[9px] uppercase tracking-[0.4em] text-brand-mutedsilver/60">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-neon/80 to-transparent animate-pulse" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
