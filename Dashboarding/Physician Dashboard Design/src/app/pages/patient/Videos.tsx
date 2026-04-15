import { videoData } from '../../data/mockData';
import { Play, Star } from 'lucide-react';

export default function PatientVideos() {
  const sortedVideos = [...videoData.patient].sort((a, b) => {
    const relevanceOrder: { [key: string]: number } = { high: 0, medium: 1, low: 2 };
    return relevanceOrder[a.relevance] - relevanceOrder[b.relevance];
  });

  return (
    <div className="p-6 space-y-6">
      {/* Featured Video */}
      <div className="bg-gradient-to-br from-[#2D9596] to-[#1a7273] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5" fill="white" />
          <p className="text-sm font-medium">Recommended for You</p>
        </div>
        <h2 className="text-xl font-semibold mb-2">How to Tighten Your Mask</h2>
        <p className="text-white/90 text-sm mb-4">
          Based on your recent leak data, this video can help improve your seal.
        </p>
        <button className="w-full bg-white text-[#2D9596] px-6 py-3 rounded-xl hover:bg-white/90 transition-colors font-medium flex items-center justify-center gap-2">
          <Play className="w-5 h-5" />
          Watch Now (3:24)
        </button>
      </div>

      {/* Video Grid */}
      <div>
        <h3 className="text-lg text-[#0A1128] mb-4">More Videos for You</h3>
        <div className="space-y-4">
          {sortedVideos.map((video) => {
            const isRecommended = video.relevance === 'high';

            return (
              <div
                key={video.id}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  isRecommended ? 'border-2 border-[#2D9596]' : 'border border-[#E8EEF2]'
                }`}
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-20 bg-gradient-to-br from-[#6A994E] to-[#4a7a35] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-white/80" />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    {isRecommended && (
                      <div className="absolute top-1 left-1 bg-[#2D9596] text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3" fill="white" />
                        <span>For You</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#2D9596] mb-1">{video.category}</p>
                    <h4 className="text-[#0A1128] font-medium mb-2 line-clamp-2">{video.title}</h4>
                    <button className="text-sm text-[#2D9596] hover:underline">Watch →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-[#E8EEF2] rounded-2xl p-6">
        <h4 className="text-[#0A1128] font-medium mb-2">💡 Can't find what you need?</h4>
        <p className="text-sm text-[#5A6B7C] mb-4">
          Our team is here to help with any questions about your therapy.
        </p>
        <button className="text-sm text-[#2D9596] hover:underline font-medium">
          Contact Support →
        </button>
      </div>
    </div>
  );
}
