import React, { useState } from 'react';
import { IndianRupee, ShoppingBag, Users, Package, ArrowRight, Eye, Plus, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { StatCard } from '../components/StatCard';
import { RevenueChart } from '../components/RevenueChart';
import { CategoryPieChart } from '../components/CategoryPieChart';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { AdminOrder } from '../types';

export const AdminDashboard: React.FC = () => {
  const { orders, products, users, setActiveTab, updateOrderStatus, openAddProduct } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Calculate live stats
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 245000);
  const totalOrdersCount = orders.length + 178;
  const inStockCount = products.filter(p => p.inStock).length;

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: string) => {
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
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 sm:p-8 rounded-2xl shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#f372ac]">
            Store Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
            Welcome to Jo Collections Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Monitor sales revenue, process customer orders, update product catalogs, and configure your store settings in real time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={openAddProduct}
            className="inline-flex items-center space-x-2 bg-[#f372ac] hover:bg-[#e05996] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-102 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Product</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          change="+18.4%"
          isPositive={true}
          icon={IndianRupee}
          description="vs last month"
          iconColor="text-[#f372ac]"
          iconBg="bg-[#fdf2f6]"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount.toString()}
          change="+12.2%"
          isPositive={true}
          icon={ShoppingBag}
          description="18 pending dispatch"
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Active Customers"
          value={users.length.toString()}
          change="+9.5%"
          isPositive={true}
          icon={Users}
          description="Verified accounts"
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Live Products"
          value={`${inStockCount} / ${products.length}`}
          change="Catalog Ready"
          isPositive={true}
          icon={Package}
          description="Synced with website"
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      {/* 2 Graphs: Revenue Area Chart & Category Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <CategoryPieChart />
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">Recent Customer Orders</h3>
            <p className="text-xs text-gray-400">Live order flow from the storefront</p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="inline-flex items-center space-x-1 text-xs font-bold text-[#f372ac] hover:underline"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-100">
                <th className="pb-3 font-semibold">Order</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Total Amount</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {recentOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 font-bold text-gray-900">{ord.orderNumber}</td>
                  <td className="py-3.5">
                    <div>
                      <p className="font-semibold text-gray-900">{ord.customerName}</p>
                      <p className="text-[11px] text-gray-400">{ord.customerEmail}</p>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-500">{ord.date}</td>
                  <td className="py-3.5 text-gray-500">{ord.items.length} item(s)</td>
                  <td className="py-3.5 font-bold text-gray-900">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}.00
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                        ord.status
                      )}`}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="inline-flex items-center space-x-1 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                      title="Inspect Order"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-xs font-semibold">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={updateOrderStatus}
      />
    </div>
  );
};
