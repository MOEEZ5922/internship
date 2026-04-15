import { biomarkerData } from '../../data/mockData';
import { Heart, Star } from 'lucide-react';

export default function PatientBiomarkers() {
  return (
    <div className="p-6 space-y-6">
      {/* Sleep Quality Score */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/90 text-sm mb-2">Your Sleep Quality Score</p>
            <div className="flex items-baseline gap-2">
              <p className="text-6xl font-bold">{biomarkerData.sleepQuality}</p>
              <p className="text-2xl text-white/80">/100</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Star className="w-10 h-10" fill="white" />
          </div>
        </div>
        <p className="text-white/90">
          Excellent! Your sleep quality has improved significantly this month.
        </p>
      </div>

      {/* Restfulness */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#2D9596]/10 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#2D9596]" />
          </div>
          <div>
            <p className="text-sm text-[#5A6B7C]">How Rested You Feel</p>
            <p className="text-2xl font-semibold text-[#0A1128]">{biomarkerData.restfulness}</p>
          </div>
        </div>
        <p className="text-sm text-[#5A6B7C]">
          Based on your therapy data and health metrics, you're getting good quality rest.
        </p>
      </div>

      {/* What This Means */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg text-[#0A1128] mb-4">What This Means</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#6A994E] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Better Energy</p>
              <p className="text-sm text-[#5A6B7C]">
                You should feel more alert and energized during the day
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#2D9596] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Improved Health</p>
              <p className="text-sm text-[#5A6B7C]">
                Better sleep supports your heart health and immune system
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[#F4A261] rounded-full mt-2 flex-shrink-0" />
            <div>
              <p className="text-[#0A1128] font-medium mb-1">Sharper Focus</p>
              <p className="text-sm text-[#5A6B7C]">
                Quality sleep helps with memory and concentration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Visual */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-4">Your Progress Over Time</h4>
        <div className="flex items-end justify-between gap-2 h-32">
          {[65, 72, 78, 81, 85].map((value, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className="bg-gradient-to-t from-[#6A994E] to-[#2D9596] rounded-t-lg transition-all"
                style={{ height: `${value}%` }}
              />
              <p className="text-xs text-[#5A6B7C] text-center mt-2">Week {index + 1}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[#5A6B7C] mt-4">
          Your sleep quality has improved by 20 points in the last 5 weeks!
        </p>
      </div>
    </div>
  );
}
