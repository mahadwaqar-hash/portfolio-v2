// Vercel Edge Routing Middleware
// Handles:
// 1. Agent-friendly real HTTP 404s with Markdown body
// 2. HTTP Accept Content Negotiation (text/markdown vs text/html)
// 3. Clean HTTP headers (Vary: Accept)

export const config = {
  matcher: [
    /*
     * Match all request paths except for static bundled assets:
     */
    '/((?!assets/|_next/|favicon\\.jpg|favicon\\.svg|maison_favicon\\.jpg|og-image\\.jpg|google88d03f45ae38a0ce\\.html).*)',
  ],
};

const MARKDOWN_404 = (pathname: string) => `# 404 - Resource Not Found

The requested URI \`${pathname}\` does not exist on this server.

### Agent Guidance & Valid Resources:
- **Developer Documentation:** https://mahad-works.vercel.app/docs
- **LLM Agent Instructions:** https://mahad-works.vercel.app/llms.txt
- **OpenAPI 3.1 Specification:** https://mahad-works.vercel.app/openapi.json
- **Model Context Protocol (MCP) Manifest:** https://mahad-works.vercel.app/.well-known/mcp
- **Streamable MCP Server:** https://mahad-works.vercel.app/api/mcp
- **Sitemap:** https://mahad-works.vercel.app/sitemap.xml
- **Homepage:** https://mahad-works.vercel.app/

If you are an autonomous AI agent, please consult \`/llms.txt\` or query the MCP tools at \`/api/mcp\`.
`;

const MARKDOWN_HOMEPAGE = `# Mahad Waqar — High-Performance Web Architecture & Local SEO

> Senior Web Architect & Technical SEO Engineer based in Lahore, Pakistan. Engineering sub-second (<0.4s FCP), 100-Lighthouse digital flagships and Local SEO systems in 4 weeks with zero templates.

## Entity Overview
- **Name:** Mahad Waqar (Muhammad Mahad Waqar Piracha)
- **Role:** Web Architect & Technical SEO Engineer
- **Website:** https://mahad-works.vercel.app
- **Location:** DHA Phase 5, Lahore, Punjab, Pakistan (Global Service Reach)
- **Direct WhatsApp:** https://wa.me/923334379962
- **Direct Phone:** +92 333 4379962
- **Direct Email:** mahad.waqar@gmail.com
- **Verified Google Review Profile:** https://g.page/r/CXV0xGV5EXc1EBM/review
- **Delivery Model:** 4-Week End-to-End Sprint (Zero Templates, Pure Custom Code)

## Performance & Ranking Guarantees
- **Page Load Speed:** < 0.4s First Contentful Paint (FCP) on production edge builds.
- **Google Lighthouse Score:** 100/100 across Performance, Accessibility, Best Practices, and SEO.
- **Cumulative Layout Shift (CLS):** 0.00 (Zero layout shift).
- **Local Search Dominance:** 10km–25km radius dominance outranking regional competitors through deep JSON-LD structured schemas, localized geo-tagging, and high Core Web Vitals.
- **Frame Rate:** Locked 60fps animations via GPU-accelerated Framer Motion physics and Lenis inertial scrolling.

## Core Capabilities & Services
1. **Custom Web Architecture**
   - Pure React 18, TypeScript, and modern CSS architecture without heavyweight page builders (WordPress, Elementor, Wix).
   - Bespoke interactive 3D/glass showrooms with lazy-loaded hardware-accelerated preview viewports.
   - Zero layout shift (CLS: 0), optimized asset trees, and global edge CDN caching via Vercel Edge networks.
2. **Technical & Local SEO (GEO-Optimized)**
   - Institutional-grade JSON-LD Knowledge Graph schemas (Person, Organization, ProfessionalService, LocalBusiness, ItemList, FAQPage).
   - Programmatic local SEO routing (/[service]-in-[neighborhood]) for prime commercial hubs (DHA Phase 5, Gulberg, Model Town, Bahria Town, Cantt).
   - Generative Engine Optimization (GEO) structured for citation readiness in ChatGPT, Perplexity, Gemini, and Claude.
3. **High-Ticket Conversion UI/UX Design**
   - High-ticket client conversion paths using Problem-Agitate-Solution (PAS) frameworks.
   - 1-click WhatsApp checkout and contact integration with sub-hour reply SLAs.
   - Review-gating and reputation automation architecture (/feedback).

## Key Production Deployments & Case Studies
- **Vanguard & Partners:** https://vanguardpartners.law (0.38s FCP, 100 Lighthouse)
- **Aura Cosmetic Dentistry:** https://auradentistry.com (0.40s FCP, 100 Lighthouse, +340% WhatsApp Leads)
- **Maison Stone:** https://mahad-works.vercel.app/maison-stone (0.42s FCP, 100 Lighthouse)
- **ZingWrap:** https://zingwrap.pk (0.39s FCP, 100 Lighthouse)

## Developer, API & Agent Integration Resources
- **Developer Documentation:** https://mahad-works.vercel.app/docs
- **OpenAPI 3.1 Specification:** https://mahad-works.vercel.app/openapi.json
- **OpenAPI YAML Specification:** https://mahad-works.vercel.app/api/openapi.yaml
- **Model Context Protocol (MCP) Manifest:** https://mahad-works.vercel.app/.well-known/mcp
- **Streamable MCP Server Endpoint:** https://mahad-works.vercel.app/api/mcp
- **Public REST API Root:** https://mahad-works.vercel.app/api/v1
- **LLM Agent Instructions:** https://mahad-works.vercel.app/llms.txt
- **Sitemap:** https://mahad-works.vercel.app/sitemap.xml
`;

