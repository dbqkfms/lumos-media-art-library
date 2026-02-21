/*
  FloatingCTA v2 — Dark Theme Contact Popup
  - Gold accent button
  - Dark popup with blur backdrop
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
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#D4A843] text-black shadow-[0_0_30px_rgba(212,168,67,0.4)] hover:bg-[#F0C060] hover:shadow-[0_0_40px_rgba(212,168,67,0.6)] transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Contact Us"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Contact Form Popup */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-96 bg-[#0f0f0f] border border-[#D4A843]/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <p className="font-accent text-[10px] tracking-[0.25em] text-[#D4A843] mb-1">LUMOS</p>
                <h3 className="text-display text-2xl text-white">문의하기</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
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
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">이름</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="홍길동"
                />
              </div>

              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">이메일</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block font-accent text-[10px] tracking-widest text-gray-500 mb-2">문의 내용</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white text-sm focus:border-[#D4A843] focus:outline-none transition-colors resize-none placeholder-gray-700"
                  placeholder="문의하실 내용을 입력해주세요"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D4A843] text-black font-accent text-xs tracking-widest hover:bg-[#F0C060] transition-colors"
              >
                문의 보내기
              </button>
            </form>

            {/* Quick Links */}
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
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
