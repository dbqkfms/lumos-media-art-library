/*
  ArtworkDetail v3 — Immersive Dark Detail Page
  - Full dark base for both STANDARD and LOCAL
  - STANDARD accent: Gold (#D4A843)
  - LOCAL accent: Blue (#93C5FD)
  - Player tabs: [영상 보기] / [설치 시뮬레이션]
  - Tag click → navigate to gallery with filter
  - Related artworks: same tag, 3-4 items horizontal
  - Collapsible description (더보기/접기)
  - All buttons functional
*/

import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Download, Share2, ChevronDown, ChevronUp, Play, Building2 } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, type Artwork as StandardArtwork } from "@/data/standardArtworks";
import { localArtworks, type Artwork as LocalArtwork } from "@/data/localArtworks";
import { toast } from "sonner";

type Artwork = StandardArtwork | LocalArtwork;
type PlayerTab = "video" | "simulation";

// Installation simulation mockup component
function InstallationSimulation({ accentColor, title }: { accentColor: string; title: string }) {
  return (
    <div className="relative w-full bg-[#0a0a0a] flex items-center justify-center" style={{ height: "75vh" }}>
      {/* Room mockup SVG */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg
          viewBox="0 0 1200 675"
          className="w-full h-full max-w-4xl"
          style={{ filter: "drop-shadow(0 0 40px rgba(0,0,0,0.8))" }}
        >
          {/* Room background */}
          <defs>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
            <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
              <stop offset="50%" stopColor={accentColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Back wall */}
          <rect x="100" y="50" width="1000" height="500" fill="url(#wallGrad)" />

          {/* Floor */}
          <polygon points="0,550 1200,550 1100,675 100,675" fill="url(#floorGrad)" />

          {/* Left wall */}
          <polygon points="0,0 100,50 100,550 0,675" fill="#0d0d0d" />

          {/* Ceiling */}
          <polygon points="0,0 1200,0 1100,50 100,50" fill="#0f0f0f" />

          {/* LED Display frame */}
          <rect x="250" y="120" width="700" height="350" rx="4" fill="#050505" stroke={accentColor} strokeWidth="2" strokeOpacity="0.4" />

          {/* LED Display screen - artwork preview */}
          <rect x="258" y="128" width="684" height="334" fill="#0a0a0a" />

          {/* Screen content glow */}
          <rect x="258" y="128" width="684" height="334" fill="url(#screenGlow)" opacity="0.6" />

          {/* Simulated content lines */}
          <rect x="300" y="200" width="600" height="2" fill={accentColor} opacity="0.3" />
          <rect x="300" y="250" width="400" height="2" fill={accentColor} opacity="0.2" />
          <rect x="300" y="300" width="500" height="2" fill={accentColor} opacity="0.15" />
          <rect x="300" y="350" width="350" height="2" fill={accentColor} opacity="0.1" />

          {/* Center logo/title on screen */}
          <text x="600" y="295" textAnchor="middle" fill={accentColor} fontSize="18" fontFamily="serif" opacity="0.7">{title}</text>
          <text x="600" y="320" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace" opacity="0.4">LUMOS MEDIA ART</text>

          {/* Screen ambient glow */}
          <ellipse cx="600" cy="295" rx="300" ry="150" fill={accentColor} opacity="0.04" />

          {/* Floor reflection */}
          <rect x="258" y="462" width="684" height="60" fill={accentColor} opacity="0.03" />

          {/* Left person silhouette */}
          <ellipse cx="160" cy="520" rx="25" ry="8" fill="#1a1a1a" />
          <rect x="148" y="430" width="24" height="90" rx="12" fill="#1a1a1a" />
          <circle cx="160" cy="415" r="18" fill="#1a1a1a" />

          {/* Right person silhouette */}
          <ellipse cx="1040" cy="520" rx="25" ry="8" fill="#1a1a1a" />
          <rect x="1028" y="430" width="24" height="90" rx="12" fill="#1a1a1a" />
          <circle cx="1040" cy="415" r="18" fill="#1a1a1a" />

          {/* Ceiling spotlights */}
          <circle cx="400" cy="52" r="6" fill="#333" />
          <circle cx="600" cy="52" r="6" fill="#333" />
          <circle cx="800" cy="52" r="6" fill="#333" />

          {/* Light cones */}
          <polygon points="400,58 370,200 430,200" fill="white" opacity="0.02" />
          <polygon points="600,58 570,200 630,200" fill="white" opacity="0.02" />
          <polygon points="800,58 770,200 830,200" fill="white" opacity="0.02" />
        </svg>

        {/* Overlay label */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <div className="h-px w-12" style={{ background: accentColor, opacity: 0.4 }} />
          <span className="font-accent text-[10px] tracking-[0.3em] text-gray-500">INSTALLATION MOCKUP</span>
          <div className="h-px w-12" style={{ background: accentColor, opacity: 0.4 }} />
        </div>
      </div>
    </div>
  );
}

export default function ArtworkDetail() {
  const [, params] = useRoute("/artwork/:id");
  const [, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<PlayerTab>("video");

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
    // Reset tab on artwork change
    setActiveTab("video");
    setDescExpanded(false);
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
  const galleryPath = isStandard ? "/standard" : "/local";

  const handleDownload = () => {
    // Open contact form for download inquiry
    window.dispatchEvent(new CustomEvent("open-contact"));
    toast.info("문의 폼을 통해 다운로드를 요청해 주세요.");
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

        {/* Artwork fills screen */}
        <div className="relative w-full h-full flex items-center justify-center">
          {(artwork as any).videoSrc ? (
            <video
              src={(artwork as any).videoSrc}
              className="max-w-full max-h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-w-full max-h-full object-contain"
            />
          )}
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
      <FloatingCTA />

      {/* ─── Full-Screen Artwork Display ─── */}
      <section className="relative" style={{ minHeight: "90vh" }}>
        <div className="relative w-full" style={{ height: "90vh" }}>
          {(artwork as any).videoSrc ? (
            <video
              src={(artwork as any).videoSrc}
              className="w-full h-full object-contain bg-[#050505]"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-contain bg-[#050505] animate-slow-zoom"
            />
          )}
          {/* Watermark on main view */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0.15 }}
          >
            <span
              className="font-display text-white text-[3vw] tracking-[0.4em] uppercase"
              style={{ userSelect: "none" }}
            >
              <Play className="w-3.5 h-3.5" />
              영상 보기
            </button>
            <div className="w-px h-8 bg-white/10" />
            <button
              onClick={() => setActiveTab("simulation")}
              className={`flex items-center gap-2 px-6 py-3 font-accent text-xs tracking-widest transition-all duration-200 ${
                activeTab === "simulation"
                  ? `${accentClass} border-b-2`
                  : "text-gray-500 hover:text-gray-300"
              }`}
              style={activeTab === "simulation" ? { borderBottomColor: accentColor } : {}}
            >
              <Building2 className="w-3.5 h-3.5" />
              설치 시뮬레이션
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-24 left-8 z-30 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-accent text-xs tracking-widest">뒤로</span>
        </button>

        {/* Content Area */}
        {activeTab === "video" ? (
          /* Artwork Image — fills full viewport height */
          <div className="relative w-full" style={{ height: "90vh" }}>
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-contain bg-[#050505] animate-slow-zoom"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />

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
              {/* Video preview */}
              <div className="relative aspect-video bg-[#050505] overflow-hidden max-w-4xl mx-auto">
                {(artwork as any).videoSrc ? (
                  <video
                    ref={videoRef}
                    src={(artwork as any).videoSrc}
                    className="w-full h-full object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <>
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-contain"
                    />
                    {/* Play overlay for image-only artworks */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 cursor-pointer hover:scale-110 transition-transform duration-200`}
                        style={{ borderColor: accentColor, backgroundColor: `${accentColor}20` }}
                        onClick={() => setCtaOpen(true)}
                      >
                        <span style={{ color: accentColor }} className="text-2xl ml-1">▶</span>
                      </div>
                    </div>
                  </>
                )}
                {/* Watermark */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                  style={{ opacity: 0.15 }}
                >
                  <span className="font-display text-white text-[4vw] tracking-[0.4em] uppercase" style={{ userSelect: "none" }}>
                    {watermarkLabel}
                  </span>
                </div>
              </div>
              {!(artwork as any).videoSrc && (
                <p className="text-center font-accent text-xs tracking-widest text-gray-600 mt-4">
                  전체 영상은 문의 후 제공됩니다
                </p>
              )}
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
                      {artwork.category} →
                    </button>
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
          </div>
        ) : (
          /* Installation Simulation Tab */
          <div className="w-full" style={{ minHeight: "90vh" }}>
            <InstallationSimulation accentColor={accentColor} title={artwork.title} />

            {/* Info below simulation */}
            <div className="px-8 md:px-16 py-12 bg-[#0a0a0a]">
              <div className="max-w-screen-xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2">
                    <button
                      onClick={() => handleTagClick(artwork.category)}
                      className={`font-accent text-xs tracking-widest ${accentClass} ${accentBg} px-3 py-1 mb-4 inline-block hover:opacity-80 transition-opacity`}
                    >
                      {artwork.category} →
                    </button>
                    <h1 className="text-display text-[2.5rem] md:text-[3.5rem] leading-none text-white mb-6">
                      {artwork.title}
                    </h1>
                    <p className="text-gray-400 leading-relaxed mb-8 max-w-xl">
                      {artwork.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleDownload} className={btnClass}>
                        <span className="flex items-center gap-2">
                          <Download className="w-3.5 h-3.5" />
                          다운로드 문의
                        </span>
                      </button>
                      <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 font-accent text-xs tracking-widest hover:bg-white/10 hover:text-white transition-all duration-200">
                        <Share2 className="w-3.5 h-3.5" />
                        공유
                      </button>
                    </div>
                  </div>
                  <div className={`bg-[#0f0f0f] p-6 border ${borderAccent}`}>
                    <h3 className={`font-accent text-xs tracking-widest ${accentClass} mb-5`}>작품 정보</h3>
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
          </div>
        )}
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
              <p className="text-sm text-gray-600 mt-2">
                같은 카테고리의 다른 작품들
              </p>
            </div>

            {/* Horizontal scroll on mobile, grid on desktop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArtworks.map((related) => (
                <div
                  key={related.id}
                  className={`gallery-card ${isStandard ? "gallery-card-standard" : "gallery-card-local"} group cursor-pointer`}
                  onClick={() => setLocation(`/artwork/${related.id}`)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#111]">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-3.5 py-3">
                    <h3 className={`text-sm font-semibold text-white leading-tight line-clamp-1 mb-2 group-hover:${accentClass} transition-colors duration-200`}>
                      {related.title}
                    </h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleTagClick(related.category); }}
                      className={`inline-block font-accent text-[10px] tracking-widest ${accentClass} ${accentBg} px-2 py-0.5 hover:opacity-80 transition-opacity`}
                    >
                      {related.category}
                    </button>
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
