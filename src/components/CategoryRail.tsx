import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const categories = [
  { name: 'Mobiles', icon: 'https://picsum.photos/seed/mobile/100/100' },
  { name: 'Fashion', icon: 'https://picsum.photos/seed/fashion/100/100' },
  { name: 'Electronics', icon: 'https://picsum.photos/seed/electronics/100/100' },
  { name: 'Home', icon: 'https://picsum.photos/seed/home/100/100' },
  { name: 'Appliances', icon: 'https://picsum.photos/seed/appliances/100/100' },
  { name: 'Beauty', icon: 'https://picsum.photos/seed/beauty/100/100' },
  { name: 'Grocery', icon: 'https://picsum.photos/seed/grocery/100/100' },
  { name: 'Toys', icon: 'https://picsum.photos/seed/toys/100/100' },
  { name: 'Furniture', icon: 'https://picsum.photos/seed/furniture/100/100' },
  { name: 'Sports', icon: 'https://picsum.photos/seed/sports/100/100' },
];

export const CategoryRail = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="bg-white border-b border-slate-100 shadow-sm overflow-x-auto no-scrollbar sticky top-[64px] md:top-[104px] z-40">
      <div className="container-custom py-3 md:py-4 flex justify-between items-center gap-4 min-w-max md:min-w-0">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            onClick={() => setActiveCategory(cat.name)}
            className="flex flex-col items-center gap-1.5 cursor-pointer group px-2 relative"
          >
            <div className={cn(
              "w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden transition-all duration-300 p-1 border-2",
              activeCategory === cat.name 
                ? "border-accent bg-accent/5 shadow-md scale-105" 
                : "border-transparent bg-slate-50 group-hover:border-primary/20"
            )}>
              <img
                src={cat.icon}
                alt={cat.name}
                className={cn(
                  "w-full h-full object-cover rounded-xl transition-transform duration-500",
                  activeCategory === cat.name ? "scale-110" : "group-hover:scale-110"
                )}
                referrerPolicy="no-referrer"
              />
            </div>
            <span className={cn(
              "text-[10px] md:text-[11px] font-bold transition-colors uppercase tracking-tighter",
              activeCategory === cat.name ? "text-accent" : "text-slate-600 group-hover:text-primary"
            )}>
              {cat.name}
            </span>
            
            {/* Active Indicator Dot */}
            {activeCategory === cat.name && (
              <motion.div 
                layoutId="active-dot"
                className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
