import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../context/AppState';
import { useNavigate } from 'react-router-dom';
import { 
  Bot, MessageSquare, X, Send, Mic, MicOff, Sparkles, 
  Compass, BarChart2, Video, FileText, Share2, Layers 
} from 'lucide-react';

const AIAssistant = () => {
  const { 
    assistantHistory, 
    sendAssistantMessage, 
    isAssistantOpen, 
    setIsAssistantOpen,
    addNotification
  } = useAppState();

  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  
  // Voice Input Speech Recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        addNotification('info', 'Listening to voice input...');
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      rec.onerror = () => {
        setIsListening(false);
        addNotification('warning', 'Voice recognition failed. Please try typing.');
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [SpeechRecognition]);

  // Scroll to bottom on message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [assistantHistory]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      addNotification('warning', 'Speech recognition not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setLoading(true);

    // Call state action which handles backend call + navigation callbacks
    await sendAssistantMessage(userText, (path) => {
      navigate(path);
      addNotification('info', `AI Assistant: Navigating to ${path}`);
    });

    setLoading(false);
  };

  const handlePresetPrompt = async (promptText) => {
    setInput(promptText);
    setTimeout(() => {
      // Small timeout so user can visually see it entered
      setInput(promptText);
    }, 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-neon-cyan hover:shadow-glass-hover focus:outline-none cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isAssistantOpen ? <X size={24} /> : <Bot size={26} className="animate-pulse" />}
      </motion.button>

      {/* Slide-out Sidebar Chat Panel */}
      <AnimatePresence>
        {isAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-16 right-0 w-[350px] md:w-[400px] h-[550px] rounded-2xl glass-panel-heavy border-slate-700 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-dark-900 via-indigo-950/20 to-dark-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Bot size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    SponsorScope AI <Sparkles size={12} className="text-cyan-400" />
                  </h4>
                  <p className="text-[10px] text-cyan-400 font-semibold">Active Assistant Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAssistantOpen(false)}
                className="text-slate-400 hover:text-white focus:outline-none cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {assistantHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role !== 'user' && (
                      <div className="w-6 h-6 rounded-full bg-dark-900 border border-slate-800 flex items-center justify-center shrink-0">
                        <Bot size={12} className="text-cyan-400" />
                      </div>
                    )}
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white rounded-tr-none' 
                        : 'bg-dark-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center text-xs text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested Prompts & Shortcuts */}
            <div className="px-4 py-2 border-t border-slate-800/40 bg-dark-950/40">
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mb-1.5">Suggested Prompts</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Show highest ROI",
                  "Explain engagement",
                  "Go to Vision Agent",
                  "Generate campaign"
                ].map((txt) => (
                  <button
                    key={txt}
                    onClick={() => handlePresetPrompt(txt)}
                    className="text-[10px] bg-dark-800 hover:bg-slate-800 text-slate-300 border border-slate-700/60 rounded-full px-2.5 py-1 transition cursor-pointer"
                  >
                    {txt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions Footer Panel */}
            <div className="px-4 py-2 border-t border-slate-800/40 bg-dark-950/60 flex items-center justify-around gap-1.5">
              <button 
                onClick={() => { navigate('/reports'); setIsAssistantOpen(false); }} 
                className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400 transition cursor-pointer"
              >
                <FileText size={14} />
                <span>Report</span>
              </button>
              <button 
                onClick={() => { navigate('/upload-center'); setIsAssistantOpen(false); }} 
                className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400 transition cursor-pointer"
              >
                <Video size={14} />
                <span>Upload</span>
              </button>
              <button 
                onClick={() => { navigate('/ad-generator'); setIsAssistantOpen(false); }} 
                className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400 transition cursor-pointer"
              >
                <Share2 size={14} />
                <span>Create Ad</span>
              </button>
              <button 
                onClick={() => { navigate('/roi-agent'); setIsAssistantOpen(false); }} 
                className="flex flex-col items-center gap-1 text-[10px] text-slate-400 hover:text-cyan-400 transition cursor-pointer"
              >
                <BarChart2 size={14} />
                <span>Compare ROI</span>
              </button>
            </div>

            {/* Form Input */}
            <form onSubmit={handleSend} className="p-3 bg-dark-900 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-2 rounded-xl border transition flex items-center justify-center shrink-0 cursor-pointer ${
                  isListening 
                    ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' 
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                title="Voice Input"
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening..." : "Ask SponsorScope..."}
                className="flex-1 text-xs bg-dark-950 border border-slate-800 text-white rounded-xl px-3 py-2 focus:ring-1 focus:ring-cyan-500 focus:outline-none placeholder-slate-500"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md hover:opacity-90"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
