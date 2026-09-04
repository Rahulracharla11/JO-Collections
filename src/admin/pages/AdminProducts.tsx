import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const { products, deleteProduct, openAddProduct, openEditProduct } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'inStock' | 'outOfStock'>('All');

  const categories = ['All', 'Sarees', 'Jewellery', 'Dress Materials', 'Kurtis', 'Black Beads'];

  const filteredProducts = products.filter(p => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categories.some(c => c.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Category
    if (categoryFilter !== 'All') {
      const matchCat = p.categories.some(c => c.toLowerCase().includes(categoryFilter.toLowerCase()));
      if (!matchCat) return false;
    }

    // Stock
    if (stockFilter === 'inStock' && !p.inStock) return false;
    if (stockFilter === 'outOfStock' && p.inStock) return false;

    return true;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name.slice(0, 35)}..."?`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Catalog Management</h1>
          <p className="text-xs text-gray-500">
            Upload, modify, or remove products. Changes immediately sync to the live store.
          </p>
        </div>

        <button
          onClick={openAddProduct}
          className="inline-flex items-center space-x-2 bg-black hover:bg-[#f372ac] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, SKU, or keyword..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#f372ac]"
          />
        </div>

        <div className="flex items-center space-x-3">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#f372ac]"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          {/* Stock Dropdown */}
          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#f372ac]"
          >
            <option value="All">All Stock</option>
            <option value="inStock">In Stock Only</option>
            <option value="outOfStock">Out of Stock Only</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing <strong className="text-gray-900">{filteredProducts.length}</strong> of{' '}
            {products.length} products
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Storefront Synced</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50/70 text-gray-400 uppercase text-[11px] tracking-wider border-b border-gray-100">
                <th className="p-4 font-semibold">Product</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-12 h-16 object-cover rounded-md border border-gray-100 flex-shrink-0"
                      />
                      <div className="max-w-xs sm:max-w-md">
                        <p className="font-bold text-gray-900 line-clamp-2 leading-snug">{prod.name}</p>
                        {prod.details?.fabric && (
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Fabric: {prod.details.fabric}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-medium text-gray-600">{prod.sku}</td>
                  <td className="p-4">
                    <span className="inline-block bg-gray-100 text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                      {prod.categories[0]}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <span className="font-bold text-gray-900">
                        ₹{prod.price.toLocaleString('en-IN')}.00
                      </span>
                      {prod.originalPrice && (
                        <span className="text-[11px] text-gray-400 line-through block">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        prod.inStock
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {prod.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-black transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 rounded-md hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
