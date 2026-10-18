import { CORS_HEADERS, handleOptions, jsonResponse, errorResponse } from '../_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  if (req.method !== 'GET') {
    return errorResponse(
      'METHOD_NOT_ALLOWED',
      `HTTP method ${req.method} is not supported on this endpoint.`,
      'Use HTTP GET to retrieve profile information.',
      405
    );
  }

  try {
    const profile = {
      name: 'Mahad Waqar',
      fullName: 'Muhammad Mahad Waqar Piracha',
      title: 'Senior Web Architect & Technical SEO Engineer',
      tagline: 'Custom Web Architecture, Local SEO & Conversion Design for High-Ticket Brands',
      location: {
        neighborhood: 'DHA Phase 5',
        city: 'Lahore',
        region: 'Punjab',
        postalCode: '54000',
        country: 'Pakistan',
        timezone: 'Asia/Karachi (UTC+5)',
        coordinates: {
          latitude: 31.5204,
          longitude: 74.3587,
        },
      },
      bio: 'I engineer sub-second (<0.4s FCP), 100-Lighthouse digital flagships and Local SEO systems in 4 weeks. No generic templates, commodity page builders, or bloated themes—built from scratch to outrank regional competitors and convert high-ticket clients.',
      experienceYears: 6,
      coreStack: [
        'React 18',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Lenis Smooth Scroll',
        'Vercel Edge Network',
        'JSON-LD Structured Schemas',
        'Generative Engine Optimization (GEO)',
      ],
      performanceGuarantees: {
        firstContentfulPaint: '< 0.4s on production edge builds',
        googleLighthouse: '100/100 across Performance, Accessibility, Best Practices, and SEO',
        cumulativeLayoutShift: '0.00 (Zero layout shift)',
        frameRate: '60fps locked animations via GPU transforms',
        localSearchRadius: '10km–25km Map Pack & local search dominance',
        sprintDuration: '4 Weeks fixed delivery timeline',
      },
      capacity: 'Taking on 2–3 client deployments concurrently',
      socialLinks: {
        website: 'https://mahad-works.vercel.app',
        whatsapp: 'https://wa.me/923334379962',
        googleReviews: 'https://g.page/r/CXV0xGV5EXc1EBM/review',
        email: 'mailto:mahad.waqar@gmail.com',
      },
      endpoints: {
        docs: 'https://mahad-works.vercel.app/docs',
        openapi: 'https://mahad-works.vercel.app/openapi.json',
        mcp: 'https://mahad-works.vercel.app/.well-known/mcp',
        services: 'https://mahad-works.vercel.app/api/v1/services',
        projects: 'https://mahad-works.vercel.app/api/v1/projects',
        contact: 'https://mahad-works.vercel.app/api/v1/contact',
      },
    };

    return jsonResponse(profile, 200, {}, req);
  } catch (err: unknown) {
    const error = err as Error;
    return errorResponse(
      'INTERNAL_SERVER_ERROR',
      error.message || 'An unexpected error occurred while fetching the profile.',
      'Retry your request or contact mahad.waqar@gmail.com if the issue persists.',
      500,
      {},
      req
    );
  }
}
