import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Recharge() {
  const { user } = useAuth();
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('grameenphone');

  const operators = [
    { id: 'grameenphone', name: 'Grameenphone', color: 'bg-blue-600' },
    { id: 'banglalink', name: 'Banglalink', color: 'bg-orange-500' },
    { id: 'robi', name: 'Robi', color: 'bg-red-600' },
    { id: 'airtel', name: 'Airtel', color: 'bg-red-500' },
    { id: 'teletalk', name: 'Teletalk', color: 'bg-green-600' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Recharge of $${amount} to ${phone} (${operator}) successful!`);
    setPhone('');
    setAmount('');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Mobile Recharge</h1>
      
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Operator</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {operators.map((op) => (
                <div 
                  key={op.id}
                  onClick={() => setOperator(op.id)}
                  className={`border rounded-lg p-3 cursor-pointer text-center text-sm font-medium flex flex-col items-center gap-2 ${operator === op.id ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full ${op.color} flex items-center justify-center text-white text-xs`}>
                    {op.name.charAt(0)}
                  </div>
                  {op.name}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. 017XXXXXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500">$</span>
              <input
                type="number"
                required
                min="1"
                max={user?.balance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Available Balance: ${user?.balance.toFixed(2)}</p>
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            Proceed to Recharge
          </button>
        </form>
      </div>
    </div>
  );
}
