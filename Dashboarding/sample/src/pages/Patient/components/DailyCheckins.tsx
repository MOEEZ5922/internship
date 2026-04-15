import React from 'react';
import { Play, Activity, MessageCircle } from 'lucide-react';
import type { PatientState } from '../hooks/usePatientData';

const iconMap = {
  activity: Activity,
  message: MessageCircle
};

interface DailyCheckinsProps {
  checkins: PatientState['checkins'];
}

export function DailyCheckins({ checkins }: DailyCheckinsProps) {
  return (
    <div className="pt-4 pb-4">
      <h2 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-4 px-2">
        Check-ins
      </h2>
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 p-2">
        {checkins.map((checkin, idx) => {
          const Icon = iconMap[checkin.icon];
          const isLast = idx === checkins.length - 1;
          
          return (
            <React.Fragment key={checkin.id}>
              <button className="w-full flex items-center p-4 hover:bg-zinc-50 transition-colors rounded-2xl active:scale-[0.98] group">
                <div className={`h-12 w-12 rounded-[1rem] bg-${checkin.color}-50 flex items-center justify-center text-${checkin.color}-500 mr-4 shadow-inner`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-[15px] font-bold text-zinc-900 tracking-tight">
                    {checkin.title}
                  </h4>
                  <p className="text-[13px] text-zinc-500 font-medium mt-0.5">
                    {checkin.description}
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 group-hover:border-zinc-300 transition-colors">
                  <Play className="h-3 w-3 text-zinc-400 translate-x-px fill-current" />
                </div>
              </button>
              {!isLast && (
                <div className="h-px bg-zinc-100 w-[calc(100%-5rem)] ml-auto my-1" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
