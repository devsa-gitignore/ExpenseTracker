import React, { useMemo } from 'react';

const CATEGORY_CONFIG = {
  Food: { color: 'bg-green-500' },
  Marketing: { color: 'bg-indigo-600' },
  Travel: { color: 'bg-blue-400' },
  Utilities: { color: 'bg-red-500' },
  Other: { color: 'bg-slate-400' }
};

const CategoryBreakdown = ({ transactions }) => {
  const categories = useMemo(() => {
    const currentMonthTransactions = transactions.filter(t => t.date.startsWith('May'));
    
    const totals = currentMonthTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const totalSpending = Object.values(totals).reduce((a, b) => a + b, 0) || 1;

    return Object.entries(totals).map(([name, amount]) => ({
      name,
      amount: `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
      color: CATEGORY_CONFIG[name]?.color || CATEGORY_CONFIG.Other.color,
      progress: `${Math.round((amount / totalSpending) * 100)}%`
    })).sort((a, b) => parseFloat(b.amount.replace(/[^0-9.-]+/g,"")) - parseFloat(a.amount.replace(/[^0-9.-]+/g,"")));
  }, [transactions]);

  return (
    <div className="card h-full">
      <h3 className="font-bold text-lg text-text-main mb-6">By Category</h3>
      
      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${cat.color}`}></span>
                <span className="text-sm font-semibold text-text-main">{cat.name}</span>
              </div>
              <span className="text-sm font-bold text-text-main">{cat.amount}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${cat.color} rounded-full transition-all duration-500`} 
                style={{ width: cat.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdown;
