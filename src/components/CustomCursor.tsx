import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const trailSpringConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);
  
  const [cursorVariant, setCursorVariant] = useState<'default' | 'text' | 'image'>('default');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="text"]')) {
        setCursorVariant('text');
      } else if (target.closest('[data-cursor="image"]')) {
        setCursorVariant('image');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: '#9333EA',
      mixBlendMode: 'difference' as const,
      opacity: 1,
      scale: 1,
    },
    text: {
      width: 12,
      height: 12,
      backgroundColor: 'rgba(192, 132, 252, 0.5)',
      mixBlendMode: 'normal' as const,
      opacity: 1,
      scale: 3,
    },
    image: {
      width: 12,
      height: 12,
      backgroundColor: 'rgba(109, 40, 217, 0.5)',
      backdropFilter: 'blur(4px)',
      mixBlendMode: 'normal' as const,
      opacity: 1,
      scale: 5,
    }
  };

  return (
    <>
      <motion.div
        className="hidden md:flex fixed top-0 left-0 rounded-full pointer-events-none z-[100] items-center justify-center overflow-hidden"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={variants}
        animate={cursorVariant}
      >
        {cursorVariant === 'image' && (
          <span className="text-[2px] font-tech text-white uppercase tracking-widest absolute">View</span>
        )}
      </motion.div>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] bg-[#C084FC] mix-blend-difference"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </>
  );
}
