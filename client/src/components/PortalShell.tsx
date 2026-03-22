// PortalShell — 포털 레이아웃 래퍼 (Header + Sidebar + Content)
import React from "react";
import Header from "@/components/Header";
import { PortalSidebar } from "@/components/PortalSidebar";

interface PortalShellProps {
  children: React.ReactNode;
  portalType?: "artist" | "admin";
  role?: "artist" | "admin"; // portalType 별칭
  title?: string; // 페이지 제목 (상단 바)
}

export const PortalShell: React.FC<PortalShellProps> = ({
  children,
  portalType,
  role,
  title,
}) => {
  // role prop을 portalType 별칭으로 지원
  const resolvedType = portalType ?? role ?? "artist";
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* 글로벌 헤더 */}
      <Header />

      {/* 헤더 높이만큼 패딩 */}
      <div className="flex pt-16">
        {/* 사이드바 */}
        <PortalSidebar portalType={resolvedType} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 ml-60 p-6 min-h-[calc(100vh-4rem)]">
          {title && (
            <h1 className="font-display text-2xl text-white mb-6">{title}</h1>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};
