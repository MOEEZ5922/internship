import { useState } from 'react';
import { surveyData } from '../../data/mockData';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function PhysicianSurveys() {
  const [expandedSurvey, setExpandedSurvey] = useState<number | null>(null);

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
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Medical Survey Results</h2>
        <p className="text-[#5A6B7C]">Click on any survey to view detailed responses</p>
      </div>

      <div className="space-y-4">
        {surveyData.physician.map((survey) => {
          const isExpanded = expandedSurvey === survey.id;
          const isAboveThreshold = survey.score > survey.threshold;

          return (
            <div
              key={survey.id}
              className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedSurvey(isExpanded ? null : survey.id)}
                className="w-full p-6 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {isAboveThreshold && (
                      <AlertCircle className="w-5 h-5 text-[#F4A261] mt-1 flex-shrink-0" />
                    )}
                    <div className="text-left flex-1">
                      <h3 className="text-lg text-[#0A1128] mb-2">{survey.name}</h3>
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-[#5A6B7C]">Date: </span>
                          <span className="text-[#0A1128]">
                            {new Date(survey.dateTaken).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#5A6B7C]">Score: </span>
                          <span className={`font-semibold ${getRiskColor(survey.risk)}`}>
                            {survey.score}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#5A6B7C]">Threshold: </span>
                          <span className="text-[#0A1128]">{survey.threshold}</span>
                        </div>
                        <div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadge(
                              survey.risk
                            )}`}
                          >
                            {survey.risk} Risk
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#5A6B7C] flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5A6B7C] flex-shrink-0 ml-4" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-[#E8EEF2]">
                  <div className="mt-6 space-y-4">
                    <div className="bg-[#E8EEF2] rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#0A1128] mb-3">Survey Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 1: Sleep Quality</span>
                          <span className="text-[#0A1128] font-medium">Poor (3/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 2: Sleep Latency</span>
                          <span className="text-[#0A1128] font-medium">Moderate (2/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 3: Sleep Duration</span>
                          <span className="text-[#0A1128] font-medium">Good (1/4)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5A6B7C]">Question 4: Sleep Efficiency</span>
                          <span className="text-[#0A1128] font-medium">Poor (2/4)</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F4A261]/10 border border-[#F4A261]/20 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-[#0A1128] mb-2">Clinical Note</h4>
                      <p className="text-sm text-[#5A6B7C]">
                        Score exceeds clinical threshold. Consider follow-up assessment and
                        potential adjustment to treatment plan. Patient reports difficulty with
                        sleep quality despite good CPAP compliance.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
