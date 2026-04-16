import { useState } from 'react';
import { AlertCircle, ChevronDown, CalendarDays } from 'lucide-react';

type SurveyType = 'PSQI' | 'ISI' | 'ESS' | 'FSS' | 'SF-36' | 'BDI';

export default function PhysicianSurveys() {
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
      clinicalNote: 'Moderateclinical insomnia. Patient reports frequent awakenings which correlate with CPAP pressure surges.'
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
      clinicalNote: 'Severe fatigue reported impacting physical activity. Possible comorbidity or profoundly fragmented sleep architecting.'
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
    <div className="p-8 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Standardized Medical Surveys</h2>
        <p className="text-[#5A6B7C]">Review patient behavioral and psychological assessments.</p>
      </div>

      {/* Survey Selector Menu */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 mb-6">
        <label className="block text-sm font-semibold text-[#0A1128] uppercase tracking-wider mb-3">
          Select Active Survey
        </label>
        <div className="relative">
          <select 
            value={activeSurvey}
            onChange={(e) => setActiveSurvey(e.target.value as SurveyType)}
            className="w-full appearance-none bg-[#FAFAFA] border-2 border-[#E8EEF2] text-[#0A1128] font-medium py-3 px-4 rounded-lg focus:outline-none focus:border-[#2D9596] cursor-pointer transition-colors"
          >
            <option value="ESS">Epworth Sleepiness Scale (ESS)</option>
            <option value="PSQI">Pittsburgh Sleep Quality Index (PSQI)</option>
            <option value="ISI">Insomnia Severity Index (ISI)</option>
            <option value="FSS">Fatigue Severity Scale (FSS)</option>
            <option value="SF-36">SF-36 Health Survey (SF-36)</option>
            <option value="BDI">Beck Depression Inventory (BDI)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#5A6B7C]">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Dynamic Active Survey Area */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* Active Survey Header */}
        <div className="bg-[#FAFAFA] p-6 border-b border-[#E8EEF2]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#0A1128]">{activeContent.name}</h3>
            {activeContent.score > activeContent.threshold && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#E76F51] bg-[#E76F51]/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5" /> Clinical Threshold Exceeded
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-8 bg-white p-4 rounded-lg border border-[#E8EEF2]">
            <div>
              <p className="text-xs text-[#5A6B7C] uppercase tracking-wider mb-1">Assessment Date</p>
              <p className="text-lg font-bold text-[#0A1128] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#2D9596]" />
                {new Date(activeContent.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5A6B7C] uppercase tracking-wider mb-1">Total Score</p>
              <p className={`text-2xl font-bold ${getRiskColor(activeContent.risk)}`}>{activeContent.score}</p>
            </div>
            <div>
              <p className="text-xs text-[#5A6B7C] uppercase tracking-wider mb-1">Clinical Threshold</p>
              <p className="text-xl font-bold text-[#0A1128]">{activeContent.threshold}</p>
            </div>
            <div>
              <p className="text-xs text-[#5A6B7C] uppercase tracking-wider mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block mt-1 ${getRiskBadge(activeContent.risk)}`}>
                {activeContent.risk} Risk
              </span>
            </div>
          </div>
        </div>
        
        {/* Active Survey Breakdown */}
        <div className="px-6 py-6 pb-8">
          
          <div className="mb-8">
            <h4 className="text-sm font-bold text-[#0A1128] uppercase tracking-wider mb-4 border-b border-[#E8EEF2] pb-2">Itemized Responses</h4>
            <div className="divide-y divide-[#E8EEF2] bg-[#FAFAFA] rounded-lg border border-[#E8EEF2]">
              {activeContent.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4">
                  <span className="text-[#5A6B7C] font-medium text-sm">{item.label}</span>
                  <span className="text-[#0A1128] font-bold text-sm bg-white border border-[#E8EEF2] px-3 py-1 rounded-md">{item.answer}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F4A261]/10 border-l-4 border-[#F4A261] rounded-r-lg p-5">
            <h4 className="text-sm font-bold text-[#0A1128] mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#F4A261]" /> Clinical AI Note
            </h4>
            <p className="text-sm text-[#0A1128] leading-relaxed">
              {activeContent.clinicalNote}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
