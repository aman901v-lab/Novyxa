
export type Category = 'Electronics' | 'Fashion' | 'Grocery' | 'Home' | 'Appliances';

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  seller: string;
  deliveryDate: string;
  brand: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  date: string;
  address: string;
  paymentMethod: string;
}

export type View = 'HOME' | 'PDP' | 'CART' | 'CHECKOUT' | 'ORDERS' | 'WISHLIST' | 'SELLER' | 'ADMIN';
