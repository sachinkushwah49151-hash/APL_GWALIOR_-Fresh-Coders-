import React, { useState, useEffect } from 'react';
import { useAppState } from '../context/AppState';
import { 
  Megaphone, Zap, Camera, Sparkles, Copy, 
  RefreshCw, Check, ArrowRight, Share2 
} from 'lucide-react';

const AdGenerator = () => {
  const { selectedSponsorId, addNotification } = useAppState();
  
  // States
  const [adOutput, setAdOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [triggerEvent, setTriggerEvent] = useState('Exposure drop below 70% in Over 14');

  // Load Predictors mock values from AppState
  const { cameraPredictions, viralPredictions } = useAppState();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ad-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sponsorId: selectedSponsorId, triggerType: triggerEvent })
      });
      if (response.ok) {
        const data = await response.json();
        setAdOutput(data.campaigns);
        addNotification('info', `AI Ad Generator: Campaigns generated for ${selectedSponsorId.toUpperCase()}`);
      } else {
        throw new Error();
      }
    } catch (e) {
      // Offline fallback
      setTimeout(() => {
        const brand = selectedSponsorId.toUpperCase();
        setAdOutput({
          instagram: `🔥 UNSTOPPABLE! Just like ${brand}'s high-performance grip, today's run chase is keeping us on the edge of our seats! 🏏✨ Who will hit the next massive six? Comment below! 👇 #IPL2026 #PerformanceUnleashed #${brand}Cricket`,
          linkedin: `Analytics in Action: How does real-time exposure turn into digital value? During the IPL 2026 Final, ${brand} recorded peak audience visibility with a 93% brand recall confidence score. Discover how we're driving premium sponsorships forward. 📈🏏 #SportsBusiness #SponsorshipROI #BrandImpact`,
          twitter: `Boom! 💥 That went straight into the ${brand} boundary screens! Unmatched power and precision. What a hit! #IPL2026 #SponsorScope`,
          reel: `[Video Concept]: 5-second zoom-in on the boundary-hit logo, transition to a fan roaring, overlaid with a live engagement counter that shoots up. Sound: Fast sports percussion. Text overlay: 'Exposure is good. Impact is everything.'`
        });
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [selectedSponsorId]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addNotification('info', `Copied ${key} campaign copy to clipboard.`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      
      {/* 3 Columns Split Layout for Predictors & recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Viral Moment Predictor */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-red-950 text-brand-rose border border-red-900 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                <Zap size={10} /> Live Virality Prediction
              </span>
              <span className="text-xs text-slate-500 font-bold">Predictor Agent</span>
            </div>

            <div className="flex items-center gap-6 mt-2">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center font-black text-red-500 text-xl shadow-md">
                {viralPredictions ? viralPredictions.viralityProbability : 87}%
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Viral Moment Detected</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Expected reach: <strong className="text-white">{viralPredictions ? viralPredictions.expectedReach : '1.2M - 1.8M'}</strong>
                </p>
              </div>
            </div>

            <div className="bg-dark-950 p-3 rounded-xl border border-slate-900 text-xs">
              <p className="text-slate-500 font-bold uppercase text-[9px] mb-1">Trigger Event</p>
              <p className="text-slate-200 font-medium">
                {viralPredictions ? viralPredictions.triggerEvent : 'MS Dhoni hitting a last-ball six over boundary boards.'}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-6 flex flex-wrap gap-2">
            <button className="bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl cursor-pointer">
              Deploy Campaign Now
            </button>
            <button className="bg-dark-900 hover:bg-slate-800 text-slate-300 font-semibold text-[10px] px-3.5 py-2 border border-slate-800 rounded-xl cursor-pointer">
              Boost Social Budget ($10k)
            </button>
          </div>
        </div>

        {/* Smart Camera Recommendation */}
        <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] bg-cyan-950 text-brand-glow border border-cyan-800 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                <Camera size={10} /> Camera Angle Analyst
              </span>
              <span className="text-xs text-slate-500 font-bold">Camera Agent</span>
            </div>

            <div className="space-y-2">
              {(cameraPredictions?.cameraAngles || [
                { angle: "Bowler's End Zoom", performanceScore: 92, visibilityUplift: 18, primarySponsor: "TATA" },
                { angle: "Mid-Wicket Wide Tracking", performanceScore: 88, visibilityUplift: 22, primarySponsor: "CEAT" }
              ]).map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-dark-900/50 p-2 rounded-xl border border-slate-850 text-xs">
                  <div>
                    <p className="font-bold text-slate-200">{c.angle}</p>
                    <p className="text-[9px] text-slate-500">Optimizes: {c.primarySponsor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-brand-emerald font-bold">+{c.visibilityUplift}% Uplift</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-6 text-[10px] text-slate-400">
            <strong>Optimal Suggestion:</strong> {cameraPredictions ? cameraPredictions.optimizedSuggestion : 'Shift 15% display time to Mid-Wicket Wide angles.'}
          </div>
        </div>

      </div>

      {/* Social Campaign Copy Generator */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone size={16} className="text-cyan-400" /> AI Ad Generator (Creative Studio)
            </h4>
            <p className="text-xs text-slate-400">Generates real-time ad copy and concepts if exposure levels decrease.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={triggerEvent}
              onChange={(e) => setTriggerEvent(e.target.value)}
              className="bg-dark-950 border border-slate-800 text-[10px] font-bold text-slate-400 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="Exposure drop below 70% in Over 14">Trigger: Over 14 Drop (68%)</option>
              <option value="Match Wicket Highlights Event">Trigger: Wicket Highlights Event</option>
            </select>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 disabled:opacity-50 text-white font-bold text-[10px] rounded-xl px-3.5 py-1.5 cursor-pointer shadow-md"
            >
              <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <Sparkles className="animate-pulse mx-auto mb-2 text-cyan-400" size={24} />
            <span>AI creative engines are writing copy proposals...</span>
          </div>
        ) : (
          adOutput && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Instagram */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-pink-400 font-bold uppercase tracking-wider">Instagram Feed</span>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans">{adOutput.instagram}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(adOutput.instagram, 'instagram')}
                  className="w-max flex items-center gap-1.5 text-slate-400 hover:text-white transition mt-4 text-[10px] cursor-pointer"
                >
                  {copiedKey === 'instagram' ? <Check size={12} className="text-brand-emerald" /> : <Copy size={12} />}
                  <span>{copiedKey === 'instagram' ? 'Copied' : 'Copy Post'}</span>
                </button>
              </div>

              {/* LinkedIn */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">LinkedIn Professional</span>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans">{adOutput.linkedin}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(adOutput.linkedin, 'linkedin')}
                  className="w-max flex items-center gap-1.5 text-slate-400 hover:text-white transition mt-4 text-[10px] cursor-pointer"
                >
                  {copiedKey === 'linkedin' ? <Check size={12} className="text-brand-emerald" /> : <Copy size={12} />}
                  <span>{copiedKey === 'linkedin' ? 'Copied' : 'Copy Article'}</span>
                </button>
              </div>

              {/* Twitter/X */}
              <div className="bg-dark-950 p-4 rounded-2xl border border-slate-900 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-200 font-bold uppercase tracking-wider">Twitter / X post</span>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-sans">{adOutput.twitter}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(adOutput.twitter, 'twitter')}
                  className="w-max flex items-center gap-1.5 text-slate-400 hover:text-white transition mt-4 text-[10px] cursor-pointer"
                >
                  {copiedKey === 'twitter' ? <Check size={12} className="text-brand-emerald" /> : <Copy size={12} />}
                  <span>{copiedKey === 'twitter' ? 'Copied' : 'Copy Post'}</span>
                </button>
              </div>

              {/* Reel Video concept */}
              <div className="bg-indigo-950/20 p-4 rounded-2xl border border-indigo-900/40 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Short Reel video concept</span>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed italic font-sans">{adOutput.reel}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(adOutput.reel, 'reel')}
                  className="w-max flex items-center gap-1.5 text-slate-400 hover:text-white transition mt-4 text-[10px] cursor-pointer"
                >
                  {copiedKey === 'reel' ? <Check size={12} className="text-brand-emerald" /> : <Copy size={12} />}
                  <span>{copiedKey === 'reel' ? 'Copied' : 'Copy Concept'}</span>
                </button>
              </div>

            </div>
          )
        )}
      </div>

    </div>
  );
};

export default AdGenerator;
