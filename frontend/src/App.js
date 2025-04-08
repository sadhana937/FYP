// src/App.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        return setError("MetaMask not detected");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setError(null);

      //navigate('/home');

    } catch (err) {
      console.error(err);
      setError("Wallet connection failed");
    }
  };

  const authenticateWallet = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const message = `Sign in to Intellectual Property System\n\nTimestamp: ${new Date().toISOString()}`;
      const signature = await signer.signMessage(message);

      const recoveredAddress = ethers.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        setAuthenticated(true);
        setError(null);
      } else {
        setError("Signature verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
    }
  };

  useEffect(() => {
    // Check for existing wallet on load
    if (window.ethereum && window.ethereum.selectedAddress) {
      setWalletAddress(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <div className="App">
      <h1>IP Management System (Web3 Login)</h1>

      {!walletAddress ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : !authenticated ? (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          <button onClick={authenticateWallet}>Sign & Authenticate</button>
        </div>
      ) : (
        <div>
          <h3>✅ Wallet Authenticated!</h3>
          <p>Welcome, {walletAddress}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
