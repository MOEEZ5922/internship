import React from 'react';
import { Home, Activity, List } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const MobileLayout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="min-h-screen bg-[#e5e5ea] flex justify-center pb-20 sm:pb-0 font-sans text-zinc-900">
      {/* Simulating an iPhone frame on desktop */}
      <div className="w-full max-w-[428px] bg-[#fbfbfd] min-h-screen sm:min-h-[926px] sm:h-[926px] sm:mt-10 sm:rounded-[3.5rem] sm:shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col sm:border-[14px] border-zinc-900">
        
        {/* iOS-style Dynamic Island / Notch Area */}
        <div className="h-14 w-full bg-transparent flex justify-center pt-3 z-50 absolute top-0 pointer-events-none">
           <div className="w-32 h-8 bg-zinc-900 rounded-full sm:flex hidden shadow-inner items-center justify-end px-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500/20 mr-1"></div>
           </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto hide-scrollbar pt-14 pb-32">
          {children}
        </main>

        {/* Bottom Tab Navigation - iOS App Style */}
        <nav className="absolute bottom-0 w-full bg-[#fbfbfd]/80 backdrop-blur-2xl border-t border-zinc-200/50 pb-8 pt-4 px-10 flex justify-between items-center sm:rounded-b-[2.5rem] z-50">
           {[
             { name: 'Home', icon: Home },
             { name: 'CPAP', icon: Activity },
             { name: 'Medical Surveys', icon: List },
           ].map((tab) => {
             const Icon = tab.icon;
             const isActive = activeTab === tab.name;
             return (
               <button
                 key={tab.name}
                 onClick={() => setActiveTab(tab.name)}
                 className="flex flex-col items-center justify-center p-2 relative group"
               >
                 <div className={clsx(
                    'absolute -top-3 w-1 h-1 rounded-full transition-all duration-300', 
                    isActive ? 'bg-zinc-900 scale-100' : 'bg-transparent scale-0'
                 )} />
                 <Icon className={clsx('h-6 w-6 transition-colors duration-300', isActive ? 'text-zinc-900 stroke-[2.5px]' : 'text-zinc-400 stroke-[2px]')} />
               </button>
             );
           })}
        </nav>
      </div>
    </div>
  );
};

export default MobileLayout;
