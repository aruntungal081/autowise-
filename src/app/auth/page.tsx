'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleDemoLogin = async (demoEmail: string = 'user@autowise.ai') => {
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'demo_login', email: demoEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Signed in successfully as ' + data.user.name);
        setTimeout(() => router.push('/saved'), 800);
      }
    } catch (e: any) {
      setMessage('Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Welcome back!');
        setTimeout(() => router.push('/saved'), 800);
      } else {
        setMessage(data.error || 'Authentication failed');
      }
    } catch (err: any) {
      setMessage('Network error during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-brand-blue/20 text-brand-lightBlue flex items-center justify-center mx-auto border border-brand-blue/30">
          <Car className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">AutoWise Account</h1>
        <p className="text-xs text-slate-400">Save vehicle profiles, past diagnostic scans, and parts watchlists.</p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-brand-blue/20 border border-brand-blue/40 text-brand-lightBlue text-xs text-center font-medium">
          {message}
        </div>
      )}

      {/* 1-Click Demo Login */}
      <div className="p-5 rounded-2xl bg-navy-900 border border-navy-800 space-y-3">
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Instant Demo Profiles:</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleDemoLogin('user@autowise.ai')}
            disabled={isLoading}
            className="p-3 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-800 text-left transition"
          >
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Rahul Sharma
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Driver / Swift Owner</div>
          </button>

          <button
            onClick={() => handleDemoLogin('admin@autowise.ai')}
            disabled={isLoading}
            className="p-3 rounded-xl bg-navy-950 hover:bg-navy-850 border border-navy-800 text-left transition"
          >
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-lightBlue" /> Administrator
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">System Integrator</div>
          </button>
        </div>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleLogin} className="p-6 rounded-2xl bg-navy-900 border border-navy-800 space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-300">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@autowise.ai"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-300">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-navy-950 border border-navy-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Default demo password: <code className="text-slate-300">password123</code></p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
        >
          {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
