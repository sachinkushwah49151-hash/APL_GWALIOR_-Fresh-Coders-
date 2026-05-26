import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { Mail, Lock, Shield, Sparkles } from 'lucide-react';

const Login = () => {
  const { login } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('demo@sponsorscope.ai');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('Admin');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    const success = login(email, password, role);
    if (success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = () => {
    // Simulated Google Login
    login('google.user@gmail.com', 'google_pass', 'Sponsor');
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-stadium-light opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-2">
          <div 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-neon-cyan select-none cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Go to Home"
          >
            S
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">Welcome Back</h2>
          <p className="text-xs text-slate-400">Access your cricket sponsorship ROI workspace.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Email input */}
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

          {/* Password input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Password</label>
              <Link to="/forgot-password" className="text-[10px] text-cyan-400 hover:text-white transition">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs glass-input rounded-xl pl-10 pr-4 py-3"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Role selector (Custom UI system feature) */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Shield size={12} className="text-cyan-400" /> Workspace Role Simulator
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs bg-dark-900 border border-slate-700 text-white rounded-xl px-3 py-3 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="Admin">Admin (Full Control)</option>
              <option value="Sponsor">Sponsor (CEAT/TATA Brands)</option>
              <option value="Marketing Team">Marketing (Creative & Ad Gen)</option>
            </select>
            <span className="text-[9px] text-slate-500 block mt-1.5">
              * Change roles to test customized authorization pages.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md cursor-pointer mt-2"
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between gap-4 mt-2">
          <div className="flex-1 h-[1px] bg-slate-800" />
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-[1px] bg-slate-800" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 rounded-xl bg-dark-900 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.24 1 3.23 3.73 1.25 7.71l3.85 2.99C6.07 7.02 8.81 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"
            />
            <path
              fill="#FBBC05"
              d="M5.1 14.72c-.25-.76-.39-1.57-.39-2.4 0-.83.14-1.64.39-2.4L1.25 6.93C.45 8.55 0 10.22 0 12s.45 3.45 1.25 5.07l3.85-2.99z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.1.74-2.5 1.18-4.23 1.18-3.19 0-5.93-1.98-6.9-4.96l-3.85 2.99C3.23 20.27 7.24 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Redirect */}
        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cyan-400 hover:text-white font-semibold transition">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
