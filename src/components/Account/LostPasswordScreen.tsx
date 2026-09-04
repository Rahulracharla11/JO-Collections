import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const LostPasswordScreen: React.FC = () => {
  const { requestPasswordReset, setAccountSubView } = useShop();
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError('Error: Enter a username or email address.');
      return;
    }

    const res = requestPasswordReset(identifier);
    if (!res.success && res.error) {
      setError(`Error: ${res.error}`);
    }
  };

  return (
    <div className="max-w-3xl pb-16">
      <p className="text-sm text-[#444] leading-relaxed mb-6">
        Lost your password? Please enter your username or email address. You will receive a link to create a new password via email.
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
            Username or email <span className="text-[#cf2e2e]">*</span>
          </label>
          <input
            type="text"
            value={identifier}
            onChange={e => {
              setIdentifier(e.target.value);
              if (error) setError(null);
            }}
            className={`w-full px-3.5 py-2.5 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
              error ? 'border-[#cf2e2e] bg-red-50/20' : 'border-[#ddd] focus:border-[#222]'
            }`}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="bg-black hover:bg-[#f372ac] text-white px-8 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
          >
            Reset password
          </button>
          <button
            type="button"
            onClick={() => setAccountSubView('auth')}
            className="text-sm text-[#666] hover:text-[#f372ac] underline transition-colors"
          >
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
};
