import React from 'react';
import { usePatientData } from './hooks/usePatientData';
import { ProfileHeader } from './components/ProfileHeader';
import { SleepScoreCard } from './components/SleepScoreCard';
import { VideoRecommendationCard } from './components/VideoRecommendationCard';
import { FeedbackPrompt } from './components/FeedbackPrompt';
import { DailyCheckins } from './components/DailyCheckins';

const PatientHome: React.FC = () => {
  const { data, isLoading } = usePatientData();

  if (isLoading || !data) {
    return (
      <div className="h-full w-full flex items-center justify-center pt-20">
        <div className="h-8 w-8 rounded-full border-4 border-zinc-200 border-t-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 px-6 pt-2 font-sans">
      <ProfileHeader profile={data.profile} />
      
      <SleepScoreCard metrics={data.metrics} />
      
      <VideoRecommendationCard 
        recommendation={data.recommendation} 
        onWatch={() => console.log("Video clicked")} 
      />
      
      <FeedbackPrompt />
      
      <DailyCheckins checkins={data.checkins} />
    </div>
  );
};

export default PatientHome;
