import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Index', href: 'hero' },
    { label: 'Services', href: 'services' },
    { label: 'Showroom', href: 'showroom' },
    { label: 'Process', href: 'process' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); // Stop URL from changing
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      // Lenis hook or native smooth scroll
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar (Hidden on mobile) */}
      <motion.header
        className="hidden md:flex fixed top-0 left-0 w-full z-50 px-12 py-8 justify-between items-center bg-gradient-to-b from-brand-ms-obsidian to-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: customEase }}
      >
        <div className="font-ms-heading italic text-2xl text-brand-ms-bronze">M.</div>
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex items-center space-x-12">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  data-cursor="text"
                  className="font-ms-body text-[11px] tracking-[0.2em] uppercase text-brand-ms-alabaster/60 hover:text-brand-ms-bronze transition-colors duration-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Expanding Bottom Menu (Hidden on desktop) */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ borderRadius: 24 }}
          className="cyber-glass border border-brand-amethyst/40 shadow-[0_10px_40px_rgba(109,40,217,0.3)] overflow-hidden flex flex-col items-center justify-center origin-bottom"
        >
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <motion.button
                key="menu-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                onClick={() => setIsOpen(true)}
                className="w-[140px] h-[50px] flex items-center justify-center gap-2 font-tech text-xs tracking-[0.2em] uppercase text-white font-bold whitespace-nowrap"
              >
                <div className="flex flex-col gap-1 items-center justify-center w-4 h-4">
                  <span className="w-full h-[1.5px] bg-brand-neon rounded-full" />
                  <span className="w-full h-[1.5px] bg-brand-neon rounded-full" />
                </div>
                <span>Menu</span>
              </motion.button>
            ) : (
              <motion.div
                key="menu-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="w-[90vw] flex flex-col p-6"
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                  <span className="font-tech text-[10px] tracking-widest uppercase text-brand-mutedsilver">Navigation</span>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-brand-neon hover:bg-white/20 transition-colors"
                  >
                    &#x2715;
                  </button>
                </div>
                
                <div className="flex flex-col gap-4">
                  {links.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={`#${link.href}`}
                      onClick={(e) => handleScroll(e, link.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="font-cinematic italic text-4xl text-white active:text-brand-neon transition-colors flex items-center justify-between group"
                    >
                      {link.label}
                      <span className="text-brand-amethyst text-lg opacity-0 group-active:opacity-100 transition-opacity">&#x2192;</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
