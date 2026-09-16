import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Wallet() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'withdraw' | 'deposit'>('withdraw');
  const [method, setMethod] = useState('bkash');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');

  const handleWithdrawSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 'details') {
      setStep('otp'); // Simulate sending OTP
    } else {
      alert('Withdrawal request submitted successfully!');
      setStep('details');
      setAmount('');
      setOtp('');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Available Balance</p>
          <p className="text-2xl font-bold text-indigo-600">${user?.balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => { setActiveTab('withdraw'); setStep('details'); }}
            className={`flex-1 py-4 text-sm font-medium ${activeTab === 'withdraw' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Withdraw Funds
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-4 text-sm font-medium ${activeTab === 'deposit' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Deposit Funds
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'withdraw' ? (
            <form onSubmit={handleWithdrawSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setMethod('bkash')}
                    className={`border rounded-lg p-4 cursor-pointer text-center ${method === 'bkash' ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold' : 'border-gray-200'}`}
                  >
                    bKash Auto OTP
                  </div>
                  <div 
                    onClick={() => setMethod('bank')}
                    className={`border rounded-lg p-4 cursor-pointer text-center ${method === 'bank' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-bold' : 'border-gray-200'}`}
                  >
                    Bank Transfer
                  </div>
                </div>
              </div>

              {step === 'details' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                    <input
                      type="number"
                      required
                      min="10"
                      max={user?.balance}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter amount to withdraw"
                    />
                  </div>
                  
                  {method === 'bkash' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">bKash Account Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                        placeholder="e.g. 017XXXXXXXX"
                      />
                    </div>
                  )}
                  
                  <button type="submit" className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                    Request Withdrawal
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">An OTP has been sent to your registered bKash number to authorize this auto-withdrawal.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center tracking-widest font-bold"
                      placeholder="XXXXXX"
                      maxLength={6}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep('details')} className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
                      Cancel
                    </button>
                    <button type="submit" className="flex-1 py-3 px-4 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition">
                      Confirm Withdraw
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Select a payment gateway to deposit funds.</p>
              <button className="py-3 px-8 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                Proceed to Payment Gateway
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
