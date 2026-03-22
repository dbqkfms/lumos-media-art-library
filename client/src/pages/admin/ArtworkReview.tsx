// Admin ArtworkReview — 관리자 작품 상세/검토 페이지
import { useState } from "react";
import { useRoute, Link } from "wouter";
import { PortalShell } from "@/components/shells/PortalShell";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatusTimeline } from "@/components/shared/StatusTimeline";
import {
  MOCK_PORTAL_ARTWORKS,
  VALID_TRANSITIONS,
} from "@/data/mockData";
import type { ArtworkStatus } from "@/types";

const WORLD_LABELS: Record<string, string> = {
  standard: "STANDARD",
  local: "LOCAL",
};

const TIER_OPTIONS: { value: "A" | "B" | "C"; label: string }[] = [
  { value: "A", label: "A - 프리미엄" },
  { value: "B", label: "B - 스탠다드" },
  { value: "C", label: "C - 베이직" },
];

export default function ArtworkReview() {
  const [match, params] = useRoute("/admin/artworks/:id");
  const artwork = MOCK_PORTAL_ARTWORKS.find(
    a => a.id === params?.id
  );

  const [reviewNote, setReviewNote] = useState("");
  const [selectedTier, setSelectedTier] = useState<
    "A" | "B" | "C"
  >(artwork?.curationTier || "B");
  const [actionDone, setActionDone] = useState<string | null>(
    null
  );

  // 404 처리
  if (!match || !artwork) {
    return (
      <PortalShell role="admin" title="작품을 찾을 수 없습니다">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-[#909090] text-6xl mb-6">
            &#x25A3;
          </div>
          <h2 className="font-display text-xl text-[#e0e0e0] mb-2">
            작품을 찾을 수 없습니다
          </h2>
          <p className="text-[#909090] text-sm mb-6">
            요청한 작품이 존재하지 않거나 삭제되었습니다.
          </p>
          <Link to="/admin/artworks">
            <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors border border-emerald-400/30 px-6 py-2.5 hover:border-emerald-400/60">
              작품 목록으로 돌아가기
            </span>
          </Link>
        </div>
      </PortalShell>
    );
  }

  // 상태 전이 가능 여부
  const canReview =
    artwork.status === "submitted" ||
    artwork.status === "under_review";
  const canPublish = artwork.status === "approved";

  // 검토 액션 핸들러
  const handleApprove = () => {
    window.alert(
      `"${artwork.title}" 승인 완료!\n큐레이션 등급: ${selectedTier}\n${reviewNote ? `메모: ${reviewNote}` : ""}`
    );
    setActionDone("approved");
    setReviewNote("");
  };

  const handleRequestChanges = () => {
    if (!reviewNote.trim()) {
      window.alert("수정 요청 시 메모를 입력해 주세요.");
      return;
    }
    window.alert(
      `"${artwork.title}" 수정 요청 전달!\n메모: ${reviewNote}`
    );
    setActionDone("changes_requested");
    setReviewNote("");
  };

  const handleReject = () => {
    window.alert(
      `"${artwork.title}" 반려 처리!\n${reviewNote ? `사유: ${reviewNote}` : ""}`
    );
    setActionDone("rejected");
    setReviewNote("");
  };

  // 날짜 포맷
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PortalShell role="admin" title={artwork.title}>
      {/* 뒤로 가기 */}
      <div className="mb-6">
        <Link to="/admin/artworks">
          <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-[#909090] hover:text-emerald-400 cursor-pointer transition-colors">
            &larr; 작품 목록
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측: 프리뷰 + 기본 정보 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 프리뷰 이미지 */}
          <div className="bg-[#0f0f0f] border border-white/5 aspect-video flex items-center justify-center overflow-hidden">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-contain"
              onError={e => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                el.parentElement!.innerHTML =
                  '<div class="text-[#909090] font-accent text-xs">미리보기 없음</div>';
              }}
            />
          </div>

          {/* 기본 정보 */}
          <div className="bg-[#1a1a1a] border border-white/5 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-display text-2xl text-[#f5f5f5] mb-1">
                  {artwork.title}
                </h1>
                <div className="text-[#909090] font-accent text-[10px] tracking-[0.3em] uppercase">
                  {artwork.artist}
                </div>
              </div>
              <StatusBadge status={artwork.status} />
            </div>

            <p className="text-[#e0e0e0] text-sm leading-relaxed mb-6">
              {artwork.description}
            </p>

            {/* 메타데이터 그리드 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  World
                </div>
                <div
                  className={`font-accent text-xs ${
                    artwork.worldType === "standard"
                      ? "text-[#D4A843]"
                      : "text-[#93C5FD]"
                  }`}
                >
                  {WORLD_LABELS[artwork.worldType] ||
                    artwork.worldType}
                </div>
              </div>
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  디스플레이
                </div>
                <div className="text-[#f5f5f5] text-sm">
                  {artwork.displayType}
                </div>
              </div>
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  해상도
                </div>
                <div className="text-[#f5f5f5] text-sm">
                  {artwork.resolution}
                </div>
              </div>
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  재생시간
                </div>
                <div className="text-[#f5f5f5] text-sm">
                  {artwork.runtime}초
                </div>
              </div>
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  카테고리
                </div>
                <div className="text-[#f5f5f5] text-sm">
                  {artwork.category}
                </div>
              </div>
              <div>
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-1">
                  제출일
                </div>
                <div className="text-[#f5f5f5] text-sm">
                  {formatDate(artwork.submittedAt)}
                </div>
              </div>
            </div>

            {/* 태그 */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="mt-4">
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-2">
                  태그
                </div>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 text-[#e0e0e0] font-accent text-[10px] tracking-wide border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 기존 리뷰 노트 */}
            {artwork.reviewNotes && (
              <div className="mt-4 p-3 bg-red-900/10 border border-red-400/20">
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-red-400 mb-1">
                  수정 요청 사항
                </div>
                <p className="text-[#e0e0e0] text-sm">
                  {artwork.reviewNotes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 우측: 검토 패널 + 타임라인 */}
        <div className="space-y-6">
          {/* 검토 액션 패널 */}
          {canReview && !actionDone && (
            <div className="bg-[#1a1a1a] border border-white/5 p-6">
              <h3 className="font-accent text-[10px] tracking-[0.6em] uppercase text-emerald-400 mb-4">
                작품 검토
              </h3>

              {/* 큐레이션 등급 선택 */}
              <div className="mb-4">
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-2">
                  큐레이션 등급
                </div>
                <div className="flex gap-2">
                  {TIER_OPTIONS.map(tier => (
                    <button
                      key={tier.value}
                      onClick={() =>
                        setSelectedTier(tier.value)
                      }
                      className={`flex-1 px-3 py-2 font-accent text-[10px] tracking-[0.2em] uppercase border transition-colors ${
                        selectedTier === tier.value
                          ? "text-emerald-400 border-emerald-400/40 bg-emerald-400/5"
                          : "text-[#909090] border-white/10 hover:border-white/20"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 검토 메모 */}
              <div className="mb-4">
                <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-2">
                  검토 메모
                </div>
                <textarea
                  value={reviewNote}
                  onChange={e => setReviewNote(e.target.value)}
                  placeholder="검토 의견을 입력하세요..."
                  rows={4}
                  className="w-full bg-[#0f0f0f] border border-white/10 px-3 py-2 text-sm text-[#f5f5f5] placeholder-[#909090] resize-none focus:outline-none focus:border-emerald-400/40 transition-colors"
                />
              </div>

              {/* 액션 버튼 */}
              <div className="space-y-2">
                <button
                  onClick={handleApprove}
                  className="w-full bg-emerald-500 text-black font-accent text-[10px] tracking-[0.3em] uppercase px-4 py-3 hover:bg-emerald-400 transition-colors"
                >
                  승인
                </button>
                <button
                  onClick={handleRequestChanges}
                  className="w-full bg-transparent text-amber-400 font-accent text-[10px] tracking-[0.3em] uppercase px-4 py-3 border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-400/5 transition-colors"
                >
                  수정 요청
                </button>
                <button
                  onClick={handleReject}
                  className="w-full bg-transparent text-red-400 font-accent text-[10px] tracking-[0.3em] uppercase px-4 py-3 border border-red-400/30 hover:border-red-400/60 hover:bg-red-400/5 transition-colors"
                >
                  반려
                </button>
              </div>
            </div>
          )}

          {/* 액션 완료 메시지 */}
          {actionDone && (
            <div className="bg-emerald-900/20 border border-emerald-400/30 p-6">
              <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-emerald-400 mb-2">
                처리 완료
              </div>
              <p className="text-[#e0e0e0] text-sm">
                {actionDone === "approved" &&
                  "작품이 승인되었습니다."}
                {actionDone === "changes_requested" &&
                  "수정 요청이 아티스트에게 전달되었습니다."}
                {actionDone === "rejected" &&
                  "작품이 반려 처리되었습니다."}
              </p>
            </div>
          )}

          {/* 발행 액션 (승인된 작품) */}
          {canPublish && !actionDone && (
            <div className="bg-[#1a1a1a] border border-white/5 p-6">
              <h3 className="font-accent text-[10px] tracking-[0.6em] uppercase text-emerald-400 mb-4">
                발행 관리
              </h3>
              <button
                onClick={() => {
                  window.alert(
                    `"${artwork.title}" 발행 완료!`
                  );
                  setActionDone("published");
                }}
                className="w-full bg-blue-600 text-white font-accent text-[10px] tracking-[0.3em] uppercase px-4 py-3 hover:bg-blue-500 transition-colors"
              >
                사이트에 발행
              </button>
            </div>
          )}

          {/* 큐레이션 등급 (검토 불가 상태에서 표시) */}
          {!canReview && artwork.curationTier && (
            <div className="bg-[#1a1a1a] border border-white/5 p-6">
              <div className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-2">
                큐레이션 등급
              </div>
              <div className="font-display text-2xl text-emerald-400">
                {artwork.curationTier}
              </div>
            </div>
          )}

          {/* 상태 타임라인 */}
          <div className="bg-[#1a1a1a] border border-white/5 p-6">
            <h3 className="font-accent text-[10px] tracking-[0.6em] uppercase text-[#909090] mb-4">
              상태 이력
            </h3>
            <StatusTimeline
              entries={artwork.statusHistory || []}
            />
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
