import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { AdminOrder, AdminUser, StoreSettings, AdminTab, OrderStatus } from '../types';

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ord-10492',
    orderNumber: '#JC-10492',
    customerName: 'Rahul Racharla',
    customerEmail: 'rahulwork03@gmail.com',
    customerPhone: '+91 9010385551',
    shippingAddress: 'Flat 402, Sri Sai Nilayam, KPHB Phase 1, Kukatpally, Hyderabad 500072',
    date: '2026-09-02',
    items: [
      {
        id: 'item-1',
        productId: '12c7c',
        productName: 'Kanjivaram Bandhani Saree with Hand Bandhej Work',
        productImage: 'https://jocollections.com/wp-content/uploads/2025/10/IMG-20260801-WA0596-600x799.jpg',
        price: 1299,
        quantity: 1
      }
    ],
    totalAmount: 1299,
    paymentMethod: 'UPI / Online Payment',
    status: 'Processing'
  },
  {
    id: 'ord-10488',
    orderNumber: '#JC-10488',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@gmail.com',
    customerPhone: '+91 9848022338',
    shippingAddress: 'Plot 18, Road No. 10, Banjara Hills, Hyderabad 500034',
    date: '2026-08-30',
    items: [
      {
        id: 'item-2',
        productId: '36461',
        productName: 'Royale Crepe Pure Viscose Mysore Crepe Silk Saree',
        productImage: 'https://jocollections.com/wp-content/uploads/2026/08/IMG-20260818-WA0100-600x799.jpg',
        price: 1850,
        quantity: 1
      }
    ],
    totalAmount: 1850,
    paymentMethod: 'Credit Card',
    status: 'Completed'
  },
  {
    id: 'ord-10475',
    orderNumber: '#JC-10475',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha.reddy@yahoo.com',
    customerPhone: '+91 9123456789',
    shippingAddress: 'Flat 304, Green Meadows, Madhapur, Hyderabad 500081',
    date: '2026-08-28',
    items: [
      {
        id: 'item-3',
        productId: '35361',
        productName: 'Viscose Crepe Silk Saree with Zari Border',
        productImage: 'https://jocollections.com/wp-content/uploads/2026/07/IMG-20260718-WA0588-600x799.jpg',
        price: 1499,
        quantity: 1
      },
      {
        id: 'item-4',
        productId: '29002',
        productName: '18 Inch Black Beads Mangalsutra / Chain',
        productImage: 'https://jocollections.com/wp-content/uploads/2024/12/AJV3718-562x799.jpg',
        price: 499,
        quantity: 1
      }
    ],
    totalAmount: 1998,
    paymentMethod: 'Net Banking',
    status: 'Completed'
  },
  {
    id: 'ord-10460',
    orderNumber: '#JC-10460',
    customerName: 'Ananya Rao',
    customerEmail: 'ananya.rao@outlook.com',
    customerPhone: '+91 9988776655',
    shippingAddress: 'House No 12-4-56, Prakash Nagar, Begumpet, Secunderabad 500016',
    date: '2026-08-25',
    items: [
      {
        id: 'item-5',
        productId: '30502',
        productName: 'Kalamkari Cotton Kurti! Pure Handloom Cotton',
        productImage: 'https://jocollections.com/wp-content/uploads/2025/02/AJV5492-562x799.jpg',
        price: 1250,
        quantity: 1
      }
    ],
    totalAmount: 1250,
    paymentMethod: 'Cash on Delivery',
    status: 'Processing'
  },
  {
    id: 'ord-10452',
    orderNumber: '#JC-10452',
    customerName: 'Deepa Patel',
    customerEmail: 'deepa.patel@gmail.com',
    customerPhone: '+91 9440112233',
    shippingAddress: 'Row House 5, Beverly Hills, Gachibowli, Hyderabad 500032',
    date: '2026-08-22',
    items: [
      {
        id: 'item-6',
        productId: '29017',
        productName: '18 Inch Black beads Floral Motif Necklace',
        productImage: 'https://jocollections.com/wp-content/uploads/2024/12/AJV3724-562x799.jpg',
        price: 499,
        quantity: 1
      }
    ],
    totalAmount: 499,
    paymentMethod: 'UPI',
    status: 'Pending'
  },
  {
    id: 'ord-10440',
    orderNumber: '#JC-10440',
    customerName: 'Meena Krishnan',
    customerEmail: 'meena.k@gmail.com',
    customerPhone: '+91 9700123456',
    shippingAddress: 'Apartment 5B, Skyline Towers, Kondapur, Hyderabad 500084',
    date: '2026-08-20',
    items: [
      {
        id: 'item-7',
        productId: '35354',
        productName: 'Viscose Crepe Silk Saree with flower motifs',
        productImage: 'https://jocollections.com/wp-content/uploads/2026/07/IMG-20260718-WA0586-600x799.jpg',
        price: 1499,
        quantity: 1
      }
    ],
    totalAmount: 1499,
    paymentMethod: 'Credit Card',
    status: 'Cancelled'
  }
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Rahul Racharla',
    email: 'rahulwork03@gmail.com',
    role: 'Administrator',
    ordersCount: 4,
    totalSpent: 4890,
    status: 'Active',
    joinedDate: '2024-01-15'
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    role: 'Customer',
    ordersCount: 3,
    totalSpent: 5490,
    status: 'Active',
    joinedDate: '2024-03-20'
  },
  {
    id: 'usr-3',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@yahoo.com',
    role: 'Customer',
    ordersCount: 5,
    totalSpent: 8950,
    status: 'Active',
    joinedDate: '2024-02-10'
  },
  {
    id: 'usr-4',
    name: 'Ananya Rao',
    email: 'ananya.rao@outlook.com',
    role: 'Customer',
    ordersCount: 2,
    totalSpent: 2500,
    status: 'Active',
    joinedDate: '2024-05-12'
  },
  {
    id: 'usr-5',
    name: 'Deepa Patel',
    email: 'deepa.patel@gmail.com',
    role: 'Customer',
    ordersCount: 1,
    totalSpent: 499,
    status: 'Active',
    joinedDate: '2024-07-01'
  },
  {
    id: 'usr-6',
    name: 'Jo Collections Team',
    email: 'contactjocollections@gmail.com',
    role: 'Store Manager',
    ordersCount: 0,
    totalSpent: 0,
    status: 'Active',
    joinedDate: '2023-11-01'
  }
];

