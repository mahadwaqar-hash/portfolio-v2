import React, { useState, useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Mahad Waqar | High-Performance Web Architecture';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    brandName: '',
    projectDetails: '',
    budgetTier: '$5,000 - $10,000',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || 'Failed to submit inquiry.');
      }
      setSubmitSuccess(
        `Thank you ${formData.name}! Your inquiry (#${data.inquiryId}) was received. Mahad Waqar will respond within 4 hours.`
      );
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        brandName: '',
        projectDetails: '',
        budgetTier: '$5,000 - $10,000',
      });
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || 'Error submitting inquiry. Please ping directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <a href="/docs" className="hover:text-white transition-colors">API &amp; Docs</a>
          </div>
        </header>

        <main>
          {/* Eyebrow & Title */}
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00B67A] font-semibold">
              Contact Nexus // Direct Consultation &amp; Intake
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-tech font-black text-white tracking-tighter mt-3 leading-tight">
              Initiate Project Consultation
            </h1>
            <p className="font-body text-base text-zinc-400 mt-3 max-w-xl">
              I partner exclusively with 2–3 clients at a time to engineer sub-second digital flagships and local search domination. Select your preferred channel below.
            </p>
          </div>

          {/* Quick Channels Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {/* WhatsApp */}
            <a
              href="https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00B67A]/50 hover:bg-[#00B67A]/5 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#00B67A] font-bold uppercase tracking-wider">Fastest Direct Route</span>
                <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
              </div>
              <h3 className="text-2xl font-tech font-bold text-white group-hover:text-[#00B67A] transition-colors">
                WhatsApp Direct
              </h3>
              <p className="font-mono text-xs text-zinc-400 mt-2">+92 333 4379962</p>
              <p className="text-xs text-zinc-500 mt-1">Average response time: &lt; 30 minutes</p>
            </a>

            {/* Email */}
            <a
              href="mailto:mahad.waqar@gmail.com"
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#DEC1FC]/50 hover:bg-[#DEC1FC]/5 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#DEC1FC] font-bold uppercase tracking-wider">Formal Inquiries</span>
                <span className="text-zinc-500 font-mono text-xs">SLA: 4h</span>
              </div>
              <h3 className="text-2xl font-tech font-bold text-white group-hover:text-[#DEC1FC] transition-colors">
                Email Dispatch
              </h3>
              <p className="font-mono text-xs text-zinc-400 mt-2">mahad.waqar@gmail.com</p>
              <p className="text-xs text-zinc-500 mt-1">Guaranteed senior response within 4 hours</p>
            </a>
          </div>

          {/* Project Intake Form */}
          <section className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 mb-14">
            <h2 className="text-2xl font-tech font-bold text-white mb-2">
              Structured Project Inquiry
            </h2>
            <p className="text-sm text-zinc-400 mb-8 font-body">
              This form routes directly into Mahad's consultation queue and triggers an automated notification.
            </p>

            {submitSuccess && (
              <div className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                {submitSuccess}
              </div>
            )}

            {submitError && (
              <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">Brand / Company Name</label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    placeholder="e.g. Lumina Health Clinic"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +44 7123 456789"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">Estimated Budget Tier</label>
                <select
                  value={formData.budgetTier}
                  onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                >
                  <option value="$3,000 - $5,000">$3,000 – $5,000 (Focused Architecture Rebuild)</option>
                  <option value="$5,000 - $10,000">$5,000 – $10,000 (Complete 4-Week Flagship &amp; Local SEO)</option>
                  <option value="$10,000+">$10,000+ (Multi-Market Enterprise Platform)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-2 uppercase">Project Scope &amp; Pain Points *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Tell me about your current site, target metrics, and what needs to be engineered..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-[#DEC1FC] font-body text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#DEC1FC] text-black font-tech font-bold text-sm hover:scale-105 transition-transform disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Project Inquiry'}
              </button>
            </form>
          </section>

          {/* Physical Office & Google Reviews */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="font-tech text-xl font-bold text-white">Physical Location</h3>
              <p className="font-mono text-xs text-zinc-400 mt-1">
                DHA Phase 5, Lahore, Punjab 54000, Pakistan
              </p>
              <p className="font-mono text-xs text-zinc-500 mt-1">
                Coordinates: 31.5204° N, 74.3587° E • Geo-Radius: 25km Dominance
              </p>
            </div>
            <a
              href="https://g.page/r/CXV0xGV5EXc1EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-amber-400/40 text-amber-300 font-mono text-xs hover:bg-amber-400/10 transition-colors flex items-center gap-2"
            >
              ★ Google Verified Reviews
            </a>
          </div>
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-xs font-mono text-zinc-500 flex flex-wrap justify-between gap-4">
          <span>&copy; 2026 Muhammad Mahad Waqar Piracha. DHA Phase 5, Lahore, Pakistan.</span>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-zinc-300">Privacy Policy</a>
            <a href="/about" className="hover:text-zinc-300">About</a>
            <a href="/docs" className="hover:text-zinc-300">API Documentation</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
