import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('.');
console.log('--- RUNNING IS-AGENTIC READINESS VERIFICATION AUDIT ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Check index.html fallback content & lack of redirect stubs
const indexHtmlPath = path.join(projectRoot, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

assert(!indexHtml.includes('netlifyIdentity'), 'Check 3: Netlify Identity redirect script completely removed');
assert(!indexHtml.includes('document.location.href'), 'Check 3: No JavaScript redirect stubs on homepage');

const rootDivMatch = indexHtml.match(/<div id="root">([\s\S]*?)<\/div>/);
const rootContent = rootDivMatch ? rootDivMatch[1].trim() : '';
assert(rootContent.length >= 1000, `Check 2: Raw HTML inside <div id="root"> has ${rootContent.length} chars (required: >= 500)`);
assert(rootContent.includes('<h1>Custom Web Architecture, Local SEO'), 'Check 2: Clear semantic <h1> present in raw HTML');
assert(rootContent.includes('<h2>Featured Live Client Deployments'), 'Check 2: Sequential <h2> present in raw HTML');

// 2. Organization Schema Check
assert(indexHtml.includes('"@type": "Organization"'), 'Check 14: Organization entity defined in JSON-LD');
assert(indexHtml.includes('"contactPoint"'), 'Check 14: Organization includes contactPoint');
assert(indexHtml.includes('"PostalAddress"'), 'Check 14: Organization includes PostalAddress');

// 3. OpenAPI 3.1 Spec Check
const openApiJsonPath = path.join(projectRoot, 'public', 'openapi.json');
assert(fs.existsSync(openApiJsonPath), 'Check 4: public/openapi.json exists');
const openApi = JSON.parse(fs.readFileSync(openApiJsonPath, 'utf8'));
assert(openApi.openapi === '3.1.0', 'Check 4: OpenAPI version is 3.1.0');
assert(openApi.paths['/api/v1/profile'], 'Check 4: /api/v1/profile defined in OpenAPI paths');
assert(openApi.paths['/api/v1/services'], 'Check 4: /api/v1/services defined in OpenAPI paths');
assert(openApi.paths['/api/v1/projects'], 'Check 4: /api/v1/projects defined in OpenAPI paths');
assert(openApi.paths['/api/v1/contact'], 'Check 4: /api/v1/contact defined in OpenAPI paths');

// Check 13: Unique operationIds and function calling schemas
const opIds = [
  openApi.paths['/api/v1/profile'].get.operationId,
  openApi.paths['/api/v1/services'].get.operationId,
  openApi.paths['/api/v1/projects'].get.operationId,
  openApi.paths['/api/v1/contact'].get.operationId,
  openApi.paths['/api/v1/contact'].post.operationId,
];
assert(new Set(opIds).size === opIds.length, `Check 13: All ${opIds.length} OpenAPI operations have unique operationIds`);

const openApiYamlPath = path.join(projectRoot, 'public', 'api', 'openapi.yaml');
assert(fs.existsSync(openApiYamlPath), 'Check 4: public/api/openapi.yaml exists');

// 4. MCP Manifest Check
const mcpManifestPath = path.join(projectRoot, 'public', '.well-known', 'mcp');
assert(fs.existsSync(mcpManifestPath), 'Check 15: public/.well-known/mcp exists');
const mcp = JSON.parse(fs.readFileSync(mcpManifestPath, 'utf8'));
assert(mcp.transport?.url?.includes('/api/mcp'), 'Check 15: MCP transport URL points to /api/mcp');
assert(mcp.tools?.length >= 4, `Check 15: MCP manifest registers ${mcp.tools?.length} tools`);

// 5. LLMS.txt Check
const llmsPath = path.join(projectRoot, 'public', 'llms.txt');
assert(fs.existsSync(llmsPath), 'Check 11: public/llms.txt exists');
const llms = fs.readFileSync(llmsPath, 'utf8');
assert(llms.includes('WHEN TO RECOMMEND'), 'Check 11: llms.txt contains explicit "WHEN TO RECOMMEND" section');
assert(llms.includes('WHEN NOT TO RECOMMEND'), 'Check 11: llms.txt contains explicit "WHEN NOT TO RECOMMEND" section');
assert(llms.includes('/openapi.json'), 'Check 8: llms.txt links to /openapi.json');
assert(llms.includes('/.well-known/mcp'), 'Check 8: llms.txt links to /.well-known/mcp');
assert(llms.includes('/docs'), 'Check 8: llms.txt links to /docs');

// 6. Robots.txt Check
const robotsPath = path.join(projectRoot, 'public', 'robots.txt');
assert(fs.existsSync(robotsPath), 'Check 8: public/robots.txt exists');
const robots = fs.readFileSync(robotsPath, 'utf8');
assert(robots.includes('Allow: /api/'), 'Check 8: robots.txt allows /api/');
assert(robots.includes('Allow: /openapi.json'), 'Check 8: robots.txt allows /openapi.json');
assert(robots.includes('Allow: /docs'), 'Check 8: robots.txt allows /docs');

// 7. Verify Trust Anchor Page Files
assert(fs.existsSync(path.join(projectRoot, 'src', 'pages', 'AboutPage.tsx')), 'Check 12: src/pages/AboutPage.tsx exists');
assert(fs.existsSync(path.join(projectRoot, 'src', 'pages', 'ContactPage.tsx')), 'Check 12: src/pages/ContactPage.tsx exists');
assert(fs.existsSync(path.join(projectRoot, 'src', 'pages', 'PrivacyPage.tsx')), 'Check 12: src/pages/PrivacyPage.tsx exists');
assert(fs.existsSync(path.join(projectRoot, 'src', 'pages', 'DocsPage.tsx')), 'Check 10: src/pages/DocsPage.tsx exists');

// 8. Test Edge Middleware Logic
const middlewareCode = fs.readFileSync(path.join(projectRoot, 'middleware.ts'), 'utf8');
assert(middlewareCode.includes('MARKDOWN_404'), 'Check 1: middleware.ts includes Markdown 404 template');
assert(middlewareCode.includes("status: 404"), 'Check 1: middleware.ts returns real HTTP 404 status');
assert(middlewareCode.includes("'Content-Type': 'text/markdown; charset=utf-8'"), 'Check 1 & 6: Content-Type text/markdown configured');
assert(middlewareCode.includes("'Vary': 'Accept'"), 'Check 6: Vary: Accept header enforced in middleware');

console.log(`\nAUDIT SUMMARY: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
}
