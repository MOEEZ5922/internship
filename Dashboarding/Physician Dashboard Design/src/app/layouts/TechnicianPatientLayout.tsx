import { Outlet, Link, useLocation, useParams } from 'react-router';
import { patientInfo } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function TechnicianPatientLayout() {
  const location = useLocation();
  const { patientId } = useParams();

  const tabs = [
    { name: 'Clinical Summary', href: `/technician/patient/${patientId}` },
    { name: 'Trends', href: `/technician/patient/${patientId}/trends` },
    { name: 'Biomarkers', href: `/technician/patient/${patientId}/biomarkers` },
    { name: 'Interventions', href: `/technician/patient/${patientId}/interventions` },
    { name: 'Surveys', href: `/technician/patient/${patientId}/surveys` },
    { name: 'AI Analysis', href: `/technician/patient/${patientId}/ai-analysis` },
    { name: 'Biomarker Devices', href: `/technician/patient/${patientId}/devices` },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* Patient Context Header */}
      <div className="bg-white border-b border-[#E8EEF2] px-8 py-4">
        <Link to="/technician" className="flex items-center gap-2 text-[#F4A261] hover:underline mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Queue
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Patient Name</p>
              <p className="font-semibold text-[#0A1128]">{patientInfo.name}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Address</p>
              <p className="text-[#0A1128]">{patientInfo.address}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Machine Serial</p>
              <p className="text-[#0A1128] font-mono text-sm">{patientInfo.machineSerial}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Current Mask</p>
              <p className="text-[#0A1128]">{patientInfo.maskType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tab Navigation */}
      <div className="bg-white border-b border-[#E8EEF2] px-8 shrink-0">
        <nav className="flex gap-8 -mb-px">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.href;
            return (
              <Link
                key={tab.name}
                to={tab.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  isActive 
                    ? 'border-[#F4A261] text-[#F4A261]' 
                    : 'border-transparent text-[#5A6B7C] hover:text-[#0A1128] hover:border-[#E8EEF2]'
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
