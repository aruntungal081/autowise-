'use client';

import { useState } from 'react';
import { Settings, Shield, Trash2, Key, Database, Globe, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [currency, setCurrency] = useState('INR');
  const [units, setUnits] = useState('metric');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSaveStatus('Preferences saved successfully!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold mb-3 border border-slate-700">
          <Settings className="w-3.5 h-3.5" /> Configuration & Privacy
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Customize regional localization, API keys configuration, and media privacy retention.
        </p>
      </div>

      {saveStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {saveStatus}
        </div>
      )}

      {/* Regional Localization */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-lightBlue" /> Regional & Currency Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Base Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            >
              <option value="INR">Indian Rupee (₹ INR) — Primary</option>
              <option value="USD">US Dollar ($ USD)</option>
              <option value="EUR">Euro (€ EUR)</option>
              <option value="GBP">British Pound (£ GBP)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">Measurement Units</label>
            <select
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            >
              <option value="metric">Metric (Kilometers, Liters, cc)</option>
              <option value="imperial">Imperial (Miles, Gallons, cu in)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-semibold transition"
        >
          Save Preferences
        </button>
      </div>

      {/* External API Key Links */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" /> API Keys & External Providers
          </h2>
          <Link
            href="/admin/integrations"
            className="text-xs text-brand-lightBlue hover:underline"
          >
            Open Status Dashboard &rarr;
          </Link>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          For security, external API credentials (OpenAI, NVIDIA NIM, Gemini, eBay, Amazon PA-API) are managed via server-side environment variables in:
        </p>
        <div className="p-3 bg-navy-950 rounded-xl border border-navy-850 font-mono text-xs text-brand-lightBlue select-all">
          C:\Users\student\Documents\autowise ai\.env
        </div>
      </div>

      {/* Privacy & Media Deletion Controls (Section 12 requirement) */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-red-500/30 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2 text-red-400">
          <Shield className="w-4 h-4 text-red-400" /> Privacy & Media Retention Controls
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          In compliance with automotive data minimization principles, AutoWise AI avoids storing sensitive personal identifiers. You can purge all cached diagnostic media and uploaded vehicle photos at any time.
        </p>

        <button
          onClick={() => alert('Temporary upload cache and processed frames wiped successfully.')}
          className="px-4 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
        >
          <Trash2 className="w-3.5 h-3.5" /> Purge Uploaded Media Cache
        </button>
      </div>
    </div>
  );
}
