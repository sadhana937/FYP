import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import IPDetailsModal from '../components/IPDetailsModal';
import { IP } from '../types/IP';
// import { Search, Shield, Calendar, Tag } from 'lucide-react';
import { Search, Shield, Tag } from 'lucide-react';


const SearchIP: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<IP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIP, setSelectedIP] = useState<IP | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/search-ip-by-description/${encodeURIComponent(keyword.trim())}`);
      if (response.data.error) {
        setError(response.data.error);
        setSearchResults([]);
      } else {
        setSearchResults(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      setError('Failed to search IPs. Please try again.');
      console.error('Error searching IPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLicense = async (e: React.MouseEvent, ipId: string | number) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the license button
    //const incentiveAmount = prompt('Please enter the incentive amount (in ETH):');
    //if (!incentiveAmount) return;

    try {
      const response = await axios.post('http://localhost:3000/access-ip', {
        id: ipId,
//incentiveAmount,
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      alert('License request submitted successfully!');
    } catch (error) {
      console.error('Error requesting license:', error);
      alert('Failed to request license. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for IP by description..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </button>
          </form>
        </div>

        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((ip) => (
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
                    <button
                      onClick={(e) => handleRequestLicense(e, ip.id || ip._id!)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Get License
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && searchResults.length === 0 && keyword && (
          <div className="text-center text-gray-600">
            No results found for "{keyword}"
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

export default SearchIP;