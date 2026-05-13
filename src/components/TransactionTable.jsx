import React from 'react';

const TransactionTable = ({ transactions, onDelete, isFullView = false }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  if (!transactions || transactions.length === 0) {
    // ... no transactions render ...
  }

  // Pagination Logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = isFullView 
    ? transactions.slice(startIndex, startIndex + itemsPerPage) 
    : transactions;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Reset to page 1 if transactions change (e.g. filtering)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [transactions]);

  const getCategoryStyles = (category) => {
    const styles = {
      Food: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Marketing: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      Travel: 'bg-blue-100 text-blue-700 border-blue-200',
      Utilities: 'bg-rose-100 text-rose-700 border-rose-200',
      Entertainment: 'bg-purple-100 text-purple-700 border-purple-200',
      Other: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    return styles[category] || styles.Other;
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Food': return (
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
        </div>
      );
      case 'Travel': return (
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10"></path><circle cx="7" cy="17" r="2"></circle><circle cx="17" cy="17" r="2"></circle></svg>
        </div>
      );
      case 'Utilities': return (
        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
        </div>
      );
      case 'Marketing': return (
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
        </div>
      );
      default: return (
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
      );
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col w-full`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Date <span className="ml-1">↓</span></th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-[10px] font-bold text-text-muted uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentTransactions.map((t) => (
              <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="text-sm font-semibold text-text-main whitespace-nowrap">{t.date}, 2026</div>
                </td>
                <td className="px-6 py-5">
                  <div>
                    <div className="text-sm font-bold text-text-main">{t.desc}</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getCategoryStyles(t.category)}`}>
                    {t.category}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-bold text-text-main">₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-rose-400 hover:text-rose-600 transition-all p-2 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Delete transaction"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFullView && (
        <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs font-semibold text-text-muted">
            Showing <span className="text-text-main">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, transactions.length)}</span> of <span className="text-text-main">{transactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-bold text-text-muted bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