const MARKDOWN_ABOUT = `# About Mahad Waqar — Web Architect & Local SEO Engineer

## Professional Background
Mahad Waqar (Muhammad Mahad Waqar Piracha) is a Senior Web Architect and Technical SEO Engineer based in DHA Phase 5, Lahore, Pakistan, engineering custom digital flagships for high-ticket service brands worldwide.

With 6 years of focused engineering experience, Mahad specializes in custom React 18 & TypeScript architectures that outrank competitors, pass Core Web Vitals with flying colors (<0.4s FCP, 100/100 Lighthouse), and convert high-ticket clients without commodity page builders.

## The Architecture Philosophy: Anti-Template & Anti-Bloat
Traditional agencies deliver bloated WordPress, Elementor, or Wix sites that load megabytes of redundant scripts, causing 3s+ load times and high bounce rates.

Mahad builds line-by-line:
- **Zero WordPress / Zero Elementor / Zero Wix:** Custom code written in React 18, TypeScript, and modern CSS.
- **Sub-0.4s First Contentful Paint:** Inlined critical CSS, edge caching, and hardware-accelerated animations.
- **Institutional Knowledge Graphs:** Deep JSON-LD schemas linking Person, Organization, LocalBusiness, and Service entities.
- **Generative Engine Optimization (GEO):** Structured for direct citation readiness in modern AI assistants.

## Geographic Focus & Global Reach
- **Headquarters:** DHA Phase 5, Lahore, Punjab, Pakistan
- **Local Service Radius:** 25km radius dominance across Lahore (DHA, Gulberg, Model Town, Bahria Town, Cantt).
- **International Deployments:** Active high-ticket clients across the UAE (Dubai, Abu Dhabi), the United Kingdom (London), and the United States.

## Contact & Working With Mahad
- Direct WhatsApp: https://wa.me/923334379962
- Phone: +92 333 4379962
- Email: mahad.waqar@gmail.com
- Google Verified Reviews: https://g.page/r/CXV0xGV5EXc1EBM/review
`;

