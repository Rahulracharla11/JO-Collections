import React from 'react';
import { useShop } from '../../context/ShopContext';

export const SummerSaleSection: React.FC = () => {
  const { setActiveCategory } = useShop();

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#fcf8f9] py-14 sm:py-20 my-10 overflow-hidden relative border-y border-[#f7e6ec]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4">
          {/* Left Rotated Image */}
          <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
            <div className="w-[280px] h-[340px] rounded-sm shadow-xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white bg-white">
              <img
                src="https://jocollections.com/wp-content/uploads/2024/01/Cotton1.jpg"
                alt="Kalamkari Sarees Online"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="lg:col-span-6 text-center px-4 flex flex-col items-center">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#f372ac] mb-2">
              Huge Sale
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222] tracking-tight leading-tight mb-6">
              Summer 2024<br />Collection
            </h2>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
              <button
                onClick={() => handleCategoryClick('cat-sarees')}
                className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                Sarees
              </button>
              <button
                onClick={() => handleCategoryClick('Kurtis')}
                className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                Kurthis
              </button>
              <button
                onClick={() => handleCategoryClick('dress-materials')}
                className="bg-[#222222] hover:bg-[#f372ac] text-white px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors shadow-sm"
              >
                Dress Materials
              </button>
            </div>
          </div>

          {/* Right Rotated Image */}
          <div className="flex lg:col-span-3 justify-center items-center">
            <div className="w-[240px] sm:w-[280px] h-[300px] sm:h-[340px] rounded-sm shadow-xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white bg-white">
              <img
                src="https://jocollections.com/wp-content/uploads/2024/01/kurthi5.jpg"
                alt="Trendy Ethnic Kurtis"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
