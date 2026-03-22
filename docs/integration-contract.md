# Integration Contract — LUMOS Platform Demo

## 외부 도구 역할 분담

| 도구 | 역할 | Source of Truth |
|------|------|-----------------|
| **Claude Code** | logic, auth, rbac, approval flow, 데이터 계약, 통합 | repo + docs |
| **Gemini 3.1 Pro** | visual/frontend 보강 워커 | Claude가 만든 계약 준수 |
| **Stitch MCP** | 디자인/프로토타입 참고 | repo가 최종 |
| **Vimeo** | 프리뷰 영상 호스팅 | repo metadata |
| **Codex** | QA 검증 | CODEX_QA_PROMPT |

## 데이터 계약

### Artwork
- 정의: `client/src/types/index.ts` → `Artwork` interface
- 목 데이터: `client/src/data/mockData.ts` → `MOCK_PORTAL_ARTWORKS`
- 상태 전이: `VALID_TRANSITIONS` (mockData.ts)

### User / Auth
- 정의: `client/src/types/index.ts` → `User`, `UserRole`
- 목 데이터: `MOCK_USERS`, `DEMO_ACCOUNTS` (mockData.ts)
- 컨텍스트: `client/src/contexts/AuthContext.tsx`
- 가드: `client/src/components/auth/RoleGuard.tsx`

### Inquiry
- 정의: `client/src/types/index.ts` → `Inquiry`, `InquiryStatus`, `ResizeRequest`
- 목 데이터: `MOCK_INQUIRIES` (mockData.ts)

## 공유 컴포넌트 계약

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| StatusBadge | `components/shared/StatusBadge.tsx` | 상태 뱃지 |
| StatusTimeline | `components/shared/StatusTimeline.tsx` | 상태 히스토리 |
| MetricCard | `components/shared/MetricCard.tsx` | 대시보드 지표 |
| FilterBar | `components/shared/FilterBar.tsx` | 필터/검색 |
| EmptyState | `components/shared/EmptyState.tsx` | 빈 상태 CTA |
| PortalShell | `components/shells/PortalShell.tsx` | 포털 레이아웃 |

## 라우트 소유권

- Public routes: Gemini Public Worker 보강 가능
- Portal routes: Gemini Portal Worker 보강 가능
- Auth/Guard/Flow logic: Claude 전용 — Gemini 수정 금지

## 병렬 작업 규칙

1. 페이지를 "별도 앱"처럼 만들지 말 것
2. 공통 shell + 공통 component + 공통 data contract 위에서 작업
3. public pages와 portal pages는 병렬 가능
4. auth/upload/approval/inquiry logic은 Claude 중심 통합
5. 최종 병합 전 shared component + data contract 일치 점검
