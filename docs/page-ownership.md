# LUMOS Page Ownership Contract

> 최종 수정: 2026-03-22
> 병렬 작업을 위한 페이지/영역 소유권 분리 계약.

---

## 원칙

1. 공통 shell + 공통 components 위에서 route group 단위로 분리
2. shared components 계약 먼저 고정 (design-contract.md)
3. mock data shape 먼저 고정 (source-of-truth.md 5절)
4. auth / role / status enum 먼저 고정 (source-of-truth.md 3-4절)

---

## 1. 공통 인프라 (Claude 담당)

| 파일 | 설명 |
|------|------|
| `types/index.ts` | 공유 타입 (Artwork, User, Inquiry, Enums) |
| `contexts/AuthContext.tsx` | Mock 인증 상태 |
| `lib/mockData.ts` | 데모용 목 데이터 |
| `lib/roleGuard.tsx` | ProtectedRoute, RoleGuard |
| `lib/statusMachine.ts` | 상태 전이 로직 |
| `components/Header.tsx` | IA 변경 반영 |
| `components/PortalShell.tsx` | 포탈 레이아웃 |
| `components/PortalSidebar.tsx` | 포탈 사이드바 |
| `components/StatusBadge.tsx` | 상태 배지 |
| `components/MetricCard.tsx` | 대시보드 카드 |
| `components/FilterBar.tsx` | 필터 바 |
| `components/EmptyState.tsx` | 빈 상태 |
| `components/StatusTimeline.tsx` | 상태 이력 |

---

## 2. Public Pages (시각=Gemini, 로직=Claude)

| 라우트 | 파일 | 상태 |
|--------|------|------|
| `/` | Home.tsx | 기존 유지 |
| `/explore` | Explore.tsx | 기존 확장 |
| `/artwork/:id` | ArtworkDetail.tsx | 기존 유지 |
| `/solutions` | Solutions.tsx | 신규 (Spaces 교체) |
| `/artists` | ArtistsDirectory.tsx | 신규 |
| `/about` | About.tsx | 기존 유지 |
| `/contact` | Contact.tsx | 신규 |
| `/auth/signin` | auth/SignIn.tsx | 신규 |

---

## 3. Artist Portal (시각=Gemini, 로직=Claude)

| 라우트 | 파일 |
|--------|------|
| `/artist/dashboard` | artist/Dashboard.tsx |
| `/artist/works` | artist/Works.tsx |
| `/artist/works/:id` | artist/WorkDetail.tsx |
| `/artist/upload` | artist/Upload.tsx |

---

## 4. Admin Portal (시각=Gemini, 로직=Claude)

| 라우트 | 파일 |
|--------|------|
| `/admin/dashboard` | admin/Dashboard.tsx |
| `/admin/artworks` | admin/Artworks.tsx |
| `/admin/artworks/:id` | admin/ArtworkDetail.tsx |
| `/admin/artists` | admin/Artists.tsx |
| `/admin/inquiries` | admin/Inquiries.tsx |

---

## 5. 구현 순서

```
1. types/index.ts
2. lib/mockData.ts
3. contexts/AuthContext.tsx
4. lib/roleGuard.tsx + statusMachine.ts
5. 공통 UI (StatusBadge, MetricCard 등)
6. Header.tsx 수정
7. PortalShell + Sidebar
8. Auth pages
9. Artist portal pages
10. Admin portal pages
11. App.tsx 라우터
12. QA + cleanup
```

---

## 6. 제거 대상

- `/vault` 라우트 + Vault.tsx
- 기존 `/dashboard` 라우트 + Dashboard.tsx
- 기존 `/upload` 라우트 + Upload.tsx
- 기존 `/auth` 라우트 + Auth.tsx
- Header.tsx의 Home 탭, THISGLOBAL 링크