const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Jo Collections',
  tagline: 'A Place Where Glamour and Traditions Meet',
  email: 'contactjocollections@gmail.com',
  phone: '+91-9010385551',
  address: 'Kukatpally, Hyderabad, Telangana, India - 500072',
  currency: '₹ INR',
  freeShippingThreshold: 999,
  announcementText: 'Special discounts for regular customers! Summer 2024 collection now live.',
  enableAnnouncement: true,
  socials: {
    instagram: 'https://www.instagram.com/jocollections2015/',
    youtube: 'https://www.youtube.com/channel/UC5CJqnjYaJWzc6z-2HYbTAA',
    facebook: 'https://www.facebook.com/Jocollections2015/',
    twitter: '#'
  }
};

interface AdminContextType {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  orders: AdminOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, 'id' | 'joinedDate' | 'ordersCount' | 'totalSpent'>) => void;
  updateUser: (user: AdminUser) => void;
  toggleUserStatus: (userId: string) => void;
  settings: StoreSettings;
  updateSettings: (newSettings: StoreSettings) => void;
  notifications: string[];
  clearNotifications: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Products state (synced with localStorage)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('jo_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return PRODUCTS;
      }
    }
    return PRODUCTS;
  });

  // Orders state
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    const saved = localStorage.getItem('jo_admin_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  // Users state
  const [users, setUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('jo_admin_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });

  // Store Settings state
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('jo_admin_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  const [notifications, setNotifications] = useState<string[]>([
    'New Order #JC-10492 received from Rahul Racharla (₹1,299.00)',
    'Customer Priya Sharma completed payment for Order #JC-10488',
    'Inventory update: 18 Inch Black Beads has 8 units remaining',
    'New customer registered: deepa.patel@gmail.com'
  ]);

  // Sync products with localStorage and notify storefront
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('jo_products', JSON.stringify(newProducts));
    window.dispatchEvent(new Event('jo_products_updated'));
  };

  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId
    };
    const updated = [newProduct, ...products];
    saveProducts(updated);
    setNotifications(prev => [`New product added: "${newProduct.name.slice(0, 30)}..."`, ...prev]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProducts(updated);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    saveProducts(updated);
  };

  // Orders operations
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(ord => (ord.id === orderId ? { ...ord, status } : ord));
    setOrders(updated);
    localStorage.setItem('jo_admin_orders', JSON.stringify(updated));
    setNotifications(prev => [`Order status updated for ${orderId} to "${status}"`, ...prev]);
  };

  // Users operations
  const addUser = (userData: Omit<AdminUser, 'id' | 'joinedDate' | 'ordersCount' | 'totalSpent'>) => {
    const newUser: AdminUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      ordersCount: 0,
      totalSpent: 0
    };
    const updated = [newUser, ...users];
    setUsers(updated);
    localStorage.setItem('jo_admin_users', JSON.stringify(updated));
  };

  const updateUser = (updatedUser: AdminUser) => {
    const updated = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updated);
    localStorage.setItem('jo_admin_users', JSON.stringify(updated));
  };

  const toggleUserStatus = (userId: string) => {
    const updated = users.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: nextStatus as 'Active' | 'Suspended' };
      }
      return u;
    });
    setUsers(updated);
    localStorage.setItem('jo_admin_users', JSON.stringify(updated));
  };

  // Settings operations
  const updateSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    localStorage.setItem('jo_admin_settings', JSON.stringify(newSettings));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        updateOrderStatus,
        users,
        addUser,
        updateUser,
        toggleUserStatus,
        settings,
        updateSettings,
        notifications,
        clearNotifications
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
