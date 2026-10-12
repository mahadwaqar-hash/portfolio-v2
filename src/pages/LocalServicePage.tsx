import React, { useEffect } from 'react';
import { LOCAL_SERVICES, LAHORE_NEIGHBORHOODS } from '../data/localSeoData';

interface LocalServicePageProps {
  serviceSlug: string;
  neighborhoodSlug: string;
}

export default function LocalServicePage({ serviceSlug, neighborhoodSlug }: LocalServicePageProps) {
  const service = LOCAL_SERVICES[serviceSlug] || LOCAL_SERVICES['web-development'];
  const market = LAHORE_NEIGHBORHOODS[neighborhoodSlug] || LAHORE_NEIGHBORHOODS['dha-phase-5'];

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Dynamic SSR-formula Title Injection
    const title = `${service.title} in ${market.neighborhood} | Mahad Waqar`;
    document.title = title;

    // 2. Dynamic Meta Description Injection
    const metaDesc = document.querySelector("meta[name='description']");
    const descContent = `Looking for ${service.title.toLowerCase()} in ${market.neighborhood}? Engineered by Mahad Waqar with 60fps React physics, sub-0.4s FCP, and local schema dominance. Call +92 333 4379962.`;
    if (metaDesc) {
      metaDesc.setAttribute('content', descContent);
    }

    // 3. Dynamic Canonical Tag Injection
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    const currentUrl = `https://mahad-works.vercel.app/${serviceSlug}-in-${neighborhoodSlug}`;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

    // 4. Dynamic Localized Service Schema Injection
    const scriptId = 'localized-service-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const localizedSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${service.title} in ${market.neighborhood}`,
      serviceType: service.category,
      description: service.description,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Mahad Waqar - Web Developer Lahore',
        telephone: '+923334379962',
        url: 'https://mahad-works.vercel.app',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'DHA Phase 5 Commercial',
          addressLocality: 'Lahore',
          postalCode: market.postalCode,
          addressCountry: 'PK',
        },
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: market.neighborhood,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: market.geo.lat,
          longitude: market.geo.lng,
        },
      },
    };
    script.textContent = JSON.stringify(localizedSchema);

    // Cleanup on unmount
    return () => {
      document.title = 'Website Development Lahore | Premium Web Architecture | Muhammad Mahad Waqar Piracha';
      const rootScript = document.getElementById(scriptId);
      if (rootScript) rootScript.remove();
    };
  }, [service, market, serviceSlug, neighborhoodSlug]);

  return (
    <main className="min-h-screen bg-[#070709] text-white pt-28 pb-20 px-6 md:px-12 lg:px-24 selection:bg-[#DEC1FC] selection:text-[#070709]">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-3 mb-10 text-xs font-mono text-zinc-400" aria-label="Breadcrumb">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <span className="text-zinc-600">{service.serviceSlug}</span>
          <span>/</span>
          <span className="text-[#DEC1FC]">{market.neighborhood}</span>
        </nav>

        {/* Hero Section with Localized H1 */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00B67A] animate-pulse" />
            <span>Serving {market.neighborhood} • {market.landmark}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-tech font-black tracking-tight leading-[1.05] mb-6 text-white">
            {service.title} in <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DEC1FC] via-white to-[#00B67A]">
              {market.neighborhood}
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            {service.description} Engineered specifically for established businesses and founders in {market.neighborhood} seeking to outperform regional competitors in search engine rankings and conversion rates.
          </p>
        </header>

        {/* Deliverables Grid */}
        <section className="mb-16">
          <h2 className="font-tech text-xs uppercase tracking-widest text-zinc-400 mb-6 font-bold">
            Core Architecture Deliverables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl apple-glass-card border border-white/10 flex items-start gap-4">
                <span className="font-mono text-xs text-[#00B67A] font-bold">0{idx + 1}</span>
                <span className="font-tech text-sm text-zinc-200 font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Unique Verified Case Study for This Exact Market (Google Anti-Doorway Defense) */}
        <section className="mb-16 p-8 sm:p-10 rounded-3xl apple-glass-card border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B67A]/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#00B67A] font-semibold">
                Verified Local Case Study • {market.neighborhood}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                {market.clientHighlight.industry}
              </span>
            </div>

            <h3 className="font-tech text-2xl sm:text-3xl font-bold text-white mb-3">
              {market.clientHighlight.clientName}
            </h3>

            <p className="font-body text-sm sm:text-base text-zinc-300 italic mb-6 leading-relaxed">
              "{market.clientHighlight.quote}"
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B67A]/15 border border-[#00B67A]/30 text-xs font-mono text-[#00B67A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B67A]" />
              <span>Result: {market.clientHighlight.result}</span>
            </div>
          </div>
        </section>

        {/* Local Map Coverage Embed */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-tech text-xs uppercase tracking-widest text-zinc-400 font-bold">
              Regional Geographic Coverage Map
            </h2>
            <span className="font-mono text-xs text-zinc-500">
              Center: {market.geo.lat}, {market.geo.lng}
            </span>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 h-80 relative shadow-2xl">
            <iframe
              title={`Service map coverage of ${market.neighborhood}`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(92%) hue-rotate(180deg) contrast(120%)' }}
              loading="lazy"
              src={`https://maps.google.com/maps?q=${market.geo.lat},${market.geo.lng}&z=14&output=embed`}
            />
          </div>
        </section>

        {/* Action Direct Line */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-tech text-2xl sm:text-3xl font-bold text-white mb-2">
              Ready to engineer your {market.neighborhood} flagship?
            </h2>
            <p className="font-body text-xs sm:text-sm text-zinc-400 max-w-md">
              Direct line to Mahad Waqar. Zero agency middlemen, rapid deployment pipeline.
            </p>
          </div>

          <a
            href={`https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20inquiring%20about%20${encodeURIComponent(service.title)}%20in%20${encodeURIComponent(market.neighborhood)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-[#00B67A] text-black font-tech text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors flex-shrink-0"
          >
            WhatsApp Inquiry ↗
          </a>
        </section>

      </div>
    </main>
  );
}
