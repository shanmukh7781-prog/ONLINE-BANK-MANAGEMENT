import React from 'react';
import { CreditCard } from 'lucide-react';
import type { Account } from '../types/bank';

interface AccountCardProps {
  account: Account;
  isSelected?: boolean;
  onClick?: () => void;
}

export function AccountCard({ account, isSelected, onClick }: AccountCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <CreditCard className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{account.accountHolderName}</h3>
          <p className="text-sm text-gray-500">Account #{account.accountNumber}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600">Current Balance</p>
        <p className="text-2xl font-bold text-gray-900">
          ${account.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}