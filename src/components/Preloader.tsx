import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'glitch' | 'resume' | 'exit'>('counting');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Phase 1: Count 0 → 67
  useEffect(() => {
    if (phase !== 'counting') return;
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 67) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('glitch');
          return 67;
        }
        return prev + 1;
      });
    }, 18);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  // Phase 2: Glitch at 67 for 1.5s
  useEffect(() => {
    if (phase !== 'glitch') return;
    timerRef.current = setTimeout(() => {
      setPhase('resume');
      setCount(68);
    }, 1500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]);

  // Phase 3: Count 68 → 100 (keeps neon purple & cinematic font!)
  useEffect(() => {
    if (phase !== 'resume') return;
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setPhase('exit');
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase]);

  // Phase 4: Wait for exit animation, then call onComplete
  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => {
      onComplete();
    }, 900);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  // After 67 reached (phases: glitch, resume, exit), it stays purple & cinematic font
  const isAfter67 = count >= 67;
  const isGlitching = phase === 'glitch';

  // Arc calculation for semi-circle motion:
  // progress from 0 (count=0) to 1 (count=100)
  const progress = count / 100;
  // Normalized angle from -PI/2 (left) to 0 (middle, peak) to PI/2 (right)
  const angle = (progress - 0.5) * Math.PI;
  // Arc radius in pixels — smaller on mobile
  const isMobilePreloader = typeof window !== 'undefined' && window.innerWidth < 640;
  const arcRadiusX = isMobilePreloader ? 120 : 260;
  const arcRadiusY = isMobilePreloader ? 60 : 120;
  const arcX = Math.sin(angle) * arcRadiusX;
  const arcY = -Math.cos(angle) * arcRadiusY + (arcRadiusY * 0.4);

  // Scale and opacity focus: largest and sharpest in the center
  const scale = 0.65 + Math.cos(angle) * 0.55; 
  const opacity = 0.35 + Math.cos(angle) * 0.65;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-brand-abyss flex flex-col items-center justify-center overflow-hidden select-none"
      animate={phase === 'exit' ? { opacity: 0, scale: 1.1, filter: 'blur(12px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: customEase }}
    >
      <span className="sr-only">Loading portfolio: {count}%</span>

      {/* Ambient background glow that follows the arc */}
      <motion.div 
        className="absolute w-40 h-40 md:w-80 md:h-80 rounded-full blur-[60px] md:blur-[120px] pointer-events-none transition-colors duration-500 transform-gpu"
        style={{
          backgroundColor: isAfter67 ? 'rgba(192, 132, 252, 0.25)' : 'rgba(109, 40, 217, 0.15)',
          x: arcX,
          y: arcY,
        }}
      />

      {/* Track line visualization of the semi-circle arc */}
      <div className="absolute w-[260px] h-[120px] sm:w-[520px] sm:h-[240px] border-t border-brand-amethyst/20 rounded-t-full pointer-events-none opacity-40" />

      {/* Main Counter in semi-circle arc */}
      <div className="relative flex items-center justify-center h-40 md:h-64 w-full">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            x: arcX + (isGlitching ? (Math.random() > 0.5 ? 4 : -4) : 0),
            y: arcY + (isGlitching ? (Math.random() > 0.5 ? -3 : 3) : 0),
            scale: scale,
            opacity: opacity,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
        >
          <span
            className={`text-6xl sm:text-8xl md:text-[11rem] tracking-tight transition-all duration-300 ${
              isAfter67
                ? 'font-cinematic italic text-brand-neon drop-shadow-[0_0_35px_rgba(192,132,252,0.6)]'
                : 'font-tech font-bold text-brand-mercury'
            }`}
          >
            {count}
          </span>
          <span 
            className={`text-xl sm:text-2xl md:text-4xl ml-1 md:ml-2 transition-colors duration-300 ${
              isAfter67 ? 'font-cinematic italic text-brand-neon' : 'font-tech text-brand-mutedsilver'
            }`}
          >
            %
          </span>
        </motion.div>
      </div>

      {/* Status indicator footer */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-36 h-[2px] bg-brand-surface rounded-full overflow-hidden">
          <motion.div 
            className={`h-full transition-colors duration-300 ${isAfter67 ? 'bg-brand-neon' : 'bg-brand-amethyst'}`}
            style={{ width: `${count}%` }}
          />
        </div>
        <p className="font-tech text-xs tracking-widest uppercase text-brand-mutedsilver">
          {isGlitching ? 'SYSTEM ANOMALY AT 67' : count === 100 ? 'INITIALIZATION COMPLETE' : 'SYSTEM CALIBRATING'}
        </p>
      </div>
    </motion.div>
  );
}
