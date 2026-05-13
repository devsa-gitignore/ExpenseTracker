import React from 'react';

const ConversionCard = () => {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-white/10 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </div>
        <h3 className="font-bold text-lg">Conversion</h3>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Converted Total</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">€3,942.12</span>
          <span className="text-sm font-medium text-slate-400">EUR</span>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">Target Currency</label>
        <div className="relative">
          <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm appearance-none outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all">
            <option>Euro (EUR)</option>
            <option>Pound (GBP)</option>
            <option>Yen (JPY)</option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversionCard;
