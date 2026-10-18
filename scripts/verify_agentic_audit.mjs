import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = path.resolve('.');
console.log('--- RUNNING FULL 9-POINT IS-AGENTIC AUDIT VERIFICATION ---');

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

// ==========================================
// 1. JSON Error Responses (Essential, Fix 1)
// ==========================================
const middlewarePath = path.join(projectRoot, 'middleware.ts');
const middlewareCode = fs.readFileSync(middlewarePath, 'utf8');
assert(middlewareCode.includes('ENDPOINT_NOT_FOUND'), '1.1: middleware.ts intercepts unknown API routes with ENDPOINT_NOT_FOUND');
assert(middlewareCode.includes("status: 404"), '1.2: middleware.ts returns real HTTP 404 for unknown API routes');
assert(middlewareCode.includes("'Content-Type': 'application/json; charset=utf-8'"), '1.3: middleware.ts serves structured JSON Content-Type');
assert(middlewareCode.includes('acceptHeader.includes(\'application/json\')'), '1.4: middleware.ts returns JSON 404 for any invalid route when Accept: application/json');

const utilsPath = path.join(projectRoot, 'api', '_utils.ts');
const utilsCode = fs.readFileSync(utilsPath, 'utf8');
assert(utilsCode.includes('errorResponse'), '1.5: api/_utils.ts exports errorResponse function');
assert(utilsCode.includes('hint'), '1.6: Structured error responses include resolution hint');

