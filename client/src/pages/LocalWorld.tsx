/*
  Design Philosophy: Luminous Brutalism - LOCAL World
  - Gallery: Grid 레이아웃 (규칙적, 안정감)
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
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/V2yV3OLI15hCHRCueCxfip-img-5_1770848609000_na1fn_aGVyb19sb2NhbF9iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L1YyeVYzT0xJMTVoQ0hSQ3VlQ3hmaXAtaW1nLTVfMTc3MDg0ODYwOTAwMF9uYTFmbl9hR1Z5YjE5c2IyTmhiRjlpWncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Sh1FrCSEygc1Lmml7pnnGeyZkEiiFpfsjp74f9jVXRsA5N501Nrm999pn8TNAUuP~2if3oOeQyH8QH83LN~lMXRKfAg1J8uy63GOo9jyaQ4qpxWdVtIe1c7hyOy2ukDxVH8hf2rPCK7~VgxZ~2E4zzCO2wh1TNCQWrOKYagez4~3fCI7r4hIBcOGCxDwbtM-gbABeWLX9qNbBddgWfMk~5kfYtSEaAwBkoTkDnzRJvW2n25YNpmAigUXrYE6Cm3iG2mORjTYbfky01oZPs9wS192ZfufPwf03T4DvgVH-eZQCLOXE416h0xeVnCJ1QpLt~DJVpyqKV-iIkay4I2URg__')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/80" />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl md:text-8xl font-display font-bold text-gray-800 mb-6 drop-shadow-lg">
            LOCAL
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto font-body drop-shadow-md">
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

          {/* Artworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group cursor-pointer bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                onClick={() => setLocation(`/artwork/${artwork.id}`)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-display font-semibold text-gray-800 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm mb-4">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-accent text-gray-500">
                      {artwork.category}
                    </span>
                    <span className="text-xs text-gray-400">
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
