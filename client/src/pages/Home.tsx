/*
  Home Page v5 — Platform OTT + Dual World 분리 강화
  - 모든 버튼/링크 활성화
  - STANDARD / LOCAL 섹션 명확 분리
  - 히어로 재구성
  - Netflix 스크롤 Row 유지
*/

import { useRef, useState } from "react";
import { useLocation, Link } from "wouter";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";
import { standardArtworks, type Artwork } from "@/data/standardArtworks";
import { localArtworks } from "@/data/localArtworks";

/* ────────── 애니메이션 ────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ────────── ContentRow 컴포넌트 ────────── */
function ContentRow({
  title, subtitle, artworks, accent = "gold", showAll, world,
}: {
  title: string;
  subtitle?: string;
  artworks: Artwork[];
  accent?: "gold" | "blue" | "white";
  showAll?: string;
  world?: "standard" | "local";
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [, nav] = useLocation();
  const color = accent === "gold" ? "#D4A843" : accent === "blue" ? "#93C5FD" : "#e5e5e5";

  const scroll = (d: "l" | "r") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: d === "l" ? -600 : 600, behavior: "smooth" });
  };

  if (artworks.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="flex items-end justify-between px-6 md:px-12 lg:px-16 mb-5">
        <div className="flex items-center gap-4">
          {world && (
            <span
              className="font-accent text-[8px] tracking-[0.15em] uppercase px-2.5 py-1"
              style={{ backgroundColor: color, color: "#000" }}
            >
              {world}
            </span>
          )}
          <div>
            <h3 className="font-display text-xl md:text-2xl font-light" style={{ color }}>
              {title}
            </h3>
            {subtitle && <p className="text-[#707070] text-xs mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showAll && (
            <Link href={showAll} className="font-accent text-[9px] tracking-[0.2em] uppercase hover:text-white transition-colors mr-2" style={{ color }}>
              View All →
            </Link>
          )}
          <button onClick={() => scroll("l")} className="w-7 h-7 border border-white/10 flex items-center justify-center text-[#666] hover:text-white hover:border-white/30 transition-all text-sm">‹</button>
          <button onClick={() => scroll("r")} className="w-7 h-7 border border-white/10 flex items-center justify-center text-[#666] hover:text-white hover:border-white/30 transition-all text-sm">›</button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-3.5 overflow-x-auto px-6 md:px-12 lg:px-16 pb-3 scroll-smooth hide-scrollbar">
        {artworks.map((art) => (
          <div key={art.id} onClick={() => nav(`/artwork/${art.id}`)} className="group flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer">
            <div className="relative aspect-video overflow-hidden bg-[#151515] mb-2 gilded-glow">
              <img src={art.image} alt={art.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
              {/* 배지들 */}
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 font-accent text-[7px] tracking-[0.15em] uppercase" style={{ backgroundColor: art.id.startsWith("standard") ? "#D4A843" : "#93C5FD", color: "#000" }}>
                {art.id.startsWith("standard") ? "STD" : "LCL"}
              </span>
              <span className="absolute top-1.5 right-1.5 bg-black/60 px-1.5 py-0.5 font-accent text-[8px] text-white/60">
                {art.displayType === "Horizontal" ? "H" : "V"}
              </span>
              <span className="absolute bottom-1.5 right-1.5 bg-black/70 px-2 py-0.5 font-accent text-[8px] text-white/80">
                {art.runtime.replace(" seconds loop", "s").replace(/^(\d+)$/, "$1s")}
              </span>
              {/* 재생 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 border border-white/70 flex items-center justify-center backdrop-blur-sm bg-black/30">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[5px] border-y-transparent ml-0.5" />
                </div>
              </div>
            </div>
            <h4 className="text-xs font-medium text-[#d0d0d0] group-hover:text-white transition-colors truncate">{art.title}</h4>
            <p className="font-accent text-[8px] tracking-[0.15em] uppercase text-[#555] mt-0.5">{art.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────── SpaceCard ────────── */
function SpaceCard({ title, sub, icon, delay }: { title: string; sub: string; icon: string; delay: number }) {
  const [, nav] = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => nav("/solutions")}
      className="group bg-[#111] border border-white/5 p-5 cursor-pointer hover:border-[#D4A843]/20 transition-all duration-500"
    >
      <div className="text-[#D4A843] text-xl mb-3 opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
      <h4 className="font-accent text-[9px] tracking-[0.2em] uppercase text-[#d0d0d0] group-hover:text-[#D4A843] transition-colors">{title}</h4>
      <p className="text-[#555] text-[11px] mt-1">{sub}</p>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════ */
/* ──────────────── MAIN COMPONENT ──────────────────────── */
/* ════════════════════════════════════════════════════════ */
export default function Home() {
  const [, nav] = useLocation();
  const [heroWorld, setHeroWorld] = useState<"standard" | "local">("standard");

  const all = [...standardArtworks, ...localArtworks];
  const std = standardArtworks.slice(0, 12);
  const lcl = localArtworks.slice(0, 12);
  const oriental = all.filter(a => a.category === "Oriental" || a.category === "Traditional");
  const cosmic = all.filter(a => ["Abstract", "Cosmic", "Light"].includes(a.category));
  const nature = all.filter(a => ["Nature", "Seasonal", "Ambient"].includes(a.category));

  const featured = heroWorld === "standard" ? standardArtworks[0] : localArtworks[0];
  const heroAccent = heroWorld === "standard" ? "#D4A843" : "#93C5FD";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] selection:bg-[#D4A843]/30">
      <Header />
      <FloatingCTA />

      {/* 노이즈 */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.025] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <motion.video
            key={heroWorld}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            autoPlay loop muted playsInline
            className="h-full w-full object-cover"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/ndeHuHogaaKeFNpu.mp4" type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </div>

        {/* 히어로 콘텐츠 */}
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
          <motion.div className="max-w-2xl" variants={stagger} initial="hidden" animate="visible">
            {/* World 토글 */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <button
                onClick={() => setHeroWorld("standard")}
                className={`font-accent text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all duration-300 ${
                  heroWorld === "standard"
                    ? "bg-[#D4A843] text-black border-[#D4A843]"
                    : "bg-transparent text-[#D4A843]/60 border-[#D4A843]/30 hover:border-[#D4A843]/60"
                }`}
              >
                STANDARD
              </button>
              <button
                onClick={() => setHeroWorld("local")}
                className={`font-accent text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-all duration-300 ${
                  heroWorld === "local"
                    ? "bg-[#93C5FD] text-black border-[#93C5FD]"
                    : "bg-transparent text-[#93C5FD]/60 border-[#93C5FD]/30 hover:border-[#93C5FD]/60"
                }`}
              >
                LOCAL
              </button>
              <div className="w-px h-5 bg-white/10 mx-1" />
              <span className="font-accent text-[8px] tracking-[0.3em] uppercase text-white/40">
                LUMOS Original
              </span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={featured?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-3">
                  {featured?.title}
                </h1>
                <p className="text-[#999] text-sm md:text-base max-w-md leading-relaxed mb-6 font-light break-keep">
                  {featured?.description?.slice(0, 80)}...
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <button
                onClick={() => nav(`/artwork/${featured?.id}`)}
                className="bg-white text-black font-accent text-[10px] tracking-[0.2em] uppercase px-7 py-3 hover:bg-[#e0e0e0] transition-colors flex items-center gap-2"
              >
                <span className="w-0 h-0 border-l-[7px] border-l-black border-y-[4px] border-y-transparent" />
                Watch Preview
              </button>
              <button
                onClick={() => nav(heroWorld === "standard" ? "/standard" : "/local")}
                className="border text-white font-accent text-[10px] tracking-[0.2em] uppercase px-7 py-3 transition-all backdrop-blur-sm"
                style={{ borderColor: `${heroAccent}40`, color: heroAccent }}
              >
                Explore {heroWorld === "standard" ? "Standard" : "Local"}
              </button>
              <button
                onClick={() => nav("/contact")}
                className="border border-white/15 text-white/70 font-accent text-[10px] tracking-[0.2em] uppercase px-7 py-3 hover:text-white hover:border-white/30 transition-all"
              >
                Get Licensing Info
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <div className="border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-8 md:gap-14">
            {[
              { n: all.length, l: "Artworks" },
              { n: standardArtworks.length, l: "Standard", c: "#D4A843" },
              { n: localArtworks.length, l: "Local", c: "#93C5FD" },
              { n: "6", l: "Space Types" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-lg md:text-xl font-display font-light" style={{ color: s.c || "#D4A843" }}>{s.n}</div>
                <div className="font-accent text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-[#555] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <Link href="/explore" className="hidden md:flex items-center gap-1 font-accent text-[9px] tracking-[0.2em] uppercase text-[#D4A843] hover:text-[#F0C060] transition-colors">
            Browse Full Library →
          </Link>
        </div>
      </div>

      {/* ═══════ STANDARD 섹션 ═══════ */}
      <div className="pt-6 pb-2">
        <div className="px-6 md:px-12 lg:px-16 mb-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[#D4A843]/40" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#D4A843]">STANDARD World</h2>
          </div>
          <p className="text-[#707070] text-sm mt-2 ml-14 max-w-lg break-keep">
            갤러리, 미술관, 럭셔리 호텔 — 공간을 지배하는 프리미엄 미디어아트
          </p>
        </div>
        <ContentRow title="All Standard" artworks={std} accent="gold" showAll="/standard" world="standard" />
        {oriental.length > 0 && <ContentRow title="Korean Heritage" subtitle="동양 전통미의 디지털 재해석" artworks={oriental.filter(a => a.id.startsWith("standard")).slice(0, 10)} accent="gold" showAll="/standard" />}
        {cosmic.length > 0 && <ContentRow title="Abstract & Cosmic" subtitle="우주적 스케일의 추상" artworks={cosmic.slice(0, 10)} accent="white" showAll="/explore" />}
        <div className="px-6 md:px-12 lg:px-16 py-4">
          <button onClick={() => nav("/standard")} className="bg-[#D4A843] text-black font-accent text-[9px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#F0C060] transition-colors">
            Explore All Standard →
          </button>
        </div>
      </div>

      {/* 세파레이터 */}
      <div className="relative py-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="flex justify-center">
          <div className="bg-[#0a0a0a] px-6 relative z-10 flex items-center gap-3">
            <span className="w-2 h-2 bg-[#D4A843]" />
            <span className="font-accent text-[8px] tracking-[0.3em] uppercase text-[#555]">One Brand · Two Worlds</span>
            <span className="w-2 h-2 bg-[#93C5FD]" />
          </div>
        </div>
      </div>

      {/* ═══════ LOCAL 섹션 ═══════ */}
      <div className="pt-2 pb-6">
        <div className="px-6 md:px-12 lg:px-16 mb-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-[#93C5FD]/40" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#93C5FD]">LOCAL World</h2>
          </div>
          <p className="text-[#707070] text-sm mt-2 ml-14 max-w-lg break-keep">
            카페, 레스토랑, 오피스 — 한국의 미와 자연이 공간에 녹아드는 상업 콘텐츠
          </p>
        </div>
        <ContentRow title="All Local" artworks={lcl} accent="blue" showAll="/local" world="local" />
        {nature.length > 0 && <ContentRow title="Nature & Seasonal" subtitle="자연과 계절의 감각" artworks={nature.slice(0, 10)} accent="blue" showAll="/local" />}
        {oriental.filter(a => a.id.startsWith("local")).length > 0 && (
          <ContentRow title="Korean Traditional" subtitle="전통 소재의 현대적 재해석" artworks={oriental.filter(a => a.id.startsWith("local")).slice(0, 10)} accent="blue" showAll="/local" />
        )}
        <div className="px-6 md:px-12 lg:px-16 py-4">
          <button onClick={() => nav("/local")} className="bg-[#93C5FD] text-black font-accent text-[9px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#BFDBFE] transition-colors">
            Explore All Local →
          </button>
        </div>
      </div>

      {/* ═══════ Dual World 비교 카드 ═══════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="font-accent text-[9px] tracking-[0.5em] text-[#D4A843] uppercase mb-3">Which World Fits Your Space?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-5xl font-light">공간에 맞는 세계를 선택하세요</motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* STANDARD 카드 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              onClick={() => nav("/standard")}
              className="group relative overflow-hidden cursor-pointer border border-[#D4A843]/10 hover:border-[#D4A843]/40 transition-all duration-700"
            >
              <div className="aspect-[16/9] relative">
                <img src={standardArtworks[2]?.image || standardArtworks[0]?.image} alt="STANDARD" className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-50 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <div className="bg-[#D4A843] px-2.5 py-1 font-accent text-[8px] tracking-[0.15em] text-black uppercase inline-block mb-3">STANDARD</div>
                <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-[#D4A843] transition-colors duration-500">공간 지배형 프리미엄</h3>
                <p className="text-[#808080] text-sm mt-2 max-w-sm break-keep">미술관, 럭셔리 호텔, 하이엔드 공간</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-accent text-[9px] tracking-[0.2em] uppercase text-[#D4A843]">Explore →</span>
                  <span className="text-[#555] text-xs">{standardArtworks.length} artworks</span>
                </div>
              </div>
            </motion.div>

            {/* LOCAL 카드 */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => nav("/local")}
              className="group relative overflow-hidden cursor-pointer border border-[#93C5FD]/10 hover:border-[#93C5FD]/40 transition-all duration-700"
            >
              <div className="aspect-[16/9] relative">
                <img src={localArtworks[2]?.image || localArtworks[0]?.image} alt="LOCAL" className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-50 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <div className="bg-[#93C5FD] px-2.5 py-1 font-accent text-[8px] tracking-[0.15em] text-black uppercase inline-block mb-3">LOCAL</div>
                <h3 className="font-display text-2xl md:text-3xl text-white group-hover:text-[#93C5FD] transition-colors duration-500">공간 조화형 상업</h3>
                <p className="text-[#808080] text-sm mt-2 max-w-sm break-keep">카페, 레스토랑, 오피스, 리테일</p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-accent text-[9px] tracking-[0.2em] uppercase text-[#93C5FD]">Explore →</span>
                  <span className="text-[#555] text-xs">{localArtworks.length} artworks</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ FOR SPACES ═══════ */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[1px] bg-white/10" />
            <div>
              <p className="font-accent text-[8px] tracking-[0.4em] text-[#555] uppercase">For Every Space</p>
              <h2 className="font-display text-2xl md:text-3xl text-[#e0e0e0] font-light mt-1">어떤 공간이든</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <SpaceCard title="Hotel" sub="호텔 · 리조트" icon="◈" delay={0} />
            <SpaceCard title="Gallery" sub="갤러리 · 뮤지엄" icon="◇" delay={0.06} />
            <SpaceCard title="F&B" sub="카페 · 레스토랑" icon="◆" delay={0.12} />
            <SpaceCard title="Retail" sub="매장 · 쇼룸" icon="▣" delay={0.18} />
            <SpaceCard title="Office" sub="로비 · 미팅룸" icon="▧" delay={0.24} />
            <SpaceCard title="Public" sub="공공 · 전시" icon="▤" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ═══════ FOR CREATORS ═══════ */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#0e0e0e]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-accent text-[9px] tracking-[0.5em] text-[#D4A843] uppercase mb-3">For Artists & Creators</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#e0e0e0] font-light mb-5">
              당신의 미디어아트를<br /><span className="text-[#D4A843] italic">세상의 공간에 보여주세요</span>
            </h2>
            <p className="text-[#808080] text-sm mb-8 max-w-md mx-auto break-keep leading-relaxed">
              LUMOS 플랫폼에 작품을 등록하고, 전 세계 공간 운영자들에게 라이선싱하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => nav("/auth/signin")} className="bg-[#D4A843] text-black font-accent text-[9px] tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#F0C060] transition-colors">
                Start as Creator
              </button>
              <button onClick={() => nav("/contact")} className="border border-white/15 text-[#d0d0d0] font-accent text-[9px] tracking-[0.2em] uppercase px-8 py-3 hover:border-[#D4A843]/30 hover:text-[#D4A843] transition-all">
                Partnership Inquiry
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="py-16 px-6 md:px-12 lg:px-16 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-10">
            <div>
              <img src="/assets/lumos-logo.png" alt="LUMOS" className="h-8 w-auto object-contain mb-4 opacity-80" />
              <p className="text-[12px] text-[#555] max-w-xs leading-relaxed break-keep">
                Screen-native AI media art library & platform.<br />공간의 품격을 빛으로 완성합니다.
              </p>
            </div>
            <div className="flex gap-14 md:gap-20">
              <div>
                <h4 className="font-accent text-[9px] tracking-[0.15em] text-[#D4A843] mb-4 uppercase">Platform</h4>
                <ul className="space-y-2.5 text-[13px] text-[#555]">
                  <li><Link href="/explore" className="hover:text-white transition-colors">Library</Link></li>
                  <li><Link href="/standard" className="hover:text-white transition-colors">Standard</Link></li>
                  <li><Link href="/local" className="hover:text-white transition-colors">Local</Link></li>
                  <li><Link href="/solutions" className="hover:text-white transition-colors">For Spaces</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-accent text-[9px] tracking-[0.15em] text-[#D4A843] mb-4 uppercase">Company</h4>
                <ul className="space-y-2.5 text-[13px] text-[#555]">
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/artists" className="hover:text-white transition-colors">For Artists</Link></li>
                  <li><a href="https://www.thisglobal.kr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ThisGlobal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#444]">
            <p>© 2026 THISGLOBAL. All rights reserved.</p>
            <div className="flex gap-6 mt-3 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar{display:none}
        .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
        .gilded-glow:hover{box-shadow:0 0 10px 2px rgba(212,168,67,0.12)}
      `}</style>
    </div>
  );
}
