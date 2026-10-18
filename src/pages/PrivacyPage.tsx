import React, { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy | Mahad Waqar — High-Performance Web Architecture';
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
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span>/</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </header>

        <main>
          {/* Eyebrow & Title */}
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Legal // Trust &amp; Transparency
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-tech font-black text-white tracking-tighter mt-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-zinc-500 mt-2">
              Last updated: 2026 • Effective globally across PK, AE, GB, and US
            </p>
          </div>

          <div className="space-y-10 text-zinc-300 text-base leading-relaxed">
            <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-tech font-bold text-white mb-3">
                1. Core Commitment: Zero Exploitative Tracking
              </h2>
              <p>
                At Mahad Waqar Web Architecture, privacy is an engineering principle. Unlike conventional marketing sites, we do not deploy third-party advertising tracking pixels (such as Meta/Facebook pixels, TikTok pixels, or Google Ads retargeting scripts), nor do we sell, rent, or monetize visitor telemetry to third-party data brokers.
              </p>
            </section>

            <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-tech font-bold text-white mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We only collect information that you explicitly choose to provide to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm">
                <li>
                  <strong>Consultation &amp; Project Inquiries:</strong> When you submit a project inquiry via our website form, direct email, or WhatsApp, we collect your name, email address, optional telephone/WhatsApp number, company name, and project scope details.
                </li>
                <li>
                  <strong>Machine-Readable API &amp; Agent Interactions:</strong> Automated requests made to our public REST API (<code>/api/v1/*</code>) or Model Context Protocol endpoint (<code>/api/mcp</code>) may record standard HTTP headers and IP addresses strictly for DDoS protection, rate limiting, and server health monitoring on the Vercel Edge network.
                </li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-tech font-bold text-white mb-3">
                3. How We Use Collected Data
              </h2>
              <p>
                Data provided through contact channels is used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm mt-2">
                <li>Evaluate your digital architecture requirements and project scope</li>
                <li>Deliver tailored proposals, technical architecture specifications, and sprint quotes</li>
                <li>Communicate project milestones and deployment updates during active client engagements</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-tech font-bold text-white mb-3">
                4. Data Retention &amp; Your Rights
              </h2>
              <p>
                We retain client inquiry communications only for as long as necessary to fulfill project evaluation or ongoing contractual services. Under international privacy frameworks (including GDPR and CCPA principles), you retain full rights to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-400 text-sm mt-2">
                <li>Request a copy of any personal information we hold regarding your inquiries</li>
                <li>Request the complete deletion or rectification of your contact information</li>
                <li>Opt out of any future correspondence at any time</li>
              </ul>
            </section>

            <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              <h2 className="text-xl font-tech font-bold text-white mb-3">
                5. Contacting the Data Controller
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy, you may contact Mahad Waqar directly:
              </p>
              <div className="mt-4 font-mono text-xs text-zinc-400 space-y-1">
                <p>Data Controller: Muhammad Mahad Waqar Piracha</p>
                <p>Physical Location: DHA Phase 5, Lahore, Punjab 54000, Pakistan</p>
                <p>Email: <a href="mailto:mahad.waqar@gmail.com" className="text-[#DEC1FC] hover:underline">mahad.waqar@gmail.com</a></p>
                <p>WhatsApp: <a href="https://wa.me/923334379962" className="text-[#00B67A] hover:underline">+92 333 4379962</a></p>
              </div>
            </section>
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-xs font-mono text-zinc-500 flex flex-wrap justify-between gap-4">
          <span>&copy; 2026 Muhammad Mahad Waqar Piracha. DHA Phase 5, Lahore, Pakistan.</span>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-zinc-300">About</a>
            <a href="/contact" className="hover:text-zinc-300">Contact</a>
            <a href="/feedback" className="hover:text-zinc-300">Review Portal</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
