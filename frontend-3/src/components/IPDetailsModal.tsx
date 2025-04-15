import React from 'react';
import { IP } from '../types/IP';
import {
  X,
  Calendar,
  Tag,
  Shield,
  Mail,
  MapPin,
  Book,
  Users,
  Globe,
  Calendar as PublishIcon,
} from 'lucide-react';

interface IPDetailsModalProps {
  ip: IP;
  onClose: () => void;
}

const IPDetailsModal: React.FC<IPDetailsModalProps> = ({ ip, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">IP Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-4 space-y-6">
          {/* IP Overview */}
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{ip.name}</h3>
              <p className="text-gray-600 mt-2">{ip.description}</p>
            </div>
          </div>

          {/* Date Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Created: {ip.dateOfCreation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">Registered: {ip.dateOfRegistration}</span>
            </div>
          </div>

          {/* Owner Details */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Owner Details</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{ip.ownerDetails?.name || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{ip.ownerDetails?.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{ip.ownerDetails?.physicalAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          {ip.optionalFields && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ip.optionalFields.workType && (
                  <div className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Work Type: {ip.optionalFields.workType}</span>
                  </div>
                )}
                {ip.optionalFields.classOfGoods && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Class of Goods: {ip.optionalFields.classOfGoods}</span>
                  </div>
                )}
                {ip.optionalFields.domainName && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Domain: {ip.optionalFields.domainName}</span>
                  </div>
                )}
                {ip.optionalFields.publicationDate && (
                  <div className="flex items-center gap-2">
                    <PublishIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-600">Published: {ip.optionalFields.publicationDate}</span>
                  </div>
                )}
              </div>
              {ip.optionalFields.inventors && ip.optionalFields.inventors.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Inventors</h5>
                  <div className="flex flex-wrap gap-2">
                    {ip.optionalFields.inventors.map((inventor, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {inventor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* License Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">License</h4>
                <p className="text-gray-600">
                  License: {Array.isArray(ip.license) ? ip.license.join(', ') : ip.license || 'N/A'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">License Incentive</p>
                <p className="text-lg font-semibold text-blue-600">{ip.licenseIncentive} AVAX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPDetailsModal;
