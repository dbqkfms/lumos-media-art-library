# LUMOS Source of Truth

> 최종 수정: 2026-03-22
> 이 문서는 프로젝트의 단일 진실 소스(Single Source of Truth)입니다.
> CLAUDE.md, PROJECT_SUMMARY.md 등 기존 문서와 충돌하는 부분은 **이 문서가 우선**합니다.

---

## 1. LUMOS 정의

**LUMOS** — Screen-native AI media art library + platform demo, B2B-first.

LED/디지털 디스플레이를 위한 큐레이션 미디어아트 콘텐츠 라이브러리이자
공간 맞춤형 솔루션 플랫폼 데모.

- **사이트 구조**: 하나의 사이트 안에서 **공개 탐색 레이어**(Public Shell) + **로그인 포털 레이어**(Portal Shell)로 통합
- **운영사**: hardware/install partner (확정 전까지 중립 표기)
- **타겟**: B2B — 호텔, 갤러리, 카페, 리테일, 오피스, 퍼블릭 공간 운영자

> **TODO (CLAUDE.md 충돌)**: CLAUDE.md에 "운영사: This Global (디스글로벌) [확정]"으로 되어 있으나,
> 확정 전까지 대외 문서에서는 "hardware/install partner"로 중립 표기한다.

---

## 2. 콘텐츠 체계 변경

### 2.1 테마: 고정 10대 → 동적 태그/컬렉션

**이전 (폐기)**: 고정 10대 테마 카테고리 (Oriental, Abstract, Cosmic, Light, ...)

**현재 (적용)**:
- 작품에는 자유로운 `tags: string[]` 배열로 태깅
- 프론트엔드에서 **컬렉션**(Collection) 단위로 동적 그룹핑
- 컬렉션은 수동 큐레이션 또는 태그 기반 자동 생성 가능
- `category` 필드는 하위 호환을 위해 유지하되, 필터링의 1차 기준은 `tags`

```typescript
// 이전: category = "Oriental" (고정 enum)
// 현재: tags = ["한국미", "전통", "동양화", "수묵"] (자유 태깅)
// 컬렉션: { id: "korean-heritage", name: "한국의 미", filter: tag => ["한국미","전통"].includes(tag) }
```

> **TODO (CLAUDE.md 충돌)**: CLAUDE.md의 "콘텐츠: Oriental, Abstract, Cosmic, Light" 고정 목록은
> 태그 예시로만 참고하고, 고정 카테고리로 취급하지 않는다.

### 2.2 Grade: 공개 전제 → 내부 운영용

**이전 (폐기)**: Grade A/B/C 공개 표시 — 사이트에서 등급 노출

**현재 (적용)**:
- `curationTier?: "A" | "B" | "C"` — **내부 운영용 필드**, 외부 노출 금지
- 큐레이션 우선순위, 추천 알고리즘, 내부 리포트에만 사용
- 프론트엔드에서 tier를 표시하는 UI는 만들지 않는다

### 2.3 프리뷰: 10초 고정 → configurable previewPolicy

**이전 (폐기)**: 모든 작품 10초 프리뷰 고정

**현재 (적용)**:
```typescript
interface PreviewPolicy {
  mode: "duration" | "percentage" | "full";
  value?: number;  // duration: 초 단위, percentage: 0-100
  watermark: boolean;
  maxResolution: "720p" | "1080p" | "original";
}

// 기본값
const defaultPreviewPolicy: PreviewPolicy = {
  mode: "duration",
  value: 15,          // 기본 15초 (10초 고정이 아님)
  watermark: true,
  maxResolution: "720p",
};
```

- 작품별로 다른 프리뷰 정책 적용 가능
- 관리자가 전역/작품별 설정

---

## 3. 사이트 아키텍처

### 3.1 단일 사이트 통합

**이전 (폐기)**: 플랫폼과 라이브러리를 별도 사이트로 분리

**현재 (적용)**:
- **하나의 사이트**, 두 개의 셸:
  - **Public Shell**: 비로그인 사용자 — 갤러리 탐색, 솔루션 안내, 문의
  - **Portal Shell**: 로그인 사용자 — artist dashboard, admin dashboard, buyer dashboard
- 공통 Header, 공통 Footer, 공통 디자인 토큰 공유
- Portal Shell은 Public Shell 위에 레이어로 추가 (별도 앱 아님)

### 3.2 IA (Information Architecture)

**상단 메인 내비게이션** (고정):
```
[LOGO → /]  Explore  Solutions  Artists  About  Contact  [Sign In / Profile]
```

- **Home 탭 제거** — 로고 클릭으로 Home 이동
- **Artist Portal / Admin은 메인 탭 금지** — 로그인 후 profile utility에서 접근

**Mega Menu 구조**:
| 탭 | 하위 항목 |
|----|----------|
| Explore | LUMOS Originals > STANDARD / LOCAL, Creator Works, By Space, Collections |
| Solutions | Hospitality, Retail, F&B, Office, Public/Exhibition, Licensing, Inquiry |
| Artists | Directory, Apply, Artist Portal (로그인 시) |
| About | — |
| Contact | — |

### 3.3 역할 (Roles)

| 역할 | 설명 | 접근 가능 |
|------|------|----------|
| `guest` | 비로그인 방문자 | Public Shell 전체 |
| `buyer` | 로그인한 공간 운영자/바이어 | Public + 문의 이력 + 라이선스 관리 |
| `artist` | 등록된 아티스트 | Public + Artist Dashboard/Works/Upload |
| `admin` | 관리자 | Public + Admin Dashboard 전체 |

### 3.4 라우트 구조

