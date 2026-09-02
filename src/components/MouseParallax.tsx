import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MouseParallaxProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function MouseParallax({ children, className = '', intensity = 15 }: MouseParallaxProps) {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight || 1000], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth || 1000], [-intensity, intensity]);

  const springX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 768) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (isMobile) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }

  return (
    <div className={`perspective-1000 ${className}`}>
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
}
