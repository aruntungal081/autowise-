import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ShieldAlert, AlertTriangle, CheckCircle2, Wrench, BarChart2, ExternalLink, Printer, ArrowLeft } from 'lucide-react';

export default async function DiagnosticReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await prisma.diagnosticReport.findUnique({
    where: { id },
    include: {
      vehicle: true,
      session: true,
    },
  });

  if (!report) {
    notFound();
  }

  const mostLikelyCauses = JSON.parse(report.mostLikelyCauses || '[]');
  const alternativeCauses = JSON.parse(report.alternativeCauses || '[]');
  const preliminaryChecks = JSON.parse(report.preliminaryChecks || '[]');
  const recommendedTests = JSON.parse(report.recommendedTests || '[]');
  const requiredTools = JSON.parse(report.requiredTools || '[]');
  const recommendedParts = JSON.parse(report.recommendedParts || '[]');
  const referenceLinks = JSON.parse(report.referenceLinks || '[]');

  const isStopDriving = report.safetyLevel === 'stop-driving';
  const isUrgent = report.safetyLevel === 'urgent';
  const isCaution = report.safetyLevel === 'caution';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/troubleshoot" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Back to Troubleshooter
        </Link>
        <div className="text-xs text-slate-400">
          Report ID: <span className="font-mono text-slate-200">{report.id.slice(0, 14)}</span>
        </div>
      </div>

      {/* Critical Stop-Driving Emergency Banner */}
      {isStopDriving && (
        <div className="p-6 rounded-2xl bg-red-950/80 border-2 border-red-500 shadow-2xl animate-pulse space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
                CRITICAL SAFETY WARNING: STOP DRIVING IMMEDIATELY
              </h2>
              <p className="text-xs text-red-200 mt-0.5">
                Immediate mechanical or hydraulic hazard detected. Continued operation poses severe risk of accident or fire.
              </p>
            </div>
          </div>
          <p className="text-xs text-red-100 bg-red-900/60 p-3.5 rounded-xl border border-red-500/30 font-medium">
            {report.safetyWarning}
          </p>
        </div>
      )}

      {/* Urgent Warning Banner */}
      {isUrgent && (
        <div className="p-5 rounded-2xl bg-amber-950/70 border border-amber-500/60 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            URGENT ATTENTION REQUIRED
          </div>
          <p className="text-xs text-amber-200 leading-relaxed">
            {report.safetyWarning}
          </p>
        </div>
      )}

      {/* Main Diagnostic Summary Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-800 pb-5">
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30">
              Diagnostic Report
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Vehicle Fault Evaluation
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Evaluated on {new Date(report.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Safety Severity Badge */}
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block mb-1">Safety Classification</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isStopDriving
                ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                : isUrgent
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                : isCaution
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
            }`}>
              {report.safetyLevel}
            </span>
          </div>
        </div>

        {/* 1. Problem Summary */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Problem Summary</h3>
          <p className="text-sm text-slate-100 font-medium leading-relaxed bg-navy-950 p-4 rounded-xl border border-navy-850">
            {report.summary}
          </p>
        </div>

        {/* 2. Ranked Most Likely Causes */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Most Likely Causes (Ranked by Plausibility)
          </h3>
          <div className="space-y-2.5">
            {mostLikelyCauses.map((item: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-blue/30 text-brand-lightBlue flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    {item.cause}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {item.probability}
                  </span>
                </div>
                <p className="text-xs text-slate-400 pl-7">{item.evidence}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Alternative Causes */}
        {alternativeCauses.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alternative Causes & Uncertainty</h3>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 bg-navy-950 p-3.5 rounded-xl border border-navy-850">
              {alternativeCauses.map((alt: string, idx: number) => (
                <li key={idx}>{alt}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Key Metrics: Cost, Difficulty, Professional Inspection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase block">Indicative Cost Range</span>
            <span className="text-base font-extrabold text-emerald-400 mt-1 block">
              ₹{report.costEstimateMin.toLocaleString()} - ₹{report.costEstimateMax.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400">Region: India (INR)</span>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase block">Repair Difficulty</span>
            <span className="text-sm font-bold text-white mt-1 block">{report.repairDifficulty}</span>
            <span className="text-[10px] text-slate-400">Skill level required</span>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850">
            <span className="text-[10px] text-slate-400 uppercase block">Professional Recommended?</span>
            <span className={`text-sm font-bold mt-1 block ${report.mechanicRecommended ? 'text-amber-400' : 'text-emerald-400'}`}>
              {report.mechanicRecommended ? 'Yes (Certified Mechanic)' : 'No (DIY Possible)'}
            </span>
            <span className="text-[10px] text-slate-400">Based on safety risk</span>
          </div>
        </div>

        {/* Safe Preliminary Checks */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Safe Preliminary DIY Checks</h3>
          <div className="space-y-1.5">
            {preliminaryChecks.map((chk: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-navy-950 p-3 rounded-lg border border-navy-850">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{chk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Tests & Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Diagnostic Steps</h3>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
              {recommendedTests.map((t: string, idx: number) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-brand-lightBlue" /> Required Tools & Equipment
            </h3>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1.5">
              {requiredTools.map((tool: string, idx: number) => (
                <li key={idx}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Replacement Parts & Direct Price Comparison */}
        {recommendedParts.length > 0 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-navy-950 to-navy-900 border border-brand-blue/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-lightBlue" />
                Candidate Replacement Parts
              </h3>
              <span className="text-[11px] text-slate-400">Check cross-retailer pricing</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendedParts.map((partName: string, idx: number) => (
                <Link
                  key={idx}
                  href={`/compare?partNumber=${encodeURIComponent(partName)}`}
                  className="px-3.5 py-2 rounded-xl bg-navy-850 hover:bg-brand-blue/20 border border-navy-700 hover:border-brand-blue/40 text-xs text-white flex items-center gap-2 transition"
                >
                  <span>{partName}</span>
                  <BarChart2 className="w-3.5 h-3.5 text-brand-lightBlue" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {referenceLinks.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authoritative Technical References</h3>
            <div className="flex flex-wrap gap-2">
              {referenceLinks.map((ref: any, idx: number) => (
                <a
                  key={idx}
                  href={ref.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-brand-lightBlue hover:underline bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800"
                >
                  {ref.title} <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
