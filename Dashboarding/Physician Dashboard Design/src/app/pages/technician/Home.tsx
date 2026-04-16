import { technicianQueue } from '../../data/mockData';
import { AlertTriangle, MapPin, Clock, ChevronRight, PackageCheck } from 'lucide-react';
import { Link } from 'react-router';

export default function TechnicianHome() {
  const getRiskColor = (risk: number) => {
    if (risk >= 80) return 'bg-[#E76F51] text-white';
    if (risk >= 60) return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  const getUsageBadge = (category: string) => {
    if (category === '<2 hrs') return 'bg-[#E76F51] text-white';
    if (category === '2-4 hrs') return 'bg-[#F4A261] text-white';
    return 'bg-[#6A994E] text-white';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-[#0A1128] mb-2">Unified Priority Queue</h1>
        <p className="text-[#5A6B7C]">
          Sorted strictly by Dropout Risk and Usage Hours. Tackle high-risk, low-usage patients first.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Critical (&lt;2 hrs)</p>
            <AlertTriangle className="w-5 h-5 text-[#E76F51]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '<2 hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">At Risk (2-4 hrs)</p>
            <Clock className="w-5 h-5 text-[#F4A261]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '2-4 hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Stable (4+ hrs)</p>
            <Clock className="w-5 h-5 text-[#6A994E]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.filter(p => p.usageCategory === '4+ hrs').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-[#5A6B7C]">Total Queue</p>
            <MapPin className="w-5 h-5 text-[#2D9596]" />
          </div>
          <p className="text-3xl font-semibold text-[#0A1128]">
            {technicianQueue.length}
          </p>
        </div>
      </div>

      {/* Priority Queue Table */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F4A261] text-white">
                <th className="text-left py-4 px-6 font-medium">Priority</th>
                <th className="text-left py-4 px-6 font-medium">Patient Name</th>
                <th className="text-left py-4 px-6 font-medium">Dropout Risk</th>
                <th className="text-left py-4 px-6 font-medium">Usage (hrs)</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Postal Code</th>
                <th className="text-left py-4 px-6 font-medium">Last Contact</th>
                <th className="text-left py-4 px-6 font-medium">Action Required</th>
                <th className="text-left py-4 px-6 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8EEF2]">
              {technicianQueue.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E8EEF2] text-[#0A1128] font-semibold">
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#0A1128] font-medium">
                      {patient.patientName}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.dropoutRisk)}`}>
                      {patient.dropoutRisk}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#0A1128] font-medium">
                    {patient.usageHours.toFixed(1)}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUsageBadge(patient.usageCategory)}`}>
                      {patient.usageCategory}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-[#5A6B7C]">
                      <MapPin className="w-4 h-4" />
                      <span>{patient.postalCode}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#5A6B7C]">
                    {new Date(patient.lastContact).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-[#E76F51] font-medium">
                    {patient.action}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/technician/patient/${patient.id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#F4A261] text-white rounded-lg hover:bg-[#F4A261]/90 transition-colors text-xs font-medium whitespace-nowrap"
                      >
                        Prep Visit
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button
                        title="Quick Log Dispatch"
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596] hover:text-white transition-all shadow-sm flex-shrink-0"
                      >
                        <PackageCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            📦 Schedule Bulk Dispatch
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Group equipment deliveries by postal code
          </p>
        </button>
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            📞 Call List Export
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Download priority call list for today
          </p>
        </button>
        <button className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm hover:shadow-md transition-all text-left">
          <h3 className="text-lg text-[#0A1128] font-medium mb-2">
            🗺️ Route Optimizer
          </h3>
          <p className="text-sm text-[#5A6B7C]">
            Plan home visits by geographic area
          </p>
        </button>
      </div>
    </div>
  );
}
