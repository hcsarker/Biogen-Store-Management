
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/purchase', label: 'Purchase', icon: '🛒' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/sales', label: 'Sales', icon: '💰' },
    { path: '/expenses', label: 'Expenses', icon: '💸' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/expire-alert', label: 'Expire Alert', icon: '⚠️' },
    { path: '/stock-alert', label: 'Stock Alert', icon: '🔔' },
    { path: '/user-management', label: 'User Management', icon: '👥' },
    { path: '/reports', label: 'Report', icon: '📋' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className={cn(
      "bg-slate-800 text-white transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">B</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold">Biogen Pharmaceuticals</h2>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm">A</span>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors",
                isActive && "bg-slate-700 border-r-2 border-blue-500"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-4 left-4 p-2 rounded bg-slate-700 hover:bg-slate-600"
      >
        <span className="text-sm">{isCollapsed ? '→' : '←'}</span>
      </button>
    </div>
  );
};

export default Sidebar;
