export type Role = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  balance: number;
  points: number;
  referralCode: string;
  referredBy?: string;
}

export interface Package {
  id: string;
  name: string;
  type: 'product' | 'investment' | 'gold';
  price: number;
  dailyReturn?: number;
  description: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdraw' | 'recharge' | 'commission' | 'package_buy';
  status: 'pending' | 'completed' | 'rejected';
  method?: string; // e.g., bKash, Nagad
  date: string;
  details?: string;
}

export const COMMISSIONS = {
  referralSalary: 0.05,
  teamBinaryBonus: 0.20,
  customerProfitPartner: 0.19,
  teamGenerationBonus: 0.05,
  profitSharePartner: 0.09,
  bigBazarGift: 0.05,
  loanBazarPoint: 0.10,
  worldRewardPoint: 0.05,
  umrahHajjPoint: 0.05,
  umrahReferWithdraw: 0.05,
  dealerCommission: 0.05,
  merchantClub: 0.05,
};
