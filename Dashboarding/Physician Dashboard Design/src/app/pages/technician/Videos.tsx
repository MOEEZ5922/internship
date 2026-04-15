import { useState } from 'react';
import { videoData } from '../../data/mockData';
import { Search, Play, MessageSquare } from 'lucide-react';

export default function TechnicianVideos() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videoData.technician.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendToPatient = (videoTitle: string) => {
    alert(`"${videoTitle}" will be sent to patient via SMS/App`);
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl text-[#0A1128] mb-2">Technical Support Videos</h2>
        <p className="text-[#5A6B7C]">Troubleshooting guides and patient education materials</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A6B7C]" />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E8EEF2] focus:border-[#F4A261] focus:ring-2 focus:ring-[#F4A261]/20 transition-all"
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
            <div className="relative aspect-video bg-gradient-to-br from-[#F4A261] to-[#e39350] flex items-center justify-center">
              <Play className="w-16 h-16 text-white/80" />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="mb-3">
                <span className="text-xs text-[#F4A261] bg-[#F4A261]/10 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-[#0A1128] font-medium mb-4">{video.title}</h3>

              <button
                onClick={() => handleSendToPatient(video.title)}
                className="w-full bg-[#F4A261] text-white px-4 py-2 rounded-lg hover:bg-[#e39350] transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Send to Patient via SMS/App
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
