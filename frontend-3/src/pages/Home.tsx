import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import IPDetailsModal from '../components/IPDetailsModal';
// import IPDetailsModalContainer from '../components/IPDetailsModalContainer';
import { IP } from '../types/IP';
//import { Shield, Calendar, Tag } from 'lucide-react';
import { Shield, Tag } from 'lucide-react';
// import IPDetailsModalContainer from '../components/IPDetailsModalContainer';


const Home: React.FC = () => {
  const { account } = useWallet();
  const [ips, setIps] = useState<IP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIP, setSelectedIP] = useState<IP | null>(null);
//const [selectedId, setSelectedId] = useState<number | null>(null);
//const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchIPs = async () => {
      try {
        if (!account) return;
        const response = await axios.get(`http://localhost:3000/get-ips-by-owner/${account}`);
        if (response.data.error) {
          setError(response.data.error);
          setIps([]);
        } else {
          setIps(response.data);
        }
      } catch (err) {
        setError('Failed to fetch IPs. Please try again later.');
        console.error('Error fetching IPs:', err);
      } finally {
        setLoading(false);
      }
    };

    if (account) {
      fetchIPs();
    }
  }, [account]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Intellectual Property</h1>
        {ips.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">You don't have any registered IPs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ips.map((ip) => (
              <div 
                key={ip.id || ip._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
onClick={() => setSelectedIP(ip)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-600 mr-2" />
                    <h2 className="text-xl font-semibold text-gray-900">{ip.name}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{ip.description}</p>
                  {/* <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">
                      Registered: {ip.dateOfRegistration || ip.registrationDate}
                    </span>
                  </div> */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ip.tags && ip.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      License: {Array.isArray(ip.license) ? ip.license.join(', ') : ip.license}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      {ip.licenseIncentive} AVAX
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  {selectedIP && ( 
        <IPDetailsModal
          ip={selectedIP}
          onClose={() => setSelectedIP(null)}
        />
      )}
    </div>
  );
};

export default Home;