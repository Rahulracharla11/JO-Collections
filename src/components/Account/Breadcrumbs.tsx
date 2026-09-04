import React from 'react';
import { useShop } from '../../context/ShopContext';

export const Breadcrumbs: React.FC = () => {
  const { navigateToHome } = useShop();

  return (
    <div className="pt-6 pb-4">
      {/* Breadcrumb row */}
      <nav className="text-[13px] text-[#777] mb-4 flex items-center space-x-2">
        <button
          onClick={navigateToHome}
          className="hover:text-[#f372ac] transition-colors cursor-pointer"
        >
          Home
        </button>
        <span className="text-[#aaa]">&gt;</span>
        <span className="text-[#222] font-normal">My Account</span>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#222] tracking-tight mb-8">
        My Account
      </h1>
    </div>
  );
};
