import React, { useState } from 'react';
import { useAppState } from '../context/AppState';
import { FileText, FileSpreadsheet, Share2, Download, Loader2, CheckCircle2 } from 'lucide-react';

const Reports = () => {
  const { selectedSponsorId, selectedMatchId, addNotification } = useAppState();
  
  // Exporter loader states
  const [activeExporter, setActiveExporter] = useState(null); // pdf, csv, link

  const triggerExport = (type) => {
    setActiveExporter(type);
    
    setTimeout(() => {
      setActiveExporter(null);
      
      if (type === 'pdf') {
        addNotification('emerald', `Compiled Executive ROI PDF Report for ${selectedSponsorId.toUpperCase()} (${selectedMatchId})`);
      } else if (type === 'csv') {
        addNotification('emerald', `Exported 1,385 visual logo logs in CSV spreadsheet format.`);
      } else {
        addNotification('emerald', `Created live shareable link: http://sponsorscope.ai/share/session-5d8f2`);
      }
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-5 rounded-3xl border-slate-800 shadow-glass">
        <h3 className="text-lg font-bold text-white uppercase">Reports & Metadata Exporter</h3>
        <p className="text-xs text-slate-400">Generate executive-level documents summarizing sponsorship visual performances.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PDF Exporter Card */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between h-56">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <FileText size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wide">Executive PDF Brief</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidated PDF summary of visibility scores, engagement trends, and ROI indicators formatted for board review.
            </p>
          </div>

          <button
            onClick={() => triggerExport('pdf')}
            disabled={activeExporter !== null}
            className="w-full py-2.5 rounded-xl bg-dark-900 border border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-350 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition disabled:opacity-50"
          >
            {activeExporter === 'pdf' ? (
              <>
                <Loader2 size={12} className="animate-spin text-cyan-400" />
                <span>Assembling PDF layout...</span>
              </>
            ) : (
              <>
                <Download size={12} />
                <span>Compile PDF Report</span>
              </>
            )}
          </button>
        </div>

        {/* CSV Exporter Card */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between h-56">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <FileSpreadsheet size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wide">Frame Bounding CSV</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-second model detections logged: timestamps, coordinates, confidence averages, and overlay sectors.
            </p>
          </div>

          <button
            onClick={() => triggerExport('csv')}
            disabled={activeExporter !== null}
            className="w-full py-2.5 rounded-xl bg-dark-900 border border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-355 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition disabled:opacity-50"
          >
            {activeExporter === 'csv' ? (
              <>
                <Loader2 size={12} className="animate-spin text-cyan-400" />
                <span>Formatting columns...</span>
              </>
            ) : (
              <>
                <Download size={12} />
                <span>Export CSV Logs</span>
              </>
            )}
          </button>
        </div>

        {/* Link Exporter Card */}
        <div className="glass-panel p-6 rounded-2xl border-slate-800 flex flex-col justify-between h-56">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <Share2 size={20} />
            </div>
            <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wide">Shareable Dashboard</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Creates a secure, read-only URL token allowing external partners to interact with the ROI graphs.
            </p>
          </div>

          <button
            onClick={() => triggerExport('link')}
            disabled={activeExporter !== null}
            className="w-full py-2.5 rounded-xl bg-dark-900 border border-slate-850 hover:bg-slate-800 hover:border-slate-700 text-slate-355 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition disabled:opacity-50"
          >
            {activeExporter === 'link' ? (
              <>
                <Loader2 size={12} className="animate-spin text-cyan-400" />
                <span>Hashing secure token...</span>
              </>
            ) : (
              <>
                <Share2 size={12} />
                <span>Generate Secure Link</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Export history list */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 shadow-glass">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Export History Log</h4>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs bg-dark-950 p-3.5 rounded-xl border border-slate-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand-emerald" />
              <span className="text-slate-350 font-medium">SponsorScope_ROI_Final_Match-1.pdf</span>
            </div>
            <span className="text-slate-500">2 minutes ago</span>
          </div>
          <div className="flex justify-between items-center text-xs bg-dark-950 p-3.5 rounded-xl border border-slate-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-brand-emerald" />
              <span className="text-slate-355 font-medium">ModelDetections_Bounding_Raw.csv</span>
            </div>
            <span className="text-slate-500">Yesterday, 14:22</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Reports;
