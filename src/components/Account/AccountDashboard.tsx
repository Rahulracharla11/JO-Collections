import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useShop, AccountSubView } from '../../context/ShopContext';

export const AccountDashboard: React.FC = () => {
  const {
    user,
    accountSubView,
    setAccountSubView,
    logout,
    authSuccessNotice,
    setAuthSuccessNotice,
    updateAccountDetails
  } = useShop();

  // Account Details Form State
  const [firstName, setFirstName] = useState(user?.firstName || 'Rahul');
  const [lastName, setLastName] = useState(user?.lastName || 'Racharla');
  const [displayName, setDisplayName] = useState(user?.displayName || 'rrahulwork03');
  const [email, setEmail] = useState(user?.email || 'rahulwork03@gmail.com');

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error & Status
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const tabs: { label: string; view: AccountSubView }[] = [
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Orders', view: 'orders' },
    { label: 'Downloads', view: 'downloads' },
    { label: 'Addresses', view: 'addresses' },
    { label: 'Account details', view: 'account-details' },
  ];

  const handleTabChange = (view: AccountSubView) => {
    setAccountSubView(view);
    setDetailsError(null);
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsError(null);

    if (!firstName.trim()) {
      setDetailsError('First name is a required field.');
      return;
    }
    if (!lastName.trim()) {
      setDetailsError('Last name is a required field.');
      return;
    }
    if (!displayName.trim()) {
      setDetailsError('Display name is a required field.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setDetailsError('Please enter a valid email address.');
      return;
    }

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setDetailsError('Please enter your current password.');
        return;
      }
      if (newPassword.length < 6) {
        setDetailsError('New password must be at least 6 characters.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setDetailsError('New passwords do not match.');
        return;
      }
    }

    const res = updateAccountDetails({
      firstName,
      lastName,
      displayName,
      email,
      currentPassword,
      newPassword
    });

    if (!res.success && res.error) {
      setDetailsError(res.error);
    } else {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const currentUsername = user?.displayName || user?.username || 'rrahulwork03';

  return (
    <div className="pb-16 max-w-5xl">
      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-8 border-b border-transparent">
        {tabs.map(tab => {
          const isActive = accountSubView === tab.view;
          return (
            <button
              key={tab.view}
              onClick={() => handleTabChange(tab.view)}
              className={`px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide border transition-all cursor-pointer ${
                isActive
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[#333] border-[#ddd] hover:border-black hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
        <button
          onClick={logout}
          className="px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide border border-[#ddd] bg-white text-[#333] hover:border-[#cf2e2e] hover:text-[#cf2e2e] transition-colors cursor-pointer"
        >
          Log out
        </button>
      </div>

      {/* Success Notification Banner (matching Screenshot 4) */}
      {authSuccessNotice && (
        <div className="border border-[#c3e6cb] bg-[#d4edda] text-[#155724] px-4 py-3.5 rounded-none mb-6 text-sm flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-[#155724] flex-shrink-0" />
            <span>{authSuccessNotice}</span>
          </div>
          <button
            onClick={() => setAuthSuccessNotice(null)}
            className="text-xs text-[#155724] hover:underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TAB 1: DASHBOARD (Screenshot 4) */}
      {accountSubView === 'dashboard' && (
        <div className="space-y-4 text-sm text-[#444] leading-relaxed">
          <p>
            Hello <strong className="text-[#222] font-semibold">{currentUsername}</strong> (not{' '}
            <strong className="text-[#222] font-semibold">{currentUsername}</strong>?{' '}
            <button
              onClick={logout}
              className="text-[#cf2e2e] hover:underline cursor-pointer"
            >
              Log out
            </button>
            )
          </p>

          <p>
            From your account dashboard you can view your{' '}
            <button
              onClick={() => handleTabChange('orders')}
              className="text-[#cf2e2e] hover:underline font-normal cursor-pointer"
            >
              recent orders
            </button>
            , manage your{' '}
            <button
              onClick={() => handleTabChange('addresses')}
              className="text-[#cf2e2e] hover:underline font-normal cursor-pointer"
            >
              shipping and billing addresses
            </button>
            , and{' '}
            <button
              onClick={() => handleTabChange('account-details')}
              className="text-[#cf2e2e] hover:underline font-normal cursor-pointer"
            >
              edit your password and account details
            </button>
            .
          </p>
        </div>
      )}

      {/* TAB 2: ORDERS */}
      {accountSubView === 'orders' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#222] mb-3">Your Orders</h3>
          <div className="border border-[#eee] overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-[#eee] text-[#666] uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5">Order</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee] text-[#333]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#f372ac]">#10492</td>
                  <td className="p-3.5">September 2, 2026</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                      Processing
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">₹1,299.00 for 1 item</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => alert('Order #10492: Kanjivaram Bandhani Saree - Tracking ID: JC99281')}
                      className="text-xs bg-black text-white hover:bg-[#f372ac] px-3 py-1.5 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#f372ac]">#10350</td>
                  <td className="p-3.5">August 20, 2026</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700">
                      Completed
                    </span>
                  </td>
                  <td className="p-3.5 font-medium">₹1,850.00 for 1 item</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => alert('Order #10350: Royale Crepe Saree - Delivered via BlueDart')}
                      className="text-xs bg-black text-white hover:bg-[#f372ac] px-3 py-1.5 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DOWNLOADS */}
      {accountSubView === 'downloads' && (
        <div className="bg-gray-50 border border-gray-200 p-8 text-center text-sm text-[#666]">
          <p>No downloads available yet.</p>
        </div>
      )}

      {/* TAB 4: ADDRESSES */}
      {accountSubView === 'addresses' && (
        <div className="space-y-6">
          <p className="text-sm text-[#666]">
            The following addresses will be used on the checkout page by default.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <h4 className="font-bold text-base text-[#222]">Billing address</h4>
                <button
                  onClick={() => alert('Edit Billing Address')}
                  className="text-xs text-[#cf2e2e] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                {firstName} {lastName}<br />
                Road No. 12, Kukatpally Housing Board Colony<br />
                Hyderabad, Telangana 500072<br />
                India
              </p>
            </div>

            <div className="border border-[#e5e5e5] p-5">
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <h4 className="font-bold text-base text-[#222]">Shipping address</h4>
                <button
                  onClick={() => alert('Edit Shipping Address')}
                  className="text-xs text-[#cf2e2e] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                {firstName} {lastName}<br />
                Road No. 12, Kukatpally Housing Board Colony<br />
                Hyderabad, Telangana 500072<br />
                India
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ACCOUNT DETAILS (Screenshot 5) */}
      {accountSubView === 'account-details' && (
        <div>
          {detailsError && (
            <div className="border border-[#e0b4b4] bg-[#fff6f6] text-[#9f3a38] px-4 py-3 rounded-none mb-5 text-sm flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{detailsError}</span>
            </div>
          )}

          <form onSubmit={handleSaveDetails} className="space-y-6">
            {/* First name & Last name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  First name <span className="text-[#cf2e2e]">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Last name <span className="text-[#cf2e2e]">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
                />
              </div>
            </div>

            {/* Display name */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Display name <span className="text-[#cf2e2e]">*</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
              />
              <span className="block text-xs text-[#777] italic mt-1.5">
                This will be how your name will be displayed in the account section and in reviews
              </span>
            </div>

            {/* Email address */}
            <div>
              <label className="block text-sm font-medium text-[#333] mb-1.5">
                Email address <span className="text-[#cf2e2e]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
              />
            </div>

            {/* PASSWORD CHANGE FIELDSET */}
            <fieldset className="border border-[#e8e8e8] p-6 space-y-5 rounded-xs mt-8">
              <legend className="text-sm font-bold tracking-wider text-[#222] px-2 uppercase">
                Password change
              </legend>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Current password (leave blank to leave unchanged)
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  New password (leave blank to leave unchanged)
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 border border-[#ddd] rounded-xs text-sm text-[#222] focus:outline-none focus:border-[#222]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </fieldset>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-black hover:bg-[#f372ac] text-white px-8 py-2.5 text-sm font-semibold tracking-wide transition-colors cursor-pointer"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
