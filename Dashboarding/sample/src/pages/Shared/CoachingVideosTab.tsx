import React from 'react';
import { PlayCircle, Video, Star, Clock, Activity, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

const CoachingVideosTab: React.FC = () => {
  const videos = [
    { title: 'How to clean CPAP machine', trigger: 'Routine Onboarding', status: 'Delivered', wtr: '100%', rating: 5, time: '2h' },
    { title: 'Adjusting mask for side sleepers', trigger: 'Leak Instability', status: 'Delivered', wtr: '85%', rating: 4, time: '15m' },
    { title: 'Understanding AHI score', trigger: 'Patient Request', status: 'Pending', wtr: '-', rating: null, time: '-' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Video className="h-8 w-8 text-indigo-600" /> Coaching Delivery System
          </h1>
          <p className="text-base text-slate-500 mt-2">Per-patient video status, trigger categories, and watch-through rates.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
               <Activity className="h-4 w-4 text-indigo-500" /> Content Delivery Log
            </h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                     <th className="px-6 py-4">Video Content</th>
                     <th className="px-6 py-4">Trigger Category</th>
                     <th className="px-6 py-4">Delivery Status</th>
                     <th className="px-6 py-4 text-center">Watch-Through Rate</th>
                     <th className="px-6 py-4 text-right">Patient Rating</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {videos.map((vid, idx) => (
                     <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-5">
                           <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                                 <PlayCircle className="h-5 w-5" />
                              </div>
                              <span className="font-bold text-slate-900 text-sm">{vid.title}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 uppercase tracking-wider">
                              {vid.trigger}
                           </span>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex flex-col gap-1">
                              {vid.status === 'Delivered' ? (
                                 <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                                    <CheckCircle2 className="h-4 w-4" /> Delivered
                                 </span>
                              ) : (
                                 <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                                    <Clock className="h-4 w-4" /> Pending App Sync
                                 </span>
                              )}
                              <span className="text-[10px] font-medium text-slate-400">Time from trigger: {vid.time}</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className={clsx(
                              "text-lg font-black",
                              vid.wtr === '-' ? "text-slate-300" : "text-slate-900"
                           )}>
                              {vid.wtr}
                           </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="flex items-center justify-end gap-1">
                              {vid.rating ? (
                                 [...Array(5)].map((_, i) => (
                                    <Star key={i} className={clsx("h-4 w-4", i < vid.rating! ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200")} />
                                 ))
                              ) : (
                                 <span className="text-xs font-bold text-slate-400 italic">No Rating</span>
                              )}
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

export default CoachingVideosTab;
