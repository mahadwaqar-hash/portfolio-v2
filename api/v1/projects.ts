import { CORS_HEADERS, handleOptions, jsonResponse, errorResponse } from '../_utils';

export const config = {
  runtime: 'edge',
};

const PROJECTS = [
  {
    id: 'vanguard',
    slug: 'vanguard',
    name: 'Vanguard & Partners',
    industry: 'Corporate Law & Architecture',
    url: 'https://vanguardpartners.law',
    fcp: '0.38s',
    lighthouse: 100,
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
    summary:
      'High-ticket corporate law flagship engineered with sub-0.4s FCP, interactive 60fps showroom, and authoritative editorial typography. Built to establish immediate trust for institutional enterprise clients.',
    metrics: {
      loadTime: '0.38s FCP',
      lighthouseScore: 100,
      layoutShift: '0.00 CLS',
      bounceRateReduction: '-42%',
    },
    keyFeatures: [
      'Interactive 60fps showroom with hardware-accelerated preview viewports',
      'Editorial high-contrast typography hierarchy',
      'Sub-0.4s edge delivery with pre-rendered critical CSS',
    ],
  },
  {
    id: 'aura',
    slug: 'aura',
    name: 'Aura Cosmetic Dentistry',
    industry: 'Luxury Healthcare & Clinical Aesthetics',
    url: 'https://auradentistry.com',
    fcp: '0.40s',
    lighthouse: 100,
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'WhatsApp Integration', 'Local SEO Schema'],
    summary:
      'Luxury medical aesthetics and cosmetic dental platform with seamless WhatsApp conversion routing, 100/100 Lighthouse score, and local map pack dominance across a 25km radius.',
    metrics: {
      loadTime: '0.40s FCP',
      lighthouseScore: 100,
      mobileWhatsAppInquiries: '+340%',
      mapPackPosition: '#1 in target radius',
    },
    keyFeatures: [
      '1-Click WhatsApp direct consultation booking',
      'Localized GeoCircle schema covering 25,000m radius',
      'Before/After treatment gallery with zero cumulative layout shift',
    ],
  },
  {
    id: 'maison-stone',
    slug: 'maison-stone',
    name: 'Maison Stone Studio',
    industry: 'Bespoke Architectural Studio & Interior Design',
    url: 'https://mahad-works.vercel.app/maison-stone',
    fcp: '0.42s',
    lighthouse: 100,
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lenis Smooth Scroll'],
    summary:
      'High-end architectural showroom designed with editorial typography, deep dark glass textures, and hardware-accelerated project viewports for bespoke luxury homes.',
    metrics: {
      loadTime: '0.42s FCP',
      lighthouseScore: 100,
      frameRate: '60fps locked',
      engagementTime: '4m 12s average',
    },
    keyFeatures: [
      'Sub-second image and media pre-caching',
      'Deep glassmorphism card layouts',
      'Horizontal inertial gallery with dynamic accent lighting',
    ],
  },
  {
    id: 'zingwrap',
    slug: 'zingwrap',
    name: 'ZingWrap Automotive',
    industry: 'Automotive Bespoke Styling & Luxury Detailing',
    url: 'https://zingwrap.pk',
    fcp: '0.39s',
    lighthouse: 100,
    stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Direct Cart-to-WhatsApp'],
    summary:
      'Automotive bespoke wrapping studio platform with direct cart-to-WhatsApp order dispatch and custom vehicle configuration funnels.',
    metrics: {
      loadTime: '0.39s FCP',
      lighthouseScore: 100,
      leadConversionRate: '2.8x increase',
      interactiveTime: '< 0.5s',
    },
    keyFeatures: [
      'Frictionless quote builder with auto-filled WhatsApp message',
      'Visual material sample selector with instant preview',
      'Local schema markup targeting automotive styling searches',
    ],
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
      'Use HTTP GET to retrieve project case studies.',
      405
    );
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug')?.toLowerCase();

    if (slug) {
      const project = PROJECTS.find((p) => p.slug === slug || p.id === slug);
      if (!project) {
        return errorResponse(
          'PROJECT_NOT_FOUND',
          `No case study found matching slug '${slug}'.`,
          `Valid project slugs are: ${PROJECTS.map((p) => p.slug).join(', ')}.`,
          404,
          {},
          req
        );
      }
      return jsonResponse({ project }, 200, {}, req);
    }

    return jsonResponse({
      projects: PROJECTS,
      count: PROJECTS.length,
      averageFCP: '0.39s',
      averageLighthouse: 100,
    }, 200, {}, req);
  } catch (err: unknown) {
    const error = err as Error;
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      error.message || 'An unexpected error occurred while fetching case studies.',
      'Retry your request or contact mahad.waqar@gmail.com.',
      500,
      {},
      req
    );
  }
}
