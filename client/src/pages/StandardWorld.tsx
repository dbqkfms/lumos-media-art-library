/*
  Design Philosophy: Luminous Brutalism - STANDARD World
  - Gallery: Masonry 레이아웃 (비대칭, 긴장감)
  - Color: 블랙 배경 + 골드 액센트
  - Interaction: Heavy but Responsive
*/

import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";

const artworks = [
  {
    id: 1,
    title: "Liquid Gold",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/JVXacx1rykcX4nIERplcd0-img-1_1770843086000_na1fn_c3RhbmRhcmRfYWJzdHJhY3RfMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L0pWWGFjeDFyeWtjWDRuSUVScGxjZDAtaW1nLTFfMTc3MDg0MzA4NjAwMF9uYTFmbl9jM1JoYm1SaGNtUmZZV0p6ZEhKaFkzUmZNUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=XrIlDLxrLZeMmBV4GIE93AQQaZ-IFT7vln3AGkwAL--EDIXzHAnLjmYSTzG7XTb7NIqIwplxZaXSKAf0lPc-BlEYxQbDSNF8VMpi2raydgpEuCDgt9ejuU-LjqNrTGZnVtyVDo6-YARH0MkSZl7Ef32GLYfrvvTF0NPtx0vSRgK~A1AOTGpAXhAZAoz~f39ZdLi2e8AH54LydDnrpC5vpJpvqgHDDYAvestPEPRqBbY5Qito1NI94q5W07bDZozkHGmEzA7eofdqH6f9sN2rDK7yAYjfGFl5X22uLn1MhogTDbgf0wbeNgLkU08UN5FEumZHQ2FnLETnriqQ1Xv9Og__",
    description: "유동적인 금속 텍스처가 만들어내는 추상적 아름다움",
    category: "Abstract",
  },
  {
    id: 2,
    title: "Brutalist Geometry",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/JVXacx1rykcX4nIERplcd0-img-2_1770843088000_na1fn_c3RhbmRhcmRfYWJzdHJhY3RfMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L0pWWGFjeDFyeWtjWDRuSUVScGxjZDAtaW1nLTJfMTc3MDg0MzA4ODAwMF9uYTFmbl9jM1JoYm1SaGNtUmZZV0p6ZEhKaFkzUmZNZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MxC2oz1ckb~CnoxhI-i0r5Ki7oJTxHMJBnI9zOmcfJHYxoFIKLZWRAM2An~9SqqE81KSlFVe-G8Ni~UOZ9fwhgffXOT5Dmcr75GmZU4jU0AlXWgeHirXwX8~6TWY3mNSIpSCzLCjxz0QROfLxvk3QCtc4jRHVpKK2HTAeh9E21j2v~SzLSsLXtu1x8rlmHZC03L~HlE51ByHiNfjlUG9gQQC~-lCfeNjO413fKEBuAJ~XjO~5F4oY~i0orJ2fezH23ozKEyAs0uujNDWeO4D25WArZpV3RkKDmHB8WRWJ2Tjhhf8KheuDJ8VL58KvzAL~OMpg-THtGoWaurfvUhxHg__",
    description: "날카로운 기하학적 구조의 건축적 미학",
    category: "Abstract",
  },
  {
    id: 3,
    title: "Cosmic Nebula",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/JVXacx1rykcX4nIERplcd0-img-3_1770843086000_na1fn_c3RhbmRhcmRfY29zbWljXzE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L0pWWGFjeDFyeWtjWDRuSUVScGxjZDAtaW1nLTNfMTc3MDg0MzA4NjAwMF9uYTFmbl9jM1JoYm1SaGNtUmZZMjl6Yldsalh6RS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mzyS8x3KDc2QTNKSQ670iHq17I-cKH0GlI3E2iErOxOKcOcRcdea3OUcaiRXkTy3NLoYuzRKVl-nlJ9KZ8qtyyAXiGFISZKTAT399fLdrgfxfwvGJnfIcZTYEwQ7WIlQoe0xDyAAgJHLDX8gaV0xyXkaKBBMw-NGmP7d6OV1pUnkSa2ZjNos~9LP9Y8DiFV6RHE~WFO9wpbcxTCUYJDcI0sPIHvYnY9tuha~gthp8-jvyNVSvMjUNxLl7xrkfl8n2QVgo5Onah2vlCpvW-10Pbo~wQVpSTGfQEOA~IANxkR5O4BdNK2KkYTM550lpCDHIDZrob0SlxvvISZXLM0brA__",
    description: "성운과 별들이 만들어내는 우주의 신비",
    category: "Cosmic",
  },
  {
    id: 4,
    title: "Spiral Galaxy",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/JVXacx1rykcX4nIERplcd0-img-4_1770843082000_na1fn_c3RhbmRhcmRfY29zbWljXzI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L0pWWGFjeDFyeWtjWDRuSUVScGxjZDAtaW1nLTRfMTc3MDg0MzA4MjAwMF9uYTFmbl9jM1JoYm1SaGNtUmZZMjl6Yldsalh6SS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WpIyrBfAu3jmzgdPvHodX68G33NGaPUOtitC0M0oDJ-vcz9YRk2DqFmIP71dMs4Ivd-mPTMQGe0ZpZ3XX9Rms2MXSk1PiyvrQ6HjALOWe-RMnINyYx6jtlpA5pTEurzLSznc4U5OEBuhFzj8vfD~MXC0aYCJrBcXuhmD1EZqZGajt6spHwPfDkE3wq0Nia~vND9ZsAit1xaOVEmdEdwogrXUD-diSUtQEq81uZBPqToqaifRjZExnk5Zx4bOxJpZfJOkSegFoK-57SxalmuC~PXbUhAjLESoV8w7tf2DZ5rUqLF72jo67yLTDRTmZSlj61MaMABF5VrLSTmE4MF6ow__",
    description: "나선 은하의 장엄한 회전",
    category: "Cosmic",
  },
  {
    id: 5,
    title: "Marble Veins",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/JVXacx1rykcX4nIERplcd0-img-5_1770843100000_na1fn_c3RhbmRhcmRfbWF0ZXJpYWxfMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94L0pWWGFjeDFyeWtjWDRuSUVScGxjZDAtaW1nLTVfMTc3MDg0MzEwMDAwMF9uYTFmbl9jM1JoYm1SaGNtUmZiV0YwWlhKcFlXeGZNUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=EoYWZS4FYsoM8YnBFFvoab5Rb~VBJ7VxbcUeH79SMDgynlAfSZb5LxAJGPIKti956n3D1fE~oJNVPR4ie0gxpYQSe8qYCWtKlExhSQRudIQ3PpBtIg~42lrPnN7JxMjmOZVrgeOuCfB0w3OWHji9IYlCyBEefVvm1srm1I0178XGt28r1Ea8xfx7NO8yzyHjCGIXgaJGHptOdRLRv6m3L3vTisz9nP-xDIJ~UcCExkUTA82tC5Hd1zfriEnLA3opiKreBPjQE9pMUc5orkjDEBrP3Jj~qn8Pm4xocwCvo8yBgrnrIdEUeXI1vS8IcGXIUhh6-Vqa8GOi-Eu4vldtbg__",
    description: "대리석의 고급스러운 질감과 골드 베인",
    category: "Material",
  },
  {
    id: 6,
    title: "Golden Rays",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/QHNOEFpJsHoByPLr.png",
    description: "어둠을 가르는 황금빛 광선",
    category: "Light",
  },
  {
    id: 7,
    title: "Light Particles",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/8sBD7cWy7fnlTevRmRk8l0-img-1_1770843157000_na1fn_c3RhbmRhcmRfbGlnaHRfMw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94LzhzQkQ3Y1d5N2ZubFRldlJtUms4bDAtaW1nLTFfMTc3MDg0MzE1NzAwMF9uYTFmbl9jM1JoYm1SaGNtUmZiR2xuYUhSZk13LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VQ5RMVaGGunCCtvMakXWfF5Bjqbr7TxpTgEBeF6tZtpGM-aZPb485dr9uobr2qaQsV9YQf8d4YKIY9mmD-UF~KCLEkAAQXh9Er1OvIfgl-aaXq3zkjtcKRwC4GtI2Mo5Dm9CK7G1D29ZQNcxy11CrA-Zr5fCQVZidxeOKjBllkWtAZEybCR1EkTVBYtbdl4w8WeY58ua9EWKR-~k4lVzDRRes44VouF288iCPYjazKHo2YfjrblNOGMvLYKBPhZBlm7jiag5YWsRkyagFKqIma8-U9L5ZwNazThwpRHG3gvpQppD9lcfjKNfyQinKcQZsZKCQaKfbH~U1XaCj4IItA__",
    description: "빛나는 입자들의 마법적인 분위기",
    category: "Light",
  },
  {
    id: 8,
    title: "Sacred Mandala",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/NCCsfGDIUABqfQgW.png",
    description: "신성한 기하학 패턴의 만다라",
    category: "Pattern",
  },
  {
    id: 9,
    title: "Flowing Lines",
    image: "https://private-us-east-1.manuscdn.com/sessionFile/OwKpbvpl0NtYLmWGBzoe20/sandbox/8sBD7cWy7fnlTevRmRk8l0-img-2_1770843168000_na1fn_c3RhbmRhcmRfcGF0dGVybl8z.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvT3dLcGJ2cGwwTnRZTG1XR0J6b2UyMC9zYW5kYm94LzhzQkQ3Y1d5N2ZubFRldlJtUms4bDAtaW1nLTJfMTc3MDg0MzE2ODAwMF9uYTFmbl9jM1JoYm1SaGNtUmZjR0YwZEdWeWJsOHoucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=G0KDXeC6yKLdLYJmfZwmrp6DrLfSV243deGBxTg53xekEfDZFBhzajfeDDAUymHjwR~f9hD2kpU4Qgah0Ah70ToGNtSwjYzPdrWLvygTPSdCx47J~dM2Td5PQB5mE-y2dnX7GhR5sGuaUf1r4FKZ7iLaoIhRMz2Ux90n-SRMpSD3JS0sKa75CC2dfS6~t45CXxUA5MJghM~CSb0Yeqqz1Q2YAETmWkcMj6rg3OlPqNsc3MLEP5L2rEy7n5DABK4~5OlnKKSexc2soDNe8jVtEmO0F7nzGOOyX40hyeGW06X1sD8RXzxCoUZPVlcIGbLi8po~scJYBxZis3yYI9nKLQ__",
    description: "유기적으로 흐르는 황금 곡선",
    category: "Pattern",
  },
  {
    id: 10,
    title: "Cosmic Flow",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png",
    description: "우주의 흐름을 담은 추상 작품",
    category: "Cosmic",
  },
  {
    id: 11,
    title: "Liquid Emotion",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/galQiSmNivdrmiSe.png",
    description: "감정의 흐름을 시각화한 유동적 형태",
    category: "Abstract",
  },
  {
    id: 12,
    title: "Material Essence",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/cAJHwHFjELrsYPio.png",
    description: "물질의 본질을 탐구하는 텍스처",
    category: "Material",
  },
];

