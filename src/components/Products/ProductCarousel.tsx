import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../../context/ShopContext';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const ProductCarousel: React.FC = () => {
  const { activeCategory, setActiveCategory, searchQuery } = useShop();
  const [sortBy, setSortBy] = useState('menu_order');
  const [showOnlySale, setShowOnlySale] = useState(false);

  const tabs = [
    { label: 'All products', key: 'all' },
    { label: 'Banarasi Sarees', key: 'banarasi-sarees' },
    { label: 'Crepe Sarees', key: 'Crepe Sarees' },
    { label: 'Cotton Sarees', key: 'Cotton Sarees' },
    { label: 'Jewellery', key: 'Jewellery' },
    { label: 'Kurtis', key: 'Kurtis' },
    { label: 'Sale', key: 'sale' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (activeCategory !== 'all') {
        const matchesCategory =
          p.categories.some(c => c.toLowerCase() === activeCategory.toLowerCase()) ||
          (activeCategory === 'cat-sarees' && p.categories.some(c => c.toLowerCase().includes('saree'))) ||
          (activeCategory === 'sale' && p.isOnSale);
        if (!matchesCategory) return false;
      }

      // Sale filter checkbox
      if (showOnlySale && !p.isOnSale) {
        return false;
      }

      // Search term filter
      if (searchQuery.trim()) {
        const matchesQuery =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
        if (!matchesQuery) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popularity') return (b.reviewCount || 0) - (a.reviewCount || 0);
      return 0;
    });
  }, [activeCategory, showOnlySale, searchQuery, sortBy]);

  return (
    <section id="products" className="max-w-[1440px] mx-auto px-4 lg:px-10 py-10 sm:py-14">
      {/* Category Tabs Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e5e5e5] pb-4 mb-8 gap-4">
        {/* Scrollable Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors relative ${
                activeCategory === tab.key
                  ? 'text-[#222] after:absolute after:bottom-[-17px] md:after:bottom-[-17px] after:left-0 after:right-0 after:h-[2px] after:bg-[#222]'
                  : 'text-[#888] hover:text-[#222]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-4 self-end md:self-auto text-xs text-[#666]">
          {/* On Sale Checkbox */}
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlySale}
              onChange={e => setShowOnlySale(e.target.checked)}
              className="rounded text-[#f372ac] focus:ring-0"
            />
            <span className="font-medium text-[#444]">Show only on sale</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-1.5 pl-2 border-l border-gray-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-medium text-[#444] focus:outline-none cursor-pointer py-1"
            >
              <option value="menu_order">Default sorting</option>
              <option value="popularity">Sort by popularity</option>
              <option value="rating">Sort by average rating</option>
              <option value="price">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Count Status */}
      <div className="flex items-center justify-between text-xs text-[#888] mb-6">
        <span>Showing all {filteredProducts.length} results</span>
        {activeCategory !== 'all' && (
          <button
            onClick={() => setActiveCategory('all')}
            className="text-[#f372ac] hover:underline font-semibold"
          >
            Clear category filter
          </button>
        )}
      </div>

      {/* 5-Column Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-dashed border-gray-200 rounded-sm">
          <p className="text-base font-semibold text-[#444]">No products found in this category.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setShowOnlySale(false);
            }}
            className="mt-3 text-sm text-[#f372ac] hover:underline font-medium"
          >
            View all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
