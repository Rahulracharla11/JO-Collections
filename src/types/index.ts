export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  categories: string[];
  imageUrl: string;
  secondaryImageUrl?: string;
  sku: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isOnSale?: boolean;
  isNew?: boolean;
  discountPercent?: number;
  description?: string;
  details?: {
    fabric?: string;
    work?: string;
    blouse?: string;
    deliveryTime?: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  count?: number;
}
