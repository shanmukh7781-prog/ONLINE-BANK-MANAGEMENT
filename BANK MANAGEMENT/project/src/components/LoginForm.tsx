import React, { useState } from 'react';
import { Lock, UserPlus, Info } from 'lucide-react';
import type { Account } from '../types/bank';

interface LoginFormProps {
  accounts: Account[];
  onLogin: (account: Account) => void;
  onCreateAccount: () => void;
}

export function LoginForm({ accounts, onLogin, onCreateAccount }: LoginFormProps) {
  const [accountNumber, setAccountNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = accounts.find(acc => acc.accountNumber === parseInt(accountNumber));
    
    if (!account) {
      setError('Account not found');
      return;
    }

    if (account.pin !== pin) {
      setError('Invalid PIN');
      return;
    }

    onLogin(account);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="mt-2 flex items-center gap-2 mx-auto text-sm text-blue-600 hover:text-blue-800"
          >
            <Info className="w-4 h-4" />
            {showDemo ? 'Hide Demo Credentials' : 'Show Demo Credentials'}
          </button>
          {showDemo && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Accounts:</h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>Account: 2001 | PIN: 1234 | Holder: Shanmukh</p>
                <p>Account: 2002 | PIN: 2345 | Holder: Hari</p>
                <p>Account: 2003 | PIN: 3456 | Holder: Mukesh</p>
                <p>Account: 2004 | PIN: 4567 | Holder: Abhiram</p>
              </div>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="number"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Account Number"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="PIN"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onCreateAccount}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create New Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}