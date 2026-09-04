import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  ArrowLeft,
  Bell,
  Search,
  Menu,
  X,
  ExternalLink,
  Store,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useAdmin } from './context/AdminContext';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { AdminOrders } from './pages/AdminOrders';
import { AdminUsers } from './pages/AdminUsers';
import { AdminSettings } from './pages/AdminSettings';
import { AdminTab } from './types';

interface AdminLayoutProps {
  onExitToStore: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onExitToStore }) => {
  const { activeTab, setActiveTab, products, orders, notifications, clearNotifications } = useAdmin();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navItems: { id: AdminTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.filter(o => o.status === 'Processing').length },
    { id: 'users', label: 'Users & Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'users':
        return <AdminUsers />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 flex flex-col antialiased">
      <div className="flex flex-1 relative">
        {/* MOBILE SIDEBAR BACKDROP */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            {/* Logo area */}
            <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f372ac] to-pink-400 flex items-center justify-center text-white font-black text-lg shadow-md">
                  JO
                </div>
                <div>
                  <h2 className="font-bold text-white tracking-tight text-sm">Jo Collections</h2>
                  <span className="text-[10px] font-semibold text-[#f372ac] uppercase tracking-wider bg-[#f372ac]/10 px-2 py-0.5 rounded">
                    Admin Portal
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation items */}
            <nav className="p-4 space-y-1.5">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Main Menu
              </p>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#f372ac] text-white shadow-md'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Store Shortcut */}
          <div className="p-4 border-t border-slate-800/80">
            <button
              onClick={onExitToStore}
              className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#f372ac]" />
              <span>Back to Storefront</span>
            </button>
          </div>
        </aside>

        {/* MAIN BODY */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-16 bg-white border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-500 font-medium">
                <span className="text-gray-400">Admin</span>
                <span>/</span>
                <span className="text-gray-900 font-semibold capitalize">{activeTab}</span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-4">
              {/* Back to Storefront Link */}
              <button
                onClick={onExitToStore}
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-black hover:text-black transition-colors"
              >
                <span>View Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(prev => !prev)}
                  className="relative p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f372ac]" />
                  )}
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50 animate-fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-3">
                      <span className="text-xs font-bold text-gray-900 uppercase">
                        Recent Activity
                      </span>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearNotifications}
                          className="text-[11px] text-[#f372ac] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {notifications.length === 0 ? (
                      <p className="text-xs text-gray-400 py-3 text-center">No new notifications</p>
                    ) : (
                      <div className="space-y-2.5 max-h-64 overflow-y-auto">
                        {notifications.map((note, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <p className="leading-snug">{note}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Admin Avatar */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  RR
                </div>
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-gray-900 leading-tight">Rahul Racharla</p>
                  <p className="text-gray-400 text-[10px]">Super Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};
