import { useState } from 'react';
import { 
  Package, 
  Trash2, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  Wrench,
  Activity,
  History,
  ShieldAlert,
  BarChart3,
  Search,
  CheckCircle,
  FileText,
  Clock,
  ExternalLink
} from 'lucide-react';

interface VisitPrepCardProps {
  patient: any;
}

export default function VisitPrepCard({ patient }: VisitPrepCardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'prep' | 'monitoring' | 'history'>('prep');
  const [isLoggingDispatch, setIsLoggingDispatch] = useState(false);
  
  if (!patient) return null;

  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Tactical Floating Header */}
      <div className="p-8 border-b border-[#E8EEF2] bg-white sticky top-0 z-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                patient.dropoutRisk > 70 ? 'bg-[#E76F51] text-white' : 'bg-[#6A994E] text-white'
              }`}>
                Dropout Risk: {patient.dropoutRisk}%
              </span>
              <span className="text-xs font-bold text-[#2D9596] uppercase tracking-tight">
                {patient.phase} Phase
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[#0A1128]">{patient.patientName}</h2>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <span className="text-[10px] text-[#5A6B7C] font-bold uppercase">Linked Asset</span>
             <div className="bg-[#0A1128] text-white px-3 py-1.5 rounded-lg font-mono text-[10px] flex items-center gap-2">
                <Wrench className="w-3 h-3 opacity-50" />
                {patient.assetTracking.serial}
             </div>
          </div>
        </div>

        {/* Tactical Sub-Tab Switcher */}
        <div className="flex gap-6 mt-8 border-b border-[#E8EEF2]">
           {['prep', 'monitoring', 'history'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveSubTab(tab as any)}
               className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
                 activeSubTab === tab ? 'border-[#0A1128] text-[#0A1128]' : 'border-transparent text-[#5A6B7C] hover:text-[#0A1128]'
               }`}
             >
               {tab === 'prep' ? 'Visit Prep' : tab === 'monitoring' ? 'Monitoring Logs' : 'Technical History'}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        
        {activeSubTab === 'prep' && (
          <div className="space-y-8 animate-in fade-in duration-300">
             <div className="grid grid-cols-2 gap-6">
                {/* Physical Logistics Module */}
                <div className="bg-white rounded-2xl border border-[#E8EEF2] p-6 shadow-sm">
                  <h3 className="text-xs font-bold text-[#5A6B7C] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Package className="w-3.5 h-3.5" /> Hardware Management
                  </h3>
                  {isLoggingDispatch ? (
                    <div className="space-y-4 animate-in zoom-in-95 duration-200">
                       <label className="block">
                          <span className="text-[10px] font-bold text-[#5A6B7C] uppercase">New Serial Number</span>
                          <input type="text" className="mt-1 w-full bg-[#FAFAFA] border border-[#E8EEF2] rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-[#0A1128]" placeholder="LND-XXXX-XX" />
                       </label>
                       <div className="flex gap-2">
                          <button onClick={() => setIsLoggingDispatch(false)} className="flex-1 py-2 text-xs font-bold bg-[#E8EEF2] rounded-lg">Cancel</button>
                          <button onClick={() => setIsLoggingDispatch(false)} className="flex-1 py-2 text-xs font-bold bg-[#6A994E] text-white rounded-lg">Commit Dispatch</button>
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2.5 bg-[#FAFAFA] rounded-xl border border-[#E8EEF2]">
                        <span className="text-[11px] text-[#5A6B7C] uppercase font-bold">Mask Type</span>
                        <span className="text-xs font-bold text-[#0A1128]">{patient.maskType}</span>
                      </div>
                      <button onClick={() => setIsLoggingDispatch(true)} className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A1128] text-white text-xs font-bold rounded-xl hover:bg-black transition-all">
                        <Wrench className="w-3.5 h-3.5" /> New Hardware Dispatch
                      </button>
                    </div>
                  )}
                </div>

                {/* Bag Pack Checklist */}
                <div className="bg-[#2D9596]/5 rounded-2xl border border-[#2D9596]/20 p-6">
                  <h3 className="text-xs font-bold text-[#2D9596] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-3.5 h-3.5" /> Equipment to Bring
                  </h3>
                  <div className="space-y-2">
                    {patient.equipmentNeed.map((item: string) => (
                       <div key={item} className="flex items-center gap-3 text-sm text-[#0A1128] font-medium bg-white/60 p-2.5 rounded-lg border border-[#2D9596]/10">
                          <div className="w-4 h-4 border-2 border-[#2D9596] rounded flex items-center justify-center">
                             <CheckCircle className="w-3 h-3 text-transparent hover:text-[#2D9596]/30" />
                          </div>
                          {item}
                       </div>
                    ))}
                  </div>
                </div>
             </div>

             {/* Granular Leak Profile */}
             <div className="bg-[#FAFAFA] rounded-2xl border border-[#E8EEF2] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-[#5A6B7C] uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5" /> 7-Day Leak Profile (Percentiles)
                  </h3>
                  <span className="text-[10px] text-[#5A6B7C] italic">Target: &lt;24 L/min</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                   {[
                     { label: '50th (Median)', val: patient.leakProfile.p50, color: 'text-[#6A994E]' },
                     { label: '95th (Peak)', val: patient.leakProfile.p95, color: patient.leakProfile.p95 > 24 ? 'text-[#E76F51]' : 'text-[#6A994E]' },
                     { label: 'Maximum', val: patient.leakProfile.max, color: 'text-[#0A1128]' }
                   ].map(stat => (
                     <div key={stat.label} className="bg-white p-4 rounded-xl border border-[#E8EEF2] shadow-sm">
                        <p className="text-[10px] font-bold text-[#5A6B7C] uppercase mb-1">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.val} <span className="text-[10px] text-[#5A6B7C]">L/min</span></p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {activeSubTab === 'monitoring' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="flex items-center gap-3 p-4 bg-[#0A1128]/5 rounded-xl border-l-4 border-[#0A1128]">
                <ShieldAlert className="w-5 h-5 text-[#0A1128]" />
                <p className="text-xs font-semibold text-[#0A1128]">
                  Operational logs are strictly locked to the Technician. Not visible to Physician or Patient.
                </p>
             </div>
             
             <div className="space-y-4">
                {patient.monitoringSurveys.map((survey: any) => (
                  <div key={survey.id} className="bg-white p-6 rounded-2xl border border-[#E8EEF2] hover:border-[#2D9596]/30 transition-all shadow-sm">
                     <p className="text-[10px] font-bold text-[#5A6B7C] uppercase mb-2 tracking-widest">Questionnaire Reference: {survey.id}</p>
                     <p className="text-sm font-bold text-[#0A1128] mb-3">{survey.question}</p>
                     <div className="flex items-center gap-3 bg-[#FAFAFA] p-3 rounded-lg border border-dashed border-[#E8EEF2]">
                        <FileText className="w-4 h-4 text-[#2D9596]" />
                        <span className="text-sm font-medium text-[#2D9596]">Result: {survey.answer}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeSubTab === 'history' && (
          <div className="space-y-4 animate-in fade-in duration-300">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-[#0A1128]">Intervention Viability History</h3>
                <span className="text-xs text-[#5A6B7C]">Total attempts: {patient.interventionHistory.length}</span>
             </div>
             
             <div className="space-y-4 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E8EEF2]">
                {patient.interventionHistory.map((history: any, idx: number) => (
                  <div key={idx} className="relative pl-8">
                     <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center z-10 ${
                       history.result.includes('Success') ? 'border-[#6A994E]' : 'border-[#E76F51]'
                     }`}>
                        <div className={`w-2 h-2 rounded-full ${history.result.includes('Success') ? 'bg-[#6A994E]' : 'bg-[#E76F51]'}`} />
                     </div>
                     <div className="bg-[#FAFAFA] p-5 rounded-2xl border border-[#E8EEF2] hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-[#0A1128]">{history.type}</span>
                           <span className="text-[10px] text-[#5A6B7C] font-mono">{history.date}</span>
                        </div>
                        <p className="text-xs text-[#5A6B7C] mb-3">Conducted by: {history.tech}</p>
                        <div className={`text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-block ${
                          history.result.includes('Success') ? 'bg-[#6A994E]/10 text-[#6A994E]' : 'bg-[#E76F51]/10 text-[#E76F51]'
                        }`}>
                           Outcome: {history.result}
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

      </div>

      {/* Action Center Footer */}
      <div className="p-8 border-t border-[#E8EEF2] bg-[#FAFAFA] shrink-0">
        <div className="flex gap-4">
           <button className="flex-2 bg-[#F4A261] text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-[#e39350] transition-all flex items-center justify-center gap-3 text-lg">
              <Calendar className="w-5 h-5" /> Schedule Site Visit
           </button>
           <button className="flex-1 bg-white border border-[#E8EEF2] text-[#5A6B7C] font-bold py-5 rounded-2xl hover:bg-white/50 transition-all">
              Resolve / Off-Ramp
           </button>
        </div>
      </div>

    </div>
  );
}
