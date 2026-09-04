import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthScreen: React.FC = () => {
  const { login, register, setAccountSubView } = useShop();

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form State
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginUsername.trim()) {
      setLoginError('Error: Username or email is required.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Error: The password field is empty.');
      return;
    }

    const res = login(loginUsername, loginPassword);
    if (!res.success && res.error) {
      setLoginError(`Error: ${res.error}`);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerEmail.trim()) {
      setRegisterError('Error: Please provide a valid email address.');
      return;
    }
    if (!emailRegex.test(registerEmail.trim())) {
      setRegisterError('Error: Please provide a valid email address.');
      return;
    }

    const res = register(registerEmail);
    if (!res.success && res.error) {
      setRegisterError(`Error: ${res.error}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pb-16">
      {/* LEFT: LOGIN COLUMN */}
      <div>
        <h2 className="text-2xl font-bold text-[#222] mb-6">Login</h2>

        {loginError && (
          <div className="border border-[#e0b4b4] bg-[#fff6f6] text-[#9f3a38] px-4 py-3 rounded-none mb-5 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Username or email address <span className="text-[#cf2e2e]">*</span>
            </label>
            <input
              type="text"
              value={loginUsername}
              onChange={e => {
                setLoginUsername(e.target.value);
                if (loginError) setLoginError(null);
              }}
              className={`w-full px-3.5 py-2.5 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
                loginError && !loginUsername.trim()
                  ? 'border-[#cf2e2e] bg-red-50/20'
                  : 'border-[#ddd] focus:border-[#222]'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Password <span className="text-[#cf2e2e]">*</span>
            </label>
            <div className="relative">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                value={loginPassword}
                onChange={e => {
                  setLoginPassword(e.target.value);
                  if (loginError) setLoginError(null);
                }}
                className={`w-full px-3.5 py-2.5 pr-10 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
                  loginError && !loginPassword
                    ? 'border-[#cf2e2e] bg-red-50/20'
                    : 'border-[#ddd] focus:border-[#222]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                aria-label="Toggle password visibility"
              >
                {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-1">
            <button
              type="submit"
              className="bg-black hover:bg-[#f372ac] text-white px-8 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Log in
            </button>
            <label className="flex items-center space-x-2 text-sm text-[#555] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded text-black focus:ring-0"
              />
              <span>Remember me</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setAccountSubView('lost-password')}
              className="text-sm text-[#333] hover:text-[#f372ac] underline transition-colors cursor-pointer"
            >
              Lost your password?
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT: REGISTER COLUMN */}
      <div>
        <h2 className="text-2xl font-bold text-[#222] mb-6">Register</h2>

        {registerError && (
          <div className="border border-[#e0b4b4] bg-[#fff6f6] text-[#9f3a38] px-4 py-3 rounded-none mb-5 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{registerError}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Email address <span className="text-[#cf2e2e]">*</span>
            </label>
            <input
              type="email"
              value={registerEmail}
              onChange={e => {
                setRegisterEmail(e.target.value);
                if (registerError) setRegisterError(null);
              }}
              className={`w-full px-3.5 py-2.5 border rounded-xs text-sm text-[#222] focus:outline-none transition-colors ${
                registerError
                  ? 'border-[#cf2e2e] bg-red-50/20'
                  : 'border-[#ddd] focus:border-[#222]'
              }`}
            />
          </div>

          <p className="text-[13px] text-[#666] leading-relaxed">
            A link to set a new password will be sent to your email address.
          </p>

          <p className="text-[13px] text-[#666] leading-relaxed">
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{' '}
            <a href="#privacy" className="text-[#cf2e2e] hover:underline">
              privacy policy
            </a>
            .
          </p>

          <div className="pt-1">
            <button
              type="submit"
              className="bg-black hover:bg-[#f372ac] text-white px-8 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
