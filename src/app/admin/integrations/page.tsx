'use client';

import { useState, useEffect } from 'react';
import { Settings, CheckCircle2, AlertTriangle, XCircle, ExternalLink, RefreshCw, Key, ShieldCheck, Database, ShoppingBag } from 'lucide-react';

export default function IntegrationsAdminPage() {
  const [providers, setProviders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [testStatus, setTestStatus] = useState<{ [key: string]: string }>({});

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/integrations');
      const data = await res.json();
      if (data.success) {
        setProviders(data.providers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestProvider = async (providerKey: string) => {
    setTestStatus((prev) => ({ ...prev, [providerKey]: 'Testing...' }));
    try {
      const res = await fetch('/api/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerKey }),
      });
      const data = await res.json();
      setTestStatus((prev) => ({ ...prev, [providerKey]: data.message || 'Check complete' }));
      fetchStatus();
    } catch (err: any) {
      setTestStatus((prev) => ({ ...prev, [providerKey]: 'Test failed' }));
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3" /> Connected & Verified
          </span>
        );
      case 'configured_untested':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <RefreshCw className="w-3 h-3" /> Configured (Untested)
          </span>
        );
      case 'missing_credentials':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Key className="w-3 h-3" /> Missing Credentials
          </span>
        );
      case 'temporarily_unavailable':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
            <AlertTriangle className="w-3 h-3" /> Temporarily Unavailable
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
            <XCircle className="w-3 h-3" /> Unsupported
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-lightBlue text-xs font-semibold mb-3">
          <Settings className="w-3.5 h-3.5" /> System Status & External Integrations
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">API Integrations & Provider Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor connected AI models, vehicle VIN decoders, automotive parts catalogs, and ecommerce price comparison APIs.
        </p>
      </div>

      {/* Guide: Where to paste API Keys */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-brand-blue/40 space-y-4 shadow-xl">
        <div className="flex items-start gap-3">
          <Key className="w-6 h-6 text-brand-lightBlue shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-white">Where to Paste Your API Keys</h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              API keys are stored securely on the server and are <strong>never exposed to client browsers</strong>.
              Open the root project file:
            </p>
            <div className="mt-2 p-3 bg-navy-950 rounded-xl border border-navy-800 font-mono text-xs text-brand-lightBlue select-all">
              C:\Users\student\Documents\autowise ai\.env
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Whenever you update <code className="text-white">.env</code>, save the file and refresh this page to verify live connection.
            </p>
          </div>
        </div>
      </div>

      {/* Provider Status Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Configured Providers & Status</h2>
          <button
            onClick={fetchStatus}
            disabled={isLoading}
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-xs text-slate-300 border border-navy-700 flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh Status
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {providers.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-white text-base">{p.displayName}</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400">
                    {p.category}
                  </span>
                  {getStatusBadge(p.status)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {p.statusReason || 'Operational'}
                </p>

                {testStatus[p.providerKey] && (
                  <div className="text-[11px] text-brand-lightBlue font-medium">
                    Test Result: {testStatus[p.providerKey]}
                  </div>
                )}
              </div>

              {/* Action Buttons & Direct Links to get keys */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {p.setupUrl && (
                  <a
                    href={p.setupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-navy-700 text-xs font-semibold text-brand-lightBlue flex items-center gap-1 transition"
                  >
                    Get API Key <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  onClick={() => handleTestProvider(p.providerKey)}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold transition"
                >
                  Test Ping
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Directory of All Supported API Credentials */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Complete API Keys Directory & Documentation Links
        </h3>
        <p className="text-xs text-slate-400">
          Click the official provider portals below to create an account and generate keys:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">1. OpenAI API Keys (GPT-4o)</strong>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-brand-lightBlue flex items-center gap-1 hover:underline">
                platform.openai.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Paste into: <code className="text-brand-lightBlue">OPENAI_API_KEY</code></p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">2. NVIDIA NIM Cloud Microservices</strong>
              <a href="https://build.nvidia.com/" target="_blank" rel="noreferrer" className="text-brand-lightBlue flex items-center gap-1 hover:underline">
                build.nvidia.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Paste into: <code className="text-brand-lightBlue">NVIDIA_NIM_API_KEY</code></p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">3. Google Gemini API Key</strong>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-brand-lightBlue flex items-center gap-1 hover:underline">
                aistudio.google.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Paste into: <code className="text-brand-lightBlue">GEMINI_API_KEY</code></p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">4. NHTSA vPIC VIN Decoder (Free Public)</strong>
              <a href="https://vpic.nhtsa.dot.gov/api/" target="_blank" rel="noreferrer" className="text-emerald-400 flex items-center gap-1 hover:underline">
                vpic.nhtsa.dot.gov <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Active by default: Zero credentials or fees needed</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">5. eBay Browse API</strong>
              <a href="https://developer.ebay.com/" target="_blank" rel="noreferrer" className="text-brand-lightBlue flex items-center gap-1 hover:underline">
                developer.ebay.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Paste into: <code className="text-brand-lightBlue">EBAY_CLIENT_ID</code> & <code className="text-brand-lightBlue">EBAY_CLIENT_SECRET</code></p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
            <div className="flex items-center justify-between">
              <strong className="text-white">6. Amazon Product Advertising API</strong>
              <a href="https://affiliate-program.amazon.in/" target="_blank" rel="noreferrer" className="text-brand-lightBlue flex items-center gap-1 hover:underline">
                affiliate-program.amazon.in <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-slate-400 text-[11px]">Paste into: <code className="text-brand-lightBlue">AMAZON_PAAPI_ACCESS_KEY</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
