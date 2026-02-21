/*
  Home Page v2 — Premium Media Art Brand
  - Hero: Fullscreen video loop (placeholder if no video)
  - World Selection: Vertical Split 50/50, dark base
  - Case Studies: Dark cards
*/

import { useLocation } from "wouter";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <FloatingCTA />

      {/* ─── Hero Section — Fullscreen Video ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-55"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/ndeHuHogaaKeFNpu.mp4" type="video/mp4" />
          </video>
          {/* Fallback: video area placeholder */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] opacity-0" />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero Content — bottom-left */}
        <div className="absolute bottom-0 left-0 w-full px-12 pb-20 md:px-20 md:pb-24">
          <div className="max-w-3xl">
            <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-6 opacity-90">
              LED MEDIA ART LIBRARY
            </p>
            <h1 className="text-display text-[5.5rem] md:text-[8rem] leading-[0.9] mb-8 text-shadow-strong offset-text">
              LUMOS
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-200 mb-3 text-shadow-medium tracking-wide">
              Light, Redefined.
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-lg text-shadow-soft leading-relaxed">
              LED 디스플레이 전용 AI 생성 미디어아트 라이브러리
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-9 border border-[#D4A843]/50 rounded-full flex justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-[#D4A843] rounded-full opacity-80" />
          </div>
        </div>
      </section>

      {/* ─── Glowing Divider ─── */}
      <div className="glow-divider" />

      {/* ─── World Selection — Vertical Split 50/50 ─── */}
      <section className="relative min-h-screen flex flex-col md:flex-row">
        {/* STANDARD — Left 50% */}
        <div
          onClick={() => setLocation("/standard")}
          className="group relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden cursor-pointer light-trail"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/uqcXUFUnrsmScJQs.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />
          </div>

          <div className="relative h-full flex flex-col justify-end items-start p-12 md:p-20 pb-16 md:pb-20">
            <div className="max-w-sm">
              <p className="font-accent text-xs tracking-[0.25em] text-[#D4A843] mb-5">
                PREMIUM MEDIA ART
              </p>
              <h2 className="text-display text-[3.5rem] md:text-[5rem] leading-none mb-6 text-white group-hover:text-[#D4A843] transition-colors duration-500">
                STANDARD
              </h2>
              <p className="text-sm text-gray-300 mb-10 leading-relaxed">
                갤러리, 미술관, 럭셔리 공간을 위한 글로벌 스탠다드 콘텐츠.
                보편적 아름다움으로 공간의 품격을 완성합니다.
              </p>
              <button className="btn-brutalist">
                Explore STANDARD
              </button>
            </div>
          </div>

          {/* Gold glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A843]/10 to-transparent" />
          </div>
        </div>

        {/* Central Divider — 1px gold */}
        <div className="hidden md:block w-px bg-[#D4A843]/40 glow-gold-sm" />

        {/* LOCAL — Right 50% */}
        <div
          onClick={() => setLocation("/local")}
          className="group relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/CnGsOfsCLSNXSijg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-colors duration-500" />
          </div>

          <div className="relative h-full flex flex-col justify-end items-start p-12 md:p-20 pb-16 md:pb-20">
            <div className="max-w-sm">
              <p className="font-accent text-xs tracking-[0.25em] text-[#93C5FD] mb-5">
                KOREAN COMMERCIAL ART
              </p>
              <h2 className="text-display text-[3.5rem] md:text-[5rem] leading-none mb-6 text-white group-hover:text-[#93C5FD] transition-colors duration-500">
                LOCAL
              </h2>
              <p className="text-sm text-gray-300 mb-10 leading-relaxed">
                한국의 전통미와 자연을 담은 콘텐츠. 카페, 레스토랑, 호텔 등
                일상 공간에 한국적 정서를 더합니다.
              </p>
              <button className="btn-brutalist-blue">
                Explore LOCAL
              </button>
            </div>
          </div>

          {/* Blue glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-bl from-[#93C5FD]/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── Case Studies Section ─── */}
      <section className="relative py-36 px-12 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20">
            <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-6">
              CASE STUDIES
            </p>
            <h2 className="text-display text-[3rem] md:text-[4.5rem] leading-tight">
              LUMOS가 빛으로<br />완성한 공간들
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="group relative overflow-hidden light-trail">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920"
                  alt="호텔 로비 사례"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-accent text-[10px] tracking-widest text-[#D4A843]">
                  Luxury Hotel
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  호텔 로비 LED 파사드
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  프리미엄 미디어아트로 호텔의 정체성을 표현. 우주와 추상의 조화.
                </p>
              </div>
            </div>

            {/* Case 2 */}
            <div className="group relative overflow-hidden light-trail">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1920"
                  alt="갤러리 사례"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-accent text-[10px] tracking-widest text-[#D4A843]">
                  Art Gallery
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  현대미술관 미디어 설치
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  기하학적 패턴과 빛의 예술. 갤러리 공간에 생명을 불어넣다.
                </p>
              </div>
            </div>

            {/* Case 3 */}
            <div className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                <img
                  src="/local_sample_1_nature.jpg"
                  alt="카페 사례"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-accent text-[10px] tracking-widest text-[#93C5FD]">
                  Cafe
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  봄날 벚꽃 카페
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  계절의 변화를 담은 자연 콘텐츠. 평화로운 분위기 연출.
                </p>
              </div>
            </div>

            {/* Case 4 */}
            <div className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
                  alt="오피스 사례"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="font-accent text-[10px] tracking-widest text-[#D4A843]">
                  Corporate Office
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  기업 로비 미디어월
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  기업 아이덴티티를 시각화한 미디어아트. 브랜드 가치를 공간으로.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 px-12 md:px-20 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-xl text-[#D4A843] mb-2">LUMOS</p>
            <p className="text-sm text-gray-600">LED 디스플레이 전용 AI 생성 미디어아트 라이브러리</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">contact@lumos.art</p>
            <p className="text-xs text-gray-700 mt-1">© 2025 LUMOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
