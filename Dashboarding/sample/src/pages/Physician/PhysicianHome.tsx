import { FileText, Stethoscope, AlertTriangle, Download, Eye, Activity, History, BrainCircuit } from 'lucide-react';
import clsx from 'clsx';

const PhysicianHome = () => {
  // Full patient pattern sheet data
  const patients = [
    { 
      id: 'PT-8921', name: 'Chen, David',
      riskTier: 'Critical', riskScore: 9.2,
      alert: 'Complex AHI (APPEL IAH)',
      hrv: '32ms', hrvTrend: 'down',
      oai: '34/hr', oaiTrend: 'up',
      spo2: '88%',
      aiRec: 'Clinical therapy decision required. Prior technician intervention failed.',
      streamsMissing: false
    },
    { 
      id: 'PT-4412', name: 'Garcia, Maria',
      riskTier: 'High', riskScore: 8.5,
      alert: 'Alternative Therapy Auth. Req.',
      hrv: '45ms', hrvTrend: 'stable',
      oai: '12/hr', oaiTrend: 'stable',
      spo2: '94%',
      aiRec: 'Authorize MAD. Patient abandoned CPAP for 14 days.',
      streamsMissing: true
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Stethoscope className="h-8 w-8 text-indigo-600" /> Clinical Review Portal
          </h1>
          <p className="text-base text-slate-500 mt-2">Deep patient pattern sheets, escalation timelines, and AI recommendation overrides.</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
           <Download className="h-4 w-4" /> Export Cohort
        </button>
      </div>

      {/* Main Escalation Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
               <AlertTriangle className="h-4 w-4 text-rose-500" /> Escalations Requiring Clinical Decision
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">{patients.length} Pending</span>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                     <th className="px-6 py-4">Patient Profile</th>
                     <th className="px-6 py-4">Risk & Alerts</th>
                     <th className="px-6 py-4">Clinical Streams (HRV / OAI / SpO2)</th>
                     <th className="px-6 py-4">AI Recommendation</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {patients.map(p => (
                     <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-5">
                           <div className="font-black text-slate-900 text-base">{p.name}</div>
                           <div className="text-xs text-slate-500 font-mono mt-1">{p.id}</div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex flex-col gap-2">
                              <span className={clsx(
                                 "w-max px-2.5 py-1 rounded text-xs font-black uppercase tracking-wider shadow-sm",
                                 p.riskTier === 'Critical' ? "bg-rose-600 text-white" : "bg-orange-500 text-white"
                              )}>
                                 {p.riskScore} • {p.riskTier}
                              </span>
                              <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                 <AlertTriangle className="h-3.5 w-3.5 text-rose-500" /> {p.alert}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex gap-4">
                              <div className="flex flex-col bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">HRV</span>
                                 <span className={clsx("text-sm font-black", p.hrvTrend === 'down' ? "text-rose-600" : "text-slate-900")}>{p.hrv}</span>
                              </div>
                              <div className="flex flex-col bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">OAI</span>
                                 <span className={clsx("text-sm font-black", p.oaiTrend === 'up' ? "text-rose-600" : "text-slate-900")}>{p.oai}</span>
                              </div>
                              <div className="flex flex-col bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase">SpO2</span>
                                 <span className={clsx("text-sm font-black", p.spo2 < '90%' ? "text-rose-600" : "text-slate-900")}>{p.spo2}</span>
                              </div>
                           </div>
                           {p.streamsMissing && (
                              <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 w-max px-2 py-0.5 rounded border border-amber-200">
                                 <Activity className="h-3 w-3" /> Incomplete Data Stream (Surveys Missing)
                              </div>
                           )}
                        </td>
                        <td className="px-6 py-5 max-w-xs">
                           <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 p-3 rounded-lg">
                              <BrainCircuit className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                              <p className="text-xs font-medium text-indigo-900 leading-relaxed">{p.aiRec}</p>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 shadow-sm transition-all whitespace-nowrap">
                              <Eye className="h-4 w-4" /> Open Chart
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Lower Section: Interventions & Models */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Intervention & Escalation Timeline */}
         <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
               <History className="h-4 w-4 text-slate-400" /> Recent Intervention Outcomes
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               {/* Timeline Item 1 */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <FileText className="h-4 w-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                     <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 text-sm">Alt. Therapy MAD Auth.</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Approved</span>
                     </div>
                     <p className="text-xs text-slate-500">Dr. Chen authorized MAD for Michael Jordan.</p>
                     <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block">2 Days Ago</span>
                  </div>
               </div>
               
               {/* Timeline Item 2 */}
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                     <BrainCircuit className="h-4 w-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                     <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 text-sm">AI Rec: Override Log</span>
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Rejected</span>
                     </div>
                     <p className="text-xs text-slate-500">Physician rejected AI rec for pressure adj. Reason: Requires in-person study.</p>
                     <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block">5 Days Ago</span>
                  </div>
               </div>
            </div>
         </div>

         {/* AI Model Lifecycle Panel (Task requirement) */}
         <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
               <BrainCircuit className="h-48 w-48" />
            </div>
            <div className="relative z-10">
               <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                  <Activity className="h-4 w-4 text-indigo-400" /> AI Model Lifecycle Status
               </h2>
               
               <div className="space-y-5">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Dropout Prediction Model (v2.4)</span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Active</span>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-3">
                        <span className="flex flex-col"><span className="uppercase text-[10px]">Performance (AUC)</span><span className="text-white text-lg font-black">0.92</span></span>
                        <div className="w-px h-8 bg-slate-700"></div>
                        <span className="flex flex-col"><span className="uppercase text-[10px]">Data Drift</span><span className="text-emerald-400 font-bold">Minimal (2%)</span></span>
                     </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm">Intervention Success Model (v1.1)</span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">Needs Retraining</span>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-3">
                        <span className="flex flex-col"><span className="uppercase text-[10px]">Performance (AUC)</span><span className="text-amber-400 text-lg font-black">0.78</span></span>
                        <div className="w-px h-8 bg-slate-700"></div>
                        <span className="flex flex-col"><span className="uppercase text-[10px]">Data Drift</span><span className="text-rose-400 font-bold">Significant (15%)</span></span>
                     </div>
                     <button className="mt-4 w-full bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 rounded-lg transition-colors border border-slate-600">
                        Request Model Retraining
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PhysicianHome;
