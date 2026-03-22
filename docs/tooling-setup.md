# Tooling Setup — LUMOS Platform Demo

## 1. 기본 환경

```bash
# Node.js 20+ / pnpm 10+
pnpm install
pnpm dev          # Vite dev server (port 3000)
pnpm build        # 프로덕션 빌드
pnpm check        # TypeScript 타입체크
```

## 2. Gemini (Vertex AI)

- **코딩/프론트 워커**: `gemini-3.1-pro-preview`
- **이미지 생성/편집**: `gemini-3.1-flash-image-preview` (Nano Banana 2)
- **인증**: ADC(Application Default Credentials) 우선
  ```bash
  gcloud auth application-default login
  ```
- ADC 불가 시 `GEMINI_API_KEY` 환경변수 사용 (`.env`에만 저장)
- repo에 비밀키 절대 커밋 금지

## 3. Vimeo

- **계정**: Standard (무료) 플랜
- **용도**: 프리뷰 영상 호스팅, 썸네일 추출, 메타데이터 관리
- **인증**: `VIMEO_TOKEN` 환경변수
- **제한 사항**:
  - `background=1`, `controls=0` 등 유료 전용 파라미터 사용 금지
  - 임베드 시 파라미터 없이 로드 + CSS `scale(1.2)` + `pointerEvents: none`
  - 그리드 카드에서 Vimeo URL은 썸네일만 표시

### Vimeo Helper 사용법

```typescript
import { VimeoHelper } from "@/lib/vimeo";

const vimeo = new VimeoHelper(); // VIMEO_TOKEN 환경변수 자동 사용
const videos = await vimeo.listVideos();
const thumb = await vimeo.getThumbnail(videoId);
```

## 4. Stitch MCP

- Stitch MCP 서버가 사용 가능하면 `.claude/settings.local.json`에 등록
- 없으면 Gemini 3.1 Pro 기반 디자인 워커로 fallback
- Stitch 결과물은 디자인/프로토타입 참고용, source of truth는 repo

## 5. Claude Code

- 프로젝트 CLAUDE.md가 지침 파일
- `docs/lumos-source-of-truth.md`가 최상위 진실 소스
- 모든 logic/auth/rbac/approval flow는 Claude 관할

## 6. Codex

- 최종 QA는 `CODEX_QA_PROMPT`로 실행
- `docs/codex-qa-prompt.md` 참조
