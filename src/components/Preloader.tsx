import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'glitch' | 'resume' | 'reveal' | 'exit'>('counting');
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
    return '// INITIALIZATION COMPLETE • 100%';
  };

  // Phase 1: Dynamic acceleration from 0 → 67
  useEffect(() => {
    if (phase !== 'counting') return;
    
    let current = 0;
    const step = () => {
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
        setGlitchText('// SYSTEM ONLINE • 100%');
        setTimeout(() => {
          setPhase('reveal');
        }, 200);
      } else {
        setCount(current);
        setGlitchText(getTelemetry(current));
        intervalRef.current = setTimeout(surgeStep, 24);
      }
    };

    intervalRef.current = setTimeout(surgeStep, 40);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [phase]);

  // Phase 4: Fitting Manifesto Reveal at 100%
  useEffect(() => {
    if (phase !== 'reveal') return;
    const revealTimer = setTimeout(() => {
      setPhase('exit');
    }, 900);
    return () => clearTimeout(revealTimer);
  }, [phase]);

  // Phase 5: Smooth Upward Curtain Scroll & Blur Exit
  useEffect(() => {
    if (phase !== 'exit') return;
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 950);
    return () => clearTimeout(exitTimer);
  }, [phase, onComplete]);

  const isGlitching = phase === 'glitch';
  const isPostGlitch = count >= 67;

  // Random 67 ghost clones across the entire screen during anomaly
  const ghostClones = [
    { text: '67', top: '12%', left: '8%', size: 'text-6xl sm:text-8xl', color: 'text-red-500/80', rot: -15, font: 'font-cinematic italic' },
    { text: '67%', top: '18%', right: '14%', size: 'text-7xl sm:text-9xl', color: 'text-cyan-400/70', rot: 12, font: 'font-tech font-bold' },
    { text: '67', bottom: '22%', left: '12%', size: 'text-5xl sm:text-7xl', color: 'text-brand-neon/80', rot: -8, font: 'font-cinematic italic' },
    { text: '67%', bottom: '15%', right: '10%', size: 'text-6xl sm:text-8xl', color: 'text-red-400/70', rot: 20, font: 'font-tech font-bold' },
    { text: '67', top: '8%', right: '38%', size: 'text-4xl sm:text-6xl', color: 'text-white/80', rot: -5, font: 'font-tech font-bold' },
    { text: '67', bottom: '38%', left: '6%', size: 'text-5xl sm:text-7xl', color: 'text-cyan-300/80', rot: 25, font: 'font-cinematic italic' },
    { text: '67%', top: '42%', right: '6%', size: 'text-6xl sm:text-8xl', color: 'text-brand-neon/90', rot: -18, font: 'font-cinematic italic' },
    { text: '67', top: '72%', left: '42%', size: 'text-5xl sm:text-7xl', color: 'text-red-500/80', rot: 8, font: 'font-tech font-bold' },
    { text: '67', top: '28%', left: '26%', size: 'text-4xl sm:text-5xl', color: 'text-purple-400/80', rot: -12, font: 'font-cinematic italic' },
    { text: '67%', bottom: '28%', right: '28%', size: 'text-5xl sm:text-6xl', color: 'text-cyan-400/80', rot: 16, font: 'font-tech font-bold' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#010103] flex flex-col justify-between items-center p-6 sm:p-10 md:p-16 overflow-hidden select-none"
      animate={
        isGlitching
          ? { x: [-10, 12, -8, 10, -5, 8, 0], y: [5, -7, 6, -5, 3, 0] }
          : phase === 'exit'
          ? { y: '-100%', opacity: 0, filter: 'blur(28px)' }
          : { y: '0%', opacity: 1, filter: 'blur(0px)' }
      }
      transition={
        isGlitching
          ? { duration: 0.2, repeat: 5, ease: 'linear' }
          : phase === 'exit'
          ? { duration: 1.0, ease: luxuryEase }
          : { duration: 0.85, ease: luxuryEase }
      }
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

      {/* FULL-SCREEN GLITCH FLASH & HORIZONTAL TEAR LINES (AT 67) */}
      {isGlitching && (
        <>
          {/* Chromatic Strobe Flash */}
          <motion.div 
            className="absolute inset-0 bg-brand-neon/10 mix-blend-color-dodge pointer-events-none z-40"
            animate={{ opacity: [0, 0.6, 0, 0.4, 0] }}
            transition={{ duration: 0.15, repeat: 7 }}
          />

          {/* Random Horizontal Glitch Slices */}
          <motion.div 
            className="absolute left-0 right-0 h-4 bg-red-500/20 pointer-events-none z-40"
            animate={{ top: ['15%', '65%', '30%', '80%', '45%'], x: [-30, 40, -20, 30, 0] }}
            transition={{ duration: 0.12, repeat: 8 }}
          />
          <motion.div 
            className="absolute left-0 right-0 h-2 bg-cyan-400/30 pointer-events-none z-40"
            animate={{ top: ['75%', '25%', '55%', '10%', '70%'], x: [40, -30, 20, -40, 0] }}
            transition={{ duration: 0.1, repeat: 10 }}
          />
          <motion.div 
            className="absolute left-0 right-0 h-8 bg-brand-neon/20 pointer-events-none z-40"
            animate={{ top: ['35%', '85%', '20%', '50%', '35%'], x: [-20, 25, -15, 30, 0] }}
            transition={{ duration: 0.14, repeat: 7 }}
          />

          {/* RANDOM 67s FLYING EVERYWHERE ACROSS THE SCREEN */}
          {ghostClones.map((ghost, idx) => (
            <motion.div
              key={`ghost-${idx}`}
              className={`absolute pointer-events-none z-30 select-none ${ghost.size} ${ghost.color} ${ghost.font} drop-shadow-[0_0_20px_currentColor]`}
              style={{
                top: ghost.top,
                bottom: ghost.bottom,
                left: ghost.left,
                right: ghost.right,
                transform: `rotate(${ghost.rot}deg)`,
              }}
              animate={{
                x: [0, (idx % 2 === 0 ? 15 : -15), (idx % 3 === 0 ? -12 : 12), 0],
                y: [0, (idx % 2 === 0 ? -12 : 12), (idx % 3 === 0 ? 10 : -10), 0],
                opacity: [0.3, 1, 0.6, 0.9, 0.4],
                scale: [0.95, 1.1, 0.98, 1.05, 1],
              }}
              transition={{
                duration: 0.18 + (idx * 0.02),
                repeat: 6,
                ease: 'easeInOut',
              }}
            >
              {ghost.text}
            </motion.div>
          ))}

          {/* Floating System Glitch Error Tags */}
          <div className="absolute top-1/4 left-10 font-mono text-[10px] text-red-400/90 z-30 pointer-events-none animate-pulse">
            ERR_0x67_BUFFER_OVERFLOW // THREADS_HALTED
          </div>
          <div className="absolute bottom-1/4 right-10 font-mono text-[10px] text-cyan-400/90 z-30 pointer-events-none animate-pulse">
            MEM_CORRUPT: SECTOR_67 // OVERCLOCKING_CORE
          </div>
          <div className="absolute top-2/3 right-1/4 font-mono text-[10px] text-brand-neon/90 z-30 pointer-events-none animate-pulse">
            CRITICAL_SURGE: CORE_TEMP 9800K // BYPASSING
          </div>
        </>
      )}

      {/* Ambient Pulsing Nebular Core */}
      <motion.div 
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu transition-colors duration-700 -z-10"
        animate={{
          scale: isGlitching ? [1, 1.35, 0.9, 1.25, 1] : [1, 1.08, 1],
          opacity: isGlitching ? [0.4, 0.8, 0.5, 0.85, 0.4] : 0.25,
        }}
        transition={{
          duration: isGlitching ? 0.25 : 3,
          repeat: isGlitching ? 5 : Infinity,
          ease: "easeInOut"
        }}
        style={{
          backgroundColor: isPostGlitch ? 'rgba(192, 132, 252, 0.35)' : 'rgba(109, 40, 217, 0.25)'
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

      {/* Center Monumental Counter or Reveal Manifesto */}
      <div className="relative flex flex-col items-center justify-center my-auto z-20 w-full max-w-5xl px-4">
        
        {/* Shockwave ring during glitch at 67 */}
        <AnimatePresence>
          {isGlitching && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: [0.6, 2.5, 3.5], opacity: [0.9, 0.4, 0] }}
              transition={{ duration: 0.9, repeat: 2, ease: "easeOut" }}
              className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full border-2 border-brand-neon pointer-events-none shadow-[0_0_50px_rgba(192,132,252,0.8)]"
            />
          )}
        </AnimatePresence>

        {phase === 'reveal' ? (
          /* Fitting Reveal Manifesto at 100% */
          <motion.div
            initial={{ opacity: 0, y: 35, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: luxuryEase }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <span className="font-tech text-[10px] sm:text-xs text-brand-neon uppercase tracking-[0.4em] mb-3 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-ping" />
              SYSTEM INITIALIZED // 100%
            </span>
            <h2 className="font-cinematic italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC] drop-shadow-[0_0_35px_rgba(192,132,252,0.6)] leading-tight pb-2">
              Engineering Unfair<br />Digital Advantages.
            </h2>
            <p className="font-tech text-[10px] sm:text-xs text-brand-mutedsilver tracking-[0.3em] uppercase mt-4">
              Muhammad Mahad Waqar Piracha // Portfolio
            </p>
          </motion.div>
        ) : (
          /* Counter Number Display */
          <div className="relative flex items-baseline justify-center overflow-visible px-4 w-full text-center">
            
            {/* Chromatic Aberration Red Ghost (Glitch Only) */}
            {isGlitching && (
              <motion.span
                animate={{ x: [-12, 14, -8, 12, 0], y: [4, -5, 3, -2, 0] }}
                transition={{ duration: 0.12, repeat: 10 }}
                className="absolute inset-0 text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] font-cinematic italic text-red-500 select-none pointer-events-none mix-blend-screen leading-none drop-shadow-[0_0_35px_rgba(239,68,68,0.8)] overflow-visible text-center"
              >
                {count}
              </motion.span>
            )}

            {/* Chromatic Aberration Cyan Ghost (Glitch Only) */}
            {isGlitching && (
              <motion.span
                animate={{ x: [12, -14, 8, -10, 0], y: [-4, 5, -3, 2, 0] }}
                transition={{ duration: 0.12, repeat: 10 }}
                className="absolute inset-0 text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] font-cinematic italic text-cyan-400 select-none pointer-events-none mix-blend-screen leading-none drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] overflow-visible text-center"
              >
                {count}
              </motion.span>
            )}

            {/* Primary Counter Display */}
            <motion.span
              animate={
                isGlitching 
                  ? { x: [-4, 4, -4, 4, 0], y: [-2, 2, -2, 2, 0], scale: [1, 1.06, 0.95, 1.04, 1] } 
                  : {}
              }
              transition={{ duration: 0.15, repeat: isGlitching ? 8 : 0 }}
              className={`text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11.5rem] xl:text-[13rem] tracking-tighter leading-none transition-colors duration-500 select-none overflow-visible ${
                isPostGlitch
                  ? 'font-cinematic italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC] drop-shadow-[0_0_50px_rgba(192,132,252,0.8)]'
                  : 'font-tech font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]'
              }`}
            >
              {count}
            </motion.span>

            <span 
              className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl ml-1 sm:ml-2 font-tech tracking-normal select-none transition-colors duration-500 overflow-visible ${
                isPostGlitch ? 'text-brand-neon drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]' : 'text-brand-mutedsilver'
              }`}
            >
              %
            </span>
          </div>
        )}

        {/* Dynamic Telemetry Status */}
        {phase !== 'reveal' && (
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
        )}
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
