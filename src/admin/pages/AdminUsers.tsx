import React, { useState } from 'react';
import { Users, UserPlus, Search, Shield, User, Edit2, Ban, CheckCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { UserModal } from '../components/UserModal';
import { AdminUser } from '../types';

export const AdminUsers: React.FC = () => {
  const { users, addUser, updateUser, toggleUserStatus } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);

  const filteredUsers = users.filter(u => {
    if (roleFilter !== 'All' && u.role !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User &amp; Customer Management</h1>
          <p className="text-xs text-gray-500">
            Manage registered clients, administrator privileges, and order histories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 bg-black hover:bg-[#f372ac] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#f372ac]"
          />
        </div>

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#f372ac]"
        >
          <option value="All">All Roles</option>
          <option value="Customer">Customers</option>
          <option value="Administrator">Administrators</option>
          <option value="Store Manager">Store Managers</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/70 text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-100">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Orders</th>
                <th className="p-4 font-semibold">Total Spent</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Joined Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredUsers.map(u => {
                const initials = u.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f372ac] to-pink-300 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {initials}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          u.role === 'Administrator'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : u.role === 'Store Manager'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {u.role === 'Administrator' && <Shield className="w-3 h-3" />}
                        <span>{u.role}</span>
                      </span>
                    </td>
                    <td className="p-4 font-medium">{u.ordersCount} orders</td>
                    <td className="p-4 font-bold text-gray-900">
                      ₹{u.totalSpent.toLocaleString('en-IN')}.00
                    </td>
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
                    <td className="p-4 text-gray-400 text-xs">{u.joinedDate}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`p-1.5 rounded-md transition-colors ${
                            u.status === 'Active'
                              ? 'text-rose-500 hover:bg-rose-50'
                              : 'text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={u.status === 'Active' ? 'Suspend User' : 'Activate User'}
                        >
                          {u.status === 'Active' ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={userData => {
          if ('id' in userData) {
            updateUser(userData as AdminUser);
          } else {
            addUser(userData);
          }
        }}
        userToEdit={userToEdit}
      />
    </div>
  );
};
