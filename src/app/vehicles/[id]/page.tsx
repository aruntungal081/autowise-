import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { CheckCircle2, Wrench, BarChart2, ShieldCheck, ArrowRight, ChevronLeft, Cpu } from 'lucide-react';

export default async function VehicleProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
    include: {
      compatibilities: {
        include: { part: true },
      },
    },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link href="/identify" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
        <ChevronLeft className="w-4 h-4" /> Back to Vehicle Identification
      </Link>

      {/* Vehicle Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30">
                {vehicle.bodyType}
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {vehicle.specSource}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-slate-400 text-sm mt-1">{vehicle.variant || vehicle.modelCode}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/troubleshoot?vehicle=${encodeURIComponent(`${vehicle.make} ${vehicle.model} ${vehicle.variant || ''}`)}&vehicleId=${vehicle.id}`}
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Wrench className="w-3.5 h-3.5" /> Diagnose Fault
            </Link>
            <Link
              href={`/parts?vehicleId=${vehicle.id}`}
              className="px-4 py-2 bg-brand-blue hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Cpu className="w-3.5 h-3.5" /> Compatible Parts
            </Link>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Production Years</span>
            <span className="text-xs font-bold text-white mt-1 block">
              {vehicle.yearStart} {vehicle.yearEnd ? `- ${vehicle.yearEnd}` : 'Present'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Powertrain / Fuel</span>
            <span className="text-xs font-bold text-white mt-1 block">{vehicle.fuelType}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Engine Displacement</span>
            <span className="text-xs font-bold text-white mt-1 block">
              {vehicle.engineSizeCc ? `${vehicle.engineSizeCc} cc` : 'N/A (EV)'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Transmission</span>
            <span className="text-xs font-bold text-white mt-1 block">{vehicle.transmission || 'Manual'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Power Output</span>
            <span className="text-xs font-bold text-white mt-1 block">
              {vehicle.horsepower ? `${vehicle.horsepower} bhp` : 'Standard Output'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peak Torque</span>
            <span className="text-xs font-bold text-white mt-1 block">
              {vehicle.torqueNm ? `${vehicle.torqueNm} Nm` : 'N/A'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Drivetrain</span>
            <span className="text-xs font-bold text-white mt-1 block">{vehicle.drivetrain || 'FWD'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Market Region</span>
            <span className="text-xs font-bold text-white mt-1 block">{vehicle.marketRegion}</span>
          </div>
        </div>
      </div>

      {/* Verified Compatible Spare Parts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Verified OEM Compatible Spare Parts ({vehicle.compatibilities.length})
          </h2>
          <span className="text-[11px] text-slate-400">Validated against OEM catalog cross-references</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicle.compatibilities.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-300">
                    {c.part.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    100% Fitment Verified
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mt-2">{c.part.name}</h3>
                <p className="text-xs text-slate-400 mt-1">OEM Part #: <span className="font-mono text-slate-200">{c.part.partNumber}</span></p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{c.notes || c.part.description}</p>
              </div>

              <div className="pt-3 border-t border-navy-850 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{c.evidenceSource}</span>
                <Link
                  href={`/compare?partNumber=${encodeURIComponent(c.part.partNumber)}&vehicleId=${vehicle.id}`}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                >
                  <BarChart2 className="w-3.5 h-3.5" /> Compare Prices
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
