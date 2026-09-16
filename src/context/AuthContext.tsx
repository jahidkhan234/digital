import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: 'user' | 'admin') => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'user' | 'admin') => {
    setUser({
      id: '1',
      name: role === 'admin' ? 'Admin User' : 'Test User',
      email: role === 'admin' ? 'admin@example.com' : 'user@example.com',
      phone: '01700000000',
      role: role,
      balance: 1500,
      points: 250,
      referralCode: 'REF123',
    });
  };

  const logout = () => setUser(null);

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

