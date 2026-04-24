import { useState } from 'react';
import { technicianEvents, technicianQueue } from '../../data/mockData';
import {
  AlertTriangle,
  Droplets,
  Moon,
  Wrench,
  CheckCircle,
  XCircle,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  Search,
  Filter,
  Activity,
  ChevronRight,
  MessageSquare,
  Package as PackageIcon
} from 'lucide-react';
import { Link } from 'react-router';
import VisitPrepCard from '../../components/VisitPrepCard';
import SummaryContent from '../../components/SummaryContent';

type EventStatus = 'pending' | 'confirmed' | 'dismissed';

const eventTypeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  'Mask Leak': { icon: <Droplets className="w-5 h-5" />, color: 'text-[#E76F51]', bg: 'bg-[#E76F51]' },
  'Usage Drop': { icon: <Moon className="w-5 h-5" />, color: 'text-[#F4A261]', bg: 'bg-[#F4A261]' },
  'Missed Nights': { icon: <AlertTriangle className="w-5 h-5" />, color: 'text-[#F4A261]', bg: 'bg-[#F4A261]' },
  'Equipment Alert': { icon: <Wrench className="w-5 h-5" />, color: 'text-[#2D9596]', bg: 'bg-[#2D9596]' },
  'Patient Self-Report': { icon: <MessageSquare className="w-5 h-5" />, color: 'text-[#2D9596]', bg: 'bg-[#2D9596]' },
};


