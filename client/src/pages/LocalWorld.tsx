/*
  LocalWorld v4 — High-end Gallery with Blue Accent
  - Search bar: title / category / #tag (# prefix optional)
  - Tag cloud: quick-filter buttons
  - Category filter pills + direction filter
  - Infinite scroll (12 per batch)
  - Card hover: scale(1.02) + blue glow + "▶ 미리보기" overlay
  - Fade-up stagger on card entry
*/
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { localArtworks, localCategories } from "@/data/localArtworks";

const PAGE_SIZE = 12;

const TAG_CLOUD = [
  { label: "#전통", value: "traditional" },
  { label: "#자연", value: "nature" },
  { label: "#계절", value: "seasonal" },
  { label: "#학", value: "학" },
  { label: "#연", value: "연" },
  { label: "#가로형", value: "horizontal" },
  { label: "#세로형", value: "vertical" },
  { label: "#4K", value: "4k" },
];

export default function LocalWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [dirFilter, setDirFilter] = useState<"All" | "Horizontal" | "Vertical">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const filteredArtworks = useMemo(() => {
    let result = [...localArtworks];

    if (activeFilter !== "All") {
      result = result.filter((art) => art.category === activeFilter);
    }
    if (dirFilter !== "All") {
      result = result.filter((art) => art.displayType === dirFilter);
    }
    if (activeTag) {
      const t = activeTag.toLowerCase();
      if (t === "horizontal") result = result.filter((a) => a.displayType === "Horizontal");
      else if (t === "vertical") result = result.filter((a) => a.displayType === "Vertical");
      else if (t === "4k") result = result.filter((a) => a.resolution?.toLowerCase().includes("4k") || a.resolution?.toLowerCase().includes("2160"));
      else result = result.filter((a) => a.category.toLowerCase().includes(t) || a.title.toLowerCase().includes(t));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase().replace(/^#/, "");
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          (a.description || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, dirFilter, searchQuery, activeTag]);

  useEffect(() => { setPage(1); }, [activeFilter, dirFilter, searchQuery, activeTag]);

  const visibleArtworks = useMemo(() => filteredArtworks.slice(0, page * PAGE_SIZE), [filteredArtworks, page]);
  const hasMore = visibleArtworks.length < filteredArtworks.length;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) setPage((p) => p + 1);
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".gallery-card-animate-local");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleArtworks]);

  const clearAll = () => {
    setSearchQuery("");
    setActiveTag(null);
    setActiveFilter("All");
    setDirFilter("All");
    searchRef.current?.focus();
  };

  const handleTagClick = (tagValue: string) => {
    if (activeTag === tagValue) {
      setActiveTag(null);
    } else {
      setActiveTag(tagValue);
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld="local" />
      <FloatingCTA />

      {/* ─── Hero Section ─── */}
      <section className="relative h-[65vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/wRyncDSflfQuQrwr.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 px-12 md:px-20 pb-16 md:pb-20">
          <p className="font-accent text-xs tracking-[0.3em] text-[#93C5FD] mb-5">KOREAN COMMERCIAL ART</p>
          <h1 className="text-display text-[4rem] md:text-[6rem] leading-none text-white mb-5" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}>
            LOCAL
          </h1>
          <p className="text-lg text-gray-300 max-w-xl" style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}>
            한국의 전통미를 현대적으로 재해석한 상업용 미디어아트
          </p>
        </div>
      </section>

      {/* ─── Gallery Section ─── */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-screen-xl mx-auto">

          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl">
            <div className="flex items-center gap-3 bg-[#111] border border-white/10 px-5 py-4 focus-within:border-[#93C5FD]/50 transition-colors duration-300">
              <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setActiveTag(null); }}
                placeholder="작품명, 카테고리, #태그로 검색... (예: #전통, 학, 자연)"
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 outline-none font-accent tracking-wide"
              />
              {(searchQuery || activeTag) && (
                <button onClick={clearAll} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="font-accent text-[10px] tracking-widest text-gray-600 self-center mr-1">빠른 검색:</span>
            {TAG_CLOUD.map((tag) => (
              <button
                key={tag.value}
                onClick={() => handleTagClick(tag.value)}
                className={`font-accent text-[11px] tracking-widest px-3 py-1.5 border transition-all duration-200 ${
                  activeTag === tag.value
                    ? "bg-[#93C5FD] text-black border-[#93C5FD]"
                    : "bg-transparent text-gray-500 border-white/10 hover:border-[#93C5FD]/40 hover:text-[#93C5FD]"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {localCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`filter-pill ${activeFilter === cat ? "filter-pill-active-local" : ""}`}
                >
                  {cat === "All" ? "전체" : cat}
                </button>
              ))}
            </div>
            <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />
            <div className="flex gap-2">
              {(["All", "Horizontal", "Vertical"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirFilter(dir)}
                  className={`filter-pill ${dirFilter === dir ? "filter-pill-active-local" : ""}`}
                >
                  {dir === "All" ? "전체" : dir === "Horizontal" ? "가로형" : "세로형"}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="font-accent text-xs tracking-widest text-gray-600 mb-8">
            {filteredArtworks.length}개 작품
            {(searchQuery || activeTag) && (
              <button onClick={clearAll} className="text-[#93C5FD] ml-3 hover:underline">
                필터 초기화 ×
              </button>
            )}
          </p>

          {/* Artworks Grid — 4 columns */}
          {visibleArtworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleArtworks.map((artwork, idx) => (
                <div
                  key={artwork.id}
                  className="gallery-card gallery-card-local gallery-card-animate-local cursor-pointer"
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: `opacity 0.5s ease ${(idx % PAGE_SIZE) * 0.05}s, transform 0.5s ease ${(idx % PAGE_SIZE) * 0.05}s`,
                  }}
                  onClick={() => setLocation(`/artwork/${artwork.id}`)}
                >
                  <div className="relative overflow-hidden aspect-video bg-[#111]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="card-hover-overlay card-hover-overlay-local">
                      <span className="card-hover-label">▶ 미리보기</span>
                    </div>
                  </div>
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2">
                      {artwork.title}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-block font-accent text-[10px] tracking-widest text-[#93C5FD] bg-[#93C5FD]/10 px-2 py-0.5">
                        {artwork.category}
                      </span>
                      <span className="inline-block font-accent text-[9px] tracking-widest text-gray-600 bg-white/5 px-2 py-0.5">
                        {artwork.displayType === "Horizontal" ? "가로" : "세로"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-600 font-accent text-xs tracking-widest mb-4">검색 결과가 없습니다</p>
              <button onClick={clearAll} className="text-[#93C5FD] font-accent text-xs tracking-widest hover:underline">
                필터 초기화
              </button>
            </div>
          )}

          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-16">
              <div className="w-6 h-6 border border-[#93C5FD]/30 border-t-[#93C5FD] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-36 px-12 md:px-20 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl">
          <p className="font-accent text-xs tracking-[0.3em] text-[#93C5FD] mb-6">CONTACT</p>
          <h2 className="text-display text-[3rem] md:text-[4rem] leading-tight text-white mb-8">
            공간에 생명을 불어넣는 빛
          </h2>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-xl">
            LUMOS LOCAL은 카페, 레스토랑, 호텔, 상업 공간을 위한
            한국적 정서가 담긴 미디어아트 콘텐츠를 제공합니다.
          </p>
          <button onClick={() => setLocation("/")} className="btn-brutalist-blue">
            Contact Us
          </button>
        </div>
      </section>

      <footer className="py-12 px-12 md:px-20 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <p className="font-display text-lg text-[#D4A843]">LUMOS</p>
          <p className="text-xs text-gray-700">© 2025 LUMOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
