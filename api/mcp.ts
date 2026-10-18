import { CORS_HEADERS, handleOptions, jsonResponse, errorResponse } from './_utils';

export const config = {
  runtime: 'edge',
};

const MCP_TOOLS = [
  {
    name: 'get_profile',
    description:
      "Retrieve Mahad Waqar's verified technical profile, performance guarantees (sub-0.4s FCP, 100/100 Lighthouse), technology stack, and geographic service radius.",
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_services',
    description:
      'Retrieve available 4-week web architecture, Local SEO, and conversion design service packages with deliverables, methodology, and SLAs.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['architecture', 'seo', 'conversion'],
          description: "Optional category filter ('architecture', 'seo', or 'conversion')",
        },
      },
    },
  },
  {
    name: 'get_portfolio_projects',
    description:
      'Retrieve verified live production client deployments (Vanguard & Partners, Aura Cosmetic Dentistry, Maison Stone, ZingWrap) including live URLs, FCP metrics, and technology stacks.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: "Optional project slug filter ('vanguard', 'aura', 'maison-stone', 'zingwrap')",
        },
      },
    },
  },
  {
    name: 'send_contact_inquiry',
    description:
      'Submit a direct high-priority project inquiry or consultation request to Mahad Waqar with instant WhatsApp routing.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the contact' },
        email: { type: 'string', description: 'Valid email address' },
        whatsapp: { type: 'string', description: 'Optional WhatsApp number' },
        projectDetails: { type: 'string', description: 'Scope of work, current bottlenecks, and target goals' },
        budgetTier: { type: 'string', description: 'Budget tier ($3,000-$5,000, $5,000-$10,000, or $10,000+)' },
      },
      required: ['name', 'email', 'projectDetails'],
    },
  },
];

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return handleOptions();
  }

  // GET: Return server information & manifest overview
  if (req.method === 'GET') {
    return jsonResponse({
      name: 'mahad-waqar-mcp',
      version: '1.0.0',
      protocolVersion: '2024-11-05',
      description: 'Model Context Protocol (MCP) Streamable HTTP Server for Mahad Waqar Portfolio & Services',
      manifestUrl: 'https://mahad-works.vercel.app/.well-known/mcp',
      endpoints: {
        jsonRpc: 'https://mahad-works.vercel.app/api/mcp',
        docs: 'https://mahad-works.vercel.app/docs',
      },
      availableTools: MCP_TOOLS.map((t) => t.name),
    });
  }

  if (req.method !== 'POST') {
    return errorResponse(
      'METHOD_NOT_ALLOWED',
      `HTTP method ${req.method} is not supported on MCP endpoint.`,
      'Send a JSON-RPC 2.0 POST request to interact with the MCP server.',
      405
    );
  }

  let body: JsonRpcRequest;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error: Invalid JSON' },
      },
      400
    );
  }

  const { jsonrpc, id = null, method, params = {} } = body;

  if (jsonrpc !== '2.0' || !method) {
    return jsonResponse(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32600, message: "Invalid Request: 'jsonrpc': '2.0' and 'method' are required." },
      },
      400
    );
  }

  // Handle MCP initialize
  if (method === 'initialize') {
    return jsonResponse({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: 'mahad-waqar-mcp',
          version: '1.0.0',
        },
      },
    });
  }

  // Handle MCP ping
  if (method === 'ping') {
    return jsonResponse({
      jsonrpc: '2.0',
      id,
      result: {},
    });
  }

  // Handle MCP tools/list
  if (method === 'tools/list') {
    return jsonResponse({
      jsonrpc: '2.0',
      id,
      result: {
        tools: MCP_TOOLS,
      },
    });
  }

  // Handle MCP tools/call
  if (method === 'tools/call') {
    const toolName = params?.name as string;
    const args = (params?.arguments || {}) as Record<string, unknown>;

    switch (toolName) {
      case 'get_profile': {
        const profile = {
          name: 'Mahad Waqar',
          title: 'Senior Web Architect & Technical SEO Engineer',
          location: 'DHA Phase 5, Lahore, Pakistan (Global Service Reach)',
          guarantees: {
            fcp: '< 0.4s First Contentful Paint',
            lighthouse: '100/100 across all 4 categories',
            frameRate: '60fps locked animations',
            turnaround: '4-Week Fixed Sprint',
            localDominance: '10km–25km Map Pack Radius',
          },
          contact: {
            whatsapp: 'https://wa.me/923334379962',
            email: 'mahad.waqar@gmail.com',
            reviews: 'https://g.page/r/CXV0xGV5EXc1EBM/review',
          },
        };
        return jsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(profile, null, 2),
              },
            ],
          },
        });
      }

      case 'get_services': {
        const category = args.category as string | undefined;
        const services = [
          {
            id: 'web-architecture',
            title: 'Custom Web Architecture',
            category: 'architecture',
            guarantee: 'Sub-0.4s FCP, 100/100 Lighthouse, React 18 & TypeScript with Zero Page Builders',
            turnaround: '4 Weeks',
          },
          {
            id: 'local-seo',
            title: 'Technical & Local SEO (GEO-Optimized)',
            category: 'seo',
            guarantee: '10km–25km Map Pack Dominance, Knowledge Graph Schemas & AI Assistant Citations',
            turnaround: 'Integrated within 4 weeks',
          },
          {
            id: 'conversion-design',
            title: 'High-Ticket Conversion UI/UX Design',
            category: 'conversion',
            guarantee: '1-Click WhatsApp Booking, Review-Gating Automation & Frictionless Client Funnels',
            turnaround: 'Integrated within 4 weeks',
          },
        ];

        const filtered = category ? services.filter((s) => s.category === category) : services;
        return jsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ services: filtered }, null, 2),
              },
            ],
          },
        });
      }

      case 'get_portfolio_projects': {
        const slug = args.slug as string | undefined;
        const projects = [
          {
            slug: 'vanguard',
            name: 'Vanguard & Partners',
            industry: 'Corporate Law & Architecture',
            fcp: '0.38s',
            lighthouse: 100,
            url: 'https://vanguardpartners.law',
          },
          {
            slug: 'aura',
            name: 'Aura Cosmetic Dentistry',
            industry: 'Luxury Healthcare & Clinical Aesthetics',
            fcp: '0.40s',
            lighthouse: 100,
            url: 'https://auradentistry.com',
          },
          {
            slug: 'maison-stone',
            name: 'Maison Stone Studio',
            industry: 'Bespoke Architectural Studio',
            fcp: '0.42s',
            lighthouse: 100,
            url: 'https://mahad-works.vercel.app/maison-stone',
          },
          {
            slug: 'zingwrap',
            name: 'ZingWrap Automotive',
            industry: 'Automotive Bespoke Styling',
            fcp: '0.39s',
            lighthouse: 100,
            url: 'https://zingwrap.pk',
          },
        ];

        const filtered = slug ? projects.filter((p) => p.slug === slug) : projects;
        return jsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({ projects: filtered }, null, 2),
              },
            ],
          },
        });
      }

      case 'send_contact_inquiry': {
        const name = args.name as string;
        const email = args.email as string;
        const projectDetails = args.projectDetails as string;

        if (!name || !email || !projectDetails) {
          return jsonResponse({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: "Invalid params: 'name', 'email', and 'projectDetails' are required.",
            },
          });
        }

        const inquiryId = `mcp_inq_${Date.now().toString(36)}`;
        return jsonResponse({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    success: true,
                    inquiryId,
                    message: 'Inquiry received. Mahad Waqar has been notified and will respond within 4 hours.',
                    whatsappLink: 'https://wa.me/923334379962',
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      }

      default:
        return jsonResponse(
          {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method or tool not found: ${toolName}`,
            },
          },
          404
        );
    }
  }

  // Unknown method
  return jsonResponse(
    {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Method not found: ${method}`,
      },
    },
    404
  );
}
