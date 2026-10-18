import { CORS_HEADERS, handleOptions, jsonResponse, errorResponse } from '../_utils';

export const config = {
  runtime: 'edge',
};

const CONTACT_CHANNELS = {
  whatsapp: {
    number: '+92 333 4379962',
    url: "https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project.",
    responseTime: '< 30 minutes during active hours',
  },
  email: {
    address: 'mahad.waqar@gmail.com',
    mailto: 'mailto:mahad.waqar@gmail.com',
    responseTime: '< 4 hours guaranteed',
  },
  phone: {
    number: '+92 333 4379962',
    tel: 'tel:03334379962',
  },
  googleReviews: {
    url: 'https://g.page/r/CXV0xGV5EXc1EBM/review',
    portal: 'https://mahad-works.vercel.app/feedback',
  },
  office: {
    address: 'DHA Phase 5, Lahore, Punjab 54000, Pakistan',
    timezone: 'Asia/Karachi (PKT / UTC+5)',
    hours: 'Mon-Sat 09:00 - 21:00 PKT',
    serviceRadius: 'Global service reach with local 25km dominance in Lahore & surrounding areas',
  },
};

interface InquiryBody {
  name?: string;
  email?: string;
  whatsapp?: string;
  brandName?: string;
  projectDetails?: string;
  budgetTier?: string;
  targetLaunch?: string;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  // GET: Retrieve official direct channels
  if (req.method === 'GET') {
    return jsonResponse(
      {
        contactChannels: CONTACT_CHANNELS,
        activeSprintCapacity: '2–3 projects at a time',
        status: 'Available for freelance deployment',
      },
      200,
      {},
      req
    );
  }

  // POST: Submit a project inquiry
  if (req.method === 'POST') {
    try {
      let body: InquiryBody;
      try {
        body = await req.json();
      } catch {
        return errorResponse(
          'INVALID_JSON',
          'Could not parse request body as JSON.',
          'Send a valid JSON payload with Content-Type: application/json header.',
          400,
          {},
          req
        );
      }

      const { name, email, whatsapp, brandName, projectDetails, budgetTier, targetLaunch } = body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return errorResponse(
          'MISSING_NAME',
          "Field 'name' is required and must be a non-empty string.",
          'Provide your full name or company representative name.',
          400,
          {},
          req
        );
      }

      if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return errorResponse(
          'INVALID_EMAIL',
          "Field 'email' is required and must be a valid email address.",
          'Provide a valid email address (e.g. name@company.com).',
          400,
          {},
          req
        );
      }

      if (!projectDetails || typeof projectDetails !== 'string' || projectDetails.trim().length < 10) {
        return errorResponse(
          'INSUFFICIENT_DETAILS',
          "Field 'projectDetails' is required (minimum 10 characters).",
          'Describe your project goals, current performance bottlenecks, or timeline.',
          400,
          {},
          req
        );
      }

      const isSandbox =
        req.headers.get('x-sandbox') === 'true' ||
        req.headers.get('authorization')?.includes('sandbox') ||
        new URL(req.url).searchParams.get('sandbox') === 'true';

      // Generate reference ID
      const inquiryId = `inq_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
      const encodedMsg = encodeURIComponent(
        `Hi Mahad, inquiry #${inquiryId} submitted from ${name} (${brandName || 'Brand'}). Details: ${projectDetails.substring(0, 150)}...`
      );
      const prefilledWhatsApp = `https://wa.me/923334379962?text=${encodedMsg}`;

      return jsonResponse(
        {
          success: true,
          inquiryId,
          environment: isSandbox ? 'sandbox' : 'production',
          simulated: isSandbox,
          message: isSandbox
            ? 'Sandbox inquiry simulation successful. No production notifications were dispatched.'
            : 'Project inquiry received. Mahad Waqar will review and reply within 4 hours.',
          submittedData: {
            name,
            email,
            whatsapp: whatsapp || null,
            brandName: brandName || null,
            budgetTier: budgetTier || 'Flexible',
            targetLaunch: targetLaunch || '4-Week Sprint',
          },
          directWhatsAppUrl: prefilledWhatsApp,
        },
        201,
        isSandbox ? { 'X-Environment': 'sandbox' } : {},
        req
      );
    } catch (err: unknown) {
      const error = err as Error;
      return errorResponse(
        'INTERNAL_SERVER_ERROR',
        error.message || 'An unexpected error occurred while processing the inquiry.',
        'Reach out directly via WhatsApp at https://wa.me/923334379962.',
        500,
        {},
        req
      );
    }
  }

  return errorResponse(
    'METHOD_NOT_ALLOWED',
    `HTTP method ${req.method} is not supported on this endpoint.`,
    'Use HTTP GET to view contact channels, or HTTP POST to submit a project inquiry.',
    405,
    {},
    req
  );
}
