import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle,
  X,
  Sparkles,
  Layers,
  Tag,
  DollarSign,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../../types';

export const AdminProductForm: React.FC = () => {
  const { editingProduct, addProduct, updateProduct, setActiveTab } = useAdmin();

  const isEditing = !!editingProduct;

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [categories, setCategories] = useState<string[]>(['Sarees']);
  const [inStock, setInStock] = useState(true);
  const [onSale, setOnSale] = useState(false);
  const [fabric, setFabric] = useState('');
  const [work, setWork] = useState('');
  const [blouse, setBlouse] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState('Dispatched in 2-3 business days');
  const [description, setDescription] = useState('');

  // Primary image
  const [image, setImage] = useState<string>('');
  const [imageFileName, setImageFileName] = useState<string>('');
  const [useUrlMode, setUseUrlMode] = useState(false);

  // Secondary hover image
  const [hoverImage, setHoverImage] = useState<string>('');
  const [hoverFileName, setHoverFileName] = useState<string>('');

  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hoverFileInputRef = useRef<HTMLInputElement>(null);

  const availableCategories = [
    'Sarees',
    'Jewellery',
    'Dress Materials',
    'Kurtis',
    'Black Beads',
    'Pure Silk Sarees',
    'Viscose Crepe',
    'Bandhani',
    'Kalamkari'
  ];

  // Populate data when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || '');
      setSku(editingProduct.sku || '');
      setPrice(editingProduct.price ? String(editingProduct.price) : '');
      setOriginalPrice(editingProduct.originalPrice ? String(editingProduct.originalPrice) : '');
      setCategories(editingProduct.categories?.length ? editingProduct.categories : ['Sarees']);
      setInStock(editingProduct.inStock ?? true);
      setOnSale(editingProduct.isOnSale ?? false);
      setFabric(editingProduct.details?.fabric || '');
      setWork(editingProduct.details?.work || '');
      setBlouse(editingProduct.details?.blouse || '');
      setDispatchInfo(editingProduct.details?.deliveryTime || 'Dispatched in 2-3 business days');
      setDescription(editingProduct.description || '');
      setImage(editingProduct.imageUrl || '');
      setHoverImage(editingProduct.secondaryImageUrl || '');
      setImageFileName(editingProduct.imageUrl ? 'Current product image' : '');
      setHoverFileName(editingProduct.secondaryImageUrl ? 'Current hover image' : '');
    } else {
      // Default SKU for new product
      setSku(`JC-${Math.floor(10000 + Math.random() * 90000)}`);
      setImage('https://jocollections.com/wp-content/uploads/2025/10/IMG-20260801-WA0596-600x799.jpg');
    }
  }, [editingProduct]);

  // File upload handler converting file to base64 DataURL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'primary' | 'hover'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
      return;
    }

    // Limit to 5MB for browser performance
    if (file.size > 5 * 1024 * 1024) {
      setFormError('Image size exceeds 5MB. Please choose an optimized image.');
      return;
    }

    setFormError('');
    const reader = new FileReader();
    reader.onload = event => {
      const result = event.target?.result as string;
      if (target === 'primary') {
        setImage(result);
        setImageFileName(file.name);
      } else {
        setHoverImage(result);
        setHoverFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      if (categories.length > 1) {
        setCategories(categories.filter(c => c !== cat));
      }
    } else {
      setCategories([...categories, cat]);
    }
  };

  const generateNewSku = () => {
    setSku(`JC-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const calculateDiscount = () => {
    const p = parseFloat(price);
    const op = parseFloat(originalPrice);
    if (op && p && op > p) {
      return Math.round(((op - p) / op) * 100);
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Product Name is required.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setFormError('Please provide a valid Selling Price.');
      return;
    }
    if (!image.trim()) {
      setFormError('Product Main Image is required. Please upload an image.');
      return;
    }

    setIsSubmitting(true);

    const calculatedDiscount = calculateDiscount();
    const productPayload: Omit<Product, 'id'> = {
      name: name.trim(),
      slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: sku.trim() || `JC-${Math.floor(10000 + Math.random() * 90000)}`,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercent: calculatedDiscount ?? undefined,
      imageUrl: image.trim(),
      secondaryImageUrl: hoverImage.trim() || undefined,
      categories: categories.length > 0 ? categories : ['Sarees'],
      inStock,
      isOnSale: onSale,
      rating: editingProduct ? editingProduct.rating : 5,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      description: description.trim(),
      details: {
        fabric: fabric.trim(),
        work: work.trim(),
        blouse: blouse.trim(),
        deliveryTime: dispatchInfo.trim()
      }
    };

    if (isEditing && editingProduct) {
      updateProduct({
        ...productPayload,
        id: editingProduct.id
      });
    } else {
      addProduct(productPayload);
    }

    setIsSubmitting(false);
    setActiveTab('products');
  };

  const discountPercent = calculateDiscount();

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Breadcrumb and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        <div>
          <button
            onClick={() => setActiveTab('products')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-black mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products Catalog</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {isEditing ? `Edit Product: ${editingProduct.name.slice(0, 35)}...` : 'Add New Product'}
            </h1>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                isEditing
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              {isEditing ? 'Editing Mode' : 'New Catalog Item'}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Upload photographs, set pricing, and configure product attributes.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className="px-4 py-2 border border-gray-200 hover:bg-gray-100 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#f372ac] hover:bg-pink-600 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center space-x-2 cursor-pointer disabled:opacity-70"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isEditing ? 'Update Product' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2.5 shadow-xs">
          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
          <span className="font-medium">{formError}</span>
        </div>
      )}

      {/* 2-Column Form Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Form Fields & Image Uploads */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION 1: PRODUCT PHOTOGRAPHY & FILE UPLOAD */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#f372ac]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Product Photography &amp; Images
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUseUrlMode(!useUrlMode)}
                className="text-xs text-[#f372ac] hover:underline font-semibold"
              >
                {useUrlMode ? 'Switch to File Upload' : 'Or use Image URL instead'}
              </button>
            </div>

            {/* Main Primary Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Primary Product Image <span className="text-rose-500">*</span>
              </label>

              {useUrlMode ? (
                <div className="space-y-2">
                  <input
                    type="url"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    placeholder="https://jocollections.com/wp-content/uploads/..."
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                  />
                  <p className="text-[11px] text-gray-400">
                    Paste a direct image link from Jo Collections or any web host.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={e => handleFileUpload(e, 'primary')}
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#f372ac] rounded-2xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-pink-50/20"
                  >
                    <UploadCloud className="w-10 h-10 text-gray-400 hover:text-[#f372ac] mx-auto mb-2 transition-colors" />
                    <p className="text-sm font-semibold text-gray-800">
                      Click to choose an image file from your device
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Supports PNG, JPG, JPEG, WEBP (Instant preview &amp; local storage)
                    </p>
                    {imageFileName && (
                      <p className="mt-2 text-xs font-bold text-[#f372ac] bg-pink-50 inline-block px-3 py-1 rounded-full border border-pink-100">
                        Selected: {imageFileName}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Primary Image Preview Box */}
              {image && (
                <div className="mt-3 flex items-center space-x-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-16 h-20 object-cover rounded-lg border border-gray-300 shadow-2xs"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 truncate">
                      {imageFileName || 'Primary Display Image'}
                    </p>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      ✓ Ready for live storefront display
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImage('');
                      setImageFileName('');
                    }}
                    className="text-gray-400 hover:text-rose-500 p-1.5 transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Secondary Hover Image (Optional) */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Secondary Hover Image (Optional)
              </label>

              <input
                ref={hoverFileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={e => handleFileUpload(e, 'hover')}
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => hoverFileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-gray-500" />
                  <span>Upload Hover Photo</span>
                </button>

                <span className="text-xs text-gray-400 text-center sm:text-left">or enter URL:</span>

                <input
                  type="url"
                  value={hoverImage}
                  onChange={e => setHoverImage(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              {hoverImage && (
                <div className="mt-3 flex items-center space-x-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <img
                    src={hoverImage}
                    alt="Hover Preview"
                    className="w-12 h-16 object-cover rounded-lg border border-gray-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {hoverFileName || 'Hover Image'}
                    </p>
                    <p className="text-[11px] text-gray-400">Displays when customer hovers over card</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setHoverImage('');
                      setHoverFileName('');
                    }}
                    className="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: BASIC DETAILS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Tag className="w-5 h-5 text-[#f372ac]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Product Information
              </h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Product Title / Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Kanjivaram Bandhani Saree with Hand Bandhej Work"
                required
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    SKU Code
                  </label>
                  <button
                    type="button"
                    onClick={generateNewSku}
                    className="text-[11px] text-[#f372ac] hover:underline flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Auto SKU</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  placeholder="JC-12345"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Categories (Select multiple)
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {availableCategories.map(cat => {
                    const isSelected = categories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleToggleCategory(cat)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#f372ac] text-white shadow-2xs'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Description / Details
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Provide luxurious details about this saree, jewellery, or ethnic wear piece..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>
          </div>

          {/* SECTION 3: PRICING & INVENTORY */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <DollarSign className="w-5 h-5 text-[#f372ac]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Pricing &amp; Inventory Status
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Selling Price (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="1299"
                    required
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#f372ac]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Original MRP (₹) (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(e.target.value)}
                    placeholder="1899"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#f372ac]"
                  />
                </div>
                {discountPercent !== null && (
                  <span className="text-[11px] font-bold text-emerald-600 mt-1 inline-block">
                    {discountPercent}% OFF discount badge will be displayed
                  </span>
                )}
              </div>
            </div>

            {/* Badges and Stock Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <label className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={e => setInStock(e.target.checked)}
                  className="w-4 h-4 rounded text-[#f372ac] focus:ring-[#f372ac]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">In Stock</p>
                  <p className="text-[11px] text-gray-400">Ready for instant ordering</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={e => setOnSale(e.target.checked)}
                  className="w-4 h-4 rounded text-[#f372ac] focus:ring-[#f372ac]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">On Sale Flag</p>
                  <p className="text-[11px] text-gray-400">Highlights with "Sale" badge</p>
                </div>
              </label>
            </div>
          </div>

          {/* SECTION 4: SPECIFICATIONS */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3">
              <Layers className="w-5 h-5 text-[#f372ac]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Specifications &amp; Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Fabric
                </label>
                <input
                  type="text"
                  value={fabric}
                  onChange={e => setFabric(e.target.value)}
                  placeholder="e.g. Pure Kanjivaram Soft Silk"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Work / Pattern
                </label>
                <input
                  type="text"
                  value={work}
                  onChange={e => setWork(e.target.value)}
                  placeholder="e.g. Hand Bandhej with Zari Weave"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Blouse Piece
                </label>
                <input
                  type="text"
                  value={blouse}
                  onChange={e => setBlouse(e.target.value)}
                  placeholder="e.g. Contrast Silk Blouse (0.8m) included"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Dispatch Info
                </label>
                <input
                  type="text"
                  value={dispatchInfo}
                  onChange={e => setDispatchInfo(e.target.value)}
                  placeholder="e.g. Dispatched within 24-48 hours"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Live Product Card Preview & Publishing Summary */}
        <div className="space-y-6">
          {/* Live Storefront Preview Card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs">
            <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
              <Eye className="w-4 h-4 text-[#f372ac]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Live Storefront Card Preview
              </h3>
            </div>

            {/* Jo Collections Style Product Card */}
            <div className="max-w-[280px] mx-auto bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon className="w-12 h-12 mb-1" />
                    <span className="text-xs">No image uploaded</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {onSale && (
                    <span className="bg-[#f372ac] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Sale
                    </span>
                  )}
                  {discountPercent !== null && (
                    <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                {!inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                    Sold Out
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-3 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  {categories.slice(0, 2).join(', ')}
                </p>
                <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-1 min-h-[32px]">
                  {name || 'Product Title will appear here'}
                </h4>

                <div className="mt-2 flex items-center justify-center space-x-2">
                  <span className="text-sm font-black text-gray-900">
                    ₹{price ? Number(price).toLocaleString('en-IN') : '0'}.00
                  </span>
                  {originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{Number(originalPrice).toLocaleString('en-IN')}.00
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Checklist Box */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Publishing Checklist
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2">
                <span className={image ? 'text-emerald-400' : 'text-slate-500'}>
                  {image ? '✓' : '○'}
                </span>
                <span className={image ? 'text-slate-200' : 'text-slate-400'}>
                  Product image uploaded
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={name ? 'text-emerald-400' : 'text-slate-500'}>
                  {name ? '✓' : '○'}
                </span>
                <span className={name ? 'text-slate-200' : 'text-slate-400'}>
                  Product title defined
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className={price ? 'text-emerald-400' : 'text-slate-500'}>
                  {price ? '✓' : '○'}
                </span>
                <span className={price ? 'text-slate-200' : 'text-slate-400'}>
                  Selling price configured
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">✓</span>
                <span className="text-slate-200">
                  Instant synchronization with live storefront
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#f372ac] hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isEditing ? 'Save Changes' : 'Publish Product Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
