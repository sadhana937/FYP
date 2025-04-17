import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useWallet } from '../context/WalletContext';
import Navbar from '../components/Navbar';
import { IP } from '../types/IP';
import { Plus, X } from 'lucide-react';

const RegisterIP: React.FC = () => {
  const navigate = useNavigate();
 // const { account } = useWallet();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [inventors, setInventors] = useState<string[]>([]);
  const [currentInventor, setCurrentInventor] = useState('');

  const [formData, setFormData] = useState<Partial<IP>>({
    name: '',
    description: '',
    ipType: 'Patent',
    dateOfCreation: '',
    dateOfRegistration: '',
    license: ['MIT'],
    licenseIncentive: 0,
    tags: [],
    owner: {
      name: '',
      email: '',
      physicalAddress: '',
    },
    optionalFields: {
      workType: '',
      classOfGoods: '',
      inventors: [],
      domainName: '',
      publicationDate: '',
    },
  });

 const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name.includes('.')) {
    const [parent, child] = name.split('.') as [keyof IP, string];

    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as Record<string, any> || {}), // Ensure it's an object before spreading
        [child]: value,
      },
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddInventor = () => {
    if (currentInventor.trim() && !inventors.includes(currentInventor.trim())) {
      setInventors([...inventors, currentInventor.trim()]);
      setCurrentInventor('');
    }
  };

  const handleRemoveInventor = (inventorToRemove: string) => {
    setInventors(inventors.filter(inventor => inventor !== inventorToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const finalFormData = {
        ...formData,
        tags,
        optionalFields: {
          ...formData.optionalFields,
          inventors,
        },
      };

      await axios.post('http://localhost:3000/register-ip', finalFormData);
      navigate('/');
    } catch (error) {
      console.error('Error registering IP:', error);
      alert('Failed to register IP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Register New IP</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">IP Type</label>
              <select
                name="ipType"
                value={formData.ipType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="Patent">Patent</option>
                <option value="Trademark">Trademark</option>
                <option value="Copyright">Copyright</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Creation</label>
              <input
                type="date"
                name="dateOfCreation"
                value={formData.dateOfCreation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Registration</label>
              <input
                type="date"
                name="dateOfRegistration"
                value={formData.dateOfRegistration}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">License Incentive (AVAX)</label>
            <input
              type="number"
              step="0.01"
              name="licenseIncentive"
              value={formData.licenseIncentive}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <div className="flex gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-400 hover:text-blue-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Owner Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="ownerDetails.name"
                  value={formData.owner?.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="ownerDetails.email"
                  value={formData.owner?.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Physical Address</label>
              <input
                type="text"
                name="ownerDetails.physicalAddress"
                value={formData.owner?.physicalAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Optional Fields</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Type</label>
                <input
                  type="text"
                  name="optionalFields.workType"
                  value={formData.optionalFields?.workType}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Class of Goods</label>
                <input
                  type="text"
                  name="optionalFields.classOfGoods"
                  value={formData.optionalFields?.classOfGoods}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Inventors</label>
              <div className="flex gap-2 mb-2">
                {inventors.map((inventor, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {inventor}
                    <button
                      type="button"
                      onClick={() => handleRemoveInventor(inventor)}
                      className="ml-1 text-green-400 hover:text-green-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInventor}
                  onChange={(e) => setCurrentInventor(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add an inventor"
                />
                <button
                  type="button"
                  onClick={handleAddInventor}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Domain Name</label>
                <input
                  type="text"
                  name="optionalFields.domainName"
                  value={formData.optionalFields?.domainName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Publication Date</label>
                <input
                  type="date"
                  name="optionalFields.publicationDate"
                  value={formData.optionalFields?.publicationDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register IP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterIP;