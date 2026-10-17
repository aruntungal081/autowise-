import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Car, Wrench, BarChart2, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default async function SavedGaragePage() {
  const user = await getCurrentUser();

  const savedVehicles = await prisma.savedVehicle.findMany({
    where: user ? { userId: user.id } : undefined,
    include: { vehicle: true },
  });

  const diagnosticReports = await prisma.diagnosticReport.findMany({
    where: user ? { userId: user.id } : undefined,
    orderBy: { createdAt: 'desc' },
    include: { vehicle: true },
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-lightBlue text-xs font-semibold mb-3">
          <Car className="w-3.5 h-3.5" /> Driver's Digital Garage
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Saved Vehicles & Report History</h1>
        <p className="text-slate-400 text-sm mt-1">
          Review your registered automobiles, access past diagnostic evaluations, and resume spare parts comparisons.
        </p>
      </div>

      {/* Saved Vehicles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Car className="w-5 h-5 text-brand-lightBlue" />
            My Registered Vehicles ({savedVehicles.length})
          </h2>
          <Link
            href="/identify"
            className="text-xs text-brand-lightBlue hover:underline flex items-center gap-1"
          >
            + Add New Vehicle
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedVehicles.map((sv) => (
            <div
              key={sv.id}
              className="p-6 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30">
                    {sv.vehicle.bodyType}
                  </span>
                  <h3 className="font-bold text-white text-lg mt-1">{sv.vehicle.make} {sv.vehicle.model}</h3>
                  <p className="text-xs text-slate-400">{sv.vehicle.variant || sv.vehicle.modelCode}</p>
                </div>
                {sv.licenseNo && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-navy-950 text-slate-200 border border-navy-800">
                    {sv.licenseNo}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-850">
                  <span className="text-[10px] text-slate-400 block">Fuel & Engine</span>
                  <span className="font-semibold">{sv.vehicle.fuelType} ({sv.vehicle.engineSizeCc} cc)</span>
                </div>
                <div className="bg-navy-950 p-2.5 rounded-xl border border-navy-850">
                  <span className="text-[10px] text-slate-400 block">Transmission</span>
                  <span className="font-semibold">{sv.vehicle.transmission || 'Manual'}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href={`/vehicles/${sv.vehicle.id}`}
                  className="flex-1 py-2 px-3 text-center bg-navy-800 hover:bg-navy-750 text-white rounded-xl text-xs font-semibold transition"
                >
                  View Specs
                </Link>
                <Link
                  href={`/troubleshoot?vehicle=${encodeURIComponent(`${sv.vehicle.make} ${sv.vehicle.model}`)}&vehicleId=${sv.vehicle.id}`}
                  className="flex-1 py-2 px-3 text-center bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold transition"
                >
                  Diagnose
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Diagnostic Reports Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          Diagnostic Report Archive ({diagnosticReports.length})
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {diagnosticReports.map((r) => (
            <Link
              key={r.id}
              href={`/reports/${r.id}`}
              className="p-5 rounded-2xl bg-navy-900 border border-navy-800 hover:border-navy-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    r.safetyLevel === 'stop-driving'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : r.safetyLevel === 'urgent'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                  }`}>
                    {r.safetyLevel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-brand-lightBlue transition line-clamp-1">
                  {r.summary}
                </h4>
                <p className="text-xs text-slate-400">
                  Estimated Repair: ₹{r.costEstimateMin.toLocaleString()} - ₹{r.costEstimateMax.toLocaleString()} • {r.repairDifficulty}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-brand-lightBlue font-semibold shrink-0">
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
