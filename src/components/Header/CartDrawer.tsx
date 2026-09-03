import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, cartCount } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-right">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-[#222]">
              Your cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#666] hover:text-[#222] p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#222]">Shopping Cart is empty</h3>
                <p className="text-sm text-[#666] max-w-xs">
                  You have no items in your shopping cart. Browse our stunning ethnic collection to add items.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#222] hover:bg-[#f372ac] text-white px-6 py-2.5 text-sm font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-[#eee]">
                {cart.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 flex space-x-4 group">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-24 object-cover object-top border border-[#eee] flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-[13px] font-medium text-[#222] line-clamp-2 pr-2 hover:text-[#f372ac] transition-colors">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[#999] hover:text-[#cf2e2e] transition-colors p-1"
                            title="Remove this item"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[14px] font-semibold text-[#222] mt-1">
                          ₹{product.price.toLocaleString('en-IN')}.00
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 mt-3">
                        <div className="flex items-center border border-[#ddd]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="px-2.5 py-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-xs font-semibold text-center min-w-[32px]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="px-2.5 py-1 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[12px] text-[#888]">
                          Total: ₹{(product.price * quantity).toLocaleString('en-IN')}.00
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e5e5e5] bg-[#fafafa] space-y-3">
              <div className="flex justify-between items-center text-base">
                <span className="font-medium text-[#666]">Subtotal :</span>
                <span className="text-[18px] font-bold text-[#222]">
                  ₹{subtotal.toLocaleString('en-IN')}.00
                </span>
              </div>
              <p className="text-[12px] text-[#888]">Taxes and shipping calculated at checkout</p>

              <button
                onClick={() => alert(`Proceeding to checkout with total: ₹${subtotal.toLocaleString('en-IN')}.00`)}
                className="w-full bg-[#222] hover:bg-[#f372ac] text-white py-3 text-[14px] font-semibold tracking-wider transition-colors text-center block"
              >
                Checkout
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#666] hover:text-[#f372ac] underline font-medium"
                >
                  View my cart
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[#666] hover:text-[#f372ac] underline font-medium"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
