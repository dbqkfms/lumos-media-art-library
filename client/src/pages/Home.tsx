/*
  Home Page v4 — Platform OTT Style
  Netflix/VIDO 스타일의 미디어아트 플랫폼 홈
  - Hero: Featured artwork with CTA
  - Content rows: 가로 스크롤 카드
  - Platform stats
  - Dual World showcase
  - For Creators CTA
*/

import { useRef } from "react";
import { useLocation, Link } from "wouter";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, type Artwork } from "@/data/standardArtworks";
import { localArtworks } from "@/data/localArtworks";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

/* ────────── 가로 스크롤 카드 Row ────────── */
function ContentRow({
  title,
  subtitle,
  artworks,
  accent = "gold",
  showAll,
}: {
  title: string;
  subtitle?: string;
  artworks: Artwork[];
  accent?: "gold" | "blue" | "white";
  showAll?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const accentColor =
    accent === "gold" ? "#D4A843" : accent === "blue" ? "#93C5FD" : "#e5e5e5";

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-8 md:py-12">
      {/* Row Header */}
      <div className="flex items-end justify-between px-6 md:px-12 lg:px-16 mb-6">
        <div>
          <h3
            className="font-display text-2xl md:text-3xl font-light tracking-tight"
            style={{ color: accentColor }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-[#909090] text-sm mt-1 font-light">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showAll && (
            <Link
              href={showAll}
              className="font-accent text-[9px] tracking-[0.3em] uppercase hover:text-white transition-colors"
              style={{ color: accentColor }}
            >
              View All →
            </Link>
          )}
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#909090] hover:text-white hover:border-white/30 transition-all"
          >
            ‹
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#909090] hover:text-white hover:border-white/30 transition-all"
          >
            ›
          </button>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-6 md:px-12 lg:px-16 pb-4 scroll-smooth hide-scrollbar"
      >
        {artworks.map((art) => (
          <div
            key={art.id}
            onClick={() => setLocation(`/artwork/${art.id}`)}
            className="group flex-shrink-0 w-[260px] md:w-[300px] cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[#1a1a1a] mb-3 gilded-glow">
              <img
                src={art.image}
                alt={art.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 font-accent text-[9px] tracking-wider text-[#e5e5e5]">
                {art.runtime.includes("s")
                  ? art.runtime.replace(" seconds loop", "s")
                  : `${art.runtime}s`}
              </div>

              {/* Display type badge */}
              <div className="absolute top-2 right-2 bg-black/50 px-1.5 py-0.5 font-accent text-[8px] tracking-wider text-white/70">
                {art.displayType === "Horizontal" ? "H" : "V"}
              </div>

              {/* World badge */}
              <div
                className="absolute top-2 left-2 px-2 py-0.5 font-accent text-[8px] tracking-[0.2em] uppercase"
                style={{
                  backgroundColor:
                    art.id.startsWith("standard") ? "#D4A843" : "#93C5FD",
                  color: "#000",
                }}
              >
                {art.id.startsWith("standard") ? "STANDARD" : "LOCAL"}
              </div>

              {/* Play icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-black/20">
                  <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent ml-1" />
                </div>
              </div>
            </div>

            {/* Info */}
            <h4 className="text-sm font-medium text-[#e5e5e5] group-hover:text-white transition-colors truncate">
              {art.title}
            </h4>
            <p className="font-accent text-[9px] tracking-[0.2em] uppercase text-[#666] mt-1">
              {art.category}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────── 메인 컴포넌트 ────────── */
export default function Home() {
  const [, setLocation] = useLocation();

  // 작품 분류
  const allArtworks = [...standardArtworks, ...localArtworks];
  const standardItems = standardArtworks.slice(0, 10);
  const localItems = localArtworks.slice(0, 10);

  // 카테고리별 그룹
  const orientalArtworks = allArtworks.filter(
    (a) =>
      a.category === "Oriental" || a.category === "Traditional"
  );
  const cosmicAbstract = allArtworks.filter(
    (a) =>
      a.category === "Abstract" ||
      a.category === "Cosmic" ||
      a.category === "Light"
  );
  const natureArtworks = allArtworks.filter(
    (a) =>
      a.category === "Nature" || a.category === "Seasonal"
  );

  // Featured artwork (첫 번째 STANDARD 작품)
  const featured = standardArtworks[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] selection:bg-[#D4A843]/30">
      <Header />
      <FloatingCTA />

      {/* Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

      {/* ─── Hero: Featured Artwork ─── */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <motion.video
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2, ease: "easeOut" }}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/ndeHuHogaaKeFNpu.mp4"
              type="video/mp4"
            />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-16 pb-24 md:pb-32">
          <motion.div
            className="max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Featured badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="bg-[#D4A843] px-3 py-1 font-accent text-[9px] tracking-[0.3em] uppercase text-black font-bold">
                Featured
              </div>
              <span className="font-accent text-[9px] tracking-[0.3em] uppercase text-[#D4A843]/80">
                LUMOS Original
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white mb-4"
            >
              {featured?.title || "LUMOS"}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[#b0b0b0] text-base md:text-lg max-w-xl leading-relaxed mb-8 font-light break-keep"
            >
              {featured?.description ||
                "큐레이션 미디어아트 콘텐츠 라이브러리. 공간의 품격을 빛으로 완성합니다."}
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-4">
              <button
                onClick={() =>
                  setLocation(`/artwork/${featured?.id || "standard-sansu"}`)
                }
                className="bg-white text-black font-accent text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 hover:bg-[#e0e0e0] transition-colors flex items-center gap-3"
              >
                <span className="w-0 h-0 border-l-[8px] border-l-black border-y-[5px] border-y-transparent" />
                Watch Preview
              </button>
              <button
                onClick={() => setLocation("/contact")}
                className="border border-white/20 text-white font-accent text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                License This
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Platform Stats Bar ─── */}
      <div className="border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-10 md:gap-16">
            {[
              { num: allArtworks.length.toString(), label: "Artworks" },
              { num: "8+", label: "Artists" },
              { num: "15", label: "Space Types" },
              { num: "2", label: "Worlds" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-display text-[#D4A843] font-light">
                  {s.num}
                </div>
                <div className="font-accent text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[#666] mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/explore"
            className="hidden md:flex items-center gap-2 font-accent text-[10px] tracking-[0.3em] uppercase text-[#D4A843] hover:text-[#F0C060] transition-colors"
          >
            Browse Library →
          </Link>
        </div>
      </div>

      {/* ─── Content Rows ─── */}

      {/* LUMOS Originals — STANDARD */}
      <ContentRow
        title="LUMOS Originals — STANDARD"
        subtitle="미술관, 갤러리, 럭셔리 공간을 위한 글로벌 스탠다드"
        artworks={standardItems}
        accent="gold"
        showAll="/standard"
      />

      {/* Divider */}
      <div className="mx-6 md:mx-16 border-t border-white/5" />

      {/* LUMOS Originals — LOCAL */}
      <ContentRow
        title="LUMOS Originals — LOCAL"
        subtitle="한국의 미와 자연을 담은 상업 공간 콘텐츠"
        artworks={localItems}
        accent="blue"
        showAll="/local"
      />

      <div className="mx-6 md:mx-16 border-t border-white/5" />

      {/* Korean Heritage */}
      {orientalArtworks.length > 0 && (
        <ContentRow
          title="Korean Heritage"
          subtitle="동양 전통미의 디지털 재해석"
          artworks={orientalArtworks.slice(0, 10)}
          accent="gold"
          showAll="/explore"
        />
      )}

      <div className="mx-6 md:mx-16 border-t border-white/5" />

      {/* Abstract & Cosmic */}
      {cosmicAbstract.length > 0 && (
        <ContentRow
          title="Abstract & Cosmic"
          subtitle="우주적 스케일의 추상 미디어아트"
          artworks={cosmicAbstract.slice(0, 10)}
          accent="white"
          showAll="/explore"
        />
      )}

      <div className="mx-6 md:mx-16 border-t border-white/5" />

      {/* Nature & Seasonal */}
      {natureArtworks.length > 0 && (
        <ContentRow
          title="Nature & Seasonal"
          subtitle="자연과 계절의 감각"
          artworks={natureArtworks.slice(0, 10)}
          accent="blue"
          showAll="/explore"
        />
      )}

      {/* ─── Dual World Showcase ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-screen-xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-accent text-[9px] tracking-[0.6em] text-[#D4A843] uppercase mb-4">
              One Brand, Two Worlds
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight">
              공간에 맞는 콘텐츠를 선택하세요
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STANDARD */}
            <motion.div
              variants={fadeUp}
              onClick={() => setLocation("/standard")}
              className="group relative aspect-[16/9] overflow-hidden cursor-pointer border border-white/5 hover:border-[#D4A843]/30 transition-all duration-700"
            >
              <img
                src={standardArtworks[2]?.image || standardArtworks[0]?.image}
                alt="STANDARD"
                className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="bg-[#D4A843] px-3 py-1 font-accent text-[9px] tracking-[0.2em] text-black uppercase inline-block mb-4">
                  STANDARD
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-[#D4A843] transition-colors duration-700">
                  공간 지배형 프리미엄
                </h3>
                <p className="text-[#909090] text-sm mt-3 max-w-sm font-light break-keep">
                  미술관, 럭셔리 호텔, 하이엔드 공간을 위한
                  글로벌 스탠다드 콘텐츠
                </p>
                <span className="inline-block mt-5 font-accent text-[9px] tracking-[0.3em] uppercase text-[#D4A843] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore Standard →
                </span>
              </div>
            </motion.div>

            {/* LOCAL */}
            <motion.div
              variants={fadeUp}
              onClick={() => setLocation("/local")}
              className="group relative aspect-[16/9] overflow-hidden cursor-pointer border border-white/5 hover:border-[#93C5FD]/30 transition-all duration-700"
            >
              <img
                src={localArtworks[2]?.image || localArtworks[0]?.image}
                alt="LOCAL"
                className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <div className="bg-[#93C5FD] px-3 py-1 font-accent text-[9px] tracking-[0.2em] text-black uppercase inline-block mb-4">
                  LOCAL
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-[#93C5FD] transition-colors duration-700">
                  공간 조화형 상업
                </h3>
                <p className="text-[#909090] text-sm mt-3 max-w-sm font-light break-keep">
                  카페, 레스토랑, 오피스를 위한
                  한국적 정서와 자연 콘텐츠
                </p>
                <span className="inline-block mt-5 font-accent text-[9px] tracking-[0.3em] uppercase text-[#93C5FD] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore Local →
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── For Spaces ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/10" />
              <p className="font-accent text-[9px] tracking-[0.6em] text-gray-500 uppercase">
                For Every Space
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl text-[#e0e0e0] font-light tracking-tight mb-12"
            >
              어떤 공간이든
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Hotel", sub: "호텔 · 리조트", icon: "◈" },
              { title: "Gallery", sub: "갤러리 · 뮤지엄", icon: "◇" },
              { title: "F&B", sub: "카페 · 레스토랑", icon: "◆" },
              { title: "Retail", sub: "매장 · 쇼룸", icon: "▣" },
              { title: "Office", sub: "로비 · 미팅룸", icon: "▧" },
              { title: "Public", sub: "공공 · 전시", icon: "▤" },
            ].map((space, i) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLocation("/solutions")}
                className="group bg-[#111] border border-white/5 p-6 cursor-pointer hover:border-[#D4A843]/20 transition-all duration-500"
              >
                <div className="text-[#D4A843] text-2xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {space.icon}
                </div>
                <h4 className="font-accent text-[10px] tracking-[0.3em] uppercase text-[#e0e0e0] group-hover:text-[#D4A843] transition-colors mb-1">
                  {space.title}
                </h4>
                <p className="text-[#666] text-xs">{space.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For Creators CTA ─── */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-accent text-[9px] tracking-[0.6em] text-[#D4A843] uppercase mb-4">
              For Artists & Creators
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-[#e0e0e0] font-light mb-6 tracking-tight">
              당신의 미디어아트를<br />
              <span className="text-[#D4A843] italic">세상의 공간에 보여주세요</span>
            </h2>
            <p className="text-[#909090] text-sm md:text-base mb-10 max-w-lg mx-auto break-keep font-light leading-relaxed">
              LUMOS 플랫폼에 작품을 등록하고, 전 세계 공간 운영자들에게
              라이선싱하세요. 검증 후 바로 시작할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setLocation("/artists")}
                className="bg-[#D4A843] text-black font-accent text-[10px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#F0C060] transition-colors"
              >
                Start as Creator
              </button>
              <button
                onClick={() => setLocation("/contact")}
                className="border border-white/15 text-[#e0e0e0] font-accent text-[10px] tracking-[0.3em] uppercase px-10 py-4 hover:border-[#D4A843]/40 hover:text-[#D4A843] transition-all"
              >
                Partner With Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-20 px-6 md:px-12 lg:px-16 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[300px] bg-[#D4A843] opacity-[0.02] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-12">
            <div>
              <img
                src="/assets/lumos-logo.png"
                alt="LUMOS"
                className="h-10 w-auto object-contain mb-6 opacity-90"
              />
              <p className="text-[0.8125rem] text-[#666] font-light max-w-xs leading-relaxed break-keep">
                Screen-native AI media art library & platform.
                <br />
                공간의 품격을 빛으로 완성합니다.
              </p>
            </div>
            <div className="flex gap-16 md:gap-24">
              <div>
                <h4 className="font-accent text-[10px] tracking-[0.2em] text-[#D4A843] mb-6 uppercase">
                  Platform
                </h4>
                <ul className="space-y-3 text-sm text-gray-500 font-light">
                  <li>
                    <Link href="/explore" className="hover:text-white transition-colors">
                      Library
                    </Link>
                  </li>
                  <li>
                    <Link href="/standard" className="hover:text-white transition-colors">
                      Standard World
                    </Link>
                  </li>
                  <li>
                    <Link href="/local" className="hover:text-white transition-colors">
                      Local World
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions" className="hover:text-white transition-colors">
                      For Spaces
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-accent text-[10px] tracking-[0.2em] text-[#D4A843] mb-6 uppercase">
                  Company
                </h4>
                <ul className="space-y-3 text-sm text-gray-500 font-light">
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/artists" className="hover:text-white transition-colors">
                      For Artists
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.thisglobal.kr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      ThisGlobal
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 font-light tracking-wide">
            <p>© 2026 THISGLOBAL. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* hide-scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .gilded-glow:hover { box-shadow: 0 0 12px 3px rgba(212, 168, 67, 0.15); }
      `}</style>
    </div>
  );
}
