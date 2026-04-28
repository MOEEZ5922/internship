import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cpapData } from '../../data/mockData';
import { TrendingDown, Activity, Wind } from 'lucide-react';

export default function PhysicianCPAP() {
  const [chartPeriod, setChartPeriod] = useState<'30' | '60' | '90'>('30');


  return (
    <div className="p-8 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Current AHI</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.currentAHI}</p>
            </div>
            <div className="w-12 h-12 bg-[#6A994E]/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#6A994E]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#6A994E]">↓ 12%</span>
            <span className="text-[#5A6B7C]">vs. last month</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
            <p className="text-xs text-[#5A6B7C]">
              Normal range: &lt;5 events/hour. Patient shows good control.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">90th Percentile Leak</p>
              <p className="text-4xl font-semibold text-[#0A1128]">{cpapData.percentileLeak} <span className="text-xl text-[#5A6B7C]">L/min</span></p>
            </div>
            <div className="w-12 h-12 bg-[#2D9596]/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#2D9596]" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#F4A261]">↑ 5%</span>
            <span className="text-[#5A6B7C]">vs. last month</span>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
            <p className="text-xs text-[#5A6B7C]">
              Target: &lt;24 L/min. Current leak rate is acceptable.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#5A6B7C] mb-1">Mask Interface</p>
              <p className="text-lg font-bold text-[#0A1128]">AirFit F20</p>
              <p className="text-sm text-[#5A6B7C]">Medium (Full Face)</p>
            </div>
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-lg flex items-center justify-center">
              <Wind className="w-6 h-6 text-[#F4A261]" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#E8EEF2]">
            <p className="text-xs text-[#5A6B7C]">
              Mask leak is often tied to fit integrity. Full-face masks have higher tolerances.
            </p>
          </div>
        </div>
      </div>

      {/* AHI Trend Chart */}
      <div className="bg-white rounded-xl p-6 border border-[#E8EEF2] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-[#0A1128]">AHI Trend Analysis</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setChartPeriod('30')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${chartPeriod === '30'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                  }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setChartPeriod('60')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${chartPeriod === '60'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                  }`}
              >
                60 Days
              </button>
              <button
                onClick={() => setChartPeriod('90')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${chartPeriod === '90'
                    ? 'bg-[#2D9596] text-white'
                    : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#2D9596]/10'
                  }`}
              >
                90 Days
              </button>
            </div>

          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={cpapData.thirtyDayTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8EEF2" />
            <XAxis
              dataKey="day"
              label={{ value: 'Days', position: 'insideBottom', offset: -5 }}
              stroke="#5A6B7C"
            />
            <YAxis
              label={{ value: 'Events/Hour', angle: -90, position: 'insideLeft' }}
              stroke="#5A6B7C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E8EEF2',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ahi"
              stroke="#2D9596"
              strokeWidth={2}
              dot={{ fill: '#2D9596', r: 4 }}
              name="AHI"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Average AHI (30d)</p>
            <p className="text-xl font-semibold text-[#0A1128]">4.1</p>
          </div>
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Trend Direction</p>
            <p className="text-xl font-semibold text-[#6A994E]">Improving</p>
          </div>
          <div className="bg-[#E8EEF2] rounded-lg p-4">
            <p className="text-xs text-[#5A6B7C] mb-1">Days Below Target (&lt;5)</p>
            <p className="text-xl font-semibold text-[#0A1128]">24/30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
