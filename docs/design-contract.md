# LUMOS Design Contract

> 최종 수정: 2026-03-22
> 이 문서는 모든 UI 구현의 시각적 계약이다. 일관성을 위해 반드시 준수.

---

## 1. Design Tokens

### 1.1 Colors

```
/* --- Accent --- */
--gold:           #D4A843
--gold-hover:     #F0C060
--gold-dim:       #B8922F
--gold-glow:      rgba(212, 168, 67, 0.12)

--blue:           #93C5FD
--blue-hover:     #BFDBFE
--blue-dim:       #60A5FA
--blue-glow:      rgba(147, 197, 253, 0.12)

/* --- Surfaces --- */
--bg-deep:        #0a0a0a
--bg-surface:     #0f0f0f
--bg-elevated:    #1a1a1a
--bg-card:        #111111
--bg-overlay:     rgba(0, 0, 0, 0.85)

/* --- Text --- */
--text-primary:   #f5f5f5
--text-heading:   #e0e0e0
--text-secondary: #909090
--text-muted:     #666666

/* --- Border --- */
--border-subtle:  rgba(255, 255, 255, 0.05)
--border-default: rgba(255, 255, 255, 0.08)
--border-hover:   rgba(255, 255, 255, 0.15)

/* --- Status --- */
--status-draft:        #6B7280
--status-submitted:    #F59E0B
--status-under-review: #8B5CF6
--status-changes:      #EF4444
--status-approved:     #10B981
--status-published:    #3B82F6
--status-hidden:       #9CA3AF
--status-archived:     #4B5563
```

### 1.2 Typography

| Role | Font | Size | Weight | Tracking | Class |
|------|------|------|--------|----------|-------|
| Display | Playfair Display | 48-72px | 400 | normal | `font-display` |
| Heading | Playfair Display | 24-36px | 400 | normal | `font-display` |
| Label | Inter | 9-10px | 500 | 0.6em | `font-accent tracking-[0.6em] uppercase` |
| Body | Pretendard | 14-16px | 400 | normal | `font-body` |
| Small | Inter | 12-13px | 400 | 0.05em | `font-accent text-xs` |

### 1.3 Spacing Scale (rem)

```
--space-1: 0.25rem (4px)
--space-2: 0.5rem  (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem    (16px)
--space-6: 1.5rem  (24px)
--space-8: 2rem    (32px)
--space-12: 3rem   (48px)
--space-16: 4rem   (64px)
--space-24: 6rem   (96px)
```

### 1.4 Border Radius

**모든 컴포넌트: 0** (Luminous Brutalism 원칙)

유일한 예외: Avatar (rounded-full)

---

## 2. Navigation / Mega Menu

### 2.1 Header

```
[LOGO]  Explore  Solutions  Artists  About  Contact  |  [Sign In] or [Avatar]
```

- 고정 상단 (`fixed top-0 z-50`)
- 투명 -> 스크롤 시 `bg-black/90 backdrop-blur-xl border-b border-white/8`
- 로고 클릭 -> `/`
- Home 텍스트 탭 없음

### 2.2 Mega Menu 규칙

| 탭 | 하위 |
|----|------|
| **Explore** | LUMOS Originals (STANDARD / LOCAL), Creator Works, By Space, Collections |
| **Solutions** | Hospitality, Retail, F&B, Office, Public/Exhibition, Licensing, Inquiry |
| **Artists** | Directory, Apply, Artist Portal (로그인 artist만) |

- 호버 트리거, 200ms ease-out 진입
- 배경: `bg-[#0a0a0a]/98 backdrop-blur-2xl`
- STANDARD 하위: 골드 액센트
- LOCAL 하위: 블루 액센트
- 메가메뉴 너비: `w-[820px]` max, 중앙 정렬

### 2.3 Profile Utility (로그인 후)

- 아바타 + 드롭다운
- 항목: My Dashboard, My Works (artist), Admin (admin), Settings, Sign Out
- 포탈 진입점은 여기서만 노출

---

## 3. Shell 구조

### 3.1 Public Shell

```
<Header />
<main>
  <Route ... />
</main>
<FloatingCTA />
<Footer />
```

- 배경: `--bg-deep`
- 모든 public 페이지 공유

### 3.2 Portal Shell

