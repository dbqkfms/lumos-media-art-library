/*
  Header Component with Mega Menu Navigation
  - Fixed header across all pages
  - STANDARD/LOCAL mega menus with category tabs
  - Hover to reveal dropdown with artwork grid
*/

import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

interface ArtworkPreview {
  id: number;
  title: string;
  image: string;
  category: string;
}

const standardPreviews: ArtworkPreview[] = [
  {
    id: 1,
    title: "Cosmic Flow",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png",
    category: "Cosmic",
  },
  {
    id: 2,
    title: "Liquid Emotion",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/galQiSmNivdrmiSe.png",
    category: "Abstract",
  },
  {
    id: 3,
    title: "Material Essence",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/cAJHwHFjELrsYPio.png",
    category: "Material",
  },
  {
    id: 4,
    title: "Light Geometry",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/QHNOEFpJsHoByPLr.png",
    category: "Light",
  },
  {
    id: 5,
    title: "Sacred Patterns",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/NCCsfGDIUABqfQgW.png",
    category: "Pattern",
  },
  {
    id: 6,
    title: "Cosmic Flow 2",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/zOmNxqqARpBQjmzb.png",
    category: "Cosmic",
  },
  {
    id: 7,
    title: "Abstract Wave",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/galQiSmNivdrmiSe.png",
    category: "Abstract",
  },
  {
    id: 8,
    title: "Light Pattern",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/91290999/QHNOEFpJsHoByPLr.png",
    category: "Light",
  },
];

const localPreviews: ArtworkPreview[] = [
  {
    id: 1,
    title: "Forest Serenity",
    image: "/local_sample_1_nature.jpg",
    category: "Nature",
  },
  {
    id: 2,
    title: "Ocean Waves",
    image: "/local_sample_2_nature.jpg",
    category: "Nature",
  },
  {
    id: 3,
    title: "Mountain Vista",
    image: "/local_sample_3_nature.jpg",
    category: "Nature",
  },
  {
    id: 4,
    title: "Spring Blossom",
    image: "/local_sample_1_nature.jpg",
    category: "Seasonal",
  },
  {
    id: 5,
    title: "Urban Lights",
    image: "/local_sample_2_nature.jpg",
    category: "Urban",
  },
  {
    id: 6,
    title: "Minimal Space",
    image: "/local_sample_3_nature.jpg",
    category: "Minimal",
  },
  {
    id: 7,
    title: "Autumn Colors",
    image: "/local_sample_1_nature.jpg",
    category: "Seasonal",
  },
  {
    id: 8,
    title: "City Skyline",
    image: "/local_sample_2_nature.jpg",
    category: "Urban",
  },
];

const standardCategories = ["All", "Abstract", "Cosmic", "Material", "Light", "Pattern"];
const localCategories = ["All", "Nature", "Seasonal", "Urban", "Minimal"];

export default function Header() {
  const [location, setLocation] = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isActive = (path: string) => location === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setLocation("/")}
          className="text-display text-2xl text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
        >
          LUMOS
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {/* Home */}
          <button
            onClick={() => setLocation("/")}
            className={`text-accent text-sm uppercase tracking-wider transition-colors ${
              isActive("/") ? "text-[#D4AF37]" : "text-gray-400 hover:text-white"
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
              className={`text-accent text-sm uppercase tracking-wider transition-colors ${
                isActive("/standard") ? "text-[#D4AF37]" : "text-gray-400 hover:text-white"
              }`}
            >
              STANDARD ▼
            </button>

            {/* Mega Menu */}
            <AnimatePresence>
              {activeMenu === "standard" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-black/95 backdrop-blur-lg border border-[#D4AF37]/30 shadow-2xl"
                >
                  <div className="p-8">
                    {/* Category Tabs */}
                    <div className="flex gap-6 mb-6 pb-4 border-b border-[#D4AF37]/20">
                      {standardCategories.map((cat) => (
                        <button
                          key={cat}
                          className="text-accent text-sm uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Artwork Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {standardPreviews.map((artwork) => (
                        <div
                          key={artwork.id}
                          className="group cursor-pointer"
                          onClick={() => setLocation("/standard")}
                        >
                          <div className="relative overflow-hidden aspect-[4/3] bg-gray-900">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-sm font-medium text-white">{artwork.title}</p>
                                <p className="text-xs text-gray-400">{artwork.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-right">
                      <button
                        onClick={() => setLocation("/standard")}
                        className="text-accent text-sm uppercase tracking-wider text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
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
              className={`text-accent text-sm uppercase tracking-wider transition-colors ${
                isActive("/local") ? "text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              LOCAL ▼
            </button>

            {/* Mega Menu */}
            <AnimatePresence>
              {activeMenu === "local" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white/95 backdrop-blur-lg border border-gray-300 shadow-2xl"
                >
                  <div className="p-8">
                    {/* Category Tabs */}
                    <div className="flex gap-6 mb-6 pb-4 border-b border-gray-300">
                      {localCategories.map((cat) => (
                        <button
                          key={cat}
                          className="text-accent text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Artwork Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {localPreviews.map((artwork) => (
                        <div
                          key={artwork.id}
                          className="group cursor-pointer"
                          onClick={() => setLocation("/local")}
                        >
                          <div className="relative overflow-hidden aspect-[4/3] bg-gray-200">
                            <img
                              src={artwork.image}
                              alt={artwork.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <p className="text-sm font-medium text-gray-900">{artwork.title}</p>
                                <p className="text-xs text-gray-600">{artwork.category}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-right">
                      <button
                        onClick={() => setLocation("/local")}
                        className="text-accent text-sm uppercase tracking-wider text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        View All LOCAL →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* About */}
          <button
            className="text-accent text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            About
          </button>

          {/* Contact */}
          <button
            className="text-accent text-sm uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
