
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Novyxa Pro Smartphone 5G (12GB RAM, 256GB Storage)',
    brand: 'Novyxa',
    category: 'Electronics',
    price: 49999,
    originalPrice: 59999,
    rating: 4.6,
    reviewsCount: 1240,
    images: ['https://picsum.photos/id/1/600/600', 'https://picsum.photos/id/2/600/600'],
    description: 'The ultimate performance beast with Liquid Retina Display and 5G connectivity.',
    highlights: ['Snapdragon 8 Gen 3', '50MP Triple Camera', '120Hz AMOLED'],
    specs: { 'Model': 'N-Pro 1', 'Processor': 'Snapdragon 8 Gen 3', 'Battery': '5000mAh' },
    seller: 'Novyxa Official Retail',
    deliveryDate: 'Tomorrow, by 10 PM'
  },
  {
    id: '2',
    name: 'Premium Leather Formal Shoes',
    brand: 'HeelUp',
    category: 'Fashion',
    price: 2499,
    originalPrice: 4999,
    rating: 4.2,
    reviewsCount: 850,
    images: ['https://picsum.photos/id/21/600/600'],
    description: 'Handcrafted premium leather shoes for the perfect professional look.',
    highlights: ['Genuine Leather', 'Cushioned Insole', 'Durable Sole'],
    specs: { 'Material': 'Leather', 'Occasion': 'Formal', 'Sole': 'Rubber' },
    seller: 'FashionHub Solutions',
    deliveryDate: 'Expected by Saturday'
  },
  {
    id: '3',
    name: 'Organic Almonds (1kg Pack)',
    brand: 'NutriPlus',
    category: 'Grocery',
    price: 899,
    originalPrice: 1200,
    rating: 4.8,
    reviewsCount: 4320,
    images: ['https://picsum.photos/id/42/600/600'],
    description: 'Premium quality organic almonds sourced directly from farms.',
    highlights: ['High Protein', 'Gluten-Free', 'Freshly Packed'],
    specs: { 'Weight': '1kg', 'Type': 'Almonds', 'Shelf Life': '6 Months' },
    seller: 'Organic Mart',
    deliveryDate: '2 Days Delivery'
  },
  {
    id: '4',
    name: 'Ultra Slim Smart LED TV (55 inch)',
    brand: 'Visionary',
    category: 'Electronics',
    price: 35999,
    originalPrice: 55000,
    rating: 4.4,
    reviewsCount: 2100,
    images: ['https://picsum.photos/id/3/600/600'],
    description: 'Immersive 4K visual experience with built-in voice assistant.',
    highlights: ['4K UHD', 'Dolby Atmos', 'Android TV'],
    specs: { 'Resolution': '4K UHD', 'Refresh Rate': '60Hz', 'HDMI': '3 Ports' },
    seller: 'Visionary Tech',
    deliveryDate: 'Next Day'
  },
  {
    id: '5',
    name: 'Classic White Cotton Tee',
    brand: 'Novyxa',
    category: 'Fashion',
    price: 599,
    originalPrice: 999,
    rating: 4.0,
    reviewsCount: 500,
    images: ['https://picsum.photos/id/5/600/600'],
    description: '100% Cotton soft fabric for everyday comfort.',
    highlights: ['Breathable', 'Pre-shrunk', 'Regular Fit'],
    specs: { 'Fabric': 'Cotton', 'Fit': 'Regular', 'Sleeve': 'Half' },
    seller: 'Apparel Kings',
    deliveryDate: '3-4 Days'
  }
];

export const CATEGORIES = ['Electronics', 'Fashion', 'Grocery', 'Home', 'Appliances'];
