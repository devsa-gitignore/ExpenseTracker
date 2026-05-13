import React from 'react';

const StatsCard = ({ totalAmount, budget = 20000 }) => {
  const percentage = Math.min(Math.round((totalAmount / budget) * 100), 100);

  return (
    <div className="card h-full flex flex-col p-5 pt-10">
      {/* Top Left: Title and Amount */}
      <div className="mb-auto">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Total Spending</h3>
        <p className="text-3xl font-bold text-text-main font-outfit">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      </div>
      
      {/* Middle: Progress Bar with Percentage */}
      <div className="my-6">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[9px] font-bold text-brand-primary uppercase">Utilization</span>
          <span className="text-[10px] font-bold text-brand-primary">{percentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#2dd4bf] to-[#10b981] rounded-full shadow-sm animate-pulse transition-all duration-500" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Right: Budget (Bigger & Higher) */}
      <div className="text-right mb-2">
        <p className="text-sm font-bold text-black/40 uppercase tracking-tight">
          Budget: <span className="font-outfit text-black/80">₹{budget.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
