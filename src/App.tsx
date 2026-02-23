import React from 'react';
import { Header } from './components/Header';
import { CategoryRail } from './components/CategoryRail';
import { ProductCard } from './components/ProductCard';
import { ChevronRight, Zap, ShieldCheck, Truck, RotateCcw, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const deals = [
  {
    id: '1',
    title: 'Novyxa Pro Max 5G (12GB RAM, 256GB Storage) - Midnight Teal',
    price: 49999,
    originalPrice: 64999,
    rating: 4.8,
    reviews: 12450,
    image: 'https://picsum.photos/seed/phone1/400/500',
    isDeal: true,
    discount: '2000',
    stockLeft: 4
  },
  {
    id: '2',
    title: 'Ultra-Comfort Ergonomic Mesh Office Chair - Slate Grey',
    price: 8499,
    originalPrice: 15999,
    rating: 4.5,
    reviews: 3200,
    image: 'https://picsum.photos/seed/chair/400/500',
    isDeal: true,
    stockLeft: 8
  },
  {
    id: '3',
    title: 'Premium Noise Cancelling Wireless Headphones v2',
    price: 12999,
    originalPrice: 19999,
    rating: 4.7,
    reviews: 8900,
    image: 'https://picsum.photos/seed/audio/400/500',
    isDeal: false,
    discount: '500'
  },
  {
    id: '4',
    title: 'Smart Fitness Tracker with Blood Oxygen Monitor',
    price: 2499,
    originalPrice: 5999,
    rating: 4.2,
    reviews: 15600,
    image: 'https://picsum.photos/seed/watch/400/500',
    isDeal: true,
    stockLeft: 2
  },
  {
    id: '5',
    title: 'Cotton Blend Slim Fit Casual Shirt for Men',
    price: 799,
    originalPrice: 2499,
    rating: 4.0,
    reviews: 4500,
    image: 'https://picsum.photos/seed/shirt/400/500',
    isDeal: false
  },
  {
    id: '6',
    title: 'Compact 1000W High-Speed Mixer Grinder',
    price: 3299,
    originalPrice: 6999,
    rating: 4.4,
    reviews: 2100,
    image: 'https://picsum.photos/seed/mixer/400/500',
    isDeal: true,
    stockLeft: 15
  }
];

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <CategoryRail />

      <main className="flex-grow pb-12">
        {/* Decision-making CTA Strip */}
        <div className="bg-slate-50 border-b border-slate-100">
          <div className="container-custom py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6 min-w-max">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:border-accent transition-colors group">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-accent">Top Deals Near You</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:border-accent transition-colors group">
                <span className="text-xs font-bold text-slate-700 group-hover:text-accent">Under ₹999 Steals</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:border-accent transition-colors group">
                <Truck size={14} className="text-primary" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-accent">Fast Delivery Picks</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm hover:border-accent transition-colors group">
                <ShieldCheck size={14} className="text-success" />
                <span className="text-xs font-bold text-slate-700 group-hover:text-accent">Novyxa Assured</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="container-custom py-6">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] md:aspect-[25/7] shadow-xl">
            <img
              src="https://picsum.photos/seed/banner/1920/600"
              alt="Hero Banner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                    Grand Launch Sale
                  </span>
                  <div className="flex items-center gap-1 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={12} />
                    <span>Ends in 04:23:12</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight max-w-lg">
                  Upgrade Your Lifestyle with <span className="text-accent">Novyxa</span>
                </h2>
                <p className="text-sm md:text-lg opacity-90 mb-8 max-w-md hidden md:block font-medium">
                  Curated premium products with unbeatable deals. Fast delivery & easy returns.
                </p>
                <button className="btn-primary w-fit shadow-lg shadow-accent/20">
                  Shop Now <ChevronRight size={18} />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Flash Deals Section - Using a subtle background to separate from Hero */}
        <section className="container-custom mb-12 py-8 bg-slate-50/50 rounded-3xl border border-slate-100">
          <div className="px-4">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Zap size={20} fill="currentColor" className="animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-widest">Ending Soon</span>
                </div>
                <h2 className="text-2xl md:text-3xl">Deals of the Day</h2>
              </div>
              <button className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                View All <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {deals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collection */}
        <section className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] group cursor-pointer shadow-md">
              <img
                src="https://picsum.photos/seed/fashion-hero/800/450"
                alt="Fashion"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">The Summer Edit</h3>
                <p className="text-sm opacity-90 mb-4">Up to 60% Off on Top Brands</p>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm w-fit hover:bg-accent hover:text-white transition-colors">
                  Explore Now
                </button>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/9] group cursor-pointer shadow-md">
              <img
                src="https://picsum.photos/seed/tech-hero/800/450"
                alt="Tech"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Next-Gen Tech</h3>
                <p className="text-sm opacity-90 mb-4">Latest Gadgets at Best Prices</p>
                <button className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm w-fit hover:bg-accent hover:text-white transition-colors">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-16 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h1 className="text-2xl font-display font-bold tracking-tighter mb-6">
                NOVY<span className="text-accent">XA</span>
              </h1>
              <p className="text-sm text-white/60 leading-relaxed">
                Redefining e-commerce for the modern Indian consumer. Quality, Speed, and Trust.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Shop</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Mobiles</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home & Kitchen</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Support</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Company</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© 2026 Novyxa Retail Pvt. Ltd. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
