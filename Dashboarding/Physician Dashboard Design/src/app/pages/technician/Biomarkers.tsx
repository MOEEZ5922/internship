import { biomarkerData } from '../../data/mockData';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function TechnicianBiomarkers() {
  const getStatusIcon = (status: string) => {
    return status === 'green' ? (
      <CheckCircle className="w-8 h-8 text-[#6A994E]" />
    ) : (
      <AlertCircle className="w-8 h-8 text-[#F4A261]" />
    );
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Patient Health Status</h2>
        <p className="text-[#5A6B7C]">
          Simplified health indicators to provide context for technical support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Status */}
        <div className="bg-white rounded-xl p-8 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            {getStatusIcon(biomarkerData.status.vitals)}
            <div>
              <h3 className="text-lg text-[#0A1128]">Vital Signs Status</h3>
              <p className="text-[#5A6B7C]">Overall health indicators</p>
            </div>
          </div>
          <div className="mt-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              biomarkerData.status.vitals === 'green'
                ? 'bg-[#6A994E]/10 text-[#6A994E]'
                : 'bg-[#F4A261]/10 text-[#F4A261]'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                biomarkerData.status.vitals === 'green' ? 'bg-[#6A994E]' : 'bg-[#F4A261]'
              }`} />
              <span className="font-medium">
                {biomarkerData.status.vitals === 'green' ? 'All Systems Normal' : 'Attention Needed'}
              </span>
            </div>
          </div>
        </div>

        {/* General Health */}
        <div className="bg-white rounded-xl p-8 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-[#6A994E]" />
            <div>
              <h3 className="text-lg text-[#0A1128]">General Health</h3>
              <p className="text-[#5A6B7C]">Patient-reported status</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-2xl font-semibold text-[#0A1128]">{biomarkerData.status.general}</p>
            <p className="text-sm text-[#5A6B7C] mt-2">
              Patient is not reporting significant health concerns
            </p>
          </div>
        </div>
      </div>

      {/* Contextual Information */}
      <div className="mt-6 bg-[#E8EEF2] rounded-xl p-6">
        <h4 className="text-sm font-medium text-[#0A1128] mb-4">For Technicians</h4>
        <div className="space-y-2 text-sm text-[#5A6B7C]">
          <p>
            • Green status indicates the patient is doing well health-wise - focus on equipment optimization
          </p>
          <p>
            • Yellow/Red status suggests the patient may be struggling - prioritize comfort and troubleshooting
          </p>
          <p>
            • If you notice patterns (e.g., patient removing mask at same time nightly), escalate to care team
          </p>
        </div>
      </div>
    </div>
  );
}
