import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import type { PatientState } from '../hooks/usePatientData';

interface VideoRecommendationCardProps {
  recommendation: PatientState['recommendation'];
  onWatch: () => void;
}

export function VideoRecommendationCard({ recommendation, onWatch }: VideoRecommendationCardProps) {
  return (
    <div className="relative w-full rounded-[2.5rem] bg-zinc-900 p-8 shadow-[0_20px_40px_rgb(0,0,0,0.15)] overflow-hidden">
      {/* Decorative glowing orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[80px] opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-bold tracking-widest text-zinc-300 uppercase">
            Recommended
          </span>
        </div>
        
        <h3 className="text-3xl font-bold text-white tracking-tight leading-[1.1] mb-3">
          {recommendation.title.split(' ').map((word, i, arr) => {
            // Split title onto two lines for aesthetic impact
            if (i === Math.floor(arr.length / 2) - 1) return <React.Fragment key={i}>{word}<br/></React.Fragment>;
            return word + ' ';
          })}
        </h3>
        
        <p className="text-[13px] text-zinc-400 mb-8 leading-relaxed max-w-[90%] font-medium">
          {recommendation.description}
        </p>
        
        <Button variant="glass" size="lg" onClick={onWatch} className="w-full">
          <Play className="h-4 w-4 mr-2 fill-current" /> 
          Watch Video ({recommendation.videoDuration})
        </Button>
      </div>
    </div>
  );
}
