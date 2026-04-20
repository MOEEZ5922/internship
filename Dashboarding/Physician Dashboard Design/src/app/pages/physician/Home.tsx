import { physicianQueue } from '../../data/mockData';
import { AlertTriangle, Calendar, ChevronRight, Activity, Search, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import SummaryContent from '../../components/SummaryContent';

export default function PhysicianHome() {
  const [activeTab, setActiveTab] = useState<'urgent' | 'annual'>('urgent');
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(physicianQueue.urgent[0]?.id || null);

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-[#E76F51]';
    if (score >= 70) return 'text-[#F4A261]';
    return 'text-[#6A994E]';
  };

  return (
    <div className="flex h-full bg-[#FAFAFA] overflow-hidden">
      
      {/* Left Pane: Patient List (Master) */}
      <div className="w-1/3 xl:w-1/4 border-r border-[#E8EEF2] bg-white flex flex-col min-w-[380px]">
        {/* Header with Search/Filter */}
        <div className="p-6 border-b border-[#E8EEF2] space-y-4">
          <div>
            <h1 className="text-xl font-bold text-[#0A1128]">Exception Inbox</h1>
            <p className="text-xs text-[#5A6B7C]">AI-filtered clinical escalations</p>
          </div>
          
          <div className="flex gap-2 bg-[#E8EEF2]/50 p-1 rounded-lg">
            <button
              onClick={() => {
                setActiveTab('urgent');
                setSelectedPatientId(physicianQueue.urgent[0]?.id || null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'urgent' ? 'bg-white shadow text-[#E76F51]' : 'text-[#5A6B7C]'}`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Urgent ({physicianQueue.urgent.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('annual');
                setSelectedPatientId(physicianQueue.annualReviews[0]?.id || null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 ${activeTab === 'annual' ? 'bg-white shadow text-[#2D9596]' : 'text-[#5A6B7C]'}`}
            >
              <Calendar className="w-3.5 h-3.5" /> Reviews ({physicianQueue.annualReviews.length})
            </button>
          </div>
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'urgent' ? (
            <div className="divide-y divide-[#E8EEF2]">
              {physicianQueue.urgent.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-5 cursor-pointer transition-all border-l-4 ${
                    selectedPatientId === patient.id 
                      ? 'bg-[#E8EEF2]/30 border-[#E76F51]' 
                      : 'border-transparent hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#0A1128]">{patient.patientName}</h3>
                    <span className={`text-xs font-bold ${getRiskColor(patient.riskScore)}`}>
                      {patient.riskScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-[#E76F51] font-medium mb-2 line-clamp-1">
                    {patient.reason}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#5A6B7C]">
                    <span>Escalated {patient.daysActive}d ago</span>
                    <span className="bg-[#E8EEF2] px-2 py-0.5 rounded font-medium uppercase tracking-tight">
                      {patient.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-[#E8EEF2]">
               {physicianQueue.annualReviews.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-5 cursor-pointer transition-all border-l-4 ${
                    selectedPatientId === patient.id 
                      ? 'bg-[#E8EEF2]/30 border-[#2D9596]' 
                      : 'border-transparent hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#0A1128]">{patient.patientName}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      patient.status === 'Overdue' ? 'bg-[#E76F51] text-white' : 'bg-[#F4A261] text-white'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#5A6B7C]">
                    <span>Due in {patient.daysUntilDue}d</span>
                    <span className="font-medium">Risk: {patient.riskScore}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Quick Review Detail (Detail) */}
      <div className="flex-1 bg-white flex flex-col overflow-hidden">
        {selectedPatientId ? (
          <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Split Pane Header */}
            <div className="p-6 border-b border-[#E8EEF2] flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2D9596]/10 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#2D9596]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#0A1128]">
                    {activeTab === 'urgent' 
                      ? physicianQueue.urgent.find(p => p.id === selectedPatientId)?.patientName 
                      : physicianQueue.annualReviews.find(p => p.id === selectedPatientId)?.patientName}
                  </h2>
                  <p className="text-xs text-[#5A6B7C]">
                    Clinical Decision Support Overview
                  </p>
                </div>
              </div>
              <Link
                to={`/physician/patient/${selectedPatientId}`}
                className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#247a7b] transition-all font-bold text-sm shadow-md"
              >
                Full Patient View
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Embedded Summary Content */}
            <div className="flex-1 overflow-auto bg-[#FAFAFA]">
              <SummaryContent patientId={selectedPatientId.toString()} isCompact={true} />
              
              <div className="p-8 pb-12">
                 <p className="text-[10px] text-center text-[#5A6B7C] uppercase tracking-widest leading-relaxed">
                   AI Exception Filtering Active • Lindē Clinical Platform v4.0
                 </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#5A6B7C]">
            <Activity className="w-16 h-16 opacity-10 mb-6" />
            <h2 className="text-xl font-bold text-[#0A1128] mb-2">No Patient Selected</h2>
            <p className="text-sm max-w-xs leading-relaxed">
              Select a patient from the exception list to start your 2-minute clinical review.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
