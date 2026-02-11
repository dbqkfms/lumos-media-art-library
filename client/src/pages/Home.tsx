/*
  Design Philosophy: Luminous Brutalism
  - Hero: 풀스크린 영상 + 좌측 하단 텍스트 (10% 영역)
  - World Selection: Vertical Split (50/50, 중앙 1px 골드 라인)
  - Color: 블랙 배경 + 골드 액센트
*/

import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - 풀스크린 영상 배경 */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background - Animated Image (Video placeholder) */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/PHLFccawZZjMhvnA.png"
              alt="LUMOS Hero"
              className="h-full w-full object-cover opacity-60 animate-slow-zoom"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Hero Content - 좌측 하단 10% 영역 */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-2xl">
            <h1 className="text-display text-6xl md:text-8xl mb-6 offset-text">
              LUMOS
            </h1>
            <p className="text-xl md:text-2xl font-light mb-2 text-gray-300">
              Light, Redefined.
            </p>
            <p className="text-base md:text-lg text-gray-400 max-w-xl">
              LED 디스플레이 전용 AI 생성 미디어아트 라이브러리
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#D4AF37] rounded-full" />
          </div>
        </div>
      </section>

      {/* Glowing Divider */}
      <div className="glow-divider" />

      {/* World Selection - Vertical Split 50/50 */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        {/* STANDARD World - 왼쪽 50% */}
        <div
          onClick={() => setLocation("/standard")}
          className="group relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden cursor-pointer light-trail"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/CsCdnLUHaWwRzGSO.png"
            alt="STANDARD World"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-start p-8 md:p-16">
            <div className="max-w-md">
              <h2 className="text-display text-5xl md:text-7xl mb-6 text-[#D4AF37]">
                STANDARD
              </h2>
              <p className="text-lg md:text-xl mb-4 text-gray-200">
                프리미엄 미디어아트
              </p>
              <p className="text-sm md:text-base text-gray-400 mb-8">
                빛으로 완성하는 공간의 정체성. 랜드마크, 파사드, 갤러리를 위한 예술적 콘텐츠.
              </p>
              <button className="btn-brutalist">
                Explore STANDARD
              </button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent" />
          </div>
        </div>

        {/* Central Divider - 1px 골드 라인 */}
        <div className="hidden md:block w-px bg-[#D4AF37] glow-gold-sm" />

        {/* LOCAL World - 오른쪽 50% */}
        <div
          onClick={() => setLocation("/local")}
          className="group relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden cursor-pointer light-trail"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/local_sample_1_nature.jpg"
              alt="LOCAL World"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center items-start p-8 md:p-16">
            <div className="max-w-md">
              <h2 className="text-display text-5xl md:text-7xl mb-6 text-white">
                LOCAL
              </h2>
              <p className="text-lg md:text-xl mb-4 text-gray-200">
                상업용 콘텐츠
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-8">
                일상에 스며드는 빛. 카페, 레스토랑, 상업공간을 위한 자연과 계절의 콘텐츠.
              </p>
              <button className="btn-brutalist border-white text-white hover:bg-white hover:text-black">
                Explore LOCAL
              </button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-bl from-white/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/EstDBDiGIUjZvcAV.png"
            alt="About LUMOS"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-16 text-center">
          <h2 className="text-display text-4xl md:text-6xl mb-8">
            Light, Redefined.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
            <p>
              LUMOS는 빛이 단순한 조명을 넘어 공간의 정체성을 정의하고, 경험을 완성하며, 감정을 전달하는 매개체라고 믿습니다.
            </p>
            <p>
              AI 생성 미디어아트를 통해 빛의 새로운 가능성을 탐구하며, LED 디스플레이를 위한 프리미엄 콘텐츠 라이브러리를 제공합니다.
            </p>
            <p className="text-[#D4AF37] text-2xl font-display mt-12">
              빛으로 공간의 정체성을 완성합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#D4AF37]/30 bg-black">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-display text-2xl mb-4 text-[#D4AF37]">LUMOS</h3>
              <p className="text-sm text-gray-400">
                LED 디스플레이 전용<br />
                AI 생성 미디어아트 라이브러리
              </p>
            </div>
            <div>
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4">Worlds</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/standard" className="hover:text-[#D4AF37] transition-colors">
                    STANDARD - 프리미엄 미디어아트
                  </a>
                </li>
                <li>
                  <a href="/local" className="hover:text-white transition-colors">
                    LOCAL - 상업용 콘텐츠
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4">Contact</h4>
              <p className="text-sm text-gray-400">
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
