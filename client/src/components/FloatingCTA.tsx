/*
  FloatingCTA v3 — Premium Contact Popup
  - Artwork name auto-fill from prop or URL params (?artwork=title)
  - Space type selector
  - Contact + memo fields
  - Gold accent, dark theme
*/
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const SPACE_TYPES = [
  "선택 안 함",
  "호텔 / 리조트",
  "레스토랑 / 카페",
  "갤러리 / 미술관",
  "기업 로비",
  "쇼핑몰 / 리테일",
  "공공 공간",
  "기타",
];

interface FloatingCTAProps {
  artworkName?: string;
  forceOpen?: boolean;
  onClose?: () => void;
}

export default function FloatingCTA({ artworkName, forceOpen, onClose }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    artwork: "",
    spaceType: "선택 안 함",
    contact: "",
    memo: "",
  });

  // Auto-fill artwork name from prop or URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlArtwork = params.get("artwork");
    setFormData((prev) => ({
      ...prev,
      artwork: artworkName || urlArtwork || "",
    }));
  }, [artworkName]);

  // Open from parent (e.g. ArtworkDetail CTA button)
  useEffect(() => {
    if (forceOpen) setIsOpen(true);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("문의가 접수되었습니다. 영업일 기준 1-2일 내 연락드리겠습니다.");
    setFormData((prev) => ({ ...prev, memo: "", contact: "" }));
    handleClose();
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#D4A843] text-black shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:bg-[#F0C060] hover:shadow-[0_0_40px_rgba(212,168,67,0.6)] transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Contact Us"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Contact Form Popup */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 bg-[#0d0d0d] border border-[#D4A843]/20 shadow-[0_20px_80px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto">
          <div className="p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="font-accent text-[10px] tracking-[0.25em] text-[#D4A843] mb-1">LUMOS</p>
                <h3 className="text-display text-2xl text-white">문의하기</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Artwork name — auto-filled */}
              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                  작품명
                </label>
                <input
                  type="text"
                  value={formData.artwork}
                  onChange={(e) => setFormData((p) => ({ ...p, artwork: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="작품명 (선택)"
                />
              </div>

              {/* Space type */}
              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                  공간 유형
                </label>
                <div className="relative">
                  <select
                    value={formData.spaceType}
                    onChange={(e) => setFormData((p) => ({ ...p, spaceType: e.target.value }))}
                    className="w-full appearance-none px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors cursor-pointer"
                  >
                    {SPACE_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#1a1a1a]">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                  연락처 <span className="text-[#D4A843]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData((p) => ({ ...p, contact: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="이메일 또는 전화번호"
                />
              </div>

              {/* Memo */}
              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                  메모
                </label>
                <textarea
                  rows={3}
                  value={formData.memo}
                  onChange={(e) => setFormData((p) => ({ ...p, memo: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors resize-none placeholder-gray-700"
                  placeholder="설치 공간 규모, 일정 등 추가 정보"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4A843] text-black font-accent text-xs tracking-widest hover:bg-[#F0C060] transition-colors"
              >
                문의 보내기
              </button>
            </form>

            {/* Quick contact info */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <p className="font-accent text-[10px] tracking-widest text-gray-600 mb-3">직접 연락</p>
              <div className="space-y-1.5">
                <p className="text-sm text-gray-400">contact@lumos.art</p>
                <p className="text-sm text-gray-400">+82-2-1234-5678</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={handleClose}
        />
      )}
    </>
  );
}
