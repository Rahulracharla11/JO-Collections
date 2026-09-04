import React from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Store
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { AdminOrder } from '../types';

export const AdminUserDetails: React.FC = () => {
  const { selectedUser, closeUserDetails, orders, setActiveTab } = useAdmin();

  if (!selectedUser) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 shadow-xs max-w-lg mx-auto my-12 animate-fade-in">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900">No Customer Selected</h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          Please select a customer from the User Management list to view their full details and order history.
        </p>
        <button
          onClick={closeUserDetails}
          className="bg-black hover:bg-[#f372ac] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          Return to Users List
        </button>
      </div>
    );
  }

  // Filter all orders placed by this specific customer
  const userOrders = orders.filter(
    o =>
      o.customerEmail.toLowerCase() === selectedUser.email.toLowerCase() ||
      o.customerName.toLowerCase() === selectedUser.name.toLowerCase()
  );

  const initials = selectedUser.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const averageOrderValue =
    userOrders.length > 0
      ? Math.round(selectedUser.totalSpent / userOrders.length)
      : 0;

  const getStatusBadge = (status: AdminOrder['status']) => {
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
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div>
          <button
            onClick={closeUserDetails}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Users &amp; Customers</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Customer Details: {selectedUser.name}
            </h1>
            <span
              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                selectedUser.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              {selectedUser.status}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Registered customer ID: <code className="text-gray-700 font-mono">{selectedUser.id}</code> • Member since {selectedUser.joinedDate}
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button
            onClick={closeUserDetails}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors cursor-pointer"
          >
            Back to Users
          </button>
        </div>
      </div>

      {/* Customer Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f372ac] to-pink-400 text-white flex items-center justify-center font-black text-xl shadow-md">
              {initials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{selectedUser.name}</h2>
              <p className="text-xs text-gray-400">Customer Account</p>
              <div className="mt-1 inline-flex items-center space-x-1 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Client</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
            <div className="flex items-start space-x-3 text-gray-600">
              <Mail className="w-4 h-4 text-[#f372ac] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Email Address</p>
                <p className="font-semibold text-gray-900 break-all">{selectedUser.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-600">
              <Phone className="w-4 h-4 text-[#f372ac] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Phone Number</p>
                <p className="font-semibold text-gray-900">
                  {selectedUser.phone || '+91 9010385551'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-600">
              <Calendar className="w-4 h-4 text-[#f372ac] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Joined Date</p>
                <p className="font-semibold text-gray-900">{selectedUser.joinedDate}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-gray-600 pt-2 border-t border-gray-100">
              <MapPin className="w-4 h-4 text-[#f372ac] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400">Primary Delivery Address</p>
                <p className="font-medium text-gray-800 leading-relaxed mt-0.5">
                  {selectedUser.address ||
                    'Flat 402, Sri Sai Nilayam, KPHB Phase 1, Kukatpally, Hyderabad, Telangana 500072'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 content-start">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f372ac]">
                Total Orders
              </span>
              <h3 className="text-3xl font-black text-gray-900 mt-2">
                {userOrders.length || selectedUser.ordersCount}
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-3">Completed and processing orders</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Lifetime Spend
              </span>
              <h3 className="text-3xl font-black text-gray-900 mt-2">
                ₹{selectedUser.totalSpent.toLocaleString('en-IN')}.00
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-3">Gross revenue from this customer</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                Avg. Order Value
              </span>
              <h3 className="text-3xl font-black text-gray-900 mt-2">
                ₹{averageOrderValue.toLocaleString('en-IN')}.00
              </h3>
            </div>
            <p className="text-[11px] text-gray-400 mt-3">Average per completed purchase</p>
          </div>
        </div>
      </div>

      {/* Itemized Order History Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <ShoppingBag className="w-5 h-5 text-[#f372ac]" />
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Itemized Order History ({userOrders.length})
              </h3>
              <p className="text-xs text-gray-400">
                Every order placed by {selectedUser.name}, including products, quantities, prices, and status
              </p>
            </div>
          </div>
        </div>

        {userOrders.length === 0 ? (
          <div className="p-12 text-center bg-gray-50 rounded-2xl border border-gray-100">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-gray-800">No Orders Placed Yet</h4>
            <p className="text-xs text-gray-400 mt-1">
              This client registered an account but hasn't completed an order yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {userOrders.map(order => (
              <div
                key={order.id}
                className="border border-gray-200/90 rounded-2xl p-5 bg-white shadow-xs space-y-4 hover:border-gray-300 transition-colors"
              >
                {/* Order Header Summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono font-bold text-sm text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                      {order.orderNumber}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{order.date}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      via {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-base font-black text-gray-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Ordered Products ({order.items.length})
                  </p>

                  <div className="grid grid-cols-1 divide-y divide-gray-100 bg-gray-50/70 rounded-xl border border-gray-100 overflow-hidden">
                    {order.items.map(item => (
                      <div
                        key={item.id}
                        className="p-3.5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center space-x-3.5 min-w-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-12 h-16 object-cover rounded-lg border border-gray-200 shadow-2xs flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                              {item.productName}
                            </h5>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Quantity: <strong className="text-gray-800">{item.quantity}</strong>{' '}
                              × ₹{item.price.toLocaleString('en-IN')}.00
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-xs sm:text-sm font-black text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping destination for this order */}
                <div className="text-[11px] text-gray-500 bg-gray-50 px-3.5 py-2 rounded-lg border border-gray-100 flex items-center justify-between">
                  <span>Shipping: {order.shippingAddress}</span>
                  <span className="font-semibold text-gray-700">Contact: {order.customerPhone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
