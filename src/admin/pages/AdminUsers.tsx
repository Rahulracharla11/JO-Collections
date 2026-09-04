import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const AdminUsers: React.FC = () => {
  const { users, openUserDetails } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Management</h1>
        <p className="text-xs text-gray-500 mt-1">
          Review registered customer accounts, lifetime purchasing spend, and order histories.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search customers by name or email address..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#f372ac]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/70 text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-100">
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Total Orders</th>
                <th className="p-4 font-semibold">Lifetime Spend</th>
                <th className="p-4 font-semibold">Account Status</th>
                <th className="p-4 font-semibold">Joined Date</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-xs text-gray-400">
                    No customers found matching "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => {
                  const initials = u.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Customer Info */}
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f372ac] to-pink-300 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{u.name}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Orders Count */}
                      <td className="p-4 font-medium text-gray-800">
                        {u.ordersCount} {u.ordersCount === 1 ? 'order' : 'orders'}
                      </td>

                      {/* Lifetime Total Spent */}
                      <td className="p-4 font-bold text-gray-900">
                        ₹{u.totalSpent.toLocaleString('en-IN')}.00
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            u.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="p-4 text-gray-400 text-xs">{u.joinedDate}</td>

                      {/* Action: Only View Details (opens separate page) */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => openUserDetails(u)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-[#f372ac] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                          title="View Details & Order History"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
