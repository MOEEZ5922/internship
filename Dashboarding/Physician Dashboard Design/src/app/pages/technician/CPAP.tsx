import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cpapData } from '../../data/mockData';
import { Clock, Wind, Calendar } from 'lucide-react';

export default function TechnicianCPAP() {
  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Average Hours Used</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.averageHours}</p>
            </div>
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#F4A261]" />
            </div>
          </div>
          <p className="text-sm text-[#5A6B7C]">Target: &gt;4 hours/night</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Mask Type</p>
              <p className="text-lg font-semibold text-[#0A1128]">AirFit F20</p>
              <p className="text-[#5A6B7C]">Medium</p>
            </div>
            <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
              <Wind className="w-6 h-6 text-[#2D9596]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Last Mask Change</p>
              <p className="text-lg font-semibold text-[#0A1128]">
                {new Date(cpapData.lastMaskChange).toLocaleDateString()}
              </p>
              <p className="text-[#F4A261]">64 days ago</p>
            </div>
            <div className="w-12 h-12 bg-[#6A994E]/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#6A994E]" />
            </div>
          </div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-6">Daily Usage Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cpapData.usageHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              stroke="#5A6B7C"
            />
            <YAxis
              label={{ value: 'Hours', angle: -90, position: 'insideLeft' }}
              stroke="#5A6B7C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E8EEF2',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value} hours`, 'Usage']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Bar dataKey="hours" fill="#F4A261" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pressure Settings Table */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-6">Machine Pressure Settings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E8EEF2]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Setting</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#5A6B7C]">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E8EEF2]">
                <td className="py-3 px-4 text-[#0A1128]">Minimum Pressure</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.min}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmH₂O</td>
              </tr>
              <tr className="border-b border-[#E8EEF2]">
                <td className="py-3 px-4 text-[#0A1128]">Maximum Pressure</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.max}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmH₂O</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#0A1128]">Current Pressure (Auto)</td>
                <td className="py-3 px-4 text-[#0A1128] font-medium">{cpapData.pressureSettings.current}</td>
                <td className="py-3 px-4 text-[#5A6B7C]">cmH₂O</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
