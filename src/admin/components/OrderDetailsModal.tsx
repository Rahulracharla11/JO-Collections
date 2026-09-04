import React from 'react';
import { X, Printer, Package, User, MapPin, CreditCard, Clock } from 'lucide-react';
import { AdminOrder, OrderStatus } from '../types';

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in z-10">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-bold text-gray-900">{order.orderNumber}</h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Placed on {order.date}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  <User className="w-4 h-4 text-[#f372ac]" />
                  <span>Customer Details</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{order.customerName}</p>
                <p className="text-xs text-gray-600 mt-0.5">{order.customerEmail}</p>
                <p className="text-xs text-gray-600 mt-0.5">{order.customerPhone}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 text-[#f372ac]" />
                  <span>Shipping Address</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{order.shippingAddress}</p>
                <div className="flex items-center space-x-1 text-xs text-gray-500 mt-2">
                  <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                  <span>{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Purchased Items Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center space-x-2">
                <Package className="w-4 h-4 text-[#f372ac]" />
                <span>Order Items</span>
              </h4>
              <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                {order.items.map(item => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-14 object-cover rounded-md border border-gray-100"
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-1">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}.00
                      </p>
                      <p className="text-[11px] text-gray-400">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{order.totalAmount.toLocaleString('en-IN')}.00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Standard Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total Paid</span>
                <span className="text-[#f372ac]">
                  ₹{order.totalAmount.toLocaleString('en-IN')}.00
                </span>
              </div>
            </div>

            {/* Change Status Action */}
            <div className="p-4 border border-gray-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-[#f372ac]" />
                <span>Update Order Status:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['Processing', 'Completed', 'Cancelled', 'Pending'] as OrderStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(order.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      order.status === st
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="bg-black hover:bg-[#f372ac] text-white px-6 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
