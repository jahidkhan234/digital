import { useState } from 'react';

export default function AdminWithdrawals() {
  const [requests, setRequests] = useState([
    { id: 'WR-001', user: 'John Doe', method: 'bKash', details: '01711111111', amount: '$150.00', date: '2026-09-15 10:30 AM', status: 'pending' },
    { id: 'WR-002', user: 'Jane Smith', method: 'Bank Transfer', details: 'Acc: 123456789', amount: '$500.00', date: '2026-09-14 02:15 PM', status: 'pending' },
    { id: 'WR-003', user: 'Test User', method: 'bKash', details: '01644444444', amount: '$50.00', date: '2026-09-13 11:45 AM', status: 'completed' },
  ]);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action === 'approve' ? 'completed' : 'rejected' } : req
    ));
    alert(`Request ${id} has been ${action === 'approve' ? 'approved' : 'rejected'}.`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID / Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method & Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.id}</div>
                    <div className="text-sm text-gray-500">{req.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{req.method}</div>
                    <div className="text-sm text-gray-500">{req.details}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{req.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      req.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {req.status === 'pending' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleAction(req.id, 'approve')}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, 'reject')}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
