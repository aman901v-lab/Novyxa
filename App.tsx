
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, ShoppingCart, Star, MapPin, ChevronRight, Plus, Minus, 
  Package, CheckCircle2, Clock, Heart, Menu, ShieldCheck, Truck, 
  Home, User, Database, Settings, ArrowLeft, Filter, Smartphone, CreditCard, Lock,
  ChevronDown, X, LogIn, Store, MoreVertical, Briefcase
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, Order, View } from './types';

// --- Shared Components ---

const DesktopHeader: React.FC<any> = ({ onViewChange, cartCount }) => (
  <header className="hidden lg:block bg-[#2874f0] text-white sticky top-0 z-50 py-2.5 shadow-md">
    <div className="container mx-auto px-4 max-w-7xl flex items-center gap-10">
      {/* Brand */}
      <div className="flex flex-col items-start cursor-pointer group flex-shrink-0" onClick={() => onViewChange('HOME')}>
        <h1 className="text-xl font-black italic tracking-tighter leading-none group-hover:text-yellow-400 transition-colors">Novyxa</h1>
        <span className="text-[10px] italic font-medium text-blue-100 flex items-center gap-0.5">
          Explore <span className="text-yellow-400 font-bold ml-0.5">Plus</span> <Plus size={8} className="text-yellow-400" />
        </span>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          className="w-full py-2.5 px-4 pr-12 rounded-sm text-sm text-gray-800 focus:outline-none shadow-sm"
        />
        <button className="absolute right-0 top-0 bottom-0 px-4 text-[#2874f0]">
          <Search size={20} />
        </button>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-10 font-bold text-sm">
        <button className="bg-white text-[#2874f0] px-10 py-1.5 rounded-sm hover:bg-gray-100 transition-colors shadow-sm font-bold">
          Login
        </button>
        
        <div className="cursor-pointer hover:text-yellow-400 flex items-center gap-1.5 group relative">
          <span>Become a Seller</span>
        </div>

        <div className="cursor-pointer hover:text-yellow-400 flex items-center gap-1.5 group relative" onClick={() => onViewChange('ARCHITECT')}>
           <Database size={18} />
           <span>System</span>
           <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
        </div>

        <button onClick={() => onViewChange('CART')} className="relative flex items-center gap-2 hover:text-yellow-400 transition-colors">
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -left-2 bg-[#ff9f00] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-black border border-[#2874f0]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

const MobileHeader: React.FC<any> = ({ onViewChange, cartCount }) => (
  <header className="lg:hidden bg-[#2874f0] text-white sticky top-0 z-50 py-3 px-4 shadow-md">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <Menu size={24} className="cursor-pointer" />
        <h1 className="text-lg font-black italic tracking-tighter" onClick={() => onViewChange('HOME')}>Novyxa</h1>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => onViewChange('ARCHITECT')} className="p-1.5 bg-white/10 rounded-lg"><Database size={20} /></button>
        <button onClick={() => onViewChange('CART')} className="relative">
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#fb641b] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
        </button>
      </div>
    </div>
    <div className="relative">
      <input type="text" placeholder="Search for products" className="w-full py-2.5 px-10 rounded-sm text-sm text-gray-800 focus:outline-none shadow-inner" />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
  </header>
);

const CategoryBar: React.FC<any> = ({ activeCategory, setActiveCategory }) => (
  <div className="bg-white border-b shadow-sm">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="flex justify-between items-center py-4 lg:py-6 overflow-x-auto scrollbar-hide gap-8">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            className={`flex flex-col items-center gap-1.5 flex-shrink-0 group transition-all duration-300 ${activeCategory === cat ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
          >
            <div className="w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={`https://picsum.photos/seed/${cat}/100/100`} className="w-full h-full object-contain rounded-md" alt={cat} />
            </div>
            <span className={`text-[10px] lg:text-sm font-bold tracking-tight text-gray-700 ${activeCategory === cat ? 'text-[#2874f0]' : ''}`}>
              {cat}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product, onSelect: (p: Product) => void }> = ({ product, onSelect }) => (
  <div 
    className="bg-white hover:shadow-lg transition-all cursor-pointer flex flex-col h-full border border-gray-100 group p-4"
    onClick={() => onSelect(product)}
  >
    <div className="relative mb-3 aspect-[4/5] flex items-center justify-center overflow-hidden bg-white">
      <img src={product.images[0]} alt="" className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
      <button className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 transition-colors">
        <Heart size={20} />
      </button>
    </div>
    <div className="flex-1 text-center">
      <h3 className="text-xs lg:text-sm font-bold line-clamp-1 mb-1 text-gray-800 group-hover:text-[#2874f0] transition-colors">{product.name}</h3>
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center font-bold">
          {product.rating} ★
        </div>
        <span className="text-[10px] text-gray-400 font-bold">({product.reviewsCount.toLocaleString()})</span>
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-sm lg:text-base text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-green-600 font-bold text-[10px]">{Math.round((1 - product.price/product.originalPrice)*100)}% off</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tight">Hot Deal</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return activeCategory ? MOCK_PRODUCTS.filter(p => p.category === activeCategory) : MOCK_PRODUCTS;
  }, [activeCategory]);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...p, quantity: 1 }];
    });
    setCurrentView('CART');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const totalAmount = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const totalOriginalAmount = useMemo(() => cart.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0), [cart]);
  const totalSavings = totalOriginalAmount - totalAmount;

  const placeOrder = () => {
    const order: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...cart],
      total: totalAmount,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      address: 'H-32, Sector 18, Noida, UP - 201301',
      paymentMethod: 'UPI'
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setCurrentView('ORDERS');
    window.scrollTo(0,0);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex flex-col font-sans selection:bg-blue-100">
      <DesktopHeader onViewChange={(v: View) => { setCurrentView(v); window.scrollTo(0,0); }} cartCount={cart.length} />
      <MobileHeader onViewChange={(v: View) => { setCurrentView(v); window.scrollTo(0,0); }} cartCount={cart.length} />

      <main className="flex-1">
        {currentView === 'HOME' && (
          <div className="animate-fadeIn">
            <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            {/* Banner Section */}
            {!activeCategory && (
              <div className="container mx-auto px-4 max-w-7xl mt-4">
                <div className="relative rounded-sm overflow-hidden shadow-sm h-40 lg:h-80 bg-blue-100 flex items-center justify-center">
                  <img src="https://picsum.photos/seed/promo/1200/400" className="w-full h-full object-cover" alt="Banner" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-12">
                     <div className="text-white">
                        <h2 className="text-3xl lg:text-5xl font-black italic tracking-tighter mb-2">MEGA DEALS</h2>
                        <p className="text-sm lg:text-xl font-bold opacity-90">Up to 80% Off on Novyxa Plus Brands</p>
                        <button className="mt-6 bg-white text-[#2874f0] px-8 py-2 rounded-sm font-black uppercase text-xs tracking-widest shadow-lg">Shop Now</button>
                     </div>
                  </div>
                </div>
              </div>
            )}

            <div className="container mx-auto px-4 max-w-7xl py-6">
              <div className="bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                    {activeCategory ? activeCategory : 'Deals of the Day'}
                  </h2>
                  <button className="bg-[#2874f0] text-white font-bold text-[10px] lg:text-xs px-4 py-2 rounded-sm shadow-sm uppercase">View All</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="border-r border-b border-gray-100">
                      <ProductCard product={p} onSelect={(p) => { setSelectedProduct(p); setCurrentView('PDP'); window.scrollTo(0,0); }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'PDP' && selectedProduct && (
          <div className="animate-fadeIn container mx-auto px-0 lg:px-4 lg:py-4 max-w-7xl">
            <div className="bg-white lg:rounded-sm shadow-sm lg:p-6 flex flex-col lg:flex-row gap-8">
              {/* Image Section - Sticky */}
              <div className="lg:w-[450px] flex flex-col gap-4">
                <div className="relative p-10 lg:border lg:rounded-sm flex items-center justify-center bg-white aspect-square overflow-hidden group">
                  <img src={selectedProduct.images[0]} className="max-w-full max-h-full object-contain" alt={selectedProduct.name} />
                  <button className="absolute top-4 right-4 p-2.5 bg-white border rounded-full text-gray-300 hover:text-red-500 shadow-sm transition-all"><Heart size={20} /></button>
                </div>
                <div className="hidden lg:flex gap-3">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-[#ff9f00] text-white py-4 rounded-sm font-bold uppercase tracking-tight shadow-sm hover:brightness-110 transition-all">Add to Cart</button>
                  <button onClick={() => { addToCart(selectedProduct); setCurrentView('CHECKOUT'); }} className="flex-1 bg-[#fb641b] text-white py-4 rounded-sm font-bold uppercase tracking-tight shadow-sm hover:brightness-110 transition-all">Buy Now</button>
                </div>
              </div>

              {/* Info Section - Scrollable */}
              <div className="flex-1 p-6 lg:p-0">
                <nav className="hidden lg:flex items-center gap-2 text-xs font-medium text-gray-400 mb-4">
                  Home <ChevronRight size={10}/> {selectedProduct.category} <ChevronRight size={10}/> {selectedProduct.brand}
                </nav>
                <h1 className="text-lg lg:text-xl font-medium text-gray-900 leading-tight mb-2">{selectedProduct.name}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                    {selectedProduct.rating} ★
                  </div>
                  <span className="text-gray-400 font-bold text-xs tracking-wide">{selectedProduct.reviewsCount.toLocaleString()} Ratings & Reviews</span>
                  <div className="h-4 w-12 bg-blue-100 flex items-center justify-center rounded">
                     <span className="text-[8px] font-black text-[#2874f0]">F-Assured</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-black text-gray-900">₹{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through text-sm font-bold">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-bold text-sm">{Math.round((1 - selectedProduct.price/selectedProduct.originalPrice) * 100)}% off</span>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 border rounded-sm p-4">
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-widest">Available Offers</h4>
                    <div className="space-y-2">
                       {['Bank Offer: 10% off on Axis Bank Cards', 'Combo Offer: Buy 2 get 5% extra off', 'Partner Offer: Free Spotify Premium for 6 months'].map((off, i) => (
                         <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-800">
                            <Star size={12} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{off} <button className="text-[#2874f0] font-bold ml-1">T&C</button></span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y py-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 mb-2">Delivery</h4>
                      <div className="flex items-center gap-2 border-b pb-1 max-w-[150px]">
                        <MapPin size={14} className="text-gray-400"/>
                        <input type="text" placeholder="Enter Pincode" className="text-xs font-bold w-full focus:outline-none" defaultValue="201301" />
                        <button className="text-[#2874f0] text-xs font-bold">Check</button>
                      </div>
                      <p className="text-[10px] font-bold text-gray-800 mt-2">Delivery by {selectedProduct.deliveryDate} | <span className="text-green-600">Free</span></p>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-gray-400 mb-2">Seller</h4>
                       <p className="text-xs font-bold text-[#2874f0] hover:underline cursor-pointer">{selectedProduct.seller}</p>
                       <p className="text-[10px] text-gray-400 mt-1">7 Days Replacement Policy</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-800">Description</h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Footer */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t flex gap-3 z-50">
              <button onClick={() => addToCart(selectedProduct)} className="flex-1 border text-gray-800 py-3 rounded-sm font-bold uppercase text-xs shadow-sm">Add to Cart</button>
              <button onClick={() => { addToCart(selectedProduct); setCurrentView('CHECKOUT'); }} className="flex-1 bg-[#fb641b] text-white py-3 rounded-sm font-bold uppercase text-xs shadow-xl">Buy Now</button>
            </div>
          </div>
        )}

        {currentView === 'CART' && (
          <div className="container mx-auto px-4 py-6 max-w-7xl animate-fadeIn pb-32">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="bg-white p-4 shadow-sm flex items-center justify-between border-b">
                   <h2 className="font-bold text-lg">My Cart ({cart.length})</h2>
                   <div className="flex items-center gap-2 text-xs font-bold">
                      <MapPin size={14} className="text-[#2874f0]"/> Deliver to: <span className="text-[#2874f0]">Noida - 201301</span>
                      <button className="border px-3 py-1 text-xs">Change</button>
                   </div>
                </div>

                {cart.length === 0 ? (
                  <div className="bg-white p-20 text-center shadow-sm">
                    <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4dda-b473-72051092a115.png?q=90" className="w-48 mx-auto mb-6 opacity-80" />
                    <h3 className="text-lg font-bold mb-2">Your cart is empty!</h3>
                    <p className="text-xs text-gray-400 mb-6">Add items to it now.</p>
                    <button onClick={() => setCurrentView('HOME')} className="bg-[#2874f0] text-white px-16 py-2.5 rounded-sm font-bold shadow-lg">Shop Now</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-white p-6 shadow-sm flex gap-6 border-b animate-fadeIn">
                      <div className="w-24 h-24 lg:w-32 lg:h-32 flex flex-col items-center gap-4">
                        <img src={item.images[0]} className="max-w-full max-h-full object-contain" alt={item.name} />
                        <div className="flex items-center border rounded-sm">
                           <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100 border-r">-</button>
                           <span className="px-5 text-sm font-bold">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100 border-l">+</button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-bold text-sm lg:text-base text-gray-800 leading-snug line-clamp-2">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold whitespace-nowrap">Delivered by {item.deliveryDate}</p>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Seller: {item.seller}</p>
                        <div className="flex items-center gap-3 mt-4">
                          <span className="text-lg lg:text-xl font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                          <span className="text-gray-400 line-through text-xs font-bold">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                          <span className="text-green-600 font-bold text-xs">{Math.round((1 - item.price/item.originalPrice) * 100)}% off</span>
                        </div>
                        <div className="flex items-center gap-8 mt-6">
                           <button className="text-sm font-bold text-gray-800 hover:text-[#2874f0] uppercase tracking-tight">Save for later</button>
                           <button onClick={() => removeFromCart(item.id)} className="text-sm font-bold text-gray-800 hover:text-red-500 uppercase tracking-tight">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {cart.length > 0 && (
                  <div className="bg-white p-4 shadow-md flex justify-end sticky bottom-0 lg:static z-40">
                    <button onClick={() => setCurrentView('CHECKOUT')} className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold uppercase tracking-tight shadow-lg hover:brightness-110 transition-all">Place Order</button>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <aside className="lg:w-[400px]">
                  <div className="bg-white shadow-sm sticky top-20">
                    <h3 className="text-sm font-bold text-gray-400 px-6 py-4 border-b uppercase">Price Details</h3>
                    <div className="p-6 space-y-4 font-medium text-gray-700">
                      <div className="flex justify-between"><span>Price ({cart.length} items)</span><span className="text-gray-900">₹{totalOriginalAmount.toLocaleString()}</span></div>
                      <div className="flex justify-between text-green-600 font-bold tracking-tight"><span>Discount</span><span>- ₹{totalSavings.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>Delivery Charges</span><span className="text-green-600 font-bold uppercase text-[10px]">Free</span></div>
                      <div className="pt-6 border-t border-dashed flex justify-between text-lg font-black text-gray-900">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t text-green-600 font-bold text-xs">
                       You will save ₹{totalSavings.toLocaleString()} on this order
                    </div>
                    <div className="p-6 bg-gray-50 flex items-center gap-3 opacity-60">
                       <ShieldCheck size={20} className="text-gray-400"/>
                       <p className="text-[10px] font-bold uppercase leading-tight tracking-widest">Safe and Secure Payments. 100% Authentic products.</p>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        )}

        {currentView === 'ARCHITECT' && <SystemArchitectView />}
        
        {currentView === 'ORDERS' && (
          <div className="container mx-auto px-4 py-8 max-w-4xl animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            {orders.length === 0 ? (
               <div className="bg-white p-12 text-center rounded-sm border shadow-sm">
                 <p className="text-gray-400 font-bold">No active orders</p>
               </div>
            ) : (
              <div className="space-y-4">
                {orders.map(o => (
                  <div key={o.id} className="bg-white p-6 shadow-sm border rounded-sm flex gap-6 hover:shadow-md transition-all">
                    <div className="w-20 h-20 bg-gray-50 flex items-center justify-center p-2">
                       <img src={o.items[0].images[0]} className="max-w-full max-h-full object-contain" alt="" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start">
                         <h4 className="font-bold text-sm lg:text-base">{o.items[0].name}</h4>
                         <span className="text-xs font-black text-[#2874f0] uppercase tracking-widest">{o.status}</span>
                       </div>
                       <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Order ID: {o.id}</p>
                       <div className="mt-4 flex items-center justify-between">
                         <span className="text-lg font-black text-gray-900">₹{o.total.toLocaleString()}</span>
                         <button className="text-[#2874f0] text-xs font-black uppercase tracking-widest flex items-center gap-1">Track Order <ChevronRight size={14}/></button>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentView === 'CHECKOUT' && (
          <div className="container mx-auto px-4 py-10 max-w-6xl animate-fadeIn">
             <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 space-y-4">
                   <div className="bg-[#2874f0] p-3 text-white flex items-center gap-4">
                      <div className="w-5 h-5 bg-white text-[#2874f0] flex items-center justify-center rounded-sm font-bold text-xs">1</div>
                      <h3 className="uppercase text-sm font-bold tracking-widest">Login</h3>
                      <CheckCircle2 size={16} className="ml-auto text-white"/>
                   </div>
                   <div className="bg-white p-6 shadow-sm border flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 bg-gray-100 text-[#2874f0] flex items-center justify-center rounded-sm font-bold text-xs">2</div>
                        <h3 className="uppercase text-sm font-bold tracking-widest">Delivery Address</h3>
                      </div>
                      <div className="text-xs font-bold text-gray-600">
                         Akshay Verma, Noida - 201301
                      </div>
                   </div>
                   <div className="bg-[#2874f0] p-4 text-white flex items-center gap-4">
                      <div className="w-5 h-5 bg-white text-[#2874f0] flex items-center justify-center rounded-sm font-bold text-xs">3</div>
                      <h3 className="uppercase text-sm font-bold tracking-widest">Payment Options</h3>
                   </div>
                   <div className="bg-white p-6 shadow-sm border space-y-4">
                      {['Novyxa UPI', 'Wallet / Postpaid', 'Credit / Debit Card', 'Cash on Delivery'].map((m, i) => (
                        <label key={i} className="flex items-center gap-4 p-4 border rounded-sm cursor-pointer hover:bg-gray-50">
                           <input type="radio" name="pay" defaultChecked={i === 0} className="w-4 h-4 accent-[#2874f0]"/>
                           <span className="text-sm font-bold text-gray-700">{m}</span>
                        </label>
                      ))}
                      <button onClick={placeOrder} className="w-full bg-[#fb641b] text-white py-4 rounded-sm font-bold uppercase tracking-widest shadow-xl mt-6">Confirm Order</button>
                   </div>
                </div>
                <aside className="lg:w-96">
                   <div className="bg-white shadow-sm p-6 space-y-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-2">Price Summary</h4>
                      <div className="space-y-4 text-sm font-medium">
                         <div className="flex justify-between"><span>Price</span><span>₹{totalOriginalAmount.toLocaleString()}</span></div>
                         <div className="flex justify-between text-green-600"><span>Savings</span><span>- ₹{totalSavings.toLocaleString()}</span></div>
                         <div className="flex justify-between"><span>Delivery</span><span className="text-green-600 font-bold uppercase text-[10px]">Free</span></div>
                         <div className="pt-4 border-t flex justify-between text-xl font-black">
                            <span>Amount Payable</span>
                            <span>₹{totalAmount.toLocaleString()}</span>
                         </div>
                      </div>
                   </div>
                </aside>
             </div>
          </div>
        )}
      </main>

      <footer className="bg-[#172337] text-white py-16 mt-20 border-t-8 border-[#2874f0]">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="space-y-4 col-span-2">
            <h1 className="text-2xl font-black italic tracking-tighter text-[#2874f0] bg-white px-3 py-1 inline-block rounded-sm">Novyxa</h1>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Novyxa is your one-stop destination for world-class shopping. Built for speed, scale, and customer happiness.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">About</h4>
            <ul className="text-xs font-bold space-y-3 text-gray-400">
              <li className="hover:underline cursor-pointer">Contact Us</li>
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Stories</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Help</h4>
            <ul className="text-xs font-bold space-y-3 text-gray-400">
              <li className="hover:underline cursor-pointer">Payments</li>
              <li className="hover:underline cursor-pointer">Shipping</li>
              <li className="hover:underline cursor-pointer">Return Policy</li>
              <li className="hover:underline cursor-pointer">FAQ</li>
            </ul>
          </div>
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Consumer Policy</h4>
             <ul className="text-xs font-bold space-y-3 text-gray-400">
              <li className="hover:underline cursor-pointer">Cancellation & Returns</li>
              <li className="hover:underline cursor-pointer">Terms Of Use</li>
              <li className="hover:underline cursor-pointer">Security</li>
              <li className="hover:underline cursor-pointer">Privacy</li>
            </ul>
          </div>
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Social</h4>
             <ul className="text-xs font-bold space-y-3 text-gray-400">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">YouTube</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 max-w-7xl pt-12 border-t border-white/10 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
              <Store size={14}/> <span>Become a Seller</span>
              <Briefcase size={14} className="ml-4"/> <span>Advertise</span>
              <Star size={14} className="ml-4"/> <span>Gift Cards</span>
           </div>
           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">© 2025 Novyxa.com India</p>
           <div className="flex gap-4 opacity-50 grayscale">
              <CreditCard size={24}/>
              <ShieldCheck size={24}/>
              <Smartphone size={24}/>
           </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 shadow-lg z-50 pb-safe">
        <button onClick={() => setCurrentView('HOME')} className={`flex flex-col items-center gap-0.5 px-4 ${currentView === 'HOME' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => setCurrentView('ORDERS')} className={`flex flex-col items-center gap-0.5 px-4 ${currentView === 'ORDERS' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
          <Package size={20} />
          <span className="text-[10px] font-bold">Orders</span>
        </button>
        <button onClick={() => setCurrentView('ARCHITECT')} className={`flex flex-col items-center gap-0.5 px-4 ${currentView === 'ARCHITECT' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
          <Database size={20} />
          <span className="text-[10px] font-bold">Architect</span>
        </button>
      </nav>
    </div>
  );
};

const SystemArchitectView: React.FC = () => (
  <div className="container mx-auto px-4 py-8 pb-32 lg:pb-12 animate-fadeIn max-w-7xl">
    <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
      <div className="bg-[#172337] p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Database size={36} className="text-blue-400" />
            <h2 className="text-2xl lg:text-3xl font-black tracking-tight">Novyxa Engine Infrastructure</h2>
          </div>
          <p className="text-sm text-blue-200 uppercase font-bold tracking-widest opacity-60">High-Availability Scalable Cluster</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> All Systems Operational
          </span>
        </div>
      </div>
      
      <div className="p-8 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-8 border-b pb-2">Core Microservices</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'Inventory Mesh', tech: 'Redis + Node', icon: <Search size={20}/>, color: 'text-blue-500' },
                { name: 'OMS Layer', tech: 'Kafka + Go', icon: <Package size={20}/>, color: 'text-orange-500' },
                { name: 'Security Guard', tech: 'IAM + OAuth', icon: <Lock size={20}/>, color: 'text-red-500' },
                { name: 'Ledger Engine', tech: 'PostgreSQL ACID', icon: <CreditCard size={20}/>, color: 'text-green-500' }
              ].map((s, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-sm border border-gray-100 flex items-center gap-5 hover:bg-white hover:shadow-md transition-all">
                  <div className={`p-3 bg-white rounded-sm shadow-sm ${s.color}`}>{s.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{s.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{s.tech}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-8 border-b pb-2">Global Edge Delivery</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[200px] p-8 bg-blue-50 border border-blue-100 rounded-sm text-center">
                <Database className="mx-auto text-blue-600 mb-4" size={40} />
                <p className="text-sm font-bold text-blue-900">Multi-Region DB</p>
                <p className="text-[10px] text-blue-600 font-bold uppercase mt-2">Data Integrity Layer</p>
              </div>
              <div className="flex-1 min-w-[200px] p-8 bg-orange-50 border border-orange-100 rounded-sm text-center">
                <ShieldCheck className="mx-auto text-orange-600 mb-4" size={40} />
                <p className="text-sm font-black text-orange-900">Active Shield</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase mt-2">DDoS Protection</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-gray-50 rounded-sm p-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
           <div className="text-center max-w-sm space-y-6">
             <Smartphone size={60} className="mx-auto text-gray-300" />
             <h4 className="text-xl font-bold text-gray-800">Unified API Mesh</h4>
             <p className="text-sm text-gray-500 leading-relaxed font-medium">
               Real-time sync between warehouse inventory and customer storefront. 1ms latency for availability checks.
             </p>
             <div className="flex flex-wrap justify-center gap-3 pt-4">
               {['Terraform', 'Docker', 'React', 'Elastic'].map(tag => (
                 <span key={tag} className="px-3 py-1 bg-white rounded-sm border text-[10px] font-bold uppercase tracking-widest text-gray-600">{tag}</span>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
