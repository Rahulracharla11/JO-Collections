import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data/products';

export interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
}

export type PageView = 'home' | 'my-account' | 'admin';
export type AccountSubView =
  | 'auth'
  | 'lost-password'
  | 'reset-password'
  | 'dashboard'
  | 'orders'
  | 'downloads'
  | 'addresses'
  | 'account-details';

interface ShopContextType {
  // Products Catalog
  products: Product[];

  // Cart & Wishlist
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  cartCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Drawers & Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;

  // Search & Categories
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Page Routing & Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  accountSubView: AccountSubView;
  setAccountSubView: (view: AccountSubView) => void;
  navigateToHome: () => void;
  navigateToAccount: (view?: AccountSubView) => void;
  navigateToAdmin: () => void;

  // User & Authentication
  user: UserProfile | null;
  isAuthenticated: boolean;
  authSuccessNotice: string | null;
  setAuthSuccessNotice: (msg: string | null) => void;
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  register: (email: string) => { success: boolean; error?: string };
  logout: () => void;
  requestPasswordReset: (usernameOrEmail: string) => { success: boolean; error?: string };
  setNewPassword: (password: string) => { success: boolean; error?: string };
  updateAccountDetails: (data: Partial<UserProfile> & { currentPassword?: string; newPassword?: string }) => { success: boolean; error?: string };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products Catalog (initialized with local storage or PRODUCTS default)
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

  // Listen for admin catalog updates
  useEffect(() => {
    const handleProductsUpdated = () => {
      const saved = localStorage.getItem('jo_products');
      if (saved) {
        try {
          setProducts(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('jo_products_updated', handleProductsUpdated);
    return () => window.removeEventListener('jo_products_updated', handleProductsUpdated);
  }, []);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const initialProd = PRODUCTS.find(p => p.id === '12c7c') || PRODUCTS[0];
    return [{ product: initialProd, quantity: 2 }];
  });

  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initial Page Routing from URL path
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.startsWith('/admin') || hash.startsWith('#/admin') || hash === '#admin') {
      return 'admin';
    }
    if (path.startsWith('/my-account') || hash.startsWith('#/my-account')) {
      return 'my-account';
    }
    return 'home';
  });

  // Browser history popstate handler
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash.startsWith('#/admin') || hash === '#admin') {
        setCurrentPage('admin');
      } else if (path.startsWith('/my-account') || hash.startsWith('#/my-account')) {
        setCurrentPage('my-account');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [accountSubView, setAccountSubView] = useState<AccountSubView>('auth');
  const [authSuccessNotice, setAuthSuccessNotice] = useState<string | null>(null);

  // Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('jo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('jo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('jo_user');
    }
  }, [user]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToastMessage(`"${product.name.slice(0, 45)}..." has been added to your cart.`);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation handlers with clean URL history updates
  const navigateToHome = () => {
    setCurrentPage('home');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAccount = (view?: AccountSubView) => {
    setCurrentPage('my-account');
    window.history.pushState(null, '', '/my-account');
    if (view) {
      setAccountSubView(view);
    } else {
      setAccountSubView(user ? 'dashboard' : 'auth');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdmin = () => {
    setCurrentPage('admin');
    window.history.pushState(null, '', '/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations
  const login = (usernameOrEmail: string, password: string) => {
    const trimmed = usernameOrEmail.trim();
    if (!trimmed) {
      return { success: false, error: 'Username or email is required.' };
    }
    if (!password) {
      return { success: false, error: 'Password is required.' };
    }

    const derivedUsername = trimmed.includes('@') ? trimmed.split('@')[0] : trimmed;
    const newUser: UserProfile = {
      username: derivedUsername,
      email: trimmed.includes('@') ? trimmed : `${derivedUsername}@example.com`,
      firstName: derivedUsername,
      lastName: '',
      displayName: derivedUsername
    };

    setUser(newUser);
    setAccountSubView('dashboard');
    return { success: true };
  };

  const register = (email: string) => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!emailRegex.test(trimmed)) {
      return { success: false, error: 'Please provide a valid email address.' };
    }

    const derivedUsername = trimmed.split('@')[0];
    const newUser: UserProfile = {
      username: derivedUsername,
      email: trimmed,
      firstName: derivedUsername,
      lastName: '',
      displayName: derivedUsername
    };

    setUser(newUser);
    setAuthSuccessNotice('Your account has been created successfully.');
    setAccountSubView('dashboard');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setAuthSuccessNotice(null);
    setAccountSubView('auth');
  };

  const requestPasswordReset = (usernameOrEmail: string) => {
    const trimmed = usernameOrEmail.trim();
    if (!trimmed) {
      return { success: false, error: 'Please enter a username or email address.' };
    }
    setAccountSubView('reset-password');
    return { success: true };
  };

  const setNewPassword = (password: string) => {
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const defaultUser: UserProfile = user || {
      username: 'rrahulwork03',
      email: 'rahulwork03@gmail.com',
      firstName: 'Rahul',
      lastName: 'Racharla',
      displayName: 'rrahulwork03'
    };

    setUser(defaultUser);
    setAuthSuccessNotice('Your password has been reset successfully.');
    setAccountSubView('dashboard');
    return { success: true };
  };

  const updateAccountDetails = (data: Partial<UserProfile> & { currentPassword?: string; newPassword?: string }) => {
    if (!user) return { success: false, error: 'Not logged in' };

    if (!data.firstName?.trim()) {
      return { success: false, error: 'First name is a required field.' };
    }
    if (!data.lastName?.trim()) {
      return { success: false, error: 'Last name is a required field.' };
    }
    if (!data.displayName?.trim()) {
      return { success: false, error: 'Display name is a required field.' };
    }
    if (!data.email?.trim()) {
      return { success: false, error: 'Email address is a required field.' };
    }

    setUser({
      ...user,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      displayName: data.displayName.trim(),
      email: data.email.trim()
    });

    setAuthSuccessNotice('Account details changed successfully.');
    return { success: true };
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        cartCount,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        setToastMessage,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        accountSubView,
        setAccountSubView,
        navigateToHome,
        navigateToAccount,
        navigateToAdmin,
        user,
        isAuthenticated,
        authSuccessNotice,
        setAuthSuccessNotice,
        login,
        register,
        logout,
        requestPasswordReset,
        setNewPassword,
        updateAccountDetails
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
