
export type Category = 'Electronics' | 'Fashion' | 'Grocery' | 'Home' | 'Appliances';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  seller: string;
  deliveryDate: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
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

export type View = 'HOME' | 'PDP' | 'CART' | 'CHECKOUT' | 'ORDERS' | 'ARCHITECT';
