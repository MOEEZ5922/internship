import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

interface HeaderProps {
  role: 'physician' | 'technician' | 'patient';
  setRole: (role: 'physician' | 'technician' | 'patient') => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex-1 flex">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search patients, alerts, or surveys..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 mr-4">
          <label className="text-sm text-gray-500">View As:</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-1 bg-white border"
          >
            <option value="physician">Physician</option>
            <option value="technician">Technician</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        
        <button className="text-gray-400 hover:text-gray-500 relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        </button>
        <button className="text-gray-400 hover:text-gray-500">
          <Settings className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
