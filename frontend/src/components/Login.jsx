import React, { useState, useEffect } from "react";
import { ethers, verifyMessage } from "ethers"; // ethers v6
import { useNavigate } from "react-router-dom";

function Login() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setError("MetaMask not detected");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setError(null);
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

      const recoveredAddress = verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        setAuthenticated(true);
        setError(null);
        navigate("/home");
      } else {
        setError("Signature verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
    }
  };

  useEffect(() => {
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

export default Login;
