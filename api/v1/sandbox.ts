import { handleOptions, jsonResponse, errorResponse } from '../_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return errorResponse(
      'METHOD_NOT_ALLOWED',
      `HTTP method ${req.method} is not supported on the sandbox endpoint.`,
      'Use HTTP GET to inspect sandbox configuration or POST to execute a dry-run test.',
      405,
      {},
      req
    );
  }

  const sandboxPayload = {
    environment: 'sandbox',
    status: 'ready',
    testMode: true,
    description: 'Safe dry-run sandbox and zero-friction developer testing environment for Mahad Waqar APIs and agent tools.',
    rateLimitTier: 'unlimited_sandbox (500 req/min)',
    sandboxHeaders: {
      activationHeader: 'X-Sandbox: true',
      authBearerHeader: 'Authorization: Bearer mhd_sandbox_demo_token_unlimited',
      queryParamFallback: '?sandbox=true',
    },
    selfServeAuth: {
      instantDemoKeyUrl: '/api/v1/auth/demo-key',
      demoKey: 'mhd_sandbox_demo_token_unlimited',
      instructions: 'No sales call or credit card required. Pass header Authorization: Bearer mhd_sandbox_demo_token_unlimited or X-Sandbox: true for immediate zero-friction agent operations.',
    },
    mockEndpoints: {
      profile: 'https://mahad-works.vercel.app/api/v1/profile?sandbox=true',
      services: 'https://mahad-works.vercel.app/api/v1/services?sandbox=true',
      projects: 'https://mahad-works.vercel.app/api/v1/projects?sandbox=true',
      contact: 'https://mahad-works.vercel.app/api/v1/contact?sandbox=true',
      inquiryDryRun: 'POST https://mahad-works.vercel.app/api/v1/contact (simulates intake without real WhatsApp dispatch)',
    },
    verifiedGuarantees: {
      subSecondFcp: true,
      perfectLighthouse100: true,
      zeroLayoutShift: true,
      sixtyFpsPhysics: true,
    },
  };

  return jsonResponse(sandboxPayload, 200, { 'X-Environment': 'sandbox' }, req);
}
