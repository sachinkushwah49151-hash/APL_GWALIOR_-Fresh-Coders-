import React from 'react';
import { useAppState } from '../context/AppState';
import HeatmapField from '../components/HeatmapField';
import { Award, AlertOctagon, TrendingUp, HelpCircle } from 'lucide-react';

const ROIAgent = () => {
  const { analytics, sponsors } = useAppState();

  // Sort sponsors based on computed ROI efficiency
  // ROI = (exposureScore * likes/10000 * positive/100) / (spend/100000)
  const rankedSponsors = sponsors.map(s => {
    const sData = analytics.sponsors.find(item => item.sponsorId === s.id) || analytics.sponsors[0];
    return {
      ...s,
      ...sData
    };
  }).sort((a, b) => b.roi - a.roi);

  const topSponsor = rankedSponsors[0];
  const weakSponsor = rankedSponsors[rankedSponsors.length - 1];

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Formula Breakdown Panel */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-1 space-y-2">
          <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
            ROI Calculation Weights
          </span>
          <h3 className="text-lg font-bold text-white uppercase">Sponsorship ROI Equation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The ROI Agent computes real-time value returns by correlating visual duration, social feedback sentiments, views, and contract spends.
          </p>
        </div>

        {/* Formula SVG visual box */}
        <div className="bg-dark-950 px-6 py-4 rounded-2xl border border-slate-800 font-mono text-center flex flex-col justify-center shrink-0 w-full md:w-auto">
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2">Algorithm Formula</span>
          <div className="text-sm font-extrabold text-white flex flex-col items-center gap-1">
            <span className="text-brand-glow">Visibility × Engagement × Sentiment</span>
            <div className="w-full h-[1.5px] bg-slate-700" />
            <span className="text-indigo-400">Estimated Sponsor Spend</span>
          </div>
        </div>
      </div>

      {/* ROI Strategic Cards: Top, Weak, Opportunity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Top Sponsor Card */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] bg-emerald-950 text-brand-emerald border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase">
              Top ROI efficiency
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">{topSponsor.logo}</span>
              <h4 className="text-base font-bold text-white">{topSponsor.name}</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Generated {topSponsor.roi}x efficiency return. High placement weight on Sight Screens against spin coverage.
            </p>
          </div>
          <div className="border-t border-slate-800/60 pt-3 mt-4 flex justify-between items-center text-xs">
            <span className="text-slate-500">Spend: {formatCurrency(topSponsor.spend)}</span>
            <span className="font-bold text-brand-emerald">{topSponsor.roi}x ROI</span>
          </div>
        </div>

        {/* Weak Sponsor Card */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] bg-red-950 text-brand-rose border border-red-900 px-2 py-0.5 rounded font-bold uppercase">
              Lowest ROI efficiency
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">{weakSponsor.logo}</span>
              <h4 className="text-base font-bold text-white">{weakSponsor.name}</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              ROI rating of {weakSponsor.roi}x. High gross exposure score ({weakSponsor.exposureScore}%) offset by premium contract costs.
            </p>
          </div>
          <div className="border-t border-slate-800/60 pt-3 mt-4 flex justify-between items-center text-xs">
            <span className="text-slate-500">Spend: {formatCurrency(weakSponsor.spend)}</span>
            <span className="font-bold text-brand-rose">{weakSponsor.roi}x ROI</span>
          </div>
        </div>

        {/* Opportunity Card */}
        <div className="glass-panel p-5 rounded-2xl border-slate-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] bg-cyan-950/40 text-brand-glow border border-cyan-800 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1 w-max">
              <TrendingUp size={10} /> Placement Opportunity
            </span>
            <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wide">Reposition Boundary Boards</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Moving boundary advertisements to the **Straight Sight-Screen** will capture 32% more duration during spinner overs.
            </p>
          </div>
          <div className="border-t border-slate-800/60 pt-3 mt-4 text-right">
            <span className="text-[10px] text-cyan-400 font-bold uppercase">Expected Uplift: +22%</span>
          </div>
        </div>

      </div>

      {/* Embed Interactive Cricket Heatmap Field */}
      <HeatmapField />

      {/* Sponsor Leaderboard list */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Sponsor Leaderboard</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-dark-900 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="p-3">Sponsor Name</th>
                <th className="p-3">Estimated Spend</th>
                <th className="p-3">Placement Zone</th>
                <th className="p-3">Exposure Index</th>
                <th className="p-3">Sentiment ratio</th>
                <th className="p-3 text-right">ROI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rankedSponsors.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/10 transition">
                  <td className="p-3 font-bold text-white flex items-center gap-2">
                    <span className="text-lg">{s.logo}</span>
                    <span>{s.name}</span>
                  </td>
                  <td className="p-3">{formatCurrency(s.spend)}</td>
                  <td className="p-3">{s.placement}</td>
                  <td className="p-3 font-semibold">{s.exposureScore}%</td>
                  <td className="p-3">
                    <span className="text-brand-emerald font-bold">{s.sentiment.positive}% Positive</span>
                  </td>
                  <td className="p-3 text-right font-black text-white">{s.roi}x</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ROIAgent;
