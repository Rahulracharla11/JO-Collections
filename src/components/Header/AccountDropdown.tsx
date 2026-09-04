import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { User, LogOut, Package, Settings, LayoutDashboard } from 'lucide-react';

interface AccountDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDropdown: React.FC<AccountDropdownProps> = ({ isOpen, onClose }) => {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    navigateToAccount
  } = useShop();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!username.trim()) {
      setError('Please enter username or email.');
      return;
    }
    if (!password) {
      setError('Please enter password.');
      return;
    }

    const res = login(username, password);
    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Failed to login');
    }
  };

  // If already logged in, show quick dashboard menu
  if (isAuthenticated && user) {
    return (
      <div className="absolute right-0 top-full mt-2 w-[260px] bg-white border border-[#e5e5e5] shadow-xl py-3 z-50 animate-fade-in text-[#222]">
        <div className="px-5 py-2.5 border-b border-gray-100">
          <p className="text-xs text-[#888]">Signed in as</p>
          <p className="text-sm font-bold text-[#222] truncate">{user.displayName || user.username}</p>
          <p className="text-[11px] text-[#999] truncate">{user.email}</p>
        </div>

        <div className="py-2 text-sm text-[#444]">
          <button
            onClick={() => {
              navigateToAccount('dashboard');
              onClose();
            }}
            className="w-full px-5 py-2 flex items-center space-x-2.5 hover:bg-gray-50 hover:text-[#f372ac] transition-colors text-left"
          >
            <LayoutDashboard className="w-4 h-4 text-gray-500" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              navigateToAccount('orders');
              onClose();
            }}
            className="w-full px-5 py-2 flex items-center space-x-2.5 hover:bg-gray-50 hover:text-[#f372ac] transition-colors text-left"
          >
            <Package className="w-4 h-4 text-gray-500" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => {
              navigateToAccount('account-details');
              onClose();
            }}
            className="w-full px-5 py-2 flex items-center space-x-2.5 hover:bg-gray-50 hover:text-[#f372ac] transition-colors text-left"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            <span>Account details</span>
          </button>
        </div>

        <div className="border-t border-gray-100 pt-2 px-2">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full px-4 py-2 flex items-center space-x-2 text-sm text-[#cf2e2e] hover:bg-red-50 transition-colors rounded-xs text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    );
  }

  // If not logged in, show standard login dropdown
  return (
    <div className="absolute right-0 top-full mt-2 w-[320px] bg-white border border-[#e5e5e5] shadow-xl p-6 z-50 animate-fade-in text-[#222]">
      {error && (
        <div className="mb-3 p-2 text-xs bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleLoginSubmit}>
        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Username or Email Address <span className="text-[#cf2e2e]">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-[#ddd] text-sm focus:outline-none focus:border-[#222] transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[13px] font-medium text-[#444] mb-1.5">
            Password <span className="text-[#cf2e2e]">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[#ddd] text-sm focus:outline-none focus:border-[#222] transition-colors"
          />
        </div>

        <div className="flex items-center justify-between mb-4 text-[13px]">
          <label className="flex items-center space-x-2 cursor-pointer text-[#666]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
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
        <button
          onClick={() => {
            navigateToAccount('lost-password');
            onClose();
          }}
          className="block w-full text-center text-[13px] text-[#888] hover:text-[#f372ac] transition-colors"
        >
          I forgot the password
        </button>
        <div className="text-[13px] text-[#666]">
          <span>I'm new client. </span>
          <button
            onClick={() => {
              navigateToAccount('auth');
              onClose();
            }}
            className="font-semibold text-[#222] hover:text-[#f372ac] underline transition-colors ml-1"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
