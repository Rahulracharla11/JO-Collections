# Jo Collections - React.js + TypeScript Replication

An identical replication of [Jo Collections](https://jocollections.com/) built from scratch with **React 18, TypeScript, Vite, and Tailwind CSS**.

## ✨ Features Replicated
- **Top Header Bar**:
  - Social media links (Instagram, YouTube, Twitter, Facebook)
  - Secondary navigation (About, Blog, Help, Contact)
- **Main Sticky Navigation**:
  - Official high-res Jo Collections branding logo
  - Mega Menu dropdowns:
    - **Shop**: Category directory, special filters (Sale, Bestsellers, Top rated), and Community callout
    - **Jewellery**: Women's jewellery categories and 2 promotional banners ("Huge Sale Summer Collection", "Jewelry Collection")
    - **Dress Materials**: Promo banners ("Cotton Dress Materials", "Dress Materials")
    - **Kurtis**: Kalamkari category and banner
    - **Sale**: Direct highlight
  - Interactive Search with overlay modal and popular search pills
  - User Sign In / Sign Up dropdown form
  - Wishlist counter
  - Mini Shopping Cart indicator with item counter badge
- **Hero Carousel (Revolution Slider Style)**:
  - 2 authentic full-width slides with zoom transitions and custom buttons
  - Previous/Next arrows and Hermes bullet pagination
  - Auto-slide timer every 5 seconds
- **Featured Two-Column Banners**:
  - "Sarees" promo banner (`saree3.jpg`) with "Shop now"
  - "Jewellery" promo banner (`jewellery2.jpg`) with "Shop now"
- **Circular Category Carousel**:
  - 7 categories with circular thumbnails and hover effects: Sarees, Jewellery, Dress Materials, Kurtis, Banarasi, Silk Sarees, Sale
- **Dynamic 5-Column Product Grid**:
  - Authentic product catalog with prices in INR (₹), discount badges, rating stars, and image zoom
  - Quick action buttons on each product:
    - Add to Wishlist (with heart toggle)
    - Quick View modal
    - Slide-up Add to Cart button
  - Category filter tabs and on-sale filter checkbox
  - Sorting: Default, Popularity, Rating, Price low-to-high, Price high-to-low
- **Summer 2024 Showcase**:
  - Asymmetric editorial section with rotated floating product images and category buttons
- **All for Women! Wedding Clothing Banner**:
  - Direct links to Sarees, Jewellery, and Kurthis
- **SEO & Brand Story Accordion**:
  - "Welcome To Jo Collections" narrative with expandable "Read More..." accordion
  - In-depth guides for Traditional, Party, Casual, Designer, and Silk sarees
  - Brand difference pillars and newsletter prompt
- **Trust & Value Feature Badges**:
  - Special discounts for regular customers
  - Free gift wrapping with custom note
  - Expert customer service (8:00 - 20:00, 7 days/week)
- **4-Column Footer**:
  - Kukatpally, Hyderabad, India location, phone, email, and social links
  - Informations, Links, and Account columns
  - MegaViz Technologies credit link
  - Floating Back-to-Top button
- **Interactive Modals & Drawers**:
  - Slide-over Shopping Cart drawer with live subtotal and quantity controls
  - Quick View modal with product specs, reviews, and gallery
  - Mobile slide-out navigation menu
  - Floating search modal
  - Toast confirmation notifications

---

## 🚀 How to Run

### Option 1: Double click `start.bat`
Simply double click `start.bat` in the project root folder.

### Option 2: Run via Terminal
```bash
npm run dev
```

Visit the local development server URL (usually `http://localhost:5173`).

---

## 🛠️ Build for Production
```bash
npm run build
```
Creates an optimized static production bundle in `dist/`.
