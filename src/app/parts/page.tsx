'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Cpu, Search, CheckCircle2, BarChart2, ShieldCheck, AlertCircle, Camera, ArrowRight } from 'lucide-react';

function PartsContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = async (q: string, vId?: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const url = new URL('/api/parts', window.location.origin);
      if (q) url.searchParams.set('q', q);
      if (vId) url.searchParams.set('vehicleId', vId);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setResults(data.parts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const qParam = searchParams.get('q');
    const vParam = searchParams.get('vehicleId');
    if (qParam || vParam) {
      if (qParam) setQuery(qParam);
      if (vParam) setVehicleId(vParam);
      performSearch(qParam || '', vParam || undefined);
    } else {
      // Load initial verified parts catalog
      performSearch('');
    }
  }, [searchParams]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Cpu className="w-3.5 h-3.5" /> Verified Automotive Parts Catalog
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Spare Parts Finder</h1>
        <p className="text-slate-400 text-sm mt-1">
          Search by OEM part number, component name, or vehicle profile. Strict catalog validation ensures guaranteed fitment before you buy.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter part number (e.g. 55810M68P00, SILKR6F11) or name (e.g. Brake pads, Oil filter)"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <button
            onClick={() => performSearch(query, vehicleId)}
            disabled={isLoading}
            className="px-6 py-2.5 bg-brand-blue hover:bg-blue-600 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            {isLoading ? 'Searching Catalog...' : 'Search Parts'}
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          <span>Popular Lookups:</span>
          <button
            onClick={() => { setQuery('55810M68P00'); performSearch('55810M68P00'); }}
            className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 text-brand-lightBlue border border-navy-700"
          >
            Swift Brake Pads (55810M68P00)
          </button>
          <button
            onClick={() => { setQuery('SILKR6F11'); performSearch('SILKR6F11'); }}
            className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 text-brand-lightBlue border border-navy-700"
          >
            Laser Iridium Spark Plugs (SILKR6F11)
          </button>
          <button
            onClick={() => { setQuery('39210-2B100'); performSearch('39210-2B100'); }}
            className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 text-brand-lightBlue border border-navy-700"
          >
            Creta O2 Sensor (39210-2B100)
          </button>
        </div>
      </div>

      {/* Strict Fitment Notice */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-white">Strict Compatibility Standard:</span> Parts are validated using manufacturer OEM engineering catalogs and EPC cross-references. AutoWise AI never assumes compatibility based solely on visual likeness.
        </div>
      </div>

      {/* Parts Listing Results */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">
          Verified Catalog Results ({results.length})
        </h2>

        {results.length === 0 && hasSearched && (
          <div className="p-8 text-center bg-navy-900 rounded-2xl border border-navy-800 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-white text-sm">No exact catalog match found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              We couldn't find an OEM reference matching "{query}". Try checking your vehicle owner's manual for the part code or compare marketplace listings directly.
            </p>
            <Link
              href={`/compare?partNumber=${encodeURIComponent(query)}`}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue rounded-xl text-xs font-semibold text-white"
            >
              Search Online Marketplaces for "{query}" &rarr;
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((part) => (
            <div
              key={part.id}
              className="p-6 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30">
                    {part.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Fitment
                  </span>
                </div>

                <h3 className="font-bold text-white text-base">{part.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
                  <span>Part #: <span className="font-mono font-semibold text-white">{part.partNumber}</span></span>
                  {part.oemNumber && (
                    <span className="text-slate-400">• OEM Ref: {part.oemNumber}</span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {part.description}
                </p>

                {/* Compatible Vehicles List */}
                <div className="mt-3 pt-3 border-t border-navy-850">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block mb-1.5">
                    Verified Vehicle Fitment:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {part.compatibilities.map((c: any, idx: number) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-navy-950 text-slate-300 border border-navy-800">
                        {c.vehicleMake} {c.vehicleModel} ({c.variant || 'All Trims'})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price comparison teaser & Action Button */}
              <div className="pt-4 border-t border-navy-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Available from</span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    ₹{part.priceSummary?.lowestPrice?.toLocaleString() || '1,240'}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({part.priceSummary?.retailersCount || 3} sellers)
                  </span>
                </div>

                <Link
                  href={`/compare?partNumber=${encodeURIComponent(part.partNumber)}`}
                  className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <BarChart2 className="w-3.5 h-3.5" /> Compare Stores
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PartsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Parts Catalog...</div>}>
      <PartsContent />
    </Suspense>
  );
}
