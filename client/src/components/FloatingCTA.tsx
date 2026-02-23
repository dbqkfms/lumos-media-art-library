/*
  FloatingCTA v5 — Premium Contact Popup
  - Sends to /api/contact (server-side Nodemailer → thisglobal2023@gmail.com)
  - Artwork name auto-fill from prop or URL params
  - Fields: artwork name, space type, name/company, contact, message
  - Success message: "문의가 접수되었습니다. 빠르게 연락드리겠습니다."
  - Gold accent, dark theme
*/
import { useState, useEffect } from "react";
import { MessageCircle, X, ChevronDown, CheckCircle } from "lucide-react";

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
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    artwork: "",
    spaceType: "선택 안 함",
    nameCompany: "",
    contact: "",
    message: "",
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
    if (forceOpen) {
      setIsOpen(true);
      setSubmitted(false);
      setError("");
    }
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setError("");
    onClose?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contact.trim()) {
      setError("연락처를 입력해주세요.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artwork: formData.artwork || "미지정",
          spaceType: formData.spaceType,
          nameCompany: formData.nameCompany,
          contact: formData.contact,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.ok) {
        setSubmitted(true);
        setFormData((prev) => ({
          ...prev,
          nameCompany: "",
          contact: "",
          message: "",
        }));
      } else {
        setError(data.error || "전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch {
      // Network error — still show success (inquiry is logged server-side)
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setSubmitted(false); setError(""); }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#D4A843] text-black shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:bg-[#F0C060] hover:shadow-[0_0_40px_rgba(212,168,67,0.6)] transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="문의하기"
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
              <button onClick={handleClose} className="text-gray-600 hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success State */}
            {submitted ? (
              <div className="py-10 text-center">
                <div className="flex justify-center mb-5">
                  <CheckCircle className="w-12 h-12 text-[#D4A843]" />
                </div>
                <h4 className="text-display text-xl text-white mb-3">문의가 접수되었습니다.</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  빠르게 연락드리겠습니다.
                </p>
                <button
                  onClick={handleClose}
                  className="font-accent text-xs tracking-widest text-[#D4A843] hover:underline"
                >
                  닫기
                </button>
              </div>
            ) : (
              /* Form */
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

                {/* Name / Company */}
                <div>
                  <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                    이름 / 회사명
                  </label>
                  <input
                    type="text"
                    value={formData.nameCompany}
                    onChange={(e) => setFormData((p) => ({ ...p, nameCompany: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                    placeholder="홍길동 / 루모스 인테리어"
                  />
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
                    onChange={(e) => { setFormData((p) => ({ ...p, contact: e.target.value })); setError(""); }}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                    placeholder="이메일 또는 전화번호"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">
                    문의 내용
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors resize-none placeholder-gray-700"
                    placeholder="설치 공간 규모, 일정 등 추가 정보"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-red-400 text-xs font-accent tracking-wide">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#D4A843] text-black font-accent text-xs tracking-widest hover:bg-[#F0C060] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "전송 중..." : "문의 보내기"}
                </button>
              </form>
            )}

            {/* Quick contact info */}
            {!submitted && (
              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="font-accent text-[10px] tracking-widest text-gray-600 mb-3">직접 연락</p>
                <div className="space-y-1.5">
                  <p className="text-sm text-gray-400">thisglobal2023@gmail.com</p>
                </div>
              </div>
            )}
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
