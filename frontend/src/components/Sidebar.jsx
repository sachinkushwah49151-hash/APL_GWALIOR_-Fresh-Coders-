import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { 
  LayoutDashboard, Upload, Eye, BarChart3, HelpCircle, 
  Megaphone, FileText, Settings, LogOut, Bot, Sparkles 
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAppState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'ROI Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/upload-center', label: 'Event Ingestion', icon: <Upload size={18} /> },
    { path: '/event-agent', label: 'Event Agent', icon: <Eye size={18} /> },
    { path: '/sentiment-engagement', label: 'Sentiment & Social', icon: <BarChart3 size={18} /> },
    { path: '/roi-agent', label: 'ROI Analyst & Map', icon: <Sparkles size={18} /> },
    { path: '/copilot', label: 'Sponsor Copilot', icon: <Bot size={18} /> },
    { path: '/ad-generator', label: 'Creative Studio', icon: <Megaphone size={18} /> },
    { path: '/reports', label: 'Reports & Export', icon: <FileText size={18} /> },
    ...(user?.role === 'Admin' ? [{ path: '/admin-panel', label: 'Admin Control', icon: <Settings size={18} /> }] : []),
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-dark-950/80 backdrop-blur-xl flex flex-col h-screen sticky top-0 shrink-0 hidden lg:flex">
      
      {/* Brand Logo Header */}
      <div 
        onClick={() => navigate('/dashboard')}
        className="p-6 border-b border-slate-800 flex flex-col gap-1 cursor-pointer hover:bg-slate-900/10 active:scale-[0.99] transition-all"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-neon-cyan select-none">
            S
          </div>
          <span className="font-extrabold text-white text-base uppercase tracking-wider font-sans text-glow-cyan">
            SponsorScope
          </span>
        </div>
        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider pl-10">
          AI Workspace
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer
              ${isActive 
                ? 'bg-gradient-to-r from-cyan-950/30 to-indigo-950/10 text-cyan-400 border-l-4 border-cyan-500 shadow-glass' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
              }
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Session Info Footer */}
      <div className="p-4 border-t border-slate-800 bg-dark-900/40">
        <div className="flex items-center gap-3 mb-3.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md text-xs select-none">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <h5 className="text-xs font-bold text-white truncate">{user?.name || 'Guest User'}</h5>
            <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest truncate">{user?.role || 'Sponsor'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 rounded-xl py-2 text-xs font-semibold transition cursor-pointer"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
