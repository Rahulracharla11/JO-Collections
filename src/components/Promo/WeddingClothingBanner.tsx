import React from 'react';
import { useShop } from '../../context/ShopContext';

export const WeddingClothingBanner: React.FC = () => {
  const { setActiveCategory } = useShop();

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-10 py-10 sm:py-16">
      <div className="bg-[#f7f7f7] border border-[#ebebeb] p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center justify-center">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#f372ac] mb-2">
          All for Women!
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#222] tracking-tight leading-snug mb-6">
          Women's wedding clothing
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => handleCategoryClick('cat-sarees')}
            className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            Sarees
          </button>
          <button
            onClick={() => handleCategoryClick('Jewellery')}
            className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            Jewellery
          </button>
          <button
            onClick={() => handleCategoryClick('Kurtis')}
            className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-xs"
          >
            Kurthis
          </button>
        </div>
      </div>
    </section>
  );
};