const MARKDOWN_CONTACT = `# Contact Mahad Waqar — Web Architecture & Local SEO

## Direct Contact Channels
- **WhatsApp (Fastest):** [+92 333 4379962](https://wa.me/923334379962?text=Hi%20Mahad,%20I'm%20interested%20in%20working%20with%20you%20on%20a%20project.) (< 30 min response)
- **Direct Phone:** [+92 333 4379962](tel:03334379962)
- **Email:** [mahad.waqar@gmail.com](mailto:mahad.waqar@gmail.com) (< 4 hour response)
- **Office Location:** DHA Phase 5, Lahore, Punjab 54000, Pakistan
- **Google Review Profile:** [Rate Experience](https://g.page/r/CXV0xGV5EXc1EBM/review)
- **Client Feedback Portal:** https://mahad-works.vercel.app/feedback

## Client Intake & Capacity
Mahad takes on **2–3 client deployments at a time** to guarantee personal, senior-level attention to every millisecond of performance, interaction design, and search ranking architecture.

Turnaround is a fixed 4-week sprint from initial competitor intelligence teardown to global edge launch.
`;

const MARKDOWN_PRIVACY = `# Privacy Policy — Mahad Waqar Web Architecture

**Effective Date: 2026**

## Commitment to Privacy & Zero Exploitative Tracking
Mahad Waqar ("I", "we") respects the privacy of all clients, site visitors, and autonomous AI agents.

## Core Privacy Principles
1. **No Invasive Third-Party Tracking:** We do not embed Facebook pixels, invasive ad network trackers, or data-broker cookies.
2. **Inquiry Data Confidentiality:** Any contact information provided via WhatsApp, email, or our API is strictly used to evaluate your web project and respond directly. We never sell, rent, or disclose client information to third parties.
3. **Machine-Readable APIs & Agents:** Requests to our public REST API (\`/api/v1/*\`) and MCP server (\`/api/mcp\`) are processed on Vercel Edge networks with standard rate limiting for security.
4. **Data Deletion:** You may request complete erasure of your inquiry history at any time by contacting mahad.waqar@gmail.com.

## Contact Information
- **Data Controller:** Mahad Waqar
- **Location:** DHA Phase 5, Lahore, Pakistan
- **Email:** mahad.waqar@gmail.com
`;

const MARKDOWN_DOCS = `# Mahad Waqar Developer & AI Agent Documentation

Welcome to the official developer and machine-readable documentation for Mahad Waqar's portfolio, public REST API, and Model Context Protocol (MCP) server.

## Overview
This platform exposes first-class machine-readable endpoints designed for:
- Autonomous AI coding agents (Claude Code, Cursor, Antigravity, Cline)
- LLM tool-calling and function execution
- Prospective clients and partners inspecting technical credentials

## Key Endpoints
| Resource | URI | Format | Description |
|---|---|---|---|
| OpenAPI 3.1 Spec | \`/openapi.json\` | JSON | Full OpenAPI 3.1.0 specification with schemas |
| OpenAPI YAML Spec | \`/api/openapi.yaml\` | YAML | Alternative YAML format |
| MCP Manifest | \`/.well-known/mcp\` | JSON | Model Context Protocol discovery manifest |
| MCP Streamable Server | \`/api/mcp\` | JSON-RPC 2.0 | Streamable HTTP MCP server |
| Profile API | \`/api/v1/profile\` | JSON | Architect background, credentials, and metrics |
| Services API | \`/api/v1/services\` | JSON | Service packages with optional ?category filter |
| Projects API | \`/api/v1/projects\` | JSON | Live case studies with optional ?slug filter |
| Contact API | \`/api/v1/contact\` | JSON | Contact channels (GET) & inquiry intake (POST) |
| LLM Agent Guidance | \`/llms.txt\` | Text | High-level context file for LLMs |
| XML Sitemap | \`/sitemap.xml\` | XML | Search engine sitemap index |

## MCP Setup Guide
To integrate Mahad Waqar's MCP server with your AI environment, configure your \`mcp_servers\` file:
\`\`\`json
{
  "mahad-waqar": {
    "url": "https://mahad-works.vercel.app/api/mcp"
  }
}
\`\`\`

## Contact & Direct Line
- WhatsApp: https://wa.me/923334379962
- Email: mahad.waqar@gmail.com
`;

