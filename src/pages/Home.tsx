import { Link } from 'react-router-dom';
import { ShieldCheck, ShoppingCart, Smartphone, Gem, Coins, Users, Globe, ArrowRight } from 'lucide-react';

export default function Home() {
  const commissions = [
    { title: 'Referral Salary', value: '5%' },
    { title: 'Team Binary Bonus', value: '20%' },
    { title: 'Customer Profit Partner', value: '19%' },
    { title: 'Team Generation Bonus', value: '5%' },
    { title: 'Profit Share Partner', value: '9%' },
    { title: 'Big Bazar Gift', value: '5%' },
    { title: 'Loan Bazar Point', value: '10%' },
    { title: 'World Reward Point', value: '5%' },
    { title: 'Umrah Hajj Point', value: '5%' },
    { title: 'Umrah Refer Withdraw', value: '5%' },
    { title: 'Dealer Commission', value: '5%' },
    { title: 'Merchant Club', value: '5%' },
  ];

  const packages = [
    { title: 'Product / Point Booking', desc: 'Buy products or book points for future purchases.', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { title: 'Investment / Share Buy', desc: 'Invest capital and buy shares to earn steady dividends.', icon: Coins, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Gold Mortgage / Gold Buy', desc: 'Secure your investment with physical gold mortgage or buying.', icon: Gem, color: 'bg-amber-100 text-amber-600' },
  ];

  const products = [
    { name: 'Premium Rice 5kg', category: 'General', price: 12, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=80' },
    { name: 'Cooking Oil 2L', category: 'General', price: 8, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80' },
    { name: 'Gold Coin (1g)', category: 'Gold', price: 65, image: 'https://images.unsplash.com/photo-1610375461246-83ff852e8152?auto=format&fit=crop&w=500&q=80' },
    { name: 'Organic Tea 500g', category: 'General', price: 5, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            <Globe className="h-6 w-6" />
            <span className="text-xl font-bold">Digital MLM</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium text-sm transition">Sign In</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition">Create Account</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              The Ultimate Digital Platform for <span className="text-indigo-600">Growth & Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Access comprehensive POS systems, mobile recharges, auto bKash withdrawals, and diverse investment packages all in one unified ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
                <Users className="h-5 w-5" /> Start Earning Today
              </Link>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <section className="py-16 px-4 bg-white border-t border-b">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Our Digital Services</h2>
              <p className="text-gray-600 mt-4">Everything you need to manage your business and payments seamlessly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 rounded-2xl border flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Recharge</h3>
                <p className="text-gray-600">Instantly top-up any mobile operator with your digital wallet balance and earn rewards.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Auto bKash OTP Withdraw</h3>
                <p className="text-gray-600">Seamlessly withdraw your earnings via our secure and automated bKash OTP integration.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl border flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">POS System (All & Gold)</h3>
                <p className="text-gray-600">Manage your sales, inventory, and point-of-sale transactions efficiently with our POS system.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Three Types of Packages</h2>
              <p className="text-gray-600 mt-4">Choose the plan that best fits your financial goals and start your journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
                  <div className={`w-14 h-14 ${pkg.color} rounded-full flex items-center justify-center mb-6`}>
                    <pkg.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{pkg.title}</h3>
                  <p className="text-gray-600">{pkg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-4">Browse our premium selection available through the POS system.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl border overflow-hidden hover:shadow-lg transition flex flex-col">
                  <div className="aspect-square bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">{product.category}</span>
                    <h3 className="font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>
                    <span className="font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
               <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition">
                 View All Products <ArrowRight className="h-4 w-4" />
               </Link>
            </div>
          </div>
        </section>

        {/* MIM Binary Plan & Commissions */}
        <section className="py-20 px-4 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">MIM Binary Plan Structure</h2>
              <p className="text-indigo-200">Unlock unparalleled earning potential through our robust network commission structure.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {commissions.map((comm, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl flex justify-between items-center hover:bg-white/20 transition cursor-default">
                  <span className="text-sm font-medium text-indigo-100">{comm.title}</span>
                  <span className="text-lg font-bold text-white bg-indigo-500/50 px-2 py-1 rounded">{comm.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Digital MLM Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
