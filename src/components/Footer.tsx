import Link from 'next/link';
import { ShieldAlert, Cpu, HeartHandshake, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-navy-800 bg-navy-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">AutoWise AI</span>
              <span className="px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-lightBlue text-[10px] font-mono border border-brand-blue/40">v1.0</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Automotive vehicle identification, intelligent OBD-II diagnostic assistance, OEM parts compatibility, and verified price comparison.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Diagnostic Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/identify" className="hover:text-white transition">Vehicle ID Wizard</Link></li>
              <li><Link href="/troubleshoot" className="hover:text-white transition">OBD-II & Symptom Troubleshooter</Link></li>
              <li><Link href="/parts" className="hover:text-white transition">Spare Parts Compatibility</Link></li>
              <li><Link href="/compare" className="hover:text-white transition">Price Comparison Engine</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Integrations & Architecture</h4>
            <ul className="space-y-2">
              <li><Link href="/admin/integrations" className="hover:text-white transition flex items-center gap-1">API Status Dashboard <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span></Link></li>
              <li><a href="https://vpic.nhtsa.dot.gov/api/" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-1">NHTSA vPIC Global VIN <ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><Link href="/settings" className="hover:text-white transition">API Keys & Settings</Link></li>
              <li><Link href="/saved" className="hover:text-white transition">My Garage & History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-1.5 text-amber-400">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Critical Safety Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              AI-generated diagnostics and estimates do NOT substitute an inspection by a certified master technician. If symptoms indicate brake failure, fuel leakage, or severe overheating, stop driving immediately.
            </p>
            <Link href="/safety" className="mt-2 inline-block text-brand-lightBlue hover:underline text-[11px]">
              Read complete safety protocols &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2026 AutoWise AI. Built for safety, precision, and reliable automotive maintenance.</p>
          <div className="flex gap-4">
            <Link href="/safety" className="hover:text-white">Safety Disclaimer</Link>
            <Link href="/settings" className="hover:text-white">Privacy Controls</Link>
            <Link href="/admin/integrations" className="hover:text-white">Data Providers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
