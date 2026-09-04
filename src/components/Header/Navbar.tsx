import React, { useState, useEffect } from 'react';
import { Menu, Search, Heart, ShoppingBag, ChevronDown, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { AccountDropdown } from './AccountDropdown';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    setActiveCategory,
    navigateToHome,
    navigateToAccount,
    user,
    isAuthenticated
  } = useShop();

  const [isSticky, setIsSticky] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full bg-white z-40 transition-all duration-200 ${
        isSticky ? 'fixed top-0 left-0 shadow-md border-b border-[#eee]' : 'relative border-b border-[#eaeaea]'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-[75px] lg:h-[88px] flex items-center justify-between">
        {/* Mobile Left: Menu Toggle & Search Button */}
        <div className="flex items-center space-x-3 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-[#222] hover:text-[#f372ac] transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#222] hover:text-[#f372ac] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <button
            onClick={() => navigateToHome()}
            className="cursor-pointer flex items-center"
            aria-label="Jo Collections Home"
          >
            <img
              src="https://jocollections.com/wp-content/uploads/2023/11/logo10.png"
              alt="Jo Collections"
              className="h-10 md:h-12 lg:h-14 w-auto object-contain"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[16px] font-medium text-[#222]">
          {/* Shop with Megamenu */}
          <div
            className="relative py-7 group"
            onMouseEnter={() => setActiveMegamenu('shop')}
            onMouseLeave={() => setActiveMegamenu(null)}
          >
            <a
              href="#products"
              onClick={() => setActiveCategory('all')}
              className="flex items-center space-x-1 hover:text-[#f372ac] transition-colors"
            >
              <span>Shop</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
            </a>

            {/* Shop Megamenu */}
            {activeMegamenu === 'shop' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white border border-[#eaeaea] shadow-2xl p-8 z-50 animate-fade-in grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#222] pb-2 border-b border-gray-100 mb-3">
                    Women
                  </h3>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Black Beads')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Black Beads
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('cat-sarees')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Designer Sarees
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Crepe Sarees')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Crepe Silk Sarees
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Cotton Sarees')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Cotton Sarees
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#222] pb-2 border-b border-gray-100 mb-3">
                    Special
                  </h3>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Latest products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('sale')}
                        className="hover:text-[#f372ac] transition-colors font-medium text-[#cf2e2e]"
                      >
                        Sale
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Bestsellers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Top rated
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Popularity
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#fcf8f9] p-5 border border-[#f5e0e8] flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest font-bold text-[#f372ac]">
                      Follow Us
                    </span>
                    <h4 className="text-base font-bold text-[#222] mt-1">Jo Collections Community</h4>
                    <p className="text-xs text-[#777] mt-2">
                      Join thousands of women celebrating traditional Indian elegance and authentic craftsmanship.
                    </p>
                  </div>
                  <div className="flex space-x-3 mt-4 text-[#444]">
                    <a href="https://www.instagram.com/jocollections2015/" target="_blank" rel="noreferrer">
                      <span className="text-xs font-semibold text-[#f372ac] hover:underline">Instagram →</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Jewellery with Megamenu */}
          <div
            className="relative py-7 group"
            onMouseEnter={() => setActiveMegamenu('jewellery')}
            onMouseLeave={() => setActiveMegamenu(null)}
          >
            <a
              href="#products"
              onClick={() => setActiveCategory('Jewellery')}
              className="flex items-center space-x-1 hover:text-[#f372ac] transition-colors"
            >
              <span>Jewellery</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
            </a>

            {/* Jewellery Megamenu */}
            {activeMegamenu === 'jewellery' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-[#eaeaea] shadow-2xl p-8 z-50 animate-fade-in grid grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#222] pb-2 border-b border-gray-100 mb-3">
                    Women
                  </h3>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Jewellery')}
                        className="hover:text-[#f372ac] transition-colors font-medium text-[#222]"
                      >
                        All Jewellery
                      </a>
                    </li>
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Black Beads')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Black Beads
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Banner 1 */}
                <div className="relative overflow-hidden group/banner rounded-sm bg-gray-100 h-[220px]">
                  <img
                    src="https://jocollections.com/wp-content/uploads/2023/09/topbg5.jpg"
                    alt="Huge Sale"
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 p-5 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-xs uppercase font-medium tracking-wider">Huge Sale</span>
                      <h4 className="text-lg font-bold leading-tight mt-1">2024 Summer<br />Collection</h4>
                    </div>
                    <a
                      href="#products"
                      onClick={() => setActiveCategory('Jewellery')}
                      className="text-xs uppercase font-bold tracking-wider underline hover:text-[#f372ac] transition-colors"
                    >
                      Shop now
                    </a>
                  </div>
                </div>

                {/* Banner 2 */}
                <div className="relative overflow-hidden group/banner rounded-sm bg-gray-100 h-[220px]">
                  <img
                    src="https://jocollections.com/wp-content/uploads/2023/09/topbg4.jpg"
                    alt="Jewelry Collection"
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 p-5 flex flex-col justify-between text-white">
                    <div>
                      <h4 className="text-lg font-bold leading-tight">Jewelry<br />Collection</h4>
                      <span className="text-xs text-yellow-300 font-medium">Golden Max</span>
                    </div>
                    <a
                      href="#products"
                      onClick={() => setActiveCategory('Jewellery')}
                      className="text-xs uppercase font-bold tracking-wider underline hover:text-[#f372ac] transition-colors"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dress Materials with Megamenu */}
          <div
            className="relative py-7 group"
            onMouseEnter={() => setActiveMegamenu('dress')}
            onMouseLeave={() => setActiveMegamenu(null)}
          >
            <a
              href="#products"
              onClick={() => setActiveCategory('dress-materials')}
              className="flex items-center space-x-1 hover:text-[#f372ac] transition-colors"
            >
              <span>Dress Materials</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
            </a>

            {/* Dress Materials Megamenu */}
            {activeMegamenu === 'dress' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white border border-[#eaeaea] shadow-2xl p-8 z-50 animate-fade-in grid grid-cols-2 gap-6">
                <div className="relative overflow-hidden group/banner rounded-sm bg-gray-100 h-[200px]">
                  <img
                    src="https://jocollections.com/wp-content/uploads/2023/06/topbg3.jpg"
                    alt="Cotton Dress Materials"
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 p-5 flex flex-col justify-between text-white">
                    <div>
                      <span className="text-xs uppercase font-medium">New</span>
                      <h4 className="text-lg font-bold leading-tight mt-1">Cotton Dress Materials</h4>
                    </div>
                    <a
                      href="#products"
                      onClick={() => setActiveCategory('dress-materials')}
                      className="text-xs uppercase font-bold tracking-wider underline hover:text-[#f372ac] transition-colors"
                    >
                      Shop now
                    </a>
                  </div>
                </div>

                <div className="relative overflow-hidden group/banner rounded-sm bg-gray-100 h-[200px]">
                  <img
                    src="https://jocollections.com/wp-content/uploads/2023/06/topbg5.jpg"
                    alt="Dress Materials"
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 p-5 flex flex-col justify-between text-white">
                    <div>
                      <h4 className="text-lg font-bold leading-tight">Dress Materials</h4>
                    </div>
                    <a
                      href="#products"
                      onClick={() => setActiveCategory('dress-materials')}
                      className="text-xs uppercase font-bold tracking-wider underline hover:text-[#f372ac] transition-colors"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Kurtis with Megamenu */}
          <div
            className="relative py-7 group"
            onMouseEnter={() => setActiveMegamenu('kurtis')}
            onMouseLeave={() => setActiveMegamenu(null)}
          >
            <a
              href="#products"
              onClick={() => setActiveCategory('Kurtis')}
              className="flex items-center space-x-1 hover:text-[#f372ac] transition-colors"
            >
              <span>Kurtis</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:rotate-180 transition-transform" />
            </a>

            {/* Kurtis Megamenu */}
            {activeMegamenu === 'kurtis' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] bg-white border border-[#eaeaea] shadow-2xl p-8 z-50 animate-fade-in grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#222] pb-2 border-b border-gray-100 mb-3">
                    Categories
                  </h3>
                  <ul className="space-y-2 text-sm text-[#666]">
                    <li>
                      <a
                        href="#products"
                        onClick={() => setActiveCategory('Kalamkari')}
                        className="hover:text-[#f372ac] transition-colors"
                      >
                        Kalamkari
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="relative overflow-hidden group/banner rounded-sm bg-gray-100 h-[190px]">
                  <img
                    src="https://jocollections.com/wp-content/uploads/2023/06/topbg1.jpg"
                    alt="Kurtis"
                    className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 p-5 flex flex-col justify-between text-white">
                    <div>
                      <h4 className="text-lg font-bold leading-tight">Kurtis</h4>
                    </div>
                    <a
                      href="#products"
                      onClick={() => setActiveCategory('Kurtis')}
                      className="text-xs uppercase font-bold tracking-wider underline hover:text-[#f372ac] transition-colors"
                    >
                      Shop now
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sale Link */}
          <a
            href="#products"
            onClick={() => setActiveCategory('sale')}
            className="hover:text-[#f372ac] transition-colors"
          >
            Sale
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          {/* Desktop Search Button */}
          <div className="hidden xl:block">
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center border border-[#ddd] px-3 py-2 text-sm text-[#888] cursor-pointer hover:border-[#222] transition-colors w-[220px]"
            >
              <span className="flex-1">Search for products</span>
              <Search className="w-4 h-4 text-[#222]" />
            </div>
          </div>

          <div className="hidden lg:block xl:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#222] hover:text-[#f372ac] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* My Account */}
          <div className="relative hidden sm:block">
            <div className="flex items-center">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    navigateToAccount('dashboard');
                  } else {
                    navigateToAccount('auth');
                  }
                }}
                className="flex items-center space-x-1.5 text-[14px] font-medium text-[#222] hover:text-[#f372ac] transition-colors py-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">
                  {isAuthenticated && user
                    ? `Hello, ${user.displayName || user.username}`
                    : 'Sign in/Sign up'}
                </span>
              </button>
              <button
                onClick={() => setIsAccountOpen(prev => !prev)}
                className="p-1 text-gray-400 hover:text-black transition-colors"
                aria-label="Account options"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <AccountDropdown isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
          </div>

          {/* Wishlist */}
          <a
            href="#wishlist"
            className="relative p-1 text-[#222] hover:text-[#f372ac] transition-colors flex items-center space-x-1.5"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden md:inline text-sm font-medium">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#222] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </a>

          {/* Shopping Cart Indicator */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#222] group-hover:text-[#f372ac] transition-colors" />
              <span className="absolute -top-1.5 -right-2 bg-[#f372ac] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <span className="hidden md:inline text-xs font-semibold text-[#666] group-hover:text-[#222] transition-colors">
              in cart
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
