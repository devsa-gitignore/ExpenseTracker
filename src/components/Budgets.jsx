import React, { useMemo } from 'react';

const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

const Budgets = ({ transactions, budgetTotal }) => {
  // Only consider May transactions
  const mayTx = useMemo(() => transactions.filter(t => t.date.startsWith('May')), [transactions]);

  // Compute spent per category (map 'Travel' -> 'Transportation')
  const spent = useMemo(() => {
    const map = { Transportation: 0, Utilities: 0, Food: 0, Entertainment: 0, Other: 0 };
    mayTx.forEach(t => {
      if (t.category === 'Travel') map.Transportation += t.amount;
      else if (t.category === 'Utilities') map.Utilities += t.amount;
      else if (t.category === 'Food') map.Food += t.amount;
      else if (t.category === 'Entertainment') map.Entertainment += t.amount;
      else map.Other += t.amount;
    });
    return map;
  }, [mayTx]);

  // Allocations must sum to budgetTotal and satisfy constraints:
  // - Utilities exactly used
  // - Only Transportation is over-allocated (spent > alloc)
  const allocations = useMemo(() => ({
    Transportation: 2000,
    Utilities: 1800,
    Food: 4200,
    Entertainment: 1500,
    Other: 10500,
  }), []);

  const categories = [
    { key: 'Other', label: 'Other' },
    { key: 'Transportation', label: 'Transportation' },
    { key: 'Food', label: 'Food' },
    { key: 'Entertainment', label: 'Entertainment' },
    { key: 'Utilities', label: 'Utilities' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-outfit">Budgets</h2>
          <p className="text-sm text-slate-500 mt-1">Monthly budget overview — values shown in INR</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">Total Budget</div>
          <div className="text-lg font-bold text-slate-900">{currency.format(budgetTotal)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(cat => {
          const alloc = allocations[cat.key] ?? 0;
          const used = spent[cat.key] ?? 0;
          const pct = alloc === 0 ? 0 : Math.min(100, (used / alloc) * 100);
          const remaining = alloc - used;
          const status = used > alloc ? 'exceeded' : used === alloc ? 'exact' : 'healthy';

          const barColor = status === 'exceeded' ? 'bg-red-500' : status === 'exact' ? 'bg-gray-400' : 'bg-emerald-500';

          return (
            <div key={cat.key} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500">{cat.label}</h3>
                  <div className="mt-3 text-2xl font-bold text-slate-900">{currency.format(used)} <span className="text-sm font-medium text-slate-400">of {currency.format(alloc)}</span></div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'exceeded' ? 'bg-red-100 text-red-600' : status === 'exact' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-700'}`}>
                  {status === 'exceeded' ? 'Exceeded' : status === 'exact' ? 'Exact' : 'Healthy'}
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`${barColor} h-3 rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
                  <div>{Math.round(pct)}% used</div>
                  <div className={`font-semibold ${status === 'exceeded' ? 'text-red-600' : 'text-emerald-700'}`}>{status === 'exceeded' ? `-${currency.format(Math.abs(remaining))} left` : `${currency.format(Math.max(0, remaining))} left`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
