import { useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3 cards, each takes ~80vw + margin. We translate -66% of track width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} className="h-[300vh] bg-brand-ms-graphite relative">
      <div className="h-screen sticky top-0 flex items-center overflow-hidden">
        
        {/* Section Label */}
        <div className="absolute top-12 left-8 md:left-24 z-20">
          <h3 className="text-xs tracking-[0.3em] text-brand-ms-bronze uppercase font-ms-body">02 &mdash; Selected Works</h3>
        </div>

        {/* Horizontal Track */}
        <motion.div 
          className="flex pl-8 md:pl-24"
          style={{ x }}
        >
          {PROJECTS.map((project, idx) => (
            <div 
              key={idx} 
              className="w-[85vw] md:w-[70vw] h-[75vh] flex-shrink-0 relative overflow-hidden mr-12 md:mr-24 group cursor-none"
              data-cursor="explore"
            >
              {/* Image with internal parallax effect on hover/scroll */}
              <motion.div 
                className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
                style={{
                  x: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-[120%] h-[120%] max-w-none object-cover -left-[10%] -top-[10%] relative"
                />
              </motion.div>
              
              {/* Hover Darken Overlay */}
              <div className="absolute inset-0 bg-brand-ms-obsidian/0 group-hover:bg-brand-ms-obsidian/60 transition-colors duration-700" />

              {/* Text Content */}
              <div className="absolute inset-0 p-12 md:p-20 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-y-8 group-hover:translate-y-0">
                <h4 className="font-ms-heading italic text-5xl md:text-7xl text-brand-ms-alabaster mb-6">
                  {project.title}
                </h4>
                <p className="font-ms-body text-brand-ms-linen max-w-xl leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}
