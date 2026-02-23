import React from 'react';
import { Search, ShoppingCart, User, MapPin, Menu, Heart } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white shadow-md">
      {/* Top Bar - Location & Links */}
      <div className="hidden md:flex bg-black/10 border-b border-white/5 py-1.5">
        <div className="container-custom flex justify-between items-center text-[10px] font-bold uppercase tracking-wider opacity-80">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-accent transition-colors">
              <MapPin size={12} className="text-accent" />
              <span>Deliver to: Mumbai 400001</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent">Sell on Novyxa</a>
            <a href="#" className="hover:text-accent">Customer Care</a>
            <a href="#" className="hover:text-accent">Download App</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-2.5 md:py-3">
        <div className="container-custom flex items-center gap-4 md:gap-10">
          {/* Mobile Menu */}
          <button className="md:hidden p-1 hover:bg-white/10 rounded-lg transition-colors">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-display font-black tracking-tighter text-white">
              NOVY<span className="text-accent">XA</span>
            </h1>
          </div>

          {/* Search Bar - Hero of the header */}
          <div className="flex-grow max-w-3xl relative group">
            <input
              type="text"
              placeholder="Search for Mobiles, Fashion, Electronics..."
              className="w-full bg-white/95 backdrop-blur-sm text-slate-900 pl-4 pr-12 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner text-sm font-medium"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-accent hover:bg-accent-dark text-white px-3.5 rounded-md transition-colors shadow-sm">
              <Search size={18} />
            </button>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-8">
            <button className="flex flex-col items-center gap-0.5 hover:text-accent transition-colors group">
              <User size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Login</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 hover:text-accent transition-colors group">
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Wishlist</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 hover:text-accent transition-colors relative group">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1.5 -right-2 bg-accent text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-sm">3</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">Cart</span>
            </button>
          </div>
          
          {/* Mobile Cart */}
          <button className="md:hidden relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
          </button>
        </div>
      </div>
    </header>
  );
};
