import { motion } from "framer-motion";
import Header from "@/components/Header";
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050508]">
            <Header />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-32 px-6 md:px-12 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#050508] z-0" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay z-0 pointer-events-none" />

                <div className="relative z-10 text-center max-w-4xl mx-auto mt-10">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="font-accent text-[10px] tracking-[0.5em] text-[#D4A843] mb-8 drop-shadow-md"
                    >
                        ABOUT LUMOS
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="text-display font-light text-[3rem] md:text-[5rem] leading-tight text-white/95 mb-10 tracking-tight text-shadow-strong"
                    >
                        빛으로 공간의 <br className="hidden md:block" />정체성을 완성하다
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="font-body text-[0.9375rem] md:text-[1rem] text-[#b0b0b0] font-light leading-relaxed mb-6"
                    >
                        LUMOS는 획일화된 디지털 사이니지를 넘어, 공간의 철학과 분위기에 맞는<br className="hidden md:block" />
                        하이엔드 미디어아트 콘텐츠를 제공하는 프리미엄 큐레이션 플랫폼입니다.
                    </motion.p>
                </div>
            </section>

            {/* ─── Story Section ─── */}
            <section className="py-24 px-6 md:px-12 bg-[#08080c] relative border-t border-white/5">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay z-0 pointer-events-none" />
                <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center relative z-10">
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A843]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                        <img
                            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop"
                            alt="LUMOS Philosophy"
                            className="w-full h-auto aspect-[4/5] object-cover grayscale opacity-80 shadow-2xl filter brightness-90 contrast-125"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-display text-[2.5rem] md:text-[3.5rem] text-white/95 mb-8 tracking-tight">Not Just Video, It's Art.</h2>
                        <div className="space-y-6 font-body text-[#a0a0a0] text-[0.9375rem] leading-[1.8]">
                            <p>
                                과거의 LED 전광판은 단순한 광고 송출 매체였습니다. 하지만 공간의 경험을 중시하는 현대의 상업 공간에서, 디스플레이는 그 자체로 건축의 일부이자 거대한 캔버스가 되어야 합니다.
                            </p>
                            <p>
                                우리는 누구나 쉽게 접근할 수 있는 스톡 웹사이트와 차별화됩니다. 엄격하게 큐레이션된 글로벌 수준의 'STANDARD' 컬렉션과, 한국적 상업 공간에 최적화된 'LOCAL' 컬렉션을 통해 당신의 공간에 완벽하게 녹아드는 빛의 예술을 제안합니다.
                            </p>
                            <p>
                                LUMOS는 단순한 콘텐츠 구독 서비스가 아닙니다. 최첨단 생성형 AI 기술과 전문 아티스트들의 협력을 통해, 끝없이 진화하는 미디어 아트 생태계를 선도합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Two Worlds Section ─── */}
            <section className="py-32 px-6 md:px-12 bg-[#050508] relative border-y border-white/5">
                <div className="max-w-screen-xl mx-auto text-center mb-20">
                    <h2 className="text-display text-[2.5rem] md:text-[4rem] text-white/95 mb-6 text-shadow-strong">Two Worlds, One Platform</h2>
                    <p className="font-body text-[#b0b0b0]">목적과 공간에 따라 선택 가능한 두 가지 프리미엄 컬렉션</p>
                </div>
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* STANDARD */}
                    <div className="p-12 border border-white/5 bg-[#0a0a0e] hover:border-[#D4A843]/30 transition-all duration-500 group relative overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A843]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#D4A843]/10 transition-colors" />
                        <h3 className="text-display text-4xl md:text-[3rem] text-white/95 mb-4 relative z-10">STANDARD</h3>
                        <p className="font-accent text-[10px] tracking-[0.3em] text-[#D4A843] mb-8 relative z-10 drop-shadow-md">GLOBAL PREMIUM MEDIA ART</p>
                        <p className="font-body text-[0.9375rem] text-[#909090] mb-8 h-auto md:h-24 relative z-10 leading-[1.8] break-keep">
                            자연의 경이로움, 추상적인 빛의 파동, 압도적인 3D 아나몰픽까지. 글로벌 하이엔드 갤러리 수준의 보편적이고 웅장한 예술성을 지닌 프리미엄 컬렉션입니다.
                        </p>
                        <ul className="space-y-3 font-body text-[0.875rem] text-[#808080] mb-10 relative z-10">
                            <li>• 압도적인 스케일과 디테일</li>
                            <li>• 호텔, 대형 로비, 글로벌 럭셔리 매장 적합</li>
                            <li>• 보편적인 시각적 경이로움</li>
                        </ul>
                        <div className="h-px w-12 bg-[#D4A843] group-hover:w-full transition-all duration-700 relative z-10 shadow-[0_0_10px_rgba(212,168,67,0.5)]" />
                    </div>

                    {/* LOCAL */}
                    <div className="p-12 border border-white/5 bg-[#0a0a0e] hover:border-[#93C5FD]/30 transition-all duration-500 group relative overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#93C5FD]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#93C5FD]/10 transition-colors" />
                        <h3 className="text-display text-4xl md:text-[3rem] text-white/95 mb-4 relative z-10">LOCAL</h3>
                        <p className="font-accent text-[10px] tracking-[0.3em] text-[#93C5FD] mb-8 relative z-10 drop-shadow-md">KOREAN COMMERCIAL ART</p>
                        <p className="font-body text-[0.9375rem] text-[#909090] mb-8 h-auto md:h-24 relative z-10 leading-[1.8] break-keep">
                            한국의 트렌디한 카페, 감각적인 리테일 매장, 힙한 팝업스토어 등 로컬 상업 공간의 맥락에 완벽하게 부합하는 감성적이고 트렌디한 아트 컬렉션입니다.
                        </p>
                        <ul className="space-y-3 font-body text-[0.875rem] text-[#808080] mb-10 relative z-10">
                            <li>• 감성적이고 트렌디한 무드</li>
                            <li>• 카페, 레스토랑, 팝업스토어, 플래그십 적합</li>
                            <li>• 한국적 공간 트렌드 반영</li>
                        </ul>
                        <div className="h-px w-12 bg-[#93C5FD] group-hover:w-full transition-all duration-700 relative z-10 shadow-[0_0_10px_rgba(147,197,253,0.5)]" />
                    </div>
                </div>
            </section>

            {/* ─── Contact & THISGLOBAL Section ─── */}
            <section className="py-32 px-6 md:px-12 bg-[#08080c] relative flex justify-center border-b border-white/5">
                <div className="max-w-4xl w-full text-center relative z-10">
                    <p className="font-accent text-[10px] tracking-[0.5em] text-white/40 mb-6 drop-shadow">OPERATED BY THISGLOBAL</p>
                    <h2 className="text-display text-[2.5rem] md:text-[3.5rem] text-white/95 mb-10 leading-[1.1] tracking-tight text-shadow-strong">
                        하드웨어 설계부터 콘텐츠 큐레이션까지,<br />공간을 위한 완벽한 LED 통합 솔루션.
                    </h2>
                    <p className="font-body text-[0.9375rem] text-[#b0b0b0] mb-16 max-w-2xl mx-auto leading-relaxed">
                        (주)디스글로벌은 국내외 다양한 랜드마크와 프리미엄 상업공간의 LED 미디어월 기획 및 구축을 선도하는 기업입니다. LUMOS는 디스글로벌의 노하우가 집약된 프리미엄 콘텐츠 서비스입니다.
                    </p>

                    <div className="bg-[#050508] border border-white/5 p-8 md:p-12 text-left shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay z-0 pointer-events-none" />
                        <h3 className="font-display text-[1.5rem] text-white/95 tracking-wide mb-8 border-b border-white/10 pb-4 relative z-10">적용 문의 및 파트너십</h3>
                        <form className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#808080] font-accent uppercase tracking-[0.2em]">회사명/소속</label>
                                    <input type="text" className="w-full bg-[#0a0a0e] border border-white/5 p-3.5 text-white/90 focus:outline-none focus:border-[#D4A843]/50 transition-colors shadow-inner" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-[#808080] font-accent uppercase tracking-[0.2em]">담당자 성함</label>
                                    <input type="text" className="w-full bg-[#0a0a0e] border border-white/5 p-3.5 text-white/90 focus:outline-none focus:border-[#D4A843]/50 transition-colors shadow-inner" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-[#808080] font-accent uppercase tracking-[0.2em]">연락처 및 이메일</label>
                                <input type="text" className="w-full bg-[#0a0a0e] border border-white/5 p-3.5 text-white/90 focus:outline-none focus:border-[#D4A843]/50 transition-colors shadow-inner" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] text-[#808080] font-accent uppercase tracking-[0.2em]">공간 정보 (설치 희망 공간 및 용도)</label>
                                <textarea rows={4} className="w-full bg-[#0a0a0e] border border-white/5 p-3.5 text-white/90 focus:outline-none focus:border-[#D4A843]/50 transition-colors shadow-inner min-h-[120px]"></textarea>
                            </div>
                            <button type="button" className="w-full py-4.5 bg-white text-black font-accent text-[10px] tracking-[0.3em] hover:bg-[#D4A843] hover:text-black transition-all duration-300 mt-6 shadow-xl">
                                문의 접수하기
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 bg-[#050508] relative z-20">
                <div className="w-full text-center">
                    <p className="font-accent text-[10px] tracking-[0.2em] text-[#606060]">
                        © 2026 LUMOS. POWERED BY THISGLOBAL.
                    </p>
                </div>
            </footer>
        </div>
    );
}
