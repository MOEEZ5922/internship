import React, { useState } from 'react';
import { BrainCircuit, TrendingDown, AlertTriangle, ShieldAlert, Zap, Check, X, MessageSquareWarning } from 'lucide-react';
import clsx from 'clsx';

const AIWeeklyStateTab: React.FC = () => {
  const [showGate, setShowGate] = useState(false);
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
           <BrainCircuit className="h-8 w-8 text-indigo-600" /> AI Weekly State Panel
        </h1>
        <p className="text-base text-slate-500 mt-2">Risk tier, fused score, active flags, and action recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Core AI Assessment Card */}
         <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl lg:col-span-1 relative overflow-hidden flex flex-col items-center text-center">
            {/* Decorative background */}
            <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-slate-900/0 to-transparent"></div>
            
            <div className="relative z-10 w-full flex justify-between items-center mb-8">
               <span className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                  Critical Risk Tier
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Phase: <span className="text-indigo-400">Optimization</span>
               </span>
            </div>

            <div className="relative z-10 w-40 h-40 rounded-full border-[14px] border-slate-800 flex flex-col items-center justify-center mb-6 shadow-inner">
               <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                  <path className="text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" strokeDasharray="85, 100" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Fused Score</span>
               <span className="text-5xl font-black text-white tracking-tighter">8.5</span>
            </div>

            <div className="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl w-full p-4 border border-slate-700/50">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Day-to-Dropout Prediction</p>
               <p className="text-2xl font-black text-rose-400"><span className="text-white">14</span> Days</p>
               <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase">
                  <span className="text-slate-500">Confidence Level</span>
                  <span className="text-emerald-400">High (92%)</span>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Active Flags */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-amber-500" /> Active Mechanism Flags
               </h3>
               <div className="flex flex-wrap gap-3">
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                     <TrendingDown className="h-4 w-4" /> Usage Decay
                  </div>
                  <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                     <Wind className="h-4 w-4" /> Leak Instability
                  </div>
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
                     <AlertTriangle className="h-4 w-4" /> Residual Burden
                  </div>
               </div>
            </div>

            {/* Action Recommendation Card (Task requirement) */}
            <div className={clsx(
               "flex-1 rounded-2xl p-6 transition-all duration-500 border relative overflow-hidden",
               showGate ? "bg-indigo-50 border-indigo-200" : "bg-white border-slate-200 shadow-sm"
            )}>
               <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                     <h3 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                        <Zap className="h-4 w-4" /> Proposed Action
                     </h3>
                     <p className="text-xl font-black text-slate-900">Home Visit: Mask Refit</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reassessment</p>
                     <p className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">In 7 Days</p>
                  </div>
               </div>
               
               <div className="mb-6 relative z-10">
                  <p className="text-sm font-medium text-slate-600 bg-white/60 p-3 rounded-lg border border-slate-100">
                     <span className="font-bold text-slate-900 block mb-1">Delivery Mode: In-person Technician</span>
                     Patient shows severe leak instability combined with dropping usage. A physical mask refit is highly recommended before therapy abandonment occurs.
                  </p>
               </div>

               {/* Clinician Gate Buttons */}
               <div className="relative z-10 flex flex-wrap gap-3 pt-4 border-t border-slate-100/50">
                  {!showGate ? (
                     <>
                        <button onClick={() => setShowGate(true)} className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-md hover:bg-slate-800 hover:-translate-y-0.5 transition-all">
                           Review Recommendation
                        </button>
                     </>
                  ) : (
                     <div className="w-full space-y-4 animate-in slide-in-from-bottom-2">
                        <div className="flex gap-2">
                           <button className="flex-1 bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                              <Check className="h-4 w-4" /> Accept
                           </button>
                           <button className="flex-1 bg-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-600 transition-colors">
                              Modify
                           </button>
                           <button className="flex-1 bg-rose-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-rose-600 transition-colors flex items-center justify-center gap-2">
                              <X className="h-4 w-4" /> Reject
                           </button>
                        </div>
                        <div className="relative">
                           <MessageSquareWarning className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                           <textarea 
                              placeholder="If modifying or rejecting, enter reason code / clinical notes here..."
                              className="w-full bg-white border border-indigo-200 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-20"
                           />
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIWeeklyStateTab;

function Wind(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>;
}
