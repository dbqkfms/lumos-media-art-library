/*
  ArtworkDetail v2 — Immersive Dark Detail Page
  - Full dark base for both STANDARD and LOCAL
  - STANDARD accent: Gold (#D4A843)
  - LOCAL accent: Blue (#93C5FD)
  - Artwork display 1.5x larger
  - Collapsible description (더보기/접기)
  - All buttons functional
*/

import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Download, Share2, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import { standardArtworks, type Artwork as StandardArtwork } from "@/data/standardArtworks";
import { localArtworks, type Artwork as LocalArtwork } from "@/data/localArtworks";
import { toast } from "sonner";

type Artwork = StandardArtwork | LocalArtwork;

export default function ArtworkDetail() {
  const [, params] = useRoute("/artwork/:id");
  const [, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [descExpanded, setDescExpanded] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    const allArtworks = [...standardArtworks, ...localArtworks];
    const found = allArtworks.find((art) => art.id === params.id);
    if (found) {
      setArtwork(found);
      const related = allArtworks
        .filter((art) => art.category === found.category && art.id !== found.id)
        .slice(0, 4);
      setRelatedArtworks(related);
    }
  }, [params?.id]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-display text-3xl text-white mb-6">작품을 찾을 수 없습니다</h2>
          <button
            onClick={() => setLocation("/")}
            className="btn-brutalist"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const isStandard = artwork.id.startsWith("standard-");
  const accentColor = isStandard ? "#D4A843" : "#93C5FD";
  const accentClass = isStandard ? "text-[#D4A843]" : "text-[#93C5FD]";
  const accentBg = isStandard ? "bg-[#D4A843]/10" : "bg-[#93C5FD]/10";
  const borderAccent = isStandard ? "border-[#D4A843]/20" : "border-[#93C5FD]/20";
  const btnClass = isStandard ? "btn-brutalist" : "btn-brutalist-blue";

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
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld={isStandard ? "standard" : "local"} />

      {/* ─── Full-Screen Artwork Display (1.5x larger) ─── */}
      <section className="relative" style={{ minHeight: "90vh" }}>
        {/* Artwork Image — fills full viewport height */}
        <div className="relative w-full" style={{ height: "90vh" }}>
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-contain bg-[#050505] animate-slow-zoom"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-24 left-8 z-20 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-accent text-xs tracking-widest">뒤로</span>
        </button>

        {/* Artwork Info Overlay — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-12">
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              {/* Left: Title & Description */}
              <div className="md:col-span-2">
                <span className={`font-accent text-xs tracking-widest ${accentClass} mb-3 block`}>
                  {artwork.category}
                </span>
                <h1 className="text-display text-[3rem] md:text-[4.5rem] leading-none text-white mb-6 text-shadow-strong">
                  {artwork.title}
                </h1>

                {/* Collapsible Description */}
                <div className="mb-8">
                  <p className={`text-gray-300 leading-relaxed text-shadow-soft ${!descExpanded ? "line-clamp-2" : ""}`}>
                    {artwork.description}
                  </p>
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className={`flex items-center gap-1.5 mt-3 font-accent text-xs tracking-widest ${accentClass} hover:opacity-80 transition-opacity`}
                  >
                    {descExpanded ? (
                      <>접기 <ChevronUp className="w-3.5 h-3.5" /></>
                    ) : (
                      <>더보기 <ChevronDown className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownload}
                    className={btnClass}
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5" />
                      다운로드 문의
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-accent text-xs tracking-widest hover:bg-white/10 hover:text-white transition-all duration-200"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    공유
                  </button>
                </div>
              </div>

              {/* Right: Specifications */}
              <div className={`bg-black/60 backdrop-blur-md p-6 border ${borderAccent}`}>
                <h3 className={`font-accent text-xs tracking-widest ${accentClass} mb-5`}>
                  작품 정보
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "해상도", value: artwork.resolution },
                    { label: "재생 시간", value: artwork.runtime },
                    { label: "디스플레이", value: artwork.displayType },
                    { label: "카테고리", value: artwork.category },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 font-accent tracking-wider">{label}</span>
                      <span className="text-sm text-gray-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related Artworks ─── */}
      {relatedArtworks.length > 0 && (
        <section className="py-24 px-8 md:px-16 bg-[#0f0f0f] border-t border-white/5">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-12">
              <p className={`font-accent text-xs tracking-[0.3em] ${accentClass} mb-4`}>
                RELATED WORKS
              </p>
              <h2 className="text-display text-[2rem] md:text-[3rem] text-white leading-tight">
                관련 작품
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArtworks.map((related) => (
                <div
                  key={related.id}
                  className={`gallery-card ${isStandard ? "gallery-card-standard" : "gallery-card-local"}`}
                  onClick={() => setLocation(`/artwork/${related.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#111]">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2">
                      {related.title}
                    </h3>
                    <span
                      className={`inline-block font-accent text-[10px] tracking-widest ${accentClass} ${accentBg} px-2 py-0.5`}
                    >
                      {related.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-12 md:px-20 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <p className="font-display text-lg text-[#D4A843]">LUMOS</p>
          <p className="text-xs text-gray-700">© 2025 LUMOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
