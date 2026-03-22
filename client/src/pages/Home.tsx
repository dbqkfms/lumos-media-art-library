/*
  Home Page v3 — Premium Media Art Brand
  - Hero: Fullscreen video loop + Framer Motion
  - Marquee: Infinite scrolling text
  - World Selection: Vertical Split 50/50, dark base, animated reveals
  - Case Studies: Dark cards with stagger animations
  - CTA Banner added
*/

import { useLocation } from "wouter";
import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import FloatingCTA from "@/components/FloatingCTA";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-[#e5e5e5] selection:bg-[#D4A843]/30">
      <Header />
      <FloatingCTA />

      {/* ─── Cinematic Noise Overlay (Global) ─── */}
      <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

      {/* ─── Hero Section — Fullscreen Video ─── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-black">
          <motion.video
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/ndeHuHogaaKeFNpu.mp4" type="video/mp4" />
          </motion.video>
          {/* Deep Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        </div>

        {/* Hero Content — bottom-left */}
        <div className="absolute bottom-0 left-0 w-full px-10 md:px-24 pb-20 md:pb-32 flex flex-col justify-end">
          <motion.div
            className="max-w-5xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#D4A843]/70" />
              <p className="font-accent text-[10px] md:text-xs tracking-[0.8em] text-[#D4A843] opacity-80 uppercase font-light">
                Premium LED Media Art
              </p>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-display text-[6rem] sm:text-[9rem] md:text-[11rem] lg:text-[14rem] leading-[0.75] mb-8 font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#7a7a7a] opacity-95">
              LUMOS
            </motion.h1>

            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mt-6">
              <p className="text-2xl md:text-5xl font-light text-[#e0e0e0] tracking-wide">
                Light, <span className="text-[#D4A843] font-display italic">Redefined.</span>
              </p>
              <div className="hidden md:block w-px h-16 bg-white/10" />
              <p className="text-sm md:text-base text-gray-400/80 max-w-lg leading-[2] font-light tracking-wide break-keep">
                설치 다음 날부터 바뀝니다. <br className="hidden md:block" />압도적인 몰입감, 공간의 품격을 완성하는 하이엔드 콘텐츠.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-accent text-[9px] tracking-[0.3em] text-gray-500 uppercase">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4A843] to-transparent overflow-hidden relative">
            <motion.div
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── Infinite Marquee (Ultra Premium) ─── */}
      <div className="py-6 bg-transparent border-y border-[#D4A843]/20 overflow-hidden relative flex items-center z-10 backdrop-blur-sm">
        <motion.div
          className="flex flex-nowrap whitespace-nowrap items-center"
          animate={{ x: [0, -1435] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center text-xs md:text-sm font-accent tracking-[0.4em] text-[#D4A843]/80 font-light">
              <span className="mx-10 whitespace-nowrap">GLOBAL STANDARD MEDIA ART</span>
              <span className="mx-10 opacity-30 text-[10px]">✦</span>
              <span className="mx-10 whitespace-nowrap">KOREAN COMMERCIAL ART</span>
              <span className="mx-10 opacity-30 text-[10px]">✦</span>
              <span className="mx-10 whitespace-nowrap">PREMIUM DISPLAY EXPERIENCE</span>
              <span className="mx-10 opacity-30 text-[10px]">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── World Selection — Vertical Split 50/50 ─── */}
      <section className="relative min-h-[100vh] flex flex-col md:flex-row bg-transparent">
        {/* STANDARD — Left 50% */}
        <div
          onClick={() => setLocation("/standard")}
          className="group relative flex-1 min-h-[50vh] md:min-h-[100vh] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/uqcXUFUnrsmScJQs.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/10 transition-all duration-[1s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent opacity-95" />
          </div>

          <div className="relative h-full flex flex-col justify-end items-center text-center p-10 md:p-20 pb-28 md:pb-32 group-hover:-translate-y-6 transition-transform duration-[0.8s] ease-out">
            <div className="max-w-lg">
              <p className="font-accent text-[9px] md:text-[10px] tracking-[0.6em] text-[#D4A843] mb-8 opacity-0 translate-y-4 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-[1s] ease-out delay-100">
                LUXURY GALLERY COLLECTION
              </p>
              <h2 className="text-display font-light text-[5rem] md:text-[8.5rem] leading-[0.8] mb-8 text-[#e0e0e0] group-hover:text-[#D4A843] transition-colors duration-[1s] tracking-tight mix-blend-screen space-y-2">
                STANDARD
              </h2>
              <div className="h-0 overflow-hidden group-hover:h-40 transition-all duration-[1s] ease-in-out">
                <p className="font-body text-[#909090] text-sm md:text-[0.9375rem] max-w-sm mb-12 break-keep">
                  미술관, 럭셔리 공간을 위한 글로벌 스탠다드 콘텐츠. <br className="hidden md:block" />보편적 아름다움으로 공간의 품격을 완성합니다.
                </p>
                <button className="btn-brutalist mt-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 translate-y-4 group-hover:translate-y-0 hover:bg-[#D4A843] hover:text-black">
                  EXPLORE STANDARD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Central Divider */}
        <div className="hidden md:block w-[1px] bg-gradient-to-b from-[#030305] via-white/5 to-[#030305] z-10" />

        {/* LOCAL — Right 50% */}
        <div
          onClick={() => setLocation("/local")}
          className="group relative flex-1 min-h-[50vh] md:min-h-[100vh] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105">
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/CnGsOfsCLSNXSijg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70 group-hover:bg-black/10 transition-all duration-[1s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent opacity-95" />
          </div>

          <div className="relative h-full flex flex-col justify-end items-center text-center p-10 md:p-20 pb-28 md:pb-32 group-hover:-translate-y-6 transition-transform duration-[0.8s] ease-out">
            <div className="max-w-lg">
              <p className="font-accent text-[9px] md:text-[10px] tracking-[0.6em] text-[#93C5FD] mb-8 opacity-0 translate-y-4 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-[1s] ease-out delay-100">
                KOREAN HERITAGE & NATURE
              </p>
              <h2 className="text-display font-light text-[5rem] md:text-[8.5rem] leading-[0.8] mb-8 text-[#e0e0e0] group-hover:text-[#93C5FD] transition-colors duration-[1s] tracking-tight mix-blend-screen space-y-2">
                LOCAL
              </h2>
              <div className="h-0 overflow-hidden group-hover:h-40 transition-all duration-[1s] ease-in-out">
                <p className="text-sm md:text-[0.9375rem] text-[#aaaaaa] leading-[2] max-w-sm mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] delay-300 font-light tracking-wide break-keep">
                  한국의 미와 자연을 담은 콘텐츠. 상업 및 일상 공간에
                  우리의 정서와 여유를 더합니다.
                </p>
                <button className="btn-brutalist-blue mt-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 translate-y-4 group-hover:translate-y-0 hover:bg-[#93C5FD] hover:text-black">
                  EXPLORE LOCAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Case Studies Section ─── */}
      <section className="relative py-32 md:py-48 px-6 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-24 flex flex-col xl:flex-row xl:items-end justify-between gap-12"
          >
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-white/10" />
                <p className="font-accent text-[9px] tracking-[0.6em] text-gray-500 uppercase font-light">
                  Proven Excellence
                </p>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-display font-light text-[4rem] md:text-[7rem] leading-[1] tracking-tight">
                공간의 철학을<br /><span className="text-[#D4A843] italic font-light">빛으로 구현하다</span>
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-[#aaaaaa] max-w-md text-base md:text-lg leading-[2] font-light tracking-wide xl:pb-4 break-keep">
              단순한 스크린을 넘어 공간의 아이덴티티를 완성합니다. LUMOS가 그려낸 프리미엄 레퍼런스.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Case 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-8 group relative overflow-hidden bg-transparent rounded-sm"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920" alt="호텔 로비" className="h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full">
                <span className="font-accent text-[9px] tracking-[0.4em] text-[#D4A843] block mb-5 uppercase opacity-80">Luxury Hotel</span>
                <h3 className="text-display font-light text-3xl md:text-5xl text-[#e0e0e0] group-hover:text-[#D4A843] transition-colors duration-[1s]">시그니엘 로비 파사드</h3>
              </div>
            </motion.div>

            {/* Case 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-4 group relative overflow-hidden bg-transparent rounded-sm"
            >
              <div className="relative aspect-[3/4] md:h-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1920" alt="갤러리" className="h-full w-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <span className="font-accent text-[9px] tracking-[0.4em] text-gray-500 block mb-5 uppercase opacity-80">Art Museum</span>
                <h3 className="text-display font-light text-3xl md:text-4xl text-[#e0e0e0] group-hover:text-white transition-colors duration-[1s]">현대미술관 미디어홀</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why LUMOS Section ─── */}
      <section className="relative py-32 md:py-40 px-6 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-20"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#D4A843]/40" />
              <p className="font-accent text-[9px] tracking-[0.6em] text-[#D4A843] uppercase">Why LUMOS</p>
              <div className="w-12 h-[1px] bg-[#D4A843]/40" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl text-[#e0e0e0] font-light tracking-tight">
              왜 LUMOS인가
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "◈", title: "큐레이션 품질", titleEn: "Curated Quality", desc: "AI로 만들었다는 사실보다, 어떤 공간에 어떤 작품이 맞는지 아는 것이 LUMOS의 핵심입니다." },
              { icon: "◇", title: "공간 최적화", titleEn: "Space-Optimized", desc: "호텔 로비부터 카페 카운터까지, 디스플레이 크기와 방향에 맞춘 콘텐츠를 제안합니다." },
              { icon: "◆", title: "프리미엄 서포트", titleEn: "Premium Support", desc: "문의에서 설치까지, 리사이징과 커스텀 편집을 포함한 엔드투엔드 서비스를 제공합니다." },
            ].map((item, i) => (
              <motion.div
                key={item.titleEn}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group bg-[#0f0f0f] border border-white/5 p-10 hover:border-[#D4A843]/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#D4A843]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="text-[#D4A843] text-3xl mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <div className="font-accent text-[9px] tracking-[0.5em] uppercase text-[#909090] mb-2">{item.titleEn}</div>
                  <h3 className="font-display text-2xl text-[#f5f5f5] mb-4">{item.title}</h3>
                  <p className="text-[#909090] text-sm leading-relaxed break-keep">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── For Spaces Section ─── */}
      <section className="relative py-32 md:py-40 px-6 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-white/10" />
              <p className="font-accent text-[9px] tracking-[0.6em] text-gray-500 uppercase">For Every Space</p>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-6xl text-[#e0e0e0] font-light tracking-tight mb-4">
              어떤 공간이든
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#909090] text-base max-w-xl break-keep">
              공간의 성격과 목적에 맞는 콘텐츠를 제안합니다. 어떤 공간이든 LUMOS가 빛으로 완성합니다.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "🏨", title: "Hotel & Resort", sub: "호텔 & 리조트", desc: "로비, 라운지, 복도에 프리미엄 미디어아트를" },
              { icon: "🖼", title: "Gallery & Museum", sub: "갤러리 & 뮤지엄", desc: "전시 공간에 어울리는 큐레이션 콘텐츠를" },
              { icon: "☕", title: "F&B", sub: "카페 & 레스토랑", desc: "공간 분위기에 녹아드는 앰비언트 아트를" },
              { icon: "🛍", title: "Retail", sub: "매장 & 쇼룸", desc: "파사드와 VMD에 동적 비주얼을" },
              { icon: "🏢", title: "Office", sub: "로비 & 미팅룸", desc: "기업 아이덴티티를 시각적으로" },
              { icon: "🏛", title: "Public", sub: "공공 & 전시", desc: "도시의 문화적 품격을 높이는 대형 미디어아트를" },
            ].map((space, i) => (
              <motion.div
                key={space.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setLocation("/solutions")}
                className="group bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-white/5 p-8 cursor-pointer hover:border-[#D4A843]/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4A843]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative z-10">
                  <div className="text-3xl mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">{space.icon}</div>
                  <h3 className="font-display text-xl text-[#f5f5f5] mb-1 group-hover:text-[#D4A843] transition-colors duration-500">{space.title}</h3>
                  <div className="font-accent text-[9px] tracking-[0.4em] uppercase text-[#909090] mb-3">{space.sub}</div>
                  <p className="text-[#666] text-sm break-keep">{space.desc}</p>
                  <div className="mt-4 font-accent text-[9px] tracking-[0.3em] uppercase text-[#D4A843] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Learn More →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="relative py-24 md:py-32 px-6 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl text-[#e0e0e0] font-light mb-6">
              공간의 품격을<br /><span className="text-[#D4A843] italic">빛으로 완성하세요</span>
            </h2>
            <p className="text-[#909090] text-sm md:text-base mb-10 break-keep">
              맞춤형 콘텐츠 제안부터 설치까지, LUMOS가 함께합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setLocation("/explore")}
                className="bg-[#D4A843] text-black font-accent text-[10px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#F0C060] transition-colors"
              >
                Explore Collection
              </button>
              <button
                onClick={() => setLocation("/contact")}
                className="border border-white/15 text-[#e0e0e0] font-accent text-[10px] tracking-[0.3em] uppercase px-10 py-4 hover:border-[#D4A843]/40 hover:text-[#D4A843] transition-all"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-24 px-10 md:px-20 bg-transparent border-t border-white/5 relative overflow-hidden">
        {/* Abstract Glow in Footer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-[#D4A843] opacity-[0.03] blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-screen-xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-16">
            <div>
              <img
                src="/assets/lumos-logo.png"
                alt="LUMOS"
                className="h-10 w-auto object-contain mb-8 opacity-90"
              />
              <p className="text-[0.8125rem] text-[#888888] font-light max-w-sm leading-[2] tracking-wide break-keep">
                공간을 예술로 치환하는 가장 완벽한 솔루션.<br />
                하이엔드 공간 콘텐츠 플랫폼, LUMOS.
              </p>
            </div>
            <div className="flex gap-16 md:gap-32">
              <div>
                <h4 className="font-accent text-[10px] tracking-[0.2em] text-[#D4A843] mb-8 uppercase">Collections</h4>
                <ul className="space-y-5 text-sm text-gray-400 font-light">
                  <li><a href="/standard" className="hover:text-white transition-colors">Standard World</a></li>
                  <li><a href="/local" className="hover:text-white transition-colors">Local World</a></li>
                  <li><a href="/explore" className="hover:text-white transition-colors">All Artworks</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-accent text-[10px] tracking-[0.2em] text-[#D4A843] mb-8 uppercase">Company</h4>
                <ul className="space-y-5 text-sm text-gray-400 font-light">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="https://www.thisglobal.kr/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ThisGlobal</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-light tracking-wide">
            <p>© 2026 THISGLOBAL. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
