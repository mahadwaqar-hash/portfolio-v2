import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="h-screen relative flex items-center justify-center overflow-hidden bg-brand-ms-obsidian">
      {/* Background with Parallax & Scale */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        style={{ scale, y, transformStyle: "preserve-3d" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-brand-ms-obsidian/30" />
      </motion.div>

      {/* Floating Header */}
      <header className="fixed w-full top-0 px-4 md:px-8 py-6 md:py-8 z-50 flex justify-between items-center mix-blend-difference">
        <h1 className="font-ms-heading text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase text-brand-ms-alabaster">MAISON & STONE</h1>
        <button 
          onClick={() => {
            window.location.href = '/';
          }}
          className="font-ms-body text-[10px] md:text-xs tracking-widest text-brand-ms-alabaster uppercase hover:text-brand-ms-bronze transition-colors flex items-center gap-2"
        >
          <span>&#x2190;</span>
          <span>PORTFOLIO</span>
        </button>
      </header>

      {/* Center Typography */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="overflow-hidden mb-[-0.5rem] md:mb-[-1rem] z-10">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-ms-heading italic text-4xl sm:text-5xl md:text-7xl text-brand-ms-bronze"
          >
            Curators of
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-ms-heading uppercase text-5xl sm:text-7xl md:text-[9rem] text-brand-ms-alabaster tracking-tighter"
          >
            TIMELESS SPACES.
          </motion.h1>
        </div>
      </div>

      {/* Scroll Affordance */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="font-ms-body text-[10px] tracking-[0.3em] uppercase text-brand-ms-linen">Scroll</span>
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
          className="w-[1px] h-16 bg-brand-ms-bronze origin-top"
        />
      </div>
    </section>
  );
}
