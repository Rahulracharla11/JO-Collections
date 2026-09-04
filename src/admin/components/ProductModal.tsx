import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { Product } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  productToEdit?: Product | null;
}

const CATEGORY_OPTIONS = [
  'Sarees',
  'cat-sarees',
  'Jewellery',
  'Black Beads',
  'Dress Materials',
  'Kurtis',
  'Kalamkari',
  'Banarasi Sarees',
  'Crepe Sarees',
  'Cotton Sarees',
  'Silk Sarees'
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit
}) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState<number>(1499);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(1999);
  const [selectedCategory, setSelectedCategory] = useState('Sarees');
  const [inStock, setInStock] = useState(true);
  const [isOnSale, setIsOnSale] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [secondaryImageUrl, setSecondaryImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [work, setWork] = useState('');
  const [blouse, setBlouse] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('8 days to ship');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setSku(productToEdit.sku);
      setPrice(productToEdit.price);
      setOriginalPrice(productToEdit.originalPrice);
      setSelectedCategory(productToEdit.categories[0] || 'Sarees');
      setInStock(productToEdit.inStock);
      setIsOnSale(!!productToEdit.isOnSale);
      setImageUrl(productToEdit.imageUrl);
      setSecondaryImageUrl(productToEdit.secondaryImageUrl || '');
      setDescription(productToEdit.description || '');
      setFabric(productToEdit.details?.fabric || '');
      setWork(productToEdit.details?.work || '');
      setBlouse(productToEdit.details?.blouse || '');
      setDeliveryTime(productToEdit.details?.deliveryTime || '8 days to ship');
    } else {
      // Default placeholder for new product
      setName('');
      setSku(`JC${Math.floor(100 + Math.random() * 900)}A`);
      setPrice(1499);
      setOriginalPrice(1999);
      setSelectedCategory('Sarees');
      setInStock(true);
      setIsOnSale(true);
      setImageUrl('https://jocollections.com/wp-content/uploads/2026/07/IMG-20260718-WA0588-600x799.jpg');
      setSecondaryImageUrl('');
      setDescription('Exquisite ethnic wear handcrafted with utmost precision and royal elegance.');
      setFabric('Viscose Crepe Silk');
      setWork('Zari Border & Hand Embroidery');
      setBlouse('Matching blouse piece included');
      setDeliveryTime('8 days to ship');
    }
    setError(null);
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }
    if (!sku.trim()) {
      setError('Product SKU is required.');
      return;
    }
    if (!price || price <= 0) {
      setError('Please enter a valid price.');
      return;
    }
    if (!imageUrl.trim()) {
      setError('Product image URL is required.');
      return;
    }

    const discountPercent =
      originalPrice && originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : undefined;

    const payload = {
      ...(productToEdit ? { id: productToEdit.id } : {}),
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: sku.trim(),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercent,
      categories: [selectedCategory, 'Sarees'],
      inStock,
      isOnSale,
      imageUrl: imageUrl.trim(),
      secondaryImageUrl: secondaryImageUrl.trim() || undefined,
      rating: productToEdit ? productToEdit.rating : 5,
      reviewCount: productToEdit ? productToEdit.reviewCount : 1,
      description: description.trim(),
      details: {
        fabric: fabric.trim(),
        work: work.trim(),
        blouse: blouse.trim(),
        deliveryTime: deliveryTime.trim()
      }
    };

    onSave(payload as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in z-10 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {productToEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
              <p className="text-xs text-gray-500">
                Fill in product specifications to publish to Jo Collections
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Product Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. VISCOSE CREPE SILK Saree with zari border..."
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
              />
            </div>

            {/* Row 1: SKU & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  SKU Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={sku}
                  onChange={e => setSku(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac] bg-white"
                >
                  {CATEGORY_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Price, Original Price, Stock, Sale */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  MRP Price (₹)
                </label>
                <input
                  type="number"
                  value={originalPrice || ''}
                  onChange={e => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div className="flex flex-col justify-end pb-1.5">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={e => setInStock(e.target.checked)}
                    className="rounded text-[#f372ac] focus:ring-0"
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="flex flex-col justify-end pb-1.5">
                <label className="flex items-center space-x-2 text-xs font-medium text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOnSale}
                    onChange={e => setIsOnSale(e.target.checked)}
                    className="rounded text-[#f372ac] focus:ring-0"
                  />
                  <span>Badge On Sale</span>
                </label>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Primary Image URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Secondary Image URL (Hover)
                </label>
                <input
                  type="url"
                  value={secondaryImageUrl}
                  onChange={e => setSecondaryImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#f372ac]"
                />
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-16 h-20 object-cover rounded border"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="text-xs text-gray-500">
                  <p className="font-semibold text-gray-800">Image Preview</p>
                  <p className="truncate max-w-md">{imageUrl}</p>
                </div>
              </div>
            )}

            {/* Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Fabric
                </label>
                <input
                  type="text"
                  value={fabric}
                  onChange={e => setFabric(e.target.value)}
                  placeholder="e.g. Viscose Crepe Silk"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Work / Embroidery
                </label>
                <input
                  type="text"
                  value={work}
                  onChange={e => setWork(e.target.value)}
                  placeholder="e.g. Zari border with floral motifs"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Blouse Piece
                </label>
                <input
                  type="text"
                  value={blouse}
                  onChange={e => setBlouse(e.target.value)}
                  placeholder="e.g. Running viscose blouse"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Estimated Shipping Time
                </label>
                <input
                  type="text"
                  value={deliveryTime}
                  onChange={e => setDeliveryTime(e.target.value)}
                  placeholder="e.g. 8 days to ship"
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black hover:bg-[#f372ac] text-white px-7 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-1.5 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>{productToEdit ? 'Update Product' : 'Save & Publish'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
