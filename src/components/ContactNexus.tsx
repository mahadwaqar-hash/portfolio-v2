import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MouseParallax from './MouseParallax';

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ContactNexus() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [copied, setCopied] = React.useState(false);

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
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between py-24 px-6 md:px-12 lg:px-24 overflow-hidden bg-brand-ms-alabaster"
    >
      {/* Light Bubbly Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[650px] h-[350px] md:h-[650px] bg-brand-ms-bronze/5 rounded-full blur-[100px] pointer-events-none transform-gpu -z-10" />

      {/* Main Content */}
      <MouseParallax intensity={10} className="w-full flex-1 flex flex-col items-center justify-center relative z-10 text-center max-w-5xl my-auto">
        <div className="w-full">
          {/* Live Signal Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: customEase }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-black/5 shadow-sm mb-12"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="font-tech text-xs tracking-widest uppercase text-brand-ms-graphite font-medium">
              Signal Active // Open for Engagements
            </span>
          </motion.div>

          {/* Hero Title */}
          <h2 className="font-cinematic italic text-6xl sm:text-8xl md:text-[11rem] text-brand-ms-graphite leading-[1.1] md:leading-[0.88] mb-12 flex flex-wrap justify-center overflow-visible">
            {chars.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 110, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 110, opacity: 0 }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.03,
                  ease: customEase,
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h2>

          {/* Contact Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: customEase }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8"
          >
            <a
              href="https://wa.me/92334379962"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="w-full md:w-auto px-10 py-5 rounded-full bg-white/60 backdrop-blur-2xl border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-brand-ms-graphite font-tech text-sm tracking-widest uppercase font-semibold transition-all hover:bg-white hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-center justify-center gap-3 group"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
              <span>Ping on WhatsApp</span>
            </a>

            <button
              onClick={copyEmail}
              data-cursor="hover"
              className="w-full md:w-auto px-10 py-5 rounded-full bg-transparent border border-brand-ms-graphite/20 text-brand-ms-graphite font-tech text-sm tracking-widest uppercase font-semibold transition-all hover:border-brand-ms-graphite hover:-translate-y-1 flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="relative z-10">{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>
          </motion.div>
        </div>
      </MouseParallax>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="w-full mt-32 pt-8 border-t border-brand-ms-graphite/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
      >
        <div>
          <p className="font-tech text-[10px] uppercase tracking-widest text-brand-ms-graphite/50 mb-1">
            Engineered in Lahore. Deployed Globally. © 2026.
          </p>
          <p className="font-cinematic italic text-xl text-brand-ms-graphite/80">
            Muhammad Mahad Waqar Piracha
          </p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="font-tech text-xs tracking-widest text-brand-ms-graphite/60 hover:text-brand-ms-graphite uppercase transition-colors">LinkedIn</a>
          <a href="#" className="font-tech text-xs tracking-widest text-brand-ms-graphite/60 hover:text-brand-ms-graphite uppercase transition-colors">GitHub</a>
        </div>
      </motion.footer>
    </section>
  );
}
