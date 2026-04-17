import { useState } from 'react';
import { interventionData } from '../../data/mockData';
import { FileSignature, AlertCircle, Activity } from 'lucide-react';

export default function PhysicianInterventions() {
  const [activePathway, setActivePathway] = useState<'app_iah' | 'alt_therapy'>('app_iah');
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [appIahNotes, setAppIahNotes] = useState('');
  const [escalationSource, setEscalationSource] = useState<'ai' | 'technician'>('ai');

  const handleAppIahSubmit = () => {
    alert(`Clinical Order Submitted:\n\n${appIahNotes}`);
    setShowOrderModal(false);
  };

  const handleAuthorize = () => {
    alert(`Authorization submitted for: ${selectedTherapy}\n\nClinical Notes:\n${clinicalNotes}`);
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#E76F51]/10 text-[#E76F51] px-2 py-1 rounded text-xs font-bold uppercase tracking-widest border border-[#E76F51]/30">
              🚨 Escalation Report
            </span>
          </div>
          <h2 className="text-2xl text-[#0A1128] mb-2 font-semibold">System-Generated Pathway Report</h2>
          <p className="text-[#5A6B7C]">
            Comprehensive context for clinical decision making on critical patients.
          </p>
        </div>

        <div className="space-y-8">
          {/* Top Context: Viability Log */}
          <div>
            <label className="block text-sm font-semibold text-[#0A1128] mb-3 uppercase tracking-wider">
              Prior Technical Interventions (Viability Log)
            </label>
            <div className="bg-[#FAFAFA] rounded-lg border border-[#E8EEF2] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#E8EEF2] text-[#5A6B7C]">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Technician Action</th>
                    <th className="text-left py-3 px-4 font-medium">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EEF2]">
                  <tr>
                    <td className="py-3 px-4">2026-03-15</td>
                    <td className="py-3 px-4 font-medium text-[#0A1128]">Dispatched new AirFit F20 Mask</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-[#E76F51] font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed - Leakage remains &gt;24 L/min
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">2026-02-28</td>
                    <td className="py-3 px-4 font-medium text-[#0A1128]">Pressure calibration (increased to 12 cmH2O)</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-[#E76F51] font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed - Patient reported severe intolerance
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#5A6B7C] mt-2 italic">
              * Clinical Requirement: Review all technical failures before authorizing alternative therapies.
            </p>
          </div>

          <hr className="border-[#E8EEF2]" />

          {/* Pathway Toggle */}
          <div className="flex bg-[#E8EEF2] p-1 rounded-lg">
            <button 
              onClick={() => setActivePathway('app_iah')}
              className={`flex-1 py-3 text-sm font-semibold rounded-md transition-all ${activePathway === 'app_iah' ? 'bg-white shadow text-[#0A1128]' : 'text-[#5A6B7C] hover:text-[#0A1128]'}`}
            >
              Complex AHI (APPEL IAH O5)
            </button>
            <button 
               onClick={() => setActivePathway('alt_therapy')}
               className={`flex-1 py-3 text-sm font-semibold rounded-md transition-all ${activePathway === 'alt_therapy' ? 'bg-white shadow text-[#0A1128]' : 'text-[#5A6B7C] hover:text-[#0A1128]'}`}
            >
              Alternative Therapy Authorization
            </button>
          </div>

          {activePathway === 'app_iah' ? (
            // App IAH UI
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-[#2D9596]/5 border border-[#2D9596]/30 rounded-xl p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[#0A1128] font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-[#2D9596]"/> Complex AHI Alert (APPEL IAH)</h3>
                    <div className="flex gap-2">
                       <button onClick={() => setEscalationSource('ai')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${escalationSource === 'ai' ? 'bg-[#2D9596] text-white shadow' : 'bg-white border border-[#E8EEF2] text-[#5A6B7C]'}`}>Simulate AI Trigger</button>
                       <button onClick={() => setEscalationSource('technician')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${escalationSource === 'technician' ? 'bg-[#E76F51] text-white shadow' : 'bg-white border border-[#E8EEF2] text-[#5A6B7C]'}`}>Simulate Tech Trigger</button>
                    </div>
                 </div>
                 
                 <p className={`text-sm border-l-4 ${escalationSource === 'ai' ? 'border-[#2D9596]' : 'border-[#E76F51]'} bg-white p-4 rounded-r-lg shadow-sm transition-all`}>
                   <span className={`font-bold ${escalationSource === 'ai' ? 'text-[#2D9596]' : 'text-[#E76F51]'}`}>
                      {escalationSource === 'ai' ? 'Automated AI Safety Net: ' : 'Manual Technician Escalation: '}
                   </span>
                   {escalationSource === 'ai' 
                       ? 'System backend continuously tracks telemetry and has detected Severe AHI flow issues / critical threshold breach (Risk Score ≥ 8). Automatic algorithm escalation triggered.'
                       : 'Technician logged "Physician Collaboration (O5 APPEL IAH AIRGENIOUS)". Mechanical troubleshooting exhausted; airflow problem requires clinical review.'}
                 </p>
               </div>
               
               <button 
                 onClick={() => setShowOrderModal(true)}
                 className="w-full bg-[#0A1128] text-white px-6 py-4 rounded-lg hover:bg-[#1a233a] transition-all flex items-center justify-center gap-3 shadow-lg"
               >
                  <Activity className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Authorize Clinical Therapy Decision</span>
               </button>

               {showOrderModal && (
                 <div className="fixed inset-0 bg-[#0A1128]/60 flex items-center justify-center z-50 animate-in fade-in duration-200 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full animate-in zoom-in-95 duration-200">
                       <h3 className="text-xl font-bold text-[#0A1128] mb-2 text-center">Formalize Clinical Order</h3>
                       <p className="text-sm text-[#5A6B7C] text-center mb-6">Detail your required medical escalation or procedure to resolve this severe AHI flow alert.</p>
                       <textarea 
                           className="w-full h-32 p-4 border border-[#E8EEF2] rounded-lg focus:outline-none focus:border-[#2D9596] mb-6 resize-none text-sm shadow-inner"
                           placeholder="Type your clinical order here (e.g., 'Schedule in-lab PSG for complex apnea evaluation' or 'Transition to BiPAP-ST')..."
                           value={appIahNotes}
                           onChange={(e) => setAppIahNotes(e.target.value)}
                       />
                       <div className="flex gap-4">
                          <button onClick={() => setShowOrderModal(false)} className="flex-1 py-3 bg-[#E8EEF2] text-[#5A6B7C] font-semibold rounded-lg hover:bg-[#d6dfe6] transition-colors">Cancel</button>
                          <button onClick={handleAppIahSubmit} disabled={!appIahNotes} className="flex-1 flex gap-2 justify-center items-center py-3 bg-[#E76F51] text-white font-semibold rounded-lg hover:bg-[#E76F51]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md">
                             <FileSignature className="w-4 h-4"/> Sign Order & Clear
                          </button>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          ) : (
            // Existing Alt Therapy UI
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-[#0A1128] uppercase tracking-wider">
                    Select Alternative Therapy
                  </label>
                  <div className="space-y-3">
                    <label
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedTherapy === 'MAD'
                            ? 'border-[#2D9596] bg-[#2D9596]/5'
                            : 'border-[#E8EEF2] hover:border-[#2D9596]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="therapy"
                          value="MAD"
                          checked={selectedTherapy === 'MAD'}
                          onChange={(e) => setSelectedTherapy(e.target.value)}
                          className="w-5 h-5 mt-0.5 text-[#2D9596] border-[#E8EEF2] focus:ring-[#2D9596]"
                        />
                        <div>
                          <span className="text-[#0A1128] font-medium block">Mandibular Advancement Device (MAD)</span>
                          <span className="text-xs text-[#2D9596] font-medium">Recommended. OAI indicates mild/moderate airway collapse.</span>
                        </div>
                    </label>

                    <label
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedTherapy === 'HNS'
                            ? 'border-[#2D9596] bg-[#2D9596]/5'
                            : 'border-[#E8EEF2] hover:border-[#2D9596]/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="therapy"
                          value="HNS"
                          checked={selectedTherapy === 'HNS'}
                          onChange={(e) => setSelectedTherapy(e.target.value)}
                          className="w-5 h-5 mt-0.5 text-[#2D9596] border-[#E8EEF2] focus:ring-[#2D9596]"
                        />
                        <div>
                          <span className="text-[#0A1128] font-medium block">Hypoglossal Nerve Stimulation (HNS)</span>
                          <span className="text-xs text-[#5A6B7C]">Surgical Consultation. Indicated for severe CPAP intolerance.</span>
                        </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-[#0A1128] uppercase tracking-wider">
                    Clinical Indication & Justification
                  </label>
                  <textarea
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Detail why CPAP was abandoned and why this specific alternative is indicated..."
                    className="w-full h-[200px] px-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596]/20 transition-all resize-none text-sm"
                  />
                </div>
              </div>

              <div className="bg-[#E76F51]/5 rounded-lg p-6 border border-[#E76F51]/20">
                <h4 className="text-sm font-semibold text-[#E76F51] mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Documented Therapy Failure (Clinical State)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                  <div>
                    <p className="text-[#5A6B7C] mb-1">Status</p>
                    <p className="text-[#E76F51] font-bold uppercase">Non-Adherent</p>
                  </div>
                  <div>
                    <p className="text-[#5A6B7C] mb-1">Avg. Usage</p>
                    <p className="text-[#0A1128] font-medium text-lg">1.2 hrs/night</p>
                  </div>
                  <div>
                    <p className="text-[#5A6B7C] mb-1">Refractory AHI</p>
                    <p className="text-[#0A1128] font-medium text-lg">12.4 events/h</p>
                  </div>
                  <div>
                    <p className="text-[#5A6B7C] mb-1">Mask Leak (95th)</p>
                    <p className="text-[#E76F51] font-bold text-lg">34.2 L/min</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAuthorize}
                disabled={!selectedTherapy || !clinicalNotes}
                className="w-full bg-[#2D9596] text-white px-6 py-4 rounded-lg hover:bg-[#247a7a] disabled:bg-[#E8EEF2] disabled:text-[#5A6B7C] disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2D9596]/20 disabled:shadow-none"
              >
                <FileSignature className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-sm">Authorize & Sign Record</span>
              </button>

              <p className="text-[10px] text-[#5A6B7C] text-center uppercase tracking-tighter">
                Legal Notice: Your electronic signature will be timestamped and permanently attached to this clinical record.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
