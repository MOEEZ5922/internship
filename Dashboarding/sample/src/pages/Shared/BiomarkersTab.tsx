import React from 'react';
import { HeartPulse, Droplets, ActivitySquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';


const hrvData = [
  { day: 'Mon', hrv: 32 }, { day: 'Tue', hrv: 35 }, { day: 'Wed', hrv: 28 },
  { day: 'Thu', hrv: null }, { day: 'Fri', hrv: 45 }, { day: 'Sat', hrv: 38 }, { day: 'Sun', hrv: 42 },
]; // Thursday has missing data to demonstrate dimming

const BiomarkersTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <ActivitySquare className="h-8 w-8 text-indigo-600" /> Digital Biomarkers
        </h1>
        <p className="text-base text-slate-500 mt-2">HRV trend, ODI evolution, SpO2 timeline, and source availability.</p>
      </div>

      {/* Per-source availability indicator (Task requirement) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-wrap gap-6 items-center">
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sensing Sources:</span>
         
         <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold text-slate-700">Withings (Mat)</span>
         </div>
         <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold text-slate-700">Somno-Art (Band)</span>
         </div>
         <div className="flex items-center gap-2 opacity-50">
            <AlertCircle className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-500 line-through">Hexoskin (Shirt)</span>
            <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">Offline</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* HRV Trend with Quality Flag */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <HeartPulse className="h-4 w-4 text-rose-500" /> HRV Trend
                 </h3>
                 <span className="text-2xl font-black text-slate-900">42<span className="text-sm font-bold text-slate-400">ms (Avg)</span></span>
               </div>
               <div className="text-right">
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-200 block mb-1">Missing Data Point</span>
                  <span className="text-[10px] font-bold text-slate-400">Source: Withings</span>
               </div>
            </div>
            
            <div className="h-48 w-full flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hrvData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  {/* Connect nulls visually represents the missing data point clearly, but we use styling to dim the chart if needed */}
                  <Line connectNulls type="monotone" dataKey="hrv" stroke="#f43f5e" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: 'white' }} activeDot={{ r: 6, fill: '#f43f5e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* SpO2 Timeline */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Droplets className="h-4 w-4 text-cyan-500" /> SpO2 Timeline
                 </h3>
                 <span className="text-2xl font-black text-slate-900">96<span className="text-sm font-bold text-slate-400">% (Avg)</span></span>
               </div>
               <span className="text-[10px] font-bold text-slate-400 mt-1 block">Source: Somno-Art</span>
            </div>
            
            <div className="space-y-6 mt-4">
               <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2"><span>T90 (Time under 90%)</span><span className="text-slate-900">12 mins</span></div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden"><div className="bg-cyan-500 h-full rounded-full" style={{ width: '15%' }}></div></div>
               </div>
               
               <div className="relative pt-6">
                  <div className="h-6 bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400 rounded-lg w-full relative">
                     <div className="absolute -top-6 left-[96%] -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-slate-900">
                        96%
                     </div>
                     <div className="absolute top-0 bottom-0 left-[96%] w-1 bg-white shadow-sm rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
                    <span>80%</span><span>90% (Threshold)</span><span>100%</span>
                  </div>
               </div>
            </div>
         </div>

         {/* ODI Evolution */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <ActivitySquare className="h-4 w-4 text-indigo-500" /> ODI Evolution (Oxygen Desaturation Index)
               </h3>
               <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-200">Stable</span>
            </div>
            <div className="h-48 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center border-dashed">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ODI Evolution Scatter Plot</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BiomarkersTab;
