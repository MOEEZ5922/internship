import { Search, User, Filter, MoreVertical } from 'lucide-react';

export default function PhysicianDirectory() {
  const patients = [
    { id: '1', name: 'Sarah Mitchell', age: 47, gender: 'F', status: 'Active', compliance: 'Good' },
    { id: '2', name: 'Robert Chen', age: 52, gender: 'M', status: 'Review Needed', compliance: 'Poor' },
    { id: '3', name: 'Maria Garcia', age: 39, gender: 'F', status: 'Active', compliance: 'Excellent' },
    { id: '4', name: 'James Wilson', age: 61, gender: 'M', status: 'Paused', compliance: 'N/A' },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-[#0A1128] font-semibold">Patient Directory</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B7C]" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 bg-white border border-[#E8EEF2] rounded-lg focus:outline-none focus:border-[#2D9596] text-sm w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#E8EEF2] rounded-lg text-sm text-[#5A6B7C] hover:bg-white transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#FAFAFA] border-b border-[#E8EEF2]">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-[#5A6B7C] uppercase">Patient</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5A6B7C] uppercase">Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5A6B7C] uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-[#5A6B7C] uppercase">Compliance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EEF2]">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#E8EEF2] rounded-full flex items-center justify-center text-[#2D9596]">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-[#0A1128]">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#5A6B7C]">
                  {patient.gender}, {patient.age}y
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'Active' ? 'bg-[#6A994E]/10 text-[#6A994E]' : 'bg-[#F4A261]/10 text-[#F4A261]'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    patient.compliance === 'Excellent' || patient.compliance === 'Good' 
                      ? 'text-[#6A994E]' 
                      : 'text-[#E76F51]'
                  }`}>
                    {patient.compliance}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#5A6B7C] hover:text-[#0A1128]">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
