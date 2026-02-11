import React, { useState, useEffect, useMemo } from 'react';
// Added ShieldCheck and Truck to the imports from lucide-react to fix undefined component errors in the footer
import { Search, ShoppingCart, Star, MapPin, ChevronRight, Plus, Minus, Package, CheckCircle2, Clock, Heart, Menu, ShieldCheck, Truck } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, Order, View } from './types';

const ProductCard: React.FC<{ 
  product: Product; 
  onSelect: (product: Product) => void 
}> = ({ product, onSelect }) => (
  <div 
    className="bg-white rounded p-3 hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 flex flex-col h-full" 
    onClick={() => onSelect(product)}
  >
    <div className="relative mb-2 aspect-square flex items-center justify-center overflow-hidden">
        <img src={product.images[0]} alt="" className="max-w-full max-h-full object-contain" loading="lazy" />
    </div>
    <h3 className="text-xs font-bold line-clamp-2 mb-1">{product.name}</h3>
    <div className="flex items-center gap-1 mb-2">
      <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold">
        {product.rating} <Star size={8} fill="currentColor" />
      </span>
      <span className="text-[10px] text-gray-400 font-medium">({product.reviewsCount.toLocaleString()})</span>
    </div>
    <div className="mt-auto">
      <div className="flex items-center gap-2">
        <span className="font-bold text-base">₹{product.price.toLocaleString()}</span>
        <span className="text-[10px] text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
      </div>
      <p className="text-[10px] text-green-600 font-bold">Free delivery</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;
    if (activeCategory) result = result.filter(p => p.category === activeCategory);
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => {
        let changed = false;
        const updated = prev.map(o => {
          if (o.status === 'Delivered' || o.status === 'Cancelled') return o;
          if (Math.random() > 0.85) {
            changed = true;
            const map: Record<string, Order['status']> = {
              'Processing': 'Shipped', 
              'Shipped': 'Out for Delivery', 
              'Out for Delivery': 'Delivered'
            };
            return { ...o, status: map[o.status] || o.status };
          }
          return o;
        });
        return changed ? updated : prev;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...p, quantity: 1 }];
    });
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

  const checkoutTotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      items: [...cart],
      total: checkoutTotal,
      status: 'Processing',
      date: new Date().toLocaleDateString(),
      address: '123, Green Park, South Delhi, India',
      paymentMethod: 'UPI'
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setCurrentView('ORDERS');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PDP');
    window.scrollTo(0, 0);
  };

  const OrderStatusTracker = ({ status }: { status: Order['status'] }) => {
    const stages: Order['status'][] = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIdx = stages.indexOf(status);

    return (
      <div className="flex items-center w-full mt-4 gap-1">
        {stages.map((stage, idx) => {
          const isCompleted = idx <= currentIdx;
          const isCurrent = idx === currentIdx;
          const isLast = idx === stages.length - 1;
          return (
            <React.Fragment key={stage}>
              <div className="flex flex-col items-center relative group">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-500 z-10 ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                  {isCompleted && <CheckCircle2 size={10} />}
                </div>
                <span className={`absolute -bottom-5 whitespace-nowrap text-[8px] font-bold uppercase tracking-tight ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {stage}
                </span>
              </div>
              {!isLast && (
                <div className={`flex-1 h-0.5 transition-colors duration-1000 ${idx < currentIdx ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-sm bg-[#f1f3f6]">
      <header className="flipkart-blue text-white sticky top-0 z-50 py-3 shadow-md">
        <div className="container mx-auto px-4 flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={20} /></button>
            <h1 className="text-xl lg:text-2xl font-black italic cursor-pointer tracking-tighter" onClick={() => { setCurrentView('HOME'); setActiveCategory(null); setSearchQuery(''); }}>NOVYXA</h1>
          </div>
          
          <div className="flex-1 max-w-xl relative">
            <input 
              type="text" placeholder="Search for products, brands and more" 
              className="w-full py-2 px-4 pr-10 rounded-sm text-black outline-none shadow-inner"
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
          </div>

          <div className="hidden lg:flex gap-8 font-bold items-center">
            <button onClick={() => setCurrentView('ORDERS')} className="hover:text-yellow-400 transition-colors">Orders</button>
            <button onClick={() => setCurrentView('CART')} className="relative flex items-center gap-2 hover:text-yellow-400 transition-colors">
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {currentView === 'HOME' && (
          <div className="bg-white shadow-sm overflow-x-auto scrollbar-hide py-2">
            <div className="container mx-auto px-4 flex justify-between gap-4">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`flex flex-col items-center gap-1 transition-all ${activeCategory === cat ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 border ${activeCategory === cat ? 'border-blue-500' : 'border-transparent'}`}>
                    <img src={`https://picsum.photos/seed/${cat}/48/48`} className="rounded-full w-10 h-10 object-cover" alt="" />
                  </div>
                  <span className={`text-[10px] font-bold ${activeCategory === cat ? 'text-blue-600' : 'text-gray-600'}`}>{cat}</span>
                </button>
              ))}
            </div>
          </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-6">
        {currentView === 'HOME' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-gray-800">{activeCategory ? `${activeCategory} Products` : 'Recommended for You'}</h2>
              <p className="text-xs text-gray-500">{filteredProducts.length} items</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
              {filteredProducts.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onSelect={handleProductSelect}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="bg-white p-12 text-center rounded shadow-sm mt-8">
                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-lg font-bold">No products found</h3>
                <p className="text-gray-500">Try searching for something else or clearing filters.</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'PDP' && selectedProduct && (
          <div className="bg-white p-4 lg:p-8 rounded shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5">
                <div className="border rounded p-4 h-80 lg:h-96 flex items-center justify-center bg-white group overflow-hidden">
                  <img src={selectedProduct.images[0]} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" alt="" />
                </div>
                <div className="flex gap-4 mt-4">
                  <button onClick={() => addToCart(selectedProduct)} className="flex-1 flipkart-yellow text-white py-3 rounded-sm font-bold uppercase shadow flex items-center justify-center gap-2">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button onClick={() => { addToCart(selectedProduct); setCurrentView('CHECKOUT'); }} className="flex-1 bg-orange-600 text-white py-3 rounded-sm font-bold uppercase shadow flex items-center justify-center gap-2">
                    <Package size={18} /> Buy Now
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <nav className="text-[10px] text-gray-400 mb-2 uppercase font-bold tracking-wider">
                  Home <ChevronRight size={10} className="inline mx-1" /> {selectedProduct.category}
                </nav>
                <h2 className="text-xl font-medium text-gray-800 mb-2">{selectedProduct.name}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    {selectedProduct.rating} <Star size={10} fill="currentColor" />
                  </span>
                  <span className="text-gray-500 font-bold text-xs">{selectedProduct.reviewsCount.toLocaleString()} Ratings</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-black text-gray-900">₹{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-gray-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                  <span className="text-green-600 font-bold">{Math.round((1 - selectedProduct.price/selectedProduct.originalPrice) * 100)}% off</span>
                </div>
                <div className="border-t pt-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest">Highlights</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {selectedProduct.highlights.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-widest">Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'CART' && (
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="flex-1 space-y-4">
              <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center font-bold">
                <span>My Cart ({cart.length})</span>
              </div>
              {cart.length === 0 ? (
                <div className="bg-white p-20 text-center rounded shadow-sm">
                   <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png" className="w-48 mx-auto mb-6 opacity-80" alt="" />
                   <h2 className="text-lg font-medium mb-4 text-gray-600">Your cart is empty!</h2>
                   <button onClick={() => setCurrentView('HOME')} className="flipkart-blue text-white px-10 py-2.5 rounded-sm font-bold shadow">Shop Now</button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map(item => (
                      <div key={item.id} className="bg-white p-4 rounded shadow-sm flex gap-4 lg:gap-8 border-b last:border-0">
                        <div className="w-24 lg:w-32 flex flex-col items-center gap-4">
                          <img src={item.images[0]} className="w-20 h-20 lg:w-24 lg:h-24 object-contain" alt="" />
                          <div className="flex items-center border rounded-sm">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-3 border-r hover:bg-gray-50"><Minus size={14} /></button>
                            <span className="px-4 text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-3 border-l hover:bg-gray-50"><Plus size={14} /></button>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <h3 className="font-medium text-base text-gray-800 leading-tight mb-2">{item.name}</h3>
                            <div className="flex items-center gap-3">
                              <span className="text-xl font-black">₹{(item.price * item.quantity).toLocaleString()}</span>
                              <span className="text-gray-400 line-through text-xs">₹{(item.originalPrice * item.quantity).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-4">
                            <button onClick={() => removeFromCart(item.id)} className="text-xs font-bold uppercase text-gray-700 hover:text-red-500 transition-colors">Remove</button>
                            <button className="text-xs font-bold uppercase text-gray-700 hover:text-blue-600 transition-colors">Save for later</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-end sticky bottom-0 z-10">
                    <button onClick={() => setCurrentView('CHECKOUT')} className="bg-orange-600 text-white px-12 py-3 rounded-sm font-bold shadow-lg uppercase text-sm tracking-widest">Place Order</button>
                  </div>
                </>
              )}
            </div>
            
            {cart.length > 0 && (
              <aside className="w-full lg:w-96 bg-white rounded shadow-sm h-fit sticky top-24">
                <div className="p-4 border-b font-bold text-gray-400 uppercase text-xs tracking-widest">Price Details</div>
                <div className="p-4 space-y-4 text-sm font-medium">
                  <div className="flex justify-between text-gray-700"><span>Price ({cart.length} items)</span><span>₹{cart.reduce((a,c)=>a+(c.originalPrice*c.quantity),0).toLocaleString()}</span></div>
                  <div className="flex justify-between text-green-600"><span>Discount</span><span>- ₹{cart.reduce((a,c)=>a+((c.originalPrice-c.price)*c.quantity),0).toLocaleString()}</span></div>
                  <div className="flex justify-between text-green-600"><span>Delivery Charges</span><span>FREE</span></div>
                  <div className="pt-4 border-t border-dashed flex justify-between font-black text-lg text-gray-900"><span>Total Amount</span><span>₹{checkoutTotal.toLocaleString()}</span></div>
                </div>
              </aside>
            )}
          </div>
        )}

        {currentView === 'ORDERS' && (
          <div className="max-w-4xl mx-auto space-y-4 pb-12">
            <h2 className="text-lg font-bold text-gray-800 mb-6">My Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded shadow-sm">
                <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                <button onClick={() => setCurrentView('HOME')} className="text-blue-600 font-bold mt-2 hover:underline">Start Shopping</button>
              </div>
            ) : (
              orders.map(o => (
                <div key={o.id} className="bg-white p-4 rounded border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex gap-4">
                      <div className="w-16 h-16 border rounded p-1 flex-shrink-0">
                        <img src={o.items[0].images[0]} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate text-gray-800">{o.items.map(i => i.name).join(', ')}</h4>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">ID: {o.id}</p>
                        <p className="text-sm font-black mt-2 text-gray-900">₹{o.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={12} className="text-blue-600" />
                        <span className="text-[10px] font-bold uppercase text-blue-600 tracking-wider">Order Timeline</span>
                      </div>
                      <OrderStatusTracker status={o.status} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {currentView === 'CHECKOUT' && (
            <div className="max-w-4xl mx-auto space-y-4">
                <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-600">
                    <h3 className="font-bold text-lg mb-4 text-gray-800 uppercase text-xs tracking-widest">Shipping Details</h3>
                    <div className="p-4 bg-gray-50 rounded border border-dashed border-gray-300">
                        <p className="font-bold mb-1">Akshay Verma</p>
                        <p className="text-gray-600 text-sm">123, Green Park, South Delhi, Delhi, India - 110016</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center">
                    <h3 className="text-xl font-black mb-2">Grand Total: ₹{checkoutTotal.toLocaleString()}</h3>
                    <button onClick={placeOrder} className="bg-orange-600 text-white px-12 py-3 rounded-sm font-bold uppercase tracking-widest shadow-lg mt-4 hover:brightness-105 transition-all">Confirm & Pay</button>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold">Secure SSL Encrypted Payment</p>
                </div>
            </div>
        )}
      </main>

      <footer className="bg-[#172337] text-white pt-12 pb-8 mt-auto border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
           <p className="text-xs opacity-50 font-medium">© 2025 NOVYXA.COM | ALL RIGHTS RESERVED.</p>
           <div className="flex justify-center gap-6 mt-6 grayscale opacity-30">
              <ShieldCheck size={20} />
              <Truck size={20} />
              <Package size={20} />
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;