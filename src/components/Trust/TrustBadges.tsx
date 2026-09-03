import React from 'react';
import { Percent, Gift, Headphones } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="border-t border-b border-[#eaeaea] bg-white py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Badge 1 */}
          <div className="flex items-center space-x-4 p-4 hover:bg-gray-50/70 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fdf2f6] flex items-center justify-center text-[#f372ac] flex-shrink-0">
              <Percent className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#222]">
                Special discounts for regular customers
              </h4>
              <p className="text-xs sm:text-sm text-[#777] mt-0.5">
                Coupons up to ₹ 500 &amp; member benefits
              </p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center space-x-4 p-4 hover:bg-gray-50/70 transition-colors md:border-l md:border-r border-[#eee]">
            <div className="w-12 h-12 rounded-full bg-[#fdf2f6] flex items-center justify-center text-[#f372ac] flex-shrink-0">
              <Gift className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#222]">
                Free gift wrapping
              </h4>
              <p className="text-xs sm:text-sm text-[#777] mt-0.5">
                With 100 letters custom note
              </p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center space-x-4 p-4 hover:bg-gray-50/70 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#fdf2f6] flex items-center justify-center text-[#f372ac] flex-shrink-0">
              <Headphones className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#222]">
                Expert Customer Service
              </h4>
              <p className="text-xs sm:text-sm text-[#777] mt-0.5">
                8:00 - 20:00, 7 days/week
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
