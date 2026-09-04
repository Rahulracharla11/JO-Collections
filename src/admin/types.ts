import { Product } from '../types';

export type OrderStatus = 'Processing' | 'Completed' | 'Cancelled' | 'Pending';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Customer' | 'Store Manager';
  ordersCount: number;
  totalSpent: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  joinedDate: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  freeShippingThreshold: number;
  announcementText: string;
  enableAnnouncement: boolean;
  socials: {
    instagram: string;
    youtube: string;
    facebook: string;
    twitter: string;
  };
}

export type AdminTab = 'dashboard' | 'products' | 'orders' | 'users' | 'settings';
