/*
  Header v4 — 새 IA 반영
  Nav: Explore | Solutions | Artists | About | Contact | [Sign In / Profile]
  Home 탭 제거 → 로고 클릭 = Home
  Mega menu: Explore, Solutions, Artists
*/
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

function LogoMark() {
  return (
    <img
      src="/assets/lumos-logo.png"
      alt="LUMOS"
      style={{ height: 44, width: "auto", maxWidth: 180, objectFit: "contain", display: "block" }}
      onError={(e) => {
        // 이미지 로드 실패 시 텍스트 폴백
        const target = e.currentTarget;
        target.style.display = "none";
        const fallback = document.createElement("span");
        fallback.className = "font-accent text-[14px] tracking-[0.6em] uppercase text-[#D4A843]";
        fallback.textContent = "LUMOS";
        target.parentNode?.appendChild(fallback);
      }}
    />
  );
}

export default function Header() {
  const [location, setLocation] = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 프로필 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = (path: string) =>
    location === path || location.startsWith(path + "/");

  const headerBg = scrolled
    ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
    : "bg-transparent border-b border-transparent";

  const navLinkClass = (path: string) =>
    `font-accent text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 cursor-pointer ${
      isActive(path) ? "text-[#D4A843]" : "text-gray-400 hover:text-white"
    }`;

  const menuAnimation = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.2, ease: "easeOut" as const } satisfies Transition,
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo → Home */}
        <Link to="/">
          <div className="hover:opacity-80 transition-opacity duration-300 cursor-pointer">
            <LogoMark />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {/* Explore (메가메뉴) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("explore")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link to="/explore">
              <span className={`${navLinkClass("/explore")} flex items-center gap-1`}>
                Explore
                <span className="text-[9px] opacity-50">▾</span>
              </span>
            </Link>

            <AnimatePresence>
              {activeMenu === "explore" && (
                <motion.div
                  {...menuAnimation}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[580px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-6 grid grid-cols-3 gap-6">
                    {/* 좌: LUMOS Originals */}
                    <div>
                      <div className="font-accent text-[9px] tracking-[0.5em] uppercase text-[#909090] mb-3">
                        LUMOS Originals
                      </div>
                      <div className="space-y-2">
                        <Link to="/standard">
                          <div className="text-sm text-gray-300 hover:text-[#D4A843] cursor-pointer transition-colors py-1">
                            <span className="text-[#D4A843] mr-2">◆</span> STANDARD
                          </div>
                        </Link>
                        <Link to="/local">
                          <div className="text-sm text-gray-300 hover:text-[#93C5FD] cursor-pointer transition-colors py-1">
                            <span className="text-[#93C5FD] mr-2">◆</span> LOCAL
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* 중앙: More */}
                    <div>
                      <div className="font-accent text-[9px] tracking-[0.5em] uppercase text-[#909090] mb-3">
                        More
                      </div>
                      <div className="space-y-2">
                        <Link to="/explore">
                          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                            Creator Works
                          </div>
                        </Link>
                        <Link to="/explore">
                          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                            By Space
                          </div>
                        </Link>
                        <Link to="/explore">
                          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                            Collections
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* 우: View All */}
                    <div className="flex items-end justify-end">
                      <Link to="/explore">
                        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-[#D4A843] hover:text-[#F0C060] cursor-pointer transition-colors">
                          View All →
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Solutions (메가메뉴) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("solutions")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link to="/solutions">
              <span className={`${navLinkClass("/solutions")} flex items-center gap-1`}>
                Solutions
                <span className="text-[9px] opacity-50">▾</span>
              </span>
            </Link>

            <AnimatePresence>
              {activeMenu === "solutions" && (
                <motion.div
                  {...menuAnimation}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[400px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-accent text-[9px] tracking-[0.5em] uppercase text-[#909090] mb-3">
                        By Industry
                      </div>
                      {["Hospitality", "Retail", "F&B", "Office", "Public"].map(industry => (
                        <Link key={industry} to="/solutions">
                          <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                            {industry}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div>
                      <div className="font-accent text-[9px] tracking-[0.5em] uppercase text-[#909090] mb-3">
                        Services
                      </div>
                      <Link to="/solutions">
                        <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                          Licensing
                        </div>
                      </Link>
                      <Link to="/contact">
                        <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                          Inquiry
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Artists (메가메뉴) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("artists")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link to="/artists">
              <span className={`${navLinkClass("/artists")} flex items-center gap-1`}>
                Artists
                <span className="text-[9px] opacity-50">▾</span>
              </span>
            </Link>

            <AnimatePresence>
              {activeMenu === "artists" && (
                <motion.div
                  {...menuAnimation}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                >
                  <div className="p-5 space-y-2">
                    <Link to="/artists">
                      <div className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors py-1">
                        Directory
                      </div>
                    </Link>
                    <Link to="/contact">
                      <div className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors py-1">
                        Apply
                      </div>
                    </Link>
                    {user && (user.role === "artist" || user.role === "admin") && (
                      <div className="pt-2 border-t border-white/5">
                        <Link to="/artist/dashboard">
                          <div className="text-sm text-[#D4A843] hover:text-[#F0C060] cursor-pointer transition-colors py-1">
                            Artist Portal →
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About */}
          <Link to="/about">
            <span className={navLinkClass("/about")}>About</span>
          </Link>

          {/* Contact */}
          <Link to="/contact">
            <span className={navLinkClass("/contact")}>Contact</span>
          </Link>

          <div className="w-px h-4 bg-white/15 mx-1" />

          {/* Auth / Profile */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 font-accent text-[11px] tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-white/15 flex items-center justify-center text-[10px] text-[#D4A843]">
                  {user.name.charAt(0)}
                </span>
                <span className="hidden md:inline">{user.name}</span>
                <span className="text-[9px] opacity-50">▾</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    {...menuAnimation}
                    className="absolute top-full right-0 mt-3 w-[200px] bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
                  >
                    <div className="p-3 space-y-1">
                      {(user.role === "artist" || user.role === "admin") && (
                        <Link to="/artist/dashboard">
                          <div className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors px-3 py-2">
                            My Dashboard
                          </div>
                        </Link>
                      )}
                      {(user.role === "artist" || user.role === "admin") && (
                        <Link to="/artist/works">
                          <div className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors px-3 py-2">
                            My Works
                          </div>
                        </Link>
                      )}
                      {user.role === "admin" && (
                        <Link to="/admin/dashboard">
                          <div className="text-sm text-[#10B981] hover:text-emerald-300 cursor-pointer transition-colors px-3 py-2">
                            Admin
                          </div>
                        </Link>
                      )}
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <button
                          onClick={() => {
                            signOut();
                            setProfileOpen(false);
                            setLocation("/");
                          }}
                          className="w-full text-left text-sm text-gray-500 hover:text-white cursor-pointer transition-colors px-3 py-2"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/auth/signin">
              <span className="font-accent text-[11px] tracking-[0.15em] uppercase text-gray-400 hover:text-[#D4A843] transition-colors cursor-pointer">
                Sign In
              </span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
