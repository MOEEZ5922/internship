import { Outlet, Link, useLocation } from 'react-router';
import { Home, Activity, Package, FileText, HelpCircle, Video } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/patient', icon: Home },
  { name: 'Sleep', href: '/patient/cpap', icon: Activity },
  { name: 'Equipment', href: '/patient/interventions', icon: Package },
  { name: 'Surveys', href: '/patient/surveys', icon: FileText },
  { name: 'Videos', href: '/patient/videos', icon: Video },
  { name: 'Help', href: '/patient/help', icon: HelpCircle },
];

export default function PatientLayout() {
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-[#FAFAFA] to-[#E8EEF2]">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#6A994E] to-[#2D9596] px-6 py-6 text-white">
        <Link to="/" className="text-white/80 hover:text-white text-sm mb-3 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl mb-1">
          Good Evening, Sarah
        </h1>
        <p className="text-white/90">Let's check your sleep progress</p>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8EEF2] px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around max-w-2xl mx-auto">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (location.pathname === '/patient' && item.href === '/patient');
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all min-w-[80px] ${
                  isActive
                    ? 'text-[#6A994E]'
                    : 'text-[#414D5B]'
                }`}
              >
                <Icon className={`w-7 h-7 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[13px] font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}