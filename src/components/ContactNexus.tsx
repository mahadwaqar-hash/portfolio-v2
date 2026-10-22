import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactNexus() {
  const [copied, setCopied] = useState(false);
  const waRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLButtonElement>(null);
  const reviewRef = useRef<HTMLAnchorElement>(null);
  const waRafRef = useRef<number | null>(null);
  const emailRafRef = useRef<number | null>(null);
  const reviewRafRef = useRef<number | null>(null);

  const cardRects = useRef(new WeakMap<HTMLElement, DOMRect>());

  const handleCardMouseEnter = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      cardRects.current.set(ref.current, ref.current.getBoundingClientRect());
    }
  };

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLElement>,
    ref: React.RefObject<HTMLElement>,
    rafRef: React.MutableRefObject<number | null>
  ) => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        if (ref.current) {
          let rect = cardRects.current.get(ref.current);
          if (!rect) {
            rect = ref.current.getBoundingClientRect();
            cardRects.current.set(ref.current, rect);
          }
          ref.current.style.setProperty('--card-mouse-x', `${clientX - rect.left}px`);
          ref.current.style.setProperty('--card-mouse-y', `${clientY - rect.top}px`);
        }
        rafRef.current = null;
      });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('mahad.waqar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative w-full min-h-screen py-24 md:py-36 px-6 md:px-12 lg:px-24 flex flex-col justify-between items-start bg-[#070709] border-t border-white/5 overflow-hidden">
      
      {/* Asymmetric glow — Pure GPU radial gradient (zero blur cost) */}
      <div 
        className="absolute bottom-0 right-0 w-[50vw] h-[50vh] rounded-full pointer-events-none" 
        style={{
          background: 'radial-gradient(circle, rgba(222, 193, 252, 0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top marker */}
      <div className="flex items-center gap-4 mb-16 md:mb-24 w-full">
        <div className="w-3 h-3 rounded-full border border-zinc-700" />
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-semibold">
          05 // Let's talk
        </span>
        <div className="flex-1 h-[1px] bg-zinc-800" />
      </div>

      {/* Main content */}
      <div className="max-w-4xl my-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tech font-black text-white tracking-tighter leading-[0.95] mb-8"
        >
          <span className="sr-only">Contact: Start a High-Performance Web Project — </span>
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

        {/* Action Cards with Cursor-Following Aurora Glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          
          {/* 1. WhatsApp Card */}
          <motion.a
            ref={waRef}
            onMouseEnter={() => handleCardMouseEnter(waRef)}
            onMouseMove={(e) => handleCardMouseMove(e, waRef, waRafRef)}
            href="https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat directly on WhatsApp (opens in a new tab)"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-[#00B67A]/50 transition-colors duration-200 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,182,122,0.2)] flex flex-col justify-between h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A]"
          >
            {/* Cursor-Following Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(350px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(0, 182, 122, 0.22), transparent 75%)',
              }}
              aria-hidden="true"
            />

            <div className="flex items-center justify-between z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00B67A] animate-pulse" aria-hidden="true" />
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#00B67A]/40 group-hover:bg-[#00B67A]/10 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-400 group-hover:text-[#00B67A] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </div>
            
            <div className="z-10 mt-auto">
              <h3 className="font-tech text-xl sm:text-2xl text-white font-bold tracking-tight group-hover:text-[#00B67A] transition-colors mb-2">
                WhatsApp Me
              </h3>
              <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                Direct Line • Replies in 1h
              </p>
            </div>
          </motion.a>

          {/* 2. Copy Email Card with Spring Morphing Reward */}
          <motion.button
            ref={emailRef}
            onMouseEnter={() => handleCardMouseEnter(emailRef)}
            onMouseMove={(e) => handleCardMouseMove(e, emailRef, emailRafRef)}
            onClick={copyEmail}
            aria-label="Copy email address mahad.waqar@gmail.com to clipboard"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className={`group relative p-6 sm:p-8 apple-glass-card rounded-3xl overflow-hidden transition-colors duration-200 transition-shadow duration-300 flex flex-col justify-between text-left h-44 sm:h-52 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] ${
              copied
                ? 'border-[#00B67A] shadow-[0_0_35px_rgba(0,182,122,0.3)] bg-[#00B67A]/5'
                : 'border-white/10 hover:border-[#DEC1FC]/50 hover:shadow-[0_20px_50px_rgba(222,193,252,0.2)]'
            }`}
          >
            {/* Cursor-Following Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: copied
                  ? 'radial-gradient(350px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(0, 182, 122, 0.25), transparent 75%)'
                  : 'radial-gradient(350px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(222, 193, 252, 0.22), transparent 75%)',
              }}
              aria-hidden="true"
            />

            {/* Top Indicator & Morphing Icon */}
            <div className="flex items-center justify-between z-10 w-full">
              <span
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  copied ? 'bg-[#00B67A] shadow-[0_0_8px_#00B67A]' : 'bg-[#DEC1FC]'
                }`}
                aria-hidden="true"
              />
              
              <div
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  copied
                    ? 'bg-[#00B67A]/20 border-[#00B67A] text-[#00B67A] shadow-[0_0_12px_rgba(0,182,122,0.5)]'
                    : 'bg-white/5 border-white/10 text-zinc-400 group-hover:border-[#DEC1FC]/40 group-hover:text-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.svg
                      key="check"
                      initial={{ scale: 0.88, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.92, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 25 }}
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[#00B67A]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      initial={{ scale: 0.90, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.92, opacity: 0 }}
                      transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Morphing Text with Bouncy Vertical Slide */}
            <div className="z-10 mt-auto w-full" aria-live="polite">
              <h3 className={`font-tech text-xl sm:text-2xl font-bold tracking-tight transition-colors mb-2 ${
                copied ? 'text-[#00B67A]' : 'text-white group-hover:text-[#DEC1FC]'
              }`}>
                {copied ? 'Copied ✓' : 'Copy Email'}
              </h3>

              <div className="overflow-hidden h-5">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.p
                      key="copied-subtitle"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="font-mono text-[10px] sm:text-xs text-[#00B67A] uppercase tracking-wider font-bold"
                    >
                      COPIED TO CLIPBOARD ✓
                    </motion.p>
                  ) : (
                    <motion.p
                      key="email-subtitle"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider truncate"
                    >
                      mahad.waqar@gmail.com
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.button>
        </div>

        {/* 3. Slim Horizontal Client Feedback Card with Matching Aesthetic */}
        <motion.a
          ref={reviewRef}
          onMouseEnter={() => handleCardMouseEnter(reviewRef)}
          onMouseMove={(e) => handleCardMouseMove(e, reviewRef, reviewRafRef)}
          href="/feedback"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState({}, '', '/feedback');
            window.dispatchEvent(new PopStateEvent('popstate'));
            window.scrollTo(0, 0);
          }}
          aria-label="Open Client Experience & Review Portal"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -3, scale: 1.008 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="group relative mt-4 w-full p-4 sm:p-5 apple-glass-card rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 transition-colors duration-200 transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(251,191,36,0.15)] flex items-center justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {/* Cursor-Following Radial Glow (Gold/Amber & Emerald) */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(400px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(251, 191, 36, 0.18), rgba(0, 182, 122, 0.12), transparent 75%)',
            }}
            aria-hidden="true"
          />

          <div className="flex items-center gap-3.5 sm:gap-4 z-10">
            {/* Gold Google Star Badge */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-colors shadow-sm">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="currentColor" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-tech text-base sm:text-lg text-white font-bold tracking-tight group-hover:text-amber-300 transition-colors">
                  Client Feedback &amp; Review Portal
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-[10px] font-mono text-amber-300 font-semibold">
                  ★ 5.0 Rating
                </span>
              </div>
              <p className="font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider">
                Share Deployment Experience • Direct Client Reviews
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="hidden md:inline font-mono text-[10px] sm:text-xs text-zinc-400 group-hover:text-amber-300 transition-colors font-medium">
              Leave Feedback
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-400/40 group-hover:bg-amber-400/10 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </div>
          </div>
        </motion.a>
      </div>

      {/* Footer — minimal, human & geo-targeted */}
      <footer className="w-full mt-24 pt-8 border-t border-white/10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-tech text-sm text-white font-semibold tracking-tight">
              Muhammad Mahad Waqar Piracha
            </span>
            <span className="font-mono text-xs text-zinc-400">
              Web Developer &amp; Architecture • DHA Phase 5, Lahore, Pakistan
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a 
              href="/about"
              className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a 
              href="/contact"
              className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </a>
            <a 
              href="/feedback"
              className="font-mono text-xs text-zinc-400 hover:text-[#DEC1FC] transition-colors"
            >
              Feedback &amp; Reviews
            </a>
            <a 
              href="/privacy"
              className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="font-mono text-xs text-zinc-500 font-medium">
              &copy; 2026
            </span>
          </div>
        </div>

        {/* Localized Search Coverage Badge */}
        <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-zinc-500">
          <span>
            Serving ambitious clients in DHA, Gulberg, Model Town, Bahria Town, Cantt, Johar Town &amp; globally across UAE, UK, US.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[#00B67A]/90 font-medium">
              Geo-Radius: 25km Dominance
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
