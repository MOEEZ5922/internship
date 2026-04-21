import { useState } from 'react';
import { useLocation } from 'react-router';
import { AlertCircle, ChevronDown, CalendarDays, MessageSquare, ShieldAlert, UserCircle, CheckCircle, ClipboardList, Plus } from 'lucide-react';
import { technicianQueue } from '../../data/mockData';

type SurveyType = 'PSQI' | 'ISI' | 'ESS' | 'FSS' | 'SF-36' | 'BDI';

export default function UnifiedSurveys() {
  const location = useLocation();
  const isTechnician = location.pathname.includes('/technician');
  
  const [activeSurvey, setActiveSurvey] = useState<SurveyType>('ESS');

  const surveyDatabase = {
    ESS: {
      name: 'Epworth Sleepiness Scale (ESS)',
      date: '2026-04-10',
      score: 14,
      threshold: 10,
      risk: 'Elevated',
      breakdown: [
        { label: 'Sitting and reading', answer: 'Moderate chance of dozing (2)' },
        { label: 'Watching TV', answer: 'High chance of dozing (3)' },
        { label: 'Sitting inactive in a public place', answer: 'Slight chance of dozing (1)' },
        { label: 'As a passenger in a car for an hour', answer: 'Moderate chance of dozing (2)' },
        { label: 'Lying down to rest in the afternoon', answer: 'High chance of dozing (3)' },
      ],
      clinicalNote: 'Patient exhibits significant daytime sleepiness despite CPAP therapy. Consider evaluating for residual apneas or insufficient sleep syndrome.'
    },
    PSQI: {
      name: 'Pittsburgh Sleep Quality Index (PSQI)',
      date: '2026-03-25',
      score: 8,
      threshold: 5,
      risk: 'Elevated',
      breakdown: [
        { label: 'Subjective sleep quality', answer: 'Fairly bad (2)' },
        { label: 'Sleep latency', answer: '> 30 minutes (2)' },
        { label: 'Sleep duration', answer: '5-6 hours (1)' },
        { label: 'Habitual sleep efficiency', answer: '< 75% (3)' },
      ],
      clinicalNote: 'Poor sleep quality and efficiency indicated. Mask discomfort may be contributing to prolonged sleep latency.'
    },
    ISI: {
      name: 'Insomnia Severity Index (ISI)',
      date: '2026-04-01',
      score: 16,
      threshold: 14,
      risk: 'Moderate',
      breakdown: [
        { label: 'Difficulty falling asleep', answer: 'Moderate (2)' },
        { label: 'Difficulty staying asleep', answer: 'Severe (3)' },
        { label: 'Problem waking up too early', answer: 'Mild (1)' },
        { label: 'Interference with daily functioning', answer: 'Much (3)' },
      ],
      clinicalNote: 'Moderate clinical insomnia. Patient reports frequent awakenings which correlate with CPAP pressure surges.'
    },
    FSS: {
      name: 'Fatigue Severity Scale (FSS)',
      date: '2026-03-10',
      score: 42,
      threshold: 36,
      risk: 'High',
      breakdown: [
        { label: 'Exercise brings on my fatigue', answer: 'Strongly Agree (7)' },
        { label: 'Fatigue interferes with physical functioning', answer: 'Agree (5)' },
        { label: 'Fatigue causes frequent problems', answer: 'Agree (5)' },
        { label: 'My fatigue prevents sustained physical functioning', answer: 'Strongly Agree (7)' },
      ],
      clinicalNote: 'Severe fatigue reported impacting physical activity. Possible comorbidity or profoundly fragmented sleep architecture.'
    },
    'SF-36': {
      name: 'Short Form 36 Health Survey (SF-36)',
      date: '2026-01-15',
      score: 65,
      threshold: 50,
      risk: 'Normal',
      breakdown: [
        { label: 'Physical Functioning', answer: '80/100' },
        { label: 'Role Limitations (Physical)', answer: '50/100' },
        { label: 'Energy/Fatigue', answer: '45/100' },
        { label: 'Emotional Well-being', answer: '70/100' },
      ],
      clinicalNote: 'General health is acceptable, but energy levels are sub-par. Annual review baseline established.'
    },
    BDI: {
      name: 'Beck Depression Inventory (BDI)',
      date: '2026-02-28',
      score: 11,
      threshold: 13,
      risk: 'Normal',
      breakdown: [
        { label: 'Sadness', answer: 'I do not feel sad (0)' },
        { label: 'Pessimism', answer: 'I am not particularly discouraged about the future (0)' },
        { label: 'Loss of Energy', answer: 'I have less energy than I used to (1)' },
        { label: 'Changes in Sleep Pattern', answer: 'I sleep most of the day (3)' },
      ],
      clinicalNote: 'Minimal clinical depression indicated. Symptoms are highly localized to energy and sleep pattern disruptions.'
    }
  };

  const activeContent = surveyDatabase[activeSurvey];

  const getRiskColor = (risk: string) => {
    if (risk === 'High') return 'text-[#E76F51]';
    if (risk === 'Elevated' || risk === 'Moderate') return 'text-[#F4A261]';
    return 'text-[#6A994E]';
  };

  const getRiskBadge = (risk: string) => {
    if (risk === 'High') return 'bg-[#E76F51]/10 text-[#E76F51]';
    if (risk === 'Elevated' || risk === 'Moderate') return 'bg-[#F4A261]/10 text-[#F4A261]';
    return 'bg-[#6A994E]/10 text-[#6A994E]';
  };

  return (
    <div className="p-8 max-w-5xl space-y-8 pb-20">
      
      {/* Role-Specific Action Banner */}
      <div className={`p-6 rounded-2xl border-2 flex items-center justify-between ${isTechnician ? 'bg-[#F4A261]/5 border-[#F4A261]/30' : 'bg-[#6A994E]/5 border-[#6A994E]/30'}`}>
         <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isTechnician ? 'bg-[#F4A261] text-white' : 'bg-[#6A994E] text-white'}`}>
               {isTechnician ? <ClipboardList /> : <UserCircle />}
            </div>
            <div>
               <h2 className="text-xl font-bold text-[#0A1128]">
                  {isTechnician ? 'Behavioral Monitoring Desk' : 'Clinical Assessment Review'}
               </h2>
               <p className="text-sm text-[#5A6B7C]">
                  {isTechnician ? 'Log visit observations and view patient-reported milestones.' : 'Review standardized medical surveys and technician field notes.'}
               </p>
            </div>
         </div>
         
         {isTechnician && (
            <button 
               className="bg-[#F4A261] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#e39350] transition-all flex items-center gap-2"
               onClick={() => alert('Opening Operational Monitoring Form...')}
            >
               <Plus className="w-5 h-5" /> Start New Observation
            </button>
         )}
      </div>

      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        {/* Survey Selector Menu */}
        <div className="p-6 border-b border-[#E8EEF2] bg-[#FAFAFA]">
          <div className="flex items-center justify-between mb-4">
             <label className="text-sm font-bold text-[#0A1128] uppercase tracking-widest">
               Select Standardized Milestone
             </label>
             <span className="text-[10px] bg-[#6A994E] text-white px-2 py-0.5 rounded font-bold uppercase">Clinical Gateway</span>
          </div>
          <div className="relative">
            <select 
              value={activeSurvey}
              onChange={(e) => setActiveSurvey(e.target.value as SurveyType)}
              className="w-full appearance-none bg-white border-2 border-[#E8EEF2] text-[#0A1128] font-bold py-4 px-5 rounded-xl focus:outline-none focus:border-[#2D9596] cursor-pointer transition-all shadow-sm"
            >
              <option value="ESS">Epworth Sleepiness Scale (ESS)</option>
              <option value="PSQI">Pittsburgh Sleep Quality Index (PSQI)</option>
              <option value="ISI">Insomnia Severity Index (ISI)</option>
              <option value="FSS">Fatigue Severity Scale (FSS)</option>
              <option value="SF-36">SF-36 Health Survey (SF-36)</option>
              <option value="BDI">Beck Depression Inventory (BDI)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5A6B7C]">
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Dynamic Active Survey Area */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Active Survey Header */}
          <div className="p-8 border-b border-[#E8EEF2]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#0A1128]">{activeContent.name}</h3>
              {activeContent.score > activeContent.threshold && (
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#E76F51] bg-[#E76F51]/10 px-4 py-2 rounded-full uppercase tracking-widest border border-[#E76F51]/20">
                  <AlertCircle className="w-4 h-4" /> Threshold Breach
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E8EEF2]">
                <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Assessment Date</p>
                <p className="text-lg font-bold text-[#0A1128] flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#2D9596]" />
                  {new Date(activeContent.date).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E8EEF2]">
                <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Total Score</p>
                <p className={`text-2xl font-bold ${getRiskColor(activeContent.risk)}`}>{activeContent.score}</p>
              </div>
              <div className="bg-[#FAFAFA] p-4 rounded-xl border border-[#E8EEF2]">
                <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mb-1">Status</p>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest inline-block mt-1 ${getRiskBadge(activeContent.risk)}`}>
                  {activeContent.risk} Risk
                </span>
              </div>
              <div className="bg-[#2D9596]/5 p-4 rounded-xl border border-[#2D9596]/10 flex flex-col justify-center">
                <p className="text-[8px] text-[#2D9596] uppercase font-bold tracking-widest mb-1">AI Automation</p>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#2D9596]">
                  <CheckCircle className="w-3 h-3" /> Auto Follow-up Active
                </span>
              </div>
            </div>
          </div>
          
          {/* Active Survey Breakdown */}
          <div className="p-8 pb-10">
            <h4 className="text-xs font-bold text-[#5A6B7C] uppercase tracking-widest mb-4">Itemized Patient Responses</h4>
            <div className="divide-y divide-[#E8EEF2] bg-[#FAFAFA] rounded-2xl border border-[#E8EEF2] overflow-hidden mb-8">
              {activeContent.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-5 hover:bg-white transition-colors">
                  <span className="text-[#5A6B7C] font-semibold text-sm">{item.label}</span>
                  <span className="text-[#0A1128] font-bold text-sm bg-white border border-[#E8EEF2] px-4 py-1.5 rounded-lg shadow-sm">{item.answer}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#F4A261]/10 border-l-4 border-[#F4A261] rounded-r-2xl p-6 shadow-sm">
              <h4 className="text-sm font-bold text-[#0A1128] mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F4A261]" /> Interpretive Clinical Note
              </h4>
              <p className="text-sm text-[#0A1128] leading-relaxed italic">
                "{activeContent.clinicalNote}"
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Technician Monitoring & Operational Logs (Universal Section) */}
      <div className="bg-[#0A1128] rounded-2xl border border-[#0A1128] shadow-xl overflow-hidden mt-8">
        <div className="p-6 text-white flex items-center justify-between border-b border-white/10">
           <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-[#F4A261]" />
              <div>
                 <h3 className="text-xl font-bold">Technician Field Connectivity</h3>
                 <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Operational Monitoring History</p>
              </div>
           </div>
           <span className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">Universal Truth Layer</span>
        </div>
        
        <div className="p-8 space-y-6 bg-white/5">
           {technicianQueue?.[0]?.monitoringSurveys?.map((log: any, idx: number) => (
             <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-transparent hover:border-[#F4A261]/30 transition-all group">
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#FAFAFA] rounded-full flex items-center justify-center border border-[#E8EEF2]">
                         <UserCircle className="w-7 h-7 text-[#5A6B7C]" />
                      </div>
                      <div>
                         <p className="text-md font-bold text-[#0A1128] group-hover:text-[#F4A261] transition-colors">{log.question}</p>
                         <p className="text-[10px] text-[#5A6B7C] uppercase font-bold tracking-widest mt-0.5">{log.role}: {log.author}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-mono font-bold bg-[#FAFAFA] px-2 py-1 rounded text-[#5A6B7C] border border-[#E8EEF2]">{log.date}</span>
                </div>
                
                <div className="bg-[#F4A261]/5 border-2 border-dashed border-[#F4A261]/20 p-5 rounded-2xl flex items-center gap-4 group-hover:bg-[#F4A261]/10 transition-colors">
                   <MessageSquare className="w-5 h-5 text-[#F4A261]" />
                   <p className="text-sm font-bold text-[#0A1128] leading-relaxed">
                     <span className="text-[#F4A261] uppercase text-[10px] font-black mr-2">Field Observation:</span> 
                     {log.answer}
                   </p>
                </div>
             </div>
           ))}
           
           {(!technicianQueue?.[0]?.monitoringSurveys || technicianQueue[0].monitoringSurveys.length === 0) && (
             <div className="text-center py-20">
                <ClipboardList className="w-16 h-16 text-white/10 mx-auto mb-4" />
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">No technician-logged monitoring forms available.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
