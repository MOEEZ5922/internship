import { useState, useEffect } from 'react';

export interface PatientState {
  profile: {
    firstName: string;
    avatarUrl: string;
  };
  metrics: {
    sleepScore: number;
    scoreLabel: string;
    duration: string;
    streakDays: number;
  };
  recommendation: {
    title: string;
    description: string;
    videoDuration: string;
    isUrgent: boolean;
  };
  checkins: Array<{
    id: string;
    title: string;
    description: string;
    icon: 'activity' | 'message';
    color: 'indigo' | 'rose';
  }>;
}

export function usePatientData() {
  const [data, setData] = useState<PatientState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch layer (mock data matching the wireframes)
    const fetchData = async () => {
      setIsLoading(true);
      // Mock network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setData({
        profile: {
          firstName: 'Alex',
          avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent'
        },
        metrics: {
          sleepScore: 85,
          scoreLabel: 'Good',
          duration: '6h 30m',
          streakDays: 12
        },
        recommendation: {
          title: 'Fixing minor mask leaks',
          description: 'We noticed a slight leak last night. This 2-min guide helps you adjust the straps perfectly.',
          videoDuration: '2:00',
          isUrgent: false
        },
        checkins: [
          { id: '1', title: 'Morning Survey', description: 'How rested are you?', icon: 'activity', color: 'indigo' },
          { id: '2', title: 'Report Discomfort', description: 'Mask issues or pain', icon: 'message', color: 'rose' }
        ]
      });
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading };
}
