import { useState } from 'react';
import { technicianQueue } from '../../data/mockData';
import { ClipboardList, Plus, History, CheckCircle, AlertCircle, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TechnicianSurveys() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState('');
  
  // Monitoring Surveys from Mock Data
  const monitoringHistory = technicianQueue[0]?.monitoringSurveys || [];

  const availableForms = [
    { id: 'comfort', name: 'Mask Comfort & Fit Check', type: 'Behavioral' },
    { id: 'hardware', name: 'Hardware Integrity Log', type: 'Technical' },
    { id: 'cleaning', name: 'Hygiene & Maintenance Review', type: 'Operational' },
    { id: 'env', name: 'Environment & Setup Audit', type: 'Technical' }
  ];

  return (
    <div className="p-8 max-w-5xl space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* Action Banner */}
      <div className="p-6 rounded-2xl border-2 bg-[#F4A261]/5 border-[#F4A261]/30 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4A261] text-white flex items-center justify-center shadow-lg shadow-[#F4A261]/20">
               <ClipboardList />
            </div>
            <div>
               <h2 className="text-xl font-bold text-[#0A1128]">Monitoring & Field Logs</h2>
               <p className="text-sm text-[#5A6B7C]">Operational surveys and behavioral monitoring forms.</p>
            </div>
         </div>
         
         <button 
            onClick={() => setShowFormModal(true)}
            className="bg-[#F4A261] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#e39350] transition-all flex items-center gap-2 active:scale-95"
         >
            <Plus className="w-5 h-5" /> Log Monitoring Form
         </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left: Monitoring History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E8EEF2] flex items-center justify-between bg-[#FAFAFA]">
              <h3 className="text-sm font-bold text-[#0A1128] uppercase tracking-widest flex items-center gap-2">
                <History className="w-4 h-4 text-[#F4A261]" /> Field Observation History
              </h3>
              <span className="text-[10px] font-bold text-[#5A6B7C] uppercase tracking-tighter">Unified Audit Trail</span>
            </div>
            
            <div className="p-0 divide-y divide-[#E8EEF2]">
              {monitoringHistory.map((log: any, idx: number) => (
                <div key={idx} className="p-6 hover:bg-[#FAFAFA] transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#E8EEF2] flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-[#2D9596]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0A1128]">{log.question}</p>
                        <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mt-0.5">Logged: Apr 10, 2026</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#E8EEF2] p-4 rounded-xl shadow-sm flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-[#F4A261] shrink-0" />
                    <p className="text-sm text-[#0A1128] font-medium leading-relaxed italic">
                      "{log.answer}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Available Forms List */}
        <div className="space-y-6">
          <div className="bg-[#0A1128] text-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white/50">Available Forms</h3>
            <div className="space-y-3">
              {availableForms.map(form => (
                <button 
                  key={form.id}
                  onClick={() => { setSelectedForm(form.name); setShowFormModal(true); }}
                  className="w-full text-left bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group"
                >
                  <p className="text-sm font-bold mb-1 group-hover:text-[#F4A261] transition-colors">{form.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{form.type}</span>
                    <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-[#F4A261] transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E8EEF2] p-6 shadow-sm">
            <h4 className="text-xs font-bold text-[#0A1128] uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#F4A261]" /> Guidelines
            </h4>
            <div className="space-y-3 text-xs text-[#5A6B7C] leading-relaxed">
              <p>• <strong>Monitoring Surveys</strong> should be completed during every touchpoint.</p>
              <p>• Results are visible to Physicians in the <strong>Unified Evidence Log</strong>.</p>
              <p>• Ensure "Mask Comfort" is logged whenever a leak variance is detected.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-[#0A1128]/60 flex items-center justify-center z-50 animate-in fade-in duration-200 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-lg w-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F4A261]/10 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-[#F4A261]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0A1128]">New Monitoring Form</h3>
                <p className="text-xs text-[#5A6B7C] uppercase font-bold tracking-tighter">Operational Field Log</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <label className="block text-xs font-bold text-[#5A6B7C] uppercase tracking-widest">Select Form Type</label>
              <select 
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="w-full bg-[#FAFAFA] border-2 border-[#E8EEF2] rounded-xl p-4 text-sm font-bold text-[#0A1128] focus:border-[#F4A261] outline-none"
              >
                <option value="">Choose a monitoring form...</option>
                {availableForms.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
              </select>

              <label className="block text-xs font-bold text-[#5A6B7C] uppercase tracking-widest mt-6">Observations / Patient Feedback</label>
              <textarea 
                placeholder="Log the patient's specific feedback or technical observations..."
                className="w-full h-32 bg-[#FAFAFA] border-2 border-[#E8EEF2] rounded-xl p-4 text-sm focus:border-[#F4A261] outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowFormModal(false)} className="flex-1 py-4 bg-[#E8EEF2] text-[#5A6B7C] font-bold rounded-xl active:scale-95 transition-transform">Cancel</button>
              <button onClick={() => { alert('Monitoring Form Logged & Synced.'); setShowFormModal(false); }} disabled={!selectedForm} className="flex-2 py-4 bg-[#F4A261] text-white font-bold rounded-xl shadow-lg shadow-[#F4A261]/20 disabled:opacity-40 active:scale-95 transition-transform">
                Log Form & Sync
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
         <p className="text-[10px] text-[#5A6B7C] uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Universal Monitoring Layer Active • Data visible to Physician Inbox
         </p>
      </div>

    </div>
  );
}
