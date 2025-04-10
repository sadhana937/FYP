import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Train as Transfer, Search } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Navbar: React.FC = () => {
  const { account } = useWallet();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/register-ip" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
              <FileText className="h-5 w-5 mr-1" />
              <span>Register IP</span>
            </Link>
            <Link to="/transfer-ownership" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
              <Transfer className="h-5 w-5 mr-1" />
              <span>Transfer Ownership</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/search" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
              <Search className="h-5 w-5 mr-1" />
              <span>Search IP</span>
            </Link>
            <div className="ml-4 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 truncate max-w-[200px]">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;