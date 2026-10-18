import { CORS_HEADERS, handleOptions, jsonResponse } from './_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  return jsonResponse({
    name: 'Mahad Waqar Web Architecture & Local SEO API',
    version: '1.0.0',
    documentation: 'https://mahad-works.vercel.app/docs',
    openapiJson: 'https://mahad-works.vercel.app/openapi.json',
    openapiYaml: 'https://mahad-works.vercel.app/api/openapi.yaml',
    mcpManifest: 'https://mahad-works.vercel.app/.well-known/mcp',
    mcpEndpoint: 'https://mahad-works.vercel.app/api/mcp',
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
        path: '/api/mcp',
        method: 'POST',
        description: 'Model Context Protocol (MCP) Streamable HTTP JSON-RPC 2.0 server',
      },
    ],
  });
}
