import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setStage(1), 800); // Reveal "MAHAD"
    const t2 = setTimeout(() => setStage(2), 1600); // Reveal "ATELIER"
    const t3 = setTimeout(() => setStage(3), 2800); // Start Exit

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = 'auto';
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {stage < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-ms-obsidian pointer-events-auto"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          <div className="flex flex-col items-center overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={stage >= 1 ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-ms-heading text-4xl md:text-6xl text-brand-ms-alabaster tracking-widest mb-2"
            >
              M. WAQAR
            </motion.div>
          </div>

          <div className="flex flex-col items-center overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={stage >= 2 ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-ms-heading italic text-2xl md:text-4xl text-brand-ms-bronze"
            >
              Digital Atelier.
            </motion.div>
          </div>

          {/* Loading line indicator */}
          <motion.div 
            className="absolute bottom-12 w-32 h-[1px] bg-brand-ms-alabaster/20 overflow-hidden"
          >
            <motion.div 
              className="h-full bg-brand-ms-bronze"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.8, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
