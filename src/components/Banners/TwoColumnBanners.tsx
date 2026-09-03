import React from 'react';
import { useShop } from '../../context/ShopContext';

export const TwoColumnBanners: React.FC = () => {
  const { setActiveCategory } = useShop();

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-10 py-6 sm:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Sarees Banner */}
        <div className="relative group overflow-hidden bg-gray-100 rounded-xs h-[240px] sm:h-[300px] md:h-[335px] cursor-pointer">
          <img
            src="https://jocollections.com/wp-content/uploads/2024/01/saree3.jpg"
            alt="Ethnic Wear for Women"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors" />

          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 drop-shadow-sm">
              Sarees
            </h2>
            <div>
              <a
                href="#products"
                onClick={() => setActiveCategory('cat-sarees')}
                className="inline-block bg-white text-black hover:bg-[#f372ac] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md"
              >
                Shop now
              </a>
            </div>
          </div>
        </div>

        {/* Jewellery Banner */}
        <div className="relative group overflow-hidden bg-gray-100 rounded-xs h-[240px] sm:h-[300px] md:h-[335px] cursor-pointer">
          <img
            src="https://jocollections.com/wp-content/uploads/2024/01/jewellery2.jpg"
            alt="Shop Wedding Attire Online"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors" />

          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 drop-shadow-sm">
              Jewellery
            </h2>
            <div>
              <a
                href="#products"
                onClick={() => setActiveCategory('Jewellery')}
                className="inline-block bg-white text-black hover:bg-[#f372ac] hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md"
              >
                Shop now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
