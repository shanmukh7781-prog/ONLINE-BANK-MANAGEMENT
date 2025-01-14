import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';

interface TransactionFormProps {
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  onTransfer: (toAccount: number, amount: number) => void;
}

export function TransactionForm({ onDeposit, onWithdraw, onTransfer }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    switch (transactionType) {
      case 'deposit':
        onDeposit(numAmount);
        break;
      case 'withdraw':
        onWithdraw(numAmount);
        break;
      case 'transfer':
        const accountNum = parseInt(toAccount);
        if (isNaN(accountNum)) {
          alert('Please enter a valid account number');
          return;
        }
        onTransfer(accountNum, numAmount);
        break;
    }

    setAmount('');
    setToAccount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setTransactionType('deposit')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
            transactionType === 'deposit'
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowDownCircle className="w-5 h-5" />
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setTransactionType('withdraw')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
            transactionType === 'withdraw'
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ArrowUpCircle className="w-5 h-5" />
          Withdraw
        </button>
        <button
          type="button"
          onClick={() => setTransactionType('transfer')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
            transactionType === 'transfer'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <RefreshCw className="w-5 h-5" />
          Transfer
        </button>
      </div>

      <div className="space-y-4">
        {transactionType === 'transfer' && (
          <div>
            <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700">
              To Account Number
            </label>
            <input
              type="number"
              id="toAccount"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter account number"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-7 pr-12 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {transactionType === 'deposit'
            ? 'Make Deposit'
            : transactionType === 'withdraw'
            ? 'Make Withdrawal'
            : 'Send Transfer'}
        </button>
      </div>
    </form>
  );
}