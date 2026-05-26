import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LiveStadium from '../components/LiveStadium';
import { 
  Tv, Cpu, ShieldCheck, Heart, Sparkles, 
  ArrowRight, Play, CheckCircle2, AlertCircle 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans select-none">
      
      {/* Landing Navbar */}
      <nav className="h-20 border-b border-slate-800/40 bg-dark-950/50 backdrop-blur-md px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-neon-cyan">
            S
          </div>
          <span className="font-extrabold text-white text-base uppercase tracking-wider text-glow-cyan">
            SponsorScope AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="text-xs font-bold bg-gradient-to-tr from-cyan-500 to-indigo-600 hover:opacity-95 text-white rounded-xl px-4 py-2 shadow-neon-cyan cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-brand-glow uppercase tracking-wider mb-4">
              <Sparkles size={12} /> Next-Gen Sports Analytics
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight font-sans tracking-tight">
              Know Exactly What <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-indigo-600 bg-clip-text text-transparent">
                Sponsors Earn.
              </span>
            </h1>
          </div>
          
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-lg">
            Measure sponsorship impact in cricket broadcasts using advanced AI. Track real-time jersey exposures, boundary-board sentiment, and audience engagement automatically.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-sm font-bold bg-gradient-to-tr from-cyan-500 to-indigo-600 hover:opacity-90 text-white rounded-xl px-6 py-3 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>Launch Platform</span>
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigate('/upload-center')}
              className="flex items-center gap-2 text-sm font-bold bg-dark-900 hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-xl px-6 py-3 transition cursor-pointer"
            >
              <Play size={16} className="text-cyan-400 fill-cyan-400/20" />
              <span>Upload Match</span>
            </button>
          </div>

          {/* Quick Metrics HUD */}
          <div className="grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8 mt-4">
            <div>
              <p className="text-2xl font-black text-white">94.2%</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Logo Confidence</p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-emerald">3.88x</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Peak Sponsor ROI</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">8M+</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Daily Impressions</p>
            </div>
          </div>
        </div>

        {/* Stadium Simulation Wrapper */}
        <div className="relative">
          <LiveStadium />
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 border-t border-slate-900 bg-dark-950/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Platform Features Built for Major Leagues
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              SponsorScope combines eight vision and analytics agents into a single sports-business dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Tv size={20} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Vision Tracking Agent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Frame-by-frame logo logging across jersey fronts, boundaries, sight screens, and interview backdrops with sub-second precision.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Cpu size={20} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Engagement & Sentiment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connects live broadcast camera angles directly against social sentiments (positive, neutral, negative) and engagement spikes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sponsor Copilot Agent</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An intelligent advisor that suggests optimization strategies: where to reposition logos to boost impressions and ROI.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">SaaS Plans for Brands & Broadcasters</h2>
            <p className="text-sm text-slate-400 mt-2">Get precise metric logging and immediate ROI evaluations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sponsor Growth</span>
                <p className="text-3xl font-black text-white mt-2">$2,499<span className="text-xs font-normal text-slate-500"> /mo</span></p>
                <div className="border-t border-slate-800 my-4" />
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> 1 User Account</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> 5 Matches Analyzed /mo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Core Vision Agent</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Export CSV Reports</li>
                </ul>
              </div>
              <button 
                onClick={() => navigate('/signup')} 
                className="w-full bg-dark-900 border border-slate-700/60 hover:bg-slate-800 text-white font-bold rounded-xl py-2.5 text-xs mt-6 cursor-pointer"
              >
                Choose Plan
              </button>
            </div>

            {/* Tier 2 - Popular */}
            <div className="glass-panel p-8 rounded-3xl border-cyan-500/40 relative flex flex-col justify-between shadow-neon-cyan">
              <span className="absolute -top-3 right-6 bg-gradient-to-r from-cyan-400 to-indigo-600 text-dark-950 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Enterprise Brand</span>
                <p className="text-3xl font-black text-white mt-2">$5,999<span className="text-xs font-normal text-slate-500"> /mo</span></p>
                <div className="border-t border-slate-800 my-4" />
                <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-glow" /> 5 User Accounts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-glow" /> Unlimited Match Uploads</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-glow" /> All 8 AI Agents Equipped</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-glow" /> Interactive Exposure Heatmap</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-brand-glow" /> Dynamic AI Copilot Chat</li>
                </ul>
              </div>
              <button 
                onClick={() => navigate('/signup')} 
                className="w-full bg-gradient-to-tr from-cyan-500 to-indigo-600 hover:opacity-90 text-white font-bold rounded-xl py-2.5 text-xs mt-6 cursor-pointer shadow-md"
              >
                Choose Plan
              </button>
            </div>

            {/* Tier 3 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Broadcaster Pro</span>
                <p className="text-3xl font-black text-white mt-2">Custom Pricing</p>
                <div className="border-t border-slate-800 my-4" />
                <ul className="space-y-2.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Dedicated API Pipelines</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Custom Neural Net training</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Real-time live feeds integration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-400" /> Dedicated Account Engineer</li>
                </ul>
              </div>
              <button 
                onClick={() => navigate('/signup')} 
                className="w-full bg-dark-900 border border-slate-700/60 hover:bg-slate-800 text-white font-bold rounded-xl py-2.5 text-xs mt-6 cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-tr from-cyan-950/20 via-dark-950 to-indigo-950/20 border-t border-slate-900 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-black text-white">Ready to Boost Sponsor Engagement?</h2>
        <p className="text-xs text-slate-400 max-w-md leading-relaxed">
          Upload match highlights, run logo calculations, and extract campaign recommendations instantly.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-indigo-600 text-dark-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:opacity-95 transition cursor-pointer"
        >
          <span>Get Started Now</span>
          <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-600 border-t border-slate-900/60 mt-auto bg-dark-950/80">
        <p>© 2026 SponsorScope AI. All Rights Reserved. Measure. Predict. Increase Sponsor Impact.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
