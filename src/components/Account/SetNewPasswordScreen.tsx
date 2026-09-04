import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SetNewPasswordScreen: React.FC = () => {
  const { setNewPassword } = useShop();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Error: Please enter a new password.');
      return;
    }
    if (password.length < 6) {
      setError('Error: Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Error: Passwords do not match.');
      return;
    }

    const res = setNewPassword(password);
    if (!res.success && res.error) {
      setError(`Error: ${res.error}`);
    }
  };

  return (
    <div className="max-w-3xl pb-16">
      <p className="text-sm text-[#444] leading-relaxed mb-6">
        Enter a new password below.
      </p>

      {error && (
        <div className="border border-[#e0b4b4] bg-[#fff6f6] text-[#9f3a38] px-4 py-3 rounded-none mb-5 text-sm flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#333] mb-1.5">
            New password <span className="text-[#cf2e2e]">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (error) setError(null);
              }}
              className={`w-full px-3.5 py-2.5 pr-10 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
                error ? 'border-[#cf2e2e] bg-red-50/20' : 'border-[#ddd] focus:border-[#222]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#333] mb-1.5">
            Re-enter new password <span className="text-[#cf2e2e]">*</span>
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                if (error) setError(null);
              }}
              className={`w-full px-3.5 py-2.5 pr-10 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
                error ? 'border-[#cf2e2e] bg-red-50/20' : 'border-[#ddd] focus:border-[#222]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-black hover:bg-[#f372ac] text-white px-8 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
