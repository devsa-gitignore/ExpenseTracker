import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import CurrencyConverter from './components/CurrencyConvertor';
import ExpenseForm from './components/ExpenseForm';
import CategoryBreakdown from './components/CategoryBreakdown';
import TransactionTable from './components/TransactionTable';
import Budgets from './components/Budgets';

function App() {
  const BUDGET = 20000;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('May 2026');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [appliedFilters, setAppliedFilters] = useState({ month: 'May 2026', category: 'All Categories' });

  const [transactions, setTransactions] = useState([
    // May 2026
    { id: 1, date: 'May 12', desc: 'Apple Store - MacBook Pro M3', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 8500.00 },
    { id: 12, date: 'May 11', desc: 'Uber - Office Commute', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 350.00 },
    { id: 2, date: 'May 10', desc: 'Whole Foods - Monthly Grocery', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 1250.40 },
    { id: 27, date: 'May 09', desc: 'PVR Cinemas - Movie Night', category: 'Entertainment', amount: 850.00 },
    { id: 13, date: 'May 09', desc: 'Netflix Subscription', category: 'Entertainment', amount: 649.00 },
    { id: 28, date: 'May 08', desc: 'Local Bus Fare', category: 'Travel', amount: 20.00 },
    { id: 3, date: 'May 08', desc: 'Internet & Electricity Bill', category: 'Utilities', catColor: 'bg-red-100 text-red-600', amount: 1800.00 },
    { id: 29, date: 'May 07', desc: 'Chai & Samosa', category: 'Food', amount: 45.00 },
    { id: 14, date: 'May 07', desc: 'Zomato - Dinner Order', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 850.00 },
    { id: 4, date: 'May 05', desc: 'Gas Station - Road Trip', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 2400.00 },
    { id: 15, date: 'May 04', desc: 'Pharmacy - Medicines', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 320.00 },
    { id: 5, date: 'May 02', desc: 'Starbucks Coffee', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 450.00 },
    
    // April 2026
    { id: 6, date: 'Apr 28', desc: 'Co-working Space Rent', category: 'Utilities', catColor: 'bg-red-100 text-red-600', amount: 5000.00 },
    { id: 33, date: 'Apr 27', desc: 'Street Tea & Snacks', category: 'Food', amount: 35.00 },
    { id: 16, date: 'Apr 27', desc: 'Spotify Premium', category: 'Entertainment', amount: 119.00 },
    { id: 29, date: 'Apr 26', desc: 'Local Bakery', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 45.00 },
    { id: 34, date: 'Apr 26', desc: 'Parking Fee', category: 'Travel', amount: 50.00 },
    { id: 30, date: 'Apr 24', desc: 'Metro Snack', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 25.00 },
    { id: 7, date: 'Apr 25', desc: 'Fine Dining - Anniversary', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 3500.50 },
    { id: 35, date: 'Apr 23', desc: 'Standup Comedy Show', category: 'Entertainment', amount: 499.00 },
    { id: 17, date: 'Apr 22', desc: 'Swiggy - Lunch', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 420.00 },
    { id: 8, date: 'Apr 20', desc: 'Facebook Ads - Campaign', category: 'Marketing', catColor: 'bg-indigo-900 text-indigo-100', amount: 4200.00 },
    { id: 18, date: 'Apr 18', desc: 'Adobe Creative Cloud', category: 'Marketing', catColor: 'bg-indigo-900 text-indigo-100', amount: 1900.00 },
    { id: 9, date: 'Apr 15', desc: 'Flight to Mumbai', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 6500.00 },
    { id: 19, date: 'Apr 12', desc: 'Gym Membership', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 2500.00 },
    { id: 10, date: 'Apr 10', desc: 'Ergonomic Chair', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 2200.00 },
    { id: 11, date: 'Apr 05', desc: 'Amazon - Desk Lamp', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 800.00 },

    // March 2026
    { id: 20, date: 'Mar 28', desc: 'Water Bill', category: 'Utilities', catColor: 'bg-red-100 text-red-600', amount: 600.00 },
    { id: 36, date: 'Mar 27', desc: 'Auto Rickshaw', category: 'Travel', amount: 80.00 },
    { id: 21, date: 'Mar 25', desc: 'Movie Tickets - IMAX', category: 'Entertainment', amount: 1200.00 },
    { id: 37, date: 'Mar 24', desc: 'Ice Cream', category: 'Food', amount: 60.00 },
    { id: 31, date: 'Mar 22', desc: 'Corner Store Candy', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 20.00 },
    { id: 38, date: 'Mar 21', desc: 'Newspaper Sub', category: 'Other', amount: 90.00 },
    { id: 32, date: 'Mar 18', desc: 'Bus Fare', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 15.00 },
    { id: 22, date: 'Mar 20', desc: 'Grocery Shopping', category: 'Food', catColor: 'bg-green-100 text-green-700', amount: 2100.00 },
    { id: 39, date: 'Mar 17', desc: 'Bowling Alley', category: 'Entertainment', amount: 600.00 },
    { id: 23, date: 'Mar 15', desc: 'Local Train Pass', category: 'Travel', catColor: 'bg-blue-100 text-blue-600', amount: 500.00 },
    { id: 40, date: 'Mar 12', desc: 'Roadside Snacks', category: 'Food', amount: 40.00 },
    { id: 24, date: 'Mar 10', desc: 'Google One Storage', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 130.00 },
    { id: 25, date: 'Mar 05', desc: 'H&M - New Apparel', category: 'Other', catColor: 'bg-slate-100 text-slate-600', amount: 3500.00 },
    { id: 26, date: 'Mar 01', desc: 'Internet Broadband Bill', category: 'Utilities', catColor: 'bg-red-100 text-red-600', amount: 999.00 },
  ]);

  const totalAmount = useMemo(() => {
    return transactions
      .filter(t => t.date.startsWith('May'))
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const addTransaction = (newTx) => {
    setTransactions(prev => [
      {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ...newTx
      },
      ...prev
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      // Use the first 3 characters of the month name (e.g., "Apr" for "April 2026")
      const filterMonth = appliedFilters.month === 'All Months' ? '' : appliedFilters.month.substring(0, 3);
      const monthMatch = appliedFilters.month === 'All Months' || t.date.startsWith(filterMonth);
      const categoryMatch = appliedFilters.category === 'All Categories' || t.category === appliedFilters.category;
      return monthMatch && categoryMatch;
    });
  }, [transactions, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({ month: selectedMonth, category: selectedCategory });
  };

  return (
    <div className="flex min-h-screen bg-bg-main font-sans selection:bg-brand-primary/20">
      {/* Desktop sidebar (hidden on small screens) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-bg-sidebar border-r border-slate-200 p-6">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md text-slate-600 hover:bg-slate-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <Sidebar onMobileClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 min-h-screen p-8 flex flex-col gap-8">
        {/* Mobile header: show burger on small screens */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-md bg-white border border-slate-200 text-slate-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
          <div />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <>
              {/* ... Dashboard code ... */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 shrink-0">
                <div className="lg:col-span-1">
                  <StatsCard totalAmount={totalAmount} budget={BUDGET} />
                </div>
                <div className="lg:col-span-2">
                  <ExpenseForm onAdd={addTransaction} />
                </div>
                <div className="lg:col-span-1">
                  <CurrencyConverter totalAmount={totalAmount} />
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-1">
                  <CategoryBreakdown transactions={transactions} />
                </div>
                <div className="xl:col-span-2">
                  <TransactionTable 
                    transactions={transactions.filter(t => t.date.startsWith('May'))} 
                    onDelete={deleteTransaction} 
                  />
                </div>
              </div>
            </>
          } />

          <Route path="/budgets" element={
            <div className="flex-1 flex flex-col gap-8 w-full">
              <Budgets transactions={transactions} budgetTotal={BUDGET} />
            </div>
          } />

          <Route path="/transactions" element={
            <div className="flex-1 flex flex-col gap-8 w-full">
              {/* Ledger Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">Transactions Ledger</h2>
                  <p className="text-slate-500 font-medium mt-1">A complete record of your financial movements and spending habits.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Export CSV
                </button>
              </div>

              {/* Filters Bar */}
              <div className="max-w-4xl">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Select Month</label>
                    <div className="relative">
                      <select 
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold appearance-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      >
                        <option>All Months</option>
                        <option>May 2026</option>
                        <option>April 2026</option>
                        <option>March 2026</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <div className="relative">
                      <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold appearance-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      >
                        <option>All Categories</option>
                        <option>Food</option>
                        <option>Marketing</option>
                        <option>Travel</option>
                        <option>Utilities</option>
                        <option>Entertainment</option>
                        <option>Other</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={handleApplyFilters}
                      className="w-full bg-[#065f46] text-white py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-[#064e3b] transition-all cursor-pointer"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <TransactionTable 
                  transactions={filteredTransactions} 
                  onDelete={deleteTransaction} 
                  isFullView={true}
                />
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
