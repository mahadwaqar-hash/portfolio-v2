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
      <div className="max-w-4xl my-auto">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tech font-black text-white tracking-tighter leading-[0.95] mb-8">
          Got a project<br />
          that deserves<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] to-[#00B67A]">
            better?
          </span>
        </h2>

        <p className="font-body text-base md:text-lg text-zinc-400 font-light max-w-lg mb-14 leading-relaxed">
          I take on 2–3 projects at a time so I can actually give a damn about each one.
          If the timing works, I'd love to hear what you're building.
        </p>

        {/* Action links — not buttons, just bold interactive text */}
        <div className="flex flex-col gap-6">
          <a
            href="https://wa.me/92334379962"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredAction('wa')}
            onMouseLeave={() => setHoveredAction(null)}
            className="group flex items-center gap-6 py-4 border-b border-white/5 hover:border-[#00B67A]/30 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse group-hover:scale-150 transition-transform" />
            <span className="font-tech text-2xl md:text-3xl text-white group-hover:text-[#00B67A] transition-colors tracking-tight font-bold">
              WhatsApp me directly
            </span>
            <span className={`font-mono text-xs text-zinc-600 ml-auto transition-opacity ${hoveredAction === 'wa' ? 'opacity-100' : 'opacity-0'}`}>
              Usually reply within an hour
            </span>
          </a>

          <button
            onClick={copyEmail}
            onMouseEnter={() => setHoveredAction('email')}
            onMouseLeave={() => setHoveredAction(null)}
            className="group flex items-center gap-6 py-4 border-b border-white/5 hover:border-[#DEC1FC]/30 transition-colors text-left"
          >
            <span className="w-2 h-2 rounded-full bg-[#DEC1FC]" />
            <span className="font-tech text-2xl md:text-3xl text-white group-hover:text-[#DEC1FC] transition-colors tracking-tight font-bold">
              {copied ? 'Copied ✓' : 'Copy my email'}
            </span>
            <span className={`font-mono text-xs text-zinc-600 ml-auto transition-opacity ${hoveredAction === 'email' ? 'opacity-100' : 'opacity-0'}`}>
              mahad.waqar@gmail.com
            </span>
          </button>
        </div>
      </div>

      {/* Footer — minimal, human */}
      <footer className="w-full mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-tech text-sm text-white font-semibold tracking-tight">
            Muhammad Mahad Waqar Piracha
          </span>
          <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
            Lahore, Pakistan — Deployed globally
          </span>
        </div>
        <span className="font-mono text-[10px] text-zinc-700">
          © 2026
        </span>
      </footer>
    </div>
  );
}
