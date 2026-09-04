import React from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  IndianRupee,
  Package,
  CheckCircle,
  Clock,
  Ban,
  Shield,
  ExternalLink
} from 'lucide-react';
import { AdminUser, AdminOrder } from '../types';
import { useAdmin } from '../context/AdminContext';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: AdminUser | null;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const { orders } = useAdmin();

  if (!isOpen || !user) return null;

  // Filter all orders placed by this specific customer
  const userOrders = orders.filter(
    o =>
      o.customerEmail.toLowerCase() === user.email.toLowerCase() ||
      o.customerName.toLowerCase() === user.name.toLowerCase()
  );

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const averageOrderValue =
    userOrders.length > 0
      ? Math.round(user.totalSpent / userOrders.length)
      : 0;

  const getStatusColor = (status: AdminOrder['status']) => {
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
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-gray-100 overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f372ac] to-pink-400 text-white flex items-center justify-center font-black text-base shadow-sm">
              {initials}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    user.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <p className="text-xs text-gray-500">Customer ID: {user.id}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Customer Overview Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold uppercase mb-1">
                <Mail className="w-3.5 h-3.5 text-[#f372ac]" />
                <span>Email Address</span>
              </div>
              <p className="text-xs font-bold text-gray-900 break-all">{user.email}</p>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold uppercase mb-1">
                <Phone className="w-3.5 h-3.5 text-[#f372ac]" />
                <span>Phone Contact</span>
              </div>
              <p className="text-xs font-bold text-gray-900">
                {user.phone || '+91 9010385551'}
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold uppercase mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#f372ac]" />
                <span>Customer Since</span>
              </div>
              <p className="text-xs font-bold text-gray-900">{user.joinedDate}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold uppercase mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#f372ac]" />
              <span>Primary Shipping Address</span>
            </div>
            <p className="text-xs font-medium text-gray-800 leading-relaxed">
              {user.address || 'Flat 402, Sri Sai Nilayam, KPHB Phase 1, Kukatpally, Hyderabad, Telangana 500072'}
            </p>
          </div>

          {/* Lifetime Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-pink-50/50 border border-pink-100 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-[#f372ac]">
                Lifetime Orders
              </span>
              <p className="text-lg font-black text-gray-900 mt-0.5">
                {userOrders.length || user.ordersCount}
              </p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-600">
                Total Spent
              </span>
              <p className="text-lg font-black text-gray-900 mt-0.5">
                ₹{user.totalSpent.toLocaleString('en-IN')}.00
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Average Order
              </span>
              <p className="text-lg font-black text-gray-900 mt-0.5">
                ₹{averageOrderValue.toLocaleString('en-IN')}.00
              </p>
            </div>
          </div>

          {/* Order History Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-[#f372ac]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Itemized Order History ({userOrders.length})
                </h4>
              </div>
              <span className="text-[11px] text-gray-400">
                Products and quantities ordered by customer
              </span>
            </div>

            {userOrders.length === 0 ? (
              <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-100">
                <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-700">No recorded orders yet</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  This user has registered an account but hasn't completed an order.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map(order => (
                  <div
                    key={order.id}
                    className="border border-gray-200/80 rounded-xl p-4 bg-white shadow-2xs space-y-3"
                  >
                    {/* Order header row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-gray-100">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-mono font-bold text-xs text-gray-900">
                          {order.orderNumber}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500">{order.date}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-500 font-medium">
                          {order.paymentMethod}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-xs font-black text-gray-900">
                          ₹{order.totalAmount.toLocaleString('en-IN')}.00
                        </span>
                      </div>
                    </div>

                    {/* Ordered items list */}
                    <div className="space-y-2">
                      {order.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-gray-50/60 p-2.5 rounded-lg border border-gray-100"
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-10 h-12 object-cover rounded-md border border-gray-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-900 truncate">
                                {item.productName}
                              </p>
                              <p className="text-[11px] text-gray-500">
                                Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}.00
                              </p>
                            </div>
                          </div>

                          <span className="text-xs font-bold text-gray-900 flex-shrink-0 pl-2">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Account Role: <strong className="text-gray-700">{user.role}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
