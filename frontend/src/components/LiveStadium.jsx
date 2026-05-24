import React from 'react';
import { motion } from 'framer-motion';

const LiveStadium = () => {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden rounded-3xl bg-dark-900 border border-slate-800 shadow-glass">
      
      {/* Stadium Grid & Radial Gradient Background */}
      <div className="absolute inset-0 bg-stadium-light opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-dark-900 to-dark-950 opacity-90" />
      
      {/* Spotlight beams (Rotating) */}
      <div className="absolute -top-10 left-10 w-48 h-96 bg-cyan-500/10 blur-[60px] rounded-full rotate-12 origin-top animate-pulse-slow" />
      <div className="absolute -top-10 right-10 w-48 h-96 bg-indigo-500/10 blur-[60px] rounded-full -rotate-12 origin-top animate-pulse-slow" />

      {/* SVG Cricket Field */}
      <svg
        viewBox="0 0 800 600"
        className="w-[90%] h-[90%] max-w-[650px] z-10 select-none drop-shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      >
        {/* Outfield boundary */}
        <ellipse
          cx="400"
          cy="300"
          rx="320"
          ry="240"
          fill="none"
          stroke="rgba(6, 182, 212, 0.4)"
          strokeWidth="3"
          strokeDasharray="8,6"
        />
        <ellipse
          cx="400"
          cy="300"
          rx="315"
          ry="235"
          fill="rgba(16, 185, 129, 0.04)"
          stroke="rgba(16, 185, 129, 0.2)"
          strokeWidth="1"
        />

        {/* 30 Yard Circle */}
        <ellipse
          cx="400"
          cy="300"
          rx="180"
          ry="135"
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
        />

        {/* The Pitch Wicket Zone */}
        <rect
          x="385"
          y="230"
          width="30"
          height="140"
          rx="3"
          fill="#d9a05b"
          opacity="0.9"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
          className="shadow-neon-cyan"
        />

        {/* Crease lines */}
        <line x1="385" y1="245" x2="415" y2="245" stroke="white" strokeWidth="1" />
        <line x1="385" y1="355" x2="415" y2="355" stroke="white" strokeWidth="1" />

        {/* Stumps */}
        <circle cx="392" cy="242" r="1.5" fill="red" />
        <circle cx="400" cy="242" r="1.5" fill="red" />
        <circle cx="408" cy="242" r="1.5" fill="red" />

        <circle cx="392" cy="358" r="1.5" fill="red" />
        <circle cx="400" cy="358" r="1.5" fill="red" />
        <circle cx="408" cy="358" r="1.5" fill="red" />

        {/* Sponsor Advertising Placards along boundary */}
        {/* TATA banner top */}
        <g className="cursor-pointer group">
          <rect x="340" y="45" width="120" height="20" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
          <text x="400" y="59" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">🚙 TATA MOTORS</text>
        </g>

        {/* Jio banner bottom */}
        <g className="cursor-pointer group">
          <rect x="340" y="535" width="120" height="20" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <text x="400" y="549" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">📱 JIO DIGITAL</text>
        </g>

        {/* Dream11 banner left */}
        <g className="cursor-pointer group">
          <rect x="50" y="290" width="100" height="20" rx="3" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
          <text x="100" y="304" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">🎯 DREAM11</text>
        </g>

        {/* CEAT banner right */}
        <g className="cursor-pointer group">
          <rect x="650" y="290" width="100" height="20" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
          <text x="700" y="304" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">🚗 CEAT TIRES</text>
        </g>
      </svg>

      {/* Floating Sponsor Card 1 */}
      <motion.div
        className="absolute top-12 left-10 p-3 glass-panel rounded-xl flex items-center gap-2 border-cyan-500/20 shadow-lg pointer-events-none hidden md:flex"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <span className="text-xl">🚙</span>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">TATA Exposure</p>
          <p className="text-xs font-bold text-white">94% Confidence</p>
        </div>
      </motion.div>

      {/* Floating Sponsor Card 2 */}
      <motion.div
        className="absolute bottom-16 right-10 p-3 glass-panel rounded-xl flex items-center gap-2 border-emerald-500/20 shadow-lg pointer-events-none hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-xl">🚗</span>
        <div>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">CEAT ROI</p>
          <p className="text-xs font-bold text-brand-emerald">3.88x Efficiency</p>
        </div>
      </motion.div>

      {/* Central HUD Metrics */}
      <div className="absolute top-4 glass-panel px-4 py-1.5 rounded-full flex items-center gap-4 text-xs font-medium border-slate-800">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE STREAM</span>
        <span className="text-slate-400">|</span>
        <span className="text-cyan-400">AI VISIBILITY LOGGED: 1,385 frames</span>
      </div>
    </div>
  );
};

export default LiveStadium;
