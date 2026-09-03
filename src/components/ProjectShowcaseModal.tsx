import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioProject } from '../data/portfolioData';

interface ProjectShowcaseModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function ProjectShowcaseModal({ project, onClose }: ProjectShowcaseModalProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isVanguard = project.id === '01' || project.client.toLowerCase().includes('vanguard');


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8 overflow-y-auto select-none"
      >
        {/* Top Bar / Controls */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-4 z-10">
          <div className="flex items-center gap-3">
            <span className="font-tech text-xs tracking-widest text-brand-neon uppercase px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/30">
              {project.id} // Case Study
            </span>
            <h2 className="font-cinematic italic text-2xl md:text-3xl text-white hidden sm:block">
              {project.client}
            </h2>
          </div>

          {/* Device Switcher (Desktop / Tablet / Mobile) */}
          <div className="hidden md:flex items-center gap-1 cyber-glass px-2 py-1 rounded-full border border-brand-amethyst/30">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1 rounded-full font-tech text-xs tracking-wider transition-colors ${
                deviceMode === 'desktop' ? 'bg-brand-neon text-black font-bold' : 'text-brand-mutedsilver hover:text-white'
              }`}
            >
              Desktop
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`px-3 py-1 rounded-full font-tech text-xs tracking-wider transition-colors ${
                deviceMode === 'tablet' ? 'bg-brand-neon text-black font-bold' : 'text-brand-mutedsilver hover:text-white'
              }`}
            >
              Tablet
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1 rounded-full font-tech text-xs tracking-wider transition-colors ${
                deviceMode === 'mobile' ? 'bg-brand-neon text-black font-bold' : 'text-brand-mutedsilver hover:text-white'
              }`}
            >
              Mobile
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full cyber-glass border border-brand-amethyst/40 flex items-center justify-center text-white hover:border-brand-neon hover:scale-105 transition-all"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Interactive Device Viewport Frame */}
        <div className="w-full flex-1 flex items-center justify-center py-2">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className={`cyber-glass rounded-2xl overflow-hidden border border-brand-amethyst/40 shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col transition-all duration-500 ${
              deviceMode === 'desktop'
                ? 'w-full max-w-5xl h-[65vh]'
                : deviceMode === 'tablet'
                ? 'w-[640px] max-w-full h-[65vh]'
                : 'w-[360px] max-w-full h-[65vh]'
            }`}
          >
            {/* Mac OS Window Header */}
            <div className="bg-[#121218] px-4 py-3 border-b border-brand-amethyst/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="font-mono text-xs text-brand-mutedsilver px-4 py-1 rounded bg-[#0A0A0E] border border-white/5 truncate max-w-[200px] sm:max-w-md">
                {project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : `https://${project.client.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
              </div>
              <div className="w-12 text-right">
                <span className="font-tech text-[10px] text-green-400">● LIVE</span>
              </div>
            </div>

            {/* Viewport Content */}
            <div className="flex-1 bg-[#050508] overflow-y-auto p-6 md:p-12 relative flex flex-col justify-between">
              {isVanguard && (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-8">
                      <span className="font-cinematic italic text-xl text-[#D4AF37] tracking-wider">
                        VANGUARD & PARTNERS
                      </span>
                      <span className="font-mono text-[10px] text-brand-mutedsilver uppercase tracking-widest hidden sm:inline">
                        Corporate Legal Counsel / Est. 2026
                      </span>
                    </div>

                    <p className="font-tech text-[#B8975A] text-xs tracking-[0.3em] uppercase mb-4">
                      Mergers & Acquisitions // Cross-Border Pathways
                    </p>
                    <h1 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.05] tracking-tight mb-6">
                      Ruthless Precision.<br />
                      <span className="text-[#D4AF37]">Global Architecture.</span>
                    </h1>
                    <p className="font-body text-brand-mutedsilver text-sm sm:text-base max-w-xl leading-relaxed">
                      Representing sovereign wealth funds, high-growth technology conglomerates, and multinational enterprises across London, New York, and Lahore.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/5 mt-8">
                    <div>
                      <p className="font-tech text-[10px] text-brand-mutedsilver uppercase">Jurisdictions</p>
                      <p className="font-mono text-xs text-white mt-1">US • UK • PK • CA</p>
                    </div>
                    <div>
                      <p className="font-tech text-[10px] text-brand-mutedsilver uppercase">FCP Speed</p>
                      <p className="font-mono text-xs text-green-400 mt-1">0.38s (99/100)</p>
                    </div>
                    <div>
                      <p className="font-tech text-[10px] text-brand-mutedsilver uppercase">Architecture</p>
                      <p className="font-mono text-xs text-white mt-1">React 18 + Vite</p>
                    </div>
                    <div>
                      <p className="font-tech text-[10px] text-brand-mutedsilver uppercase">Motion Physics</p>
                      <p className="font-mono text-xs text-[#D4AF37] mt-1">Hardware GPU</p>
                    </div>
                  </div>
                </div>
              )}

              {!isVanguard && (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between border-b border-brand-amethyst/20 pb-4 mb-8">
                      <span className="font-tech font-bold text-xl text-brand-neon tracking-wider">
                        {project.client}
                      </span>
                      <span className="font-mono text-[10px] text-brand-mutedsilver uppercase tracking-widest">
                        {project.category}
                      </span>
                    </div>

                    <h1 className="font-cinematic italic text-4xl sm:text-6xl text-white mb-6">
                      {project.title}
                    </h1>
                    <p className="font-body text-brand-mutedsilver text-sm sm:text-base max-w-xl leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5 mt-8">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-brand-surface border border-brand-amethyst/30 font-tech text-xs text-brand-mercury">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Details & Actions */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded bg-brand-surface/80 border border-brand-amethyst/30 font-mono text-[11px] text-brand-mercury">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-glass bg-brand-neon/10 hover:bg-brand-neon hover:text-black text-brand-neon font-tech text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-brand-neon/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                Open Full External Site ↗
              </a>
            )}
            <button
              onClick={onClose}
              className="cyber-glass text-brand-mutedsilver hover:text-white font-tech text-xs tracking-widest uppercase px-6 py-3 rounded-full border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
