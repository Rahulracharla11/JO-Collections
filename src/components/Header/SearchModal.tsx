import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart, setQuickViewProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isSearchOpen) {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const results = searchTerm.trim()
    ? PRODUCTS.filter(
        p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const popularSearches = ['Sarees', 'Dress Materials', 'Banarasi', 'Crepe', 'Kurtis', 'Jewellery'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="fixed inset-x-0 top-0 max-h-[85vh] bg-white shadow-2xl z-10 flex flex-col animate-slide-down">
        <div className="max-w-[1000px] w-full mx-auto p-6 md:p-10 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#eee]">
            <h2 className="text-xl md:text-2xl font-semibold text-[#222]">Search For Products</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Box */}
          <div className="mt-6 flex items-center border-2 border-[#222] rounded-none focus-within:border-[#f372ac] transition-colors">
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search for products, sarees, kurtis..."
              className="flex-1 px-4 py-3 text-base text-[#222] placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-[#222] hover:bg-[#f372ac] text-white px-6 py-3.5 transition-colors flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Popular Searches */}
          <div className="mt-4 flex items-center flex-wrap gap-2 text-sm text-[#666]">
            <span className="font-semibold text-[#222]">Popular:</span>
            {popularSearches.map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-3 py-1 bg-gray-100 hover:bg-[#f372ac] hover:text-white rounded-full text-xs font-medium transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="mt-6 overflow-y-auto max-h-[45vh] pr-2">
            {searchTerm.trim() && results.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-sm">
                No products found matching "{searchTerm}". Try a different keyword.
              </div>
            )}

            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map(prod => (
                  <div
                    key={prod.id}
                    className="flex space-x-3 p-3 border border-[#f0f0f0] hover:border-[#f372ac] hover:shadow-sm transition-all group"
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-16 h-20 object-cover object-top border border-gray-100 cursor-pointer"
                      onClick={() => {
                        setQuickViewProduct(prod);
                        setIsSearchOpen(false);
                      }}
                    />
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                          {prod.categories[0]}
                        </span>
                        <h4
                          onClick={() => {
                            setQuickViewProduct(prod);
                            setIsSearchOpen(false);
                          }}
                          className="font-medium text-[#222] line-clamp-2 hover:text-[#f372ac] cursor-pointer mt-0.5"
                        >
                          {prod.name}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm text-[#222]">
                          ₹{prod.price.toLocaleString('en-IN')}.00
                        </span>
                        <button
                          onClick={() => {
                            addToCart(prod, 1);
                            setIsSearchOpen(false);
                          }}
                          className="px-2.5 py-1 bg-[#222] hover:bg-[#f372ac] text-white text-[11px] font-medium transition-colors"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
