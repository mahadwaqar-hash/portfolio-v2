import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'glitch' | 'resume' | 'exit'>('counting');
  const [glitchText, setGlitchText] = useState('SYSTEM CALIBRATING');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Telemetry log lines
  const getTelemetry = (c: number) => {
    if (c < 20) return '// INITIALIZING DIGITAL ARCHITECTURE [0x7F4]';
    if (c < 45) return '// COMPILING FLUID GEOMETRY & SHADERS';
    if (c < 67) return '// SYNCHRONIZING MEMORY MATRICES...';
    if (c === 67) return '⚠️ QUANTUM ANOMALY DETECTED AT 67%';
    if (c < 85) return '// BYPASSING PROTOCOLS... OVERCLOCKING CORE';
    if (c < 100) return '// FINALIZING HIGH-PERFORMANCE RUNTIME';
    return '// SYSTEM READY • LAUNCHING MAHAD.PORTFOLIO';
  };

  // Phase 1: Dynamic acceleration from 0 → 67
  useEffect(() => {
    if (phase !== 'counting') return;
    
    let current = 0;
    const step = () => {
      // Non-linear acceleration: quick start, slows slightly as it nears 67
      const increment = current < 30 ? 2 : current < 55 ? 3 : 1;
      current += increment;

      if (current >= 67) {
        setCount(67);
        setPhase('glitch');
      } else {
        setCount(current);
        setGlitchText(getTelemetry(current));
        const delay = current < 40 ? 28 : current < 60 ? 35 : 45;
        intervalRef.current = setTimeout(step, delay);
      }
    };

    intervalRef.current = setTimeout(step, 100);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [phase]);

  // Phase 2: Dramatic Glitch Sequence at 67 (1.1 seconds)
  useEffect(() => {
    if (phase !== 'glitch') return;
    setGlitchText('⚠️ QUANTUM ANOMALY AT 67% // OVERCLOCKING');

    const glitchTimer = setTimeout(() => {
      setPhase('resume');
      setCount(68);
    }, 1150);

    return () => clearTimeout(glitchTimer);
  }, [phase]);

  // Phase 3: High-speed surge from 68 → 100
  useEffect(() => {
    if (phase !== 'resume') return;

    let current = 68;
    const surgeStep = () => {
      current += (current < 90 ? 3 : 2);

      if (current >= 100) {
        setCount(100);
        setGlitchText('// INITIALIZATION COMPLETE • 100%');
        setTimeout(() => {
          setPhase('exit');
        }, 300);
      } else {
        setCount(current);
        setGlitchText(getTelemetry(current));
        intervalRef.current = setTimeout(surgeStep, 24);
      }
    };

    intervalRef.current = setTimeout(surgeStep, 40);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [phase]);

  // Phase 4: Smooth Iris Exit
  useEffect(() => {
    if (phase !== 'exit') return;
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 850);
    return () => clearTimeout(exitTimer);
  }, [phase, onComplete]);

  const isGlitching = phase === 'glitch';
  const isPostGlitch = count >= 67;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#010103] flex flex-col justify-between items-center p-6 sm:p-10 md:p-16 overflow-hidden select-none"
      animate={phase === 'exit' ? { opacity: 0, scale: 1.08, filter: 'blur(16px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: luxuryEase }}
    >
      <span className="sr-only">Loading portfolio: {count}%</span>

      {/* Cyber Grid Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Pulsing Nebular Core */}
      <motion.div 
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu transition-colors duration-700 -z-10"
        animate={{
          scale: isGlitching ? [1, 1.3, 0.95, 1.2, 1] : [1, 1.08, 1],
          opacity: isGlitching ? [0.3, 0.6, 0.4, 0.7, 0.4] : 0.25,
        }}
        transition={{
          duration: isGlitching ? 0.3 : 3,
          repeat: isGlitching ? 3 : Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundColor: isPostGlitch ? 'rgba(192, 132, 252, 0.35)' : 'rgba(109, 40, 217, 0.25)'
        }}
      />

      {/* Top Header Telemetry Bar */}
      <div className="w-full flex items-center justify-between text-brand-mutedsilver font-tech text-[10px] sm:text-xs tracking-widest uppercase z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
          <span>SYS.INIT // CORE_V2.026</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-brand-mutedsilver/70">
          <span>LAHORE, PK [31.52° N]</span>
          <span>•</span>
          <span>RUNTIME: READY</span>
        </div>
      </div>

      {/* Center Monumental Counter */}
      <div className="relative flex flex-col items-center justify-center my-auto z-10">
        
        {/* Shockwave ring during glitch at 67 */}
        <AnimatePresence>
          {isGlitching && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full border border-brand-neon/60 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Counter Number Display */}
        <div className="relative flex items-baseline justify-center">
          
          {/* Chromatic Aberration Red Ghost (Glitch Only) */}
          {isGlitching && (
            <motion.span
              animate={{ x: [-6, 6, -3, 5, 0], y: [2, -2, 1, 0] }}
              transition={{ duration: 0.15, repeat: 7 }}
              className="absolute inset-0 text-7xl sm:text-9xl md:text-[13rem] lg:text-[15rem] font-cinematic italic text-red-500/70 select-none pointer-events-none mix-blend-screen leading-none"
            >
              {count}
            </motion.span>
          )}

          {/* Chromatic Aberration Cyan Ghost (Glitch Only) */}
          {isGlitching && (
            <motion.span
              animate={{ x: [6, -6, 4, -4, 0], y: [-2, 2, -1, 0] }}
              transition={{ duration: 0.15, repeat: 7 }}
              className="absolute inset-0 text-7xl sm:text-9xl md:text-[13rem] lg:text-[15rem] font-cinematic italic text-cyan-400/70 select-none pointer-events-none mix-blend-screen leading-none"
            >
              {count}
            </motion.span>
          )}

          {/* Primary Counter Display */}
          <motion.span
            animate={isGlitching ? { x: [-2, 2, -2, 2, 0], scale: [1, 1.03, 0.98, 1.02, 1] } : {}}
            transition={{ duration: 0.2, repeat: isGlitching ? 5 : 0 }}
            className={`text-7xl sm:text-9xl md:text-[13rem] lg:text-[15rem] tracking-tighter leading-none transition-colors duration-500 select-none ${
              isPostGlitch
                ? 'font-cinematic italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC] drop-shadow-[0_0_40px_rgba(192,132,252,0.65)]'
                : 'font-tech font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]'
            }`}
          >
            {count}
          </motion.span>

          <span 
            className={`text-2xl sm:text-4xl md:text-5xl ml-2 sm:ml-4 font-tech tracking-normal select-none transition-colors duration-500 ${
              isPostGlitch ? 'text-brand-neon drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]' : 'text-brand-mutedsilver'
            }`}
          >
            %
          </span>
        </div>

        {/* Dynamic Telemetry Status */}
        <motion.div 
          key={glitchText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <span 
            className={`font-tech text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold transition-colors duration-300 ${
              isGlitching 
                ? 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.8)] animate-pulse' 
                : isPostGlitch 
                ? 'text-brand-neon drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]' 
                : 'text-brand-mutedsilver'
            }`}
          >
            {glitchText}
          </span>
        </motion.div>
      </div>

      {/* Bottom Precision Progress Bar */}
      <div className="w-full max-w-md sm:max-w-xl flex flex-col items-center gap-3 z-10">
        <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className={`h-full transition-all duration-150 rounded-full ${
              isGlitching 
                ? 'bg-gradient-to-r from-red-500 via-brand-neon to-cyan-400' 
                : isPostGlitch 
                ? 'bg-gradient-to-r from-brand-amethyst to-brand-neon shadow-[0_0_15px_rgba(192,132,252,0.8)]' 
                : 'bg-white/70'
            }`}
            style={{ width: `${count}%` }}
          />
        </div>

        <div className="w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-brand-mutedsilver/70 tracking-widest uppercase">
          <span>INDEX // 000</span>
          <span className="font-semibold text-brand-mercury">{count} / 100</span>
          <span>SYS.CALIB // 100</span>
        </div>
      </div>
    </motion.div>
  );
}
