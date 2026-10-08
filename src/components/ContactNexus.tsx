import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactNexus() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('mahad.waqar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full min-h-screen py-24 md:py-36 px-6 md:px-12 lg:px-24 flex flex-col justify-between items-center text-center bg-[#070709] border-t border-white/5 overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[60vh] bg-gradient-to-tr from-[#DEC1FC]/15 via-[#00B67A]/10 to-[#6D28D9]/15 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Top Badge */}
      <div className="apple-glass rounded-full px-5 py-2 inline-flex items-center gap-2.5 mb-10">
        <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-ping" />
        <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-medium">
          05 // Engagement Terminal
        </span>
      </div>

      {/* Main Centerpiece */}
      <div className="max-w-4xl mx-auto my-auto flex flex-col items-center">
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-tech font-black uppercase text-white tracking-tighter leading-none mb-6">
          Initiate <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A]">
            Contact.
          </span>
        </h2>

        <p className="font-body text-base sm:text-lg text-zinc-400 font-light max-w-xl mb-12 leading-relaxed">
          Ready to construct an unfair advantage for your business? Let's engineer a digital showroom that dominates your market.
        </p>

        {/* Apple Liquid Glass Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          
          {/* WhatsApp Direct Line */}
          <a
            href="https://wa.me/92334379962"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-tech text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:bg-[#DEC1FC] hover:shadow-[0_0_40px_rgba(222,193,252,0.6)] hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
            <span>Ping on WhatsApp</span>
            <span>↗</span>
          </a>

          {/* Copy Email Button */}
          <button
            onClick={copyEmail}
            className="w-full sm:w-auto px-8 py-4 rounded-full apple-glass text-white font-tech text-xs sm:text-sm font-bold uppercase tracking-widest hover:border-white/30 hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>{copied ? 'Copied to Clipboard! ✓' : 'Copy Email Address'}</span>
          </button>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <span className="text-zinc-300 font-tech font-semibold uppercase tracking-wider">
            Muhammad Mahad Waqar Piracha
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Engineered in Lahore, PK</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[#00B67A]">Deployed Globally © 2026</span>
          <a href="#hero" className="hover:text-white transition-colors">
            Back to Top ↑
          </a>
        </div>
      </footer>

    </div>
  );
}
