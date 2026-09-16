import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';

export default function Packages() {
  const { user, updateBalance } = useAuth();
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const packages = [
    {
      id: 'product',
      title: 'Product Purchase / Point Booking',
      description: 'Buy products directly or book points for future purchases.',
      price: 50,
      priceStr: '$50.00',
      features: ['Physical product delivery', 'Earn points', 'Eligible for retail profit'],
      color: 'border-blue-200 bg-blue-50',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      id: 'investment',
      title: 'Investment / Share Buy',
      description: 'Invest capital and buy shares to earn dividends and profit share.',
      price: 500,
      priceStr: '$500.00',
      features: ['9% Profit Share Partner', 'Monthly dividends', 'Voting rights'],
      color: 'border-emerald-200 bg-emerald-50',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    {
      id: 'gold',
      title: 'Gold Mortgage / Gold Buy',
      description: 'Secure your investment with physical gold or mortgage existing gold.',
      price: 1000,
      priceStr: 'Market Rate ($1000)',
      features: ['Secure asset backing', 'Low risk', 'Redeemable anytime'],
      color: 'border-amber-200 bg-amber-50',
      btnColor: 'bg-amber-600 hover:bg-amber-700 text-white'
    }
  ];

  const handlePurchase = (pkgId: string, price: number) => {
    if (!user) return;
    
    if (user.balance < price) {
      alert("Insufficient balance to purchase this package. Please deposit funds.");
      return;
    }

    setSelectedPkg(pkgId);
    setIsProcessing(true);
    setSuccessMsg('');

    // Simulate API Call
    setTimeout(() => {
      updateBalance(-price);
      setIsProcessing(false);
      setSuccessMsg(`Successfully purchased the package! ${price} has been deducted from your wallet.`);
      
      setTimeout(() => {
        setSelectedPkg(null);
        setSuccessMsg('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Packages</h1>
          <p className="text-gray-600">Select a package to start earning commissions and bonuses.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-500">Your Balance</p>
          <p className="text-2xl font-bold text-indigo-600">${user?.balance.toFixed(2)}</p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center text-green-800">
          <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="font-medium">{successMsg}</p>
        </div>
      )}

      {user && user.balance < 50 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center text-amber-800">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="font-medium text-sm">Your balance is low. Please go to your wallet to deposit funds before buying a package.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className={`rounded-2xl border-2 p-6 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg ${pkg.color}`}>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
            <p className="text-gray-700 text-sm mb-4 flex-1">{pkg.description}</p>
            <div className="text-3xl font-bold text-gray-900 mb-6">{pkg.priceStr}</div>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start">
                  <CheckCircle className="w-5 h-5 text-gray-900 mr-2 flex-shrink-0 opacity-60" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handlePurchase(pkg.id, pkg.price)}
              disabled={isProcessing && selectedPkg === pkg.id}
              className={`w-full py-4 px-4 rounded-xl font-bold transition flex justify-center items-center gap-2 ${pkg.btnColor} ${isProcessing && selectedPkg === pkg.id ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isProcessing && selectedPkg === pkg.id ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Purchase Now
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
