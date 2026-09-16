import { useAuth } from '../../context/AuthContext';
import { COMMISSIONS } from '../../types';

export default function UserDashboard() {
  const { user } = useAuth();

  const balances = [
    { label: 'Main Balance', amount: `$${user?.balance.toFixed(2)}`, color: 'bg-indigo-500' },
    { label: 'Reward Points', amount: user?.points, color: 'bg-emerald-500' },
    { label: 'Total Earnings', amount: '$350.00', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {balances.map((b) => (
          <div key={b.label} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col">
            <span className="text-sm font-medium text-gray-500">{b.label}</span>
            <span className="text-3xl font-bold text-gray-900 mt-2">{b.amount}</span>
            <div className={`h-1 w-full ${b.color} mt-4 rounded-full opacity-75`} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your Referral Link</h2>
        <div className="flex gap-2">
          <input 
            type="text" 
            readOnly 
            value={`https://platform.com/register?ref=${user?.referralCode}`}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            Copy Link
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Platform Commission Rates</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t">
          {Object.entries(COMMISSIONS).map(([key, value]) => (
            <div key={key} className="p-4 flex justify-between items-center border-b md:border-b-0">
              <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="text-sm font-bold text-gray-900">{(value * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
