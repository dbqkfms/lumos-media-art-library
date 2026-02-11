/*
  Design Philosophy: Luminous Brutalism - STANDARD World
  - Gallery: Masonry 레이아웃 (비대칭, 긴장감)
  - Color: 블랙 배경 + 골드 액센트
  - Interaction: Heavy but Responsive
*/

import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, standardCategories } from "@/data/standardArtworks";

export default function StandardWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArtworks =
    activeFilter === "All"
      ? standardArtworks
      : standardArtworks.filter((art) => art.category === activeFilter);

  return (
    <div className="min-h-screen bg-black">
      <Header currentWorld="standard" />
      <FloatingCTA />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-[#D4AF37] mb-6 drop-shadow-2xl">
            STANDARD
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-body drop-shadow-lg">
            갤러리와 미술관을 위한 프리미엄 미디어아트
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {standardCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 font-accent text-sm transition-all ${
                  activeFilter === category
                    ? "bg-[#D4AF37] text-black"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer bg-zinc-900 overflow-hidden hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500"
                onClick={() => setLocation(`/artwork/${artwork.id}`)}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display font-semibold text-[#D4AF37] mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-400 font-body text-sm mb-4">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-accent text-gray-500">
                      {artwork.category}
                    </span>
                    <span className="text-xs text-gray-600">
                      {artwork.displayType} · {artwork.runtime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-[#D4AF37] mb-6">
            예술의 새로운 차원
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-body">
            LUMOS STANDARD는 갤러리, 미술관, 프리미엄 공간을 위한 <br />
            최고급 미디어아트 콘텐츠를 제공합니다.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="px-10 py-4 bg-[#D4AF37] text-black font-accent text-sm hover:bg-[#F4D03F] transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
