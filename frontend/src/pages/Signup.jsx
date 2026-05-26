import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppState } from '../context/AppState';
import { Mail, Lock, User, Shield } from 'lucide-react';

const Signup = () => {
  const { signup } = useAppState();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Sponsor');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    const success = signup(name, email, password, role);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stadium-light opacity-30 pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl border-slate-800 shadow-2xl relative z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-neon-cyan select-none cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Go to Home"
          >
            S
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">Create Workspace</h2>
          <p className="text-xs text-slate-400">Launch your SponsorScope AI platform subscription.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <User size={16} />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs glass-input rounded-xl pl-10 pr-4 py-3"
                placeholder="Virat Kohli"
                required
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs glass-input rounded-xl pl-10 pr-4 py-3"
                placeholder="Create a password"
                required
              />
            </div>
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Shield size={12} className="text-cyan-400" /> Platform Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-xs bg-dark-900 border border-slate-700 text-white rounded-xl px-3 py-3 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="Sponsor">Sponsor / Brand Manager</option>
              <option value="Marketing Team">Marketing Team Member</option>
              <option value="Admin">Broadcaster Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md cursor-pointer mt-2"
          >
            Create Free Account
          </button>
        </form>

        {/* Redirect */}
        <p className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-white font-semibold transition">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
