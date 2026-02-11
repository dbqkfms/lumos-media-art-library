/*
  Artwork Detail Page
  - Full-screen immersive experience
  - Artwork information overlay
  - Related artworks section
*/

import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Play, Pause, Download, Share2 } from "lucide-react";
import Header from "@/components/Header";
import { standardArtworks, type Artwork as StandardArtwork } from "@/data/standardArtworks";
import { localArtworks, type Artwork as LocalArtwork } from "@/data/localArtworks";
import { toast } from "sonner";

type Artwork = StandardArtwork | LocalArtwork;

export default function ArtworkDetail() {
  const [, params] = useRoute("/artwork/:id");
  const [, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!params?.id) return;

    // Find artwork from both collections
    const allArtworks = [...standardArtworks, ...localArtworks];
    const found = allArtworks.find((art) => art.id === params.id);

    if (found) {
      setArtwork(found);

      // Find related artworks (same category)
      const related = allArtworks
        .filter((art) => art.category === found.category && art.id !== found.id)
        .slice(0, 4);
      setRelatedArtworks(related);
    }
  }, [params?.id]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-display text-white mb-4">작품을 찾을 수 없습니다</h2>
          <button
            onClick={() => setLocation("/")}
            className="px-6 py-3 bg-[#D4AF37] text-black font-accent text-sm hover:bg-[#F4D03F] transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isStandard = artwork.id.startsWith("standard-");
  const bgColor = isStandard ? "bg-black" : "bg-white";
  const textColor = isStandard ? "text-white" : "text-gray-800";
  const accentColor = isStandard ? "text-[#D4AF37]" : "text-gray-800";
  const buttonBg = isStandard ? "bg-[#D4AF37] text-black" : "bg-gray-800 text-white";

  const handleDownload = () => {
    toast.success("다운로드 요청이 접수되었습니다. 곧 연락드리겠습니다.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artwork.title,
        text: artwork.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다.");
    }
  };

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Header currentWorld={isStandard ? "standard" : "local"} />

      {/* Full-Screen Artwork Display */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Artwork Image */}
        <div className="absolute inset-0">
          <img
            src={artwork.image}
            alt={artwork.title}
            className={`w-full h-full object-contain ${isPlaying ? "animate-slow-zoom" : ""}`}
          />
          <div
            className={`absolute inset-0 ${
              isStandard
                ? "bg-gradient-to-b from-black/40 via-transparent to-black/60"
                : "bg-gradient-to-b from-white/30 via-transparent to-white/50"
            }`}
          />
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className={`absolute top-24 left-8 z-20 flex items-center gap-2 px-4 py-2 ${
            isStandard ? "bg-white/10 text-white" : "bg-black/10 text-gray-800"
          } backdrop-blur-sm hover:bg-opacity-20 transition-all`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-accent text-sm">뒤로</span>
        </button>

        {/* Artwork Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: Title & Description */}
              <div>
                <span className={`text-sm font-accent ${accentColor} mb-2 block`}>
                  {artwork.category}
                </span>
                <h1 className={`text-5xl md:text-6xl font-display font-bold ${textColor} mb-4`}>
                  {artwork.title}
                </h1>
                <p className={`text-lg ${textColor} opacity-90 font-body mb-6`}>
                  {artwork.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-6 py-3 ${buttonBg} font-accent text-sm hover:opacity-80 transition-opacity`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "일시정지" : "재생"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className={`flex items-center gap-2 px-6 py-3 ${
                      isStandard ? "bg-white/10 text-white" : "bg-black/10 text-gray-800"
                    } backdrop-blur-sm font-accent text-sm hover:bg-opacity-20 transition-all`}
                  >
                    <Download className="w-4 h-4" />
                    다운로드 문의
                  </button>
                  <button
                    onClick={handleShare}
                    className={`flex items-center gap-2 px-6 py-3 ${
                      isStandard ? "bg-white/10 text-white" : "bg-black/10 text-gray-800"
                    } backdrop-blur-sm font-accent text-sm hover:bg-opacity-20 transition-all`}
                  >
                    <Share2 className="w-4 h-4" />
                    공유
                  </button>
                </div>
              </div>

              {/* Right: Specifications */}
              <div
                className={`${
                  isStandard ? "bg-white/5" : "bg-black/5"
                } backdrop-blur-sm p-6 self-start`}
              >
                <h3 className={`text-xl font-display font-semibold ${textColor} mb-4`}>
                  작품 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={`font-body text-sm ${textColor} opacity-70`}>해상도</span>
                    <span className={`font-body text-sm ${textColor}`}>{artwork.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body text-sm ${textColor} opacity-70`}>재생 시간</span>
                    <span className={`font-body text-sm ${textColor}`}>{artwork.runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body text-sm ${textColor} opacity-70`}>디스플레이</span>
                    <span className={`font-body text-sm ${textColor}`}>
                      {artwork.displayType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body text-sm ${textColor} opacity-70`}>카테고리</span>
                    <span className={`font-body text-sm ${textColor}`}>{artwork.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <section className={`py-20 px-4 md:px-8 ${isStandard ? "bg-zinc-900" : "bg-gray-50"}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl font-display font-bold ${textColor} mb-12 text-center`}>
              관련 작품
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((related) => (
                <div
                  key={related.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500"
                  onClick={() => setLocation(`/artwork/${related.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className={`p-4 ${isStandard ? "bg-black" : "bg-white"}`}>
                    <h3 className={`text-lg font-display font-semibold ${textColor} mb-1`}>
                      {related.title}
                    </h3>
                    <p className={`text-xs font-accent ${textColor} opacity-60`}>
                      {related.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
