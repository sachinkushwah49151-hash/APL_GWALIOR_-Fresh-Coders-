import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../context/AppState';
import { 
  Bot, Send, Sparkles, CheckCircle2, TrendingUp, 
  HelpCircle, AlertCircle, Compass 
} from 'lucide-react';

const Copilot = () => {
  const { 
    copilotHistory, 
    sendCopilotMessage, 
    selectedSponsorId, 
    setSelectedSponsorId, 
    addNotification 
  } = useAppState();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [copilotHistory]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setLoading(true);

    await sendCopilotMessage(userText);
    setLoading(false);
  };

  const handlePresetPrompt = async (promptText) => {
    setInput(promptText);
  };

  const handleSponsorChange = (e) => {
    const sid = e.target.value;
    setSelectedSponsorId(sid);
    addNotification('info', `Copilot session initialized for: ${sid.toUpperCase()}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      
      {/* Session config Header */}
      <div className="glass-panel p-5 rounded-3xl border-slate-800 shadow-glass flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Compass size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Brand ROI Copilot</h3>
            <p className="text-xs text-slate-400">Consult the strategist agent on sponsor visibility placements.</p>
          </div>
        </div>

        {/* Brand Focus selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold uppercase">Focus Brand:</span>
          <select 
            value={selectedSponsorId} 
            onChange={handleSponsorChange}
            className="bg-dark-950 border border-slate-800 text-xs font-semibold text-slate-300 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
          >
            <option value="ceat">🚗 CEAT Tires</option>
            <option value="tata">🚙 TATA Motors</option>
            <option value="jio">📱 Jio Network</option>
            <option value="dream11">🎯 Dream11</option>
          </select>
        </div>
      </div>

      {/* Main chat window split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        
        {/* Chat log list */}
        <div className="lg:col-span-2 glass-panel rounded-3xl border-slate-800 shadow-glass flex flex-col h-full overflow-hidden">
          
          {/* Chat content scrollable box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {copilotHistory.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.role !== 'user' && (
                    <div className="w-8 h-8 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-center shrink-0">
                      <Bot size={16} className="text-cyan-400" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white rounded-tr-none' 
                        : 'bg-dark-950/80 border border-slate-850 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>

                    {/* Copilot extra metadata details (uplift indicators) */}
                    {msg.role !== 'user' && msg.uplift && (
                      <div className="flex flex-wrap gap-2 mt-1 pl-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 text-[9px] font-bold text-brand-emerald border border-emerald-900">
                          <TrendingUp size={10} /> +{msg.uplift}% Expected Uplift
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950 text-[9px] font-bold text-brand-glow border border-cyan-800">
                          Confidence: {msg.confidence}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start items-center gap-2 text-xs text-slate-500">
                <Bot size={16} className="animate-spin text-cyan-400" />
                <span>Copilot is parsing match variables...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form input */}
          <form onSubmit={handleSend} className="p-3 bg-dark-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask: 'How to increase exposure?' or 'What caused low ROI?'"
              className="flex-1 text-xs bg-dark-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-cyan-500 focus:outline-none placeholder-slate-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md hover:opacity-90"
            >
              <Send size={16} />
            </button>
          </form>

        </div>

        {/* Sidebar suggestions panel */}
        <div className="glass-panel p-5 rounded-3xl border-slate-800 shadow-glass flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={14} className="text-cyan-400" /> Suggested Queries
            </h4>
            
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'How can we increase placement exposure?', query: 'How increase exposure?' },
                { label: 'Where is our best sponsor placement?', query: 'Best sponsor placement?' },
                { label: 'What caused our recent drop in ROI?', query: 'What caused low ROI?' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetPrompt(item.query)}
                  className="w-full text-left text-xs bg-dark-900 hover:bg-slate-800/40 text-slate-300 border border-slate-800 hover:border-slate-700 rounded-xl p-3 transition cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 mt-6">
            <h5 className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
              <AlertCircle size={12} className="text-amber-500" /> Advisor Confidence
            </h5>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Decisions are based on past 24 matches of historical IPL visual parameters and social comment indexes.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Copilot;
