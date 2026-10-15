import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Google Business Profile direct review shortlink
const GOOGLE_REVIEW_URL = 'https://g.page/r/CXV0xGV5EXc1EBM/review';

export default function FeedbackPage() {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketResolved, setTicketResolved] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Client Experience & Review Portal | Mahad Waqar';
    return () => {
      document.title = 'Website Development Lahore | Premium Web Architecture | Muhammad Mahad Waqar Piracha';
    };
  }, []);

  const handleSelectStar = (stars: number) => {
    setRating(stars);

    if (stars >= 4) {
      // 4 or 5 stars: Automate review velocity by routing straight to Google Business Profile
      setTimeout(() => {
        window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
      }, 300);
    }
  };

  const handleInterceptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare email mailto fallback or internal logging
    const subject = encodeURIComponent(`[Priority Resolution] Client Feedback Rating: ${rating}/5`);
    const body = encodeURIComponent(
      `Client Email: ${contactEmail}\nRating: ${rating}/5 Stars\n\nFeedback Details:\n${feedbackText}\n\nSubmitted at: ${new Date().toLocaleString()}`
    );

    // Open direct email composer to intercept negative sentiment
    setTimeout(() => {
      window.location.href = `mailto:mahad.waqar@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setTicketResolved(true);
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#070709] text-white flex flex-col justify-between items-center p-6 selection:bg-[#DEC1FC] selection:text-[#070709]">
      {/* Top Bar */}
      <header className="w-full max-w-xl flex items-center justify-between py-6">
        <a
          href="/"
          className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC] rounded-full px-3 py-1"
        >
          <span>←</span>
          <span>Back to Portfolio</span>
        </a>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#00B67A] bg-[#00B67A]/10 border border-[#00B67A]/20 px-3 py-1 rounded-full">
          Verified Feedback Flow
        </span>
      </header>

      {/* Main Review Gating Card */}
      <div className="w-full max-w-lg p-8 sm:p-12 rounded-3xl apple-glass-card border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden my-auto">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#DEC1FC]/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00B67A]/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold">
            Quality Assurance & Reputation Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-tech font-bold tracking-tight text-white mt-2 mb-3">
            How was your deployment?
          </h1>
          <p className="font-body text-sm text-zinc-300 mb-8 max-w-sm mx-auto leading-relaxed">
            Your evaluation directly impacts our architecture standards and client onboarding velocity.
          </p>

          {/* 5-Star Rating Buttons */}
          <div className="flex justify-center items-center gap-3 mb-8" role="radiogroup" aria-label="Rating scale out of 5 stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleSelectStar(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 border border-white/10 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DEC1FC]"
                style={{
                  backgroundColor: (hovered ?? rating ?? 0) >= star ? '#DEC1FC' : 'rgba(255,255,255,0.03)',
                  color: (hovered ?? rating ?? 0) >= star ? '#000000' : '#71717A',
                }}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                ★
              </button>
            ))}
          </div>

          {/* If 4-5 Stars: Positive Feedback Modal Callout */}
          {rating !== null && rating >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-[#00B67A]/10 border border-[#00B67A]/30 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
                <h3 className="font-tech text-base text-white font-bold">
                  Thank you for the high rating!
                </h3>
              </div>
              <p className="font-body text-xs text-zinc-300 mb-4 leading-relaxed">
                Opening your official Google Business Profile review dialog now. A verified public review accelerates our local Map Pack rank.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B67A] text-black font-tech text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors"
              >
                <span>Write Review on Google Maps</span>
                <span>↗</span>
              </a>
            </motion.div>
          )}

          {/* If 1-3 Stars: Intercept Negative Sentiment Internally */}
          <AnimatePresence>
            {rating !== null && rating <= 3 && !ticketResolved && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleInterceptSubmit}
                className="text-left flex flex-col gap-4 pt-6 border-t border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="font-tech text-sm text-zinc-200 font-bold">
                    How can we make this right?
                  </h3>
                </div>
                <p className="font-body text-xs text-zinc-400">
                  We take client satisfaction seriously. Your message goes directly to Mahad Waqar for rapid review and resolution.
                </p>

                <textarea
                  required
                  rows={4}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us what fell short of your expectations…"
                  className="w-full p-4 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 font-body text-sm focus:outline-none focus:border-[#DEC1FC] transition-colors"
                />

                <input
                  required
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Your contact email address"
                  className="w-full p-3.5 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-[#DEC1FC] transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-white text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-[#DEC1FC] transition-colors disabled:opacity-50 active:scale-98"
                >
                  {isSubmitting ? 'Routing to Leadership…' : 'Submit Direct to Mahad'}
                </button>
              </motion.form>
            )}

            {ticketResolved && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 rounded-2xl bg-[#00B67A]/10 border border-[#00B67A]/30 text-[#00B67A] text-xs font-mono mt-4 text-left leading-relaxed"
              >
                ✓ Thank you. Your ticket has been intercepted and routed to private review. We will contact you directly within 2 hours to resolve this.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-xl text-center py-4">
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
          Mahad Waqar Architecture • Client Resolution Protocol
        </span>
      </footer>
    </main>
  );
}
