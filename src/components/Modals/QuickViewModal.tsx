import React, { useState } from 'react';
import { X, Heart, Minus, Plus, ShoppingBag, Star, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!quickViewProduct) return null;

  const currentImage = activeImage || quickViewProduct.imageUrl;
  const wishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white shadow-2xl p-6 sm:p-8 animate-fade-in z-10">
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-[3/4] w-full overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src={currentImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.secondaryImageUrl && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveImage(quickViewProduct.imageUrl)}
                    className={`w-14 h-18 border-2 overflow-hidden ${
                      currentImage === quickViewProduct.imageUrl ? 'border-[#f372ac]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={quickViewProduct.imageUrl}
                      alt="Primary"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <button
                    onClick={() => setActiveImage(quickViewProduct.secondaryImageUrl!)}
                    className={`w-14 h-18 border-2 overflow-hidden ${
                      currentImage === quickViewProduct.secondaryImageUrl ? 'border-[#f372ac]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={quickViewProduct.secondaryImageUrl}
                      alt="Secondary"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#f372ac] font-bold uppercase tracking-wider">
                  {quickViewProduct.categories.join(', ')}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#222] mt-1 mb-2 leading-snug">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3 text-xs text-gray-500">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(quickViewProduct.rating || 4.5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>({quickViewProduct.reviewCount} customer reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-3 mb-4 pb-4 border-b border-gray-100">
                  <span className="text-2xl font-bold text-[#222]">
                    ₹{quickViewProduct.price.toLocaleString('en-IN')}.00
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}.00
                    </span>
                  )}
                  {quickViewProduct.discountPercent && (
                    <span className="text-xs font-bold text-[#cf2e2e] bg-red-50 px-2 py-0.5 rounded">
                      Save {quickViewProduct.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description & specs */}
                <p className="text-xs sm:text-sm text-[#666] leading-relaxed mb-4">
                  {quickViewProduct.description}
                </p>

                {quickViewProduct.details && (
                  <div className="bg-[#fafafa] p-3 rounded-xs text-xs space-y-1 text-[#555] mb-6">
                    {quickViewProduct.details.fabric && (
                      <div><strong>Fabric:</strong> {quickViewProduct.details.fabric}</div>
                    )}
                    {quickViewProduct.details.work && (
                      <div><strong>Work:</strong> {quickViewProduct.details.work}</div>
                    )}
                    {quickViewProduct.details.deliveryTime && (
                      <div><strong>Shipping:</strong> {quickViewProduct.details.deliveryTime}</div>
                    )}
                    <div><strong>SKU:</strong> {quickViewProduct.sku}</div>
                  </div>
                )}
              </div>

              {/* Action Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#ccc]">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#222222] hover:bg-[#f372ac] text-white py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to cart</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(quickViewProduct)}
                    className={`p-3 border rounded-none transition-colors ${
                      wishlisted
                        ? 'border-[#f372ac] bg-[#f372ac] text-white'
                        : 'border-[#ccc] hover:border-[#f372ac] text-gray-700 hover:text-[#f372ac]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-xs text-green-700 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In stock and ready to ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
