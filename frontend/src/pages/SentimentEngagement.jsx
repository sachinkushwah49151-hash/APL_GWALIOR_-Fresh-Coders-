import React from 'react';
import { useAppState } from '../context/AppState';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Heart, Activity, TrendingUp, Sparkles, MessageSquare, Share2, ThumbsUp } from 'lucide-react';

const SentimentEngagement = () => {
  const { analytics, selectedSponsorId } = useAppState();

  const sData = analytics.sponsors.find(s => s.sponsorId === selectedSponsorId) || analytics.sponsors[0];
  const sponsorName = selectedSponsorId.toUpperCase();

  // Sentiment values
  const sentimentData = [
    { name: 'Positive', value: sData.sentiment.positive, color: '#10b981' },
    { name: 'Neutral', value: sData.sentiment.neutral, color: '#f59e0b' },
    { name: 'Negative', value: sData.sentiment.negative, color: '#ef4444' }
  ];

  // Engagement trend spikes over match overs (1-20)
  const engagementTrend = [
    { over: 'Overs 1-4', views: sData.engagement.views * 0.15, engagement: sData.engagement.likes * 0.12 },
    { over: 'Overs 5-8', views: sData.engagement.views * 0.35, engagement: sData.engagement.likes * 0.28 },
    { over: 'Overs 9-12', views: sData.engagement.views * 0.48, engagement: sData.engagement.likes * 0.42 },
    { over: 'Overs 13-16', views: sData.engagement.views * 0.72, engagement: sData.engagement.likes * 0.75 }, // Spike zone
    { over: 'Overs 17-20', views: sData.engagement.views, engagement: sData.engagement.likes }
  ];

  // Simulated word cloud phrases
  const wordCloudWords = [
    { word: 'MAXIMUM SIX', weight: 32, type: 'pos' },
    { word: 'DHONI', weight: 28, type: 'pos' },
    { word: 'IPL2026', weight: 24, type: 'neu' },
    { word: 'Boundary Hit', weight: 20, type: 'neu' },
    { word: 'Wicket Chase', weight: 18, type: 'pos' },
    { word: `${sponsorName}`, weight: 26, type: 'brand' },
    { word: 'Overcrowded Rope', weight: 14, type: 'neg' },
    { word: 'Unbelievable Shot', weight: 22, type: 'pos' },
    { word: 'Ad Break', weight: 12, type: 'neg' }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num;
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Engagement Card */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Engagement Score</span>
            <p className="text-2xl font-black text-white">88.5 / 100</p>
            <span className="text-[9px] text-slate-400 font-semibold">Active audience interaction factor</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <Activity size={22} />
          </div>
        </div>

        {/* Sentiment Index Card */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Net Sentiment Index</span>
            <p className="text-2xl font-black text-brand-emerald">+{sData.sentiment.positive - sData.sentiment.negative}%</p>
            <span className="text-[9px] text-slate-400 font-semibold">Positive vs Negative offset</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-brand-emerald">
            <Heart size={22} />
          </div>
        </div>

        {/* Momentum Indicator */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Engagement Momentum</span>
            <p className="text-2xl font-black text-white">+185%</p>
            <span className="text-[9px] text-brand-emerald font-bold flex items-center gap-0.5">
              <TrendingUp size={10} /> Peak spike in Over 14
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-brand-glow">
            <Sparkles size={22} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Engagement Trend Chart */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Social Engagement Spikes</h4>
            <p className="text-xs text-slate-400">Views versus reaction counts mapped against match event thresholds.</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="over" stroke="#94a3b8" fontSize={9} />
                <YAxis stroke="#94a3b8" fontSize={9} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="views" name="Video Views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                <Area type="monotone" dataKey="engagement" name="Likes / Shares" stroke="#10b981" fillOpacity={1} fill="url(#colorLikes)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Circle */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sentiment Index</h4>
            <p className="text-xs text-slate-400 mt-0.5">Sentiment Agent feedback extraction from chat feeds.</p>
            
            <div className="space-y-3.5 mt-6">
              {sentimentData.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-48 flex justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-white">{sData.sentiment.positive}%</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Positive</span>
            </div>
          </div>
        </div>

      </div>

      {/* Word Cloud & Social Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Brand Word Cloud */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Interactive Word Cloud</h4>
            <p className="text-xs text-slate-400">Social phrases associated with logo exposure spikes.</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 bg-dark-950 p-6 rounded-2xl border border-slate-900 min-h-[160px]">
            {wordCloudWords.map((w, idx) => {
              let color = 'text-slate-400';
              if (w.type === 'pos') color = 'text-brand-emerald';
              if (w.type === 'neg') color = 'text-brand-rose';
              if (w.type === 'brand') color = 'text-brand-glow font-bold text-glow-cyan';

              return (
                <span
                  key={idx}
                  style={{ fontSize: `${w.weight / 1.5 + 8}px` }}
                  className={`${color} hover:scale-115 transition duration-150 cursor-pointer select-none uppercase tracking-wide px-2.5 py-0.5 rounded-lg`}
                >
                  {w.word}
                </span>
              );
            })}
          </div>
        </div>

        {/* Social Counter card */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Engagement Tally</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 flex items-center gap-1.5"><ThumbsUp size={14} className="text-cyan-400" /> Likes</span>
                <span className="font-bold text-white">{formatNumber(sData.engagement.likes)}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 flex items-center gap-1.5"><MessageSquare size={14} className="text-indigo-400" /> Comments</span>
                <span className="font-bold text-white">{formatNumber(sData.engagement.comments)}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 flex items-center gap-1.5"><Share2 size={14} className="text-emerald-500" /> Shares</span>
                <span className="font-bold text-white">{formatNumber(sData.engagement.shares)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-4 mt-6">
            * Social counters query APIs (Instagram/YouTube) matched directly with broadcast timestamp logs.
          </div>
        </div>

      </div>

    </div>
  );
};

export default SentimentEngagement;
