'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Wrench, AlertTriangle, ShieldAlert, Cpu, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

function TroubleshootContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicleProfile, setVehicleProfile] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [onsetConditions, setOnsetConditions] = useState('');
  const [warningLights, setWarningLights] = useState('');
  const [obdCodes, setObdCodes] = useState('');
  const [recentRepairs, setRecentRepairs] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const vParam = searchParams.get('vehicle');
    if (vParam) setVehicleProfile(vParam);

    const preset = searchParams.get('preset');
    if (preset === 'misfire') {
      setVehicleProfile('Maruti Suzuki Swift 1.2L DualJet');
      setSymptoms('Engine shuddering under acceleration, rough idle, loss of power going uphill.');
      setOnsetConditions('Started yesterday after refilling fuel at highway station.');
      setWarningLights('Check Engine Light flashing intermittently during acceleration');
      setObdCodes('P0300, P0302');
    } else if (preset === 'catalyst') {
      setVehicleProfile('Hyundai Creta 1.5L');
      setSymptoms('Check engine light illuminated steady, mild sulfur smell from exhaust.');
      setOnsetConditions('Appeared 3 days ago during highway cruise.');
      setWarningLights('Solid Check Engine Light');
      setObdCodes('P0420');
    } else if (preset === 'overheat') {
      setVehicleProfile('Toyota Fortuner 2.8L');
      setSymptoms('Steam billowing from under hood, coolant boiling into overflow reservoir, sweet burning smell.');
      setOnsetConditions('Occurred suddenly while climbing mountain ghat section.');
      setWarningLights('High Engine Coolant Temperature Red Lamp');
      setObdCodes('P0217');
    } else if (preset === 'brakes') {
      setVehicleProfile('Honda City 1.5L i-VTEC');
      setSymptoms('Brake pedal sank completely to the floor when coming to a stop, vehicle barely stopped, wet fluid spot near front left wheel.');
      setOnsetConditions('Happened 10 minutes ago at traffic junction.');
      setWarningLights('Brake System Red Warning Light');
      setObdCodes('N/A');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError('Please provide a description of the symptoms.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/troubleshoot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleProfile: vehicleProfile || 'Standard Passenger Vehicle',
          symptoms,
          onsetConditions,
          warningLights,
          obdCodes,
          recentRepairs,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Diagnostic evaluation failed.');
      }

      router.push(`/reports/${data.reportId}`);
    } catch (err: any) {
      setError(err.message || 'Troubleshooting evaluation failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <Wrench className="w-3.5 h-3.5" /> Guided AI Automotive Diagnostic Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Troubleshoot a Problem</h1>
        <p className="text-slate-400 text-sm mt-1">
          Describe the symptoms, observed warning lights, and trouble codes to receive a structured diagnosis, ranked causes, and safety guidance.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          {error}
        </div>
      )}

      {/* Preset Quick Scenario Buttons */}
      <div className="p-4 rounded-xl bg-navy-900 border border-navy-800 space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
          Quick Test Scenarios (Click to auto-populate):
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setVehicleProfile('Maruti Suzuki Swift 1.2L DualJet');
              setSymptoms('Engine shuddering under acceleration, rough idle, loss of power going uphill.');
              setWarningLights('Check Engine Light flashing intermittently during acceleration');
              setObdCodes('P0300, P0302');
            }}
            className="px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 border border-navy-700 text-slate-300 transition"
          >
            Misfire & Shudder (P0300)
          </button>
          <button
            type="button"
            onClick={() => {
              setVehicleProfile('Toyota Fortuner 2.8L');
              setSymptoms('Steam billowing from under hood, coolant boiling into reservoir, burning sweet smell.');
              setWarningLights('High Engine Coolant Temperature Red Lamp');
              setObdCodes('P0217');
            }}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 transition"
          >
            Severe Overheat (Stop-Driving)
          </button>
          <button
            type="button"
            onClick={() => {
              setVehicleProfile('Honda City 1.5L i-VTEC');
              setSymptoms('Brake pedal sank completely to the floor, brake fluid leaking under wheel arch.');
              setWarningLights('Red Brake Warning Light');
              setObdCodes('N/A');
            }}
            className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-300 transition"
          >
            Brake Failure (Stop-Driving)
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-navy-900 border border-navy-800 space-y-6">
        {/* Vehicle snapshot */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Vehicle Make, Model & Engine:
          </label>
          <input
            type="text"
            value={vehicleProfile}
            onChange={(e) => setVehicleProfile(e.target.value)}
            placeholder="e.g. Maruti Suzuki Swift ZXi 1.2L (2022)"
            className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* Symptoms */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Symptoms & Noise Description (Natural Language) <span className="text-red-400">*</span>:
          </label>
          <textarea
            rows={4}
            required
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe what feels, sounds, or looks wrong. e.g. Squeaking noise when braking, metallic rattle over bumps, engine shuddering at 2000 RPM..."
            className="w-full bg-navy-950 border border-navy-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
          />
        </div>

        {/* OBD Codes & Warning Lights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              OBD-II Trouble Codes (If known):
            </label>
            <input
              type="text"
              value={obdCodes}
              onChange={(e) => setObdCodes(e.target.value.toUpperCase())}
              placeholder="e.g. P0300, P0420, P0171"
              className="w-full font-mono bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue uppercase"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Dashboard Warning Lights:
            </label>
            <input
              type="text"
              value={warningLights}
              onChange={(e) => setWarningLights(e.target.value)}
              placeholder="e.g. Check Engine (flashing), ABS lamp, Battery red"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Onset Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              When did the issue start?
            </label>
            <input
              type="text"
              value={onsetConditions}
              onChange={(e) => setOnsetConditions(e.target.value)}
              placeholder="e.g. Started suddenly this morning, intermittent on cold start"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Recent Repairs / Maintenance:
            </label>
            <input
              type="text"
              value={recentRepairs}
              onChange={(e) => setRecentRepairs(e.target.value)}
              placeholder="e.g. Oil change 2 weeks ago, spark plugs changed 50k km"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          {isLoading ? 'Synthesizing Diagnostic Report...' : 'Analyze Symptoms & Generate Diagnostic Report'}
        </button>
      </form>
    </div>
  );
}

export default function TroubleshootPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Troubleshooter...</div>}>
      <TroubleshootContent />
    </Suspense>
  );
}
