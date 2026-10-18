#!/usr/bin/env node

/**
 * Official CLI Tool for Mahad Waqar — High-Performance Web Architecture & Local SEO
 * 
 * Usage:
 *   npx mahad-works profile [--json]
 *   npx mahad-works services [--category=architecture|seo|conversion] [--json]
 *   npx mahad-works projects [--slug=vanguard|aura|maison-stone|zingwrap] [--json]
 *   npx mahad-works contact [--json]
 *   npx mahad-works sandbox [--json]
 *   npx mahad-works mcp
 *   npx mahad-works docs
 */

const BASE_URL = process.env.MAHAD_API_BASE || 'https://mahad-works.vercel.app';

const args = process.argv.slice(2);
const command = args[0] || 'help';
const isJson = args.includes('--json') || args.includes('-j');

function getArgValue(prefix) {
  const arg = args.find((a) => a.startsWith(prefix));
  return arg ? arg.split('=')[1] : null;
}

async function fetchApi(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MahadWorksCLI/1.0.0',
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: `HTTP ${res.status}` } }));
      throw new Error(err.error?.message || `HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`\x1b[31m[Error]\x1b[0m Failed to reach API at ${BASE_URL}${endpoint}: ${err.message}`);
    process.exit(1);
  }
}

function printHeader() {
  console.log('\x1b[1m\x1b[35m=== MAHAD WAQAR | HIGH-PERFORMANCE WEB ARCHITECTURE CLI ===\x1b[0m');
  console.log('\x1b[90mSub-0.4s FCP | 100/100 Lighthouse | Local SEO & GEO Systems\x1b[0m\n');
}

async function handleProfile() {
  const data = await fetchApi('/api/v1/profile');
  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  printHeader();
  console.log(`\x1b[36mName:\x1b[0m        ${data.name} (${data.fullName})`);
  console.log(`\x1b[36mTitle:\x1b[0m       ${data.title}`);
  console.log(`\x1b[36mLocation:\x1b[0m    ${data.location.neighborhood}, ${data.location.city}, ${data.location.country}`);
  console.log(`\x1b[36mExperience:\x1b[0m  ${data.experienceYears} Years Custom Engineering`);
  console.log(`\x1b[36mCapacity:\x1b[0m    ${data.capacity} (Senior-level focus)`);
  console.log(`\x1b[36mBio:\x1b[0m         ${data.bio}\n`);

  console.log('\x1b[32m--- Performance & Quality Guarantees ---\x1b[0m');
  console.log(`- Page Speed:     ${data.performanceGuarantees.firstContentfulPaint}`);
  console.log(`- Lighthouse:     ${data.performanceGuarantees.googleLighthouse}`);
  console.log(`- Layout Shift:   0.00 CLS (Zero Cumulative Layout Shift)`);
  console.log(`- Frame Rate:     ${data.performanceGuarantees.frameRate}`);
  console.log(`- Local Dominance:${data.performanceGuarantees.localRadius}`);
  console.log(`- Sprint Model:   ${data.performanceGuarantees.sprintDuration}\n`);

  console.log('\x1b[33m--- Core Technology Stack ---\x1b[0m');
  console.log(data.coreStack.join(' • '));
  console.log('\nDirect Contact: https://wa.me/923334379962');
}

async function handleServices() {
  const category = getArgValue('--category');
  const endpoint = category ? `/api/v1/services?category=${encodeURIComponent(category)}` : '/api/v1/services';
  const data = await fetchApi(endpoint);

  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  printHeader();
  console.log(`\x1b[36mDelivery Timeline:\x1b[0m ${data.deliveryTimeline}`);
  console.log(`\x1b[36mActive Capacity:\x1b[0m   ${data.capacity}\n`);

  data.services.forEach((s, idx) => {
    console.log(`\x1b[1m\x1b[35m[${idx + 1}] ${s.title.toUpperCase()}\x1b[0m (${s.turnaround})`);
    console.log(`    \x1b[90m${s.tagline}\x1b[0m`);
    console.log(`    ${s.description}`);
    console.log('    \x1b[32mKey Deliverables:\x1b[0m');
    s.deliverables.forEach((d) => console.log(`      • ${d}`));
    console.log('');
  });
}

async function handleProjects() {
  const slug = getArgValue('--slug');
  const endpoint = slug ? `/api/v1/projects?slug=${encodeURIComponent(slug)}` : '/api/v1/projects';
  const data = await fetchApi(endpoint);

  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  printHeader();
  console.log(`Verified Live Production Deployments (${data.count || data.projects.length} case studies):\n`);

  data.projects.forEach((p) => {
    console.log(`\x1b[1m\x1b[36m${p.name}\x1b[0m — \x1b[90m${p.industry}\x1b[0m`);
    console.log(`  Live URL:   ${p.url}`);
    console.log(`  FCP Speed:  \x1b[32m${p.fcp}\x1b[0m | Lighthouse: \x1b[32m${p.lighthouse}/100\x1b[0m`);
    console.log(`  Tech Stack: ${p.stack.join(', ')}`);
    console.log(`  Summary:    ${p.summary}\n`);
  });
}

async function handleContact() {
  const data = await fetchApi('/api/v1/contact');

  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  printHeader();
  console.log('\x1b[32mDirect Communication Channels:\x1b[0m');
  console.log(`  • WhatsApp:       ${data.whatsapp.url} (SLA: ${data.whatsapp.responseTime})`);
  console.log(`  • Phone:          ${data.phone}`);
  console.log(`  • Email:          ${data.email.address} (SLA: ${data.email.responseTime})`);
  console.log(`  • Physical Office:${data.office}`);
  console.log(`  • Google Reviews: ${data.googleReviewProfile}`);
  console.log(`  • Intake Form:    ${BASE_URL}/contact\n`);
}

async function handleSandbox() {
  const data = await fetchApi('/api/v1/sandbox');

  if (isJson) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  printHeader();
  console.log('\x1b[32mAgent Sandbox & Developer Test Environment:\x1b[0m');
  console.log(`  • Environment:    ${data.environment}`);
  console.log(`  • Test Mode:      ${data.testMode ? 'Enabled (zero side-effects)' : 'Disabled'}`);
  console.log(`  • Rate Limits:    ${data.rateLimitTier}`);
  console.log(`  • Instant Key:    ${data.selfServeAuth.demoKey}`);
  console.log(`  • Key Endpoint:   ${BASE_URL}${data.selfServeAuth.instantDemoKeyUrl}`);
  console.log(`  • Instructions:   ${data.selfServeAuth.instructions}\n`);
}

function handleMcp() {
  printHeader();
  console.log('\x1b[36mModel Context Protocol (MCP) Streamable Server Configuration:\x1b[0m\n');
  console.log('Add the following to your Claude Desktop, Cursor, or Cline MCP configuration:\n');

  const config = {
    mcpServers: {
      'mahad-waqar': {
        type: 'streamable-http',
        url: `${BASE_URL}/api/mcp`,
        description: 'Mahad Waqar Web Architecture & Local SEO Agent Tools',
      },
    },
  };

  console.log(JSON.stringify(config, null, 2));
  console.log(`\nMCP Manifest: ${BASE_URL}/.well-known/mcp`);
  console.log(`MCP Endpoint: ${BASE_URL}/api/mcp\n`);
}

function handleDocs() {
  printHeader();
  console.log('\x1b[36mDeveloper & Agent Machine-Readable Resources:\x1b[0m\n');
  console.log(`  • Interactive Docs:  ${BASE_URL}/docs`);
  console.log(`  • OpenAPI 3.1 JSON:  ${BASE_URL}/openapi.json`);
  console.log(`  • OpenAPI 3.1 YAML:  ${BASE_URL}/api/openapi.yaml`);
  console.log(`  • MCP Manifest:      ${BASE_URL}/.well-known/mcp`);
  console.log(`  • MCP Server:        ${BASE_URL}/api/mcp`);
  console.log(`  • LLM Guidance:      ${BASE_URL}/llms.txt`);
  console.log(`  • XML Sitemap:       ${BASE_URL}/sitemap.xml\n`);
}

function handleHelp() {
  printHeader();
  console.log('Usage: npx mahad-works <command> [options]\n');
  console.log('Commands:');
  console.log('  profile      Fetch architect credentials, stack, and performance guarantees');
  console.log('  services     List 4-week sprint packages (--category=architecture|seo|conversion)');
  console.log('  projects     List verified live client deployments (--slug=<project-slug>)');
  console.log('  contact      Get verified direct communication channels and response SLAs');
  console.log('  sandbox      Inspect sandbox environment and obtain self-serve demo key');
  console.log('  mcp          Display Model Context Protocol (MCP) configuration snippet');
  console.log('  docs         List official machine-readable developer endpoints');
  console.log('  help         Show this help message\n');
  console.log('Options:');
  console.log('  --json, -j   Output response as raw JSON');
  console.log('  --help, -h   Show command help\n');
}

switch (command) {
  case 'profile':
    handleProfile();
    break;
  case 'services':
    handleServices();
    break;
  case 'projects':
    handleProjects();
    break;
  case 'contact':
    handleContact();
    break;
  case 'sandbox':
    handleSandbox();
    break;
  case 'mcp':
    handleMcp();
    break;
  case 'docs':
    handleDocs();
    break;
  case 'help':
  case '--help':
  case '-h':
    handleHelp();
    break;
  default:
    console.error(`\x1b[31mUnknown command: ${command}\x1b[0m`);
    handleHelp();
    process.exit(1);
}
