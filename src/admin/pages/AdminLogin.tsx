import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, Store, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface AdminLoginProps {
  onExitToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onExitToStore }) => {
  const { adminLogin } = useAdmin();
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = adminLogin(emailOrUser, password);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid credentials. Please verify and try again.');
        setIsLoading(false);
      }
    }, 300);
  };

  const handleQuickFill = () => {
    setEmailOrUser('admin@jocollections.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-slate-100">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#f372ac]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/10 blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-md relative z-10">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f372ac] to-pink-500 text-white font-black text-2xl shadow-lg mb-4">
            JO
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Admin Portal Access
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sign in to manage catalog, orders, and store operations
          </p>
        </div>

        {/* Error notice */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={emailOrUser}
                onChange={e => setEmailOrUser(e.target.value)}
                placeholder="admin@jocollections.com"
                required
                className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f372ac] focus:ring-1 focus:ring-[#f372ac] transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#f372ac] focus:ring-1 focus:ring-[#f372ac] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-gradient-to-r from-[#f372ac] to-pink-500 hover:from-pink-600 hover:to-[#f372ac] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:shadow-pink-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Fill Helper */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Want quick demo access?</p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#f372ac]" />
            <span>Click to Autofill (admin@jocollections.com / admin123)</span>
          </button>
        </div>

        {/* Storefront return button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onExitToStore}
            className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#f372ac]" />
            <span>Return to Storefront</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Jo Collections Admin Environment. All rights reserved.</p>
      </div>
    </div>
  );
};
