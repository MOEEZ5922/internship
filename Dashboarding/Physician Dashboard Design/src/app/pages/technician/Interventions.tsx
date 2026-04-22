import { useState } from 'react';
import { Package, Phone, Home, Settings, Plus, AlertCircle, FileSignature, Activity, ShieldCheck } from 'lucide-react';
import { interventionData } from '../../data/mockData';

export default function TechnicianInterventions() {
  const [showTechActionModal, setShowTechActionModal] = useState(false);
  const [techActionType, setTechActionType] = useState('');
  const [techActionNote, setTechActionNote] = useState('');

  const handleTechActionSubmit = () => {
    alert(`Technician Intervention Logged:\n\nType: ${techActionType}\nNote: ${techActionNote}`);
    setShowTechActionModal(false);
  };

  return (
    <div className="p-8 max-w-5xl space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* Role-Specific Action Banner */}
      <div className="p-6 rounded-2xl border-2 bg-[#F4A261]/5 border-[#F4A261]/30 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4A261] text-white flex items-center justify-center shadow-lg shadow-[#F4A261]/20">
               <Package />
            </div>
            <div>
               <h2 className="text-xl font-bold text-[#0A1128]">Field Intervention Cockpit</h2>
               <p className="text-sm text-[#5A6B7C]">Log equipment dispatches, calls, and technical touchpoints.</p>
            </div>
         </div>
         
         <button 
            onClick={() => setShowTechActionModal(true)}
            className="bg-[#F4A261] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#e39350] transition-all flex items-center gap-2 active:scale-95"
         >
            <Plus className="w-5 h-5" /> Log New Intervention
         </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#5A6B7C]/10 text-[#5A6B7C] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-[#5A6B7C]/20">
               Unified Evidence Log
            </span>
          </div>
          <h3 className="text-xl text-[#0A1128] mb-2 font-semibold">Intervention Viability History</h3>
          <p className="text-[#5A6B7C] text-sm">
            All clinical and technical activities logged for this patient profile.
          </p>
        </div>

        <div className="space-y-8">
          {/* Viability Log Table */}
          <div className="bg-[#FAFAFA] rounded-xl border border-[#E8EEF2] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#E8EEF2] text-[#5A6B7C]">
                <tr>
                  <th className="text-left py-4 px-6 font-bold uppercase text-[10px] tracking-widest">Date</th>
                  <th className="text-left py-4 px-6 font-bold uppercase text-[10px] tracking-widest">Stakeholder Action</th>
                  <th className="text-left py-4 px-6 font-bold uppercase text-[10px] tracking-widest">Outcome</th>
                  <th className="text-left py-4 px-6 font-bold uppercase text-[10px] tracking-widest">Actor & Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8EEF2]">
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-6 text-[#5A6B7C]">2026-04-18</td>
                  <td className="py-4 px-6">
                     <p className="font-bold text-[#0A1128]">Authorized MAD/HNS Transition Consult</p>
                     <p className="text-[10px] text-[#5A6B7C]">Path: MAD/HNS Referral for CPAP Refractory AHI</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-[#6A994E] font-bold">
                      Pending Clinical Intake
                    </span>
                  </td>
                  <td className="py-4 px-6">
                     <span className="flex items-center gap-2 text-[10px] font-bold bg-[#6A994E]/10 text-[#6A994E] border border-[#6A994E]/20 px-2 py-1 rounded-full uppercase tracking-widest">
                        <FileSignature className="w-3 h-3"/> Clinician: Dr. Sarah
                     </span>
                  </td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-6 text-[#5A6B7C]">2026-04-12</td>
                  <td className="py-4 px-6">
                     <p className="font-bold text-[#0A1128]">Remote Pressure Calibration</p>
                     <p className="text-[10px] text-[#5A6B7C]">Pressure increased to 11.5 cmH2O</p>
                  </td>
                  <td className="py-4 px-6 text-[#6A994E] font-bold">Success - AHI Stabilized</td>
                  <td className="py-4 px-6 text-[#5A6B7C] font-medium italic">Auto-System (AI)</td>
                </tr>
                <tr className="hover:bg-white transition-colors">
                  <td className="py-4 px-6 text-[#5A6B7C]">2026-03-15</td>
                  <td className="py-4 px-6 font-bold text-[#0A1128]">
                     Dispatch: AirFit N20 Mask (Nasal)
                     <span className="block text-[10px] text-[#F4A261] font-normal italic">Job Code: EX-DISP</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="flex items-center gap-1.5 text-[#E76F51] font-bold">
                      <AlertCircle className="w-3.5 h-3.5" /> Failed - Skin Irritation
                    </span>
                  </td>
                  <td className="py-4 px-6">
                     <span className="flex items-center gap-2 text-[10px] font-bold bg-[#F4A261]/10 text-[#F4A261] border border-[#F4A261]/20 px-2 py-1 rounded-full uppercase tracking-widest">
                        <Package className="w-3 h-3"/> Tech: J. Mitchell
                     </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#F4A261]/5 border-2 border-dashed border-[#F4A261]/20 rounded-2xl p-8 text-center">
            <h4 className="text-[#0A1128] font-bold mb-6">Technician Command Center</h4>
            <button 
              onClick={() => setShowTechActionModal(true)}
              className="bg-white border-2 border-[#F4A261] text-[#F4A261] px-8 py-3 rounded-xl font-bold hover:bg-[#F4A261] hover:text-white transition-all shadow-sm"
            >
              Log New Field Activity
            </button>
          </div>
        </div>
      </div>

      {/* Technician Action Modal */}
      {showTechActionModal && (
         <div className="fixed inset-0 bg-[#0A1128]/60 flex items-center justify-center z-50 animate-in fade-in duration-200 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full animate-in zoom-in-95 duration-200">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#F4A261]/10 rounded-lg flex items-center justify-center">
                     <Plus className="w-6 h-6 text-[#F4A261]" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-[#0A1128]">Log Field Intervention</h3>
                     <p className="text-xs text-[#5A6B7C] uppercase font-bold tracking-tighter">Unified Service History Sync</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                     { id: 'disp', label: 'Equipment Dispatch', icon: <Package />, sub: 'Send new mask/hardware' },
                     { id: 'call', label: 'Remote Call', icon: <Phone />, sub: 'Adherence motivation' },
                     { id: 'visit', label: 'Home Visit', icon: <Home />, sub: 'Full refit & calibration' },
                     { id: 'adj', label: 'Pressure Adjust', icon: <Settings />, sub: 'Manual O3 update' }
                  ].map(action => (
                     <button 
                        key={action.id}
                        onClick={() => setTechActionType(action.label)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${techActionType === action.label ? 'border-[#F4A261] bg-[#F4A261]/5' : 'border-[#E8EEF2] hover:border-[#F4A261]/30'}`}
                     >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${techActionType === action.label ? 'bg-[#F4A261] text-white' : 'bg-[#FAFAFA] text-[#5A6B7C]'}`}>
                           {action.icon}
                        </div>
                        <p className="text-sm font-bold text-[#0A1128]">{action.label}</p>
                        <p className="text-[10px] text-[#5A6B7C]">{action.sub}</p>
                     </button>
                  ))}
               </div>

               <label className="block text-xs font-bold text-[#5A6B7C] uppercase tracking-widest mb-2">Intervention Detail / Outcome</label>
               <textarea 
                  value={techActionNote}
                  onChange={(e) => setTechActionNote(e.target.value)}
                  placeholder="Record what was done and the immediate outcome..."
                  className="w-full h-24 p-4 bg-[#FAFAFA] border border-[#E8EEF2] rounded-xl mb-6 text-sm focus:ring-2 focus:ring-[#F4A261] outline-none transition-all"
               />

               <div className="flex gap-4">
                  <button onClick={() => setShowTechActionModal(false)} className="flex-1 py-4 bg-[#E8EEF2] text-[#5A6B7C] font-bold rounded-xl active:scale-95 transition-transform">Cancel</button>
                  <button onClick={handleTechActionSubmit} disabled={!techActionType || !techActionNote} className="flex-2 py-4 bg-[#F4A261] text-white font-bold rounded-xl shadow-lg shadow-[#F4A261]/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform">
                     Log Intervention & Sync
                  </button>
               </div>
            </div>
         </div>
      )}

      <div className="text-center">
         <p className="text-[10px] text-[#5A6B7C] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Blockchain-Verified Clinical-Technical Audit Trail Active
         </p>
      </div>

    </div>
  );
}
