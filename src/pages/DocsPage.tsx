import React, { useState } from 'react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'mcp' | 'openapi'>('endpoints');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);

  const testEndpoint = async (url: string) => {
    setTestingEndpoint(url);
    setTestResult(null);
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (err: unknown) {
      const error = err as Error;
      setTestResult(JSON.stringify({ error: error.message }, null, 2));
    } finally {
      setTestingEndpoint(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#F4F4F5] font-body selection:bg-[#DEC1FC] selection:text-[#070709] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <a
            href="/"
            className="flex items-center gap-3 group text-zinc-300 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white group-hover:bg-[#DEC1FC] group-hover:text-black transition-colors">
              M
            </div>
            <span className="font-tech text-sm tracking-tight font-bold">Mahad Waqar</span>
          </a>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span>/</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </header>

        <main>
          {/* Eyebrow & Title */}
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#DEC1FC] font-semibold">
              Developer Hub // Machine-Readable Protocols &amp; APIs
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-tech font-black text-white tracking-tighter mt-3 leading-tight">
              Developer &amp; Agent API Documentation
            </h1>
            <p className="font-body text-base text-zinc-400 mt-3 max-w-2xl">
              This platform provides first-class machine-readable endpoints for autonomous AI coding agents, LLM tool callers, and developers inspecting technical architecture.
            </p>
          </div>

          {/* Quick Spec Links Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#DEC1FC]/50 hover:bg-white/[0.05] transition-all text-center"
            >
              <span className="block font-tech font-bold text-sm text-white">OpenAPI 3.1</span>
              <span className="block font-mono text-[10px] text-[#DEC1FC] mt-1">/openapi.json</span>
            </a>
            <a
              href="/api/openapi.yaml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00B67A]/50 hover:bg-white/[0.05] transition-all text-center"
            >
              <span className="block font-tech font-bold text-sm text-white">OpenAPI YAML</span>
              <span className="block font-mono text-[10px] text-[#00B67A] mt-1">/api/openapi.yaml</span>
            </a>
            <a
              href="/.well-known/mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-300/50 hover:bg-white/[0.05] transition-all text-center"
            >
              <span className="block font-tech font-bold text-sm text-white">MCP Manifest</span>
              <span className="block font-mono text-[10px] text-amber-300 mt-1">/.well-known/mcp</span>
            </a>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-400/50 hover:bg-white/[0.05] transition-all text-center"
            >
              <span className="block font-tech font-bold text-sm text-white">LLM Context</span>
              <span className="block font-mono text-[10px] text-blue-400 mt-1">/llms.txt</span>
            </a>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 mb-8">
            <button
              onClick={() => setActiveTab('endpoints')}
              className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'endpoints'
                  ? 'border-[#DEC1FC] text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              REST Endpoints (v1)
            </button>
            <button
              onClick={() => setActiveTab('mcp')}
              className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'mcp'
                  ? 'border-[#00B67A] text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Model Context Protocol (MCP)
            </button>
            <button
              onClick={() => setActiveTab('openapi')}
              className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'openapi'
                  ? 'border-amber-300 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Content Negotiation
            </button>
          </div>

          {/* TAB 1: REST Endpoints */}
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              {/* Endpoint 1 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#00B67A]/20 text-[#00B67A] font-mono text-xs font-bold">GET</span>
                    <code className="text-white font-mono text-sm">/api/v1/profile</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/profile')}
                    disabled={testingEndpoint === '/api/v1/profile'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/profile' ? 'Calling...' : 'Live Test'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Returns architect profile, credentials, location coordinates (31.5204° N, 74.3587° E), and verified performance guarantees (&lt;0.4s FCP, 100/100 Lighthouse).
                </p>
              </div>

              {/* Endpoint 2 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#00B67A]/20 text-[#00B67A] font-mono text-xs font-bold">GET</span>
                    <code className="text-white font-mono text-sm">/api/v1/services</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/services')}
                    disabled={testingEndpoint === '/api/v1/services'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/services' ? 'Calling...' : 'Live Test'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Returns available 4-week service packages with deliverables, turnaround, and SLAs. Supports optional query filter <code>?category=architecture|seo|conversion</code>.
                </p>
              </div>

              {/* Endpoint 3 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#00B67A]/20 text-[#00B67A] font-mono text-xs font-bold">GET</span>
                    <code className="text-white font-mono text-sm">/api/v1/projects</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/projects')}
                    disabled={testingEndpoint === '/api/v1/projects'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/projects' ? 'Calling...' : 'Live Test'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Returns verified live client case studies (Vanguard &amp; Partners, Aura Cosmetic Dentistry, Maison Stone, ZingWrap) with FCP, Lighthouse scores, and live URLs. Supports <code>?slug=vanguard</code>.
                </p>
              </div>

              {/* Endpoint 4 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#00B67A]/20 text-[#00B67A] font-mono text-xs font-bold">GET</span>
                    <span className="px-2.5 py-1 rounded bg-[#DEC1FC]/20 text-[#DEC1FC] font-mono text-xs font-bold">POST</span>
                    <code className="text-white font-mono text-sm">/api/v1/contact</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/contact')}
                    disabled={testingEndpoint === '/api/v1/contact'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/contact' ? 'Calling...' : 'Test GET'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  <strong>GET:</strong> Lists official direct communication channels and SLAs.<br />
                  <strong>POST:</strong> Submits structured client inquiry payload (requires <code>name</code>, <code>email</code>, <code>projectDetails</code>) and returns reference ID with direct WhatsApp link.
                </p>
              </div>

              {/* Live Test Response Preview */}
              {testResult && (
                <div className="p-6 rounded-2xl bg-black/80 border border-[#DEC1FC]/30 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs text-[#DEC1FC] font-bold">Live API Response:</span>
                    <button
                      onClick={() => setTestResult(null)}
                      className="text-zinc-500 hover:text-white font-mono text-xs"
                    >
                      Clear
                    </button>
                  </div>
                  <pre className="font-mono text-xs text-zinc-300 overflow-x-auto max-h-96 p-4 rounded-xl bg-black/60 border border-white/5">
                    {testResult}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Model Context Protocol (MCP) */}
          {activeTab === 'mcp' && (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="text-2xl font-tech font-bold text-white mb-3">
                  MCP Streamable HTTP Server
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-body">
                  This website implements the official <strong>Model Context Protocol (MCP)</strong> over streamable HTTP. Autonomous AI agents can query live portfolio data and execute tools using JSON-RPC 2.0.
                </p>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 mb-6">
                  <p className="text-zinc-500 mb-2">// Configuration for Claude Code / Cursor / Antigravity (mcp_servers):</p>
                  <pre className="text-emerald-300">{`{
  "mcpServers": {
    "mahad-waqar": {
      "url": "https://mahad-works.vercel.app/api/mcp"
    }
  }
}`}</pre>
                </div>

                <h3 className="font-tech text-lg font-bold text-white mb-3">Supported MCP Tools:</h3>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-[#00B67A] font-bold">get_profile</span>: Fetch architect credentials, performance guarantees, and contact links.
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-[#DEC1FC] font-bold">get_services</span>: List service packages with optional category filter.
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-amber-300 font-bold">get_portfolio_projects</span>: Query case studies and verified metrics.
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <span className="text-blue-400 font-bold">send_contact_inquiry</span>: Dispatch client consultation requests directly to Mahad Waqar.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Content Negotiation */}
          {activeTab === 'openapi' && (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <h2 className="text-2xl font-tech font-bold text-white mb-3">
                  Markdown Content Negotiation
                </h2>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-body">
                  All major pages on this domain support HTTP Content Negotiation via the <code>Accept: text/markdown</code> header. AI crawlers and LLM agents can request raw Markdown without downloading heavyweight client-side JavaScript or rendering DOM trees.
                </p>

                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300">
                  <p className="text-zinc-500 mb-2">// Test with curl:</p>
                  <pre className="text-[#DEC1FC]">{`curl -sS -L -i -H 'Accept: text/markdown' https://mahad-works.vercel.app/
curl -sS -L -i -H 'Accept: text/markdown' https://mahad-works.vercel.app/about
curl -sS -L -i -H 'Accept: text/markdown' https://mahad-works.vercel.app/contact`}</pre>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-20 pt-8 border-t border-white/10 text-xs font-mono text-zinc-500 flex flex-wrap justify-between gap-4">
          <span>&copy; 2026 Muhammad Mahad Waqar Piracha. DHA Phase 5, Lahore, Pakistan.</span>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-zinc-300">About</a>
            <a href="/contact" className="hover:text-zinc-300">Contact</a>
            <a href="/privacy" className="hover:text-zinc-300">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
