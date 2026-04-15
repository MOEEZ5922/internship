import { physicianQueue } from '../../data/mockData';
import { AlertTriangle, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function PhysicianHome() {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-[#E76F51] text-white';
    if (score >= 70) return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#0A1128] mb-2">Exception-Based Inbox</h1>
        <p className="text-[#5A6B7C]">
          Clinical escalations only. All routine cases are filtered out.
        </p>
      </div>

      {/* Urgent Actions Section */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="bg-[#E76F51] px-6 py-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-xl text-white">Urgent Actions</h2>
            <p className="text-white/90 text-sm">
              Risk Score ≥8 or Complex AHI Patterns
            </p>
          </div>
          <div className="ml-auto">
            <span className="bg-white text-[#E76F51] px-4 py-1 rounded-full font-semibold">
              {physicianQueue.urgent.length} Patients
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E8EEF2]">
          {physicianQueue.urgent.map((patient) => (
            <div
              key={patient.id}
              className="p-6 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-[#0A1128] font-medium">
                      {patient.patientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskScore)}`}>
                      Risk: {patient.riskScore}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E8EEF2] text-[#5A6B7C]">
                      {patient.category}
                    </span>
                  </div>
                  <p className="text-[#E76F51] font-medium mb-2">
                    {patient.reason}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#5A6B7C]">
                    <span>Last Review: {new Date(patient.lastReview).toLocaleDateString()}</span>
                    {patient.daysOverdue > 0 && (
                      <span className="text-[#E76F51] font-medium">
                        {patient.daysOverdue} days overdue
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to={`/physician/patient/${patient.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#2D9596]/90 transition-colors"
                >
                  Review
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Reviews Section */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="bg-[#2D9596] px-6 py-4 flex items-center gap-3">
          <Calendar className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-xl text-white">Annual Reviews</h2>
            <p className="text-white/90 text-sm">
              Patients due for yearly assessment
            </p>
          </div>
          <div className="ml-auto">
            <span className="bg-white text-[#2D9596] px-4 py-1 rounded-full font-semibold">
              {physicianQueue.annualReviews.length} Patients
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E8EEF2]">
          {physicianQueue.annualReviews.map((patient) => (
            <div
              key={patient.id}
              className="p-6 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg text-[#0A1128] font-medium">
                      {patient.patientName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Overdue'
                        ? 'bg-[#E76F51] text-white'
                        : 'bg-[#F4A261] text-white'
                    }`}>
                      {patient.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#E8EEF2] text-[#5A6B7C]">
                      Risk: {patient.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#5A6B7C]">
                    <span>Therapy Start: {new Date(patient.therapyStart).toLocaleDateString()}</span>
                    <span>
                      {patient.daysUntilDue < 0
                        ? `${Math.abs(patient.daysUntilDue)} days overdue`
                        : `Due in ${patient.daysUntilDue} days`}
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2D9596] text-white rounded-lg hover:bg-[#2D9596]/90 transition-colors">
                  Schedule
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-[#E8EEF2] rounded-xl p-6">
        <h3 className="text-[#0A1128] font-medium mb-2">ℹ️ About This View</h3>
        <p className="text-[#5A6B7C] text-sm">
          This exception-based inbox hides all routine patients and mechanical noise. You only see
          patients requiring clinical escalation (Risk ≥8), complex AHI patterns (central vs.
          obstructive), or annual review deadlines. AI Weekly State data is already baked into the
          sorting algorithm.
        </p>
      </div>
    </div>
  );
}
