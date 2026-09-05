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
    return '// SYSTEM INITIALIZED • 100% READY';
  };

  // Phase 1: Smooth, satisfying countdown from 0 → 67 (~1.5s)
  useEffect(() => {
    if (phase !== 'counting') return;
    
    let current = 0;
    const step = () => {
      const increment = current < 25 ? 2 : current < 50 ? 3 : 1;
      current += increment;

      if (current >= 67) {
        setCount(67);
        setPhase('glitch');
      } else {
        setCount(current);
        setGlitchText(getTelemetry(current));
        const delay = current < 35 ? 40 : current < 55 ? 48 : 55;
        intervalRef.current = setTimeout(step, delay);
      }
    };

    intervalRef.current = setTimeout(step, 120);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [phase]);

  // Phase 2: Dramatic Glitch Sequence at 67 (1.2 seconds)
  useEffect(() => {
    if (phase !== 'glitch') return;
    setGlitchText('⚠️ QUANTUM ANOMALY AT 67% // OVERCLOCKING');

    const glitchTimer = setTimeout(() => {
      setPhase('resume');
      setCount(68);
    }, 1200);

    return () => clearTimeout(glitchTimer);
  }, [phase]);

  // Phase 3: Smooth, rhythmic count from 68 → 100 (~1.2s)
  useEffect(() => {
    if (phase !== 'resume') return;

    let current = 68;
    const surgeStep = () => {
      current += (current < 90 ? 2 : 1);

      if (current >= 100) {
        setCount(100);
        setGlitchText('// SYSTEM INITIALIZED • 100% READY');
        // Dynamic micro-beat then seamless transition into hero
        setTimeout(() => {
          setPhase('exit');
        }, 200);
      } else {
        setCount(current);
        setGlitchText(getTelemetry(current));
        intervalRef.current = setTimeout(surgeStep, 35);
      }
    };

    intervalRef.current = setTimeout(surgeStep, 45);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [phase]);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Phase 4: Smooth Curtain Lift Reveal (~0.85s)
  useEffect(() => {
    if (phase !== 'exit') return;
    const exitTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 850);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  const isGlitching = phase === 'glitch';
  const isPostGlitch = count >= 67;
  const isExiting = phase === 'exit';

  // Lightweight random 67 ghost clones across screen
  const ghostClones = [
    { text: '67', top: '14%', left: '8%', size: 'text-6xl sm:text-7xl', color: 'text-red-500/80', rot: -12, font: 'font-cinematic italic' },
    { text: '67%', top: '20%', right: '12%', size: 'text-6xl sm:text-8xl', color: 'text-cyan-400/80', rot: 10, font: 'font-tech font-bold' },
    { text: '67', bottom: '22%', left: '10%', size: 'text-5xl sm:text-7xl', color: 'text-brand-neon/80', rot: -8, font: 'font-cinematic italic' },
    { text: '67%', bottom: '16%', right: '12%', size: 'text-6xl sm:text-8xl', color: 'text-red-400/80', rot: 15, font: 'font-tech font-bold' },
    { text: '67', top: '10%', right: '35%', size: 'text-5xl sm:text-6xl', color: 'text-white/80', rot: -5, font: 'font-tech font-bold' },
    { text: '67', bottom: '40%', left: '8%', size: 'text-5xl sm:text-6xl', color: 'text-cyan-300/80', rot: 20, font: 'font-cinematic italic' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#010103] flex flex-col justify-between items-center p-6 sm:p-10 md:p-16 overflow-hidden select-none transform-gpu"
      animate={
        isGlitching
          ? { x: [-8, 10, -6, 8, -4, 0], y: [4, -5, 4, -3, 0] }
          : isExiting
          ? { y: '-100%' }
          : { y: '0%' }
      }
      transition={
        isGlitching
          ? { duration: 0.2, repeat: 5, ease: 'linear' }
          : isExiting
          ? { duration: 0.85, ease: luxuryEase }
          : { duration: 0.6, ease: luxuryEase }
      }
      style={{ willChange: 'transform' }}
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

      {/* FULL-SCREEN GLITCH FLASH & HORIZONTAL TEARS (AT 67) */}
      {isGlitching && (
        <>
          {/* Subtle Strobe Flash */}
          <div className="absolute inset-0 bg-brand-neon/10 pointer-events-none z-30 animate-pulse" />

          {/* Glitch Slices */}
          <motion.div 
            className="absolute left-0 right-0 h-3 bg-red-500/25 pointer-events-none z-30"
            animate={{ top: ['20%', '65%', '35%', '80%', '50%'], x: [-20, 25, -15, 20, 0] }}
            transition={{ duration: 0.15, repeat: 7 }}
          />
          <motion.div 
            className="absolute left-0 right-0 h-2 bg-cyan-400/30 pointer-events-none z-30"
            animate={{ top: ['75%', '30%', '55%', '15%', '65%'], x: [25, -20, 15, -25, 0] }}
            transition={{ duration: 0.12, repeat: 8 }}
          />

          {/* RANDOM 67s FLYING EVERYWHERE ACROSS SCREEN */}
          {ghostClones.map((ghost, idx) => (
            <motion.div
              key={`ghost-${idx}`}
              className={`absolute pointer-events-none z-30 select-none overflow-visible ${ghost.size} ${ghost.color} ${ghost.font} drop-shadow-[0_0_20px_currentColor]`}
              style={{
                top: ghost.top,
                bottom: ghost.bottom,
                left: ghost.left,
                right: ghost.right,
                transform: `rotate(${ghost.rot}deg)`,
              }}
              animate={{
                x: [0, (idx % 2 === 0 ? 12 : -12), 0],
                y: [0, (idx % 2 === 0 ? -10 : 10), 0],
                opacity: [0.4, 1, 0.5, 0.9, 0.4],
              }}
              transition={{
                duration: 0.2,
                repeat: 5,
                ease: 'easeInOut',
              }}
            >
              {ghost.text}
            </motion.div>
          ))}

          {/* Floating System Glitch Error Tags */}
          <div className="absolute top-1/4 left-8 font-mono text-[10px] text-red-400/90 z-30 pointer-events-none animate-pulse">
            ERR_0x67_BUFFER_OVERFLOW
          </div>
          <div className="absolute bottom-1/4 right-8 font-mono text-[10px] text-cyan-400/90 z-30 pointer-events-none animate-pulse">
            MEM_CORRUPT: SECTOR_67
          </div>
        </>
      )}

      {/* Ambient Pulsing Nebular Core */}
      <motion.div 
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[80px] sm:blur-[120px] pointer-events-none transform-gpu -z-10"
        animate={{
          scale: isGlitching ? [1, 1.25, 1] : [1, 1.05, 1],
          opacity: isGlitching ? [0.4, 0.7, 0.4] : 0.25,
        }}
        transition={{
          duration: isGlitching ? 0.3 : 3,
          repeat: isGlitching ? 4 : Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundColor: isPostGlitch ? 'rgba(192, 132, 252, 0.3)' : 'rgba(109, 40, 217, 0.2)'
        }}
      />

      {/* Top Header Telemetry Bar */}
      <div className="w-full flex items-center justify-between text-brand-mutedsilver font-tech text-[10px] sm:text-xs tracking-widest uppercase z-10">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isGlitching ? 'bg-red-500 animate-ping' : 'bg-brand-neon animate-pulse'}`} />
          <span className={isGlitching ? 'text-red-400 font-bold' : ''}>
            {isGlitching ? 'SYS.ALERT // ANOMALY_0x67' : 'SYS.INIT // CORE_V2.026'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-brand-mutedsilver/70">
          <span>LAHORE, PK [31.52° N]</span>
          <span>•</span>
          <span className={isGlitching ? 'text-red-400 font-bold' : ''}>
            {isGlitching ? 'OVERCLOCK ACTIVE' : 'RUNTIME: READY'}
          </span>
        </div>
      </div>

      {/* Center Monumental Counter (Unclipped, Full-Spectrum Italic) */}
      <div className="relative flex flex-col items-center justify-center my-auto z-20 w-full max-w-4xl px-4 overflow-visible">
        
        {/* Shockwave ring during glitch at 67 */}
        <AnimatePresence>
          {isGlitching && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: [0.6, 2.2, 3.2], opacity: [0.9, 0.3, 0] }}
              transition={{ duration: 0.9, repeat: 2, ease: "easeOut" }}
              className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full border border-brand-neon pointer-events-none shadow-[0_0_40px_rgba(192,132,252,0.7)]"
            />
          )}
        </AnimatePresence>

        {/* Counter Number Display: Generous clearance so italic slants are NEVER cut off */}
        <div className="relative flex items-baseline justify-center overflow-visible px-4 py-2 w-full text-center">
          
          {/* Chromatic Aberration Red Ghost (Glitch Only) */}
          {isGlitching && (
            <motion.span
              animate={{ x: [-10, 10, -6, 8, 0], y: [3, -4, 2, 0] }}
              transition={{ duration: 0.12, repeat: 10 }}
              className="absolute inset-0 text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] font-cinematic italic text-red-500 select-none pointer-events-none mix-blend-screen leading-none overflow-visible text-center pr-6 pt-2"
            >
              {count}
            </motion.span>
          )}

          {/* Chromatic Aberration Cyan Ghost (Glitch Only) */}
          {isGlitching && (
            <motion.span
              animate={{ x: [10, -10, 6, -8, 0], y: [-3, 4, -2, 0] }}
              transition={{ duration: 0.12, repeat: 10 }}
              className="absolute inset-0 text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] font-cinematic italic text-cyan-400 select-none pointer-events-none mix-blend-screen leading-none overflow-visible text-center pr-6 pt-2"
            >
              {count}
            </motion.span>
          )}

          {/* Primary Counter Display: Direct color (no bg-clip-text) so the top right is NEVER cut */}
          <motion.span
            animate={
              isGlitching 
                ? { x: [-3, 3, -3, 3, 0], y: [-2, 2, -2, 2, 0], scale: [1, 1.05, 0.97, 1.03, 1] } 
                : {}
            }
            transition={{ duration: 0.15, repeat: isGlitching ? 8 : 0 }}
            className={`text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] tracking-tighter leading-none transition-colors duration-400 select-none overflow-visible pr-4 sm:pr-6 pt-2 pb-2 ${
              isPostGlitch
                ? 'font-cinematic italic text-brand-neon drop-shadow-[0_0_40px_rgba(192,132,252,0.7)]'
                : 'font-tech font-bold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'
            }`}
          >
            {count}
          </motion.span>

          <span 
            className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-tech tracking-normal select-none overflow-visible transition-colors duration-400 ${
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
                ? 'text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.8)] animate-pulse font-bold' 
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
            className={`h-full transition-all duration-100 rounded-full ${
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
