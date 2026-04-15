import { useState } from 'react';
import { videoData } from '../../data/mockData';
import { Search, Play, Send } from 'lucide-react';

export default function PhysicianVideos() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoData.physician.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrescribe = (videoTitle: string) => {
    alert(`"${videoTitle}" has been prescribed to patient's app`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Coaching Video Library</h2>
        <p className="text-[#5A6B7C]">Educational content to prescribe to patients</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6B7C]" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#2D9596] focus:ring-2 focus:ring-[#2D9596]/20 transition-all"
        />
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl border border-[#E8EEF2] shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-[#2D9596] to-[#1a7273] flex items-center justify-center">
              <Play className="w-16 h-16 text-white/80" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="mb-3">
                <span className="text-xs text-[#2D9596] bg-[#2D9596]/10 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-[#0A1128] font-medium mb-4">{video.title}</h3>

              <button
                onClick={() => handlePrescribe(video.title)}
                className="w-full bg-[#2D9596] text-white px-4 py-2 rounded-lg hover:bg-[#247a7a] transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Prescribe to Patient App
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#5A6B7C]">No videos found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}