```
<Header />
<div className="flex">
  <PortalSidebar />     (240px)
  <main className="flex-1">
    <PortalTopBar />
    <Route ... />
  </main>
</div>
```

- 배경: `--bg-surface`
- 사이드바: `--bg-deep` + `border-r border-white/8`
- 아티스트 포탈: 골드 액센트
- 어드민 포탈: 에메랄드 액센트 (#10B981)

---

## 4. Artwork Card 규격

### 4.1 Gallery Card (Public)

```
+-----------------------------+
|  [Thumbnail 16:9]           |
|                             |
|  > (호버 시 오버레이)         |
+-----------------------------+
|  STANDARD . Oriental         |  <- font-accent, 골드/블루
|  산수 (山水)                  |  <- font-display text-lg
|  1280x720 . Horizontal       |  <- text-xs text-muted
+-----------------------------+
```

- 크기: min-w-[280px], max-w-[380px]
- 테두리: `border border-white/5`
- 호버: `border-white/15` + 미세 스케일 1.02
- STANDARD: 골드 라벨, LOCAL: 블루 라벨

### 4.2 Portal Card (Artist Works)

- 가로 레이아웃 (list view) + 상태 배지 포함
- 썸네일 120x68 + 제목/메타/상태 우측 배치

---

## 5. Status Badge 규격

| 상태 | 배경 | 텍스트 |
|------|------|--------|
| draft | gray-800 | gray-400 |
| submitted | amber-900/30 | amber-400 |
| under_review | purple-900/30 | purple-400 |
| changes_requested | red-900/30 | red-400 |
| approved | emerald-900/30 | emerald-400 |
| published | blue-900/30 | blue-400 |
| hidden | gray-800 | gray-500 |
| archived | gray-900 | gray-600 |

- `font-accent text-[10px] tracking-widest uppercase px-3 py-1`
- `border-radius: 0` (brutalism)

---

## 6. Dashboard Metric Card

```
+---------------------+
|  Total Works         |  <- font-accent text-xs, text-muted
|  24                  |  <- font-display text-3xl
|  up 3 this month     |  <- text-xs text-emerald-400
+---------------------+
```

- 1/4 width grid, `--bg-elevated`, `border border-white/5`

---

## 7. Empty State / CTA / Filter Bar

### Empty State
- 중앙 정렬 아이콘 + 제목 + 설명 + CTA 버튼

### Filter Bar
- `[Search ___]  [World v]  [Status v]  [Category v]  [Sort v]`
- 한 줄 가로, border-radius: 0

### CTA Button Variants

| Variant | Style | 용도 |
|---------|-------|------|
| primary-gold | `bg-[#D4A843] text-black hover:bg-[#F0C060]` | STANDARD |
| primary-blue | `bg-[#93C5FD] text-black hover:bg-[#BFDBFE]` | LOCAL |
| ghost | `bg-transparent border border-white/10 text-white` | 보조 |
| danger | `bg-red-900/30 text-red-400` | 삭제/거부 |

---

## 8. STANDARD / LOCAL / Creator Works 시각 구분

| 속성 | STANDARD | LOCAL | Creator Works |
|------|----------|-------|---------------|
| 액센트 | #D4A843 (골드) | #93C5FD (블루) | #A78BFA (퍼플) |
| 배지 | STANDARD | LOCAL | CREATOR |
| 글로우 | gold | blue | purple |

---

## 9. Route Naming 규칙

- Public: `/explore`, `/solutions`, `/artists`, `/about`, `/contact`
- Auth: `/auth/signin`, `/auth/signup`
- Artist: `/artist/dashboard`, `/artist/works`, `/artist/upload`
- Admin: `/admin/dashboard`, `/admin/artworks`, `/admin/artists`, `/admin/inquiries`

---

## 10. Mock Data Shape (source-of-truth.md 5절 참조)

```typescript
Artwork: { id, title, description, category, tags[], image, videoSrc?,
  displayType, runtime, resolution, worldType, artist, artistId?,
  status, curationTier?, previewPolicy?, statusHistory[] }

User: { id, email, name, role, avatar?, bio?, portfolio?, createdAt }

Inquiry: { id, buyerName, buyerEmail, buyerCompany?, spaceType?,
  artworkId?, message, status, createdAt, updatedAt, resizeRequest? }
```
