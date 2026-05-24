import React, { useState } from 'react';

const HeatmapField = () => {
  // Filter states
  const [selectedOver, setSelectedOver] = useState('All');
  const [selectedPlayer, setSelectedPlayer] = useState('All');
  const [selectedAngle, setSelectedAngle] = useState('All');
  
  // Highlighted zone state
  const [activeZone, setActiveZone] = useState(null);

  // Mock data for zones, values represent exposure scores (out of 100) under different filters
  const zones = {
    pitch: {
      label: "Wicket Pitch Zone",
      x: 400, y: 300, rx: 25, ry: 70, angle: 0,
      tata: 45, ceat: 10, jio: 5, dream11: 65,
      description: "Jersey chest/sleeve logos and stumps branding are visible here."
    },
    boundary_straight_top: {
      label: "Sight-Screen (North)",
      x: 400, y: 80, rx: 65, ry: 20, angle: 0,
      tata: 70, ceat: 95, jio: 80, dream11: 40,
      description: "Sight-screen boards. Captured extensively during straight drives."
    },
    boundary_straight_bottom: {
      label: "Sight-Screen (South)",
      x: 400, y: 520, rx: 65, ry: 20, angle: 0,
      tata: 85, ceat: 80, jio: 75, dream11: 50,
      description: "Sight-screen boards. Active during bowler run-up tracking."
    },
    boundary_midwicket_left: {
      label: "Mid-Wicket Rope (West)",
      x: 120, y: 300, rx: 20, ry: 75, angle: 10,
      tata: 90, ceat: 72, jio: 88, dream11: 60,
      description: "Boundary advertising. High engagement during hook and pull shots."
    },
    boundary_midwicket_right: {
      label: "Mid-Wicket Rope (East)",
      x: 680, y: 300, rx: 20, ry: 75, angle: -10,
      tata: 92, ceat: 88, jio: 60, dream11: 70,
      description: "Boundary advertising. Captured during sweeps and drives."
    },
    covers: {
      label: "Covers Board (Offside)",
      x: 230, y: 190, rx: 40, ry: 30, angle: -45,
      tata: 50, ceat: 60, jio: 95, dream11: 42,
      description: "Digital boards. Highlighted during cover-drive replays."
    }
  };

  // Dynamic color helper based on average exposure of active sponsor or all sponsors
  const getHeatColor = (zoneKey) => {
    const zone = zones[zoneKey];
    let avg = (zone.tata + zone.ceat + zone.jio + zone.dream11) / 4;
    
    // Modify based on filters
    if (selectedAngle === 'Bowler End') avg += 8;
    if (selectedAngle === 'Spidercam') avg -= 15;
    if (selectedPlayer === 'MS Dhoni' && zoneKey === 'pitch') avg += 20;

    avg = Math.min(Math.max(Math.round(avg), 0), 100);

    if (avg > 80) return "fill-red-500/50 stroke-red-400";
    if (avg > 60) return "fill-amber-500/50 stroke-amber-400";
    return "fill-emerald-500/30 stroke-emerald-400";
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-slate-800 shadow-glass flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Interactive Exposure Heatmap</h3>
          <p className="text-xs text-slate-400">Hover over zones on the field to inspect sponsor visual weight.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Over Filter */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Over</label>
            <select
              value={selectedOver}
              onChange={(e) => setSelectedOver(e.target.value)}
              className="bg-dark-900 border border-slate-700 text-xs text-white rounded px-2.5 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="All">All Overs (1-20)</option>
              <option value="Powerplay">Powerplay (1-6)</option>
              <option value="Middle">Middle Overs (7-15)</option>
              <option value="Death">Death Overs (16-20)</option>
            </select>
          </div>

          {/* Player Filter */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Active Batter</label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="bg-dark-900 border border-slate-700 text-xs text-white rounded px-2.5 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="All">All Batters</option>
              <option value="Virat Kohli">Virat Kohli</option>
              <option value="MS Dhoni">MS Dhoni</option>
              <option value="Rohit Sharma">Rohit Sharma</option>
            </select>
          </div>

          {/* Camera Angle Filter */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Camera Angle</label>
            <select
              value={selectedAngle}
              onChange={(e) => setSelectedAngle(e.target.value)}
              className="bg-dark-900 border border-slate-700 text-xs text-white rounded px-2.5 py-1 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="All">All Camera Angles</option>
              <option value="Bowler End">Bowler's End Zoom</option>
              <option value="Mid-Wicket Wide">Mid-Wicket Wide Tracking</option>
              <option value="Spidercam">Spidercam Over-Pitch</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* SVG Heatmap Field */}
        <div className="lg:col-span-2 relative flex items-center justify-center bg-dark-950 p-4 rounded-xl border border-slate-800">
          <svg viewBox="0 0 800 600" className="w-full h-auto max-w-[550px] select-none">
            {/* Field boundaries */}
            <ellipse cx="400" cy="300" rx="360" ry="260" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            <ellipse cx="400" cy="300" rx="350" ry="250" fill="rgba(16, 185, 129, 0.02)" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="2" />
            
            {/* 30-yard ring */}
            <ellipse cx="400" cy="300" rx="200" ry="140" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />

            {/* Pitch */}
            <rect x="388" y="240" width="24" height="120" fill="rgba(217, 160, 91, 0.2)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="0.5" />

            {/* Hotspot Zones */}
            {Object.entries(zones).map(([key, zone]) => (
              <g
                key={key}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setActiveZone(zone)}
                onMouseLeave={() => setActiveZone(null)}
              >
                <ellipse
                  cx={zone.x}
                  cy={zone.y}
                  rx={zone.rx}
                  ry={zone.ry}
                  transform={`rotate(${zone.angle}, ${zone.x}, ${zone.y})`}
                  className={`${getHeatColor(key)} stroke-2 transition-all duration-200 hover:fill-opacity-70`}
                />
                {/* Visual anchor dots */}
                <circle cx={zone.x} cy={zone.y} r="3" className="fill-white/40" />
              </g>
            ))}
          </svg>
        </div>

        {/* Detailed Zone Panel */}
        <div className="glass-panel p-5 rounded-xl border-slate-700 h-full flex flex-col justify-between min-h-[300px]">
          {activeZone ? (
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] bg-cyan-950 text-brand-glow font-bold uppercase px-2 py-0.5 rounded border border-cyan-800">
                  Zone Identified
                </span>
                <h4 className="text-lg font-bold text-white mt-1.5">{activeZone.label}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">{activeZone.description}</p>
              </div>

              <div className="border-t border-slate-800 pt-3 flex flex-col gap-2.5">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wide">Sponsor Visibility Scores</p>
                
                {/* TATA bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">🚙 TATA</span>
                    <span className="font-bold text-white">{activeZone.tata}%</span>
                  </div>
                  <div className="w-full bg-dark-900 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${activeZone.tata}%` }}></div>
                  </div>
                </div>

                {/* CEAT bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">🚗 CEAT</span>
                    <span className="font-bold text-white">{activeZone.ceat}%</span>
                  </div>
                  <div className="w-full bg-dark-900 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${activeZone.ceat}%` }}></div>
                  </div>
                </div>

                {/* Jio bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">📱 Jio</span>
                    <span className="font-bold text-white">{activeZone.jio}%</span>
                  </div>
                  <div className="w-full bg-dark-900 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${activeZone.jio}%` }}></div>
                  </div>
                </div>

                {/* Dream11 bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">🎯 Dream11</span>
                    <span className="font-bold text-white">{activeZone.dream11}%</span>
                  </div>
                  <div className="w-full bg-dark-900 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${activeZone.dream11}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <span className="text-4xl text-slate-600 mb-2">🎯</span>
              <p className="text-sm font-semibold text-slate-300">Inspect Stadium Zones</p>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                Hover over the highlighted circles on the pitch or boundary rope to view zone exposure metrics.
              </p>
            </div>
          )}

          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3">
            * Coordinates map the cricket stadium boundary boards, digital banners, and batter jerseys.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapField;
