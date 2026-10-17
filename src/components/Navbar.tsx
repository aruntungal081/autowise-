'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wrench, Car, Search, ShieldAlert, Cpu, BarChart2, BookmarkCheck, Settings } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: Car },
    { href: '/identify', label: 'Identify Vehicle', icon: Search },
    { href: '/troubleshoot', label: 'AI Troubleshooter', icon: Wrench },
    { href: '/parts', label: 'Parts Finder', icon: Cpu },
    { href: '/compare', label: 'Price Compare', icon: BarChart2 },
    { href: '/saved', label: 'My Garage', icon: BookmarkCheck },
    { href: '/admin/integrations', label: 'API Status', icon: Settings },
    { href: '/safety', label: 'Safety Rules', icon: ShieldAlert },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-cyan-400 p-0.5 shadow-lg shadow-brand-blue/20">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center group-hover:bg-navy-850 transition">
                <Car className="w-5 h-5 text-brand-lightBlue" />
              </div>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
                AutoWise <span className="text-brand-lightBlue text-xs px-1.5 py-0.5 rounded bg-brand-blue/20 border border-brand-blue/40 font-mono">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 leading-none">Automotive Intelligence & Diagnostics</p>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-brand-blue/20 text-brand-lightBlue border border-brand-blue/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-navy-850'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Account / Quick Action */}
          <div className="flex items-center gap-3">
            <Link
              href="/identify"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-blue hover:bg-blue-600 rounded-lg shadow-sm transition active:scale-95"
            >
              <Search className="w-3.5 h-3.5" />
              Lookup Vehicle
            </Link>
            <Link
              href="/auth"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-850 border border-navy-700 hover:border-navy-600 text-xs text-slate-300 hover:text-white transition"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Rahul (Demo)
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 gap-2 border-t border-navy-850 bg-navy-900/60 no-scrollbar">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap ${
                isActive ? 'bg-brand-blue text-white' : 'text-slate-400 hover:bg-navy-800'
              }`}
            >
              <Icon className="w-3 h-3" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
