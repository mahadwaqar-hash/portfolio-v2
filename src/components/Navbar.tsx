import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Index', href: 'hero' },
    { label: 'Arsenal', href: 'terminal' },
    { label: 'Showroom', href: 'showroom' },
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
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 cyber-glass rounded-full px-8 py-4 max-w-[95vw]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: customEase }}
      >
        <nav role="navigation" aria-label="Main navigation">
          <ul className="flex items-center space-x-8">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={`#${link.href}`}
                  onClick={(e) => handleScroll(e, link.href)}
                  data-cursor="text"
                  className="font-tech text-sm tracking-widest uppercase text-[#64748B] hover:text-[#C084FC] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Pull Tab (Hidden on desktop) */}
      <div className="md:hidden fixed top-0 left-0 right-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="cyber-glass rounded-b-2xl px-10 py-3 border-t-0 shadow-[0_15px_30px_rgba(0,0,0,0.6)] pointer-events-auto border border-brand-amethyst/30"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: customEase }}
        >
          <div className="w-10 h-1.5 bg-brand-mutedsilver rounded-full mb-2 opacity-50 mx-auto" />
          <span className="font-tech text-xs tracking-widest uppercase text-brand-neon font-bold">
            {isOpen ? 'Close' : 'Menu'}
          </span>
        </motion.button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: customEase }}
            className="md:hidden fixed inset-0 z-40 bg-brand-abyss/95 backdrop-blur-xl flex flex-col items-center justify-center pt-16"
          >
            <nav role="navigation" aria-label="Mobile navigation" className="w-full">
              <ul className="flex flex-col items-center space-y-10 w-full">
                {links.map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                  >
                    <a
                      href={`#${link.href}`}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="font-cinematic italic text-5xl text-white hover:text-brand-neon transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
