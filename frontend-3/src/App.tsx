import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterIP from './pages/RegisterIP';
import TransferOwnership from './pages/TransferOwnership';
import SearchIP from './pages/SearchIP';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/register-ip" element={
              <PrivateRoute>
                <RegisterIP />
              </PrivateRoute>
            } />
            <Route path="/transfer-ownership" element={
              <PrivateRoute>
                <TransferOwnership />
              </PrivateRoute>
            } />
            <Route path="/search" element={
              <PrivateRoute>
                <SearchIP />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;