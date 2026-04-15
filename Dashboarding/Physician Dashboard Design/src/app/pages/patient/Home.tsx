import { cpapData, interventionData, surveyData } from '../../data/mockData';
import { Moon, Flame, ChevronRight, Package, FileText, Sparkles, Video, HelpCircle } from 'lucide-react';
import { Link } from 'react-router';

export default function PatientHome() {
  const lastNightHours = cpapData.usageHistory[cpapData.usageHistory.length - 1]?.hours || 0;
  const percentComplete = (lastNightHours / 8) * 100;
  const weeklyAverage = cpapData.averageHours;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {/* Next Step Card - Prominent */}
      <div className="bg-gradient-to-br from-[#6A994E] to-[#2D9596] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/90 text-sm mb-1">Your Next Step</p>
            <h2 className="text-2xl font-bold">1-Month Check-In Survey</h2>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
        <p className="text-white/90 mb-6">
          Due in 3 days • 8 quick questions • Takes ~5 minutes
        </p>
        <Link
          to="/patient/surveys"
          className="flex items-center justify-center gap-2 w-full bg-white text-[#2D9596] py-4 rounded-xl font-semibold hover:bg-white/95 transition-all shadow-md"
        >
          Start Survey
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Sleep Progress Rings */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl text-[#0A1128] mb-6">Last Night's Progress</h3>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Hours Ring */}
          <div className="text-center">
            <div className="relative w-36 h-36 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#E8EEF2"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="url(#sleepGradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${percentComplete * 4.02} 402`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6A994E" />
                    <stop offset="100%" stopColor="#2D9596" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Moon className="w-6 h-6 text-[#2D9596] mb-1" />
                <p className="text-3xl font-bold text-[#0A1128]">
                  {lastNightHours.toFixed(1)}
                </p>
                <p className="text-xs text-[#5A6B7C]">hours</p>
              </div>
            </div>
            <p className="text-sm text-[#5A6B7C]">Sleep with Therapy</p>
            <p className="text-lg font-semibold text-[#6A994E] mt-1">
              {lastNightHours >= 6 ? 'Excellent!' : lastNightHours >= 4 ? 'Good Job!' : 'Keep Going!'}
            </p>
          </div>

          {/* Streak Ring */}
          <div className="text-center">
            <div className="relative w-36 h-36 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#E8EEF2"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="#F4A261"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(cpapData.streak / 7) * 100 * 4.02} 402`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Flame className="w-6 h-6 text-[#F4A261] mb-1" />
                <p className="text-3xl font-bold text-[#0A1128]">
                  {cpapData.streak}
                </p>
                <p className="text-xs text-[#5A6B7C]">days</p>
              </div>
            </div>
            <p className="text-sm text-[#5A6B7C]">Current Streak</p>
            <p className="text-lg font-semibold text-[#F4A261] mt-1">
              {cpapData.streak >= 7 ? '🔥 On Fire!' : 'Building Momentum!'}
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7a7b] rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-6 h-6" />
          <h3 className="text-xl font-bold">This Week's Summary</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/90">Average Hours</span>
            <span className="text-2xl font-bold">{weeklyAverage} hrs</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/90">Days Used</span>
            <span className="text-2xl font-bold">{cpapData.usageHistory.length}/7</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/90">Consistency</span>
            <span className="text-2xl font-bold">
              {weeklyAverage >= 6 ? '⭐⭐⭐' : weeklyAverage >= 4 ? '⭐⭐' : '⭐'}
            </span>
          </div>
        </div>
      </div>

      {/* Equipment Delivery Tracker */}
      {interventionData.patient.upcomingDelivery && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-[#F4A261]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#F4A261]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-[#F4A261]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#5A6B7C] mb-1">Equipment on the Way</p>
              <h3 className="text-lg text-[#0A1128] font-semibold mb-2">
                {interventionData.patient.upcomingDelivery.item}
              </h3>
              <p className="text-sm text-[#2D9596] font-medium mb-4">
                Arriving: {new Date(interventionData.patient.upcomingDelivery.estimatedArrival).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              
              {/* Delivery Progress Steps */}
              <div className="flex items-center gap-2">
                {interventionData.patient.upcomingDelivery.steps.map((step, index) => (
                  <div key={index} className="flex-1 flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      step.completed
                        ? 'bg-[#6A994E] text-white'
                        : 'bg-[#E8EEF2] text-[#5A6B7C]'
                    }`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    {index < interventionData.patient.upcomingDelivery.steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-1 ${
                        step.completed ? 'bg-[#6A994E]' : 'bg-[#E8EEF2]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Motivational Card */}
      <div className="bg-gradient-to-br from-[#F4A261] to-[#e39350] rounded-3xl p-8 text-white shadow-lg">
        <h3 className="text-xl font-bold mb-3">💡 Sleep Better Tip</h3>
        <p className="text-white/95 text-lg leading-relaxed">
          "Try wearing your mask for 30 minutes before bed while reading or watching TV. 
          This helps your body get comfortable with the therapy before sleep."
        </p>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/patient/videos"
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EEF2] hover:shadow-md transition-all text-center"
        >
          <Video className="w-8 h-8 text-[#2D9596] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#0A1128]">Watch Tutorials</p>
        </Link>
        <Link
          to="/patient/help"
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8EEF2] hover:shadow-md transition-all text-center"
        >
          <HelpCircle className="w-8 h-8 text-[#F4A261] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#0A1128]">Get Help</p>
        </Link>
      </div>
    </div>
  );
}