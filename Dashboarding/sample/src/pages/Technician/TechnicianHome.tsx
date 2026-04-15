import { MapPin, Wrench, Phone, Navigation, AlertTriangle, ShieldAlert, Cpu, Activity, Info, Search } from 'lucide-react';
import clsx from 'clsx';

const TechnicianHome = () => {
  // Ordered by urgency (Dropout probability & Risk tier)
  const queue = [
    { 
      id: 'PT-8921', name: 'Emma Wilson', age: 45, gender: 'F',
      riskTier: 'Critical', prob: '85%',
      recommendedAction: 'Home Visit: Mask Refit', deliveryMode: 'In-person',
      flags: ['Mask Leak Instability', 'Usage Decay'],
      equipment: 'Full Face F20 (Medium)', lastVisit: '14 days ago',
      zip: '10001', distance: '2.4mi',
      color: 'rose'
    },
    { 
      id: 'PT-4412', name: 'James Thompson', age: 62, gender: 'M',
      riskTier: 'High', prob: '72%', 
      recommendedAction: 'Call: Discuss Therapy Abandonment', deliveryMode: 'Phone',
      flags: ['Usage Decay < 2h'],
      equipment: 'Nasal N30i (Small)', lastVisit: '2 mos ago',
      zip: '10012', distance: '5.1mi',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <ShieldAlert className="h-8 w-8 text-indigo-600" /> Visit Preparation & Dispatch
          </h1>
          <p className="text-base text-slate-500 mt-2">Patient priority list ordered by urgency and dropout probability.</p>
        </div>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
           <input type="text" placeholder="Search dispatch queue..." className="pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow shadow-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Priority List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
             Queue <span className="bg-slate-200 text-slate-700 py-0.5 px-2 rounded-full text-xs">{queue.length}</span>
          </h2>
          
          {queue.map(p => (
            <div key={p.id} className={clsx(
               "bg-white border rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md relative",
               `border-${p.color}-200`
            )}>
              {/* Top Banner Status */}
              <div className={clsx(`bg-${p.color}-50 px-6 py-3 border-b border-${p.color}-100 flex justify-between items-center`)}>
                 <div className="flex items-center gap-3">
                    <span className={clsx(`text-${p.color}-700 font-black text-sm uppercase tracking-wider flex items-center gap-1.5`)}>
                       <AlertTriangle className="h-4 w-4" /> {p.riskTier} Risk
                    </span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Dropout Prob:</span>
                    <span className={clsx(`bg-${p.color}-600 text-white px-2.5 py-1 rounded-md text-sm font-black shadow-sm`)}>{p.prob}</span>
                 </div>
              </div>

              <div className="p-6">
                 {/* Patient Info */}
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                       <p className="text-sm text-slate-500 font-mono mt-1">{p.id} • {p.age}y • {p.gender}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mechanism Flags</p>
                       <div className="flex flex-col gap-1.5 items-end">
                          {p.flags.map(f => (
                             <span key={f} className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded uppercase tracking-wide border border-slate-200">{f}</span>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Visit Prep Card Details */}
                 <div className="grid grid-cols-2 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Cpu className="h-3.5 w-3.5"/> Recommended Action</p>
                       <p className="text-sm font-bold text-slate-900">{p.recommendedAction}</p>
                       <p className="text-xs font-medium text-indigo-600 mt-1">{p.deliveryMode}</p>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Wrench className="h-3.5 w-3.5"/> Equipment Suggested</p>
                       <p className="text-sm font-bold text-slate-900">{p.equipment}</p>
                       <p className="text-xs font-medium text-slate-500 mt-1">Last visit: {p.lastVisit}</p>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                       <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> {p.zip}</span>
                       <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-bold text-slate-600">{p.distance} away</span>
                    </div>
                    <div className="flex gap-3">
                       <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">Review Charts</button>
                       <button className={clsx(`px-5 py-2 bg-${p.color}-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-${p.color}-700 transition-colors flex items-center gap-2`)}>
                          {p.deliveryMode === 'Phone' ? <Phone className="h-4 w-4"/> : <Navigation className="h-4 w-4"/>}
                          Initiate Dispatch
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI & Logistics Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                    <Activity className="h-5 w-5 text-indigo-400" />
                 </div>
                 <h3 className="font-bold text-base tracking-tight">System Status</h3>
              </div>
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"><span>Model Confidence</span><span className="text-emerald-400">94%</span></div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5"><div className="bg-emerald-500 h-full rounded-full" style={{width: '94%'}}></div></div>
                 </div>
                 <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                       Risk models are operating normally. 12 new patients added to dispatch queue today based on leak instability flags.
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                 <Info className="h-4 w-4 text-slate-400" /> Inventory Prep
              </h3>
              <ul className="space-y-3">
                 <li className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                    <span className="font-medium text-slate-700">F20 Masks (Medium)</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">4 Req.</span>
                 </li>
                 <li className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                    <span className="font-medium text-slate-700">N30i Cushions (Small)</span>
                    <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">1 Req.</span>
                 </li>
                 <li className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-700">Humidifier Chambers</span>
                    <span className="font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Low Stock</span>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianHome;
