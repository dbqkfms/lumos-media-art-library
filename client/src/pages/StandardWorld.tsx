/*
  Design Philosophy: Luminous Brutalism - STANDARD World
  - Gallery: Card 레이아웃 (반응형, 세련됨)
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-[#D4AF37] mb-6 drop-shadow-2xl">
            STANDARD
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-body drop-shadow-lg">
            글로벌 스탠다드로 완성하는 프리미엄 공간
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

          {/* Artworks Grid - Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer bg-zinc-900 rounded-none overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/20 transition-all duration-500 border border-zinc-800"
                onClick={() => setLocation(`/artwork/${artwork.id}`)}
              >
                {/* Thumbnail with fixed 16:9 ratio */}
                <div className="relative overflow-hidden aspect-video bg-zinc-950">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h3 className="text-lg font-display font-semibold text-[#D4AF37] mb-1.5 line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-400 font-body text-xs mb-3 line-clamp-2 leading-relaxed">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-accent text-gray-500 uppercase tracking-wider">
                      {artwork.category}
                    </span>
                    <span className="text-gray-600">
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
