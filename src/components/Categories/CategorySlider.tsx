import React from 'react';
import { CATEGORIES } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const CategorySlider: React.FC = () => {
  const { setActiveCategory } = useShop();

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6 sm:py-8 border-b border-[#f0f0f0]">
      <div className="flex items-center justify-between overflow-x-auto pb-4 pt-2 scrollbar-none gap-4 sm:gap-6 md:gap-8">
        {CATEGORIES.map(category => (
          <div
            key={category.id}
            onClick={() => {
              setActiveCategory(category.slug);
              const element = document.getElementById('products');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 flex flex-col items-center group cursor-pointer w-[90px] sm:w-[110px] md:w-[130px]"
          >
            {/* Circular Thumbnail */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-1 border-2 border-transparent group-hover:border-[#f372ac] transition-all duration-300 shadow-xs">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </div>

            {/* Category Title */}
            <h3 className="mt-3 text-xs sm:text-sm font-semibold text-[#222] text-center group-hover:text-[#f372ac] transition-colors tracking-tight">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
