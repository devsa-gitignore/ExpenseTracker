import React, { useState } from 'react';

const CATEGORY_STYLES = {
  Food: 'bg-green-100 text-green-700',
  Marketing: 'bg-indigo-900 text-indigo-100',
  Travel: 'bg-blue-100 text-blue-600',
  Utilities: 'bg-red-100 text-red-600',
  Other: 'bg-slate-100 text-slate-600'
};

const ExpenseForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) return;

    onAdd({
      desc: name,
      amount: parseFloat(amount),
      category: category,
      catColor: CATEGORY_STYLES[category] || CATEGORY_STYLES.Other
    });

    setName('');
    setAmount('');
  };

  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="font-bold text-lg text-text-main">Save Expense</h3>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase mb-2">Expense Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Weekly Grocery" 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase mb-2">Amount (₹)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase mb-2">Category</label>
            <div className="relative">
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm appearance-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              >
                {Object.keys(CATEGORY_STYLES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="mt-6 w-1/2 mx-auto flex items-center justify-center bg-[#10b981] text-white py-3 rounded-lg text-lg font-bold shadow-lg shadow-[#10b981]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Log New Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
