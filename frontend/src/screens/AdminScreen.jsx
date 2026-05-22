import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // Use Outlet for nested routes
import AllBookings from '../components/AllBookings';

const AdminScreen = () => {
  const [activeTab, setActiveTab] = useState('Users');
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === 'Users') navigate('/admin/users');
    if (tab === 'AddHotel') navigate('/admin/add-hotel');
    if (tab === 'Hotels') navigate('/admin/hotels');
    if (tab === 'Bookings') navigate('/admin/bookings');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6 text-center">Admin Dashboard</h1>
        <nav className="flex flex-col flex-grow p-4 space-y-2">
          <button 
            onClick={() => handleNavigation('Users')} 
            className={`p-3 rounded-lg ${activeTab === 'Users' ? 'bg-blue-600' : 'hover:bg-blue-700'} transition duration-200`}
          >
            Users
          </button>
          <button 
            onClick={() => handleNavigation('AddHotel')} 
            className={`p-3 rounded-lg ${activeTab === 'AddHotel' ? 'bg-blue-600' : 'hover:bg-blue-700'} transition duration-200`}
          >
            Add Hotel
          </button>
          <button 
            onClick={() => handleNavigation('Hotels')} 
            className={`p-3 rounded-lg ${activeTab === 'Hotels' ? 'bg-blue-600' : 'hover:bg-blue-700'} transition duration-200`}
          >
            Hotels
          </button>
          <button 
            onClick={() => handleNavigation('Bookings')} 
            className={`p-3 rounded-lg ${activeTab === 'Bookings' ? 'bg-blue-600' : 'hover:bg-blue-700'} transition duration-200`}
          >
            Bookings
          </button>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-grow p-8 overflow-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;
