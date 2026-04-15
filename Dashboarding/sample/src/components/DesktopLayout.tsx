import React from 'react';
import { Home, Activity, Wind, FileText, Brain, Video, HelpCircle, Search, Bell, Settings, Wrench, Menu } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  role: 'physician' | 'technician';
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const DesktopLayout: React.FC<LayoutProps> = ({ role, activeTab, setActiveTab, children }) => {
  const tabs = [
    { name: 'Home', icon: Home, desc: 'Overview' },
    { name: 'CPAP', icon: Wind, desc: 'Therapy Data' },
    { name: 'Biomarkers', icon: Activity, desc: 'Physiological' },
    { name: 'Interventions', icon: Wrench, desc: 'Action Log' },
    { name: 'Medical Surveys', icon: FileText, desc: 'Assessments' },
    { name: 'AI Weekly State', icon: Brain, desc: 'Risk Models' },
    { name: 'Coaching Videos', icon: Video, desc: 'Library' },
    { name: 'Help', icon: HelpCircle, desc: 'Support' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-inner">
              S
            </div>
            <span className="text-lg font-bold text-white tracking-tight">SleepDash</span>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            {role === 'physician' ? 'Clinical Portal' : 'Operations Portal'}
          </p>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={clsx(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                  )}
                >
                  <Icon className={clsx('h-5 w-5', isActive ? 'text-indigo-200' : 'opacity-70')} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
            <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-slate-600">
              {role === 'physician' ? 'Dr' : 'T'}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-white leading-tight">
                {role === 'physician' ? 'Dr. Sarah Chen' : 'Tech. Marcus P.'}
              </span>
              <span className="text-xs text-slate-500 capitalize">{role}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
             <button className="text-slate-400 hover:text-slate-600 lg:hidden">
               <Menu className="h-6 w-6" />
             </button>
             <div className="relative group">
                <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients by ID or Name (Press '/')"
                  className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute 1 top-0 right-0 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>
            <div className="h-5 w-px bg-slate-200"></div>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-12">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DesktopLayout;
