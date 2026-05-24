import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { 
  Bell, Menu, X, Check, Eye, LayoutDashboard, 
  Upload, BarChart3, Sparkles, Bot, Megaphone, FileText, Settings 
} from 'lucide-react';

const Navbar = () => {
  const {
    user,
    login,
    matches,
    selectedMatchId,
    setSelectedMatchId,
    selectedSponsorId,
    setSelectedSponsorId,
    notifications,
    addNotification
  } = useAppState();

  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get active page name from path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'ROI Analytics Dashboard';
      case '/upload-center': return 'Event Ingestion Center';
      case '/event-agent': return 'Event Scorecard Timeline';
      case '/sentiment-engagement': return 'Social & Sentiment Insights';
      case '/roi-agent': return 'Sponsor ROI field map';
      case '/copilot': return 'AI Brand Copilot';
      case '/ad-generator': return 'AI Creative Studio';
      case '/reports': return 'Reports & Exporter';
      case '/admin-panel': return 'Admin Panel';
      default: return 'SponsorScope AI';
    }
  };

  const handleRoleChange = (e) => {
    const nextRole = e.target.value;
    login(user?.email || 'demo@sponsorscope.ai', 'password', nextRole);
    addNotification('info', `Switched workspace role to: ${nextRole}`);
  };

  const handleMatchChange = (e) => {
    const mid = e.target.value;
    setSelectedMatchId(mid);
    addNotification('info', `Loaded analytics for match context: ${mid}`);
  };

  const handleSponsorChange = (e) => {
    const sid = e.target.value;
    setSelectedSponsorId(sid);
    addNotification('info', `Filtering dashboard view for sponsor: ${sid.toUpperCase()}`);
  };

  const mobileNavItems = [
    { path: '/dashboard', label: 'ROI Dashboard', icon: <LayoutDashboard size={16} /> },
    { path: '/upload-center', label: 'Event Ingestion', icon: <Upload size={16} /> },
    { path: '/event-agent', label: 'Event Agent', icon: <Eye size={16} /> },
    { path: '/sentiment-engagement', label: 'Sentiment & Social', icon: <BarChart3 size={16} /> },
    { path: '/roi-agent', label: 'ROI Analyst & Map', icon: <Sparkles size={16} /> },
    { path: '/copilot', label: 'Sponsor Copilot', icon: <Bot size={16} /> },
    { path: '/ad-generator', label: 'Creative Studio', icon: <Megaphone size={16} /> },
    { path: '/reports', label: 'Reports & Export', icon: <FileText size={16} /> },
    ...(user?.role === 'Admin' ? [{ path: '/admin-panel', label: 'Admin Control', icon: <Settings size={16} /> }] : []),
  ];

  return (
    <header className="h-16 border-b border-slate-800/80 bg-dark-900/60 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
      
      {/* Mobile Drawer Trigger & Page Name */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-400 hover:text-white focus:outline-none cursor-pointer"
        >
          <Menu size={22} />
        </button>
        <div>
          <h2 className="text-sm md:text-base font-extrabold text-white tracking-wide uppercase font-sans">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Global Filter Bar selectors & Alerts */}
      <div className="flex items-center gap-3 md:gap-4">
        
        {/* Match Selector (Only show if not on Landing Page / Auth) */}
        <div className="hidden sm:block">
          <select 
            value={selectedMatchId} 
            onChange={handleMatchChange}
            className="bg-dark-950 border border-slate-800 text-[11px] font-semibold text-slate-300 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          >
            {matches.map(m => (
              <option key={m.id} value={m.id}>{m.title.substring(0, 32)}...</option>
            ))}
          </select>
        </div>

        {/* Brand Focus Filter */}
        <div className="hidden sm:block">
          <select 
            value={selectedSponsorId} 
            onChange={handleSponsorChange}
            className="bg-dark-950 border border-slate-800 text-[11px] font-semibold text-slate-300 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="ceat">🚗 CEAT Tires</option>
            <option value="tata">🚙 TATA Motors</option>
            <option value="jio">📱 Jio Network</option>
            <option value="dream11">🎯 Dream11</option>
          </select>
        </div>

        {/* User Role Simulator switcher */}
        <div>
          <select 
            value={user?.role || 'Sponsor'} 
            onChange={handleRoleChange}
            className="bg-cyan-950/40 border border-cyan-800 text-[10px] font-bold text-brand-glow uppercase rounded-xl px-2.5 py-1.5 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="Admin">🛡️ Admin Role</option>
            <option value="Sponsor">📊 Sponsor Role</option>
            <option value="Marketing Team">📣 Marketing Role</option>
          </select>
        </div>

        {/* Notifications Alert Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-xl bg-dark-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer relative"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-extrabold text-white flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-72 glass-panel-heavy border-slate-700 shadow-2xl rounded-2xl overflow-hidden z-50">
              <div className="p-3 bg-dark-950/80 border-b border-slate-800 flex justify-between items-center">
                <span className="text-xs font-bold text-white uppercase tracking-wider">System Alerts</span>
                <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-bold">
                  {notifications.length} NEW
                </span>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-800">
                {notifications.map((alert) => (
                  <div key={alert.id} className="p-3 hover:bg-slate-800/20 transition flex flex-col gap-1">
                    <p className="text-xs text-slate-200">{alert.text}</p>
                    <span className="text-[9px] text-slate-500 text-right">{alert.time}</span>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center bg-dark-950/80 border-t border-slate-800">
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Drawer (Overlay Links) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-dark-950/85 z-50 lg:hidden flex justify-start">
          <div className="w-64 h-full bg-dark-900 border-r border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-extrabold text-white text-sm uppercase tracking-wider">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {mobileNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/30"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-4">
              Logged in: <span className="font-bold text-white">{user?.name}</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
