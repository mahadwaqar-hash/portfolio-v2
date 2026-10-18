import { handleOptions, jsonResponse, errorResponse } from '../_utils';

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
      'Use HTTP GET to retrieve API versioning and deprecation policy.',
      405,
      {},
      req
    );
  }

  return jsonResponse(
    {
      apiVersion: '1.0.0',
      activeVersions: ['v1'],
      lifecycleStatus: 'GA (General Availability)',
      deprecationPolicy: {
        minimumNoticePeriodDays: 180,
        signalingProtocol: 'RFC 8594 Sunset and Deprecation HTTP response headers',
        currentSunsetHeader: 'Wed, 31 Dec 2031 23:59:59 GMT',
        currentDeprecationHeader: '@1956527999',
        guarantee: 'No endpoint in v1 will be removed without a minimum of 180 days advance deprecation signaling.',
        policyDocumentationUrl: 'https://mahad-works.vercel.app/docs#versioning',
      },
      rateLimitPolicy: {
        standardLimit: '120 requests per minute',
        sandboxLimit: '500 requests per minute',
        rateLimitHeaders: [
          'RateLimit-Limit',
          'RateLimit-Remaining',
          'RateLimit-Reset',
          'RateLimit-Policy',
          'X-RateLimit-Limit',
          'X-RateLimit-Remaining',
          'X-RateLimit-Reset',
        ],
        retryAfterOn429: 'Retry-After: 60',
      },
      mcpProtocol: {
        serverUrl: 'https://mahad-works.vercel.app/api/mcp',
        manifestUrl: 'https://mahad-works.vercel.app/.well-known/mcp',
        protocolVersion: '2024-11-05',
        transport: 'streamable-http',
      },
      cliTool: {
        command: 'npx mahad-works',
        docsUrl: 'https://mahad-works.vercel.app/docs#cli',
      },
    },
    200,
    {},
    req
  );
}
