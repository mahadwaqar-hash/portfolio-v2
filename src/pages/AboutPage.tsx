import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About Mahad Waqar | High-Performance Web Architecture';
  }, []);
  return (
    <div className="min-h-screen bg-[#070709] text-[#F4F4F5] font-body selection:bg-[#DEC1FC] selection:text-[#070709] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <a
            href="/"
            className="flex items-center gap-3 group text-zinc-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:bg-[#DEC1FC] group-hover:text-black transition-colors">
              M
            </div>
            <span className="font-tech text-sm tracking-tight font-bold">Mahad Waqar</span>
          </a>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/docs" className="hover:text-white transition-colors">API &amp; Docs</a>
            <span>/</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </header>

        <main>
          {/* Eyebrow & Title */}
          <div className="mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#DEC1FC] font-semibold">
              Profile // Senior Web Architect &amp; Technical SEO
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-tech font-black text-white tracking-tighter mt-3 leading-tight">
              About Mahad Waqar
            </h1>
            <p className="font-mono text-xs text-zinc-400 mt-2">
              DHA Phase 5, Lahore, Pakistan • Global Digital Flagship Deployments
            </p>
          </div>

          {/* Core Bio Section */}
          <section className="space-y-6 text-zinc-300 text-base md:text-lg leading-relaxed mb-12">
            <p>
              I am Muhammad Mahad Waqar Piracha (professionally known as <strong>Mahad Waqar</strong>). I operate as an elite Web Architect and Technical SEO Engineer based in DHA Phase 5, Lahore, Pakistan. Over the past 6 years, I have specialized in engineering bespoke sub-second (&lt;0.4s FCP), 100-Lighthouse digital flagships and Local SEO systems for high-ticket service brands, luxury healthcare clinics, bespoke architecture studios, and corporate law firms worldwide.
            </p>
            <p>
              My practice is intentionally structured around an anti-template, anti-bloat philosophy. The traditional web agency model delivers WordPress, Elementor, or Wix sites laden with tens of plugins, render-blocking scripts, and bloated DOM trees. The result is predictable: 3s+ mobile load times, high bounce rates, and total invisibility in both Google search and Generative AI engines.
            </p>
            <p>
              In contrast, every digital flagship I architect is coded line-by-line using React 18, TypeScript, Tailwind CSS, Framer Motion, and global Vercel Edge networks. Every asset, schema, and layout transition is strictly calculated to outrank competitors and turn passive visitors into qualified, high-ticket clients.
            </p>
          </section>

          {/* Hard Guarantees Bento */}
          <section className="mb-14">
            <h2 className="text-2xl font-tech font-bold text-white mb-6">
              Non-Negotiable Performance Guarantees
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-[#00B67A] uppercase font-bold tracking-wider">Speed Metric</span>
                <h3 className="text-2xl font-tech font-black text-white mt-1">&lt; 0.4s FCP</h3>
                <p className="text-sm text-zinc-400 mt-2">Sub-second First Contentful Paint delivered on global edge CDNs with zero render-blocking dependencies.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-[#DEC1FC] uppercase font-bold tracking-wider">Audit Score</span>
                <h3 className="text-2xl font-tech font-black text-white mt-1">100/100 Lighthouse</h3>
                <p className="text-sm text-zinc-400 mt-2">Perfect scores across Performance, Accessibility, Best Practices, and SEO on production builds.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-amber-300 uppercase font-bold tracking-wider">Motion Quality</span>
                <h3 className="text-2xl font-tech font-black text-white mt-1">60fps Physics</h3>
                <p className="text-sm text-zinc-400 mt-2">GPU-promoted transforms with zero layout shift (CLS: 0.00) and silky Lenis inertial smooth scrolling.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-blue-400 uppercase font-bold tracking-wider">Local SEO</span>
                <h3 className="text-2xl font-tech font-black text-white mt-1">25km Geo-Radius</h3>
                <p className="text-sm text-zinc-400 mt-2">Map pack and local search domination via deep JSON-LD Knowledge Graphs and localized programmatic routes.</p>
              </div>
            </div>
          </section>

          {/* Delivery Model & Capacity */}
          <section className="mb-14 p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10">
            <h2 className="text-2xl font-tech font-bold text-white mb-4">
              Delivery Model &amp; Capacity
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed mb-4">
              I operate on a strict <strong>4-week end-to-end sprint</strong> cycle. To ensure that every client receives obsessive, senior-level architectural attention, I take on only <strong>2–3 projects concurrently</strong>.
            </p>
            <ul className="space-y-3 font-mono text-xs text-zinc-400">
              <li className="flex items-center gap-3">
                <span className="text-[#00B67A]">✓</span> Week 1: Strategic Intelligence, Competitor Reverse-Engineering &amp; Funnel Topology
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#00B67A]">✓</span> Weeks 2–3: Bespoke React 18/TypeScript Engineering, Typography &amp; Motion Physics
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#00B67A]">✓</span> Week 4: Edge CDN Deployment, Google Search Console Verification &amp; SEO Growth Roadmap
              </li>
            </ul>
          </section>

          {/* Direct CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-white/10">
            <a
              href="https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#DEC1FC] text-black font-tech font-bold text-sm hover:scale-105 transition-transform text-center"
            >
              Direct Line on WhatsApp
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-tech font-bold text-sm hover:bg-white/5 transition-colors text-center"
            >
              Consultation Form &amp; Channels
            </a>
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-xs font-mono text-zinc-500 flex flex-wrap justify-between gap-4">
          <span>&copy; 2026 Muhammad Mahad Waqar Piracha. DHA Phase 5, Lahore, Pakistan.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="/docs" className="hover:text-zinc-300">API Documentation</a>
            <a href="/feedback" className="hover:text-zinc-300">Review Portal</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
