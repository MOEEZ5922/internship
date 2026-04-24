import { Watch, Activity, Zap, ShieldCheck, Bluetooth, Battery } from 'lucide-react';

export default function TechnicianDevices() {
  const devices = [
    {
      id: 'HEXO-092',
      name: 'Hexoskin Smart Shirt',
      type: 'Respiratory Effort (RVO) & HRV',
      status: 'Online',
      battery: '82%',
      lastSync: '12 mins ago',
      assigned: 'Jan 12, 2025'
    },
    {
      id: 'MAS-441',
      name: 'Masimo MightySat Rx',
      type: 'SpO2 & Pulse Rate',
      status: 'Online',
      battery: '45%',
      lastSync: '1 hour ago',
      assigned: 'Feb 05, 2025'
    },
    {
      id: 'SOM-882',
      name: 'Somno-Art Band',
      type: 'Sleep Architecture (REM/Deep)',
      status: 'Online',
      battery: '95%',
      lastSync: '30 mins ago',
      assigned: 'Jan 15, 2025'
    },
    {
      id: 'WTH-990',
      name: 'Withings BPM Core',
      type: 'Blood Pressure & AFib',
      status: 'Disconnected',
      battery: '0%',
      lastSync: '2 days ago',
      assigned: 'Jan 12, 2025'
    },
    {
      id: 'WTH-991',
      name: 'Withings ScanWatch',
      type: 'Sleep, HR, SpO2 & Activity',
      status: 'Online',
      battery: '74%',
      lastSync: '4 hours ago',
      assigned: 'Jan 12, 2025'
    }
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0A1128]">Biomarker Devices</h2>
          <p className="text-sm text-[#5A6B7C]">Hardware assigned for high-fidelity physiological monitoring</p>
        </div>
        <button className="bg-[#0A1128] text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg">
          <Zap className="w-4 h-4 text-[#F4A261]" /> Pair New Device
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white rounded-3xl border border-[#E8EEF2] overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  device.status === 'Online' ? 'bg-[#6A994E]/10 text-[#6A994E]' : 'bg-[#E76F51]/10 text-[#E76F51]'
                }`}>
                  {device.name.includes('Watch') || device.name.includes('Oximeter') ? <Watch className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  device.status === 'Online' ? 'bg-[#6A994E]/10 text-[#6A994E]' : 'bg-[#E76F51]/10 text-[#E76F51]'
                }`}>
                  <Bluetooth className="w-3 h-3" />
                  {device.status}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">{device.id}</p>
                <h3 className="text-lg font-bold text-[#0A1128]">{device.name}</h3>
                <p className="text-sm text-[#5A6B7C]">{device.type}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#E8EEF2]">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A6B7C] flex items-center gap-2">
                    <Battery className={`w-4 h-4 ${parseInt(device.battery) < 20 ? 'text-[#E76F51]' : 'text-[#6A994E]'}`} />
                    Battery Life
                  </span>
                  <span className="font-bold text-[#0A1128]">{device.battery}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A6B7C]">Last Sync</span>
                  <span className="font-bold text-[#0A1128]">{device.lastSync}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#5A6B7C]">Assigned On</span>
                  <span className="font-bold text-[#0A1128]">{device.assigned}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-[#FAFAFA] border-t border-[#E8EEF2] flex gap-3">
               <button className="flex-1 py-2 bg-white border border-[#E8EEF2] text-[10px] font-bold uppercase tracking-widest text-[#5A6B7C] rounded-lg hover:bg-white/50 transition-all">Unpair</button>
               <button className="flex-1 py-2 bg-white border border-[#E8EEF2] text-[10px] font-bold uppercase tracking-widest text-[#0A1128] rounded-lg hover:bg-white/50 transition-all">Diagnostic</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0A1128] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <ShieldCheck className="w-6 h-6 text-[#F4A261]" />
             <h3 className="text-xl font-bold">Hardware Integrity Sync</h3>
          </div>
          <p className="text-white/70 text-sm max-w-xl leading-relaxed mb-6">
            All assigned biomarker devices are currently broadcasting encrypted physiological data to the Universal Truth workspace. Data integrity is verified at the edge.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium">Masimo SpO2: Active</div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium">Hexoskin RVO: Active</div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium">Somno-Art: Active</div>
            <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-medium border border-[#E76F51]/50 text-[#E76F51]">Withings: Fail</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4A261]/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>
    </div>
  );
}
