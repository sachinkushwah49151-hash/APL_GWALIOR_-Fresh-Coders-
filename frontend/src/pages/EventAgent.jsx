import React from 'react';
import { useAppState } from '../context/AppState';
import { 
  Clock, Zap, Sparkles, TrendingUp, Target, 
  HelpCircle, AlertCircle, ChevronRight, Award
} from 'lucide-react';

const EventAgent = () => {
  const { 
    matchEvents, 
    selectedEventId, 
    setSelectedEventId, 
    activeEventDetails, 
    selectedSponsorId, 
    matches, 
    selectedMatchId, 
    loading 
  } = useAppState();

  const activeMatch = matches.find(m => m.id === selectedMatchId) || matches[0];
  const activeSponsorName = selectedSponsorId.toUpperCase();

  if (!activeEventDetails) {
    return (
      <div className="p-8 flex flex-col gap-6 animate-pulse">
        <div className="h-10 bg-slate-800 rounded-xl w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-slate-800 rounded-2xl" />
          <div className="h-96 bg-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const { eventInfo } = activeEventDetails;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-dark-900/40 p-4 rounded-2xl border border-slate-800/80">
        <div>
          <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest bg-cyan-950/60 border border-cyan-800 px-2 py-0.5 rounded">
            Match Event Stream
          </span>
          <h3 className="text-sm font-bold text-white mt-1.5">{activeMatch.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse" />
          <span className="text-xs text-slate-350 font-bold">Static Ingestion Active: Event Agent Listening</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ball-by-ball score timeline (Event Agent Ticker) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Ball-by-Ball Timeline Ticker</h4>
            <p className="text-xs text-slate-400">Chronological scorecard feed. Select an event node to compute visibility metrics.</p>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1">
            {matchEvents && matchEvents.length > 0 ? (
              matchEvents.map((ev) => {
                const isSelected = ev.id === selectedEventId;
                
                // Color formatting depending on event type
                let eventBadgeColor = "bg-dark-950 text-slate-400 border-slate-800";
                if (ev.eventType.includes("Boundary")) eventBadgeColor = "bg-emerald-950/60 text-brand-emerald border-emerald-800/60 font-black";
                if (ev.eventType.includes("Wicket")) eventBadgeColor = "bg-red-950/60 text-brand-rose border-red-900/60 font-black";

                return (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEventId(ev.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isSelected 
                        ? 'bg-cyan-950/20 border-cyan-500/50 shadow-neon-cyan/10' 
                        : 'bg-dark-900/40 border-slate-850 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-dark-950 flex flex-col items-center justify-center shrink-0 border border-slate-800">
                        <Clock size={12} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                        <span className="text-[7px] text-slate-500 font-bold uppercase mt-0.5">{ev.over.split(' ')[1]}</span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full border ${eventBadgeColor}`}>
                            {ev.eventType}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase">
                            {ev.runs} Runs • {ev.batter} vs {ev.bowler}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mt-2 font-sans leading-relaxed">{ev.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <div className="text-right">
                        <p className="text-[9px] text-slate-500 font-bold uppercase">Momentum</p>
                        <p className="text-xs font-black text-white">{ev.momentum}%</p>
                      </div>
                      <ChevronRight size={14} className={isSelected ? 'text-cyan-400' : 'text-slate-600'} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 text-slate-500">
                <p className="text-xs">No match timeline events loaded. Try importing events in Ingestion Center.</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Exposure Engine Outputs */}
        <div className="flex flex-col gap-6">
          
          {/* Section 1: Event Agent Impact */}
          <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass space-y-4">
            <div>
              <span className="text-[9px] bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded font-extrabold uppercase">
                Event Agent
              </span>
              <h4 className="text-sm font-bold text-white uppercase mt-1.5">Impact Assessment</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Event Impact Score */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase mb-1">Event Impact</span>
                <p className="text-xl font-black text-white">{activeEventDetails.eventImpactScore} / 100</p>
              </div>

              {/* Exposure Estimate */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-center">
                <span className="text-[9px] text-slate-500 font-bold uppercase mb-1">Exposure Est.</span>
                <p className="text-xl font-black text-brand-emerald">{activeEventDetails.exposureEstimate}%</p>
              </div>

            </div>

            {/* Engagement Opportunity */}
            <div className="bg-indigo-950/10 border border-indigo-900/30 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-indigo-300">
              <Zap size={16} className="text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold uppercase text-[9px] tracking-wider text-indigo-400">Opportunity Recommendation</p>
                <p className="mt-0.5 leading-relaxed font-sans">{activeEventDetails.engagementOpportunity}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Exposure Engine Output */}
          <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass space-y-4">
            <div>
              <span className="text-[9px] bg-cyan-950 text-brand-glow border border-cyan-800 px-2 py-0.5 rounded font-extrabold uppercase">
                Exposure Engine
              </span>
              <h4 className="text-sm font-bold text-white uppercase mt-1.5">{activeSponsorName} Visibility</h4>
            </div>

            <div className="space-y-4">
              
              {/* Estimated Exposure */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-400 font-semibold">Estimated Exposure Score</span>
                  <span className="font-bold text-white">{activeEventDetails.estimatedExposure}%</span>
                </div>
                <div className="w-full bg-dark-950 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${activeEventDetails.estimatedExposure}%` }}
                  />
                </div>
              </div>

              {/* Visibility Probability */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-400 font-semibold">Visibility Probability</span>
                  <span className="font-bold text-brand-glow">{activeEventDetails.visibilityProbability}%</span>
                </div>
                <div className="w-full bg-dark-950 rounded-full h-2">
                  <div 
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${activeEventDetails.visibilityProbability}%` }}
                  />
                </div>
              </div>

              {/* Reach Score */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase">Reach Score Estimate</span>
                  <p className="text-lg font-black text-white mt-0.5">
                    {activeEventDetails.reachScore ? activeEventDetails.reachScore.toLocaleString() : '0'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Target size={16} />
                </div>
              </div>

            </div>

            <div className="text-[9px] text-slate-500 border-t border-slate-800/60 pt-3">
              * Calculations are synthesized dynamically using the brand's placement parameters and the match event momentum weight.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EventAgent;
