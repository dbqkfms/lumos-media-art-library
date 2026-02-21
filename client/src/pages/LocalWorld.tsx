/*
  LocalWorld v2 — Dark Gallery with Blue Accent
  - Dark base (#0a0a0a) — unified with STANDARD
  - Blue/Silver accent (#93C5FD)
  - 4-column grid (desktop)
  - Search bar
  - Slim cards: thumbnail + title + category tag only
  - Hover: scale(1.02) + blue glow
*/

import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { localArtworks, localCategories } from "@/data/localArtworks";

export default function LocalWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtworks = useMemo(() => {
    let result = activeFilter === "All"
      ? localArtworks
      : localArtworks.filter((art) => art.category === activeFilter);

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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header currentWorld="local" />
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
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/wRyncDSflfQuQrwr.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-12 md:px-20 pb-16 md:pb-20">
          <p className="font-accent text-xs tracking-[0.3em] text-[#93C5FD] mb-5">
            KOREAN COMMERCIAL ART
          </p>
          <h1 className="text-display text-[4rem] md:text-[6rem] leading-none text-white mb-5 text-shadow-strong">
            LOCAL
          </h1>
          <p className="text-lg text-gray-300 max-w-xl text-shadow-medium">
            한국의 전통미를 현대적으로 재해석한 상업용 미디어아트
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
              className="search-bar search-bar-local"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {localCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`filter-pill ${
                  activeFilter === category
                    ? "filter-pill-active-local"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="font-accent text-xs tracking-widest text-gray-600 mb-8">
              {filteredArtworks.length}개 작품
            </p>
          )}

          {/* Artworks Grid — 4 columns */}
          {filteredArtworks.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="gallery-card gallery-card-local"
                  onClick={() => setLocation(`/artwork/${artwork.id}`)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video bg-[#111]">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Slim Card Content */}
                  <div className="px-3.5 py-3">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1 mb-2">
                      {artwork.title}
                    </h3>
                    <span className="inline-block font-accent text-[10px] tracking-widest text-[#93C5FD] bg-[#93C5FD]/10 px-2 py-0.5">
                      {artwork.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-600 font-accent text-xs tracking-widest">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-36 px-12 md:px-20 bg-[#0f0f0f] border-t border-white/5">
        <div className="max-w-3xl">
          <p className="font-accent text-xs tracking-[0.3em] text-[#93C5FD] mb-6">
            CONTACT
          </p>
          <h2 className="text-display text-[3rem] md:text-[4rem] leading-tight text-white mb-8">
            공간에 생명을 불어넣는 빛
          </h2>
          <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-xl">
            LUMOS LOCAL은 카페, 레스토랑, 호텔, 상업 공간을 위한
            한국적 정서가 담긴 미디어아트 콘텐츠를 제공합니다.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="btn-brutalist-blue"
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
