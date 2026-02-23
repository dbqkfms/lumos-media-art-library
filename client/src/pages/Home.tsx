/*
  Home Page v3 — Hight-end Media Art Showroom
  - Hero: Fullscreen video loop + "Light, Redefined" copy
  - World Selection: Vertical Split 50/50
  - Atmosphere Scenarios: 4 cards with user-provided images + ambient lighting
  - Footer
*/

import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  const [, setLocation] = useLocation();

  // Fade-up scroll observer
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addFadeRef = (el: HTMLElement | null, index: number) => {
    fadeRefs.current[index] = el;
  };

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
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>

        {/* Hero Content — bottom-left */}
        <div className="absolute bottom-0 left-0 w-full px-12 pb-20 md:px-20 md:pb-28">
          <div className="max-w-3xl">
            <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-6 opacity-90">
              LED MEDIA ART LIBRARY
            </p>
            <h1 className="text-display text-[5.5rem] md:text-[8rem] leading-[0.9] mb-8 text-shadow-strong offset-text">
              LUMOS
            </h1>
            <p className="text-2xl md:text-3xl font-light text-gray-100 mb-4 text-shadow-medium tracking-wide" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic" }}>
              Light, Redefined.
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-lg text-shadow-soft leading-relaxed mb-10">
              AI가 만든 미디어아트로 공간에 생명을 불어넣습니다
            </p>
            <button
              onClick={() => setLocation("/standard")}
              className="btn-brutalist"
            >
              컬렉션 보기 →
            </button>
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

      {/* ─── Atmosphere Scenarios Section ─── */}
      <section className="relative py-36 px-12 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto">
          {/* Section Header */}
          <div
            className="mb-20 fade-up"
            ref={(el) => addFadeRef(el, 0)}
          >
            <p className="font-accent text-xs tracking-[0.3em] text-[#D4A843] mb-6">
              ATMOSPHERE SCENARIOS
            </p>
            <h2 className="text-display text-[3rem] md:text-[4.5rem] leading-tight">
              공간 시나리오<br />— 빛이 완성하는 장면들
            </h2>
            <p className="text-sm text-gray-500 mt-6 max-w-xl leading-relaxed">
              LUMOS의 미디어아트는 공간의 성격을 재정의합니다.
              전통과 현대, 자연과 상상이 하나의 빛으로 역어내는 순간.
            </p>
          </div>

          {/* Scenarios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Scenario 1 — Korean Tradition Reimagined */}
            <div
              className="scenario-card scenario-card-gold group cursor-pointer fade-up"
              ref={(el) => addFadeRef(el, 1)}
            >
              {/* Ambient overlay — warm gold */}
              <div
                className="ambient-overlay"
                style={{ background: "radial-gradient(ellipse at center, rgba(212,168,67,0.15) 0%, transparent 70%)" }}
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src="/assets/scenario-korean-tradition.png"
                  alt="Korean Tradition Reimagined — 3D Media Art"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="font-accent text-[10px] tracking-widest text-[#D4A843]">
                  PREMIUM EXHIBITION
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  Korean Tradition Reimagined
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  한국의 전통 미학과 AI 생성 예술의 융합. 8K 렌더링으로 재해석한
                  산수화와 연소의 움직임이 공간을 압도합니다.
                </p>
              </div>
            </div>

            {/* Scenario 2 — Nature & Ink */}
            <div
              className="scenario-card scenario-card-green group cursor-pointer fade-up"
              ref={(el) => addFadeRef(el, 2)}
              style={{ transitionDelay: "0.1s" }}
            >
              {/* Ambient overlay — green */}
              <div
                className="ambient-overlay"
                style={{ background: "radial-gradient(ellipse at center, rgba(134,239,172,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src="/assets/scenario-nature-forest.png"
                  alt="Nature & Ink — Immersive Forest"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="font-accent text-[10px] tracking-widest text-[#86EFAC]">
                  NATURE IMMERSIVE
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  Nature &amp; Ink — 산수화의 세계
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  살아있는 자연과 수묵화의 붓이 겹치는 공간.
                  새와 사슴이 스크린을 걸어 나오는 머물림의 순간.
                </p>
              </div>
            </div>

            {/* Scenario 3 — Dragon & Ocean */}
            <div
              className="scenario-card scenario-card-teal group cursor-pointer fade-up"
              ref={(el) => addFadeRef(el, 3)}
              style={{ transitionDelay: "0.05s" }}
            >
              {/* Ambient overlay — teal */}
              <div
                className="ambient-overlay"
                style={{ background: "radial-gradient(ellipse at center, rgba(94,234,212,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src="/assets/scenario-dragon-ocean.png"
                  alt="Dragon & Ocean — Mythic Underwater"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="font-accent text-[10px] tracking-widest text-[#5EEAD4]">
                  MYTHIC EXPERIENCE
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  용의 바다 — 신화적 수중 세계
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  동양화의 용과 형광색 산호초가 공존하는 환상적 해저.
                  수묵화의 담대함과 생명력이 시스템 전체를 가득 씁니다.
                </p>
              </div>
            </div>

            {/* Scenario 4 — Gwanghwamun Night */}
            <div
              className="scenario-card scenario-card-gold group cursor-pointer fade-up"
              ref={(el) => addFadeRef(el, 4)}
              style={{ transitionDelay: "0.15s" }}
            >
              {/* Ambient overlay — warm lantern gold */}
              <div
                className="ambient-overlay"
                style={{ background: "radial-gradient(ellipse at center, rgba(251,191,36,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src="/assets/scenario-gwanghwamun.png"
                  alt="Gwanghwamun Night Festival"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="font-accent text-[10px] tracking-widest text-[#FCD34D]">
                  HERITAGE &amp; LIGHT
                </span>
                <h3 className="text-display text-2xl mt-3 mb-3 text-white">
                  광화문 나이트 페스티벌
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  조선의 역사적 유산이 빛과 영상으로 환생되는 순간.
                  전통 건축과 디지털 연출의 시낭적 융합.
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
