/*
  Floating CTA Button
  - Fixed position at bottom-right
  - Contact Us action
  - Smooth animation
*/

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false);

  const handleContact = () => {
    toast.success("문의가 접수되었습니다. 곧 연락드리겠습니다!");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#D4AF37] text-black rounded-full shadow-2xl hover:bg-[#F4D03F] transition-all duration-300 flex items-center justify-center group hover:scale-110"
          aria-label="Contact Us"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      {/* Contact Form Popup */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 bg-black border border-[#D4AF37]/30 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-bold text-[#D4AF37]">문의하기</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleContact();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-body text-gray-300 mb-2">이름</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-300 mb-2">이메일</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-body text-gray-300 mb-2">문의 내용</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white font-body text-sm focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                  placeholder="문의하실 내용을 입력해주세요"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#D4AF37] text-black font-accent text-sm hover:bg-[#F4D03F] transition-colors"
              >
                문의 보내기
              </button>
            </form>

            {/* Quick Links */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400 font-body mb-2">또는 직접 연락하세요:</p>
              <div className="space-y-1">
                <p className="text-sm text-gray-300 font-body">📧 contact@lumos.art</p>
                <p className="text-sm text-gray-300 font-body">📞 +82-2-1234-5678</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
