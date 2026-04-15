import { useState } from 'react';
import { interventionData } from '../../data/mockData';
import { FileSignature, AlertCircle } from 'lucide-react';

export default function PhysicianInterventions() {
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');

  const handleAuthorize = () => {
    alert(`Authorization submitted for: ${selectedTherapy}\n\nClinical Notes:\n${clinicalNotes}`);
  };

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm p-8">
        <div className="mb-8">
          <h2 className="text-2xl text-[#0A1128] mb-2 font-semibold">Alternative Therapy Authorization</h2>
          <p className="text-[#5A6B7C]">
            Authorize specialized treatments for patients who have failed standard CPAP therapy.
          </p>
        </div>

        <div className="space-y-8">
          {/* NEW: Intervention Viability Log */}
          <div>
            <label className="block text-sm font-semibold text-[#0A1128] mb-3 uppercase tracking-wider">
              Prior Technical Interventions (Viability Log)
            </label>
            <div className="bg-[#FAFAFA] rounded-lg border border-[#E8EEF2] overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#E8EEF2] text-[#5A6B7C]">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Technician Action</th>
                    <th className="text-left py-3 px-4 font-medium">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EEF2]">
                  <tr>
                    <td className="py-3 px-4">2026-03-15</td>
                    <td className="py-3 px-4 font-medium text-[#0A1128]">Dispatched new AirFit F20 Mask</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-[#E76F51] font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed - Leakage remains &gt;24 L/min
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">2026-02-28</td>
                    <td className="py-3 px-4 font-medium text-[#0A1128]">Pressure calibration (increased to 12 cmH2O)</td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-[#E76F51] font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Failed - Patient reported severe intolerance
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#5A6B7C] mt-2 italic">
              * Clinical Requirement: Review all technical failures before authorizing alternative therapies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Therapy Selection */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#0A1128] uppercase tracking-wider">
                Select Alternative Therapy
              </label>
              <div className="space-y-3">
                {interventionData.physician.availableTherapies.map((therapy) => (
                  <label
                    key={therapy}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTherapy === therapy
                        ? 'border-[#2D9596] bg-[#2D9596]/5'
                        : 'border-[#E8EEF2] hover:border-[#2D9596]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="therapy"
                      value={therapy}
                      checked={selectedTherapy === therapy}
                      onChange={(e) => setSelectedTherapy(e.target.value)}
                      className="w-5 h-5 text-[#2D9596] border-[#E8EEF2] focus:ring-[#2D9596]"
                    />
                    <span className="text-[#0A1128] font-medium">{therapy}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clinical Notes */}
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#0A1128] uppercase tracking-wider">
                Clinical Indication & Justification
              </label>
              <textarea
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Detail why CPAP was abandoned and why this specific alternative is indicated..."
                className="w-full h-[236px] px-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596]/20 transition-all resize-none text-sm"
              />
            </div>
          </div>

          {/* Corrected Patient Context Summary */}
          <div className="bg-[#E76F51]/5 rounded-lg p-6 border border-[#E76F51]/20">
            <h4 className="text-sm font-semibold text-[#E76F51] mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Documented Therapy Failure (Clinical State)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <p className="text-[#5A6B7C] mb-1">Status</p>
                <p className="text-[#E76F51] font-bold uppercase">Non-Adherent</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Avg. Usage</p>
                <p className="text-[#0A1128] font-medium text-lg">1.2 hrs/night</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Refractory AHI</p>
                <p className="text-[#0A1128] font-medium text-lg">12.4 events/h</p>
              </div>
              <div>
                <p className="text-[#5A6B7C] mb-1">Mask Leak (95th)</p>
                <p className="text-[#E76F51] font-bold text-lg">34.2 L/min</p>
              </div>
            </div>
          </div>

          {/* Authorization Button */}
          <button
            onClick={handleAuthorize}
            disabled={!selectedTherapy || !clinicalNotes}
            className="w-full bg-[#2D9596] text-white px-6 py-4 rounded-lg hover:bg-[#247a7a] disabled:bg-[#E8EEF2] disabled:text-[#5A6B7C] disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2D9596]/20 disabled:shadow-none"
          >
            <FileSignature className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">Authorize & Sign Record</span>
          </button>

          <p className="text-[10px] text-[#5A6B7C] text-center uppercase tracking-tighter">
            Legal Notice: Your electronic signature will be timestamped and permanently attached to this clinical record.
          </p>
        </div>
      </div>
    </div>
  );
}
