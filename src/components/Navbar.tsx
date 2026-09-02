import React from 'react';
import { motion } from 'framer-motion';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const links = [
    { label: 'Index', href: '#hero' },
    { label: 'Arsenal', href: '#terminal' },
    { label: 'Showroom', href: '#showroom' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 cyber-glass rounded-full px-4 md:px-8 py-3 md:py-4 max-w-[95vw]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: customEase }}
    >
      <nav role="navigation" aria-label="Main navigation">
        <ul className="flex items-center space-x-3 sm:space-x-5 md:space-x-8">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-cursor="text"
                className="font-tech text-[10px] sm:text-xs md:text-sm tracking-widest uppercase text-[#64748B] hover:text-[#C084FC] transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
