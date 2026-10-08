import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Scramble text effect — each letter randomizes then settles
function useTextScramble(finalText: string, delay: number = 0) {
  const chars = '!<>-_\\/[]{}—=+*^?#_MHWAQR';
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
    }, 35);
    return () => clearInterval(interval);
  }, [started, finalText]);

  return display;
}

export default function HeroSection() {
  const nameTop = useTextScramble('MAHAD', 400);
  const nameBot = useTextScramble('WAQAR', 700);

  // Subtle mouse tilt for the glass card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 8);
    rotateY.set(x * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#070709] flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 lg:px-24">
      
      {/* Ambient blobs — positioned asymmetrically so it doesn't look templated */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-[45vw] h-[40vh] bg-[#DEC1FC]/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-[10%] right-[15%] w-[35vw] h-[30vh] bg-[#00B67A]/12 blur-[120px] rounded-full" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center items-center my-auto">
        
        {/* Small Intro Line — no glass pill, just a clean animated line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1.2, ease: EXPO, delay: 0.2 }}
            className="w-8 h-[1px] bg-[#DEC1FC] origin-left" 
          />
          <span className="font-mono text-[11px] tracking-widest uppercase text-zinc-500">
            Muhammad Mahad Waqar Piracha
          </span>
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 1.2, ease: EXPO, delay: 0.3 }}
            className="w-8 h-[1px] bg-[#00B67A] origin-right" 
          />
        </motion.div>

        {/* SCRAMBLE TEXT WORDMARK — Interactive liquid glass name plate */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, perspective: 1200 }}
          className="apple-glass-card rounded-3xl px-8 py-10 md:px-16 md:py-14 mb-10 relative overflow-hidden select-none"
        >
          {/* Inner specular highlight that shifts on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none rounded-3xl" />
          
          <div className="flex flex-col items-center leading-[0.82] tracking-tighter font-tech font-black">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease: EXPO, delay: 0.4 }}
                className="text-[18vw] sm:text-[14vw] md:text-[11vw] uppercase text-white text-center"
              >
                {nameTop || '\u00A0'}
              </motion.div>
            </div>
            <div className="overflow-hidden -mt-[2vw]">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.0, ease: EXPO, delay: 0.55 }}
                className="text-[18vw] sm:text-[14vw] md:text-[11vw] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A] text-center"
              >
                {nameBot || '\u00A0'}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tagline — conversational, not corporate */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EXPO, delay: 0.7 }}
          className="font-body text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl text-center font-light leading-relaxed"
        >
          I build the kind of websites that make your competitors 
          quietly wonder who built yours.
        </motion.p>
      </div>

      {/* Bottom — just a simple scroll cue, no heavy dock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-zinc-600 to-transparent" />
      </motion.div>
    </div>
  );
}