export default function TechnicianHome() {
  const [activeTab, setActiveTab] = useState<'events' | 'queue'>('events');
  const [statusMap, setStatusMap] = useState<Record<number, EventStatus>>(
    Object.fromEntries(technicianEvents.map(e => [e.id, 'pending']))
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(technicianEvents.filter(e => statusMap[e.id] === 'pending')[0]?.id || null);
  const [selectedQueuePatientId, setSelectedQueuePatientId] = useState<number | null>(technicianQueue[0]?.id || null);

  const [dismissingId, setDismissingId] = useState<number | null>(null);
  const [dismissReason, setDismissReason] = useState('');

  const pending = technicianEvents.filter(e => statusMap[e.id] === 'pending');
  const confirmed = technicianEvents.filter(e => statusMap[e.id] === 'confirmed');

  const handleConfirm = (id: number) => {
    setStatusMap(prev => ({ ...prev, [id]: 'confirmed' }));
    // We stay on the current ID so the technician can see the result and perform actions
  };

  const handleDismiss = (id: number) => {
    if (!dismissReason) return;
    setStatusMap(prev => ({ ...prev, [id]: 'dismissed' }));
    setDismissingId(null);
    setDismissReason('');
    const nextPending = pending.find(e => e.id !== id);
    setSelectedEventId(nextPending?.id || null);
  };

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const selectedEvent = technicianEvents.find(e => e.id === selectedEventId);
  const selectedQueuePatient = technicianQueue.find(p => p.id === selectedQueuePatientId);

  return (
    <div className="flex flex-col h-full bg-[#FAFAFA] overflow-hidden">

      {/* Top Header / Stats Row */}
      <div className="bg-white border-b border-[#E8EEF2] px-8 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#0A1128]">Technician Workbench</h1>
          <p className="text-xs text-[#5A6B7C]">Linde Clinical Logistics Platform v4.0</p>
        </div>

        <div className="flex gap-4">
          {[
            { label: 'AI Resolved (24h)', val: '88%', color: 'text-[#6A994E]' },
            { label: 'Retention Queue', val: technicianQueue.length, color: 'text-[#2D9596]' },
            { label: 'Escalated Risks', val: technicianQueue.filter(p => p.dropoutRisk > 80).length, color: 'text-[#E76F51]' }
          ].map(stat => (
            <div key={stat.label} className="bg-[#FAFAFA] px-4 py-2 rounded-lg border border-[#E8EEF2]">
              <p className="text-[10px] uppercase font-bold text-[#5A6B7C] tracking-wide">{stat.label}</p>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="px-8 pt-4 bg-white border-b border-[#E8EEF2] shrink-0">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'events' ? 'border-[#E76F51] text-[#E76F51]' : 'border-transparent text-[#5A6B7C] hover:text-[#0A1128]'}`}
          >
            Mechanical/Self-Report Inbox ({pending.length})
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`pb-4 text-sm font-bold transition-all border-b-2 ${activeTab === 'queue' ? 'border-[#2D9596] text-[#2D9596]' : 'border-transparent text-[#5A6B7C] hover:text-[#0A1128]'}`}
          >
            Therapy Retention Queue ({technicianQueue.length})
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'events' ? (
          <div className="flex h-full animate-in fade-in duration-500">
            {/* Master List (Events) */}
            <div className="w-1/3 border-r border-[#E8EEF2] bg-white flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto divide-y divide-[#E8EEF2]">
                {technicianEvents.filter(e => statusMap[e.id] !== 'dismissed').length > 0 ? (
                  technicianEvents
                    .filter(e => statusMap[e.id] !== 'dismissed')
                    .map(event => {
                    const config = eventTypeConfig[event.type] || eventTypeConfig['Equipment Alert'];
                    const isConfirmed = statusMap[event.id] === 'confirmed';
                    return (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEventId(event.id)}
                        className={`p-6 cursor-pointer transition-all border-l-4 ${selectedEventId === event.id ? 'bg-[#E8EEF2]/30 border-[#E76F51]' : 'border-transparent hover:bg-[#FAFAFA]'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className={`p-1.5 rounded-lg ${config.bg}/10 ${config.color}`}>
                            {config.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            {isConfirmed && <CheckCircle className="w-4 h-4 text-[#6A994E]" />}
                            <span className="text-[10px] text-[#5A6B7C]">{formatTime(event.detectedAt)}</span>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-[#0A1128] mb-1">{event.patient.name}</p>
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isConfirmed ? 'text-[#6A994E]' : 'text-[#E76F51]'}`}>
                          {isConfirmed ? 'Validated' : event.type}
                        </p>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-12 text-center text-[#5A6B7C]">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="text-sm font-bold">Event Inbox Cleared</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detail Pane (Events) */}
            <div className="flex-1 bg-white overflow-auto">
              {selectedEvent ? (
                <>
                  <div className="p-10 animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${selectedEvent.severity === 'high' ? 'bg-[#E76F51] text-white' : 'bg-[#F4A261] text-white'}`}>
                            {selectedEvent.severity} Severity
                          </span>
                          <span className="text-sm text-[#5A6B7C]">Detected {formatTime(selectedEvent.detectedAt)}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-[#0A1128]">{selectedEvent.patient.name}</h2>
                      </div>
                      <Link to={`/technician/patient/${selectedEvent.patient.patientId}`} className="px-6 py-3 border-2 border-[#E8EEF2] rounded-xl font-bold text-sm hover:bg-[#FAFAFA] transition-all">
                        Full Clinical View
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-10">
                      <div className="bg-[#FAFAFA] p-8 rounded-[2rem] border border-[#E8EEF2] shadow-inner">
                        <h3 className="text-xs font-bold text-[#5A6B7C] uppercase tracking-widest mb-4">
                          {selectedEvent.type === 'Patient Self-Report' ? 'Patient-Reported Symptom' : 'AI Evidence Package'}
                        </h3>
                        <p className={`text-lg text-[#0A1128] leading-relaxed mb-4 ${selectedEvent.type === 'Patient Self-Report' ? 'bg-[#2D9596]/10 p-4 rounded-xl border border-[#2D9596]/20' : ''}`}>
                          "{selectedEvent.evidence}"
                        </p>
                        <div className="p-4 bg-white/50 rounded-xl border border-[#E8EEF2] italic text-sm text-[#5A6B7C]">
                          <span className="font-bold text-[10px] uppercase block mb-1 opacity-50">
                            {selectedEvent.type === 'Patient Self-Report' ? 'AI Support Context' : 'AI Analysis'}
                          </span>
                          {selectedEvent.aiNote}
                        </div>
                      </div>

                      {/* Unified Clinical Evidence (Synced Source) */}
                      <div className="bg-[#fdf2f0] rounded-[2rem] border border-[#E76F51]/20 p-8 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xs font-bold text-[#E76F51] uppercase tracking-widest flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5" /> High-Fidelity Clinical Rationale
                          </h3>
                          <span className="text-[10px] bg-[#E76F51]/10 text-[#E76F51] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Unified Physician View</span>
                        </div>

                        <SummaryContent 
                          patientId={selectedEvent.patient.patientId} 
                          isCompact={true} 
                          role="technician" 
                          hideHeader={true} 
                          showActions={statusMap[selectedEvent.id] === 'confirmed'} 
                        />
                      </div>
                    </div>

                    {/* Hardware Control Bar (Specialized) */}
                    {statusMap[selectedEvent.id] === 'confirmed' ? (
                      <div className="bg-[#6A994E]/10 border-2 border-[#6A994E]/30 p-6 rounded-[2rem] flex items-center justify-between animate-in zoom-in-95 duration-500">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#6A994E] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#6A994E]/20">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-[#0A1128]">Event Validated</h3>
                            <p className="text-sm text-[#5A6B7C]">AI detection confirmed. Proceed with technical action below.</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-[#6A994E] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#6A994E]/20">
                          Ready for Intervention
                        </div>
                      </div>
                    ) : dismissingId === selectedEvent.id ? (
                      <div className="bg-[#FAFAFA] p-8 rounded-[2rem] border border-[#E8EEF2]">
                        <h3 className="text-lg font-bold text-[#0A1128] mb-6">
                          {selectedEvent.type === 'Patient Self-Report' ? 'Why are you dismissing this report?' : 'Why is this a False Positive?'}
                        </h3>
                        <div className="mb-8">
                          <textarea 
                            value={dismissReason}
                            onChange={(e) => setDismissReason(e.target.value)}
                            placeholder={selectedEvent.type === 'Patient Self-Report' ? "Explain why this report is being dismissed..." : "Explain why this is a false positive (e.g. data anomaly)..."}
                            className="w-full h-32 bg-white border-2 border-[#E8EEF2] rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#5A6B7C] outline-none"
                          />
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => { setDismissingId(null); setDismissReason(''); }} className="flex-1 py-4 bg-[#E8EEF2] text-[#5A6B7C] font-bold rounded-xl">Cancel</button>
                          <button onClick={() => handleDismiss(selectedEvent.id)} disabled={!dismissReason} className="flex-2 py-4 bg-[#5A6B7C] text-white font-bold rounded-xl disabled:opacity-40">
                            {selectedEvent.type === 'Patient Self-Report' ? 'Dismiss Report' : 'Confirm False Positive'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-6">
                        <button onClick={() => handleConfirm(selectedEvent.id)} className="flex-1 py-6 bg-[#2D9596] text-white text-lg font-bold rounded-3xl hover:bg-[#247d7e] transition-all shadow-lg shadow-[#2D9596]/20 flex items-center justify-center gap-3">
                          <CheckCircle className="w-6 h-6" /> Validate & Action
                        </button>
                        <button onClick={() => setDismissingId(selectedEvent.id)} className="flex-1 py-6 bg-[#E8EEF2] text-[#5A6B7C] text-lg font-bold rounded-3xl hover:bg-[#d6dfe6] transition-all">
                          {selectedEvent.type === 'Patient Self-Report' ? 'Dismiss Report' : 'Mark False Positive'}
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[#5A6B7C] opacity-20">
                  <Droplets className="w-24 h-24 mb-4" />
                  <p className="text-2xl font-bold uppercase">No Event Selected</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-full animate-in fade-in duration-500 bg-white">
            {/* Master List (Queue) */}
            <div className="w-1/3 xl:w-1/4 border-r border-[#E8EEF2] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[#E8EEF2] bg-[#FAFAFA]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B7C]" />
                  <input type="text" placeholder="Search queue..." className="w-full bg-white border border-[#E8EEF2] rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-[#2D9596] outline-none" />
                </div>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-[#E8EEF2]">
                {technicianQueue.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedQueuePatientId(patient.id)}
                    className={`p-5 cursor-pointer transition-all border-l-4 ${selectedQueuePatientId === patient.id ? 'bg-[#E8EEF2]/30 border-[#2D9596]' : 'border-transparent hover:bg-[#FAFAFA]'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-[#0A1128]">{patient.patientName}</h3>
                      <div className="flex items-center gap-2">
                        {patient.id === 10 && (
                          <span className="bg-[#9b59b6]/10 text-[#9b59b6] text-[8px] px-1 py-0.5 rounded font-bold border border-[#9b59b6]/20 uppercase">Survey Delinquent</span>
                        )}
                        <span className={`text-[10px] font-bold ${patient.dropoutRisk > 70 ? 'text-[#E76F51]' : 'text-[#6A994E]'}`}>
                          Risk: {patient.dropoutRisk}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#5A6B7C]">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {patient.postalCode}</span>
                      <div className="flex items-center gap-1.5">
                        {patient.interventionHistory.length > 0 && <Clock className="w-3 h-3 text-[#2D9596]" />}
                        <span className="bg-[#E8EEF2] px-1.5 py-0.5 rounded font-bold uppercase tracking-tight">{patient.behavioralCluster}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Pane (Queue -> Visit Prep Card) */}
            <div className="flex-1 overflow-auto">
              {selectedQueuePatient ? (
                <VisitPrepCard patient={selectedQueuePatient} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-[#5A6B7C] opacity-20">
                  <Users className="w-24 h-24 mb-4" />
                  <p className="text-2xl font-bold uppercase">Select Patient for Prep</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function PackageFallback({ className }: { className?: string }) {
  return <Users className={className} />;
}
