/*
  StandardWorld v3 — Premium Dark Gallery
  - Dark base (#0a0a0a)
  - Gold accent (#D4A843)
  - 4-column grid (desktop), 2-column (mobile)
  - Search bar + skeleton loading + empty state
  - Hover: scale(1.02) + gold glow border
  - Contact Us → opens FloatingCTA
*/

import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, X, Layers } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, standardCategories } from "@/data/standardArtworks";

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="bg-[#111] animate-pulse">
      <div className="aspect-video bg-[#1a1a1a]" />
      <div className="px-3.5 py-3 space-y-2">
        <div className="h-3.5 bg-[#1a1a1a] rounded w-3/4" />
        <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
      </div>
    </div>
  );
}

export default function StandardWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredArtworks = useMemo(() => {
    let result = activeFilter === "All"
      ? standardArtworks
      : standardArtworks.filter((art) => art.category === activeFilter);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (art) =>
          art.title.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeFilter, searchQuery]);

  const handleContactClick = () => {
    // Trigger FloatingCTA by dispatching a custom event
    window.dispatchEvent(new CustomEvent("open-contact"));
  };

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
          <div className="relative mb-10 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="작품명 또는 카테고리로 검색..."
              className="search-bar"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {standardCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-pill ${
                  activeFilter === category
                    ? "filter-pill-active-standard"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results count */}
          {(searchQuery || activeFilter !== "All") && !isLoading && (
            <p className="font-accent text-xs tracking-widest text-gray-600 mb-8">
              {filteredArtworks.length}개 작품
            </p>
          )}

          {/* Skeleton Loading */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredArtworks.length > 0 ? (
            /* Artworks Grid — 4 columns desktop, 2 columns mobile */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="gallery-card gallery-card-standard group cursor-pointer"
                  onClick={() => setLocation(`/artwork/${artwork.id}`)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video bg-[#111]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-[#D4A843]/20 backdrop-blur-sm border border-[#D4A843]/40 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[#D4A843] ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Slim Card Content */}
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2 group-hover:text-[#D4A843] transition-colors duration-200">
                      {artwork.title}
                    </h3>
                    <span className="inline-block font-accent text-[10px] tracking-widest text-[#D4A843] bg-[#D4A843]/10 px-2 py-0.5">
                      {artwork.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-full bg-[#D4A843]/10 flex items-center justify-center mb-6">
                <Layers className="w-7 h-7 text-[#D4A843]/50" />
              </div>
              <h3 className="text-display text-xl text-white mb-3">검색 결과 없음</h3>
              <p className="text-gray-600 text-sm mb-8 max-w-xs">
                "{searchQuery || activeFilter}"에 해당하는 작품을 찾을 수 없습니다.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="font-accent text-xs tracking-widest text-[#D4A843] border border-[#D4A843]/30 px-6 py-3 hover:bg-[#D4A843]/10 transition-colors"
              >
                전체 작품 보기
              </button>
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
            onClick={handleContactClick}
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
