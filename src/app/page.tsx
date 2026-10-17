import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Search, Wrench, BarChart2, ShieldCheck, CheckCircle2, ChevronRight, AlertTriangle, ArrowRight, Activity, Sparkles, Fuel, Zap, Bike } from 'lucide-react';

export default async function HomePage() {
  const vehiclesCount = await prisma.vehicle.count();
  const partsCount = await prisma.sparePart.count();
  const listingsCount = await prisma.retailerListing.count();
  const sampleVehicles = await prisma.vehicle.findMany({ take: 4 });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-navy-900 to-navy-950 border border-navy-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-lightBlue text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-lightBlue" />
            Next-Generation Automotive Diagnostic & Parts Intelligence
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Know Your Vehicle. <br />
            <span className="bg-gradient-to-r from-brand-lightBlue to-blue-500 bg-clip-text text-transparent">
              Diagnose Safely. Save on Parts.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            AutoWise AI identifies cars, motorcycles, and commercial vehicles from VINs, license plates, or photos. Get guided OBD-II troubleshooting, ranked root causes, and transparent spare parts price comparison across Indian and global retailers.
          </p>

          {/* 3 Primary Actions required by Section 9 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <Link
              href="/identify"
              className="flex flex-col p-5 rounded-2xl bg-navy-850/80 border border-brand-blue/40 hover:border-brand-blue hover:bg-navy-800 transition group shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-brand-lightBlue flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white text-base flex items-center justify-between">
                Identify My Vehicle
                <ArrowRight className="w-4 h-4 text-brand-lightBlue group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Decode VIN, registration plate, model code, or upload photos & video frames.
              </p>
            </Link>

            <Link
              href="/troubleshoot"
              className="flex flex-col p-5 rounded-2xl bg-navy-850/80 border border-amber-500/30 hover:border-amber-400 hover:bg-navy-800 transition group shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white text-base flex items-center justify-between">
                Diagnose a Problem
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                AI symptom reasoning, OBD-II error codes, and certified stop-driving safety rules.
              </p>
            </Link>

            <Link
              href="/compare"
              className="flex flex-col p-5 rounded-2xl bg-navy-850/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-navy-800 transition group shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-white text-base flex items-center justify-between">
                Compare Parts Prices
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Real-time price & delivery comparison across Boodmo, Amazon.in, and eBay.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & Methodology Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">Certified Safety</div>
            <div className="text-[11px] text-slate-400">Stop-driving hazard classification</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-3">
          <Activity className="w-8 h-8 text-brand-lightBlue shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">NHTSA vPIC Public API</div>
            <div className="text-[11px] text-slate-400">Free global VIN decoding live</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-cyan-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">Strict Compatibility</div>
            <div className="text-[11px] text-slate-400">No guesswork on spare parts</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">India & Global Retailers</div>
            <div className="text-[11px] text-slate-400">INR pricing & direct store links</div>
          </div>
        </div>
      </section>

      {/* Supported Vehicle Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Supported Vehicle Types</h2>
            <p className="text-xs text-slate-400">Database spans multi-fuel passenger cars, SUVs, EVs, and motorcycles</p>
          </div>
          <Link href="/identify" className="text-xs text-brand-lightBlue hover:underline flex items-center gap-1">
            Browse all vehicles <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleVehicles.map((v) => (
            <Link
              key={v.id}
              href={`/vehicles/${v.id}`}
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-brand-blue/50 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300 border border-navy-700">
                    {v.bodyType}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Specs
                  </span>
                </div>
                <h3 className="font-bold text-white text-base group-hover:text-brand-lightBlue transition">
                  {v.make} {v.model}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{v.variant || v.modelCode}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="bg-navy-950 p-2 rounded-lg border border-navy-850">
                    <span className="block text-slate-400 text-[10px]">Fuel</span>
                    <span className="text-white font-medium">{v.fuelType}</span>
                  </div>
                  <div className="bg-navy-950 p-2 rounded-lg border border-navy-850">
                    <span className="block text-slate-400 text-[10px]">Engine</span>
                    <span className="text-white font-medium">{v.engineSizeCc ? `${v.engineSizeCc} cc` : 'Electric'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-navy-850 flex items-center justify-between text-xs text-brand-lightBlue">
                <span>View Full Specs</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Diagnostic Shortcuts & Common OBD Codes */}
      <section className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Common Diagnostic Scenarios & OBD-II Codes
        </h3>
        <p className="text-xs text-slate-400">
          Click any preset scenario to launch an automated diagnostic simulation and view ranked causes:
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href="/troubleshoot?preset=misfire"
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-xs text-slate-200 transition flex items-center gap-2"
          >
            <span className="font-mono text-amber-400 font-semibold">P0300</span> Random Cylinder Misfire (Shudder & Check Engine)
          </Link>
          <Link
            href="/troubleshoot?preset=catalyst"
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-xs text-slate-200 transition flex items-center gap-2"
          >
            <span className="font-mono text-amber-400 font-semibold">P0420</span> Catalyst System Efficiency Below Threshold
          </Link>
          <Link
            href="/troubleshoot?preset=overheat"
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-red-950/40 border border-red-500/30 text-xs text-red-300 transition flex items-center gap-2"
          >
            <span className="font-mono text-red-400 font-semibold">OVERHEAT</span> Steam under hood & Coolant Boiling (Stop-Driving)
          </Link>
          <Link
            href="/troubleshoot?preset=brakes"
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-red-950/40 border border-red-500/30 text-xs text-red-300 transition flex items-center gap-2"
          >
            <span className="font-mono text-red-400 font-semibold">BRAKES</span> Brake Pedal Spongy / Sink to floor (Stop-Driving)
          </Link>
        </div>
      </section>
    </div>
  );
}