export default function StandardWorld() {
  const [, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const categories = ["All", "Abstract", "Cosmic", "Material", "Light", "Pattern"];
  
  const filteredArtworks = activeCategory === "All" 
    ? artworks 
    : artworks.filter(art => art.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png"
            alt="STANDARD World"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
          <h2 className="text-display text-5xl md:text-7xl mb-6 text-[#D4AF37]">
            프리미엄 미디어아트
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-4">
            빛으로 완성하는 공간의 정체성
          </p>
          <p className="text-base text-gray-400">
            랜드마크, 파사드, 갤러리를 위한 예술적 콘텐츠. 공간에 생명을 불어넣는 프리미엄 미디어아트.
          </p>
        </div>
      </section>

      {/* Glowing Divider */}
      <div className="glow-divider" />

      {/* Gallery Section - Masonry Layout */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-display text-3xl md:text-4xl mb-2">Gallery</h3>
                <p className="text-gray-400">
                  AI 생성 미디어아트 컬렉션. 각 작품은 무한한 변주가 가능합니다.
                </p>
              </div>
              <button
                onClick={() => setLocation("/local")}
                className="text-accent text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
              >
                Switch to LOCAL →
              </button>
            </div>
            
            {/* Category Filter Tabs */}
            <div className="flex gap-6 pb-4 border-b border-[#D4AF37]/30">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-accent text-sm uppercase tracking-wider transition-colors pb-2 ${
                    activeCategory === cat
                      ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`group relative overflow-hidden light-trail ${
                  index % 3 === 0 ? "md:row-span-2" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-black/90 backdrop-blur-sm p-4 border border-[#D4AF37]/30">
                    <span className="text-accent text-xs uppercase tracking-wider text-[#D4AF37]">
                      {artwork.category}
                    </span>
                    <h4 className="text-display text-xl mt-2 mb-2">
                      {artwork.title}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {artwork.description}
                    </p>
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 border border-[#D4AF37] glow-gold-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-display text-3xl md:text-4xl mb-12 text-center">
            STANDARD Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#D4AF37]/30 bg-black/50">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#D4AF37]">
                Infinite Variations
              </h4>
              <p className="text-gray-400">
                AI 기반 생성으로 무한한 변주 가능. 같은 콘셉트, 다른 표현.
              </p>
            </div>

            <div className="p-8 border border-[#D4AF37]/30 bg-black/50">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#D4AF37]">
                8K Resolution
              </h4>
              <p className="text-gray-400">
                초고해상도 콘텐츠. 대형 LED 디스플레이에 최적화된 품질.
              </p>
            </div>

            <div className="p-8 border border-[#D4AF37]/30 bg-black/50">
              <h4 className="text-accent text-lg uppercase tracking-wider mb-4 text-[#D4AF37]">
                Custom Creation
              </h4>
              <p className="text-gray-400">
                브랜드와 공간에 맞춘 맞춤형 콘텐츠 제작 가능.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-display text-4xl md:text-5xl mb-6 text-[#D4AF37]">
            공간에 예술을 더하세요
          </h3>
          <p className="text-lg text-gray-400 mb-8">
            STANDARD 컬렉션으로 당신의 공간을 랜드마크로 만드세요.
          </p>
          <button className="btn-brutalist">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D4AF37]/30">
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
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4 text-[#D4AF37]">Worlds</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/standard" className="hover:text-[#D4AF37] transition-colors">
                    STANDARD - 프리미엄 미디어아트
                  </a>
                </li>
                <li>
                  <a href="/local" className="hover:text-[#D4AF37] transition-colors">
                    LOCAL - 상업용 콘텐츠
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent text-sm uppercase tracking-wider mb-4 text-[#D4AF37]">Contact</h4>
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
