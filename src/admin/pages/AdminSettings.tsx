import React, { useState } from 'react';
import { Save, CheckCircle, Store, Bell, Truck, Share2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { StoreSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
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
    </div>
  );
};
