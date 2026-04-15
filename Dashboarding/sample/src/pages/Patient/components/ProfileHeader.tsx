import type { PatientState } from '../hooks/usePatientData';

interface ProfileHeaderProps {
  profile: PatientState['profile'];
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <header className="flex justify-between items-center mb-2">
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold tracking-widest text-zinc-400 uppercase">
          {currentDate}
        </span>
        <h1 className="text-3xl font-bold tracking-tighter text-zinc-900 mt-1">
          Hi, {profile.firstName}
        </h1>
      </div>
      <div className="h-12 w-12 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200/60 shadow-sm">
        <img 
          src={profile.avatarUrl} 
          alt="Profile" 
          className="h-full w-full object-cover scale-110 mt-2" 
        />
      </div>
    </header>
  );
}
