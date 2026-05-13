import { NavLink } from 'react-router-dom';

const Sidebar = ({ onMobileClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { name: 'Transactions', path: '/transactions', icon: <TransactionsIcon /> },
    { name: 'Budgets', path: '/budgets', icon: <BudgetsIcon /> },
  ];

  return (
    <div className="w-64 h-screen bg-bg-sidebar border-r border-slate-200 flex flex-col p-6 sticky top-0 shrink-0">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-main font-outfit">WIM</h1>
        <p className="mt-1 text-xs font-medium tracking-[0.28em] uppercase text-text-muted">Where is Money</p>
      </div>


      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => onMobileClose && onMobileClose()}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-[#5eead4] to-[#4ade80] text-text-main font-semibold shadow-sm' 
                  : 'text-text-muted hover:bg-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={isActive ? 'text-text-main' : 'text-slate-400'}>
                  {item.icon}
                </span>
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

    </div>
  );
};

// Custom SVG Icons
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const TransactionsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
);

const BudgetsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1v22"></path>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default Sidebar;
