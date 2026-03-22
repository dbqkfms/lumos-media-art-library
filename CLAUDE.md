# CLAUDE.md — LUMOS 안티그래비티

> 전략 문서: `LUMOS-제품전략.md` (프로젝트 루트) 참조 — 전체 A-L 산출물, 경쟁 분석, 사업자료 구조 포함.

## 제품 정의

**LUMOS** — LED/디지털 디스플레이를 위한 큐레이션 미디어아트 콘텐츠 라이브러리이자 공간 맞춤형 솔루션. [확정]

**핵심 질문**: "하드웨어 설치 후, 무엇을 틀 것인가?"
**브랜드 코어**: One Brand, Two Worlds — 공간의 품격을 빛으로 완성합니다.

- **운영사**: This Global (디스글로벌) [확정]
- **타겟 고객**: 호텔 로비, 미술관, 갤러리, 카페, 레스토랑, 리테일, 오피스 공간 운영자
- **비즈니스 모델**: B2B 문의 → 컨설팅 → 콘텐츠 라이선싱 + 설치 서비스
- **브랜드 철학**: Luminous Brutalism — border-radius 0, 화이트스페이스와 타이포그래피로 우아함
- **해자(Moat)**: 한국적 정체성 콘텐츠, 큐레이션 역량, 공간 맞춤 추천, 유통/운영 구조
- **해자가 아닌 것**: ❌ "AI로 만들었다" ❌ "많은 콘텐츠" ❌ "싼 가격"

---

## Dual-World 구조: STANDARD / LOCAL

