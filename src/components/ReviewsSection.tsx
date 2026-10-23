import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CXV0xGV5EXc1EBM/review';
const GOOGLE_MAPS_PLACE_URL = 'https://www.google.com/maps/place/Mahad+Waqar+Web+Developer+Lahore/@31.5305607,74.2885982,17z/data=!3m1!4b1!4m6!3m5!1s0x391903880533ff4f:0x3577117965c47475!8m2!3d31.5305607!4d74.2885982!16s%2Fg%2F11wsp0b8h4';

export default function ReviewsSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const springConfig = { stiffness: 240, damping: 22, mass: 0.5 };
  const springX = useSpring(cardX, springConfig);
  const springY = useSpring(cardY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(xPct);
    cardY.set(yPct);
    cardRef.current.style.setProperty('--card-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--card-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <section 
      id="reviews" 
      aria-label="Client reviews and Google Business Profile testimonials"
      className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-24 bg-[#070709] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient Radial Mesh Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[55vh] pointer-events-none -z-10" 
        style={{
          background: 'radial-gradient(ellipse at center, rgba(222, 193, 252, 0.08) 0%, rgba(0, 182, 122, 0.06) 45%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Eyebrow & Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <div className="apple-glass rounded-full px-4 py-1.5 inline-flex items-center gap-2.5 mb-4">
              {/* Google 4-Color Mini Dot */}
              <div className="flex items-center gap-1" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
              <span className="font-tech text-xs tracking-[0.25em] uppercase text-zinc-300 font-semibold">
                05 // Verified Client Reviews
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-tech font-bold text-white tracking-tight leading-[1.1]">
              Real Client Feedback.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A]">
                100% 5-Star Track Record.
              </span>
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Write a review on Google Business Profile (opens in a new tab)"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2 active:scale-95"
            >
              <span className="text-amber-400">★</span>
              <span>Leave a Review on Google</span>
              <span className="text-zinc-500">↗</span>
            </a>

            <a
              href={GOOGLE_MAPS_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Google Maps business profile (opens in a new tab)"
              className="px-5 py-2.5 rounded-full apple-glass text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2 active:scale-95"
            >
              <span>View Google Listing</span>
              <span className="text-zinc-500">↗</span>
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Featured Primary Google Review Card (Nayaab Rehan) */}
          <div 
            style={{ perspective: 1200 }}
            className="lg:col-span-8 flex flex-col"
          >
            <motion.article
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative h-full p-8 sm:p-10 md:p-12 apple-glass-card rounded-3xl border border-white/10 hover:border-[#DEC1FC]/50 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(222,193,252,0.12)] transition-colors duration-200 transition-shadow duration-300 flex flex-col justify-between overflow-hidden transform-gpu will-change-transform"
            >
              {/* Radial Cursor-Tracking Sheen */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  background:
                    'radial-gradient(500px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(222, 193, 252, 0.12), rgba(0, 182, 122, 0.08), transparent 70%)',
                }}
                aria-hidden="true"
              />

              {/* Card Top: Google Badge, Stars & Recency */}
              <div 
                style={{ transform: 'translateZ(18px)' }}
                className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10"
              >
                <div className="flex items-center gap-3">
                  {/* Google Icon Badge */}
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>

                  <div>
                    <span className="font-tech text-xs tracking-wider uppercase text-zinc-300 font-semibold block">
                      Google Maps Review
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400">
                      Verified Client Deployment
                    </span>
                  </div>
                </div>

                {/* 5-Star Rating & Recency Pill */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#00B67A]/10 border border-[#00B67A]/30 text-[10px] font-mono text-[#00B67A] font-semibold uppercase">
                    5 days ago • New
                  </span>
                </div>
              </div>

              {/* Review Headline & Body */}
              <div style={{ transform: 'translateZ(24px)' }} className="my-auto">
                <h3 className="font-tech text-xl sm:text-2xl md:text-3xl text-white font-bold tracking-tight mb-4 group-hover:text-[#DEC1FC] transition-colors">
                  5/5 Stars — Fantastic Portfolio Website!
                </h3>

                <blockquote className="font-body text-base sm:text-lg text-zinc-200 font-normal leading-relaxed mb-8">
                  &ldquo;Working with Mahad to build my textile design portfolio was an absolute pleasure. 
                  He completely understood my creative vision and delivered a sleek, modern, and high-performing website that showcases my patterns and artwork with stunning precision. 
                  The layout is clean, the navigation is seamless, and the overall execution is top-notch. 
                  I couldn&apos;t be happier with the results—highly recommended!&rdquo;
                </blockquote>
              </div>

              {/* Reviewer Metadata Card Footer */}
              <div 
                style={{ transform: 'translateZ(20px)' }}
                className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  {/* Reviewer Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DEC1FC]/30 to-[#00B67A]/30 border border-white/20 flex items-center justify-center font-tech text-lg font-bold text-white shadow-inner flex-shrink-0">
                    N
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.google.com/maps/contrib/101380046943796443936/reviews?hl=en-GB"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-tech text-base sm:text-lg text-white font-bold hover:text-[#DEC1FC] transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DEC1FC] rounded"
                      >
                        <span>Nayaab Rehan</span>
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                      </a>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" aria-hidden="true" />
                    </div>
                    <cite className="font-mono text-xs text-zinc-400 not-italic block">
                      Textile &amp; Pattern Designer • Rehan Portfolio
                    </cite>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" aria-hidden="true" />
                  <span>Verified Google Maps Contributor</span>
                </div>
              </div>
            </motion.article>
          </div>

          {/* Right Column: Google Business Profile Trust Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Google Rating Monolith Card */}
            <div className="apple-glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />
              
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 font-semibold block mb-2">
                  Official Google Listing
                </span>
                <h3 className="font-tech text-2xl font-bold text-white tracking-tight mb-1">
                  Mahad Waqar
                </h3>
                <p className="font-mono text-xs text-[#00B67A] font-medium mb-6">
                  Web Developer &amp; Architect Lahore
                </p>

                {/* Giant 5.0 Star Display */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-tech text-6xl font-black text-amber-400 tracking-tighter tabular-nums">
                    5.0
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-amber-400 mb-1" aria-hidden="true">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" className="w-4 h-4 fill-amber-400">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="font-mono text-[11px] text-zinc-300">
                      100% 5-Star Reviews
                    </span>
                  </div>
                </div>

                <p className="font-body text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                  Verified website design &amp; technical web architecture deployments across Pakistan, UK, UAE &amp; US.
                </p>
              </div>

              {/* Location Pin & Direct Review Link */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-start gap-2.5 text-xs font-mono text-zinc-300">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#DEC1FC] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>40, Bait-ul-Raza Colony Lahore, 54000, Pakistan</span>
                </div>

                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full py-3.5 px-4 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 hover:border-amber-400/60 text-amber-300 hover:text-white font-tech text-xs uppercase tracking-wider font-bold transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>★ Write a Review on Google</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Private Client Resolution Portal Card */}
            <div className="apple-glass rounded-3xl p-6 border border-white/10 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-tech text-sm text-white font-bold mb-0.5">
                  Have a Project in Progress?
                </h4>
                <p className="font-mono text-[11px] text-zinc-400">
                  Submit internal quality assurance &amp; feedback
                </p>
              </div>

              <a
                href="/feedback"
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0 active:scale-95"
              >
                <span>Portal</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
