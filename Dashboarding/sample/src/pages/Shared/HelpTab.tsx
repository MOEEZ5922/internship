import React from 'react';
import { HelpCircle, Phone, Mail, BookOpen } from 'lucide-react';

const HelpTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Support & Documentation</h1>
        <p className="text-sm text-slate-500 mt-1">Get immediate technical assistance or browse clinical documentation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center group hover:border-indigo-300 transition-colors cursor-pointer">
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Phone className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900">Priority Support Line</h3>
            <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">Direct line to the technical dispatch team for immediate interventions.</p>
            <p className="font-black text-indigo-600 mt-auto text-lg tracking-tight">1-800-SLEEP-99</p>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center group hover:border-indigo-300 transition-colors cursor-pointer">
            <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900">Clinical Desk Email</h3>
            <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">For non-urgent administrative changes or clinical inquiries.</p>
            <button className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold w-full mt-auto group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors">
               desk@sleepdash.com
            </button>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center flex flex-col items-center group hover:border-indigo-300 transition-colors cursor-pointer">
            <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900">Knowledge Base</h3>
            <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">Documentation on metric definitions, APPEL IAH, and risk thresholds.</p>
            <button className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold w-full mt-auto group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200 transition-colors">
               Browse Docs
            </button>
         </div>
      </div>
      
      <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-xl p-6 mt-8 relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-base font-bold text-rose-900 flex items-center">
               <HelpCircle className="h-5 w-5 mr-2 text-rose-600" /> Report System Outage
            </h3>
            <p className="text-sm text-rose-800 mt-2 mb-4 max-w-2xl">
               If telemetry data is failing to sync from devices, use the outage reporter to instantly flag a potential API or hardware manufacturer integration failure.
            </p>
            <button className="bg-rose-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-rose-700 shadow-sm transition-colors">
               Declare Outage
            </button>
         </div>
         <HelpCircle className="absolute -bottom-10 -right-10 h-48 w-48 text-rose-600 opacity-5" />
      </div>
    </div>
  );
};

export default HelpTab;
