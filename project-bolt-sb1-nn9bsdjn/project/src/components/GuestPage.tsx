import React, { useState } from 'react';
import { ArrowLeft, Star, Phone, MapPin, Search } from 'lucide-react';

interface GuestPageProps {
  maids: any[];
  carpenters: any[];
  onBack: () => void;
}

function GuestPage({ maids, carpenters, onBack }: GuestPageProps) {
  const [activeTab, setActiveTab] = useState<'maids' | 'carpenters'>('maids');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = (activeTab === 'maids' ? maids : carpenters).filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Directory</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, city, or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5757] focus:border-[#ff5757]"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('maids')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'maids'
                  ? 'bg-[#ff5757] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              House Maids
            </button>
            <button
              onClick={() => setActiveTab('carpenters')}
              className={`px-4 py-2 rounded-lg font-medium ${
                activeTab === 'carpenters'
                  ? 'bg-[#ff5757] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Carpenters
            </button>
          </div>

          {/* Service Provider List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{item.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{item.area}, {item.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No {activeTab === 'maids' ? 'house maids' : 'carpenters'} found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuestPage;