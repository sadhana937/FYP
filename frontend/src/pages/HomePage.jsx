import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaPlusCircle, FaExchangeAlt } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();
  const [ips, setIps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const checkAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          fetchRegisteredIPs(accounts[0]);
        } else {
          navigate("/login");
        }
      }
    };
    checkAccount();
  }, [navigate]);

  const fetchRegisteredIPs = async (walletAddress) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ip/owner/${walletAddress}`);
      setIps(response.data);
    } catch (error) {
      console.error("Error fetching IPs:", error);
    }
  };

  const filteredIps = ips.filter(ip =>
    ip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ip.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-4">
          <Button onClick={() => navigate("/register-ip")} className="flex items-center gap-2">
            <FaPlusCircle /> Register IP
          </Button>
          <Button onClick={() => navigate("/transfer-ownership")} className="flex items-center gap-2">
            <FaExchangeAlt /> Transfer Ownership
          </Button>
        </div>
        <div className="w-1/3">
          <Input
            type="text"
            placeholder="Search registered IPs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </nav>

      <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredIps.length === 0 ? (
          <p className="text-gray-500 col-span-full">No IPs found for this wallet.</p>
        ) : (
          filteredIps.map((ip) => (
            <Card key={ip._id} className="shadow-md hover:shadow-lg transition duration-300">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{ip.title}</h2>
                <p className="text-sm text-gray-600 mb-2">{ip.description}</p>
                <p className="text-xs text-gray-400">Owner: {ip.owner}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
