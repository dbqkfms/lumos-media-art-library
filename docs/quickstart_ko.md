# Lumos 빠른 재진입 가이드

## 현재 기준

- 패키지 매니저: `pnpm`
- 핵심 검증: `pnpm run check` 성공
- 주의: 현재 working tree 에 사용자 변경분이 많으므로, 임의 초기화나 정리는 하지 않는다.

## 권장 진입 순서

1. 루트로 이동
   - `cd "C:\Users\user\Downloads\Lumos\Lumos 안티그래비티\lumos-media-art-library"`
2. `pnpm` 이 새 터미널에서 바로 잡히는지 확인
   - `pnpm --version`
   - 현재 세션에서 안 잡히면 임시로 `C:\Users\user\AppData\Local\Microsoft\WinGet\Links\pnpm.exe --version`
3. 필요 시 의존성 동기화
   - `pnpm install --frozen-lockfile`
4. 타입체크
   - `pnpm run check`
5. 개발 서버
   - `pnpm run dev`

## 주요 진입 파일

- `package.json`
- `client/src/App.tsx`
- `client/src/components/Header.tsx`
- `client/src/pages/ArtworkDetail.tsx`
- `server/index.ts`

## 운영 메모

- `packageManager` 는 `pnpm@10.4.1` 로 선언돼 있다.
- `node_modules/` 가 이미 존재하므로, 무조건 재설치보다 먼저 `check` 부터 보는 편이 빠르다.
