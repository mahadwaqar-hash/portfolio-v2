import { CORS_HEADERS, handleOptions, jsonResponse, errorResponse } from '../_utils';

export const config = {
  runtime: 'edge',
};

const SERVICES = [
  {
    id: 'web-architecture',
    title: 'Custom Web Architecture',
    category: 'architecture',
    tagline: 'Sub-0.4s Digital Flagships with Zero Templates',
    description:
      'Line-by-line custom React 18, TypeScript, and modern CSS architecture without heavyweight page builders (WordPress, Elementor, Wix). Delivering perfect 100/100 Lighthouse performance, sub-second interactive viewports, and zero layout shift.',
    deliverables: [
      'Custom React 18 + TypeScript production architecture',
      'Sub-0.4s First Contentful Paint (FCP) guarantee',
      '60fps Framer Motion micro-interactions & Lenis smooth scroll',
      'Vercel Edge Network deployment & asset tree minification',
      'Cross-device responsive polish across mobile, tablet, and desktop viewports',
    ],
    turnaround: '4 Weeks',
    pricingTiers: 'High-ticket bespoke investment ($3,000–$10,000+ depending on scope)',
  },
  {
    id: 'local-seo',
    category: 'seo',
    title: 'Technical & Local SEO (GEO-Optimized)',
    tagline: '10km–25km Map Pack & Generative AI Search Dominance',
    description:
      'Institutional-grade JSON-LD Knowledge Graph schemas, programmatic localized routing, and Core Web Vitals optimization engineered to outrank regional competitors and secure citations in AI search engines (Perplexity, ChatGPT, Claude, Gemini).',
    deliverables: [
      'Deep JSON-LD Schemas (Person, Organization, LocalBusiness, FAQPage, ItemList)',
      'Programmatic localized routing architecture (/[service]-in-[neighborhood])',
      'Google Search Console setup, sitemap indexing, and geo-targeting coordinates',
      'Generative Engine Optimization (GEO) structured for AI assistant citation',
      '6-Month post-launch organic growth roadmap',
    ],
    turnaround: 'Integrated within 4-week sprint',
    pricingTiers: 'Included with Web Architecture Flagships',
  },
  {
    id: 'conversion-design',
    category: 'conversion',
    title: 'High-Ticket Conversion UI/UX Design',
    tagline: 'Frictionless Buyer Journeys & Instant WhatsApp Funnels',
    description:
      'Conversion architecture engineered using Problem-Agitate-Solution (PAS) frameworks, friction-free WhatsApp dispatch, and automated review-gating pipelines that turn high-intent visitors into qualified paying clients.',
    deliverables: [
      'Bespoke conversion copy tuned for high-ticket service decision makers',
      '1-Click WhatsApp booking integration with automated message routing',
      'Automated review-gating & reputation management pipeline (/feedback)',
      'Interactive 3D / glass showroom viewports with hardware-accelerated previews',
      'Sticky high-contrast CTA triggers designed for mobile-first buyers',
    ],
    turnaround: 'Integrated within 4-week sprint',
    pricingTiers: 'Included with Web Architecture Flagships',
  },
];

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  if (req.method !== 'GET') {
    return errorResponse(
      'METHOD_NOT_ALLOWED',
      `HTTP method ${req.method} is not supported on this endpoint.`,
      'Use HTTP GET to retrieve available services.',
      405
    );
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get('category')?.toLowerCase();

    let filtered = SERVICES;
    if (category) {
      const validCategories = ['architecture', 'seo', 'conversion'];
      if (!validCategories.includes(category)) {
        return errorResponse(
          'INVALID_PARAMETER',
          `Unknown category '${category}'. Valid categories are: ${validCategories.join(', ')}.`,
          'Omit the category query parameter to list all services, or filter by a valid category.',
          400
        );
      }
      filtered = SERVICES.filter((s) => s.category === category);
    }

    return jsonResponse({
      services: filtered,
      totalCount: filtered.length,
      deliveryTimeline: '4-Week End-to-End Sprint',
      capacity: '2-3 projects at a time',
      bookingUrl: 'https://mahad-works.vercel.app/contact',
      inquiryApiUrl: 'https://mahad-works.vercel.app/api/v1/contact',
    });
  } catch (err: unknown) {
    const error = err as Error;
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      error.message || 'An unexpected error occurred while fetching services.',
      'Retry your request or contact mahad.waqar@gmail.com.',
      500
    );
  }
}
