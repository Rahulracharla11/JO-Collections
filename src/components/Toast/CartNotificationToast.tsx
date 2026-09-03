import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartNotificationToast: React.FC = () => {
  const { toastMessage, setToastMessage, setIsCartOpen } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full bg-[#222222] text-white p-4 shadow-2xl rounded-xs flex items-center justify-between border-l-4 border-[#f372ac] animate-slide-down">
      <div className="flex items-center space-x-3 pr-2">
        <CheckCircle2 className="w-5 h-5 text-[#f372ac] flex-shrink-0" />
        <div className="text-xs sm:text-sm font-medium leading-tight">
          <p>{toastMessage}</p>
          <button
            onClick={() => {
              setIsCartOpen(true);
              setToastMessage(null);
            }}
            className="text-[#f372ac] hover:underline text-xs font-semibold mt-1 inline-block"
          >
            View cart &rarr;
          </button>
        </div>
      </div>

      <button
        onClick={() => setToastMessage(null)}
        className="text-gray-400 hover:text-white p-1 rounded transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
