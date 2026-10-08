import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Showroom', href: 'showroom' },
    { label: 'Manifesto', href: 'manifesto' },
    { label: 'Capabilities', href: 'services' },
    { label: 'Methodology', href: 'process' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Apple Liquid Glass Floating Desktop Navbar */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="w-full max-w-5xl apple-glass rounded-full px-5 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300 hover:border-white/20">
          
          {/* Brand & Status Indicator */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, 'hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#DEC1FC]/30 to-[#00B67A]/30 border border-white/20 flex items-center justify-center text-xs font-bold font-tech text-white group-hover:scale-105 transition-transform">
              MW
            </div>
            <div className="flex flex-col">
              <span className="font-tech text-xs tracking-wider uppercase text-white font-medium group-hover:text-[#DEC1FC] transition-colors">
                Mahad Waqar
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-[9px] text-zinc-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
                <span>Available for Engagements</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-tech text-xs tracking-widest uppercase text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#DEC1FC] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Direct CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className="px-4 py-2 rounded-full bg-white text-black font-tech text-xs font-semibold tracking-wider uppercase hover:bg-[#DEC1FC] hover:shadow-[0_0_20px_rgba(222,193,252,0.5)] transition-all duration-300 active:scale-95"
            >
              Consultation ↗
            </a>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white"
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col gap-1 w-4">
                <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Liquid Glass Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-24 inset-x-4 z-40 apple-glass-card rounded-2xl p-6 flex flex-col gap-4 border border-white/15"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">Navigation Index</span>
              <span className="flex items-center gap-1.5 text-[9px] text-[#00B67A] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
                Live Status: Online
              </span>
            </div>
            {links.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-tech text-base uppercase tracking-wider text-white hover:text-[#DEC1FC] py-2 flex items-center justify-between border-b border-white/5 last:border-0"
              >
                <span>{link.label}</span>
                <span className="text-zinc-500 font-mono text-xs">↗</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
