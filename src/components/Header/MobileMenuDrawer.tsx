import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Heart, Instagram, Youtube, Twitter, Facebook } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MobileMenuDrawer: React.FC = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, wishlist, setActiveCategory } = useShop();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  if (!isMobileMenuOpen) return null;

  const toggleSubmenu = (name: string) => {
    setExpandedMenu(prev => (prev === name ? null : name));
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-xs"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-4 border-b border-[#e5e5e5] flex items-center justify-between">
            <h6 className="text-sm font-semibold tracking-wider uppercase text-[#222]">Main Menu</h6>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-gray-500 hover:text-black rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2 divide-y divide-gray-100">
            {/* Shop Item */}
            <div>
              <div
                onClick={() => toggleSubmenu('shop')}
                className="px-5 py-3.5 flex items-center justify-between text-[15px] font-medium text-[#222] hover:text-[#f372ac] cursor-pointer"
              >
                <span>Shop</span>
                {expandedMenu === 'shop' ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {expandedMenu === 'shop' && (
                <div className="bg-[#f9f9f9] px-7 py-3 space-y-2.5 text-sm text-[#555]">
                  <div
                    onClick={() => handleCategoryClick('all')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    All Products
                  </div>
                  <div
                    onClick={() => handleCategoryClick('cat-sarees')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Sarees
                  </div>
                  <div
                    onClick={() => handleCategoryClick('banarasi-sarees')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Banarasi Sarees
                  </div>
                  <div
                    onClick={() => handleCategoryClick('Crepe Sarees')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Crepe Sarees
                  </div>
                  <div
                    onClick={() => handleCategoryClick('Cotton Sarees')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Cotton Sarees
                  </div>
                </div>
              )}
            </div>

            {/* Jewellery Item */}
            <div>
              <div
                onClick={() => toggleSubmenu('jewellery')}
                className="px-5 py-3.5 flex items-center justify-between text-[15px] font-medium text-[#222] hover:text-[#f372ac] cursor-pointer"
              >
                <span>Jewellery</span>
                {expandedMenu === 'jewellery' ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {expandedMenu === 'jewellery' && (
                <div className="bg-[#f9f9f9] px-7 py-3 space-y-2.5 text-sm text-[#555]">
                  <div
                    onClick={() => handleCategoryClick('Jewellery')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    All Jewellery
                  </div>
                  <div
                    onClick={() => handleCategoryClick('Black Beads')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Black Beads
                  </div>
                </div>
              )}
            </div>

            {/* Dress Materials Item */}
            <div>
              <div
                onClick={() => {
                  handleCategoryClick('dress-materials');
                }}
                className="px-5 py-3.5 flex items-center justify-between text-[15px] font-medium text-[#222] hover:text-[#f372ac] cursor-pointer"
              >
                <span>Dress Materials</span>
              </div>
            </div>

            {/* Kurtis Item */}
            <div>
              <div
                onClick={() => toggleSubmenu('kurtis')}
                className="px-5 py-3.5 flex items-center justify-between text-[15px] font-medium text-[#222] hover:text-[#f372ac] cursor-pointer"
              >
                <span>Kurtis</span>
                {expandedMenu === 'kurtis' ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
              {expandedMenu === 'kurtis' && (
                <div className="bg-[#f9f9f9] px-7 py-3 space-y-2.5 text-sm text-[#555]">
                  <div
                    onClick={() => handleCategoryClick('Kurtis')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    All Kurtis
                  </div>
                  <div
                    onClick={() => handleCategoryClick('Kalamkari')}
                    className="cursor-pointer hover:text-[#f372ac]"
                  >
                    Kalamkari
                  </div>
                </div>
              )}
            </div>

            {/* Sale Link */}
            <div>
              <div
                onClick={() => handleCategoryClick('sale')}
                className="px-5 py-3.5 flex items-center justify-between text-[15px] font-medium text-[#cf2e2e] hover:text-[#f372ac] cursor-pointer"
              >
                <span>Sale</span>
                <span className="text-[10px] bg-[#cf2e2e] text-white px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                  Hot
                </span>
              </div>
            </div>

            {/* Wishlist in drawer */}
            <div className="px-5 py-4 flex items-center justify-between text-[15px] font-medium text-[#222]">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-gray-600" />
                <span>Wishlist</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {wishlist.length}
              </span>
            </div>
          </div>

          {/* Social Links in Drawer Bottom */}
          <div className="p-5 border-t border-[#eee] bg-[#fafafa]">
            <div className="flex items-center justify-center space-x-6 text-[#666]">
              <a href="https://www.instagram.com/jocollections2015/" target="_blank" rel="noreferrer">
                <Instagram className="w-5 h-5 hover:text-[#f372ac] transition-colors" />
              </a>
              <a href="https://www.youtube.com/channel/UC5CJqnjYaJWzc6z-2HYbTAA" target="_blank" rel="noreferrer">
                <Youtube className="w-5 h-5 hover:text-[#f372ac] transition-colors" />
              </a>
              <a href="#">
                <Twitter className="w-5 h-5 hover:text-[#f372ac] transition-colors" />
              </a>
              <a href="https://www.facebook.com/Jocollections2015/" target="_blank" rel="noreferrer">
                <Facebook className="w-5 h-5 hover:text-[#f372ac] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
