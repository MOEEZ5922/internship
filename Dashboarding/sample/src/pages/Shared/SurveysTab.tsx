import React from 'react';
import { FileText, Calendar, AlertCircle, History, CheckCircle2, Activity } from 'lucide-react';
import clsx from 'clsx';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const scoreHistory = [
  { month: 'Jan', score: 14 }, { month: 'Apr', score: 12 }, { month: 'Jul', score: 9 }, { month: 'Oct', score: 8 }
];

const SurveysTab: React.FC = () => {
  const surveys = [
    { id: '1', name: 'PSQI', fullName: 'Pittsburgh Sleep Quality', status: 'Completed', score: '8', max: '21', date: 'Oct 15, 2025' },
    { id: '2', name: 'ISI', fullName: 'Insomnia Severity', status: 'Overdue', score: '14', max: '28', date: 'Jul 20, 2025 (Previous)' },
    { id: '3', name: 'ESS', fullName: 'Epworth Sleepiness', status: 'Completed', score: '12', max: '24', date: 'Sep 15, 2025' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <FileText className="h-8 w-8 text-indigo-600" /> Medical Surveys
          </h1>
          <p className="text-base text-slate-500 mt-2">
            PROMs history, completion calendar, and overdue warnings.
          </p>
        </div>
        
        {/* Overdue Warning (Task Requirement) */}
        <div className="bg-rose-50 border border-rose-200 rounded-lg px-4 py-2.5 flex items-center gap-3 shadow-sm">
           <AlertCircle className="h-5 w-5 text-rose-500" />
           <div>
              <p className="text-sm font-bold text-rose-900">1 Survey Overdue</p>
              <p className="text-[10px] font-bold text-rose-700 uppercase tracking-widest">Action Required</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
               <History className="h-4 w-4" /> Assessment Inventory
            </h2>
            
            {surveys.map((survey) => (
               <div key={survey.id} className={clsx(
                  "bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between border transition-shadow",
                  survey.status === 'Overdue' ? "border-rose-300 shadow-md relative overflow-hidden" : "border-slate-200 shadow-sm hover:shadow-md"
               )}>
                  {survey.status === 'Overdue' && <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>}
                  
                  <div className="flex items-start gap-4">
                     <div className="bg-slate-50 border border-slate-200 h-14 w-14 rounded-xl flex items-center justify-center text-lg font-black text-slate-800 shrink-0">
                        {survey.name}
                     </div>
                     <div>
                        <h3 className="text-lg font-bold text-slate-900">{survey.fullName}</h3>
                        
                        {survey.status === 'Overdue' ? (
                           <div className="mt-1 flex flex-col gap-1">
                              <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded w-max uppercase tracking-wider">Overdue</span>
                              <span className="text-xs font-medium text-slate-500 italic flex items-center gap-1"><AlertCircle className="h-3 w-3"/> Using previous survey from {survey.date}</span>
                           </div>
                        ) : (
                           <div className="mt-1 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Submitted {survey.date}
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="mt-4 sm:mt-0 flex items-center gap-8 pl-4 sm:border-l border-slate-100">
                     <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Score</span>
                        <div className="text-2xl font-black text-slate-900">
                           {survey.score}<span className="text-sm text-slate-400 font-bold">/{survey.max}</span>
                        </div>
                     </div>
                     <button className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors h-max whitespace-nowrap">
                        View Log
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Score History Chart & Calendar (Task Requirements) */}
         <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl shadow-xl p-6 text-white">
               <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> PSQI Score History
               </h3>
               <div className="h-32 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={scoreHistory} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#818cf8" stopOpacity={0.5}/>
                         <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} dy={5} />
                     <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', fontWeight: 'bold' }}
                       itemStyle={{ color: '#818cf8' }}
                     />
                     <Area type="monotone" dataKey="score" stroke="#818cf8" strokeWidth={3} fill="url(#colorScore)" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-[10px] font-medium text-slate-400 text-center mt-2 border-t border-slate-800 pt-3">
                  Score decreasing indicates improving sleep quality.
               </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-500" /> Completion Calendar
               </h3>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                     <span className="font-bold text-slate-700">1-Week Mark</span>
                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Completed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                     <span className="font-bold text-slate-700">1-Month Mark</span>
                     <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Completed</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-slate-900">3-Month Mark</span>
                     <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 uppercase tracking-wider">Overdue</span>
                  </div>
               </div>
               <button className="w-full mt-6 bg-indigo-50 text-indigo-700 font-bold text-sm py-2.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">
                  Request New Survey via App
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SurveysTab;
