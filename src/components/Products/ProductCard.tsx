import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, setActiveCategory } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  return (
    <div
      className="group relative flex flex-col bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 border border-[#f0f0f0]">
        <img
          src={isHovered && product.secondaryImageUrl ? product.secondaryImageUrl : product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isOnSale && (
            <span className="bg-[#cf2e2e] text-white text-[11px] font-bold px-2 py-0.5 tracking-wider uppercase">
              {product.discountPercent ? `-${product.discountPercent}%` : 'Sale'}
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#222222] text-white text-[11px] font-bold px-2 py-0.5 tracking-wider uppercase">
              New
            </span>
          )}
        </div>

        {/* Floating Action Buttons (Right side on hover) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-10">
          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              wishlisted
                ? 'bg-[#f372ac] text-white'
                : 'bg-white text-gray-700 hover:bg-[#f372ac] hover:text-white'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-[#f372ac] hover:text-white flex items-center justify-center shadow-md transition-colors"
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Slide-Up Add to Cart Button */}
        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full bg-[#222222] hover:bg-[#f372ac] text-white py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>

      {/* Meta Information */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Categories */}
        <div className="text-[11px] text-[#888] uppercase tracking-wider mb-1 truncate">
          <span>Categories: </span>
          <button
            onClick={() => setActiveCategory(product.categories[0])}
            className="hover:text-[#f372ac] transition-colors"
          >
            {product.categories[0]}
          </button>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => setQuickViewProduct(product)}
          className="text-[13px] font-medium text-[#222] hover:text-[#f372ac] line-clamp-2 transition-colors cursor-pointer leading-[1.4] mb-1.5 min-h-[36px]"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-1.5">
          {product.rating > 0 ? (
            <>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 ml-1">
                ({product.reviewCount})
              </span>
            </>
          ) : (
            <span className="text-[11px] text-gray-400">0 Reviews</span>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline space-x-2 mt-auto">
          <span className="text-[15px] font-bold text-[#222]">
            ₹{product.price.toLocaleString('en-IN')}.00
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}.00
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
