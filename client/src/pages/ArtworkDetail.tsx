/*
  ArtworkDetail v4 — Immersive Dark Detail Page
  - Full dark base for both STANDARD and LOCAL
  - STANDARD accent: Gold (#D4A843)
  - LOCAL accent: Blue (#93C5FD)
  - Player tabs: [영상 보기] / [설치 시뮬레이션]
  - Showroom mode (fullscreen black)
  - LUMOS watermark (opacity 0.15)
  - Related artworks: same category, 3-4 items
  - Collapsible description
  - CTA button opens FloatingCTA with artwork name
*/

import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Share2, Play, Building2, X, Maximize2 } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, type Artwork as StandardArtwork } from "@/data/standardArtworks";
import { localArtworks, type Artwork as LocalArtwork } from "@/data/localArtworks";
import { toast } from "sonner";

type Artwork = StandardArtwork | LocalArtwork;
type PlayerTab = "video" | "simulation";

// ─── Installation Simulation ───────────────────────────────────────────────
function InstallationSimulation({ accentColor, title }: { accentColor: string; title: string }) {
  const scenes = [
    { label: "고급 호텔 로비", desc: "Grand Hotel Lobby" },
    { label: "기업 본사 로비", desc: "Corporate HQ Atrium" },
    { label: "건물 외벽 야경", desc: "Outdoor Facade — Night" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {scenes.map((scene, idx) => (
        <div key={idx} className="relative overflow-hidden bg-[#0a0a0a] border border-white/5">
          {/* SVG Room Mockup */}
          <div className="aspect-video relative">
            <svg viewBox="0 0 800 450" className="w-full h-full">
              <defs>
                <linearGradient id={`floor${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
                <radialGradient id={`glow${idx}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={accentColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background */}
              <rect width="800" height="450" fill="#0d0d0d" />

              {/* Scene-specific elements */}
              {idx === 0 && (
                <>
                  {/* Hotel lobby: columns */}
                  <rect x="60" y="80" width="20" height="280" fill="#1a1a1a" />
                  <rect x="720" y="80" width="20" height="280" fill="#1a1a1a" />
                  <rect x="0" y="360" width="800" height="90" fill="url(#floor0)" />
                  <rect x="0" y="355" width="800" height="5" fill={accentColor} opacity="0.15" />
                  {/* Chandelier */}
                  <circle cx="400" cy="40" r="30" fill="#111" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="400" y1="70" x2="400" y2="100" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
                </>
              )}
              {idx === 1 && (
                <>
                  {/* Corporate: clean lines */}
                  <rect x="0" y="380" width="800" height="70" fill="url(#floor1)" />
                  <rect x="0" y="375" width="800" height="5" fill={accentColor} opacity="0.1" />
                  {/* Logo placeholder */}
                  <text x="400" y="50" textAnchor="middle" fill={accentColor} fontSize="14" fontFamily="monospace" opacity="0.4">CORP</text>
                </>
              )}
              {idx === 2 && (
                <>
                  {/* Night exterior: stars */}
                  {[...Array(20)].map((_, i) => (
                    <circle key={i} cx={Math.random() * 800} cy={Math.random() * 200} r="1" fill="white" opacity={0.3 + Math.random() * 0.4} />
                  ))}
                  <rect x="0" y="380" width="800" height="70" fill="#050505" />
                  {/* Ground line */}
                  <rect x="0" y="378" width="800" height="2" fill={accentColor} opacity="0.2" />
                </>
              )}

              {/* LED Screen */}
              <rect x="150" y="100" width="500" height="240" rx="3" fill="#050505" stroke={accentColor} strokeWidth="1.5" strokeOpacity="0.5" />
              <rect x="156" y="106" width="488" height="228" fill="#080808" />
              <rect x="156" y="106" width="488" height="228" fill={`url(#glow${idx})`} />

              {/* Screen content */}
              <text x="400" y="215" textAnchor="middle" fill={accentColor} fontSize="16" fontFamily="serif" opacity="0.6">{title}</text>
              <text x="400" y="238" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" opacity="0.3">LUMOS MEDIA ART</text>

              {/* Human silhouettes */}
              <ellipse cx="110" cy="368" rx="18" ry="6" fill="#1a1a1a" />
              <rect x="100" y="305" width="20" height="63" rx="10" fill="#1a1a1a" />
              <circle cx="110" cy="292" r="14" fill="#1a1a1a" />

              <ellipse cx="690" cy="368" rx="18" ry="6" fill="#1a1a1a" />
              <rect x="680" y="305" width="20" height="63" rx="10" fill="#1a1a1a" />
              <circle cx="690" cy="292" r="14" fill="#1a1a1a" />
            </svg>
          </div>

          {/* Scene Label */}
          <div className="px-4 py-3 border-t border-white/5">
            <p className="font-accent text-[10px] tracking-widest text-gray-500">{scene.desc}</p>
            <p className="text-sm text-gray-300 mt-0.5">{scene.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ArtworkDetail() {
  const [, params] = useRoute("/artwork/:id");
  const [, setLocation] = useLocation();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<PlayerTab>("video");
  const [showroomMode, setShowroomMode] = useState(false);

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
    setActiveTab("video");
    setDescExpanded(false);
    setShowroomMode(false);
  }, [params?.id]);

  // ESC key to exit showroom
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowroomMode(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
  const borderAccent = isStandard ? "border-[#D4A843]/20" : "border-[#93C5FD]/20";
  const btnClass = isStandard ? "btn-brutalist" : "btn-brutalist-blue";
  const watermarkLabel = isStandard ? "LUMOS STANDARD" : "LUMOS LOCAL";
  const videoSrc = (artwork as any).videoSrc as string | undefined;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: artwork.title, text: artwork.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다.");
    }
  };

  const handleContactClick = () => {
    window.dispatchEvent(new CustomEvent("open-contact", { detail: { artworkName: artwork.title } }));
  };

  // ─── Showroom Mode ─────────────────────────────────────────────────────
  if (showroomMode) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <button
          onClick={() => setShowroomMode(false)}
          className="absolute top-6 right-6 z-10 flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
        >
          <X className="w-4 h-4" />
          <span className="font-accent text-xs tracking-widest">쇼룸 종료 (ESC)</span>
        </button>

        <div className="relative w-full h-full flex items-center justify-center">
          {videoSrc ? (
            <video
              src={videoSrc}
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

  // ─── Normal View ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld={isStandard ? "standard" : "local"} />
      <FloatingCTA />

      {/* ─── Hero: Full-Height Media ─── */}
      <section className="relative" style={{ minHeight: "90vh" }}>
        {/* Media */}
        <div className="relative w-full" style={{ height: "90vh" }}>
          {videoSrc ? (
            <video
              src={videoSrc}
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

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85 pointer-events-none" />

          {/* Watermark */}
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

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="absolute top-24 left-8 z-30 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-accent text-xs tracking-widest">뒤로</span>
          </button>

          {/* Showroom Button */}
          <button
            onClick={() => setShowroomMode(true)}
            className="absolute top-24 right-8 z-30 flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="font-accent text-xs tracking-widest">쇼룸 모드</span>
          </button>

          {/* Info Overlay — bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-12">
            <div className="max-w-screen-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                {/* Left: Title & Description */}
                <div className="md:col-span-2">
                  <span className={`font-accent text-xs tracking-widest ${accentClass} mb-3 block`}>
                    {artwork.category}
                  </span>
                  <h1
                    className="text-display text-[3rem] md:text-[4.5rem] leading-none text-white mb-6"
                    style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
                  >
                    {artwork.title}
                  </h1>

                  {/* Collapsible Description */}
                  <div className="mb-8">
                    <p
                      className={`text-gray-300 leading-relaxed ${!descExpanded ? "line-clamp-2" : ""}`}
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
                    >
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
                    <button onClick={handleContactClick} className={btnClass}>
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

                {/* Right: Specs */}
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
                    {(artwork as any).tags && (
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs text-gray-600 font-accent tracking-wider block mb-2">태그</span>
                        <div className="flex flex-wrap gap-1.5">
                          {((artwork as any).tags as string[]).map((tag) => (
                            <span
                              key={tag}
                              className={`font-accent text-[10px] tracking-wider px-2 py-0.5 border ${borderAccent} ${accentClass} opacity-70`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
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
            <button
              onClick={() => setActiveTab("video")}
              className={`flex items-center gap-2 px-8 py-4 font-accent text-xs tracking-widest transition-all duration-200 border-b-2 -mb-px ${
                activeTab === "video"
                  ? `${accentClass} border-current`
                  : "text-gray-600 border-transparent hover:text-gray-400"
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              영상 보기
            </button>
            <div className="w-px h-8 self-center bg-white/10" />
            <button
              onClick={() => setActiveTab("simulation")}
              className={`flex items-center gap-2 px-8 py-4 font-accent text-xs tracking-widest transition-all duration-200 border-b-2 -mb-px ${
                activeTab === "simulation"
                  ? `${accentClass} border-current`
                  : "text-gray-600 border-transparent hover:text-gray-400"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              설치 시뮬레이션
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "video" ? (
            <div className="relative w-full bg-[#050505] flex items-center justify-center" style={{ minHeight: "60vh" }}>
              {videoSrc ? (
                <video
                  src={videoSrc}
                  className="w-full max-h-[70vh] object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              )}
              {/* Watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ opacity: 0.15 }}
              >
                <span
                  className="font-display text-white text-[2.5vw] tracking-[0.4em] uppercase"
                  style={{ userSelect: "none" }}
                >
                  {watermarkLabel}
                </span>
              </div>
            </div>
          ) : (
            <InstallationSimulation accentColor={accentColor} title={artwork.title} />
          )}
        </div>
      </section>

      {/* ─── Related Artworks ─── */}
      {relatedArtworks.length > 0 && (
        <section className="py-20 px-8 md:px-16 bg-[#0a0a0a] border-t border-white/5">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-white/5" />
              <h2 className="font-accent text-xs tracking-[0.3em] text-gray-500 uppercase">
                관련 작품
              </h2>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedArtworks.map((rel) => {
                const relVideo = (rel as any).videoSrc as string | undefined;
                return (
                  <div
                    key={rel.id}
                    className="group cursor-pointer"
                    onClick={() => setLocation(`/artwork/${rel.id}`)}
                  >
                    <div className="relative overflow-hidden aspect-video bg-[#111] mb-3">
                      {relVideo ? (
                        <video
                          src={relVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className={`text-sm font-semibold text-white leading-tight line-clamp-1 group-hover:${accentClass} transition-colors duration-200`}>
                      {rel.title}
                    </h3>
                    <span className={`font-accent text-[10px] tracking-widest ${accentClass} opacity-60`}>
                      {rel.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Footer ─── */}
      <section className={`py-20 px-8 md:px-16 border-t ${borderAccent}`} style={{ background: `${accentColor}08` }}>
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-display text-3xl md:text-5xl text-white mb-6">
            이 작품을 공간에 설치하고 싶으신가요?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            LUMOS 전문 팀이 공간 분석부터 설치까지 전 과정을 지원합니다.
          </p>
          <button onClick={handleContactClick} className={btnClass}>
            이 작품으로 문의하기
          </button>
        </div>
      </section>
    </div>
  );
}
