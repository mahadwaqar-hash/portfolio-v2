import React, { useState, useEffect } from 'react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'cli' | 'mcp' | 'versioning' | 'openapi'>('endpoints');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingEndpoint, setTestingEndpoint] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Mahad Waqar | High-Performance Web Architecture — Developer & Agent Documentation';
    if (window.location.hash === '#versioning') {
      setActiveTab('versioning');
    } else if (window.location.hash === '#cli') {
      setActiveTab('cli');
    } else if (window.location.hash === '#mcp') {
      setActiveTab('mcp');
    }
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const testEndpoint = async (url: string, method = 'GET') => {
    setTestingEndpoint(url);
    setTestResult(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { Accept: 'application/json' },
      });
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
              Developer Hub // Machine-Readable Protocols, CLI &amp; APIs
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-tech font-black text-white tracking-tighter mt-3 leading-tight">
              Mahad Waqar | High-Performance Web Architecture — Developer &amp; Agent API Documentation
            </h1>
            <p className="font-body text-base text-zinc-400 mt-3 max-w-2xl">
              First-class machine-readable endpoints for autonomous AI coding agents, LLM tool callers, and developers inspecting technical architecture, performance guarantees, and case studies.
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
          <div className="flex flex-wrap border-b border-white/10 mb-8 gap-2">
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
              onClick={() => setActiveTab('cli')}
              className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'cli'
                  ? 'border-[#60A5FA] text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Official CLI Tool
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
              onClick={() => setActiveTab('versioning')}
              className={`pb-3 px-4 font-mono text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'versioning'
                  ? 'border-purple-400 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Rate Limits &amp; Deprecation
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
              {/* Endpoint: Profile */}
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
                  Returns architect credentials, coordinates (31.5204° N, 74.3587° E), and verified guarantees (&lt;0.4s FCP, 100/100 Lighthouse).
                </p>
              </div>

              {/* Endpoint: Services */}
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
                  Returns available 4-week service packages with deliverables, turnaround, and SLAs. Supports optional filter <code>?category=architecture|seo|conversion</code>.
                </p>
              </div>

              {/* Endpoint: Projects */}
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

              {/* Endpoint: Contact */}
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
                  <strong>POST:</strong> Submits structured inquiry payload (requires <code>name</code>, <code>email</code>, <code>projectDetails</code>) and returns reference ID with direct WhatsApp link.
                </p>
              </div>

              {/* Endpoint: Sandbox */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 font-mono text-xs font-bold">GET</span>
                    <code className="text-white font-mono text-sm">/api/v1/sandbox</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/sandbox')}
                    disabled={testingEndpoint === '/api/v1/sandbox'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/sandbox' ? 'Calling...' : 'Test Sandbox'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Safe dry-run sandbox environment for AI agents. Provides mock testing credentials and simulated inquiry dispatch without sending notifications.
                </p>
              </div>

              {/* Endpoint: Demo Key */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-[#60A5FA]/20 text-[#60A5FA] font-mono text-xs font-bold">POST</span>
                    <code className="text-white font-mono text-sm">/api/v1/auth/demo-key</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/auth/demo-key', 'POST')}
                    disabled={testingEndpoint === '/api/v1/auth/demo-key'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/auth/demo-key' ? 'Generating...' : 'Get Demo Key'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Instant self-serve developer token generation with zero friction (no credit cards, forms, or sales approval).
                </p>
              </div>

              {/* Endpoint: Version & Deprecation */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded bg-purple-400/20 text-purple-300 font-mono text-xs font-bold">GET</span>
                    <code className="text-white font-mono text-sm">/api/v1/version</code>
                  </div>
                  <button
                    onClick={() => testEndpoint('/api/v1/version')}
                    disabled={testingEndpoint === '/api/v1/version'}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    {testingEndpoint === '/api/v1/version' ? 'Calling...' : 'Inspect Version'}
                  </button>
                </div>
                <p className="text-xs text-zinc-400 font-body">
                  Returns API lifecycle status, active versions, and RFC 8594 Sunset/Deprecation schedule with 180-day advance notice guarantee.
                </p>
              </div>

              {/* Live Test Response Preview */}
              {testResult && (
                <div className="mt-8 p-6 rounded-2xl bg-black border border-[#DEC1FC]/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#DEC1FC]">Live Response Preview</span>
                    <button
                      onClick={() => setTestResult(null)}
                      className="text-xs font-mono text-zinc-500 hover:text-white"
                    >
                      Clear
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-zinc-300 overflow-x-auto max-h-96 p-4 rounded-xl bg-white/[0.02] leading-relaxed">
                    {testResult}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Official CLI Tool */}
          {activeTab === 'cli' && (
            <div id="cli" className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-tech text-xl font-bold text-white mb-2">Zero-Install Official CLI Tool</h3>
                <p className="text-sm text-zinc-400 mb-6 font-body">
                  AI agents and terminal power users can script interactions with this platform directly via <code className="text-[#60A5FA]">npx</code> without manual package installation.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      id: 'cmd-profile',
                      title: 'Fetch Architect Profile & Guarantees',
                      cmd: 'npx mahad-works profile',
                      desc: 'Outputs credentials, location coordinates, stack, and active sprint capacity.',
                    },
                    {
                      id: 'cmd-services',
                      title: 'List 4-Week Sprint Packages',
                      cmd: 'npx mahad-works services --category=architecture',
                      desc: 'Filters packages by architecture, seo, or conversion design.',
                    },
                    {
                      id: 'cmd-projects',
                      title: 'Query Live Case Studies',
                      cmd: 'npx mahad-works projects --slug=vanguard',
                      desc: 'Inspects verified Lighthouse scores, sub-0.4s FCP speed, and live URLs.',
                    },
                    {
                      id: 'cmd-sandbox',
                      title: 'Test Sandbox & Generate Demo Key',
                      cmd: 'npx mahad-works sandbox',
                      desc: 'Outputs safe test mode credentials and dry-run guidelines.',
                    },
                    {
                      id: 'cmd-mcp',
                      title: 'Print MCP Configuration Block',
                      cmd: 'npx mahad-works mcp',
                      desc: 'Generates ready-to-paste JSON config for Claude Desktop, Cursor, and Cline.',
                    },
                    {
                      id: 'cmd-contact',
                      title: 'Inspect Direct Channels & Response SLAs',
                      cmd: 'npx mahad-works contact',
                      desc: 'Prints direct WhatsApp, phone, email, and verified review portals.',
                    },
                  ].map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-semibold text-white">{item.title}</span>
                        <button
                          onClick={() => copyToClipboard(item.cmd, item.id)}
                          className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] transition-colors"
                        >
                          {copiedCmd === item.id ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <code className="block p-2 rounded bg-black font-mono text-xs text-[#60A5FA] mb-1.5 overflow-x-auto">
                        {item.cmd}
                      </code>
                      <span className="text-[11px] text-zinc-400">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Model Context Protocol (MCP) */}
          {activeTab === 'mcp' && (
            <div id="mcp" className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-3 h-3 rounded-full bg-[#00B67A] animate-pulse"></span>
                  <h3 className="font-tech text-xl font-bold text-white">Streamable HTTP MCP Server</h3>
                </div>
                <p className="text-sm text-zinc-400 mb-6 font-body">
                  Connect Mahad Waqar's official Model Context Protocol server to your autonomous agent environment (Claude Desktop, Cursor, Antigravity, Cline) via Streamable HTTP transport.
                </p>

                <div className="mb-6">
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Agent Configuration Block</span>
                  <div className="relative">
                    <pre className="text-xs font-mono text-[#00B67A] p-4 rounded-xl bg-black border border-white/10 overflow-x-auto leading-relaxed">
{`{
  "mcpServers": {
    "mahad-waqar": {
      "type": "streamable-http",
      "url": "https://mahad-works.vercel.app/api/mcp",
      "description": "Mahad Waqar Web Architecture & Local SEO Agent Tools"
    }
  }
}`}
                    </pre>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          JSON.stringify(
                            {
                              mcpServers: {
                                'mahad-waqar': {
                                  type: 'streamable-http',
                                  url: 'https://mahad-works.vercel.app/api/mcp',
                                  description: 'Mahad Waqar Web Architecture & Local SEO Agent Tools',
                                },
                              },
                            },
                            null,
                            2
                          ),
                          'mcp-cfg'
                        )
                      }
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                    >
                      {copiedCmd === 'mcp-cfg' ? 'Copied!' : 'Copy Config'}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-500">Exposed Agent Tools</span>
                  <ul className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">get_profile</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Inspect architect credentials, stack, and guarantees.</p>
                    </li>
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">get_services</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Query 4-week sprint packages and deliverables.</p>
                    </li>
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">get_portfolio_projects</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Review live client deployments and audit metrics.</p>
                    </li>
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">send_contact_inquiry</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Submit high-priority consultation inquiries directly.</p>
                    </li>
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">get_sandbox_info</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Access mock testing mode and instant demo keys.</p>
                    </li>
                    <li className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <strong className="text-white">get_version_policy</strong>
                      <p className="text-zinc-400 text-[11px] mt-1">Verify RFC 8594 Sunset timeline and stability rules.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Rate Limiting & Deprecation Policy */}
          {activeTab === 'versioning' && (
            <div id="versioning" className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-tech text-xl font-bold text-white mb-2">RFC Rate Limiting &amp; Deprecation Policy</h3>
                <p className="text-sm text-zinc-400 mb-6 font-body">
                  Autonomous agents require clear stability guarantees. This platform implements standard RFC rate limiting, real-time throttling headers, and an explicit 180-day deprecation notice policy.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-xs font-mono uppercase tracking-wider text-purple-300 font-bold mb-2">Production Tier</span>
                    <span className="block text-2xl font-tech font-bold text-white mb-1">120 req / min</span>
                    <p className="text-xs text-zinc-400">Standard rate limit across all public endpoints with zero-auth access.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="block text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-2">Sandbox Tier</span>
                    <span className="block text-2xl font-tech font-bold text-white mb-1">500 req / min</span>
                    <p className="text-xs text-zinc-400">High-throughput rate limit for automated testing with header <code>X-Sandbox: true</code>.</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">Standard Headers Returned on All Responses</span>
                  <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs text-zinc-300 space-y-1">
                    <div><span className="text-purple-300">RateLimit-Limit:</span> 120</div>
                    <div><span className="text-purple-300">RateLimit-Remaining:</span> 119</div>
                    <div><span className="text-purple-300">RateLimit-Reset:</span> 60</div>
                    <div><span className="text-purple-300">RateLimit-Policy:</span> &quot;120;w=60&quot;</div>
                    <div><span className="text-purple-300">X-RateLimit-Limit:</span> 120</div>
                    <div><span className="text-purple-300">Retry-After:</span> 60 <span className="text-zinc-500">(Returned on HTTP 429)</span></div>
                    <div><span className="text-purple-300">API-Version:</span> 2026-04-01</div>
                    <div><span className="text-purple-300">Sunset:</span> Wed, 31 Dec 2031 23:59:59 GMT <span className="text-zinc-500">(RFC 8594)</span></div>
                    <div><span className="text-purple-300">Deprecation:</span> @1956527999 <span className="text-zinc-500">(RFC 8594)</span></div>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">180-Day Deprecation Guarantee</span>
                  <p className="text-xs text-zinc-400 leading-relaxed font-body">
                    We guarantee that no endpoint under <code>/api/v1/*</code> will be removed or altered with breaking changes without a minimum of <strong>180 days advance notification</strong> signaled via HTTP <code>Sunset</code> and <code>Deprecation</code> headers and published on this documentation portal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Content Negotiation */}
          {activeTab === 'openapi' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <h3 className="font-tech text-xl font-bold text-white mb-2">HTTP Accept Content Negotiation</h3>
                <p className="text-sm text-zinc-400 mb-6 font-body">
                  Every page on this domain responds conditionally based on the client&apos;s requested MIME type in the <code>Accept</code> header:
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">text/markdown</span>
                      <span className="text-xs font-mono text-white">Accept: text/markdown</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Returns a dense, structured Markdown document optimized for LLM token efficiency, citation indexing, and zero-JS terminal reading.
                    </p>
                    <code className="block mt-2 p-2 rounded bg-black font-mono text-xs text-zinc-400">
                      curl -sS -H &apos;Accept: text/markdown&apos; https://mahad-works.vercel.app/
                    </code>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-[#00B67A]/20 text-[#00B67A] font-mono text-[10px] font-bold">application/json</span>
                      <span className="text-xs font-mono text-white">Accept: application/json</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Returns structured JSON payloads for all <code>/api/v1/*</code> and <code>/.well-known/mcp</code> endpoints. Nonexistent endpoints return structured JSON 404 envelopes with error codes and hints.
                    </p>
                    <code className="block mt-2 p-2 rounded bg-black font-mono text-xs text-zinc-400">
                      curl -sS -H &apos;Accept: application/json&apos; https://mahad-works.vercel.app/api/v1/profile
                    </code>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-zinc-700/50 text-zinc-300 font-mono text-[10px] font-bold">text/html</span>
                      <span className="text-xs font-mono text-white">Accept: text/html</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Returns the high-performance React 18 single-page app shell with complete fallback semantic HTML pre-baked inside <code>&lt;div id=&quot;root&quot;&gt;</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <span>&copy; 2026 Mahad Waqar — Web Architecture &amp; Local SEO</span>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/923334379962" className="text-zinc-400 hover:text-white transition-colors">WhatsApp</a>
            <span>•</span>
            <a href="mailto:mahad.waqar@gmail.com" className="text-zinc-400 hover:text-white transition-colors">Email</a>
            <span>•</span>
            <a href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
