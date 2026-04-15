import React from 'react';
import { Home, Activity, Wind, FileText, Brain, Video, HelpCircle, UserRound } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  role: 'physician' | 'technician' | 'patient';
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'CPAP', icon: Wind },
    { name: 'Biomarkers', icon: Activity },
    { name: 'Interventions', icon: UserRound },
    { name: 'Medical Surveys', icon: FileText },
    { name: 'AI Weekly State', icon: Brain },
    { name: 'Coaching Videos', icon: Video },
    { name: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-xl font-bold text-blue-600">SleepDashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <li key={tab.name}>
                <button
                  onClick={() => setActiveTab(tab.name)}
                  className={clsx(
                    'w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150',
                    isActive 
                      ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-r-4 border-transparent'
                  )}
                >
                  <Icon className={clsx('mr-3 h-5 w-5', isActive ? 'text-blue-600' : 'text-gray-400')} />
                  {tab.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {role.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 capitalize">{role} View</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
