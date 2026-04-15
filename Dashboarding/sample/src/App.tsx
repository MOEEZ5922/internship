import { useState } from 'react';
import DesktopLayout from './components/DesktopLayout';
import MobileLayout from './components/MobileLayout';
import PhysicianHome from './pages/Physician/PhysicianHome';
import TechnicianHome from './pages/Technician/TechnicianHome';
import PatientHome from './pages/Patient/PatientHome';
import CPAPTab from './pages/Shared/CPAPTab';
import BiomarkersTab from './pages/Shared/BiomarkersTab';
import InterventionsTab from './pages/Shared/InterventionsTab';
import SurveysTab from './pages/Shared/SurveysTab';
import AIWeeklyStateTab from './pages/Shared/AIWeeklyStateTab';
import CoachingVideosTab from './pages/Shared/CoachingVideosTab';
import HelpTab from './pages/Shared/HelpTab';

function App() {
  const [role, setRole] = useState<'physician' | 'technician' | 'patient'>('physician');
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        if (role === 'physician') return <PhysicianHome />;
        if (role === 'technician') return <TechnicianHome />;
        if (role === 'patient') return <PatientHome />;
        break;
      case 'CPAP': return <CPAPTab />;
      case 'Biomarkers': return <BiomarkersTab />;
      case 'Interventions': return <InterventionsTab />;
      case 'Medical Surveys': return <SurveysTab />;
      case 'AI Weekly State': return <AIWeeklyStateTab />;
      case 'Coaching Videos': return <CoachingVideosTab />;
      case 'Help': return <HelpTab />;
      default: return <PhysicianHome />;
    }
  };

  // Desktop Role Selector Overlay (for demo purposes)
  const RoleSelector = () => (
    <div className="fixed top-4 right-4 z-50 bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-3 border border-slate-200">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Viewing As:</span>
      <select
        value={role}
        onChange={(e) => {
          setRole(e.target.value as any);
          setActiveTab('Home');
        }}
        className="text-sm font-medium text-indigo-700 bg-indigo-50 border-0 rounded focus:ring-0 cursor-pointer outline-none"
      >
        <option value="physician">Physician</option>
        <option value="technician">Technician</option>
        <option value="patient">Patient</option>
      </select>
    </div>
  );

  return (
    <>
      <RoleSelector />
      {role === 'patient' ? (
        <MobileLayout activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent()}
        </MobileLayout>
      ) : (
        <DesktopLayout role={role} activeTab={activeTab} setActiveTab={setActiveTab}>
          {renderContent()}
        </DesktopLayout>
      )}
    </>
  );
}

export default App;
