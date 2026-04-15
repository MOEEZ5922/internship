import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { biomarkerData } from '../../data/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PhysicianBiomarkers() {
  const [expandedODI, setExpandedODI] = useState(true);
  const [expandedHRV, setExpandedHRV] = useState(true);
  const [expandedSpO2, setExpandedSpO2] = useState(true);

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl text-[#0A1128]">Biomarker Monitoring</h2>

      {/* ODI Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedODI(!expandedODI)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#F4A261] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Oxygen Desaturation Index (ODI)</h3>
          </div>
          {expandedODI ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedODI && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">11.2</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">10.8</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#F4A261] font-medium">Moderate</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.odi}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#F4A261"
                  strokeWidth={2}
                  dot={false}
                  name="ODI"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* HRV Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedHRV(!expandedHRV)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#2D9596] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Heart Rate Variability (HRV)</h3>
          </div>
          {expandedHRV ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedHRV && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">58 ms</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">55 ms</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#6A994E] font-medium">Good</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.hrv}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2D9596"
                  strokeWidth={2}
                  dot={false}
                  name="HRV (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* SpO2 Chart */}
      <div className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden">
        <button
          onClick={() => setExpandedSpO2(!expandedSpO2)}
          className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#6A994E] rounded-full" />
            <h3 className="text-lg text-[#0A1128]">Blood Oxygen Saturation (SpO2)</h3>
          </div>
          {expandedSpO2 ? <ChevronUp className="w-5 h-5 text-[#5A6B7C]" /> : <ChevronDown className="w-5 h-5 text-[#5A6B7C]" />}
        </button>

        {expandedSpO2 && (
          <div className="px-6 pb-6">
            <div className="mb-4 flex items-center gap-6">
              <div>
                <p className="text-xs text-[#5A6B7C]">Current Value</p>
                <p className="text-2xl font-semibold text-[#0A1128]">96%</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">30-Day Average</p>
                <p className="text-2xl font-semibold text-[#0A1128]">95.8%</p>
              </div>
              <div>
                <p className="text-xs text-[#5A6B7C]">Status</p>
                <p className="text-sm text-[#6A994E] font-medium">Excellent</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={biomarkerData.spo2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
                <XAxis dataKey="day" stroke="#5A6B7C" />
                <YAxis domain={[90, 100]} stroke="#5A6B7C" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8EEF2',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6A994E"
                  strokeWidth={2}
                  dot={false}
                  name="SpO2 (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
