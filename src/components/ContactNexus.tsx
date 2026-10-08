import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-between py-24 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-brand-ms-alabaster/10"
    >
      <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10 text-center max-w-5xl my-auto">
        <div className="w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: customEase }}
            className="mb-12 font-ms-heading italic text-brand-ms-bronze text-xl"
          >
            V. Connect
          </motion.div>

          {/* Hero Title */}
          <h2 className="font-ms-heading text-5xl sm:text-7xl md:text-[9rem] text-brand-ms-alabaster leading-[0.9] mb-16 flex flex-wrap justify-center overflow-visible">
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
            className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8"
          >
            <a
              href="https://wa.me/92334379962"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group flex flex-col items-center gap-4"
            >
              <span className="font-ms-body text-[10px] tracking-[0.3em] uppercase text-brand-ms-alabaster/50 group-hover:text-brand-ms-bronze transition-colors">
                Direct Line
              </span>
              <span className="font-ms-heading italic text-3xl text-brand-ms-alabaster group-hover:text-brand-ms-bronze transition-colors">
                WhatsApp ↗
              </span>
            </a>

            <div className="w-[1px] h-12 bg-brand-ms-alabaster/20 hidden md:block" />

            <button
              onClick={copyEmail}
              data-cursor="hover"
              className="group flex flex-col items-center gap-4"
            >
              <span className="font-ms-body text-[10px] tracking-[0.3em] uppercase text-brand-ms-alabaster/50 group-hover:text-brand-ms-bronze transition-colors">
                Electronic Mail
              </span>
              <span className="font-ms-heading italic text-3xl text-brand-ms-alabaster group-hover:text-brand-ms-bronze transition-colors">
                {copied ? 'Copied.' : 'Copy Address ↗'}
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="w-full mt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
      >
        <div className="font-ms-body text-[10px] uppercase tracking-[0.2em] text-brand-ms-alabaster/30">
          Engineered in Lahore. © 2026.
        </div>
        
        <div className="font-ms-heading italic text-xl text-brand-ms-alabaster/50">
          Muhammad Mahad Waqar Piracha
        </div>

        <div className="flex gap-8">
          <a href="#" className="font-ms-body text-[10px] tracking-[0.2em] text-brand-ms-alabaster/30 hover:text-brand-ms-bronze uppercase transition-colors">LinkedIn</a>
          <a href="#" className="font-ms-body text-[10px] tracking-[0.2em] text-brand-ms-alabaster/30 hover:text-brand-ms-bronze uppercase transition-colors">GitHub</a>
        </div>
      </motion.footer>
    </section>
  );
}
