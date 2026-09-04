import React from 'react';
import { Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActiveCategory, setIsCartOpen, navigateToAccount, navigateToAdmin } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="colophon" className="bg-white border-t border-[#eaeaea] text-[#666] pt-12 sm:pt-16 pb-8 text-sm relative">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-[#f0f0f0]">
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-4">
            <div>
              <img
                src="https://jocollections.com/wp-content/uploads/2023/11/logo3.png"
                alt="Jo Collections"
                className="h-14 w-auto object-contain mb-4"
              />
            </div>
            <p className="text-[13px] text-[#555] leading-relaxed">
              Kukatpally,Hyderabad, India
            </p>
            <p className="text-[14px] font-semibold text-[#222]">
              +91-9010385551
            </p>
            <p className="text-[13px] text-[#555]">
              contactjocollections@gmail.com
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/jocollections2015/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#444] hover:text-white hover:bg-[#f372ac] hover:border-[#f372ac] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC5CJqnjYaJWzc6z-2HYbTAA"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#444] hover:text-white hover:bg-[#f372ac] hover:border-[#f372ac] transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/Jocollections2015/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#444] hover:text-white hover:bg-[#f372ac] hover:border-[#f372ac] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Informations */}
          <div>
            <h6 className="text-[15px] font-bold text-[#222] mb-4 uppercase tracking-wider">
              Informations
            </h6>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('cat-sarees');
                    scrollToTop();
                  }}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('dress-materials');
                    scrollToTop();
                  }}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Dress Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Jewellery');
                    scrollToTop();
                  }}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Jewellery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('Kurtis');
                    scrollToTop();
                  }}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Kurtis
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('sale');
                    scrollToTop();
                  }}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h6 className="text-[15px] font-bold text-[#222] mb-4 uppercase tracking-wider">
              Links
            </h6>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="#track-order" className="hover:text-[#f372ac] transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#f372ac] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#f372ac] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#f372ac] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#f372ac] transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#f372ac] transition-colors">
                  Terms &amp; Condition
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#f372ac] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Account */}
          <div>
            <h6 className="text-[15px] font-bold text-[#222] mb-4 uppercase tracking-wider">
              Account
            </h6>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hover:text-[#f372ac] transition-colors"
                >
                  Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToAccount('dashboard')}
                  className="hover:text-[#f372ac] transition-colors text-left"
                >
                  My account
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToAccount('orders')}
                  className="hover:text-[#f372ac] transition-colors text-left"
                >
                  My orders
                </button>
              </li>
              <li>
                <a href="#wishlist" className="hover:text-[#f372ac] transition-colors">
                  Wishlist
                </a>
              </li>
              <li className="pt-1.5 border-t border-gray-100">
                <button
                  onClick={() => navigateToAdmin()}
                  className="hover:text-[#f372ac] transition-colors text-left flex items-center space-x-1 font-semibold text-[#222]"
                >
                  <span>Admin Portal</span>
                  <span className="text-[10px] bg-[#f372ac]/15 text-[#f372ac] px-1.5 py-0.2 rounded font-mono">
                    /admin
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888] gap-3">
          <p>Copyright © 2024 . All Rights Reserved By Jo Collections</p>
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://megaviztech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f372ac] font-bold hover:underline"
            >
              MegaViz Technologies
            </a>
          </p>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-10 h-10 bg-[#222] hover:bg-[#f372ac] text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        title="Back to Top"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};
