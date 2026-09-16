import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Rice 5kg', category: 'All', price: 12, stock: 45, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
  { id: '2', name: 'Cooking Oil 2L', category: 'All', price: 8, stock: 30, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80' },
  { id: '3', name: 'Gold Coin (1 Gram)', category: 'Gold', price: 65, stock: 10, image: 'https://images.unsplash.com/photo-1610375461246-83ff852e8152?auto=format&fit=crop&w=500&q=80' },
  { id: '4', name: 'Detergent Powder 1kg', category: 'All', price: 4, stock: 100, image: 'https://images.unsplash.com/photo-1585909695026-b51f03803ac1?auto=format&fit=crop&w=500&q=80' },
  { id: '5', name: '24K Gold Biscuit (10g)', category: 'Gold', price: 650, stock: 3, image: 'https://images.unsplash.com/photo-1610375461246-83ff852e8152?auto=format&fit=crop&w=500&q=80' },
  { id: '6', name: 'Organic Tea 500g', category: 'All', price: 5, stock: 60, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
];

export default function POS() {
  const { user, updateBalance } = useAuth();
  const [cart, setCart] = useState<{product: Product, qty: number}[]>([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => 
    (filter === 'All' ? true : p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (user && user.balance < total) {
      alert("Insufficient wallet balance for this POS purchase.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      updateBalance(-total);
      setCart([]);
      setIsProcessing(false);
      alert("Transaction successful! Receipt has been generated.");
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-8rem)]">
      {/* Products Area */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border overflow-hidden min-h-[600px] lg:min-h-0">
        <div className="p-4 border-b space-y-4">
          <div className="flex gap-4">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${filter === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              General POS
            </button>
            <button 
              onClick={() => setFilter('Gold')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${filter === 'Gold' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Gold POS
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="border rounded-xl cursor-pointer hover:border-indigo-500 hover:shadow-md transition bg-white flex flex-col overflow-hidden"
              >
                <div className="w-full aspect-square bg-gray-100 relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm flex-1 leading-tight">{product.name}</h3>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-96 flex-shrink-0 bg-white rounded-2xl shadow-sm border flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Current Order
          </h2>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
            {cart.length} items
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{item.product.name}</h4>
                  <p className="text-indigo-600 font-bold text-sm">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg border px-1">
                  <button onClick={() => updateQty(item.product.id, -1)} className="p-1 text-gray-500 hover:text-gray-900">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} className="p-1 text-gray-500 hover:text-gray-900">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0 || isProcessing}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
              cart.length === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
            }`}
          >
            {isProcessing ? (
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : (
              <>
                <CreditCard className="h-5 w-5" /> Pay via Wallet
              </>
            )}
          </button>
          {user && (
            <p className="text-center text-xs text-gray-500 mt-3">
              Wallet Balance: <span className={user.balance < total ? 'text-red-500 font-bold' : ''}>${user.balance.toFixed(2)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
