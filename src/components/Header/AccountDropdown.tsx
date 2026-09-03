import React, { useState } from 'react';

interface AccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-[320px] bg-white border border-[#e5e5e5] shadow-xl p-6 z-50 animate-fade-in text-[#222]">
      <form onSubmit={(e) => { e.preventDefault(); alert('Login simulated'); onClose(); }}>
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Username or Email Address <span className="text-[#cf2e2e]">*</span>
          </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[#ddd] text-sm focus:outline-none focus:border-[#222] transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Password <span className="text-[#cf2e2e]">*</span>
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[#ddd] text-sm focus:outline-none focus:border-[#222] transition-colors"
          />
        </div>

        <div className="flex items-center justify-between mb-4 text-[13px]">
          <label className="flex items-center space-x-2 cursor-pointer text-[#666]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-[#f372ac] focus:ring-0"
            />
            <span>Remember Me</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#222222] hover:bg-[#f372ac] text-white py-2.5 text-[14px] font-medium transition-colors tracking-wide mb-3"
        >
          Log In
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#f0f0f0] space-y-2">
        <a href="#forgot-password" className="block text-[13px] text-[#888] hover:text-[#f372ac] transition-colors">
          I forgot the password
        </a>
        <div className="text-[13px] text-[#666]">
          <span>I'm new client. </span>
          <a href="#register" className="font-semibold text-[#222] hover:text-[#f372ac] underline transition-colors ml-1">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};
