export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,245', color: 'bg-indigo-500' },
    { label: 'Pending Withdrawals', value: '23', color: 'bg-yellow-500' },
    { label: 'Total Revenue', value: '$45,200', color: 'bg-green-500' },
    { label: 'Active Packages', value: '856', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow-sm border p-6 flex flex-col">
            <span className="text-sm font-medium text-gray-500">{s.label}</span>
            <span className="text-3xl font-bold text-gray-900 mt-2">{s.value}</span>
            <div className={`h-1 w-full ${s.color} mt-4 rounded-full opacity-75`} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Process Withdrawals</h3>
            <p className="text-sm text-gray-500 mt-1">Review pending bKash requests</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-500 mt-1">View and edit user profiles</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">Commission Settings</h3>
            <p className="text-sm text-gray-500 mt-1">Update MLM percentages</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium text-gray-900">System Logs</h3>
            <p className="text-sm text-gray-500 mt-1">View recent platform activity</p>
          </button>
        </div>
      </div>
    </div>
  );
}
