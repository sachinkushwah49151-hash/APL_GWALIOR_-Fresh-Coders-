import React, { useState } from 'react';
import { useAppState } from '../context/AppState';
import { ShieldCheck, Users, Tv, Award, ShieldAlert, Plus, Trash2, Edit } from 'lucide-react';

const AdminPanel = () => {
  const { user, matches, sponsors, addNotification } = useAppState();
  const [activeTab, setActiveTab] = useState('sponsors');

  // Verify Role Auth
  if (!user || user.role !== 'Admin') {
    return (
      <div className="p-4 md:p-6 max-w-md mx-auto space-y-6 text-center py-20">
        <div className="glass-panel p-8 rounded-3xl border-rose-500/20 shadow-2xl flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
            <ShieldAlert size={28} className="animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider">Access Restrained</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Your active workspace profile is configured as **{user?.role || 'Guest'}**. Administrative controls are gated.
            </p>
          </div>
          <div className="bg-dark-950 p-4 rounded-xl border border-slate-900 text-[10px] text-slate-400 text-left mt-2">
            💡 <strong>How to test:</strong> Swap your role to <strong>🛡️ Admin Role</strong> in the dropdown menu at the top-right corner of the navbar to unlock.
          </div>
        </div>
      </div>
    );
  }

  // Simulated admin actions
  const handleAddSponsor = () => {
    addNotification('info', 'Admin action: Create Sponsor profile modal triggered.');
  };

  const handleAddMatch = () => {
    addNotification('info', 'Admin action: Import Match Wizard active.');
  };

  // Mock users database
  const mockUsers = [
    { name: 'Alok Kumar', email: 'demo@sponsorscope.ai', role: 'Admin', status: 'Active' },
    { name: 'Rohan Sharma', email: 'rohan@ceat.com', role: 'Sponsor', status: 'Active' },
    { name: 'Sneha Patel', email: 'sneha@mktg-agency.in', role: 'Marketing Team', status: 'Active' }
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* HUD Header */}
      <div className="glass-panel p-5 rounded-3xl border-slate-800 shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Admin Control Desk</h3>
            <p className="text-xs text-slate-400 font-medium">Configure sponsors data models, user seats, and match feeds.</p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-dark-950 border border-slate-800 rounded-xl p-1 font-semibold text-xs">
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'sponsors' ? 'bg-cyan-500/10 text-brand-glow' : 'text-slate-400 hover:text-white'}`}
          >
            Sponsors ({sponsors.length})
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'matches' ? 'bg-cyan-500/10 text-brand-glow' : 'text-slate-400 hover:text-white'}`}
          >
            Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${activeTab === 'users' ? 'bg-cyan-500/10 text-brand-glow' : 'text-slate-400 hover:text-white'}`}
          >
            Users ({mockUsers.length})
          </button>
        </div>
      </div>

      {/* Tabs panels */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass">
        
        {/* Tab 1: Sponsors */}
        {activeTab === 'sponsors' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Sponsorship Accounts</h4>
              <button 
                onClick={handleAddSponsor}
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold text-[10px] rounded-xl px-3.5 py-2 cursor-pointer shadow-md"
              >
                <Plus size={12} />
                <span>Add Sponsor Profile</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-350">
                <thead className="bg-dark-900 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Brand Name</th>
                    <th className="p-3">Industry Vertical</th>
                    <th className="p-3">Est. Contract Budget</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {sponsors.map(s => (
                    <tr key={s.id} className="hover:bg-slate-800/10 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <span className="text-lg">{s.logo}</span>
                        <span>{s.name}</span>
                      </td>
                      <td className="p-3">{s.industry}</td>
                      <td className="p-3">${s.spend.toLocaleString()}</td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button className="p-1.5 rounded-lg bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer transition">
                          <Edit size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 cursor-pointer transition">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Matches */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Processed Match Feeds</h4>
              <button 
                onClick={handleAddMatch}
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold text-[10px] rounded-xl px-3.5 py-2 cursor-pointer shadow-md"
              >
                <Plus size={12} />
                <span>Import Match Feed</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-350">
                <thead className="bg-dark-900 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Match Title</th>
                    <th className="p-3">Logged Date</th>
                    <th className="p-3">Video Duration</th>
                    <th className="p-3">Extract Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matches.map(m => (
                    <tr key={m.id} className="hover:bg-slate-800/10 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <Tv size={14} className="text-cyan-400" />
                        <span>{m.title}</span>
                      </td>
                      <td className="p-3">{m.date}</td>
                      <td className="p-3">{m.duration}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          m.status === 'Analyzed' ? 'bg-emerald-500/10 border border-emerald-500/20 text-brand-emerald' : 'bg-amber-500/10 border border-amber-500/20 text-brand-amber animate-pulse'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button className="p-1.5 rounded-lg bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer transition">
                          <Edit size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 cursor-pointer transition">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Users */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Workspace Accounts Seats</h4>
              <button 
                className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold text-[10px] rounded-xl px-3.5 py-2 cursor-pointer shadow-md"
              >
                <Plus size={12} />
                <span>Invite Team Seat</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-350">
                <thead className="bg-dark-900 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email Address</th>
                    <th className="p-3">Workspace Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {mockUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-800/10 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <Users size={14} className="text-indigo-400" />
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <span className="text-[10px] bg-dark-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold uppercase">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-brand-emerald font-semibold">{u.status}</span>
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button className="p-1.5 rounded-lg bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white cursor-pointer transition">
                          <Edit size={12} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400 cursor-pointer transition">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminPanel;
