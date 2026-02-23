/*
  StandardWorld v3 — Hight-end Gallery
  - 4-column grid (desktop), 3 (tablet), 2 (mobile)
  - Search bar: title / category / #tag
  - Category filter pills + direction filter
  - Infinite scroll (12 per batch)
  - Card hover: scale(1.02) + gold glow + "▶ 미리보기" overlay
  - Fade-up stagger on card entry
*/
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Search, LayoutGrid, LayoutList } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, standardCategories } from "@/data/standardArtworks";

const PAGE_SIZE = 12;

export default function StandardWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [dirFilter, setDirFilter] = useState<"All" | "Horizontal" | "Vertical">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Filtered + searched artworks
  const filteredArtworks = useMemo(() => {
    let result = activeFilter === "All"
      ? standardArtworks
      : standardArtworks.filter((art) => art.category === activeFilter);

    if (dirFilter !== "All") {
      result = result.filter((art) => art.displayType === dirFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace(/^#/, "");
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, dirFilter, searchQuery]);

  // Reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [activeFilter, dirFilter, searchQuery]);

  // Paginated slice
  const visibleArtworks = useMemo(
    () => filteredArtworks.slice(0, page * PAGE_SIZE),
    [filteredArtworks, page]
  );

  const hasMore = visibleArtworks.length < filteredArtworks.length;

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((p) => p + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Fade-up on card entry
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".gallery-card-animate");
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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld="standard" />
      <FloatingCTA />

      {/* ─── Hero Section ─── */}
      <section className="relative h-[65vh] flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/uqcXUFUnrsmScJQs.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 px-12 md:px-20 pb-16 md:pb-20">
          <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-5">
            PREMIUM MEDIA ART
          </p>
          <h1 className="text-display text-[4rem] md:text-[6rem] leading-none text-white mb-5 text-shadow-strong">
            STANDARD
          </h1>
          <p className="text-lg text-gray-300 max-w-xl text-shadow-medium">
            글로벌 스탠다드로 완성하는 프리미엄 공간
          </p>
        </div>
      </section>

      {/* ─── Gallery Section ─── */}
      <section className="py-24 px-8 md:px-12">
        <div className="max-w-screen-xl mx-auto">

          {/* Search Bar */}
          <div className="relative mb-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="작품명, 카테고리, #태그로 검색..."
              className="search-bar"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {standardCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`filter-pill ${
                    activeFilter === category ? "filter-pill-active-standard" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-5 bg-white/10 mx-1" />

            {/* Direction filter */}
            <div className="flex gap-2">
              {(["All", "Horizontal", "Vertical"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setDirFilter(dir)}
                  className={`filter-pill flex items-center gap-1.5 ${
                    dirFilter === dir ? "filter-pill-active-standard" : ""
                  }`}
                >
                  {dir === "Horizontal" && <LayoutGrid className="w-3 h-3" />}
                  {dir === "Vertical" && <LayoutList className="w-3 h-3" />}
                  {dir === "All" ? "전체" : dir === "Horizontal" ? "가로형" : "세로형"}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="font-accent text-xs tracking-widest text-gray-600 mb-8">
            {filteredArtworks.length}개 작품
          </p>

          {/* Artworks Grid — 4 columns */}
          {visibleArtworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleArtworks.map((artwork, idx) => (
                <div
                  key={artwork.id}
                  className="gallery-card gallery-card-standard gallery-card-animate"
                  style={{
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: `opacity 0.5s ease ${(idx % PAGE_SIZE) * 0.05}s, transform 0.5s ease ${(idx % PAGE_SIZE) * 0.05}s`,
                  }}
                  onClick={() => setLocation(`/artwork/${artwork.id}`)}
                >
                  {/* Thumbnail with hover overlay */}
                  <div className="relative overflow-hidden aspect-video bg-[#111]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="card-hover-overlay">
                      <span className="card-hover-label">▶ 미리보기</span>
                    </div>
                  </div>

                  {/* Slim Card Content */}
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2">
                      {artwork.title}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-block font-accent text-[10px] tracking-widest text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5">
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
              <p className="text-gray-600 font-accent text-xs tracking-widest">검색 결과가 없습니다</p>
            </div>
          )}

          {/* Infinite scroll loader */}
          {hasMore && (
            <div ref={loaderRef} className="flex justify-center py-16">
              <div className="w-6 h-6 border border-[#D4A843]/30 border-t-[#D4A843] rounded-full animate-spin" />
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-36 px-12 md:px-20 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl">
          <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-6">
            CONTACT
          </p>
          <h2 className="text-display text-[3rem] md:text-[4rem] leading-tight text-white mb-8">
            예술의 새로운 차원
          </h2>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-xl">
            LUMOS STANDARD는 갤러리, 미술관, 프리미엄 공간을 위한
            최고급 미디어아트 콘텐츠를 제공합니다.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="btn-brutalist"
          >
            Contact Us
          </button>
        </div>
      </section>

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
