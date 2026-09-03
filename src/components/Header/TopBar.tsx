import React from 'react';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-[#eaeaea] text-[13px] text-[#666666] hidden md:block">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-10 h-10 flex items-center justify-between">
        {/* Left: Social Icons */}
        <div className="flex items-center space-x-5">
          <a
            href="https://www.instagram.com/jocollections2015/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 hover:text-[#f372ac] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium">Instagram</span>
          </a>
          <a
            href="https://www.youtube.com/channel/UC5CJqnjYaJWzc6z-2HYbTAA"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 hover:text-[#f372ac] transition-colors"
          >
            <Youtube className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium">Youtube</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1.5 hover:text-[#f372ac] transition-colors"
          >
            <Twitter className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium">Twitter</span>
          </a>
          <a
            href="https://www.facebook.com/Jocollections2015/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 hover:text-[#f372ac] transition-colors"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span className="text-[12px] font-medium">Facebook</span>
          </a>
        </div>

        {/* Right: Secondary Navigation */}
        <nav className="flex items-center space-x-6 text-[13px] font-normal">
          <a href="#about" className="hover:text-[#f372ac] transition-colors">
            About
          </a>
          <a href="#blog" className="hover:text-[#f372ac] transition-colors">
            Blog
          </a>
          <a href="#help" className="hover:text-[#f372ac] transition-colors">
            Help
          </a>
          <a href="#contact" className="hover:text-[#f372ac] transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
};
