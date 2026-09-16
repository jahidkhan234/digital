import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Wallet, 
  Smartphone, 
  History, 
  Users, 
  LogOut, 
  Menu,
  X,
  ShieldCheck,
  ShoppingCart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.role === 'admin';

  if (location.pathname.startsWith('/admin') && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Packages', path: '/dashboard/packages', icon: Package },
    { name: 'POS System', path: '/dashboard/pos', icon: ShoppingCart },
    { name: 'Deposit/Withdraw', path: '/dashboard/wallet', icon: Wallet },
    { name: 'Mobile Recharge', path: '/dashboard/recharge', icon: Smartphone },
    { name: 'Transactions', path: '/dashboard/transactions', icon: History },
  ];

  const adminLinks = [
    { name: 'Admin Panel', path: '/admin', icon: ShieldCheck },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Withdrawal Requests', path: '/admin/withdrawals', icon: Wallet },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-20 flex items-center justify-between px-4">
        <span className="text-xl font-bold text-indigo-600">Digital MLM</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        "fixed inset-y-0 left-0 z-10 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
        isSidebarOpen ? "translate-x-0 pt-16 lg:pt-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-center border-b hidden lg:flex">
          <span className="text-2xl font-bold text-indigo-600">Digital MLM</span>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100vh-4rem)]">
          <div className="mb-6 px-4 py-3 bg-indigo-50 rounded-lg">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-indigo-600 mt-1 uppercase tracking-wide">{user.role}</p>
          </div>

          <nav className="flex-1 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={clsx(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-indigo-600 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 mt-auto"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-0 overflow-y-auto h-screen">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
