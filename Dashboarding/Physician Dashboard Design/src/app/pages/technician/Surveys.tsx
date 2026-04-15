import { surveyData } from '../../data/mockData';
import { FileText, Plus } from 'lucide-react';

export default function TechnicianSurveys() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Operational Check-In Forms</h2>
        <p className="text-[#5A6B7C]">
          Log technician visits and equipment maintenance activities
        </p>
      </div>

      {/* Log New Visit Button */}
      <div className="mb-6">
        <button className="px-6 py-3 bg-[#F4A261] text-white rounded-lg hover:bg-[#e39350] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Log New Technician Visit
        </button>
      </div>

      {/* Survey List */}
      <div className="space-y-4">
        {surveyData.technician.map((survey) => (
          <div
            key={survey.id}
            className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#F4A261]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#0A1128] mb-2">{survey.name}</h3>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-[#5A6B7C]">Type: </span>
                    <span className="text-[#0A1128] font-medium">{survey.type}</span>
                  </div>
                  <div>
                    <span className="text-[#5A6B7C]">Last Completed: </span>
                    <span className="text-[#0A1128]">
                      {new Date(survey.lastCompleted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="text-[#F4A261] hover:underline text-sm font-medium">
                    Start New Form →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="mt-8 bg-[#E8EEF2] rounded-xl p-6">
        <h4 className="text-sm font-medium text-[#0A1128] mb-4">Form Guidelines</h4>
        <div className="space-y-2 text-sm text-[#5A6B7C]">
          <p>
            • <strong>Post-Visit Hardware Log:</strong> Complete after every in-person visit or
            equipment delivery
          </p>
          <p>
            • <strong>Mask Comfort Check:</strong> Use during follow-up calls to assess patient
            comfort and fit
          </p>
          <p>
            • All forms are automatically timestamped and added to the patient's service history
          </p>
        </div>
      </div>
    </div>
  );
}
