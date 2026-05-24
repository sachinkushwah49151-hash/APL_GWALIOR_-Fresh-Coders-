import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stadium-light opacity-30 pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-neon-cyan select-none">
            S
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">Reset Password</h2>
          <p className="text-xs text-slate-400">Receive an artificial reset link for your workspace.</p>
        </div>

        {sent ? (
          <div className="flex flex-col gap-4 text-center">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-brand-emerald text-xs rounded-xl">
              An email was sent to <strong className="text-white">{email}</strong>. Check your inbox to configure a new password.
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white transition cursor-pointer mt-2"
            >
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs glass-input rounded-xl pl-10 pr-4 py-3"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md cursor-pointer mt-2"
            >
              Send Reset Instructions
            </button>

            <p className="text-center text-xs text-slate-500">
              Never mind, let's{' '}
              <Link to="/login" className="text-cyan-400 hover:text-white font-semibold transition">
                Go Back
              </Link>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
