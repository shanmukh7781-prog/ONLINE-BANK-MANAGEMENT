import React, { useState } from 'react';
import { Building2, CircleDollarSign } from 'lucide-react';
import { TransactionForm } from './components/TransactionForm';
import { LoginForm } from './components/LoginForm';
import { CreateAccountForm } from './components/CreateAccountForm';
import { TransactionHistory } from './components/TransactionHistory';
import { formatINR } from './utils/currency';
import type { Account, AuthState, Transaction } from './types/bank';

function App() {
  const [accounts, setAccounts] = useState<Account[]>([
    { accountNumber: 2001, accountHolderName: 'Shanmukh', balance: 100000, pin: '1234' },
    { accountNumber: 2002, accountHolderName: 'Hari', balance: 250000, pin: '2345' },
    { accountNumber: 2003, accountHolderName: 'Mukesh', balance: 300000, pin: '3456' },
    { accountNumber: 2004, accountHolderName: 'Abhiram', balance: 150000, pin: '4567' },
  ]);

  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    currentAccount: null,
  });

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleLogin = (account: Account) => {
    setAuth({
      isAuthenticated: true,
      currentAccount: account,
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      currentAccount: null,
    });
    setTransactions([]);
  };

  const handleCreateAccount = (newAccount: Omit<Account, 'accountNumber'>) => {
    const maxAccountNumber = Math.max(...accounts.map(acc => acc.accountNumber));
    const account: Account = {
      ...newAccount,
      accountNumber: maxAccountNumber + 1,
    };
    
    setAccounts([...accounts, account]);
    setShowCreateAccount(false);
    handleLogin(account);
  };

  const addTransaction = (type: Transaction['type'], amount: number, toAccount?: number) => {
    const newTransaction: Transaction = {
      type,
      amount,
      timestamp: Date.now(),
      toAccount,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeposit = (amount: number) => {
    if (!auth.currentAccount) return;

    setAccounts(accounts.map(account => 
      account.accountNumber === auth.currentAccount?.accountNumber
        ? { ...account, balance: account.balance + amount }
        : account
    ));
    addTransaction('deposit', amount);
  };

  const handleWithdraw = (amount: number) => {
    if (!auth.currentAccount) return;

    if (auth.currentAccount.balance < amount) {
      alert('Insufficient funds');
      return;
    }

    setAccounts(accounts.map(account => 
      account.accountNumber === auth.currentAccount?.accountNumber
        ? { ...account, balance: account.balance - amount }
        : account
    ));
    addTransaction('withdraw', amount);
  };

  const handleTransfer = (toAccountNumber: number, amount: number) => {
    if (!auth.currentAccount) return;

    const toAccount = accounts.find(acc => acc.accountNumber === toAccountNumber);
    
    if (!toAccount) {
      alert('Recipient account not found');
      return;
    }

    if (auth.currentAccount.balance < amount) {
      alert('Insufficient funds');
      return;
    }

    if (toAccountNumber === auth.currentAccount.accountNumber) {
      alert('Cannot transfer to the same account');
      return;
    }

    setAccounts(accounts.map(account => {
      if (account.accountNumber === auth.currentAccount?.accountNumber) {
        return { ...account, balance: account.balance - amount };
      }
      if (account.accountNumber === toAccountNumber) {
        return { ...account, balance: account.balance + amount };
      }
      return account;
    }));
    addTransaction('transfer', amount, toAccountNumber);
  };

  if (!auth.isAuthenticated) {
    if (showCreateAccount) {
      return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
          <CreateAccountForm
            onCreateAccount={handleCreateAccount}
            onCancel={() => setShowCreateAccount(false)}
          />
        </div>
      );
    }
    return (
      <LoginForm
        accounts={accounts}
        onLogin={handleLogin}
        onCreateAccount={() => setShowCreateAccount(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Bank Management System</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {auth.currentAccount && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <CircleDollarSign className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Your Account</h2>
                    <p className="text-blue-100">
                      {auth.currentAccount.accountHolderName} - #{auth.currentAccount.accountNumber}
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold">{formatINR(auth.currentAccount.balance)}</p>
              </div>
              
              <TransactionHistory transactions={transactions} />
            </div>

            <div>
              <TransactionForm
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
                onTransfer={handleTransfer}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;