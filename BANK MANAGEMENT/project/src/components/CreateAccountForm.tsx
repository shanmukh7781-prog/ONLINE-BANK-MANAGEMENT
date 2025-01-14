import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import type { Account } from '../types/bank';

interface CreateAccountFormProps {
  onCreateAccount: (account: Omit<Account, 'accountNumber'>) => void;
  onCancel: () => void;
}

export function CreateAccountForm({ onCreateAccount, onCancel }: CreateAccountFormProps) {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    onCreateAccount({
      accountHolderName: name,
      balance: 0,
      pin
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Create New Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
            PIN (4 digits)
          </label>
          <input
            type="password"
            id="pin"
            required
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700">
            Confirm PIN
          </label>
          <input
            type="password"
            id="confirmPin"
            required
            maxLength={4}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}