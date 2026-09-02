import React from 'react';
import type { PortfolioProject } from '../data/portfolioData';

interface ShowroomCardProps {
  project: PortfolioProject;
}

export default function ShowroomCard({ project }: ShowroomCardProps) {
  return (
    <article 
      className="w-[85vw] lg:w-[65vw] h-[70vh] flex-shrink-0 cyber-glass rounded-[2rem] relative overflow-hidden group"
      data-cursor="image"
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left 40% */}
        <div className="w-full lg:w-[40%] p-8 lg:p-12 flex flex-col justify-between z-10">
          <div>
            <div className="font-tech text-sm tracking-widest uppercase text-brand-mutedsilver mb-2">
              {project.client}
            </div>
            <div className="font-tech text-xs tracking-wider uppercase text-brand-amethyst/80">
              {project.category}
            </div>
          </div>
          
          <div className="my-8">
            <h3 className="font-cinematic italic text-4xl lg:text-5xl text-white leading-tight mb-4">
              {project.title}
            </h3>
            <p className="font-body text-brand-mutedsilver text-base mb-6">
              {project.description}
            </p>
            {project.metrics && (
              <div className="cyber-glass rounded-full px-4 py-2 text-sm font-tech text-brand-neon inline-block">
                {project.metrics}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs font-tech border border-brand-amethyst/30 rounded-full text-brand-mutedsilver"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right 60% */}
        <div className="w-full lg:w-[60%] h-full relative overflow-hidden hidden lg:block">
          <div className={`w-full h-full ${project.imagePlaceholder} group-hover:scale-105 transition-transform duration-700`} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-tech font-bold text-white/[0.03] select-none pointer-events-none">
            {project.id}
          </div>
        </div>
      </div>
    </article>
  );
}
