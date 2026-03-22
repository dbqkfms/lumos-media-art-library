/**
 * LUMOS x AntiGravity 자동 미디어 아트 생성기
 *
 * 1단계: HuggingFace API로 AI 이미지 생성 → 썸네일 저장
 * 2단계: 생성된 이미지로 비디오 생성 (선택)
 * 자동으로 artwork 데이터 파일에 등록
 *
 * 사용법:
 *   npx tsx scripts/generate-art.ts
 *   npx tsx scripts/generate-art.ts --count 5
 *   npx tsx scripts/generate-art.ts --world standard
 *   npx tsx scripts/generate-art.ts --video  (2단계: 비디오도 생성)
 *
 * 환경변수:
 *   HF_TOKEN=hf_xxxx (HuggingFace API 토큰)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const THUMBNAILS_DIR = path.resolve(ROOT, "client/public/thumbnails/generated");
const VIDEOS_DIR = path.resolve(ROOT, "client/public/videos/generated");
const OUTPUT_DATA = path.resolve(ROOT, "scripts/generated-artworks.json");

// ─── 설정 ────────────────────────────────────────────────────────────────────

const HF_TOKEN = process.env.HF_TOKEN || "";
const IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell"; // 무료, 빠름
const VIDEO_MODEL = "ali-vilab/i2vgen-xl"; // 이미지→비디오

// ─── 미디어 아트 프롬프트 템플릿 ─────────────────────────────────────────────

interface ArtTemplate {
  titleKo: string;
  titleEn: string;
  category: string;
  prompt: string;
  displayType: "Horizontal" | "Vertical";
  tags: string[];
  world: "standard" | "local";
}

const STANDARD_TEMPLATES: ArtTemplate[] = [
  {
    titleKo: "반중력 빛의 흐름",
    titleEn: "Anti-Gravity Light Flow",
    category: "Abstract",
    prompt:
      "Abstract luminous gravitational waves in deep space, floating light particles defying gravity, anti-gravity effect with golden and deep blue tones, cinematic LED media art for gallery installation, dark background with ethereal glowing orbs and light trails, volumetric lighting, 8k resolution",
    displayType: "Horizontal",
    tags: ["abstract", "light", "gravity", "space"],
    world: "standard",
  },
  {
    titleKo: "우주 결정체",
    titleEn: "Cosmic Crystalline",
    category: "Cosmic",
    prompt:
      "Cosmic nebula with anti-gravity floating crystal structures, bioluminescent organic forms suspended in zero gravity, premium media art for luxury hotel lobby LED wall, deep purple and gold color palette, ethereal light diffusion, cinematic composition, ultra high detail",
    displayType: "Horizontal",
    tags: ["cosmic", "crystal", "nebula", "luxury"],
    world: "standard",
  },
  {
    titleKo: "디지털 산수",
    titleEn: "Digital Sansu",
    category: "Oriental",
    prompt:
      "Korean traditional mountain landscape reimagined as digital media art, flowing ink wash meets neon light trails, zen minimalism with subtle particle effects, misty peaks with luminous energy streams, dark moody atmosphere, vertical composition, high resolution digital art",
    displayType: "Vertical",
    tags: ["oriental", "mountain", "digital", "zen"],
    world: "standard",
  },
  {
    titleKo: "파동 공명",
    titleEn: "Wave Resonance",
    category: "Abstract",
    prompt:
      "Sound wave visualization as luminous concentric rings, audio frequency patterns rendered in gold and white light on black background, minimalist media art for premium spaces, clean geometric forms, professional gallery installation art, 8k resolution",
    displayType: "Horizontal",
    tags: ["wave", "sound", "minimal", "geometric"],
    world: "standard",
  },
  {
    titleKo: "생명의 프랙탈",
    titleEn: "Fractal of Life",
    category: "Nature",
    prompt:
      "Organic fractal patterns inspired by nature, growing tree branches made of light particles, bioluminescent roots and veins spreading across dark canvas, golden ratio spiral, premium digital art for LED display, dark background, ethereal glow",
    displayType: "Vertical",
    tags: ["fractal", "nature", "organic", "bioluminescent"],
    world: "standard",
  },
];

const LOCAL_TEMPLATES: ArtTemplate[] = [
  {
    titleKo: "한옥의 빛",
    titleEn: "Light of Hanok",
    category: "Traditional",
    prompt:
      "Traditional Korean hanok architecture with soft warm light streaming through paper doors, minimalist composition, gentle autumn colors, peaceful atmosphere, modern digital art interpretation, clean and serene",
    displayType: "Horizontal",
    tags: ["hanok", "traditional", "warm", "peaceful"],
    world: "local",
  },
  {
    titleKo: "달빛 정원",
    titleEn: "Moonlit Garden",
    category: "Nature",
    prompt:
      "Korean traditional garden under moonlight, bamboo and pine trees with soft luminous glow, stone lantern casting gentle shadows, peaceful night scene, watercolor digital art style, light gray and blue tones, cafe ambiance art",
    displayType: "Horizontal",
    tags: ["garden", "moon", "bamboo", "night"],
    world: "local",
  },
  {
    titleKo: "물결 찻잔",
    titleEn: "Ripple Teacup",
    category: "Still Life",
    prompt:
      "Korean ceramic teacup with gentle water ripples inside, celadon green pottery, minimalist still life, soft natural lighting, clean white background with subtle shadows, zen aesthetic, high resolution digital art for cafe display",
    displayType: "Vertical",
    tags: ["tea", "ceramic", "minimal", "zen"],
    world: "local",
  },
];

// ─── HuggingFace API 호출 ─────────────────────────────────────────────────────

async function generateImage(
  prompt: string,
  width: number,
  height: number
): Promise<Buffer> {
  if (!HF_TOKEN) {
    throw new Error(
      "HF_TOKEN 환경변수가 필요합니다. https://huggingface.co/settings/tokens 에서 발급하세요."
    );
  }

  console.log(`  이미지 생성 중... (${width}x${height})`);

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${IMAGE_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width,
          height,
          num_inference_steps: 4,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HuggingFace API 오류 (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function generateVideo(
  imageUrl: string,
  prompt: string
): Promise<Buffer> {
  if (!HF_TOKEN) throw new Error("HF_TOKEN 필요");

  console.log("  비디오 생성 중... (1-2분 소요)");

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${VIDEO_MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          image: imageUrl,
          prompt: `${prompt}, smooth cinematic motion, gentle animation, media art loop`,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`비디오 생성 오류 (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// ─── 유틸리티 ─────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ─── 메인 실행 ────────────────────────────────────────────────────────────────

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
  generatedAt: string;
}

async function main() {
  const args = process.argv.slice(2);
  const count = parseInt(
    args.find((_, i) => args[i - 1] === "--count") || "3",
    10
  );
  const world = args.find((_, i) => args[i - 1] === "--world") || "both";
  const withVideo = args.includes("--video");
  const dryRun = args.includes("--dry-run");

  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║  LUMOS x AntiGravity 자동 아트 생성기        ║");
  console.log("╚══════════════════════════════════════════════╝\n");
  console.log(`  설정: ${count}개 생성 | 월드: ${world} | 비디오: ${withVideo}`);
  console.log("");

  // 템플릿 선택
  let templates: ArtTemplate[] = [];
  if (world === "standard" || world === "both") {
    templates.push(...STANDARD_TEMPLATES);
  }
  if (world === "local" || world === "both") {
    templates.push(...LOCAL_TEMPLATES);
  }

  // count만큼 랜덤 선택 (중복 허용)
  const selected: ArtTemplate[] = [];
  for (let i = 0; i < count; i++) {
    selected.push(templates[i % templates.length]);
  }

  if (dryRun) {
    console.log("  [DRY RUN] 생성할 작품 목록:\n");
    selected.forEach((t, i) => {
      console.log(`  ${i + 1}. ${t.titleKo} (${t.titleEn})`);
      console.log(`     카테고리: ${t.category} | 월드: ${t.world}`);
      console.log(`     프롬프트: ${t.prompt.slice(0, 80)}...`);
      console.log("");
    });
    console.log("  HF_TOKEN을 설정하고 --dry-run을 제거하면 실제 생성됩니다.");
    return;
  }

  ensureDir(THUMBNAILS_DIR);
  if (withVideo) ensureDir(VIDEOS_DIR);

  const results: GeneratedArtwork[] = [];
  const timestamp = Date.now();

  for (let i = 0; i < selected.length; i++) {
    const template = selected[i];
    const slug = slugify(template.titleEn);
    const artId = `gen-${slug}-${timestamp}-${i}`;

    console.log(
      `\n[${i + 1}/${selected.length}] ${template.titleKo} (${template.titleEn})`
    );

    try {
      // 1단계: 이미지 생성
      const width = template.displayType === "Horizontal" ? 1280 : 720;
      const height = template.displayType === "Horizontal" ? 720 : 1280;

      const imageBuffer = await generateImage(template.prompt, width, height);
      const imagePath = path.join(THUMBNAILS_DIR, `${slug}-${timestamp}.jpg`);
      fs.writeFileSync(imagePath, imageBuffer);
      console.log(`  썸네일 저장: ${imagePath}`);

      const artwork: GeneratedArtwork = {
        id: artId,
        title: template.titleKo,
        description: `AI가 생성한 미디어 아트 작품. ${template.prompt.slice(0, 100)}`,
        category: template.category,
        image: `/thumbnails/generated/${slug}-${timestamp}.jpg`,
        displayType: template.displayType,
        runtime: "∞",
        resolution: `${width}x${height}`,
        tags: template.tags,
        worldType: template.world,
        generatedAt: new Date().toISOString(),
      };

      // 2단계: 비디오 생성 (옵션)
      if (withVideo) {
        try {
          const videoBuffer = await generateVideo(
            artwork.image,
            template.prompt
          );
          const videoPath = path.join(
            VIDEOS_DIR,
            `${slug}-${timestamp}.mp4`
          );
          fs.writeFileSync(videoPath, videoBuffer);
          artwork.videoSrc = `/videos/generated/${slug}-${timestamp}.mp4`;
          artwork.runtime = "8";
          console.log(`  비디오 저장: ${videoPath}`);
        } catch (err) {
          console.log(
            `  비디오 생성 실패 (이미지는 성공): ${(err as Error).message}`
          );
        }
      }

      results.push(artwork);
      console.log(`  완료!`);

      // API 속도 제한 방지
      if (i < selected.length - 1) {
        console.log("  대기 중 (2초)...");
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (err) {
      console.error(`  오류: ${(err as Error).message}`);
    }
  }

  // 결과 저장
  if (results.length > 0) {
    // 기존 결과가 있으면 병합
    let existing: GeneratedArtwork[] = [];
    if (fs.existsSync(OUTPUT_DATA)) {
      existing = JSON.parse(fs.readFileSync(OUTPUT_DATA, "utf-8"));
    }
    const merged = [...existing, ...results];
    fs.writeFileSync(OUTPUT_DATA, JSON.stringify(merged, null, 2), "utf-8");

    console.log("\n══════════════════════════════════════════════");
    console.log(`  ${results.length}개 작품 생성 완료!`);
    console.log(`  데이터 저장: ${OUTPUT_DATA}`);
    console.log(`  썸네일 위치: ${THUMBNAILS_DIR}`);
    if (withVideo) console.log(`  비디오 위치: ${VIDEOS_DIR}`);
    console.log("");
    console.log("  다음 단계:");
    console.log(
      "  1. generated-artworks.json을 standardArtworks.ts/localArtworks.ts에 병합"
    );
    console.log("  2. pnpm dev로 확인");
    console.log("══════════════════════════════════════════════\n");
  } else {
    console.log("\n  생성된 작품이 없습니다.\n");
  }
}

main().catch(console.error);