**Public Routes**:
```
/                       Home
/explore                갤러리 통합 탐색
/explore/standard       STANDARD 작품
/explore/local          LOCAL 작품
/explore/creators       Creator Works
/explore/spaces/:type   공간별 탐색
/explore/collections/:id 컬렉션별 탐색
/artwork/:id            작품 상세
/solutions              솔루션 랜딩
/solutions/:type        솔루션 상세 (hospitality, retail, fnb, office, public)
/artists                아티스트 디렉토리
/artists/:id            아티스트 프로필
/about                  About
/contact                Contact
/auth/signin            로그인
/auth/signup            회원가입
```

**Artist Portal Routes** (role: artist):
```
/artist/dashboard       아티스트 대시보드
/artist/works           내 작품 목록
/artist/works/:id       작품 상세/편집
/artist/upload          작품 업로드
/artist/profile         프로필 관리
```

**Admin Portal Routes** (role: admin):
```
/admin/dashboard        관리자 대시보드
/admin/artworks         작품 관리
/admin/artworks/:id     작품 상세/승인
/admin/artists          아티스트 관리
/admin/inquiries        문의 관리
/admin/inquiries/:id    문의 상세
/admin/settings         설정
```

---

## 4. 작품 상태 체계

```
Draft → Submitted → Under Review → [Changes Requested ↔ Submitted] → Approved → Published → Hidden/Archived
```

| 상태 | 설명 | 전환 주체 |
|------|------|----------|
| `draft` | 아티스트 작성 중 | artist |
| `submitted` | 제출됨, 검토 대기 | artist |
| `under_review` | 관리자 검토 중 | admin |
| `changes_requested` | 수정 요청됨 | admin |
| `approved` | 승인됨, 발행 대기 | admin |
| `published` | 사이트에 공개됨 | admin |
| `hidden` | 일시 비공개 | admin |
| `archived` | 영구 보관 | admin |

---

## 5. 확장된 데이터 모델

```typescript
// 기존 Artwork 확장
interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;              // 하위 호환용, 1차 기준은 tags
  tags: string[];                // 동적 태그
  image: string;                 // 썸네일
  videoSrc?: string;             // 영상 URL
  displayType: "Horizontal" | "Vertical";
  runtime: string;
  resolution: string;
  worldType: "standard" | "local";
  artist: string;                // 아티스트 ID 또는 이름
  artistId?: string;             // 아티스트 계정 ID
  format?: string;
  status: ArtworkStatus;
  curationTier?: "A" | "B" | "C";  // 내부 운영용만
  previewPolicy?: PreviewPolicy;
  submittedAt?: string;          // ISO date
  reviewedAt?: string;
  publishedAt?: string;
  reviewNotes?: string;          // 관리자 리뷰 메모
  statusHistory?: StatusHistoryEntry[];
  collection?: string;           // 소속 컬렉션 ID
}

type ArtworkStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "changes_requested"
  | "approved"
  | "published"
  | "hidden"
  | "archived";

interface StatusHistoryEntry {
  status: ArtworkStatus;
  changedBy: string;             // userId
  changedAt: string;             // ISO date
  note?: string;
}

interface PreviewPolicy {
  mode: "duration" | "percentage" | "full";
  value?: number;
  watermark: boolean;
  maxResolution: "720p" | "1080p" | "original";
}

// 사용자
interface User {
  id: string;
  email: string;
  name: string;
  role: "guest" | "buyer" | "artist" | "admin";
  avatar?: string;
  bio?: string;
  portfolio?: string;
  createdAt: string;
}

// 문의
interface Inquiry {
  id: string;
  buyerName: string;
  buyerEmail: string;
  buyerCompany?: string;
  spaceType?: string;
  artworkId?: string;
  message: string;
  status: "new" | "contacted" | "proposal_sent" | "negotiating" | "closed_won" | "closed_lost";
  createdAt: string;
  updatedAt: string;
  notes?: string;
  resizeRequest?: ResizeRequest;
}

interface ResizeRequest {
  targetWidth: number;
  targetHeight: number;
  targetOrientation: "Horizontal" | "Vertical";
  notes?: string;
  status: "requested" | "in_progress" | "completed" | "rejected";
}
```

---

## 6. 범위 제한

### 구현하지 않는 것
- ❌ 결제/정산
- ❌ CMS/transmission 시스템
- ❌ 이메일 발송 (필수 아님)
- ❌ 제3의 World

### happy path로 동작해야 하는 것
- ✅ Sign in / Sign out
- ✅ Role guard (guest → buyer → artist → admin)
- ✅ Artist: upload → submit → status 확인
- ✅ Admin: review → approve/reject/changes_requested
- ✅ Buyer: inquiry → resize request
- ✅ Status history timeline

---

## 7. 충돌 목록 (TODO)

| 기존 문서 | 충돌 내용 | 조치 |
|----------|----------|------|
| CLAUDE.md L7 | "운영사: This Global (디스글로벌) [확정]" | 대외 표기 시 "hardware/install partner"로 중립화 |
| CLAUDE.md L27-28 | 고정 카테고리 "Oriental, Abstract, Cosmic, Light" | 태그 예시로만 참고, 고정 enum 아님 |
| CLAUDE.md L344-357 | "아직 빌드하지 않을 것: 사용자 인증, CRM/Admin" | 이 프로젝트에서는 demo 수준으로 구현 |
| CLAUDE.md L157-161 | "/upload, /dashboard, /vault, /auth 제거 대상" | 새 경로로 교체 (/artist/*, /admin/*) |
| PROJECT_SUMMARY.md | 전체적으로 MVP 쇼룸 기준 설명 | platform demo 관점으로 읽을 것 |
| Header.tsx | Home 탭 존재, 메가메뉴 구조 상이 | IA 변경에 맞게 수정 필요 |
