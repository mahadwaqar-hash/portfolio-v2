import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MouseParallax from './MouseParallax';

const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function ContactNexus() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const headingText = "Initiate Contact.";
  const chars = headingText.split('');

  const copyEmail = () => {
    navigator.clipboard.writeText('mahad.waqar@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Lightweight, Hardware-Accelerated Ambient Glows (Zero-Lag CSS) */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-gradient-to-tr from-brand-amethyst/20 via-brand-neon/15 to-transparent rounded-full blur-[90px] md:blur-[140px] -z-10 pointer-events-none transform-gpu animate-pulse"
        style={{ animationDuration: '6s' }}
      />

      {/* Main Content */}
      <MouseParallax intensity={10} className="w-full flex-1 flex flex-col items-center justify-center relative z-10 text-center max-w-5xl my-auto">
        <div style={{ transform: "translateZ(30px)" }} className="w-full">
          {/* Live Signal Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: customEase }}
            className="inline-flex items-center gap-2.5 px-4 md:px-5 py-2 rounded-full cyber-glass mb-8 border border-brand-amethyst/40 shadow-[0_0_20px_rgba(147,51,234,0.15)]"
          >
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-green-500" />
            </span>
            <span className="font-tech text-[10px] md:text-xs tracking-widest uppercase text-brand-mercury">
              Signal Active // Open for Engagements
            </span>
          </motion.div>

          {/* Hero Title */}
          <h2 className="font-cinematic italic text-5xl sm:text-6xl md:text-8xl lg:text-[9.5rem] text-brand-neon leading-[1.1] md:leading-[0.88] mb-8 flex flex-wrap justify-center overflow-visible">
            {chars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 110, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 110, opacity: 0 }}
                transition={{
                  duration: 0.85,
                  ease: customEase,
                  delay: index * 0.035
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>

          <p className="font-body text-brand-mutedsilver text-base md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed">
            Ready to engineer high-velocity digital architecture that outclasses your competition? Connect directly through the channels below.
          </p>

          {/* Magnetic Interactive Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-12 mx-auto" style={{ transform: "translateZ(60px)" }}>
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923334379962"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="text"
              className="group relative cyber-glass p-8 rounded-3xl border border-green-500/30 hover:border-green-400/80 transition-all duration-500 flex flex-col items-start text-left overflow-hidden hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(34,197,94,0.25)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/25 transition-all duration-500" />
              <div className="flex items-center justify-between w-full mb-6">
                <span className="w-12 h-12 rounded-2xl cyber-glass border border-green-500/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  💬
                </span>
                <span className="font-tech text-xs tracking-widest text-green-400 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Instant Ping
                </span>
              </div>
              <h3 className="font-tech font-bold text-2xl text-white mb-1 group-hover:text-green-300 transition-colors">
                0333 4379962
              </h3>
              <p className="font-tech text-xs tracking-widest uppercase text-green-400 mb-2">
                WhatsApp Direct // +92 333 4379962
              </p>
              <p className="font-body text-sm text-brand-mutedsilver group-hover:text-brand-mercury transition-colors">
                Fast response for project inquiries, scope discussions & audits.
              </p>
              <span className="mt-6 font-tech text-xs tracking-widest uppercase text-green-400 flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                Launch WhatsApp Chat ↗
              </span>
            </a>

            {/* Direct Line Card */}
            <a
              href="tel:+923334379962"
              data-cursor="text"
              className="group relative cyber-glass p-8 rounded-3xl border border-brand-amethyst/40 hover:border-brand-neon transition-all duration-500 flex flex-col items-start text-left overflow-hidden hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(192,132,252,0.25)]"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-bioglow/10 rounded-full blur-2xl group-hover:bg-brand-bioglow/25 transition-all duration-500" />
              <div className="flex items-center justify-between w-full mb-6">
                <span className="w-12 h-12 rounded-2xl cyber-glass border border-brand-neon/40 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </span>
                <span className="font-tech text-xs tracking-widest text-brand-neon uppercase">
                  Priority Call
                </span>
              </div>
              <h3 className="font-tech font-bold text-2xl text-white mb-1 group-hover:text-brand-neon transition-colors">
                0333 4379962
              </h3>
              <p className="font-tech text-xs tracking-widest uppercase text-brand-neon mb-2">
                Direct Line // +92 333 4379962
              </p>
              <p className="font-body text-sm text-brand-mutedsilver group-hover:text-brand-mercury transition-colors">
                Direct voice connection for immediate consultations & partnerships.
              </p>
              <span className="mt-6 font-tech text-xs tracking-widest uppercase text-brand-neon flex items-center gap-2 group-hover:translate-x-1.5 transition-transform">
                Call Direct Line ↗
              </span>
            </a>
          </div>

          {/* 1-Click Copy Buttons (Phone & Email) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('03334379962');
                setCopiedPhone(true);
                setTimeout(() => setCopiedPhone(false), 2500);
              }}
              data-cursor="text"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full cyber-glass border border-green-500/40 hover:border-green-400 text-brand-mercury hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
            >
              <span className="text-base">{copiedPhone ? '✓' : '📱'}</span>
              <span className="font-tech text-sm tracking-wider">
                {copiedPhone ? 'Copied Phone Number!' : 'Copy Phone: 0333 4379962'}
              </span>
            </button>

            <button
              type="button"
              onClick={copyEmail}
              data-cursor="text"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full cyber-glass border border-brand-amethyst/40 hover:border-brand-neon text-brand-mercury hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.1)]"
            >
              <span className="text-base">{copied ? '✓' : '✉️'}</span>
              <span className="font-tech text-sm tracking-wider">
                {copied ? 'Copied to Clipboard!' : 'Copy Email: mahad.waqar@gmail.com'}
              </span>
            </button>
          </div>
        </div>
      </MouseParallax>

      {/* Footer */}
      <footer className="mt-16 pt-8 w-full border-t border-brand-amethyst/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-tech text-xs text-brand-mutedsilver tracking-wider">
          Engineered in Lahore. Deployed Globally. © 2026.
        </p>
        <p className="font-cinematic italic text-base text-brand-neon/80">
          Muhammad Mahad Waqar Piracha
        </p>
      </footer>
    </section>
  );
}
