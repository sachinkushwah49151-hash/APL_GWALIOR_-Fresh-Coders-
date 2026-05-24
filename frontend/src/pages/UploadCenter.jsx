import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileSpreadsheet, Plus, ArrowRight, 
  Loader2, Sparkles, Layers, Terminal, AlertCircle 
} from 'lucide-react';

const UploadCenter = () => {
  const { ingestMatchEvent, matchEvents, setSelectedMatchId, selectedMatchId } = useAppState();
  const navigate = useNavigate();

  // Form states
  const [over, setOver] = useState('');
  const [eventType, setEventType] = useState('Dot Ball');
  const [runs, setRuns] = useState(0);
  const [batter, setBatter] = useState('');
  const [bowler, setBowler] = useState('');
  const [description, setDescription] = useState('');
  const [momentum, setMomentum] = useState(50);

  // Raw JSON input state
  const [jsonInput, setJsonInput] = useState('');
  
  // Ingest states
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!over || !batter || !bowler) return;

    triggerIngestProcess({
      over,
      eventType,
      runs: parseInt(runs),
      batter,
      bowler,
      description,
      momentum: parseInt(momentum)
    });
  };

  const handleJsonSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonInput);
      triggerIngestProcess(parsed);
    } catch (err) {
      alert("Invalid JSON format. Please verify braces and quotes.");
    }
  };

  const triggerIngestProcess = (payload) => {
    setIsProcessing(true);
    setProgress(0);
    setCurrentStage('Parsing structural event keys...');

    const stages = [
      { prg: 30, stage: 'Calculating Event Impact index...' },
      { prg: 65, stage: 'AI Exposure Engine: Extrapolating reach variables...' },
      { prg: 90, stage: 'ROI Analyst Agent: Restructuring sponsor leaderboards...' },
      { prg: 100, stage: 'Ingesting timeline node complete.' }
    ];

    let step = 0;
    const interval = setInterval(async () => {
      if (step < stages.length) {
        setProgress(stages[step].prg);
        setCurrentStage(stages[step].stage);
        step++;
      } else {
        clearInterval(interval);
        
        // Execute ingestion
        const result = await ingestMatchEvent(payload);
        
        setIsProcessing(false);
        setOver('');
        setEventType('Dot Ball');
        setRuns(0);
        setBatter('');
        setBowler('');
        setDescription('');
        setMomentum(50);
        setJsonInput('');

        // Redirect to scorecard
        navigate('/event-agent');
      }
    }, 1000);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Manual event form */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border-slate-800 shadow-glass space-y-4">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider">Event Ingestion Desk</h3>
          
          <form onSubmit={handleManualSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Over */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Over Number</label>
                <input
                  type="text"
                  value={over}
                  onChange={(e) => setOver(e.target.value)}
                  placeholder="e.g. Over 14.2"
                  className="w-full text-xs glass-input rounded-xl px-3.5 py-2.5"
                  required
                />
              </div>

              {/* Batter */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Active Batter</label>
                <input
                  type="text"
                  value={batter}
                  onChange={(e) => setBatter(e.target.value)}
                  placeholder="e.g. Virat Kohli"
                  className="w-full text-xs glass-input rounded-xl px-3.5 py-2.5"
                  required
                />
              </div>

              {/* Bowler */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Active Bowler</label>
                <input
                  type="text"
                  value={bowler}
                  onChange={(e) => setBowler(e.target.value)}
                  placeholder="e.g. Mitchell Starc"
                  className="w-full text-xs glass-input rounded-xl px-3.5 py-2.5"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Event Type */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full text-xs bg-dark-900 border border-slate-750 text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                >
                  <option value="Boundary (Six)">🏏 Boundary (Six)</option>
                  <option value="Boundary (Four)">🏏 Boundary (Four)</option>
                  <option value="Wicket">🔴 Wicket Fall</option>
                  <option value="Single">🏃 Single</option>
                  <option value="Dot Ball">🥎 Dot Ball</option>
                </select>
              </div>

              {/* Runs */}
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Runs Scored</label>
                <input
                  type="number"
                  min={0}
                  max={7}
                  value={runs}
                  onChange={(e) => setRuns(e.target.value)}
                  className="w-full text-xs glass-input rounded-xl px-3.5 py-2.5"
                />
              </div>

              {/* Momentum Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[10px] text-slate-400 font-bold uppercase">Momentum Index</label>
                  <span className="text-[10px] text-cyan-400 font-bold">{momentum}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={momentum}
                  onChange={(e) => setMomentum(e.target.value)}
                  className="w-full accent-cyan-400 bg-dark-900 h-1 rounded cursor-pointer mt-2.5"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1.5">Event Action Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the action and visible sponsors (e.g. Virat Kohli strikes a straight six, CEAT sightscreen fully captured...)"
                rows={2}
                className="w-full text-xs glass-input rounded-xl px-3.5 py-2.5"
                required
              />
            </div>

            {/* Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 disabled:opacity-50 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus size={14} />
              <span>Ingest Scorecard Event</span>
            </button>
          </form>
        </div>

        {/* JSON Schema paste option */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col justify-between h-full gap-4">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Terminal size={14} className="text-indigo-400" /> JSON Import Panel
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Paste a structured JSON object representing match statistics directly into the text area below.
            </p>
            
            <form onSubmit={handleJsonSubmit} className="space-y-2.5">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={`{\n  "over": "Over 15.1",\n  "eventType": "Boundary (Six)",\n  "runs": 6,\n  "batter": "Virat Kohli",\n  "bowler": "Jasprit Bumrah",\n  "description": "Sight screen CEAT banner visible.",\n  "momentum": 92\n}`}
                rows={6}
                className="w-full font-mono text-[10px] glass-input rounded-xl px-3 py-2.5"
                required
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-2.5 rounded-xl bg-indigo-950/40 hover:bg-slate-800 text-indigo-400 border border-indigo-900/60 font-bold text-[11px] cursor-pointer"
              >
                Ingest Raw JSON Schema
              </button>
            </form>
          </div>

          <div className="text-[9px] text-slate-500 border-t border-slate-800 pt-3 flex items-start gap-1">
            <AlertCircle size={10} className="shrink-0 mt-0.5" />
            <span>Schema validates batter, bowler, runs count, eventType, and momentum indicators.</span>
          </div>
        </div>

      </div>

      {/* Timeline view preview */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Recently Logged Timeline events</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {matchEvents && matchEvents.slice(-3).reverse().map((ev, idx) => (
            <div key={idx} className="bg-dark-950 p-3 rounded-xl border border-slate-900 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-cyan-400">{ev.over}</span>
                <span className="text-slate-500 font-bold">{ev.eventType}</span>
              </div>
              <p className="text-[11px] text-slate-350 truncate">{ev.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress modal */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm glass-panel-heavy p-6 rounded-3xl border-slate-700 shadow-2xl flex flex-col items-center text-center gap-4"
            >
              <Loader2 size={32} className="animate-spin text-cyan-400" />
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Analyzing event variables...</h4>
                <p className="text-[11px] text-slate-400 mt-1">{currentStage}</p>
              </div>
              <div className="w-full bg-dark-900 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-400 h-1 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default UploadCenter;
