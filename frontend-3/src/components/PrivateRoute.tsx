import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;