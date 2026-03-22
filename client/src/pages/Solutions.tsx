// Solutions — 솔루션 랜딩 페이지
import React from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import {
  Hotel,
  Store,
  UtensilsCrossed,
  Building2,
  Landmark,
  MessageSquare,
} from "lucide-react";

const SOLUTIONS = [
  {
    id: "hospitality",
    title: "Hospitality",
    subtitle: "호텔 & 리조트",
    description:
      "로비, 라운지, 복도, 컨퍼런스룸에 프리미엄 미디어아트를 설치하여 투숙객에게 잊을 수 없는 첫인상을 남기세요.",
    icon: Hotel,
    cta: "Learn More",
  },
  {
    id: "retail",
    title: "Retail",
    subtitle: "매장 & 쇼룸",
    description:
      "매장 파사드, 쇼윈도, VMD에 동적 비주얼을 더해 브랜드 경험을 한 단계 끌어올리세요.",
    icon: Store,
    cta: "Learn More",
  },
  {
    id: "fnb",
    title: "F&B",
    subtitle: "카페, 레스토랑, 바",
    description:
      "공간의 분위기에 자연스럽게 녹아드는 앰비언트 미디어아트로 방문객의 체류 시간과 만족도를 높이세요.",
    icon: UtensilsCrossed,
    cta: "Learn More",
  },
  {
    id: "office",
    title: "Office",
    subtitle: "로비 & 미팅룸",
    description:
      "로비와 미팅룸에 세련된 디지털 아트를 설치하여 기업의 아이덴티티와 문화를 시각적으로 표현하세요.",
    icon: Building2,
    cta: "Learn More",
  },
  {
    id: "public",
    title: "Public / Exhibition",
    subtitle: "미술관, 갤러리, 공항",
    description:
      "공항, 지하철, 병원, 문화센터 등 공공 공간에 대형 미디어아트를 설치하여 도시의 문화적 품격을 높이세요.",
    icon: Landmark,
    cta: "Learn More",
  },
  {
    id: "custom",
    title: "Custom",
    subtitle: "맞춤 솔루션",
    description:
      "위 카테고리에 해당하지 않는 특수한 공간이나 프로젝트가 있으신가요? 맞춤형 미디어아트 솔루션을 제안드립니다.",
    icon: MessageSquare,
    cta: "Inquire",
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <div className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        {/* 히어로 */}
        <div className="mb-16 max-w-2xl">
          <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#D4A843] mb-3">
            Solutions
          </div>
          <h1 className="font-display text-4xl text-[#f5f5f5] mb-4">
            공간을 위한 솔루션
          </h1>
          <p className="text-[#909090] text-sm leading-relaxed">
            LED/디지털 디스플레이가 설치된 공간에 최적의 미디어아트 콘텐츠를
            제안합니다. 공간의 성격과 목적에 맞춘 큐레이션으로 방문자 경험을
            극대화하세요.
          </p>
        </div>

        {/* 6카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map(sol => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.id}
                className="border border-white/5 hover:border-white/15 transition-colors p-8 group flex flex-col"
              >
                <div className="mb-4">
                  <Icon
                    className="w-8 h-8 text-[#D4A843] opacity-70 group-hover:opacity-100 transition-opacity"
                    strokeWidth={1.5}
                  />
                </div>
                <h2 className="font-display text-xl text-[#f5f5f5] mb-1">
                  {sol.title}
                </h2>
                <span className="font-accent text-[9px] tracking-[0.4em] uppercase text-[#909090] mb-3">
                  {sol.subtitle}
                </span>
                <p className="text-[#909090] text-sm leading-relaxed mb-6 flex-1">
                  {sol.description}
                </p>
                <Link to="/contact">
                  <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-[#D4A843] hover:text-[#F0C060] cursor-pointer transition-colors">
                    {sol.cta} →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 border border-white/5 p-12 text-center">
          <h2 className="font-display text-2xl text-[#f5f5f5] mb-4">
            프로젝트가 있으신가요?
          </h2>
          <p className="text-[#909090] text-sm mb-6 max-w-lg mx-auto">
            공간에 맞는 미디어아트 콘텐츠를 찾고 계신다면 문의를 남겨주세요.
            맞춤형 제안을 드리겠습니다.
          </p>
          <Link to="/contact">
            <span className="inline-block bg-[#D4A843] text-black font-accent text-[10px] tracking-[0.3em] uppercase px-10 py-3 hover:bg-[#F0C060] transition-colors cursor-pointer">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
