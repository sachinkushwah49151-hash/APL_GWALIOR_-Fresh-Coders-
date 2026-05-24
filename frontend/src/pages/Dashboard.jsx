import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Tv, Award, Activity, Heart, Clock, Eye,
  TrendingUp, Compass, AlertTriangle, ArrowRight, Target 
} from 'lucide-react';

const Dashboard = () => {
  const { analytics, matchEvents, selectedSponsorId, selectedMatchId, matches, loading } = useAppState();
  const navigate = useNavigate();

  const activeMatch = matches.find(m => m.id === selectedMatchId) || matches[0];
  
  if (loading || !analytics || !analytics.sponsors) {
    return (
      <div className="p-8 flex flex-col gap-6 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-xl w-48" />
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="h-24 bg-slate-800 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-slate-800 rounded-2xl" />
          <div className="h-80 bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Find active sponsor metrics inside calculated ROI array
  const sData = analytics.sponsors.find(s => s.sponsorId === selectedSponsorId) || analytics.sponsors[0];
  const sponsorName = selectedSponsorId.toUpperCase();

  // Exposure timeline (cumulative over overs 1-20)
  const timelineChartData = [
    { over: 'Overs 1-4', ceat: 15, tata: 25, jio: 10, dream11: 20 },
    { over: 'Overs 5-8', ceat: 30, tata: 45, jio: 22, dream11: 35 },
    { over: 'Overs 9-12', ceat: 50, tata: 65, jio: 45, dream11: 52 },
    { over: 'Overs 13-16', ceat: 72, tata: 82, jio: 62, dream11: 70 },
    { over: 'Overs 17-20', ceat: 88, tata: 94, jio: 78, dream11: 82 }
  ];

  // Map ROI rankings dynamically from API array
  const rankingsChartData = analytics.sponsors.map(s => ({
    name: s.name,
    ROI: s.roi,
    fill: s.sponsorId === 'ceat' ? '#d97706' : s.sponsorId === 'tata' ? '#1e3a8a' : s.sponsorId === 'jio' ? '#059669' : '#ff3e3e'
  }));

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-900/40 p-4 rounded-2xl border border-slate-800/80">
        <div>
          <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
            Target Match Analyzed
          </span>
          <h3 className="text-sm font-bold text-white mt-1.5">{activeMatch.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
          <span className="text-xs text-slate-300 font-bold">Static Ingestion Active: Event Scorecard Mode</span>
        </div>
      </div>

      {/* 6 Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Estimated Exposure */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Exposure Index</span>
            <Tv size={14} className="text-cyan-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{sData.exposureScore}%</p>
          <span className="text-[9px] text-slate-500 font-semibold">Visibility probability metrics</span>
        </div>

        {/* Card 2: ROI Score */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rotate-45 transform translate-x-3 -translate-y-3" />
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">ROI Score</span>
            <Award size={14} className="text-brand-emerald" />
          </div>
          <p className="text-xl font-extrabold text-brand-emerald">{sData.roi}x</p>
          <span className="text-[9px] text-slate-500 font-semibold">Spend efficiency factor</span>
        </div>

        {/* Card 3: Social Interactions */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Social Views</span>
            <Activity size={14} className="text-indigo-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{formatNumber(sData.engagement.views)}</p>
          <span className="text-[9px] text-slate-500 font-semibold">{formatNumber(sData.engagement.likes)} reaction counts</span>
        </div>

        {/* Card 4: Sentiment */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Positive Sentiment</span>
            <Heart size={14} className="text-rose-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{sData.sentiment.positive}%</p>
          <span className="text-[9px] text-slate-500 font-semibold">{sData.sentiment.negative}% Negative</span>
        </div>

        {/* Card 5: Ingested Events Count */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Match Events</span>
            <Clock size={14} className="text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-white">{analytics.totalEvents}</p>
          <span className="text-[9px] text-slate-500 font-semibold">Timeline event nodes</span>
        </div>

        {/* Card 6: Reach Impressions */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800/80 shadow-md">
          <div className="flex justify-between items-center text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Reach Score</span>
            <Target size={14} className="text-blue-400" />
          </div>
          <p className="text-xl font-extrabold text-white">{formatNumber(sData.impressions)}</p>
          <span className="text-[9px] text-slate-500 font-semibold">Broadcaster audience size</span>
        </div>

      </div>

      {/* Main Charts & Rankings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Exposure Timeline Area Chart */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border-slate-800 shadow-glass flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Active Exposure Timeline</h4>
            <p className="text-xs text-slate-400">Visibility percentages calculated by Exposure Engine across match overs.</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSponsor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="over" stroke="#94a3b8" fontSize={9} />
                <YAxis stroke="#94a3b8" fontSize={9} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey={selectedSponsorId} stroke="#00f2fe" fillOpacity={1} fill="url(#colorSponsor)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sponsor ROI rankings Bar Chart */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 shadow-glass flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sponsor ROI Leaderboard</h4>
            <p className="text-xs text-slate-400">ROI index computed by ROI Engine (x-factor ratio).</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                <YAxis stroke="#94a3b8" fontSize={9} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', color: '#fff' }}
                />
                <Bar dataKey="ROI" radius={[6, 6, 0, 0]}>
                  {rankingsChartData.map((entry, index) => (
                    <rect key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Insights and Action Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* AI Recommendations Panel */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass size={16} className="text-cyan-400" /> Sponsor Copilot
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Copilot recommends scheduling campaigns during **Overs 14 to 18** to sync with highest momentum boundary events for {sponsorName}.
            </p>
          </div>
          <button 
            onClick={() => navigate('/copilot')}
            className="flex items-center justify-center gap-1.5 bg-cyan-950/40 border border-cyan-800 hover:border-cyan-500/40 text-brand-glow text-xs font-bold rounded-xl py-2.5 mt-4 transition cursor-pointer"
          >
            <span>Consult Copilot</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Live Scorecard events widget */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Tv size={16} className="text-amber-500" /> Live Match Feed
            </h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {matchEvents && matchEvents.length > 0 ? (
                matchEvents.slice(0, 3).map((ev, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] bg-dark-900/50 p-2 rounded-lg border border-slate-800">
                    <span className="text-slate-300 font-semibold">{ev.over}: {ev.eventType}</span>
                    <span className="text-slate-500 font-bold">{ev.momentum}% momentum</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-[10px] text-slate-500">No scorecard logs available.</div>
              )}
            </div>
          </div>
          <button 
            onClick={() => navigate('/event-agent')}
            className="flex items-center justify-center gap-1.5 bg-dark-900 border border-slate-700/60 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl py-2.5 mt-4 transition cursor-pointer"
          >
            <span>Open Event Timeline</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Campaign copy Generator shortcut */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={16} className="text-rose-500" /> Exposure Drops
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              ROI Agent warning: TATA spend ratio is yielding lower score efficiencies. Generate synced social ad copy to optimize campaign parameters.
            </p>
          </div>
          <button 
            onClick={() => navigate('/ad-generator')}
            className="flex items-center justify-center gap-1.5 bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 text-xs font-bold rounded-xl py-2.5 mt-4 transition cursor-pointer"
          >
            <span>Sync Creative Campaign</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
