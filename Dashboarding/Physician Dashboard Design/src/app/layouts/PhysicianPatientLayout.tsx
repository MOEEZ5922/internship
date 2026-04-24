import { Outlet, Link, useLocation, useParams } from 'react-router';
import { patientInfo } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function PhysicianPatientLayout() {
  const location = useLocation();
  const { patientId } = useParams();

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-[#E76F51]';
    if (score >= 70) return 'text-[#F4A261]';
    return 'text-[#6A994E]';
  };

  const tabs = [
    { name: 'Clinical Summary', href: `/physician/patient/${patientId}` },
    { name: 'Trends', href: `/physician/patient/${patientId}/trends` },
    { name: 'Biomarkers', href: `/physician/patient/${patientId}/biomarkers` },
    { name: 'Interventions', href: `/physician/patient/${patientId}/interventions` },
    { name: 'Surveys', href: `/physician/patient/${patientId}/surveys` },
    { name: 'AI Analysis', href: `/physician/patient/${patientId}/ai-analysis` },
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      {/* Patient Context Header */}
      <div className="bg-white border-b border-[#E8EEF2] px-8 py-4">
        <Link to="/physician" className="flex items-center gap-2 text-[#2D9596] hover:underline mb-4 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Patient Profile</p>
              <p className="font-semibold text-[#0A1128]">{patientInfo.name}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Demographics</p>
              <p className="text-[#0A1128]">{patientInfo.gender}, 47y (DOB: 06/15/78)</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Therapy Timeline</p>
              <p className="text-[#0A1128]">Started: {new Date(patientInfo.therapyStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Current Hardware</p>
              <p className="text-[#0A1128]">{patientInfo.maskType}</p>
            </div>
            <div className="w-px h-10 bg-[#E8EEF2]" />
            <div>
              <p className="text-xs text-[#5A6B7C] mb-1">Risk Score</p>
              <p className={`font-semibold ${getRiskColor(patientInfo.riskScore)}`}>
                {patientInfo.riskScore}/100
              </p>
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
                    ? 'border-[#2D9596] text-[#2D9596]' 
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
