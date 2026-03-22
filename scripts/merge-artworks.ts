/**
 * 생성된 작품 데이터를 LUMOS 데이터 파일에 자동 병합
 *
 * 사용법:
 *   npx tsx scripts/merge-artworks.ts
 *
 * generated-artworks.json의 작품들을
 * standardArtworks.ts / localArtworks.ts에 자동 추가합니다.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INPUT = path.resolve(ROOT, "scripts/generated-artworks.json");
const STANDARD_FILE = path.resolve(
  ROOT,
  "client/src/data/standardArtworks.ts"
);
const LOCAL_FILE = path.resolve(ROOT, "client/src/data/localArtworks.ts");

interface GeneratedArtwork {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  videoSrc?: string;
  displayType: "Horizontal" | "Vertical";
  runtime: string;
  resolution: string;
  tags: string[];
  worldType: "standard" | "local";
}

function artworkToTs(a: GeneratedArtwork): string {
  const lines = [
    `  {`,
    `    id: "${a.id}",`,
    `    title: "${a.title}",`,
    `    description: "${a.description.replace(/"/g, '\\"')}",`,
    `    category: "${a.category}",`,
    `    image: "${a.image}",`,
  ];
  if (a.videoSrc) {
    lines.push(`    videoSrc: "${a.videoSrc}",`);
  }
  lines.push(
    `    displayType: "${a.displayType}",`,
    `    runtime: "${a.runtime}",`,
    `    resolution: "${a.resolution}",`,
    `    tags: [${a.tags.map(t => `"${t}"`).join(", ")}],`,
    `  }`
  );
  return lines.join("\n");
}

function insertArtworks(filePath: string, artworks: GeneratedArtwork[]) {
  if (artworks.length === 0) return;

  const content = fs.readFileSync(filePath, "utf-8");

  // artworks 배열의 첫 번째 닫는 bracket 찾기 (categories 배열이 아닌)
  // "Artwork[]" 선언 이후의 첫 번째 "];" 를 찾음
  const artworkArrayStart = content.indexOf("Artwork[]");
  const lastBracket = content.indexOf("];", artworkArrayStart);
  if (lastBracket === -1) {
    console.error(`  오류: ${filePath}에서 배열 끝을 찾을 수 없습니다.`);
    return;
  }

  // 기존 ID 목록 추출해서 중복 방지
  const existingIds = [...content.matchAll(/id:\s*"([^"]+)"/g)].map(
    m => m[1]
  );
  const newArtworks = artworks.filter(a => !existingIds.includes(a.id));

  if (newArtworks.length === 0) {
    console.log(`  ${path.basename(filePath)}: 새 작품 없음 (이미 등록됨)`);
    return;
  }

  const artworkCode = newArtworks.map(artworkToTs).join(",\n");
  const separator =
    "\n  // ─── AI 생성 작품 (AntiGravity) ──────────────────────────────────────────\n";

  const newContent =
    content.slice(0, lastBracket) +
    separator +
    artworkCode +
    ",\n" +
    content.slice(lastBracket);

  fs.writeFileSync(filePath, newContent, "utf-8");
  console.log(
    `  ${path.basename(filePath)}: ${newArtworks.length}개 작품 추가됨`
  );
}

function main() {
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║  LUMOS 작품 데이터 자동 병합기               ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  if (!fs.existsSync(INPUT)) {
    console.log("  generated-artworks.json이 없습니다.");
    console.log("  먼저 generate-art.ts를 실행하세요.\n");
    return;
  }

  const artworks: GeneratedArtwork[] = JSON.parse(
    fs.readFileSync(INPUT, "utf-8")
  );
  console.log(`  총 ${artworks.length}개 생성된 작품 발견\n`);

  const standard = artworks.filter(a => a.worldType === "standard");
  const local = artworks.filter(a => a.worldType === "local");

  console.log(`  STANDARD: ${standard.length}개`);
  insertArtworks(STANDARD_FILE, standard);

  console.log(`  LOCAL: ${local.length}개`);
  insertArtworks(LOCAL_FILE, local);

  console.log("\n  완료! pnpm dev로 확인하세요.\n");
}

main();