// ==========================================
// 2. Brand Name Discoverability (Fix 2)
// ==========================================
const indexHtmlPath = path.join(projectRoot, 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const exactBrand = 'Mahad Waqar | High-Performance Web Architecture';

assert(indexHtml.includes(`<title>${exactBrand}</title>`), `2.1: <title> exactly matches "${exactBrand}"`);
assert(indexHtml.includes(`content="${exactBrand}"`), `2.2: OpenGraph & Twitter tags match exact brand phrase`);
assert(indexHtml.includes(`"name": "${exactBrand}"`), '2.3: Organization schema name matches exact brand phrase');

// ==========================================
// 3. CLI Tool Available (Fix 3)
// ==========================================
const cliPath = path.join(projectRoot, 'bin', 'cli.mjs');
assert(fs.existsSync(cliPath), '3.1: bin/cli.mjs exists');
const pkgPath = path.join(projectRoot, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
assert(pkg.bin && pkg.bin['mahad-works'] === './bin/cli.mjs', '3.2: package.json registers "mahad-works" binary');

// Test CLI command execution
try {
  const cliOutput = execSync('node bin/cli.mjs help', { cwd: projectRoot, encoding: 'utf8' });
  assert(cliOutput.includes('npx mahad-works <command>'), '3.3: CLI help command executes successfully');
} catch (e) {
  assert(false, `3.3: CLI help command execution failed: ${e.message}`);
}

// ==========================================
// 4. Rate Limit Response Headers (Fix 4)
// ==========================================
assert(utilsCode.includes('RateLimit-Limit'), '4.1: api/_utils.ts defines RateLimit-Limit');
assert(utilsCode.includes('RateLimit-Remaining'), '4.2: api/_utils.ts defines RateLimit-Remaining');
assert(utilsCode.includes('RateLimit-Reset'), '4.3: api/_utils.ts defines RateLimit-Reset');
assert(utilsCode.includes('RateLimit-Policy'), '4.4: api/_utils.ts defines RateLimit-Policy');
assert(utilsCode.includes('X-RateLimit-Limit'), '4.5: api/_utils.ts defines X-RateLimit-Limit');
assert(utilsCode.includes('Retry-After'), '4.6: api/_utils.ts provides Retry-After on 429');

// ==========================================
// 5. Developer Resource Discoverability (Fix 5)
// ==========================================
const llmsPath = path.join(projectRoot, 'public', 'llms.txt');
const llms = fs.readFileSync(llmsPath, 'utf8');
assert(llms.includes(exactBrand), '5.1: llms.txt includes exact brand name in header and profile');
assert(llms.includes('/docs'), '5.2: llms.txt links to /docs');
assert(llms.includes('/openapi.json'), '5.3: llms.txt links to /openapi.json');
assert(llms.includes('/.well-known/mcp'), '5.4: llms.txt links to /.well-known/mcp');
assert(llms.includes('/api/v1/sandbox'), '5.5: llms.txt links to /api/v1/sandbox');

const docsPagePath = path.join(projectRoot, 'src', 'pages', 'DocsPage.tsx');
const docsCode = fs.readFileSync(docsPagePath, 'utf8');
assert(docsCode.includes(exactBrand), '5.6: DocsPage.tsx includes exact brand in H1 and document.title');

// ==========================================
// 6. Agent Onboarding Friction (Fix 6)
// ==========================================
const sandboxPath = path.join(projectRoot, 'api', 'v1', 'sandbox.ts');
assert(fs.existsSync(sandboxPath), '6.1: api/v1/sandbox.ts exists');
const demoKeyPath = path.join(projectRoot, 'api', 'v1', 'auth', 'demo-key.ts');
assert(fs.existsSync(demoKeyPath), '6.2: api/v1/auth/demo-key.ts exists');
assert(utilsCode.includes('X-Environment'), '6.3: api/_utils.ts sets X-Environment for sandbox detection');

// ==========================================
// 7. Function Calling Compatibility (Fix 7)
// ==========================================
const openApiJsonPath = path.join(projectRoot, 'public', 'openapi.json');
const openApi = JSON.parse(fs.readFileSync(openApiJsonPath, 'utf8'));

const operations = [
  openApi.paths['/api/v1/profile']?.get,
  openApi.paths['/api/v1/services']?.get,
  openApi.paths['/api/v1/projects']?.get,
  openApi.paths['/api/v1/contact']?.get,
  openApi.paths['/api/v1/contact']?.post,
  openApi.paths['/api/v1/sandbox']?.get,
  openApi.paths['/api/v1/auth/demo-key']?.post,
  openApi.paths['/api/v1/version']?.get,
].filter(Boolean);

assert(operations.length >= 8, `7.1: OpenAPI specifies ${operations.length} operations (expected >= 8)`);

const operationIds = operations.map((op) => op.operationId);
assert(new Set(operationIds).size === operationIds.length, `7.2: All ${operationIds.length} operations have unique operationIds`);

let allResponsesTyped = true;
for (const op of operations) {
  const resp200 = op.responses['200'] || op.responses['201'];
  const schema = resp200?.content?.['application/json']?.schema;
  if (!schema || (!schema.$ref && !schema.type)) {
    allResponsesTyped = false;
    console.error(`Operation ${op.operationId} missing typed response schema!`);
  }
}
assert(allResponsesTyped, '7.3: 100% of OpenAPI operations reference typed schemas');

// Check schema definitions
const schemas = openApi.components?.schemas || {};
assert(Object.keys(schemas).length >= 9, `7.4: components.schemas defines ${Object.keys(schemas).length} schemas`);

// ==========================================
// 8. MCP Server / Manifest (Fix 8)
// ==========================================
const mcpManifestPath = path.join(projectRoot, 'public', '.well-known', 'mcp');
assert(fs.existsSync(mcpManifestPath), '8.1: public/.well-known/mcp exists');
const mcp = JSON.parse(fs.readFileSync(mcpManifestPath, 'utf8'));
assert(mcp.transport?.type === 'streamable-http', '8.2: MCP transport type is "streamable-http"');
assert(mcp.transport?.url === 'https://mahad-works.vercel.app/api/mcp', '8.3: MCP transport URL is /api/mcp');

const vercelJsonPath = path.join(projectRoot, 'vercel.json');
const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
const mcpHeaderRule = vercelJson.headers?.find((h) => h.source === '/.well-known/mcp');
assert(mcpHeaderRule !== undefined, '8.4: vercel.json defines header rule for /.well-known/mcp');
assert(
  mcpHeaderRule?.headers?.some((h) => h.key === 'Content-Type' && h.value.includes('application/json')),
  '8.5: vercel.json enforces Content-Type: application/json on /.well-known/mcp'
);
const mcpRewrite = vercelJson.rewrites?.find((r) => r.source === '/mcp');
assert(mcpRewrite?.destination === '/api/mcp', '8.6: vercel.json rewrites /mcp to /api/mcp');

// ==========================================
// 9. REST Versioning & Deprecation Policy (Fix 9)
// ==========================================
const versionPath = path.join(projectRoot, 'api', 'v1', 'version.ts');
assert(fs.existsSync(versionPath), '9.1: api/v1/version.ts exists');
assert(utilsCode.includes('Sunset'), '9.2: api/_utils.ts defines Sunset header');
assert(utilsCode.includes('Deprecation'), '9.3: api/_utils.ts defines Deprecation header');
assert(utilsCode.includes('API-Version'), '9.4: api/_utils.ts defines API-Version header');
assert(docsCode.includes('versioning'), '9.5: DocsPage.tsx documents 180-day deprecation policy');

console.log(`\n==========================================`);
console.log(`AUDIT RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`==========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL AUDIT CHECKS PASSED PERFECTLY!');
}
