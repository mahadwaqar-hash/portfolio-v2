import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactNexus() {
  const [copied, setCopied] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('mahad.waqar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full min-h-screen py-24 md:py-36 px-6 md:px-12 lg:px-24 flex flex-col justify-between items-start bg-[#070709] border-t border-white/5 overflow-hidden">
      
      {/* Asymmetric glow — tucked into the corner, not centered */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[#DEC1FC]/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Top marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-24 w-full">
        <div className="w-3 h-3 rounded-full border border-zinc-700" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600">
          Let's talk
        </span>
        <div className="flex-1 h-[1px] bg-zinc-800" />
      </div>

      {/* Main content — left-aligned, not center-stage hero */}
      <div className="max-w-4xl my-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tech font-black text-white tracking-tighter leading-[0.95] mb-8"
        >
          Got a project<br />
          that deserves<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] to-[#00B67A]">
            better?
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-body text-base md:text-lg text-zinc-200 font-normal max-w-lg mb-14 leading-relaxed"
        >
          I take on 2–3 projects at a time so I can actually give a damn about each one.
          If the timing works, I'd love to hear what you're building.
        </motion.p>

        {/* Premium Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <motion.a
            href="https://wa.me/92334379962"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden hover:border-[#00B67A]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,182,122,0.15)] flex flex-col justify-between h-40 sm:h-48"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B67A]/10 rounded-full blur-[40px] group-hover:bg-[#00B67A]/20 transition-colors" />
            
            <div className="flex items-center justify-between z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B67A] animate-pulse" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
            
            <div className="z-10 mt-auto">
              <h3 className="font-tech text-xl sm:text-2xl text-white font-bold tracking-tight group-hover:text-[#00B67A] transition-colors mb-2">
                WhatsApp Me
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                Direct • Replies in 1h
              </p>
            </div>
          </motion.a>

          <motion.button
            onClick={copyEmail}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden hover:border-[#DEC1FC]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(222,193,252,0.15)] flex flex-col justify-between text-left h-40 sm:h-48"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DEC1FC]/10 rounded-full blur-[40px] group-hover:bg-[#DEC1FC]/20 transition-colors" />
            
            <div className="flex items-center justify-between z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DEC1FC]" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            
            <div className="z-10 mt-auto">
              <h3 className="font-tech text-xl sm:text-2xl text-white font-bold tracking-tight group-hover:text-[#DEC1FC] transition-colors mb-2">
                {copied ? 'Copied ✓' : 'Copy Email'}
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider truncate">
                mahad.waqar@gmail.com
              </p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Footer — minimal, human */}
      <footer className="w-full mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-tech text-sm text-white font-semibold tracking-tight">
            Muhammad Mahad Waqar Piracha
          </span>
          <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            Lahore, Pakistan — Deployed globally
          </span>
        </div>
        <span className="font-mono text-xs text-zinc-500 font-medium">
          © 2026
        </span>
      </footer>
    </div>
  );
}
