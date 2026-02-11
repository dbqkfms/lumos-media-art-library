/*
  Design Philosophy: Luminous Brutalism - LOCAL World
  - Gallery: Grid 레이아웃 (규칙적, 안정감)
  - Color: 오프화이트 배경 + 웜 그레이 텍스트
  - Interaction: Soft and Calm
*/

import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";

const artworks = [
  {
    id: 1,
    title: "자연의 고요",
    image: "/local_sample_1_nature.jpg",
    description: "평화로운 자연 풍경",
    category: "Nature",
  },
  {
    id: 2,
    title: "계절의 변화",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/KqghuSqxLzcKKDxa.png",
    description: "사계절의 아름다움",
    category: "Seasonal",
  },
  {
    id: 3,
    title: "한국의 풍경",
    image: "/local_sample_3_korea.jpg",
    description: "한국의 자연미",
    category: "Landscape",
  },
  {
    id: 4,
    title: "안개 낀 산",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/8sBD7cWy7fnlTevRmRk8l0-img-3_1770843165000_na1fn_bG9jYWxfbmF0dXJlXzI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94LzhzQkQ3Y1d5N2ZubFRldlJtUms4bDAtaW1nLTNfMTc3MDg0MzE2NTAwMF9uYTFmbl9iRzlqWVd4ZmJtRjBkWEpsWHpJLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Iz~L9pJmN-DRGl-E3oDALy1RgL85UaeXBqen-tRwh21809LvJmlM9DfbRhaPFfknCkMIWt8hpnrvgYSrBnSIbvm1ji9K7HsCMzkzJVCeKf-njkEuGcBjj64xu-N4ItnGclTA1bPrBFOgqtnWciH0X4umydoro82KNnvt129y7GZL8GexOBV6aYjQFQ5M375JKwNn665cKdaG~Ats8VUKPFgZDnDioxHm3ehsh8SCw-MHC6HBIiEnXJ0G2nfU9ZHL2xKsEONEROjsso1CtPmX7s9LJ5JpwsjPy7VafAOATfXUenZJfbTINU0I5ATHnuUYYB~FQHxQzrc3zGL~cBo2Cg__",
    description: "평온한 산의 풍경",
    category: "Nature",
  },
  {
    id: 5,
    title: "봄의 벚꽃",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/8sBD7cWy7fnlTevRmRk8l0-img-4_1770843165000_na1fn_bG9jYWxfc2Vhc29uYWxfMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94LzhzQkQ3Y1d5N2ZubFRldlJtUms4bDAtaW1nLTRfMTc3MDg0MzE2NTAwMF9uYTFmbl9iRzlqWVd4ZmMyVmhjMjl1WVd4Zk1RLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RdKnBTJyGhOYhkv42XKBsLQiV0VgBAkUHZ~YxgKacEwx~cC23ULj4tKS6A7HDK5J-onS8I673RjPeJjGtK0kCkMHJ98Wpd6nUtkrefUZWm2RIBzpD7WcLWGYwMH~NAkXkWJJOs2oM4Yvzs4zJNUnvT~d-ipJKJiqNOEhaekgxsvzX~sZajs0bkL3T5UDoDx9LJwIAjp7GvWlIn21wLeEctVu3MLLxKOh1nwLdm76F3eYllPeLDbeYvnUtO~qo-bVcxozqQtMBT9Z24dkygau3R2hE9voRoCxRvm-s8BqSHg5JxhkfGZVpgns-xZAgT5q4pij0jp6fHbV4T9AkBm6kA__",
    description: "봄날의 벚꽃 카페",
    category: "Seasonal",
  },
  {
    id: 6,
    title: "가을 단풍",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/8sBD7cWy7fnlTevRmRk8l0-img-5_1770843170000_na1fn_bG9jYWxfc2Vhc29uYWxfMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94LzhzQkQ3Y1d5N2ZubFRldlJtUms4bDAtaW1nLTVfMTc3MDg0MzE3MDAwMF9uYTFmbl9iRzlqWVd4ZmMyVmhjMjl1WVd4Zk1nLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lw9j9zoNwmuNlVAis6dP6t6-7ZPqL4DLEjsnpf9mr82epSinVWk-2PRm4KonguAY3shtB74e2nboTSmGh6TvMH4~9y11YJdqpC7Xib2iu8TfM6VuUdsBrt2rWssFqLpfIOQRtChaewl6gea8bogev-~dpDhSLCuupaJKNh7HptdhNu8JejpHBx4wdBIfBFSoZauFzMpLwcN6G9q1MyofoAvWgF-aw-U6LUXIMGmkg5SjdtKvc5PrGb2Oz75Zo64EcV~UR4eP2PkxkZYXofn3i7cMZ29R3xEecjIn9N6hm4PBXb-dvUb1OgcZbk3jHxbpZX-1c8NZQM1MbvWSpJr94w__",
    description: "따뜻한 가을 레스토랑",
    category: "Seasonal",
  },
  {
    id: 7,
    title: "한강 야경",
    image: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1920",
    description: "서울의 야경",
    category: "Landscape",
  },
  {
    id: 8,
    title: "제주 바다",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920",
    description: "제주도의 푸른 바다",
    category: "Landscape",
  },
  {
    id: 9,
    title: "숲속 길",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920",
    description: "평화로운 숲길",
    category: "Nature",
  },
  {
    id: 10,
    title: "겨울 설경",
    image: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1920",
    description: "고요한 겨울 풍경",
    category: "Seasonal",
  },
];

