import { handleOptions, jsonResponse } from './_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  return jsonResponse(
    {
      name: 'Mahad Waqar | High-Performance Web Architecture API',
      version: '1.0.0',
      tagline: 'Custom Web Architecture, Local SEO & Conversion Design for High-Ticket Brands',
      documentation: 'https://mahad-works.vercel.app/docs',
      openapiJson: 'https://mahad-works.vercel.app/openapi.json',
      openapiYaml: 'https://mahad-works.vercel.app/api/openapi.yaml',
      mcpManifest: 'https://mahad-works.vercel.app/.well-known/mcp',
      mcpEndpoint: 'https://mahad-works.vercel.app/api/mcp',
      cliTool: {
        command: 'npx mahad-works',
        docsUrl: 'https://mahad-works.vercel.app/docs#cli',
      },
      rateLimits: {
        standardLimit: '120 req/min',
        headers: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset', 'X-RateLimit-Limit'],
      },
      deprecationPolicy: {
        protocol: 'RFC 8594 Sunset/Deprecation headers',
        noticePeriodDays: 180,
        policyUrl: 'https://mahad-works.vercel.app/docs#versioning',
      },
      endpoints: [
        {
          path: '/api/v1/profile',
          method: 'GET',
          description: 'Architect bio, location coordinates, credentials, and performance guarantees',
        },
        {
          path: '/api/v1/services',
          method: 'GET',
          description: 'Engineering and SEO services with optional ?category=architecture|seo|conversion filter',
        },
        {
          path: '/api/v1/projects',
          method: 'GET',
          description: 'Verified live client deployments with optional ?slug=vanguard|aura|maison-stone|zingwrap',
        },
        {
          path: '/api/v1/contact',
          method: 'GET',
          description: 'Verified direct communication channels (WhatsApp, phone, email, office)',
        },
        {
          path: '/api/v1/contact',
          method: 'POST',
          description: 'Submit client project inquiry or consultation request',
        },
        {
          path: '/api/v1/sandbox',
          method: 'GET, POST',
          description: 'Developer sandbox status, mock test environment, and dry-run instructions',
        },
        {
          path: '/api/v1/auth/demo-key',
          method: 'GET, POST',
          description: 'Self-serve instant demo API key generation without human intervention',
        },
        {
          path: '/api/v1/version',
          method: 'GET',
          description: 'API version lifecycle and RFC 8594 Sunset/Deprecation schedule',
        },
        {
          path: '/api/mcp',
          method: 'GET, POST',
          description: 'Model Context Protocol (MCP) Streamable HTTP JSON-RPC 2.0 server',
        },
      ],
    },
    200,
    {},
    req
  );
}