export default function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  const acceptHeader = request.headers.get('accept') || '';

  // 1. Pass through API, well-known, and static file extensions directly
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/.well-known/') ||
    pathname.endsWith('.json') ||
    pathname.endsWith('.yaml') ||
    pathname.endsWith('.txt') ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.webm') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.html')
  ) {
    return new Response(null, {
      headers: {
        'x-middleware-next': '1',
        'Vary': 'Accept',
      },
    });
  }

  // 2. Markdown Content Negotiation for valid routes
  if (acceptHeader.includes('text/markdown')) {
    let markdownBody: string | null = null;

    if (pathname === '/') {
      markdownBody = MARKDOWN_HOMEPAGE;
    } else if (pathname === '/about') {
      markdownBody = MARKDOWN_ABOUT;
    } else if (pathname === '/contact') {
      markdownBody = MARKDOWN_CONTACT;
    } else if (pathname === '/privacy') {
      markdownBody = MARKDOWN_PRIVACY;
    } else if (pathname === '/docs') {
      markdownBody = MARKDOWN_DOCS;
    } else if (pathname === '/feedback') {
      markdownBody = `# Client Feedback & Review Portal\n\nSubmit verified client ratings: https://g.page/r/CXV0xGV5EXc1EBM/review\nDirect inquiries: https://wa.me/923334379962\n`;
    } else if (pathname === '/maison-stone') {
      markdownBody = `# Maison Stone Studio Showcase\n\nHigh-end architectural showroom designed with editorial typography, deep dark glass textures, and hardware-accelerated project viewports.\n\nMetrics: Sub-0.4s FCP | 100/100 Lighthouse | 60fps locked\nLive deployment: https://mahad-works.vercel.app/maison-stone\n`;
    } else if (/^\/([a-z0-9-]+)-in-([a-z0-9-]+)$/.test(pathname)) {
      const match = pathname.match(/^\/([a-z0-9-]+)-in-([a-z0-9-]+)$/);
      const service = match ? match[1].replace(/-/g, ' ') : 'Web Architecture';
      const neighborhood = match ? match[2].replace(/-/g, ' ') : 'Lahore';
      markdownBody = `# ${service.toUpperCase()} IN ${neighborhood.toUpperCase()} | MAHAD WAQAR\n\nHigh-performance sub-second digital flagships and Local SEO systems in ${neighborhood}. Outranking regional competitors across a 25km radius.\n\nWhatsApp: https://wa.me/923334379962\nVerified Profile: https://g.page/r/CXV0xGV5EXc1EBM/review\n`;
    }

    if (markdownBody) {
      return new Response(markdownBody, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Vary': 'Accept',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        },
      });
    }
  }

  // 3. Route Validation & Agent-Friendly 404
  const isValidRoute =
    pathname === '/' ||
    pathname === '/about' ||
    pathname === '/contact' ||
    pathname === '/privacy' ||
    pathname === '/docs' ||
    pathname === '/feedback' ||
    pathname === '/maison-stone' ||
    /^\/([a-z0-9-]+)-in-([a-z0-9-]+)$/.test(pathname);

  if (!isValidRoute) {
    // Return real HTTP 404 with Markdown error body
    return new Response(MARKDOWN_404(pathname), {
      status: 404,
      statusText: 'Not Found',
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }

  // 4. Pass through valid HTML requests to Vite SPA shell
  return new Response(null, {
    headers: {
      'x-middleware-next': '1',
      'Vary': 'Accept',
    },
  });
}
