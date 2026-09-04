import React, { useState } from 'react';
import { Search, Eye, Filter, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { AdminOrder, OrderStatus } from '../types';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { label: string; value: 'All' | OrderStatus; count: number }[] = [
    { label: 'All Orders', value: 'All', count: orders.length },
    { label: 'Processing', value: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
    { label: 'Completed', value: 'Completed', count: orders.filter(o => o.status === 'Completed').length },
    { label: 'Pending', value: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { label: 'Cancelled', value: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length }
  ];

  const filteredOrders = orders.filter(ord => {
    if (statusFilter !== 'All' && ord.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-xs text-gray-500">
          Track customer shipments, process invoices, and manage fulfillment statuses.
        </p>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center space-x-1.5 ${
                statusFilter === tab.value
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.value ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer..."
            className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#f372ac]"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/70 text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-100">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Total</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400 text-xs">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(ord => (
                  <tr key={ord.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-900">{ord.orderNumber}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-900">{ord.customerName}</p>
                        <p className="text-[11px] text-gray-400">{ord.customerEmail}</p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500">{ord.date}</td>
                    <td className="p-4 text-gray-600 font-medium text-xs">{ord.paymentMethod}</td>
                    <td className="p-4 font-bold text-gray-900">
                      ₹{ord.totalAmount.toLocaleString('en-IN')}.00
                    </td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={e => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors text-xs font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};
