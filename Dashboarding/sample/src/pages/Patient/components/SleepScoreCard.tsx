import { Moon } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import type { PatientState } from '../hooks/usePatientData';

interface SleepScoreCardProps {
  metrics: PatientState['metrics'];
}

export function SleepScoreCard({ metrics }: SleepScoreCardProps) {
  // Calculate stroke dasharray for the SVG circle (circumference is ~100 for r=15.9155)
  const circleOffset = `${metrics.sleepScore}, 100`;

  return (
    <Card className="relative flex flex-col items-center justify-center overflow-hidden">
      <CardContent className="w-full flex flex-col items-center">
        <div className="absolute top-6 left-6 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
            Sleep Score
          </span>
        </div>
        <div className="absolute top-6 right-6 text-indigo-400">
          <Moon className="h-5 w-5 fill-current" />
        </div>

        <div className="relative h-48 w-48 mt-6 flex items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path 
              className="text-zinc-50" 
              strokeWidth="2" 
              stroke="currentColor" 
              fill="none" 
              strokeLinecap="round" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            />
            <path 
              className="text-indigo-500 drop-shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-1000 ease-out" 
              strokeDasharray={circleOffset} 
              strokeWidth="2.5" 
              stroke="currentColor" 
              fill="none" 
              strokeLinecap="round" 
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
            />
          </svg>
          <div className="flex flex-col items-center justify-center mt-2">
            <span className="text-[4rem] font-bold tracking-tighter text-zinc-900 leading-none">
              {metrics.sleepScore}
            </span>
            <span className="text-sm font-semibold text-zinc-400 tracking-wide mt-1">
              {metrics.scoreLabel}
            </span>
          </div>
        </div>

        <div className="flex w-full justify-between mt-10 px-2">
          <MetricItem value={metrics.duration} label="Duration" />
          <div className="h-10 w-px bg-zinc-100"></div>
          <MetricItem value={metrics.streakDays.toString()} label="Day Streak" />
        </div>
      </CardContent>
    </Card>
  );
}

function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-zinc-900 tracking-tight">{value}</span>
      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-1">
        {label}
      </span>
    </div>
  );
}
