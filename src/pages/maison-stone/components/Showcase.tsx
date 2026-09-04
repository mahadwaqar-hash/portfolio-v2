import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PROJECTS = [
  {
    title: "The Penthouse Noir",
    description: "A symphony in obsidian and bronze, overlooking the endless metropolis. Every corner whispers of subdued power and refined taste.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "Villa Alabaster",
    description: "Bathed in Aegean light, this sanctuary employs monolithic white marble to create a transcendent, meditative atmosphere.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop"
  },
  {
    title: "The Glass Pavilion",
    description: "Blurring the boundary between forest and hearth, this architectural marvel uses structural glass to invite nature indoors.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
  }
];

export default function Showcase() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = horizontalRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // Scroll horizontally
      el.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
      // Prevent vertical scrolling only if we are not at the edges
      const isAtLeftEnd = el.scrollLeft === 0 && e.deltaY < 0;
      const isAtRightEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth && e.deltaY > 0;
      if (!isAtLeftEnd && !isAtRightEnd) {
        e.preventDefault();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const { scrollXProgress } = useScroll({
    container: horizontalRef
  });

  // Extract a parallax offset that maps scrollXProgress (0 to 1) to -5% to 5%
  const parallaxX = useTransform(scrollXProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section className="h-screen bg-brand-ms-graphite relative flex flex-col justify-center">
      {/* Section Label */}
      <div className="absolute top-12 left-8 md:left-24 z-20 pointer-events-none">
        <h3 className="text-xs tracking-[0.3em] text-brand-ms-bronze uppercase font-ms-body">02 &mdash; Selected Works</h3>
      </div>

      {/* Native Horizontal Track */}
      <div 
        ref={horizontalRef}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full items-center h-[75vh] px-8 md:px-24"
      >
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            className="w-[85vw] md:w-[70vw] h-full flex-shrink-0 snap-center relative overflow-hidden mr-12 md:mr-24 last:mr-0 group cursor-none"
            data-cursor="explore"
          >
            {/* Image Parallax tracking the horizontal scroll */}
            <motion.div 
              className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
              style={{ x: parallaxX }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-[110%] h-full max-w-none object-cover -left-[5%] relative pointer-events-none"
              />
            </motion.div>
            
            {/* Hover Darken Overlay */}
            <div className="absolute inset-0 bg-brand-ms-obsidian/0 group-hover:bg-brand-ms-obsidian/60 transition-colors duration-700 pointer-events-none" />

            {/* Text Content */}
            <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-8 group-hover:translate-y-0 pointer-events-none">
              <h4 className="font-ms-heading italic text-5xl md:text-7xl text-brand-ms-alabaster mb-6">
                {project.title}
              </h4>
              <p className="font-ms-body text-brand-ms-linen max-w-xl leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
