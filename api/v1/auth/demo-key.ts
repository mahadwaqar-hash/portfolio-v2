import { handleOptions, jsonResponse, errorResponse } from '../../_utils';

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
      `HTTP method ${req.method} is not supported on this endpoint.`,
      'Use HTTP GET or POST to generate an instant demo API key.',
      405,
      {},
      req
    );
  }

  const timestamp = Date.now();
  const demoKey = `mhd_demo_${Math.random().toString(36).substring(2, 10)}_${timestamp}`;

  return jsonResponse(
    {
      apiKey: demoKey,
      tokenType: 'Bearer',
      tier: 'free_developer_sandbox',
      rateLimit: '120 requests/minute',
      expiresAt: null,
      environment: 'sandbox',
      message: 'Zero-friction self-serve API key generated. Use header "Authorization: Bearer ' + demoKey + '" on all API requests.',
      docsUrl: 'https://mahad-works.vercel.app/docs',
    },
    200,
    { 'X-Environment': 'sandbox' },
    req
  );
}
