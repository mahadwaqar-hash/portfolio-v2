export interface LocalMarketData {
  neighborhood: string;
  neighborhoodSlug: string;
  landmark: string;
  distanceDriveMinutes: number;
  postalCode: string;
  geo: {
    lat: number;
    lng: number;
  };
  clientHighlight: {
    clientName: string;
    industry: string;
    result: string;
    quote: string;
  };
}

export interface LocalServiceData {
  title: string;
  serviceSlug: string;
  category: string;
  description: string;
  deliverables: string[];
}

export const LOCAL_SERVICES: Record<string, LocalServiceData> = {
  'web-development': {
    serviceSlug: 'web-development',
    title: 'Custom Website Development',
    category: 'Software & Web Development',
    description: 'Bespoke React 18 & TypeScript digital flagships engineered with 60fps Framer Motion physics, sub-0.4s FCP, and brutalist luxury aesthetics.',
    deliverables: ['Custom React Architecture', 'Lenis Smooth Inertial Scroll', 'Mobile-First Viewport Calibration', 'Sub-0.4s First Contentful Paint'],
  },
  'local-seo': {
    serviceSlug: 'local-seo',
    title: 'Technical Local SEO Architecture',
    category: 'Search Engine Optimization',
    description: 'Radius-concentric JSON-LD schema, Core Web Vitals optimization, and Google Maps 3-Pack domination engines designed to outrank regional competitors.',
    deliverables: ['GeoCircle Radius Domination', 'Structured LocalBusiness & FAQ Schema', 'Core Web Vitals Optimization', 'Google Business Profile Alignment'],
  },
  'ecommerce-development': {
    serviceSlug: 'ecommerce-development',
    title: 'WhatsApp E-Commerce Systems',
    category: 'E-Commerce Solutions',
    description: 'High-conversion, zero-fee direct-to-WhatsApp cart pipelines designed for frictionless mobile ordering and maximum checkout velocity.',
    deliverables: ['1-Click WhatsApp Direct Checkout', 'Zero Marketplace Commission Fees', 'Real-time Cart State Management', 'High-Ticket Conversion Copy'],
  },
};

export const LAHORE_NEIGHBORHOODS: Record<string, LocalMarketData> = {
  'dha-phase-5': {
    neighborhood: 'DHA Phase 5, Lahore',
    neighborhoodSlug: 'dha-phase-5',
    landmark: 'LUMS & Phase 5 Commercial Sector',
    distanceDriveMinutes: 0,
    postalCode: '54792',
    geo: { lat: 31.4697, lng: 74.4074 },
    clientHighlight: {
      clientName: 'Maison Stone Architecture',
      industry: 'Haute Couture Interior Design',
      result: 'Ranked #1 for luxury architectural design across DHA Lahore',
      quote: 'The cinematic speed and bespoke aesthetic immediately elevated our brand above commodity builders.',
    },
  },
  'gulberg': {
    neighborhood: 'Gulberg, Lahore',
    neighborhoodSlug: 'gulberg',
    landmark: 'Main Boulevard & MM Alam Road',
    distanceDriveMinutes: 12,
    postalCode: '54660',
    geo: { lat: 31.5204, lng: 74.3587 },
    clientHighlight: {
      clientName: 'Vanguard & Partners',
      industry: 'Corporate Law Firm',
      result: '340% increase in high-ticket cross-border retainer inquiries from Gulberg',
      quote: 'Mahad engineered a digital presence that commands authority with international enterprise clients.',
    },
  },
  'bahria-town': {
    neighborhood: 'Bahria Town, Lahore',
    neighborhoodSlug: 'bahria-town',
    landmark: 'Eiffel Tower Replica & Sector C Commercial',
    distanceDriveMinutes: 25,
    postalCode: '53720',
    geo: { lat: 31.3685, lng: 74.1802 },
    clientHighlight: {
      clientName: 'Aura Cosmetic Dentistry',
      industry: 'Medical Aesthetics',
      result: '42 high-value cosmetic procedure bookings in month one',
      quote: 'Our patients regularly tell us the website feels more like an editorial art piece than a dental clinic.',
    },
  },
  'model-town': {
    neighborhood: 'Model Town, Lahore',
    neighborhoodSlug: 'model-town',
    landmark: 'Model Town Park & Central Commercial Market',
    distanceDriveMinutes: 15,
    postalCode: '54700',
    geo: { lat: 31.4883, lng: 74.3213 },
    clientHighlight: {
      clientName: 'Zing & Wrap QSR',
      industry: 'Direct WhatsApp Commerce',
      result: 'Over 1,200 orders processed with zero aggregator commission fees',
      quote: 'The 1-click WhatsApp cart system immediately doubled our repeat delivery conversion rate.',
    },
  },
};
