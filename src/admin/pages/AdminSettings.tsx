import React, { useState } from 'react';
import {
  Save,
  CheckCircle,
  Store,
  Bell,
  Truck,
  Share2,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { StoreSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, updateAdminPassword, adminLogout } = useAdmin();
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword) {
      setPasswordError('Please provide your current admin password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const res = updateAdminPassword(currentPassword, newPassword);
    if (!res.success) {
      setPasswordError(res.error || 'Failed to update password.');
    } else {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Settings &amp; Configuration</h1>
          <p className="text-xs text-gray-500">
            Configure contact information, announcements, shipping thresholds, and social media handles.
          </p>
        </div>

        {isSaved && (
          <div className="inline-flex items-center space-x-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: GENERAL STORE INFORMATION */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Store className="w-5 h-5 text-[#f372ac]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              General Store Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={e => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Customer Support Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Store Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
            />
          </div>
        </div>

        {/* SECTION 2: SHIPPING & CURRENCY */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Truck className="w-5 h-5 text-[#f372ac]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Shipping &amp; Currency Rules
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store Currency
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={formData.freeShippingThreshold}
                onChange={e =>
                  setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: ANNOUNCEMENT BANNER */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#f372ac]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Top Announcement Banner
              </h3>
            </div>
            <label className="flex items-center space-x-2 text-xs font-semibold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enableAnnouncement}
                onChange={e =>
                  setFormData({ ...formData, enableAnnouncement: e.target.checked })
                }
                className="rounded text-[#f372ac] focus:ring-0"
              />
              <span>Enable Banner</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Banner Text Message
            </label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={e => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
            />
          </div>
        </div>

        {/* SECTION 4: SOCIAL MEDIA */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
            <Share2 className="w-5 h-5 text-[#f372ac]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Social Media Accounts
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socials.instagram}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, instagram: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={formData.socials.youtube}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, youtube: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.socials.facebook}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, facebook: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Twitter URL
              </label>
              <input
                type="text"
                value={formData.socials.twitter}
                onChange={e =>
                  setFormData({
                    ...formData,
                    socials: { ...formData.socials, twitter: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-black hover:bg-[#f372ac] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Settings</span>
          </button>
        </div>
      </form>

      {/* SECTION: ADMIN PASSWORD UPDATE */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
          <KeyRound className="w-5 h-5 text-[#f372ac]" />
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Admin Security &amp; Password
            </h3>
            <p className="text-xs text-gray-400">
              Update credentials used to unlock and manage the Jo Collections admin portal.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Admin password has been updated successfully!</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Current Admin Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (default: admin123)"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#f372ac]" />
            <span>Update Password</span>
          </button>
        </form>
      </div>

      {/* SECTION: ADMIN SESSION & LOGOUT */}
      <div className="bg-white rounded-xl border border-rose-100 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <LogOut className="w-5 h-5 text-rose-500" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Admin Session &amp; Sign Out
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Logged in as <strong className="text-gray-900">Rahul Racharla</strong> (admin@jocollections.com) • Super Administrator
          </p>
        </div>

        <button
          type="button"
          onClick={adminLogout}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out of Admin</span>
        </button>
      </div>
    </div>
  );
};
