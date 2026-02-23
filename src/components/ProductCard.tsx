import React from 'react';
import { Star, Zap, ShieldCheck, Truck, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  isDeal?: boolean;
  discount?: string;
  stockLeft?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  isDeal,
  discount,
  stockLeft,
}) => {
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  return (
    <div className="card-deal group cursor-pointer flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Enhanced Urgency Badge */}
        {isDeal && (
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <div className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-sm flex items-center gap-1 shadow-lg animate-pulse">
              <Zap size={10} fill="currentColor" />
              FLASH DEAL
            </div>
            {stockLeft && stockLeft < 10 && (
              <div className="bg-warning text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-md">
                Only {stockLeft} left!
              </div>
            )}
          </div>
        )}

        <button className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-accent transition-colors shadow-sm">
          <Star size={16} />
        </button>

        {/* Quick Trust Overlay on Hover */}
        <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-around border-t border-slate-100">
          <div className="flex flex-col items-center gap-0.5 text-success">
            <ShieldCheck size={12} />
            <span className="text-[8px] font-bold uppercase">Genuine</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-primary">
            <Truck size={12} />
            <span className="text-[8px] font-bold uppercase">Free Del.</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 text-accent">
            <Clock size={12} />
            <span className="text-[8px] font-bold uppercase">7-Day Ret.</span>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center bg-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {rating} <Star size={10} className="ml-0.5" fill="currentColor" />
          </div>
          <span className="text-muted text-[11px] font-medium">{reviews.toLocaleString()} ratings</span>
        </div>

        {/* Redesigned Price Typography */}
        <div className="mt-3 flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">₹{price.toLocaleString()}</span>
            <span className="text-xs font-bold text-success bg-success/10 px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted line-through font-medium">MRP ₹{originalPrice.toLocaleString()}</span>
          </div>
        </div>

        {discount && (
          <div className="mt-2 text-[10px] font-bold text-primary-light bg-primary/5 px-2 py-1 rounded border border-primary/10 inline-block w-fit">
            Save ₹{discount} with Bank Offer
          </div>
        )}
        
        {/* Delivery Urgency */}
        <div className="mt-auto pt-3 flex items-center gap-1 text-[10px] font-bold text-success">
          <Truck size={12} />
          <span>Delivery by Tomorrow, 11 AM</span>
        </div>
      </div>
    </div>
  );
};
