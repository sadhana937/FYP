import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Wallet } from 'lucide-react';

const Login: React.FC = () => {
  const { connectWallet, isConnected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isConnected) {
      navigate('/', { replace: true });
    }
  }, [isConnected, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            IP Management System
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect your MetaMask wallet to continue
          </p>
        </div>
        <button
          onClick={connectWallet}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Wallet className="h-5 w-5 mr-2" />
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default Login;