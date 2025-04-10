import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import { TransferOwnership as TransferOwnershipType } from '../types/IP';

const TransferOwnership: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TransferOwnershipType>({
    id: 0,
    newOwnerAddress: '',
    newOwnerDetails: {
      name: '',
      email: '',
      physicalAddress: '',
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof TransferOwnershipType],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/transfer-ownership', formData);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      alert('Ownership transferred successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error transferring ownership:', error);
      alert('Failed to transfer ownership. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Transfer IP Ownership</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">IP ID</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Owner Address</label>
            <input
              type="text"
              name="newOwnerAddress"
              value={formData.newOwnerAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              pattern="^0x[a-fA-F0-9]{40}$"
              title="Please enter a valid Ethereum address"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">New Owner Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="newOwnerDetails.name"
                value={formData.newOwnerDetails.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="newOwnerDetails.email"
                value={formData.newOwnerDetails.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Physical Address</label>
              <input
                type="text"
                name="newOwnerDetails.physicalAddress"
                value={formData.newOwnerDetails.physicalAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Transferring...' : 'Transfer Ownership'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferOwnership;