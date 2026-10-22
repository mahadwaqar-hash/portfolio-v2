import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FAQ_DATA = [
  {
    question: "What is included in Mahad Waqar's 4-week web architecture and Local SEO sprint?",
    answer: "The 4-week sprint is an end-to-end transformation: Week 1 begins with reverse-engineering your top 5 competitors, mapping backlink structures, and architecting conversion funnels. Weeks 2–3 involve writing custom React 18 & TypeScript architecture, Framer Motion physics, and 60fps Lenis inertial scrolling with zero templates. Week 4 deploys your flagship to global Vercel edge nodes with deep JSON-LD schemas, GSC verification, and a 6-month SEO roadmap."
  },
  {
    question: "How do custom-engineered websites outperform generic templates and page builders?",
    answer: "WordPress, Elementor, and Wix load megabytes of unused plugins, render-blocking stylesheets, and bloated DOM trees that cause 3s+ load times and high bounce rates. Custom React flagships are engineered line-by-line: asset minification, critical CSS inlining, and edge caching deliver sub-0.4s load times, perfect 100 Lighthouse scores, and semantic markup that Googlebot and AI search engines prioritize."
  },
  {
    question: "What performance metrics are guaranteed on client deployments?",
    answer: "Every production build guarantees sub-0.4s First Contentful Paint (FCP), 100/100 Google Lighthouse scores across performance, accessibility, best practices, and SEO, 60fps animations with zero layout shift (CLS: 0), and localized schema architecture engineered for 10km–25km search radius dominance."
  },
  {
    question: "Which industries and markets does Mahad Waqar work with?",
    answer: "I partner exclusively with high-ticket service brands, luxury healthcare and cosmetic clinics, bespoke architecture studios, commercial law firms, and ambitious local founders across Lahore (DHA, Gulberg, Model Town), the UAE (Dubai, Abu Dhabi), the UK (London), and the US."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full border border-zinc-700" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 font-semibold">
            04 // Clear Answers
          </span>
          <div className="flex-1 h-[1px] bg-zinc-800" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold text-white tracking-tight leading-[1.05]">
              <span className="sr-only">FAQ: High-Performance Web Architecture & Local SEO Answers — </span>
              Common questions,<br />
              <span className="text-zinc-400">unfiltered answers.</span>
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-zinc-300 max-w-sm font-normal md:text-right">
            Everything you need to know about engineering, timelines, performance guarantees, and local search rankings.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="apple-glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-6 sm:p-8 flex items-center justify-between gap-6 text-left group hover:bg-white/[0.02] active:scale-[0.995] transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC]"
                >
                  <span className="font-tech text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#DEC1FC] transition-colors">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className={`w-8 h-8 rounded-full apple-glass flex items-center justify-center flex-shrink-0 font-mono text-base transition-colors ${
                      isOpen ? 'text-[#DEC1FC] border-[#DEC1FC]/30 bg-[#DEC1FC]/10' : 'text-white'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: { 
                          height: { duration: 0.22, ease: [0.23, 1, 0.32, 1] },
                          opacity: { duration: 0.18, ease: 'easeOut', delay: 0.04 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { 
                          height: { duration: 0.13, ease: [0.23, 1, 0.32, 1] },
                          opacity: { duration: 0.10, ease: 'easeIn' }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                        <div className="h-[1px] w-full bg-white/5 mb-4" />
                        <p className="font-body text-sm sm:text-[15px] text-zinc-300 font-normal leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
