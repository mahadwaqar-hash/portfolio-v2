import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import ScrambleText from './ScrambleText';
import MouseParallax from './MouseParallax';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const HeroSection: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 30 });

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
    <div className="relative w-full min-h-screen flex flex-col justify-center items-start overflow-hidden px-4 md:px-16 lg:px-32">
      {/* Ambient Background */}
      <motion.div 
        className="absolute w-[800px] h-[800px] bg-brand-amethyst rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ 
          x: springX, 
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />

      <MouseParallax intensity={15} className="relative z-10 w-full">
        <div className="flex flex-col justify-center items-start w-full">
          <motion.p 
            className="font-tech text-brand-mutedsilver tracking-[0.4em] text-xs md:text-sm uppercase mb-4 md:mb-6 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)]"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 2.2, duration: 1, ease: customEase }}
            style={{ transform: "translateZ(50px)" }}
          >
            Frontend Architect & Designer
          </motion.p>

          <h1 className="flex flex-col w-full" data-cursor="text" style={{ transformStyle: "preserve-3d" }}>
            <span className="sr-only">Muhammad Mahad Waqar Piracha. Frontend Architect & Designer.</span>
            
            <div className="flex flex-wrap overflow-visible" aria-hidden="true" style={{ transform: "translateZ(80px)" }}>
              {line1.split('').map((char, index) => (
                <span key={`l1-${index}`} className="inline-block overflow-visible">
                  <motion.span
                    className="inline-block font-tech font-bold text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] text-white uppercase tracking-tighter whitespace-pre"
                    initial={{ y: '100%', opacity: 0, rotateZ: 10 }}
                    animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                    transition={{ delay: 2.4 + index * 0.03, duration: 0.8, ease: customEase }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </div>

            <div className="flex flex-wrap overflow-visible mt-2 md:mt-4" aria-hidden="true" style={{ transform: "translateZ(120px)" }}>
              {line2.split('').map((char, index) => (
                <span key={`l2-${index}`} className="inline-block overflow-visible">
                  <motion.span
                    className="inline-block font-cinematic italic text-5xl sm:text-6xl md:text-9xl lg:text-[8rem] xl:text-[9.5rem] text-brand-neon whitespace-pre drop-shadow-[0_0_20px_rgba(192,132,252,0.5)] leading-none"
                    initial={{ y: '100%', opacity: 0, rotateZ: -10 }}
                    animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                    transition={{ delay: 2.8 + index * 0.03, duration: 0.8, ease: customEase }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </div>
          </h1>

          <motion.div style={{ transform: "translateZ(60px)" }} className="mt-8 md:mt-12">
            <ScrambleText 
              text="Premium Web Architecture for Ambitious Brands" 
              className="text-base sm:text-lg md:text-2xl drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]" 
            />
          </motion.div>
        </div>
      </MouseParallax>

      {/* Scroll affordance */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center w-full">
        <motion.div 
          className="w-[1px] h-16 md:h-20 bg-gradient-to-b from-brand-neon to-transparent origin-top"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0], y: [0, 20] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