### STANDARD (공간 지배형, 프리미엄) [확정]
- **성격**: 강한 존재감, 랜드마크성
- **타겟**: 미술관, 갤러리, 럭셔리 호텔, 하이엔드 상업 공간
- **테마**: 다크 배경 (#0a0a0a) + 골드 액센트 (#D4A843)
- **콘텐츠**: 글로벌 스탠다드, 보편적 아름다움 — Oriental, Abstract, Cosmic, Light
- **ID 접두사**: `standard-`

### LOCAL (공간 조화형, 상업) [확정]
- **성격**: 저피로, 일상 친화
- **타겟**: 카페, 레스토랑, 비즈니스 호텔, 오피스, 리테일, 대기 공간
- **테마**: 다크 기본 + 블루 액센트 (#93C5FD)
- **콘텐츠**: 한국 전통미 + 자연 — Korean Heritage, Nature, Traditional, Seasonal, Ambient
- **ID 접두사**: `local-` 또는 managed 작품의 worldType: "local"

> **중요**: 모든 페이지가 다크 베이스. LOCAL은 "라이트 테마"가 아니라 블루 액센트의 다크 테마.
> **금지**: 제3의 World를 추가하지 않는다. STANDARD와 LOCAL 두 축만 유지.

### 이중 탐색 구조: World × Space [논의중]
World(STANDARD/LOCAL)와 Space(공간 유형)를 교차 탐색 가능:

| Space 유형 | 한글 라벨 | 추천 World | 하위 공간 |
|-----------|-----------|-----------|-----------|
| hotel | 호텔 & 리조트 | 둘 다 | 로비, 라운지, 복도, 컨퍼런스 |
| gallery | 갤러리 & 뮤지엄 | STANDARD | 상설관, 기획관, 로비 |
| fnb | F&B | LOCAL | 카페, 레스토랑, 바, 베이커리 |
| retail | 리테일 | LOCAL | 매장 파사드, 쇼윈도, VMD |
| office | 오피스 | LOCAL | 로비, 라운지, 미팅룸 |
| public | 퍼블릭 & 메디컬 | 둘 다 | 공항, 지하철, 병원, 문화센터 |

---

## 현재 MVP: Web Gallery + Inquiry 쇼룸 [확정]

**정의**: 작품 탐색 → 공간 적합성 확인 → 문의 전환 → 수동 제안/납품의 B2B 쇼룸.
**MVP에 없는 것**: 결제, 정산, 사용자 인증, 아티스트 업로드, CRM, 자동 견적.

### 구현 완료
- [x] Home — 풀스크린 히어로 + 50/50 World Split
- [x] STANDARD Gallery — 프리미엄 작품 그리드 (18개 정적)
- [x] LOCAL Gallery — 상업 작품 그리드
- [x] ArtworkDetail — 영상 + 설치 시뮬레이션 (15환경) + 쇼룸 모드
- [x] FloatingCTA — 문의 폼 (Formspree)
- [x] Header 메가 메뉴 + Explore/Spaces/About
- [x] Express 서버 — SPA 서빙 + POST /api/contact (Nodemailer)
- [x] Content Manager — 작품 관리 파이프라인 (FastAPI)

### 즉시 개선 필요 (Sprint 1) [확정]
- [ ] 🔴 원본 보호: 프리뷰 워터마크 + 저해상도 전환
- [ ] 🟡 "ACQUIRE LICENSE (0.5 ETH)" 버튼 제거/변경
- [ ] 🟡 미구현 페이지 정리: Auth/Dashboard/Vault/Upload 비활성화 or 제거
- [ ] 🟡 문의 폼: 작품명 자동 전달 + 공간 유형 드롭다운 추가

### 단기 추가 구현 (Sprint 2-3) [논의중]
- [ ] For Spaces 페이지: 공간별 큐레이션 랜딩
- [ ] Projects 페이지: 설치 사례 (시뮬레이션 기반 가상 사례로 시작)
- [ ] Licensing & Specs 페이지: 가격 체계 + 기술 스펙 + FAQ
- [ ] Contact 풀페이지: 상세 문의 폼

---

## 미래 플랫폼: Transaction Platform [아이디어]

**전환 시기**: MVP 검증 → 유료 고객 10+ → 크리에이터 공급 확대 필요 시

### Phase 2 (6M): 인증 + CRM
- 사용자 인증 / 클라이언트 대시보드
- 문의 관리 CRM 통합
- 라이선스 상태 추적

### Phase 3 (12M): 아티스트 플랫폼 (옵션)
- 외부 크리에이터 참여 — **신청+검수형 (공개 업로드 아님)**
- 작품 제출 → 큐레이션 → 승인/반려
- 아티스트 정산

### Phase 4 (18M+): 거래 자동화
- 라이선스 거래 자동화 + 결제
- 해외 확장

> ⚠️ **경계 규칙**: 미래 계획을 현재 구현으로 오인하게 만드는 UI를 남기지 않는다.
> Auth, Dashboard, Vault, Upload 페이지는 실제 동작하지 않으면 제거하거나 "Coming Soon" 처리.

---

## 필수 용어 사전

| 용어 | 정의 | 금지 혼동 |
|------|------|-----------|
| **LUMOS** | 제품 브랜드명 | ≠ 회사명 |
| **This Global** | 운영 회사명 (디스글로벌) | ≠ LUMOS |
| **STANDARD** | 공간 지배형 프리미엄 콘텐츠 라인 (골드 #D4A843) | ≠ "기본", ≠ "표준" |
| **LOCAL** | 공간 조화형 상업 콘텐츠 라인 (블루 #93C5FD) | ≠ "로컬", ≠ "지역" |
| **World** | STANDARD 또는 LOCAL 분류 | 제3의 World 추가 금지 |
| **Space** | 공간 유형 (호텔, 카페, ...). World와 교차 축 | ≠ World |
| **작품 (Artwork)** | 미디어아트 영상 콘텐츠 1건 | ≠ 이미지, ≠ 썸네일 |
| **큐레이션** | 품질+적합성 기반 선별 | ≠ 자동 추천 |
| **설치 시뮬레이션** | SVG 기반 공간 프리뷰 (15개 환경) | ≠ "시뮬레이터" |
| **쇼룸 모드** | 풀스크린 블랙 배경 재생 | ≠ "전체화면" |
| **FloatingCTA** | 우하단 골드 버튼 → 문의 폼 | ≠ "채팅", ≠ "챗봇" |
| **Content Manager (CM)** | FastAPI 백엔드 작품 관리 도구 | ≠ CMS, ≠ 메인 사이트 |
| **해자 (Moat)** | 한국 정체성, 큐레이션, 공간 적합성 | ≠ AI 기술 자체 |
| **MVP** | Web Gallery + Inquiry 쇼룸 | ≠ 마켓플레이스 |
| **Platform** | 미래 크리에이터-바이어 거래형 | ≠ 현재 |
| **Luminous Brutalism** | 디자인 철학: border-radius 0 + 우아한 여백 | ≠ 일반 brutalism |
| **displayType** | "Horizontal" 또는 "Vertical" (LED 방향) | 항상 영문 대문자 시작 |

---

## 라우트 / 페이지 구조

### 필수 네비게이션 축 [확정]

| 축 | 경로 | 컴포넌트 | 상태 |
|------|------|----------|------|
| Home | `/` | Home | ✅ 구현 (리뉴얼 필요) |
| STANDARD | `/standard` | StandardWorld | ✅ 구현 |
| LOCAL | `/local` | LocalWorld | ✅ 구현 |
| For Spaces | `/spaces` | Spaces | 🔸 존재 (리뉴얼 필요) |
| Projects | `/projects` | Projects | ❌ 미구현 |
| Licensing & Specs | `/licensing` | Licensing | ❌ 미구현 |
| About | `/about` | About | ✅ 구현 |
| Contact | `/contact` | Contact | 🔸 FloatingCTA만 |

### 기타 라우트

| 경로 | 컴포넌트 | 상태 |
|------|----------|------|
| `/artwork/:id` | ArtworkDetail | ✅ 구현 |
| `/explore` | Explore | ✅ 구현 |
| `/spaces/:type` | SpaceDetail | ❌ 미구현 [논의중] |

### 제거/비활성화 대상 [확정]

| 경로 | 이유 |
|------|------|
| `/upload` | Phase 3 범위. 미구현 UI가 오해 유발 |
| `/dashboard` | Phase 2 범위. 인증 미구현 |
| `/vault` | Phase 2 범위. 프론트엔드 전용, "ACQUIRE LICENSE" 포함 |
| `/auth` | Phase 2 범위. 인증 미구현 |

---

## Buyer Flow (문의 여정) [확정]

```
유입 → 탐색(STANDARD/LOCAL/For Spaces) → 작품/공간 적합성 확인
→ 문의 → 제안 → 리사이징/커스텀 → 계약 → 납품
```

| 단계 | 사이트 내 | 사이트 외 |
|------|----------|----------|
| 1. 유입 | URL, 검색, 소개 | — |
| 2. 탐색 | 갤러리, For Spaces, Explore | — |
| 3. 확신 | 시뮬레이션, 스펙, Projects | — |
| 4. 문의 | FloatingCTA, Contact | — |
| 5. 제안 | — | 이메일 제안서 |
| 6. 커스텀 | — | 리사이징/편집 |
| 7. 계약 | — | 계약서 서명 |
| 8. 납품 | — | 원본 파일 전달 |

**현재 한계** (즉시 개선 대상):
- Formspree 무료 플랜 (월 50건)
- 작품명이 폼에 자동 전달되지 않음
- 공간 유형, 회사명 필드가 FloatingCTA에 없음
- CRM 연동 없음, 문의 추적 불가

---

## Ops Flow (운영 여정) [논의중]

```
작품 등록/태깅 → 프리뷰 관리 → 문의 관리 → 제안 이력 → 납품 이력 → 라이선스 상태 관리
```

- 현재는 Content Manager + Gmail + 스프레드시트로 수동 운영
- 문의 월 20건 이상 시 CRM/Admin 대시보드 개발 검토

---

## 아티스트 승인 플로우 — 옵션 [아이디어]

> ⚠️ 이 플로우는 아티스트 참여가 실제 범위에 포함될 때만 활성화.
> 현재 LUMOS는 공개 업로드형 플랫폼이 **아니다** — 신청+검수형 모델.

현재: This Global 자체 큐레이션 + Content Manager 수동 관리.
미래 (Phase 3+): 외부 크리에이터 지원서 → 검수 → 승인/반려.

---

## 원본 보호 원칙 [확정]

| 단계 | 보호 수준 | 설명 |
|------|-----------|------|
| 사이트 프리뷰 | 저해상도 + 워터마크 | 탐색/확인용 |
| 이메일 샘플 | 중해상도 + 워터마크 | 제안서 첨부용 |
| 계약 후 납품 | 풀 해상도 원본 | 설치용 |

🔴 **현재 문제**: /videos/ 에 풀 해상도 원본이 공개 서빙됨. 즉시 대응 필요.

---

## 사업자료 핵심 논리 [확정]

### 대외 설명 3질문
1. **왜 이걸 하는가**: "LED 설치 후 뭘 틀지 모른다" → 큐레이션 콘텐츠 라이브러리
2. **지금 어디까지인가**: MVP 쇼룸 완성, 56개 영상 DB, 문의 시스템 동작
3. **어떻게 플랫폼이 되는가**: 유료 고객 확보 → 크리에이터 확대 → 거래 자동화

### 금지 표현
- ❌ "AI로 만든 미디어아트" → 해자가 아님
- ❌ 과장 시장 수치 단일 제시 → TAM-SAM-SOM 논리 사용
- ❌ 미래 계획을 현재 traction으로 포장
- ❌ 미구현 기능을 "구현 완료"로 표현

### 경쟁사 비교 대상
Niio, d'strict/LED.ART, Artcast, Samsung Art Store/VXT
→ 상세 비교: `LUMOS-제품전략.md` 섹션 H 참조

---

## 기술 스택

| 레이어 | 기술 | 버전 |
|--------|------|------|
| 프레임워크 | React | 19.2.1 |
| 빌드 | Vite | 7.1.7 |
| 언어 | TypeScript | 5.6.3 (strict) |
| 스타일링 | Tailwind CSS v4 | @tailwindcss/vite |
| 컴포넌트 | shadcn/ui (Radix UI) | 50+ 컴포넌트 |
| 라우팅 | Wouter | 3.3.5 (패치됨) |
| 애니메이션 | Framer Motion | 12.23.22 |
| 서버 | Express | 4.21.2 |
| 이메일 | Nodemailer + Formspree | Gmail SMTP |
| 패키지 매니저 | pnpm | 10.4.1+ |
| 폰트 | Playfair Display, Inter, Pretendard | Google Fonts |

---

## 빌드 / 실행 명령어

```bash
pnpm install          # 의존성 설치
pnpm dev              # Vite 개발 서버 (port 3000, --host)
pnpm build            # Vite 클라이언트 + esbuild 서버 → dist/
pnpm start            # 프로덕션 서버 (NODE_ENV=production)
pnpm check            # TypeScript 타입체크 (tsc --noEmit)
pnpm format           # Prettier 포매팅
```

**테스트**: 아직 미구성 (vitest 설치됨, 테스트 파일 없음)

---

## 경로 별칭 (Path Aliases)

| 별칭 | 실제 경로 |
|------|-----------|
| `@/` | `client/src/` |
| `@shared/` | `shared/` |
| `@assets/` | `attached_assets/` |

vite.config.ts와 tsconfig.json 양쪽에 설정됨.

---

## 디자인 시스템 규칙

### 색상
- STANDARD 골드: `#D4A843` (기본), `#F0C060` (hover), `#B8922F` (dim)
- LOCAL 블루: `#93C5FD` (기본), `#BFDBFE` (hover)
- 배경: `#0a0a0a` → `#0f0f0f` → `#1a1a1a` (surface 레이어)
- 텍스트: `#f5f5f5` (기본), `#e0e0e0` (제목), `#909090` (보조)

### 타이포그래피
- `font-display` (Playfair Display): 대형 제목, 히어로 텍스트
- `font-accent` (Inter): 라벨, 버튼, 메타데이터 — 항상 `text-[10px] tracking-widest`
- `font-body` (Pretendard): 한글 본문

### 핵심 규칙
- **모든 border-radius: 0** (Luminous Brutalism)
- 버튼 클래스: `btn-brutalist` (STANDARD), `btn-brutalist-blue` (LOCAL)
- 카드: `bg-transparent border border-white/5`
- 글로우: `box-shadow: 0 0 30px ${accent}20`
- 노이즈 오버레이: `opacity-[0.03] mix-blend-overlay`
- 레이블: `font-accent text-[9px] md:text-[10px] tracking-[0.6em] uppercase`

### Prettier 설정
- 따옴표: double, 세미콜론: yes, trailing comma: es5
- 인덴트: 2 spaces, 줄 길이: 80, arrowParens: "avoid"

---

## 데이터 모델

### Artwork (핵심 인터페이스)

```typescript
interface Artwork {
  id: string;                        // "standard-sansu" | "managed-xxx-hash"
  title: string;                     // 한글 제목 (한자 병기 가능)
  description: string;               // 한글 설명
  category: string;                  // Oriental, Traditional, Nature, Abstract...
  image: string;                     // 썸네일 경로 (/thumbnails/xxx.jpg)
  videoSrc?: string;                 // 영상 경로 (/videos/xxx.mp4) — undefined 허용
  displayType: "Horizontal" | "Vertical";  // LED 방향
  runtime: string;                   // 재생 시간 (초 단위 문자열)
  resolution: string;                // "1280x720" | "1920x1080" 등
  tags?: string[];                   // 태그 배열
  worldType?: "standard" | "local";  // World 분류
  artist?: string;                   // 아티스트명 (선택)
  format?: string;                   // 포맷 (선택)
  price?: string;                    // 가격 (선택)
}
```

### 작품 소스
1. **정적**: `standardArtworks.ts` + `localArtworks.ts` → 코드에 하드코딩
2. **동적**: `managed-artworks.json` → Content Manager에서 export
3. **합산**: MarketplaceContext에서 dedupeArtworks()로 병합

---

## 아직 빌드하지 않을 것 (Do NOT Build Yet) [확정]

| 기능 | 이유 | 시기 |
|------|------|------|
| 사용자 인증 / 로그인 | MVP에 불필요. 문의형이면 충분 | Phase 2 |
| 결제 / 정산 | 비즈니스 모델 검증 후 | Phase 3+ |
| 아티스트 셀프서비스 업로드 | 크리에이터 공급 확대 필요 시 (공개 업로드 아님) | Phase 3 |
| CRM / Admin 대시보드 | 문의 월 20건+ 시 | Phase 2 |
| 실시간 채팅 / 챗봇 | B2B는 이메일이 적합 | 미정 |
| 다국어 (i18n) | 한국어 우선 | 해외 확장 시 |
| SSR / SEO 최적화 | CSR SPA + B2B 직접 유입 충분 | 미정 |
| 모바일 앱 | 웹 반응형 충분 | 미정 |
| NFT / Web3 | 현재 무관 | 미정 |
| 제3의 World | STANDARD/LOCAL 두 축만 유지 | 절대 금지 |

---

## Vimeo 제한 사항 (Standard 무료 계정)

- `background=1`, `controls=0`, `muted=1` 등 파라미터 → **유료(Plus+) 전용**
- 사용 시 검은 화면 발생
- **해결법**: 파라미터 없이 로드 + CSS `scale(1.2)` + `pointerEvents: none`
- 그리드 카드에서 Vimeo 영상: `<video>` 태그로 불가 → 썸네일만 표시
- 계정: 지영선, 플랜: Standard (무료)

---

## 환경 변수

```env
# 프로덕션 서버
GMAIL_USER=thisglobal2023@gmail.com
GMAIL_APP_PASSWORD=<앱 비밀번호>
PORT=3000
NODE_ENV=production

# Content Manager
GEMINI_API_KEY=<Gemini API 키>
VIMEO_TOKEN=<Vimeo API 토큰>
```

---

## 프로젝트 지침

- 모든 응답, 분석, 설명, 질문은 한국어로 작성
- 코드 주석도 한국어로
- 커밋 메시지도 한국어로
- 확인 질문 없이 판단 가능하면 바로 실행
- 에러 나면 스스로 디버깅하고 재시도
