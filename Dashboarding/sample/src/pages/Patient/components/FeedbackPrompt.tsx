import { useState } from 'react';
import { Star, Check } from 'lucide-react';
import { cn } from '../../../lib/utils';

export function FeedbackPrompt() {
  const [rating, setRating] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  if (feedbackGiven) {
    return (
      <div className="w-full rounded-[2rem] bg-emerald-50/50 p-6 border border-emerald-100/50 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3 text-emerald-600">
          <Check className="h-6 w-6 stroke-[3px]" />
        </div>
        <span className="text-sm font-bold text-emerald-800 tracking-tight">Feedback submitted</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100/50 flex flex-col items-center text-center">
      <span className="text-sm font-bold text-zinc-800 mb-4 tracking-tight">
        How helpful was the last video?
      </span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button 
            key={star}
            onMouseEnter={() => setRating(star)}
            onMouseLeave={() => setRating(0)}
            onClick={() => setFeedbackGiven(true)}
            className="p-1 transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} stars`}
          >
            <Star 
              className={cn(
                "h-8 w-8 transition-colors", 
                rating >= star 
                  ? "fill-amber-400 text-amber-400" 
                  : "fill-zinc-100 text-zinc-100 stroke-[1.5px]"
              )} 
            />
          </button>
        ))}
      </div>
    </div>
  );
}
