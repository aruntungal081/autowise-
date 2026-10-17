import Link from 'next/link';
import { ShieldAlert, AlertTriangle, CheckCircle2, PhoneCall, HelpCircle, Flame, Droplets, Gauge } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
          <ShieldAlert className="w-3.5 h-3.5" /> Safety First Standard
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Automotive Safety Protocols & Limitations</h1>
        <p className="text-slate-400 text-sm mt-1">
          AutoWise AI is designed with strict automotive safety guardrails. Understand our fault classification system, emergency procedures, and operating limitations.
        </p>
      </div>

      {/* Immediate Stop-Driving Scenarios */}
      <div className="p-6 sm:p-8 rounded-2xl bg-red-950/70 border-2 border-red-500/80 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              Immediate Stop-Driving Triggers
            </h2>
            <p className="text-xs text-red-200">
              If your vehicle exhibits any of the following symptoms, safely pull over to the shoulder, turn off the engine, and seek professional assistance:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/30 text-red-100 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Hydraulic Brake Failure</strong>
              Brake pedal sinks to floor, sudden loss of braking distance, or red brake warning lamp on.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/30 text-red-100 flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Active Smoke or Fire</strong>
              Visible smoke from under the hood, passenger cabin, or persistent strong gasoline odor.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/30 text-red-100 flex items-start gap-2.5">
            <Gauge className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Catastrophic Overheating</strong>
              Steam billowing from radiator, temperature gauge in red, or coolant boiling into reservoir.
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-red-900/60 border border-red-500/30 text-red-100 flex items-start gap-2.5">
            <Droplets className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Steering & Suspension Detachment</strong>
              Steering wheel locks, violent wheel wobble, or broken ball joint / tie rod.
            </div>
          </div>
        </div>
      </div>

      {/* Safety Level Classification */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <h2 className="text-base font-bold text-white">Fault Severity Classification Matrix</h2>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 uppercase shrink-0">
              Stop-Driving
            </span>
            <p className="text-slate-300 leading-relaxed">
              Immediate danger to occupants or severe mechanical destruction imminent. Do not drive under any circumstances. Tow truck required.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase shrink-0">
              Urgent
            </span>
            <p className="text-slate-300 leading-relaxed">
              Active misfire (flashing check engine light), charging system failure, or low oil pressure. Drive only minimal distance directly to a repair station.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 uppercase shrink-0">
              Caution
            </span>
            <p className="text-slate-300 leading-relaxed">
              Steady check engine light (emissions, oxygen sensor, EVAP), worn brake pads with squealers, suspension squeaks. Safe for short routine commute, plan inspection soon.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-navy-850 flex items-start gap-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase shrink-0">
              Informational
            </span>
            <p className="text-slate-300 leading-relaxed">
              Maintenance reminder reset, washer fluid low, key fob battery replacement, routine cosmetic inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Prohibitions & Ethics */}
      <div className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-3">
        <h2 className="text-base font-bold text-white">Safety Safeguards & Engineering Limitations</h2>
        <ul className="list-disc list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
          <li>
            <strong>Airbags & SRS:</strong> AutoWise AI will never instruct unqualified individuals to dismantle airbag inflators, pretensioners, or crash sensors.
          </li>
          <li>
            <strong>Emissions Bypasses:</strong> AutoWise AI strictly refuses to recommend deleting catalytic converters, DPF filters, or EGR valves.
          </li>
          <li>
            <strong>Immobilizers:</strong> Security and anti-theft systems must be serviced only with authorized manufacturer key programming tools.
          </li>
          <li>
            <strong>Qualified Inspection:</strong> AI diagnostic suggestions represent probabilistic evaluations and do not replace physical testing by a certified technician.
          </li>
        </ul>
      </div>
    </div>
  );
}
