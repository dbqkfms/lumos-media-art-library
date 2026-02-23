/*
  ArtworkDetail v4 — Immersive Showroom
  - Showroom mode: fullscreen black bg, video only, ESC to exit
  - "LUMOS STANDARD" watermark overlay (opacity 0.15, static)
  - Tabs: [영상 보기] / [설치 시뮬레이션]
  - Installation simulation images (hotel lobby, corporate lobby, building exterior)
  - Specs: resolution + runtime only
  - Related artworks: same category, 3-4 items
  - "이 작품으로 문의하기" opens FloatingCTA with pre-filled artwork name
*/
import { useEffect, useState, useRef } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Share2, Maximize2, X } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, type Artwork as StandardArtwork } from "@/data/standardArtworks";
import { localArtworks, type Artwork as LocalArtwork } from "@/data/localArtworks";
import { toast } from "sonner";

type Artwork = StandardArtwork | LocalArtwork;
type TabType = "video" | "simulation";

// Installation simulation images — dark, premium, photorealistic mockups
const SIMULATION_IMAGES = [
  {
    id: "hotel",
    label: "호텔 로비",
    // Dark luxury hotel lobby with large display screen
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
  },
  {
    id: "corporate",
    label: "기업 로비",
    // Modern corporate lobby with digital display
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  {
    id: "exterior",
    label: "건물 외관",
    // Building exterior night with LED display
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  },
];

export default function ArtworkDetail() {
  const [, params] = useRoute("/artwork/:id");
  const [, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("video");
  const [showroomMode, setShowroomMode] = useState(false);
  const [simIndex, setSimIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // ESC key exits showroom mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showroomMode) setShowroomMode(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showroomMode]);

  // Prevent body scroll in showroom mode
  useEffect(() => {
    if (showroomMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showroomMode]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-display text-3xl text-white mb-6">작품을 찾을 수 없습니다</h2>
          <button onClick={() => setLocation("/")} className="btn-brutalist">
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
  const watermarkLabel = isStandard ? "LUMOS STANDARD" : "LUMOS LOCAL";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: artwork.title, text: artwork.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다.");
    }
  };

  // ─── Showroom Mode (fullscreen) ───
  if (showroomMode) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        {/* Exit button */}
        <button
          onClick={() => setShowroomMode(false)}
          className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        >
          <X className="w-4 h-4" />
          <span className="font-accent text-xs tracking-widest">쇼룸 종료 (ESC)</span>
        </button>

        {/* Artwork image fills screen */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="max-w-full max-h-full object-contain"
          />
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0.15 }}
          >
            <span
              className="font-display text-white text-[5vw] tracking-[0.4em] uppercase"
              style={{ userSelect: "none" }}
            >
              {watermarkLabel}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld={isStandard ? "standard" : "local"} />

      {/* ─── Full-Screen Artwork Display ─── */}
      <section className="relative" style={{ minHeight: "90vh" }}>
        <div className="relative w-full" style={{ height: "90vh" }}>
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-contain bg-[#050505] animate-slow-zoom"
          />
          {/* Watermark on main view */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0.15 }}
          >
            <span
              className="font-display text-white text-[3vw] tracking-[0.4em] uppercase"
              style={{ userSelect: "none" }}
            >
              {watermarkLabel}
            </span>
          </div>
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

        {/* Showroom Mode Button */}
        <button
          onClick={() => setShowroomMode(true)}
          className="absolute top-24 right-8 z-20 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="font-accent text-xs tracking-widest">쇼룸 모드</span>
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
                <h1 className="text-display text-[3rem] md:text-[4.5rem] leading-none text-white mb-6" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}>
                  {artwork.title}
                </h1>

                {/* Collapsible Description */}
                <div className="mb-8">
                  <p className={`text-gray-300 leading-relaxed ${!descExpanded ? "line-clamp-2" : ""}`} style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
                    {artwork.description}
                  </p>
                  <button
                    onClick={() => setDescExpanded(!descExpanded)}
                    className={`mt-3 font-accent text-xs tracking-widest ${accentClass} hover:opacity-80 transition-opacity`}
                  >
                    {descExpanded ? "접기 ↑" : "더보기 ↓"}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setCtaOpen(true)} className={btnClass}>
                    이 작품으로 문의하기
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

              {/* Right: Specifications — resolution + runtime only */}
              <div className={`bg-black/60 backdrop-blur-md p-6 border ${borderAccent}`}>
                <h3 className={`font-accent text-xs tracking-widest ${accentClass} mb-5`}>
                  작품 정보
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-accent tracking-wider">해상도</span>
                    <span className="text-sm text-gray-200">{artwork.resolution}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-accent tracking-wider">재생 시간</span>
                    <span className="text-sm text-gray-200">{artwork.runtime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tabs: 영상 보기 / 설치 시뮬레이션 ─── */}
      <section className="py-16 px-8 md:px-16 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex gap-0 mb-10 border-b border-white/10">
            {(["video", "simulation"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-accent text-xs tracking-widest px-8 py-4 transition-all duration-200 border-b-2 -mb-px ${
                  activeTab === tab
                    ? `${accentClass} border-current`
                    : "text-gray-600 border-transparent hover:text-gray-400"
                }`}
              >
                {tab === "video" ? "영상 보기" : "설치 시뮬레이션"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "video" && (
            <div className="relative">
              {/* Video preview — artwork image as placeholder */}
              <div className="relative aspect-video bg-[#050505] overflow-hidden max-w-4xl mx-auto">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-contain"
                />
                {/* Watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                  style={{ opacity: 0.15 }}
                >
                  <span className="font-display text-white text-[4vw] tracking-[0.4em] uppercase" style={{ userSelect: "none" }}>
                    {watermarkLabel}
                  </span>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-2 cursor-pointer hover:scale-110 transition-transform duration-200`}
                    style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }}
                    onClick={() => setCtaOpen(true)}
                  >
                    <span style={{ color: accentColor }} className="text-2xl ml-1">▶</span>
                  </div>
                </div>
              </div>
              <p className="text-center font-accent text-xs tracking-widest text-gray-600 mt-4">
                전체 영상은 문의 후 제공됩니다
              </p>
            </div>
          )}

          {activeTab === "simulation" && (
            <div>
              <p className="font-accent text-xs tracking-widest text-gray-500 mb-8">
                실제 공간에 설치된 모습을 시뮬레이션한 이미지입니다.
              </p>
              {/* Simulation image selector */}
              <div className="flex gap-3 mb-6">
                {SIMULATION_IMAGES.map((sim, idx) => (
                  <button
                    key={sim.id}
                    onClick={() => setSimIndex(idx)}
                    className={`font-accent text-[11px] tracking-widest px-4 py-2 border transition-all duration-200 ${
                      simIndex === idx
                        ? `border-current ${accentClass}`
                        : "border-white/10 text-gray-600 hover:text-gray-400"
                    }`}
                    style={simIndex === idx ? { borderColor: accentColor } : {}}
                  >
                    {sim.label}
                  </button>
                ))}
              </div>
              {/* Simulation image */}
              <div className="relative aspect-video bg-[#050505] overflow-hidden max-w-4xl mx-auto">
                <img
                  src={SIMULATION_IMAGES[simIndex].src}
                  alt={SIMULATION_IMAGES[simIndex].label}
                  className="w-full h-full object-cover"
                />
                {/* Artwork overlay on screen area */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className="relative overflow-hidden"
                    style={{ width: "45%", aspectRatio: "16/9", opacity: 0.85 }}
                  >
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Watermark on simulation */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                      style={{ opacity: 0.15 }}
                    >
                      <span className="font-display text-white text-[1.5vw] tracking-[0.3em] uppercase" style={{ userSelect: "none" }}>
                        {watermarkLabel}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Dark overlay for realism */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              </div>
              <p className="text-center font-accent text-[10px] tracking-widest text-gray-700 mt-3">
                * 시뮬레이션 이미지는 참고용이며 실제 설치 환경과 다를 수 있습니다
              </p>
            </div>
          )}
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
                  className={`gallery-card ${isStandard ? "gallery-card-standard" : "gallery-card-local"} cursor-pointer`}
                  onClick={() => {
                    setLocation(`/artwork/${related.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="relative overflow-hidden aspect-video bg-[#111]">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className={`card-hover-overlay ${!isStandard ? "card-hover-overlay-local" : ""}`}>
                      <span className="card-hover-label">▶ 미리보기</span>
                    </div>
                  </div>
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2">
                      {related.title}
                    </h3>
                    <span className={`inline-block font-accent text-[10px] tracking-widest ${accentClass} ${accentBg} px-2 py-0.5`}>
                      {related.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FloatingCTA — artwork name auto-filled */}
      <FloatingCTA
        artworkName={artwork.title}
        forceOpen={ctaOpen}
        onClose={() => setCtaOpen(false)}
      />

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
