/*
  Design Philosophy: Luminous Brutalism - LOCAL World
  - Gallery: Card 레이아웃 (반응형, 세련됨)
  - Color: 오프화이트 배경 + 웜 그레이 텍스트
  - Interaction: Soft and Calm
*/

import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { localArtworks, localCategories } from "@/data/localArtworks";

export default function LocalWorld() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArtworks =
    activeFilter === "All"
      ? localArtworks
      : localArtworks.filter((art) => art.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header currentWorld="local" />
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
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/wRyncDSflfQuQrwr.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-white mb-6 drop-shadow-2xl" style={{ textShadow: '0 0 40px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.9)' }}>
            LOCAL
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-body drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(0,0,0,0.8), 0 2px 15px rgba(0,0,0,0.9)' }}>
            한국의 전통미를 현대적으로 재해석한 상업용 미디어아트
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {localCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 font-accent text-sm transition-all ${
                  activeFilter === category
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Artworks Grid - Card Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer bg-white rounded-none overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200"
                onClick={() => setLocation(`/artwork/${artwork.id}`)}
              >
                {/* Thumbnail with fixed 16:9 ratio */}
                <div className="relative overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold text-gray-800 mb-2 line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm mb-4 line-clamp-2">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-accent text-gray-500 uppercase">
                      {artwork.category}
                    </span>
                    <span className="text-gray-400">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-display font-bold text-gray-800 mb-6">
            공간에 생명을 불어넣는 빛
          </h2>
          <p className="text-xl text-gray-600 mb-10 font-body">
            LUMOS LOCAL은 카페, 레스토랑, 호텔, 상업 공간을 위한 <br />
            한국적 정서가 담긴 미디어아트 콘텐츠를 제공합니다.
          </p>
          <button
            onClick={() => setLocation("/")}
            className="px-10 py-4 bg-gray-800 text-white font-accent text-sm hover:bg-gray-700 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
