/*
  Design Philosophy: Luminous Brutalism - LOCAL World
  - Gallery: Grid 레이아웃 (규칙적, 안정감)
  - Color: 오프화이트 배경 + 웜 그레이 텍스트
  - Interaction: Soft and Calm
*/

import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const contents = [
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
];

export default function LocalWorld() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-sm border-b border-[#A8A8A8]/30">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-[#A8A8A8] hover:text-[#2C2C2C] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-accent text-sm uppercase tracking-wider">Back</span>
          </button>
          <h1 className="text-display text-3xl text-[#A8A8A8]">LOCAL</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

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
            <h3 className="text-display text-3xl md:text-4xl mb-4 text-[#2C2C2C]">Gallery</h3>
            <p className="text-[#A8A8A8]">
              자연과 계절을 담은 콘텐츠 컬렉션. 공간에 편안함과 안정감을 더합니다.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contents.map((content) => (
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
