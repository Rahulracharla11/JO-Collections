import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { TopBar } from './components/Header/TopBar';
import { Navbar } from './components/Header/Navbar';
import { MobileMenuDrawer } from './components/Header/MobileMenuDrawer';
import { SearchModal } from './components/Header/SearchModal';
import { CartDrawer } from './components/Header/CartDrawer';
import { HeroSlider } from './components/Hero/HeroSlider';
import { TwoColumnBanners } from './components/Banners/TwoColumnBanners';
import { CategorySlider } from './components/Categories/CategorySlider';
import { ProductCarousel } from './components/Products/ProductCarousel';
import { SummerSaleSection } from './components/Promo/SummerSaleSection';
import { WeddingClothingBanner } from './components/Promo/WeddingClothingBanner';
import { SeoAccordion } from './components/Content/SeoAccordion';
import { TrustBadges } from './components/Trust/TrustBadges';
import { Footer } from './components/Footer/Footer';
import { QuickViewModal } from './components/Modals/QuickViewModal';
import { CartNotificationToast } from './components/Toast/CartNotificationToast';

export function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#222222]">
        {/* Top Header Social & Links */}
        <TopBar />

        {/* Main Sticky Navbar with Mega Menus */}
        <Navbar />

        {/* Floating Modals & Drawers */}
        <MobileMenuDrawer />
        <SearchModal />
        <CartDrawer />
        <QuickViewModal />
        <CartNotificationToast />

        {/* Main Page Content */}
        <main className="flex-1">
          {/* Revolution-style Hero Carousel */}
          <HeroSlider />

          {/* Two-Column Featured Category Banners */}
          <TwoColumnBanners />

          {/* 7-Column Circular Category Slider */}
          <CategorySlider />

          {/* Dynamic 5-Column Products Catalog with Filters */}
          <ProductCarousel />

          {/* Summer 2024 Showcase with Rotated Floating Images */}
          <SummerSaleSection />

          {/* Wedding Clothing Collection Showcase */}
          <WeddingClothingBanner />

          {/* Brand Philosophy & Saree Guides SEO Accordion */}
          <SeoAccordion />

          {/* Trust Value Badges */}
          <TrustBadges />
        </main>

        {/* Authentic Jo Collections Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
}

export default App;
