import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Work', href: 'showroom' },
    { label: 'Beliefs', href: 'manifesto' },
    { label: 'Capabilities', href: 'services' },
    { label: 'Process', href: 'process' },
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
      {/* Sleek, human-crafted architectural top bar (no generic AI glass pill) */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 py-4 pointer-events-none"
      >
        <div className="w-full max-w-6xl flex items-center justify-between pointer-events-auto">
          
          {/* Brand Wordmark & Location — clean and intentional */}
          <a
            href="#hero"
            onClick={(e) => handleScroll(e, 'hero')}
            className="flex items-center gap-3 group"
          >
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono font-bold text-white group-hover:bg-[#DEC1FC] group-hover:text-black transition-colors duration-200">
              M
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-tech text-sm tracking-tight text-white font-bold group-hover:text-[#DEC1FC] transition-colors">
                Mahad Waqar
              </span>
              <span className="hidden sm:inline font-mono text-[10px] text-zinc-400">
                / Lahore (UTC+5)
              </span>
            </div>
          </a>

          {/* Desktop Minimal Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 border border-white/10 bg-black/60 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            {links.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-mono text-xs text-zinc-300 hover:text-white hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Line / Contact Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B67A]/40 bg-[#00B67A]/10 text-[#00B67A] hover:bg-[#00B67A] hover:text-black font-mono text-xs font-medium transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A] animate-pulse" />
              <span>Available for hire</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScroll(e, 'contact')}
              className="px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-[#DEC1FC] transition-colors duration-200 active:scale-95"
            >
              Chat ↗
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white text-xs font-mono"
              aria-label="Toggle navigation"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 inset-x-4 z-40 bg-[#101015]/95 border border-white/15 rounded-2xl p-6 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl"
          >
            <div className="flex justify-between items-center pb-3 border-b border-white/10 text-xs font-mono text-zinc-400">
              <span>INDEX</span>
              <span className="text-[#00B67A]">STATUS: ONLINE</span>
            </div>
            {links.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                onClick={(e) => handleScroll(e, link.href)}
                className="font-tech text-lg text-white hover:text-[#DEC1FC] py-1.5 flex items-center justify-between"
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
