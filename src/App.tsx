/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import UserDashboard from './pages/user/Dashboard';
import Packages from './pages/user/Packages';
import POS from './pages/user/POS';
import Wallet from './pages/user/Wallet';
import Recharge from './pages/user/Recharge';
import Transactions from './pages/user/Transactions';

import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminWithdrawals from './pages/admin/Withdrawals';
import AdminLogin from './pages/admin/AdminLogin';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          {/* User Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="packages" element={<Packages />} />
            <Route path="pos" element={<POS />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="withdrawals" element={<AdminWithdrawals />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