export default function LocalWorld() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Nature", "Seasonal", "Landscape", "Urban"];
  
  const filteredArtworks = activeCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="/local_sample_1_nature.jpg"
            alt="LOCAL World"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
          <h2 className="text-display text-5xl md:text-7xl mb-6 text-[#2C2C2C]">
            상업용 콘텐츠
          </h2>
          <p className="text-lg md:text-xl text-[#5C5C5C] mb-4">
            일상에 스며드는 빛
          </p>
          <p className="text-base text-[#A8A8A8]">
            카페, 레스토랑, 상업공간을 위한 자연과 계절의 콘텐츠. 편안하고 친근한 분위기를 조성합니다.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#A8A8A8]/30" />

      {/* Gallery Section - Grid Layout */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-display text-3xl md:text-4xl mb-2 text-[#2C2C2C]">Gallery</h3>
                <p className="text-[#A8A8A8]">
                  자연과 계절을 담은 콘텐츠 컬렉션. 공간에 편안함과 안정감을 더합니다.
                </p>
              </div>
              <button
                onClick={() => setLocation("/standard")}
                className="text-accent text-sm uppercase tracking-wider text-[#A8A8A8] hover:text-[#2C2C2C] transition-colors"
              >
                Switch to STANDARD →
              </button>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex gap-6 pb-4 border-b border-[#A8A8A8]/30">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-accent text-sm uppercase tracking-wider transition-colors pb-2 ${
                    activeCategory === cat
                      ? "text-[#2C2C2C] border-b-2 border-[#2C2C2C]"
                      : "text-[#A8A8A8] hover:text-[#5C5C5C]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((content) => (
              <div
                key={content.id}
                className="group relative overflow-hidden bg-white border border-[#E5E5E5]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <span className="text-accent text-xs uppercase tracking-wider text-[#A8A8A8]">
                    {content.category}
                  </span>
                  <h4 className="text-display text-xl mt-2 mb-2 text-[#2C2C2C]">
                    {content.title}
                  </h4>
                  <p className="text-sm text-[#A8A8A8]">
                    {content.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 border-2 border-[#A8A8A8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-display text-3xl md:text-4xl mb-12 text-center text-[#2C2C2C]">
            LOCAL Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#E5E5E5]">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#A8A8A8]">
                Natural Ambience
              </h4>
              <p className="text-[#5C5C5C]">
                자연의 평온함을 담은 콘텐츠. 카페와 레스토랑에 완벽한 분위기.
              </p>
            </div>

            <div className="p-8 border border-[#E5E5E5]">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#A8A8A8]">
                Seasonal Themes
              </h4>
              <p className="text-[#5C5C5C]">
                계절에 맞춘 콘텐츠 업데이트. 봄, 여름, 가을, 겨울의 감성.
              </p>
            </div>

            <div className="p-8 border border-[#E5E5E5]">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#A8A8A8]">
                Easy Integration
              </h4>
              <p className="text-[#5C5C5C]">
                간편한 설치와 운영. 상업공간에 최적화된 플러그 앤 플레이.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-display text-3xl md:text-4xl mb-12 text-center text-[#2C2C2C]">
            Perfect For
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-[#E5E5E5]">
              <h4 className="text-display text-2xl mb-4 text-[#2C2C2C]">카페 & 레스토랑</h4>
              <p className="text-[#A8A8A8]">
                편안한 분위기 조성. 고객이 머물고 싶은 공간을 만듭니다.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E5E5]">
              <h4 className="text-display text-2xl mb-4 text-[#2C2C2C]">상업 공간</h4>
              <p className="text-[#A8A8A8]">
                매장의 정체성 강화. 브랜드 이미지에 맞는 시각적 경험.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E5E5]">
              <h4 className="text-display text-2xl mb-4 text-[#2C2C2C]">오피스 & 로비</h4>
              <p className="text-[#A8A8A8]">
                업무 공간에 활력. 자연의 이미지로 스트레스 완화.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#E5E5E5]">
              <h4 className="text-display text-2xl mb-4 text-[#2C2C2C]">호텔 & 리조트</h4>
              <p className="text-[#A8A8A8]">
                투숙객에게 휴식의 경험. 계절감 있는 콘텐츠로 특별함 제공.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-display text-4xl md:text-5xl mb-6 text-[#2C2C2C]">
            공간에 자연의 빛을 더하세요
          </h3>
          <p className="text-lg text-[#A8A8A8] mb-8">
            LOCAL 컬렉션으로 당신의 공간에 편안함과 생명력을 불어넣으세요.
          </p>
          <button className="border-2 border-[#A8A8A8] text-[#A8A8A8] hover:bg-[#A8A8A8] hover:text-white px-8 py-4 text-lg font-accent uppercase tracking-wider transition-all duration-200">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E5E5E5] bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-display text-2xl mb-4 text-[#A8A8A8]">LUMOS</h3>
              <p className="text-sm text-[#A8A8A8]">
                LED 디스플레이 전용<br />
                AI 생성 미디어아트 라이브러리
              </p>
            </div>
            <div>
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4 text-[#A8A8A8]">Worlds</h4>
              <ul className="space-y-2 text-sm text-[#A8A8A8]">
                <li>
                  <a href="/standard" className="hover:text-[#2C2C2C] transition-colors">
                    STANDARD - 프리미엄 미디어아트
                  </a>
                </li>
                <li>
                  <a href="/local" className="hover:text-[#2C2C2C] transition-colors">
                    LOCAL - 상업용 콘텐츠
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4 text-[#A8A8A8]">Contact</h4>
              <p className="text-sm text-[#A8A8A8]">
                © 2026 LUMOS<br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
