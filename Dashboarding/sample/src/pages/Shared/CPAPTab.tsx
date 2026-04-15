import React from 'react';
import { Wind, TrendingUp, AlertTriangle } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const usageData = [
  { day: 'Mon', hours: 4.2 }, { day: 'Tue', hours: 5.8 }, { day: 'Wed', hours: 6.5 },
  { day: 'Thu', hours: 0 }, { day: 'Fri', hours: 7.2 }, { day: 'Sat', hours: 8.1 }, { day: 'Sun', hours: 7.5 },
]; // Notice Thursday is 0 to show a data gap

const CPAPTab: React.FC = () => {
  const hasDataGap = usageData.some(d => d.hours === 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Wind className="h-8 w-8 text-indigo-600" /> CPAP Telemetry
        </h1>
        <p className="text-base text-slate-500 mt-2">7-day usage, AHI trend, leak evolution, and compliance streak.</p>
      </div>

      {/* Data Gap Alert Banner (Task requirement) */}
      {hasDataGap && (
         <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 shadow-sm flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
               <h3 className="text-sm font-bold text-amber-900">Data Gap Detected</h3>
               <p className="text-xs font-medium text-amber-700 mt-1">
                  Missing CPAP transmission for Thursday. This may affect compliance calculations and AI risk models. 
                  <button className="ml-2 underline font-bold hover:text-amber-900">Ping Device</button>
               </p>
            </div>
         </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-1 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp className="h-32 w-32"/></div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 relative z-10">Compliance Streak</h3>
          <div className="flex items-baseline gap-1 relative z-10">
             <span className="text-5xl font-black text-slate-900 tracking-tighter">12</span>
             <span className="text-sm font-bold text-slate-500">Days</span>
          </div>
          <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-max mt-4 relative z-10 border border-emerald-100">
             Top 20% of cohort
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 md:col-span-3">
           <div className="flex justify-between items-end mb-6">
             <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">7-Day Usage (Hours)</h3>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-2xl font-black text-slate-900">5.6h</span>
                   <span className="text-xs font-medium text-slate-500">Avg this week</span>
                </div>
             </div>
             <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">Goal: 4hrs+</span>
           </div>
           <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '8px 12px' }}
                    itemStyle={{ color: '#0f172a', fontWeight: '900', fontSize: '14px' }}
                  />
                  <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* AHI Trend */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">AHI Trend</h3>
                  <span className="text-2xl font-black text-slate-900">4.2 <span className="text-sm font-bold text-slate-400">/hr</span></span>
               </div>
               <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-200">Normal</span>
            </div>
            <div className="h-32 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center border-dashed">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AHI Trend Chart</span>
            </div>
         </div>

         {/* Leak % Evolution */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
               <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Leak % Evolution</h3>
                  <span className="text-2xl font-black text-slate-900">12 <span className="text-sm font-bold text-slate-400">L/min (50th)</span></span>
               </div>
               <span className="px-2.5 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded border border-orange-200">Elevated 95th</span>
            </div>
            <div className="space-y-4 mt-2">
               <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>50th Percentile</span><span className="text-slate-900">12 L/min</span></div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-indigo-500 h-full rounded-full" style={{ width: '30%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>95th Percentile</span><span className="text-orange-600">28 L/min</span></div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-orange-500 h-full rounded-full" style={{ width: '80%' }}></div></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CPAPTab;
