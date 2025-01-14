export interface Account {
  accountNumber: number;
  accountHolderName: string;
  balance: number;
  pin: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentAccount: Account | null;
}

export interface Transaction {
  type: 'deposit' | 'withdraw' | 'transfer';
  amount: number;
  timestamp: number;
  toAccount?: number;
}

export type TransactionType = 'deposit' | 'withdraw' | 'transfer' | 'balance' | 'create';