import React from 'react';
import { Clock, ArrowRight, Activity, Wrench } from 'lucide-react';
import clsx from 'clsx';

const InterventionsTab: React.FC = () => {
  const interventions = [
    { id: 1, date: 'Oct 12, 2025', type: 'Mask Change', delivery: 'In-person', desc: 'Switched from Nasal N30i to Full Face F20.', deltaUsage: '+1.5h', deltaIcon: ArrowRight, color: 'emerald' },
    { id: 2, date: 'Sep 05, 2025', type: 'Pressure Adj.', delivery: 'Remote', desc: 'Increased max pressure to 12 cmH2O.', deltaUsage: '-0.2h', deltaIcon: ArrowRight, color: 'rose' },
    { id: 3, date: 'Aug 20, 2025', type: 'Education Call', delivery: 'Phone', desc: 'Discussed mask cleaning habits.', deltaUsage: '+0.5h', deltaIcon: ArrowRight, color: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
               <Wrench className="h-8 w-8 text-indigo-600" /> Intervention Log
            </h1>
            <p className="text-base text-slate-500 mt-2">Timeline, delivery modes, and Δusage effectiveness.</p>
         </div>
         <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
            <span className="text-sm font-bold text-amber-800">1 Pending Intervention</span>
         </div>
      </div>

      {/* Sequence Chain Display (last 3 interventions) - Task requirement */}
      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden">
         <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 relative z-10">Sequence Chain (Last 3)</h2>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
            
            {interventions.map((inv) => (
               <div key={inv.id} className="relative z-10 bg-slate-800 border border-slate-700 rounded-xl p-4 w-full md:w-64 shadow-lg text-center">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                     {inv.date}
                  </span>
                  <p className="text-sm font-bold text-white mt-2">{inv.type}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1">{inv.delivery}</p>
                  <div className="mt-3 pt-3 border-t border-slate-700 flex justify-center items-center gap-1">
                     <span className="text-[10px] uppercase font-bold text-slate-500">Δ Usage:</span>
                     <span className={clsx("text-sm font-black", inv.color === 'emerald' ? "text-emerald-400" : "text-rose-400")}>
                        {inv.deltaUsage}
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Full Intervention Timeline */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
         <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
               <Clock className="h-4 w-4 text-indigo-500" /> Full History
            </h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Type × Delivery Mode</th>
                     <th className="px-6 py-4 w-1/3">Clinical Notes</th>
                     <th className="px-6 py-4 text-right">Δ Usage Before/After</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {interventions.map((inv, idx) => (
                     <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold">
                           {inv.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                           <div className="flex flex-col gap-1">
                              <span className="text-sm font-bold text-slate-900">{inv.type}</span>
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded w-max uppercase tracking-wider">
                                 {inv.delivery}
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                           {inv.desc}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                           <div className="flex items-center justify-end gap-2">
                              <Activity className={clsx("h-4 w-4", inv.color === 'emerald' ? "text-emerald-500" : "text-rose-500")} />
                              <span className={clsx(
                                 "text-sm font-black",
                                 inv.color === 'emerald' ? "text-emerald-600" : "text-rose-600"
                              )}>
                                 {inv.deltaUsage}
                              </span>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default InterventionsTab;
