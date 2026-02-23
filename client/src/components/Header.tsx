/*
  Header Component v3 — Premium Dark Navigation
  - Logo image (logo-standard.png) left side, 40px height
  - Transparent → blur on scroll
  - STANDARD: Gold accent mega menu
  - LOCAL: Blue accent mega menu
  - THIS GLOBAL external link (right side)
*/

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface ArtworkPreview {
  id: number;
  title: string;
  image: string;
  category: string;
}

const standardPreviews: ArtworkPreview[] = [
  { id: 1, title: "Cosmic Flow", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png", category: "Cosmic" },
  { id: 2, title: "Liquid Emotion", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/galQiSmNivdrmiSe.png", category: "Abstract" },
  { id: 3, title: "Material Essence", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/cAJHwHFjELrsYPio.png", category: "Material" },
  { id: 4, title: "Golden Rays", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/QHNOEFpJsHoByPLr.png", category: "Light" },
  { id: 5, title: "Sacred Mandala", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/NCCsfGDIUABqfQgW.png", category: "Pattern" },
  { id: 6, title: "Cosmic Nebula", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png", category: "Cosmic" },
  { id: 7, title: "Liquid Gold", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/galQiSmNivdrmiSe.png", category: "Abstract" },
  { id: 8, title: "Light Particles", image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/QHNOEFpJsHoByPLr.png", category: "Light" },
];

const localPreviews: ArtworkPreview[] = [
  { id: 1, title: "Forest Serenity", image: "/local_sample_1_nature.jpg", category: "Nature" },
  { id: 2, title: "Mountain Vista", image: "/local_sample_3_korea.jpg", category: "Nature" },
  { id: 3, title: "Spring Blossom", image: "/local_sample_1_nature.jpg", category: "Seasonal" },
  { id: 4, title: "Urban Lights", image: "/local_sample_3_korea.jpg", category: "Urban" },
  { id: 5, title: "Minimal Space", image: "/local_sample_1_nature.jpg", category: "Minimal" },
  { id: 6, title: "Autumn Colors", image: "/local_sample_3_korea.jpg", category: "Seasonal" },
  { id: 7, title: "City Skyline", image: "/local_sample_1_nature.jpg", category: "Urban" },
  { id: 8, title: "Zen Garden", image: "/local_sample_3_korea.jpg", category: "Minimal" },
];

const standardCategories = ["All", "Abstract", "Cosmic", "Material", "Light", "Pattern"];
const localCategories = ["All", "Nature", "Seasonal", "Urban", "Minimal"];

interface HeaderProps {
  currentWorld?: "standard" | "local";
}

export default function Header({ currentWorld }: HeaderProps = {}) {
  const [location, setLocation] = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  const headerBg = scrolled
    ? "bg-[#111]/90 backdrop-blur-xl border-b border-white/5"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setLocation("/")}
          className="flex items-center"
          aria-label="LUMOS Home"
        >
          <img
            src="/assets/logo-standard.png"
            alt="LUMOS"
            style={{ height: "40px", width: "auto" }}
            onError={(e) => {
              // fallback to text if image not found
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          <span
            className="font-display text-2xl tracking-widest text-[#D4A843] hover:text-[#F0C060] transition-colors duration-300"
            style={{ display: "none" }}
          >
            LUMOS
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {/* Home */}
          <button
            onClick={() => setLocation("/")}
            className={`font-accent text-xs tracking-widest uppercase transition-colors duration-200 ${
              isActive("/") ? "text-[#D4A843]" : "text-gray-500 hover:text-white"
            }`}
          >
            Home
          </button>

          {/* STANDARD with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("standard")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => setLocation("/standard")}
              className={`font-accent text-xs tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                isActive("/standard") ? "text-[#D4A843]" : "text-gray-500 hover:text-white"
              }`}
            >
              STANDARD
              <span className="text-[10px] opacity-60">▾</span>
            </button>

            <AnimatePresence>
              {activeMenu === "standard" && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[820px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-[#D4A843]/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-8">
                    <div className="flex gap-6 mb-7 pb-5 border-b border-white/8">
                      {standardCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setLocation("/standard")}
                          className="font-accent text-xs tracking-widest text-gray-500 hover:text-[#D4A843] transition-colors duration-200"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-7">
                      {standardPreviews.map((artwork) => (
                        <div
                          key={artwork.id}
                          className="group cursor-pointer"
                          onClick={() => setLocation("/standard")}
                        >
                          <div className="relative overflow-hidden aspect-[4/3] bg-[#111]">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                                <p className="text-xs font-medium text-white leading-tight">{artwork.title}</p>
                                <p className="text-[10px] text-[#D4A843] mt-0.5">{artwork.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => setLocation("/standard")}
                        className="font-accent text-xs tracking-widest text-[#D4A843] hover:text-[#F0C060] transition-colors duration-200"
                      >
                        View All STANDARD →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LOCAL with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("local")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              onClick={() => setLocation("/local")}
              className={`font-accent text-xs tracking-widest uppercase transition-colors duration-200 flex items-center gap-1.5 ${
                isActive("/local") ? "text-[#93C5FD]" : "text-gray-500 hover:text-white"
              }`}
            >
              LOCAL
              <span className="text-[10px] opacity-60">▾</span>
            </button>

            <AnimatePresence>
              {activeMenu === "local" && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[820px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-[#93C5FD]/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-8">
                    <div className="flex gap-6 mb-7 pb-5 border-b border-white/8">
                      {localCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setLocation("/local")}
                          className="font-accent text-xs tracking-widest text-gray-500 hover:text-[#93C5FD] transition-colors duration-200"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-7">
                      {localPreviews.map((artwork) => (
                        <div
                          key={artwork.id}
                          className="group cursor-pointer"
                          onClick={() => setLocation("/local")}
                        >
                          <div className="relative overflow-hidden aspect-[4/3] bg-[#111]">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                                <p className="text-xs font-medium text-white leading-tight">{artwork.title}</p>
                                <p className="text-[10px] text-[#93C5FD] mt-0.5">{artwork.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => setLocation("/local")}
                        className="font-accent text-xs tracking-widest text-[#93C5FD] hover:text-[#BFDBFE] transition-colors duration-200"
                      >
                        View All LOCAL →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <span className="w-px h-4 bg-white/10" />

          {/* THIS GLOBAL — External Link */}
          <a
            href="https://www.thisglobal.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-accent text-xs tracking-widest uppercase text-gray-500 hover:text-white transition-colors duration-200"
          >
            THIS GLOBAL ↗
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-white/70 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-6">
              <button onClick={() => { setLocation("/"); setMobileOpen(false); }} className="font-accent text-xs tracking-widest uppercase text-gray-400 hover:text-white text-left">Home</button>
              <button onClick={() => { setLocation("/standard"); setMobileOpen(false); }} className="font-accent text-xs tracking-widest uppercase text-[#D4A843] text-left">STANDARD</button>
              <button onClick={() => { setLocation("/local"); setMobileOpen(false); }} className="font-accent text-xs tracking-widest uppercase text-[#93C5FD] text-left">LOCAL</button>
              <a href="https://www.thisglobal.kr/" target="_blank" rel="noopener noreferrer" className="font-accent text-xs tracking-widest uppercase text-gray-400 hover:text-white">THIS GLOBAL ↗</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
