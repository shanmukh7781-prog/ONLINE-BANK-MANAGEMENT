import React from 'react';
import { Clock, ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { formatINR } from '../utils/currency';
import type { Transaction } from '../types/bank';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle className="w-5 h-5 text-green-500" />;
      case 'withdraw':
        return <ArrowUpCircle className="w-5 h-5 text-red-500" />;
      case 'transfer':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Transaction History</h2>
      </div>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getIcon(transaction.type)}
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'deposit' ? 'text-green-600' :
                  transaction.type === 'withdraw' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'} {formatINR(transaction.amount)}
                </p>
                {transaction.type === 'transfer' && transaction.toAccount && (
                  <p className="text-sm text-gray-500">
                    To: Account #{transaction.toAccount}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}