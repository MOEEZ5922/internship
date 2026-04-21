import { cpapData } from '../../data/mockData';
import { Moon, Flame } from 'lucide-react';

export default function PatientCPAP() {
  const percentComplete = (cpapData.averageHours / 8) * 100;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto pb-32">

      {/* Sleep Ring */}
      <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
        <p className="text-[#5A6B7C] mb-2">Last Night</p>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E8EEF2"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${percentComplete * 5.53} 553`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6A994E" />
                <stop offset="100%" stopColor="#2D9596" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Moon className="w-8 h-8 text-[#2D9596] mb-2" />
            <p className="text-4xl font-bold text-[#0A1128]">
              {cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours.toFixed(1)}
            </p>
            <p className="text-sm text-[#5A6B7C]">hours</p>
          </div>
        </div>
        <p className="text-lg text-[#0A1128]">
          Great job! You slept{' '}
          <span className="font-semibold text-[#6A994E]">
            {cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours.toFixed(1)} hours
          </span>{' '}
          with your therapy
        </p>
      </div>

      {/* Streak Tracker */}
      <div className="bg-gradient-to-br from-[#F4A261] to-[#e39350] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <p className="text-white/90 text-sm mb-1">Current Streak</p>
            <p className="text-4xl font-bold">{cpapData.streak} Days</p>
          </div>
        </div>
        <p className="mt-4 text-white/90 text-sm">
          Keep it up! You're building a healthy sleep routine.
        </p>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">This Week's Progress</h3>
        <div className="space-y-3">
          {cpapData.usageHistory.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const progress = (day.hours / 8) * 100;

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#5A6B7C]">{dayName}</span>
                  <span className="text-[#0A1128] font-medium">{day.hours.toFixed(1)} hrs</span>
                </div>
                <div className="h-2 bg-[#E8EEF2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6A994E] to-[#2D9596] rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Encouragement Card */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">💡 Did You Know?</h4>
        <p className="text-[#5A6B7C] text-sm">
          Using your CPAP therapy for at least 4 hours per night can significantly improve your
          energy levels and reduce health risks. You're doing great!
        </p>
      </div>
    </div>
  );
}
