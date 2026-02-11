
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, ShoppingCart, Star, MapPin, ChevronRight, Plus, Minus, 
  Package, CheckCircle2, Clock, Heart, Menu, ShieldCheck, Truck, 
  Home, User, Database, Settings, ArrowLeft, Filter, Smartphone, CreditCard, Lock,
  ChevronDown, X, LogIn
} from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, Order, View } from './types';

// --- Shared Components ---

const DesktopHeader: React.FC<any> = ({ onViewChange, cartCount }) => (
  <header className="hidden lg:block bg-[#2874f0] text-white sticky top-0 z-50 py-3 shadow-lg">
    <div className="container mx-auto px-4 flex items-center gap-8">
      <div className="flex flex-col items-start cursor-pointer group" onClick={() => onViewChange('HOME')}>
        <h1 className="text-2xl font-black italic tracking-tighter leading-none group-hover:text-yellow-400 transition-colors">NOVYXA</h1>
        <span className="text-[10px] italic font-medium text-blue-100 flex items-center gap-1">
          Explore <span className="text-yellow-400 font-bold">Plus</span> <Plus size={8} />
        </span>
      </div>
      
      <div className="flex-1 max-w-2xl relative">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          className="w-full py-2.5 px-4 pr-12 rounded-sm text-sm text-gray-800 focus:outline-none shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        <button className="absolute right-0 top-0 bottom-0 px-4 bg-white text-[#2874f0] rounded-r-sm hover:bg-gray-100 transition-colors">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center gap-8 font-bold text-sm">
        <button className="bg-white text-[#2874f0] px-8 py-1.5 rounded-sm hover:bg-gray-100 transition-colors shadow-sm">Login</button>
        <button onClick={() => onViewChange('ARCHITECT')} className="hover:text-yellow-400 transition-colors flex items-center gap-1">
          <Database size={16} /> Architect
        </button>
        <button onClick={() => onViewChange('ORDERS')} className="hover:text-yellow-400 transition-colors">Orders</button>
        <button onClick={() => onViewChange('CART')} className="relative flex items-center gap-2 hover:text-yellow-400 transition-colors">
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -left-2 bg-yellow-400 text-blue-900 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
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
        <h1 className="text-xl font-black italic tracking-tighter cursor-pointer" onClick={() => onViewChange('HOME')}>NOVYXA</h1>
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

const BottomNav: React.FC<any> = ({ currentView, onViewChange }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 shadow-[0_-2px_15px_rgba(0,0,0,0.1)] z-50 pb-safe">
    <button onClick={() => onViewChange('HOME')} className={`flex flex-col items-center gap-1 px-4 ${currentView === 'HOME' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
      <Home size={22} />
      <span className="text-[10px] font-bold">Home</span>
    </button>
    <button onClick={() => onViewChange('ORDERS')} className={`flex flex-col items-center gap-1 px-4 ${currentView === 'ORDERS' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
      <Package size={22} />
      <span className="text-[10px] font-bold">Orders</span>
    </button>
    <button onClick={() => onViewChange('ARCHITECT')} className={`flex flex-col items-center gap-1 px-4 ${currentView === 'ARCHITECT' ? 'text-[#2874f0]' : 'text-gray-400'}`}>
      <Database size={22} />
      <span className="text-[10px] font-bold">Architect</span>
    </button>
  </nav>
);

const ProductCard: React.FC<{ product: Product, onSelect: (p: Product) => void }> = ({ product, onSelect }) => (
  <div 
    className="bg-white rounded-xl p-3 lg:p-4 hover:shadow-2xl transition-all cursor-pointer flex flex-col h-full border border-gray-100 group"
    onClick={() => onSelect(product)}
  >
    <div className="relative mb-3 aspect-square flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg">
      <img src={product.images[0]} alt="" className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2" />
      <button className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 transition-colors bg-white/80 rounded-full shadow-sm">
        <Heart size={18} />
      </button>
    </div>
    <div className="flex-1">
      <h3 className="text-xs lg:text-sm font-medium line-clamp-2 mb-1 text-gray-800 group-hover:text-[#2874f0] transition-colors h-10">{product.name}</h3>
      <div className="flex items-center gap-1 mb-2">
        <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center font-bold">{product.rating}★</span>
        <span className="text-[10px] text-gray-400 font-medium">({product.reviewsCount.toLocaleString()})</span>
      </div>
      <div className="mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-base lg:text-lg text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-[10px] lg:text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-green-600 font-bold text-[10px] lg:text-xs">{Math.round((1 - product.price/product.originalPrice)*100)}% off</span>
        </div>
        <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1"><Truck size={10} /> Free delivery</p>
      </div>
    </div>
  </div>
);

const SystemArchitectView: React.FC = () => (
  <div className="container mx-auto px-4 py-8 pb-32 lg:pb-12 animate-fadeIn">
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="bg-[#172337] p-8 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Database size={36} className="text-blue-400" />
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight">System Infrastructure</h2>
          </div>
          <p className="text-sm text-blue-200 uppercase font-black tracking-widest opacity-60">High-Performance E-Commerce MVP</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-500"></div>)}
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Architects Online</span>
        </div>
      </div>
      
      <div className="p-8 grid lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <section>
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em] mb-8 border-b pb-2">Microservices Backend</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'Elastic Catalog', tech: 'NoSQL Search', icon: <Search size={20}/>, color: 'text-blue-500' },
                { name: 'Event Bus', tech: 'Apache Kafka', icon: <Package size={20}/>, color: 'text-orange-500' },
                { name: 'IAM Security', tech: 'Identity Guard', icon: <Lock size={20}/>, color: 'text-red-500' },
                { name: 'Payment Engine', tech: 'PCI Compliance', icon: <CreditCard size={20}/>, color: 'text-green-500' }
              ].map((s, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
                  <div className={`p-3 bg-gray-50 rounded-xl ${s.color}`}>{s.icon}</div>
                  <div>
                    <p className="text-sm font-black text-gray-800">{s.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{s.tech}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em] mb-8 border-b pb-2">Global Data Layer</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[200px] p-8 bg-blue-50 border border-blue-100 rounded-3xl text-center group">
                <Database className="mx-auto text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={40} />
                <p className="text-sm font-black text-blue-900">PostgreSQL Cloud</p>
                <p className="text-[10px] text-blue-600 font-bold uppercase mt-2">Primary Transactional Store</p>
              </div>
              <div className="flex-1 min-w-[200px] p-8 bg-orange-50 border border-orange-100 rounded-3xl text-center group">
                <ShieldCheck className="mx-auto text-orange-600 mb-4 group-hover:scale-110 transition-transform" size={40} />
                <p className="text-sm font-black text-orange-900">Redis Enterprise</p>
                <p className="text-[10px] text-orange-600 font-bold uppercase mt-2">Session & Stock Cache</p>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-gray-50 rounded-3xl p-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
           <div className="text-center max-w-sm space-y-6">
             <div className="relative inline-block">
                <Smartphone size={80} className="mx-auto text-gray-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-1 bg-[#2874f0] rounded-full animate-pulse"></div>
                </div>
             </div>
             <h4 className="text-2xl font-black text-gray-800">Adaptive API Mesh</h4>
             <p className="text-sm text-gray-500 leading-relaxed font-medium">
               Uses unified GraphQL endpoints with WebSocket fallbacks for real-time inventory updates across Mobile, Tablet, and Desktop clients simultaneously.
             </p>
             <div className="flex flex-wrap justify-center gap-3">
               {['Kubernetes', 'Serverless', 'CDN', 'TLS 1.3'].map(tag => (
                 <span key={tag} className="px-4 py-1.5 bg-white rounded-lg shadow-sm border text-[10px] font-black uppercase tracking-widest text-gray-600">{tag}</span>
               ))}
             </div>
           </div>
        </div>
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

  const handleBack = () => {
    if (currentView === 'PDP') setCurrentView('HOME');
    else if (currentView === 'CHECKOUT') setCurrentView('CART');
    else if (currentView === 'CART' || currentView === 'ORDERS' || currentView === 'ARCHITECT') setCurrentView('HOME');
    else setCurrentView('HOME');
    window.scrollTo(0,0);
  };

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
            <div className="bg-white border-b lg:border-none lg:bg-transparent lg:mt-6">
              <div className="container mx-auto lg:px-4">
                <div className="bg-white p-4 lg:rounded-2xl shadow-sm overflow-x-auto scrollbar-hide flex lg:justify-center gap-6 lg:gap-16 border lg:border-none">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                      className={`flex flex-col items-center gap-2 flex-shrink-0 group transition-all duration-300 ${activeCategory === cat ? 'scale-110 opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div className={`w-14 h-14 lg:w-20 lg:h-20 rounded-2xl bg-gray-50 flex items-center justify-center p-2 border-2 transition-all ${activeCategory === cat ? 'border-[#2874f0] shadow-md' : 'border-transparent'}`}>
                        <img src={`https://picsum.photos/seed/${cat}/100/100`} className="w-full h-full object-cover rounded-xl" alt={cat} />
                      </div>
                      <span className={`text-[10px] lg:text-xs font-black uppercase tracking-widest ${activeCategory === cat ? 'text-[#2874f0]' : 'text-gray-600'}`}>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-xl lg:text-2xl font-black text-gray-900 tracking-tight">{activeCategory ? `${activeCategory} Collection` : 'Featured Products'}</h2>
                   <div className="h-1 w-12 bg-[#2874f0] mt-1 rounded-full"></div>
                </div>
                <button className="text-[#2874f0] font-black text-xs uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={(p) => { setSelectedProduct(p); setCurrentView('PDP'); window.scrollTo(0,0); }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'PDP' && selectedProduct && (
          <div className="animate-fadeIn container mx-auto px-0 lg:px-4 lg:py-10">
            <div className="bg-white lg:rounded-3xl shadow-lg lg:p-10 flex flex-col lg:flex-row gap-10 lg:gap-20">
              {/* Image Section */}
              <div className="lg:w-5/12 flex flex-col gap-8">
                <div className="relative p-10 lg:border lg:rounded-3xl flex items-center justify-center bg-white aspect-square overflow-hidden group">
                  <img src={selectedProduct.images[0]} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={selectedProduct.name} />
                  <button className="absolute top-6 right-6 p-3 bg-white border rounded-full text-gray-300 hover:text-red-500 shadow-lg transition-all"><Heart size={24} /></button>
                </div>
                <div className="hidden lg:flex gap-6">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 border-2 border-[#2874f0] text-[#2874f0] py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg">Add to Cart</button>
                  <button onClick={() => { addToCart(selectedProduct); setCurrentView('CHECKOUT'); }} className="flex-1 bg-[#fb641b] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl">Buy Now</button>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 p-6 lg:p-0">
                <nav className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-8">
                  Home <ChevronRight size={12}/> {selectedProduct.category} <ChevronRight size={12}/> {selectedProduct.brand}
                </nav>
                <h1 className="text-2xl lg:text-4xl font-medium text-gray-900 leading-tight mb-6">{selectedProduct.name}</h1>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-black flex items-center gap-1.5 shadow-md">
                    {selectedProduct.rating} <Star size={16} fill="currentColor" />
                  </div>
                  <span className="text-gray-400 font-bold text-sm tracking-wide">{selectedProduct.reviewsCount.toLocaleString()} Ratings & Reviews</span>
                </div>

                <div className="flex items-center gap-8 mb-10 pb-10 border-b">
                  <span className="text-4xl lg:text-5xl font-black text-gray-900">₹{selectedProduct.price.toLocaleString()}</span>
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-lg font-bold">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                    <span className="text-green-600 font-black text-lg">{Math.round((1 - selectedProduct.price/selectedProduct.originalPrice) * 100)}% off</span>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 shadow-inner">
                    <div className="flex items-center gap-3 mb-6 text-[#2874f0] font-black uppercase text-xs tracking-[0.3em]">
                      <Truck size={24} /> Logistics Information
                    </div>
                    <div className="space-y-4">
                      <p className="text-xl font-bold text-gray-800">FREE Delivery by {selectedProduct.deliveryDate}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                         <MapPin size={18} className="text-[#2874f0]"/> Delivering to <span className="text-[#2874f0] font-black border-b-2 border-blue-200 cursor-pointer">Noida - 201301</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest border-b pb-2 inline-block">Product Highlights</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProduct.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-4 text-base text-gray-700 font-medium">
                          <CheckCircle2 size={22} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile Buy Button Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] pb-safe">
              <button onClick={() => addToCart(selectedProduct)} className="flex-1 border-2 border-gray-200 text-gray-800 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-sm active:bg-gray-50 transition-colors">Cart</button>
              <button onClick={() => { addToCart(selectedProduct); setCurrentView('CHECKOUT'); }} className="flex-1 bg-[#fb641b] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl active:brightness-110 transition-all">Buy Now</button>
            </div>
          </div>
        )}

        {currentView === 'CART' && (
          <div className="container mx-auto px-4 py-10 pb-32 lg:pb-12 animate-fadeIn">
            <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Shopping Cart <span className="text-gray-400 text-lg">({cart.length})</span></h2>
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 space-y-6">
                {cart.length === 0 ? (
                  <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                      <ShoppingCart size={48} className="text-gray-200" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-400 mb-6">Your basket is empty!</h3>
                    <button onClick={() => setCurrentView('HOME')} className="bg-[#2874f0] text-white px-16 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">Browse Products</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex gap-6 lg:gap-12 animate-fadeIn">
                      <div className="w-24 h-24 lg:w-40 lg:h-40 bg-gray-50 rounded-2xl p-4 flex items-center justify-center border">
                        <img src={item.images[0]} className="max-w-full max-h-full object-contain" alt={item.name} />
                      </div>
                      <div className="flex-1 py-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-bold text-lg lg:text-xl text-gray-800 leading-snug line-clamp-2">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors bg-gray-50 p-2 rounded-full"><X size={20}/></button>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <span className="text-2xl lg:text-3xl font-black text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                          <span className="text-gray-400 line-through text-sm font-bold">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-8 mt-8">
                           <div className="flex items-center border rounded-xl bg-white shadow-sm overflow-hidden">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:bg-gray-50 transition-colors border-r"><Minus size={16}/></button>
                              <span className="px-8 text-lg font-black">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:bg-gray-50 transition-colors border-l"><Plus size={16}/></button>
                           </div>
                           <button className="text-xs font-black text-[#2874f0] hover:underline uppercase tracking-[0.2em]">Save for later</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <aside className="lg:w-[400px]">
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-28">
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em] mb-8 border-b pb-4">Order Summary</h3>
                    <div className="space-y-5 font-medium text-gray-600">
                      <div className="flex justify-between"><span>Subtotal ({cart.length} items)</span><span className="text-gray-900 font-black">₹{cart.reduce((a,c)=>a+(c.originalPrice*c.quantity),0).toLocaleString()}</span></div>
                      <div className="flex justify-between text-green-600"><span>Loyalty Discount</span><span>- ₹{cart.reduce((a,c)=>a+((c.originalPrice-c.price)*c.quantity),0).toLocaleString()}</span></div>
                      <div className="flex justify-between"><span>Delivery</span><span className="text-green-600 font-black uppercase text-xs tracking-widest">Free</span></div>
                      <div className="pt-8 border-t border-dashed flex justify-between text-2xl lg:text-3xl font-black text-gray-900">
                        <span>Grand Total</span>
                        <span>₹{totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    <button onClick={() => setCurrentView('CHECKOUT')} className="w-full bg-[#fb641b] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] mt-10 shadow-2xl hover:brightness-110 transition-all">Place Order</button>
                    <div className="flex items-center justify-center gap-2 mt-6 text-green-600 font-black text-[10px] uppercase tracking-widest bg-green-50 py-2 rounded-lg">
                       You are saving ₹{(cart.reduce((a,c)=>a+((c.originalPrice-c.price)*c.quantity),0)).toLocaleString()} on this order!
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        )}

        {currentView === 'ORDERS' && (
          <div className="container mx-auto px-4 py-10 pb-32 lg:pb-12 animate-fadeIn">
            <h2 className="text-3xl font-black text-gray-900 mb-10 tracking-tight">Order Journey</h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package size={40} className="text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No active orders</p>
                  <button onClick={() => setCurrentView('HOME')} className="mt-8 text-[#2874f0] font-black underline uppercase tracking-widest text-xs">Shop Bestsellers</button>
                </div>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 hover:shadow-xl transition-all border-l-8 border-l-blue-500">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex items-center justify-center border shadow-inner">
                      <img src={o.items[0].images[0]} className="max-w-full max-h-full object-contain" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                         <div className="space-y-1">
                            <h4 className="font-bold text-lg text-gray-800">{o.items[0].name} {o.items.length > 1 && <span className="text-[#2874f0] font-black text-sm">+ {o.items.length - 1} others</span>}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Ordered: {o.date} • ID: {o.id}</p>
                         </div>
                         <span className="bg-blue-50 text-[#2874f0] text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-blue-100 shadow-sm">{o.status}</span>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t">
                        <span className="text-2xl font-black text-gray-900">₹{o.total.toLocaleString()}</span>
                        <button className="flex items-center gap-2 text-xs font-black text-[#2874f0] hover:underline uppercase tracking-widest">
                          View Details <ChevronRight size={14}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentView === 'CHECKOUT' && (
          <div className="container mx-auto px-4 py-10 pb-32 lg:pb-12 animate-fadeIn">
            <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
              <div className="flex-1 space-y-8">
                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 bottom-0 w-3 bg-[#2874f0]"></div>
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.4em] mb-8 flex items-center gap-4">
                    <MapPin size={22} className="text-[#2874f0]" /> 01. Shipping Details
                  </h3>
                  <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6 group-hover:bg-white transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2874f0]">
                       <User size={24}/>
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-xl text-gray-800">Akshay Verma</p>
                      <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">H-32, Sector 18, Noida, Uttar Pradesh - 201301</p>
                      <p className="text-xs text-[#2874f0] mt-2 font-black tracking-widest uppercase">Verified Mobile: +91 98XXX-XXXXX</p>
                    </div>
                    <button className="text-[10px] font-black text-[#2874f0] uppercase tracking-[0.2em] bg-white px-6 py-3 rounded-xl border-2 border-blue-100 shadow-sm hover:shadow-md active:scale-95 transition-all">Edit Address</button>
                  </div>
                </section>

                <section className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.4em] mb-8 flex items-center gap-4">
                    <CreditCard size={22} className="text-[#2874f0]" /> 02. Payment Gateway
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { name: 'PhonePe / GPay UPI', active: true },
                      { name: 'Credit / Debit Cards', active: false },
                      { name: 'Net Banking', active: false },
                      { name: 'Cash on Delivery', active: false }
                    ].map((m, i) => (
                      <label key={i} className={`flex items-center justify-between p-6 border-2 rounded-3xl cursor-pointer transition-all duration-300 group ${m.active ? 'border-[#2874f0] bg-blue-50/30' : 'hover:border-blue-100 active:bg-gray-50'}`}>
                        <div className="flex items-center gap-6">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border transition-colors ${m.active ? 'bg-white text-[#2874f0]' : 'bg-gray-50 text-gray-300'}`}>
                              {i === 3 ? <Package size={24}/> : <Smartphone size={24}/>}
                           </div>
                           <span className={`font-black text-lg transition-colors ${m.active ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>{m.name}</span>
                        </div>
                        <input type="radio" name="payment" defaultChecked={m.active} className="w-6 h-6 accent-[#2874f0]" />
                      </label>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="lg:w-[450px]">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10 sticky top-28">
                  <h3 className="text-xs font-black uppercase text-gray-400 tracking-[0.3em] mb-10 text-center">Checkout Summary</h3>
                  <div className="space-y-6 pb-8 border-b border-dashed">
                     <div className="flex justify-between font-bold text-gray-500"><span>Cart Subtotal</span><span className="text-gray-900 font-black">₹{totalAmount.toLocaleString()}</span></div>
                     <div className="flex justify-between font-bold text-gray-500"><span>Convenience Fee</span><span className="text-green-600 font-black uppercase text-xs tracking-widest">Free</span></div>
                     <div className="flex justify-between font-bold text-gray-500"><span>GST (18%)</span><span className="text-gray-900 font-black">₹0</span></div>
                  </div>
                  <div className="py-10 flex justify-between text-3xl font-black text-gray-900 tracking-tight">
                    <span>Payable</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <button onClick={placeOrder} className="w-full bg-[#fb641b] text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] shadow-2xl hover:brightness-110 active:scale-95 transition-all text-sm mb-6">Complete Transaction</button>
                  <div className="flex flex-col items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                       <ShieldCheck size={18} className="text-green-500"/> PCI DSS Compliant Gateway
                    </div>
                    <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                       <Lock size={18} className="text-blue-400"/> AES-256 Bit Encryption
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {currentView === 'ARCHITECT' && <SystemArchitectView />}
      </main>

      <BottomNav currentView={currentView} onViewChange={(v: View) => { setCurrentView(v); window.scrollTo(0,0); }} />

      <footer className="hidden lg:block bg-[#172337] text-white py-20 mt-20">
        <div className="container mx-auto px-4 grid grid-cols-4 gap-16">
          <div className="space-y-8">
            <h1 className="text-3xl font-black italic tracking-tighter hover:text-yellow-400 transition-colors cursor-default">NOVYXA</h1>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Novyxa is India's premier multi-channel e-commerce ecosystem, engineered for planet-scale distribution and world-class customer experiences.
            </p>
            <div className="flex gap-4">
               {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"><div className="w-4 h-4 bg-gray-500 rounded-sm"></div></div>)}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Category Index</h4>
            <ul className="text-sm font-bold space-y-4 text-gray-400">
              {CATEGORIES.map(c => <li key={c} className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14}/> {c}</li>)}
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Company Desk</h4>
            <ul className="text-sm font-bold space-y-4 text-gray-400">
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Shield</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Investor Relations</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Global Logistics</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors">Sitemap</li>
            </ul>
          </div>
          <div className="space-y-8">
             <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Insider Connect</h4>
             <p className="text-xs text-gray-500 font-medium">Join 5M+ subscribers for exclusive drop alerts.</p>
             <div className="flex gap-2">
                <input type="text" placeholder="Your Email" className="flex-1 bg-white/5 rounded-xl border border-white/10 px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                <button className="bg-[#2874f0] px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all">Join</button>
             </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-20 border-t border-white/5 mt-20 text-center flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.5em]">© 2025 NOVYXA INDIA HQ</p>
          <div className="flex gap-8">
             <ShieldCheck size={20}/>
             <CreditCard size={20}/>
             <Smartphone size={20}/>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Built by Tenon Architect</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
