// Artist Upload — 작품 업로드 페이지
import React, { useState } from "react";
import { useLocation } from "wouter";
import { PortalShell } from "@/components/shells/PortalShell";
import { useAuth } from "@/contexts/AuthContext";

interface UploadForm {
  title: string;
  description: string;
  tags: string;
  displayType: "Horizontal" | "Vertical";
  worldType: "standard" | "local";
  resolution: string;
  runtime: string;
}

const initialForm: UploadForm = {
  title: "",
  description: "",
  tags: "",
  displayType: "Horizontal",
  worldType: "standard",
  resolution: "1920x1080",
  runtime: "",
};

export default function ArtistUpload() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState<UploadForm>(initialForm);
  const [thumbnailName, setThumbnailName] = useState("");
  const [videoName, setVideoName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 데모: 실제 업로드 없이 성공 표시
    setSubmitted(true);
    setTimeout(() => {
      setLocation("/artist/works");
    }, 2000);
  };

  if (submitted) {
    return (
      <PortalShell role="artist" title="Upload">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="text-emerald-400 text-4xl mb-4">✓</div>
          <div className="font-display text-xl text-[#f5f5f5] mb-2">
            작품이 제출되었습니다
          </div>
          <div className="text-[#909090] text-sm">
            관리자 검토 후 결과를 알려드립니다.
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell role="artist" title="Upload">
      <div className="max-w-2xl">
        <div className="font-display text-2xl text-[#f5f5f5] mb-1">
          새 작품 업로드
        </div>
        <div className="text-[#909090] text-sm mb-8">
          작품 정보를 입력하고 제출하세요. 관리자 승인 후 사이트에 게시됩니다.
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 영상 파일 */}
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Video File
            </label>
            <div
              className="border-2 border-dashed border-white/10 p-8 text-center cursor-pointer hover:border-[#D4A843]/30 transition-colors"
              onClick={() => {
                // 데모: 파일 선택 시뮬레이션
                setVideoName("my-artwork.mp4");
              }}
            >
              {videoName ? (
                <div className="text-[#f5f5f5] text-sm">{videoName}</div>
              ) : (
                <>
                  <div className="text-[#909090] text-2xl mb-2">▲</div>
                  <div className="text-[#909090] text-sm">
                    클릭하여 영상 파일을 선택하세요
                  </div>
                  <div className="text-[#666] text-[10px] mt-1">
                    MP4, MOV — 최대 500MB
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 썸네일 */}
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Thumbnail
            </label>
            <div
              className="border-2 border-dashed border-white/10 p-6 text-center cursor-pointer hover:border-[#D4A843]/30 transition-colors"
              onClick={() => setThumbnailName("thumbnail.jpg")}
            >
              {thumbnailName ? (
                <div className="text-[#f5f5f5] text-sm">{thumbnailName}</div>
              ) : (
                <div className="text-[#909090] text-sm">
                  클릭하여 썸네일 이미지를 선택하세요 (JPG, PNG)
                </div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
              placeholder="작품 제목"
              required
            />
          </div>

          {/* 설명 */}
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none resize-none"
              placeholder="작품에 대한 설명을 입력하세요"
              required
            />
          </div>

          {/* 태그 */}
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Tags (쉼표로 구분)
            </label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
              placeholder="한국미, 전통, 수묵"
            />
          </div>

          {/* 2열 그리드 */}
          <div className="grid grid-cols-2 gap-4">
            {/* World Type */}
            <div>
              <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
                World Type
              </label>
              <select
                name="worldType"
                value={form.worldType}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
              >
                <option value="standard">STANDARD</option>
                <option value="local">LOCAL</option>
              </select>
            </div>

            {/* Display Type */}
            <div>
              <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
                Display Type
              </label>
              <select
                name="displayType"
                value={form.displayType}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
              >
                <option value="Horizontal">Horizontal</option>
                <option value="Vertical">Vertical</option>
              </select>
            </div>

            {/* Resolution */}
            <div>
              <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
                Resolution
              </label>
              <select
                name="resolution"
                value={form.resolution}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
              >
                <option value="1280x720">1280x720 (HD)</option>
                <option value="1920x1080">1920x1080 (FHD)</option>
                <option value="3840x2160">3840x2160 (4K)</option>
              </select>
            </div>

            {/* Runtime */}
            <div>
              <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
                Runtime (초)
              </label>
              <input
                name="runtime"
                type="number"
                value={form.runtime}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none"
                placeholder="15"
                min="1"
                required
              />
            </div>
          </div>

          {/* 제출 */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#D4A843] text-black font-accent text-[10px] tracking-[0.3em] uppercase px-8 py-3 hover:bg-[#F0C060] transition-colors"
            >
              Submit for Review
            </button>
            <button
              type="button"
              onClick={() => setLocation("/artist/works")}
              className="border border-white/10 text-[#909090] font-accent text-[10px] tracking-[0.3em] uppercase px-8 py-3 hover:border-white/20 hover:text-[#f5f5f5] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </PortalShell>
  );
}
