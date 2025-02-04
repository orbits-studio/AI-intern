import React, { useState } from 'react';
import { 
  Home, 
  Settings, 
  Users, 
  FileText, 
  LogOut,
  PenTool as Tool,
  Hop as Mop,
  Star,
  Phone,
  MapPin
} from 'lucide-react';
import ServiceRegistration from './ServiceRegistration';
import ViewMode from './ViewMode';

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [currentView, setCurrentView] = useState<'dashboard' | 'register-maid' | 'register-carpenter' | 'view'>('dashboard');
  const [registeredMaids, setRegisteredMaids] = useState<any[]>([]);
  const [registeredCarpenters, setRegisteredCarpenters] = useState<any[]>([]);

  const carpenterImages = [
    "https://images.unsplash.com/photo-1622150162807-20e8607f65c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617104551722-3b2d51366400?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carpenterImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMaidRegistration = (data: any) => {
    setRegisteredMaids([...registeredMaids, { ...data, type: 'maid' }]);
    setCurrentView('dashboard');
  };

  const handleCarpenterRegistration = (data: any) => {
    setRegisteredCarpenters([...registeredCarpenters, { ...data, type: 'carpenter' }]);
    setCurrentView('dashboard');
  };

  if (currentView === 'register-maid') {
    return (
      <ServiceRegistration
        type="House Maid"
        onSubmit={handleMaidRegistration}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'register-carpenter') {
    return (
      <ServiceRegistration
        type="Carpenter"
        onSubmit={handleCarpenterRegistration}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'view') {
    return (
      <ViewMode
        maids={registeredMaids}
        carpenters={registeredCarpenters}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff5757] to-[#ff3d3d] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">Z</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('view')}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                View Mode
              </button>
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Service Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* House Maid Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="House Cleaning Service"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                  <Mop className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">House Maid</h2>
                  <p className="text-gray-600">Register and manage house maid services</p>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => setCurrentView('register-maid')}
                  className="w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Register New Maid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Carpenter Section */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="h-48 overflow-hidden relative">
              {carpenterImages.map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Carpentry Service ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-2 right-2 flex space-x-1">
                {carpenterImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mr-4">
                  <Tool className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Carpenter</h2>
                  <p className="text-gray-600">Register and manage carpenter services</p>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => setCurrentView('register-carpenter')}
                  className="w-full bg-orange-50 text-orange-600 py-2 px-4 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center space-x-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Register New Carpenter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Maids</h3>
            <p className="text-2xl font-semibold text-gray-900">{registeredMaids.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm font-medium">Total Carpenters</h3>
            <p className="text-2xl font-semibold text-gray-900">{registeredCarpenters.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
