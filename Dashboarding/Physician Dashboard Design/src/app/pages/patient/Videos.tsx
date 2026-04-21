import { useState } from 'react';
import { videoData } from '../../data/mockData';
import { Play, Star, CheckCircle, Clock, BookOpen, Wrench, Lightbulb, Plane, ChevronRight } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Mask & Equipment': <Wrench className="w-3.5 h-3.5" />,
  'Tips & Tricks': <Lightbulb className="w-3.5 h-3.5" />,
  'Maintenance': <CheckCircle className="w-3.5 h-3.5" />,
  'Understanding Your Data': <BookOpen className="w-3.5 h-3.5" />,
  'Lifestyle': <Plane className="w-3.5 h-3.5" />,
};

const categoryColors: { [key: string]: string } = {
  'Mask & Equipment': 'bg-[#E76F51]/10 text-[#E76F51]',
  'Tips & Tricks': 'bg-[#F4A261]/10 text-[#F4A261]',
  'Maintenance': 'bg-[#6A994E]/10 text-[#6A994E]',
  'Understanding Your Data': 'bg-[#2D9596]/10 text-[#2D9596]',
  'Lifestyle': 'bg-[#0A1128]/10 text-[#0A1128]',
};

const thumbnailGradients: { [key: string]: string } = {
  'Mask & Equipment': 'from-[#E76F51] to-[#c45a3e]',
  'Tips & Tricks': 'from-[#F4A261] to-[#d4843e]',
  'Maintenance': 'from-[#6A994E] to-[#4a7a35]',
  'Understanding Your Data': 'from-[#2D9596] to-[#1a7273]',
  'Lifestyle': 'from-[#0A1128] to-[#1a233a]',
};

export default function PatientVideos() {
  const videos = videoData.patient;
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [watchedMap, setWatchedMap] = useState<{ [id: number]: boolean }>(
    Object.fromEntries(videos.map(v => [v.id, v.watched]))
  );
  const [ratingMap, setRatingMap] = useState<{ [id: number]: number | null }>(
    Object.fromEntries(videos.map(v => [v.id, v.rating]))
  );

  const recommended = videos.filter(v => v.relevance === 'high');
  const watchedCount = Object.values(watchedMap).filter(Boolean).length;
  const categories = ['All', ...Array.from(new Set(videos.map(v => v.category)))];

  const filtered = activeFilter === 'All'
    ? videos
    : videos.filter(v => v.category === activeFilter);

  const handleWatch = (id: number) => {
    setWatchedMap(prev => ({ ...prev, [id]: true }));
  };

  const handleRating = (id: number, stars: number) => {
    setRatingMap(prev => ({ ...prev, [id]: stars }));
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto pb-32">

      {/* Header */}
      <div>
        <h1 className="text-2xl text-[#0A1128] font-semibold mb-1">Coaching Videos</h1>
        <p className="text-sm text-[#5A6B7C]">Videos selected based on your therapy data and progress.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl border border-[#E8EEF2] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-[#0A1128]">Your Progress</span>
          <span className="text-sm text-[#2D9596] font-bold">{watchedCount} / {videos.length} watched</span>
        </div>
        <div className="w-full bg-[#E8EEF2] rounded-full h-2.5">
          <div
            className="bg-[#2D9596] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(watchedCount / videos.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Recommended for You */}
      {recommended.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-[#F4A261]" fill="#F4A261" />
            <h2 className="text-sm font-semibold text-[#0A1128] uppercase tracking-wider">Recommended for You</h2>
          </div>
          <div className="space-y-3">
            {recommended.map(video => (
              <div
                key={video.id}
                className={`bg-gradient-to-br ${thumbnailGradients[video.category] || 'from-[#2D9596] to-[#1a7273]'} rounded-2xl p-5 text-white shadow-md`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                    {video.triggerReason}
                  </span>
                  {watchedMap[video.id] && (
                    <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Watched
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-1">{video.title}</h3>
                <div className="flex items-center gap-3 text-white/80 text-sm mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {video.duration}</span>
                  <span>{video.category}</span>
                </div>
                <button
                  onClick={() => handleWatch(video.id)}
                  className="w-full bg-white/20 hover:bg-white/30 transition-colors text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {watchedMap[video.id] ? 'Watch Again' : 'Watch Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div>
        <h2 className="text-sm font-semibold text-[#0A1128] uppercase tracking-wider mb-3">All Videos</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-[#0A1128] text-white shadow'
                  : 'bg-[#E8EEF2] text-[#5A6B7C] hover:bg-[#d6dfe6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video List */}
      <div className="space-y-3">
        {filtered.map(video => (
          <div
            key={video.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
              watchedMap[video.id] ? 'border-[#6A994E]/40' : 'border-[#E8EEF2]'
            }`}
          >
            <div className="flex gap-4 p-4">
              {/* Thumbnail */}
              <div className={`relative w-28 h-20 bg-gradient-to-br ${thumbnailGradients[video.category] || 'from-[#2D9596] to-[#1a7273]'} rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer`}
                onClick={() => handleWatch(video.id)}
              >
                {watchedMap[video.id]
                  ? <CheckCircle className="w-8 h-8 text-white/90" />
                  : <Play className="w-8 h-8 text-white/90" />
                }
                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mb-1.5 ${categoryColors[video.category] || 'bg-[#E8EEF2] text-[#5A6B7C]'}`}>
                  {categoryIcons[video.category]}
                  {video.category}
                </div>
                <h4 className="text-[#0A1128] font-medium text-sm mb-2 line-clamp-2">{video.title}</h4>

                {/* Star Rating — shown after watched */}
                {watchedMap[video.id] ? (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} onClick={() => handleRating(video.id, star)}>
                        <Star
                          className="w-4 h-4 transition-colors"
                          fill={ratingMap[video.id] !== null && ratingMap[video.id]! >= star ? '#F4A261' : 'none'}
                          stroke={ratingMap[video.id] !== null && ratingMap[video.id]! >= star ? '#F4A261' : '#CBD5E1'}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-[#5A6B7C] ml-1">
                      {ratingMap[video.id] ? 'Thanks!' : 'Rate this'}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleWatch(video.id)}
                    className="text-sm text-[#2D9596] font-medium flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Watch <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Footer */}
      <div className="bg-[#E8EEF2] rounded-2xl p-5">
        <h4 className="text-[#0A1128] font-medium mb-1">💡 Can't find what you need?</h4>
        <p className="text-sm text-[#5A6B7C] mb-3">Our team can answer any questions about your therapy or equipment.</p>
        <button className="text-sm text-[#2D9596] hover:underline font-medium flex items-center gap-1">
          Contact Support <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
