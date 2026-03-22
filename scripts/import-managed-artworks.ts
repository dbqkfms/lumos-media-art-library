import crypto from "crypto";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";

import { importSources, type ImportSource } from "./import-managed-artworks.config.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.resolve(ROOT, "client/public");
const IMPORTED_VIDEO_DIR = path.resolve(PUBLIC_DIR, "videos/imported");
const IMPORTED_THUMB_DIR = path.resolve(PUBLIC_DIR, "thumbnails/imported");
const DATA_DIR = path.resolve(PUBLIC_DIR, "data");
const MANAGED_JSON_PATH = path.resolve(DATA_DIR, "managed-artworks.json");
const REPORT_JSON_PATH = path.resolve(DATA_DIR, "managed-artworks-import-report.json");

type WorldType = "standard" | "local";

interface ManagedArtwork {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  videoSrc: string;
  displayType: "Horizontal" | "Vertical";
  runtime: string;
  resolution: string;
  tags: string[];
  worldType: WorldType;
  sourcePath: string;
  sourceHash: string;
  importedAt: string;
}

interface ProbeInfo {
  durationSec: number;
  width: number;
  height: number;
}

interface ImportResult {
  imported: ManagedArtwork[];
  skipped: Array<{ path: string; reason: string }>;
}

function ensureDir(target: string) {
  fs.mkdirSync(target, { recursive: true });
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeTitle(input: string): string {
  return slugify(input);
}

function hashFile(filePath: string) {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);
  return new Promise<string>((resolve, reject) => {
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

function walkVideoFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkVideoFiles(fullPath));
      continue;
    }
    if (entry.isFile() && fullPath.toLowerCase().endsWith(".mp4")) {
      files.push(fullPath);
    }
  }

  return files;
}

function readManagedArtworks(): ManagedArtwork[] {
  if (!fs.existsSync(MANAGED_JSON_PATH)) return [];
  const payload = JSON.parse(fs.readFileSync(MANAGED_JSON_PATH, "utf-8")) as unknown;
  return Array.isArray(payload) ? (payload as ManagedArtwork[]) : [];
}

function probeVideo(filePath: string): ProbeInfo {
  const raw = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height:format=duration",
      "-of",
      "json",
      filePath,
    ],
    { encoding: "utf-8" },
  );
  const parsed = JSON.parse(raw) as {
    streams?: Array<{ width?: number; height?: number }>;
    format?: { duration?: string };
  };
  const stream = parsed.streams?.[0] ?? {};
  return {
    durationSec: Number(parsed.format?.duration ?? "0"),
    width: Number(stream.width ?? 0),
    height: Number(stream.height ?? 0),
  };
}

function extractThumbnail(filePath: string, outputPath: string, second: number) {
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-ss",
      second.toFixed(2),
      "-i",
      filePath,
      "-frames:v",
      "1",
      "-q:v",
      "2",
      outputPath,
    ],
    { stdio: "ignore" },
  );
}

function parseSourceTitle(filePath: string): string {
  const stem = path.basename(filePath, path.extname(filePath));
  return stem
    .replace(/^\d{8}_\d{4}_/, "")
    .replace(/_simple_compose_.+$/i, "")
    .replace(/sora-video-[a-f0-9-]+(?: \(\d+\))?/i, "Sora Imported Artwork")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferWorldType(title: string): WorldType {
  const source = title.toLowerCase();
  const localKeywords = ["paper crane", "dreamy", "garden", "calm", "ambient"];
  if (localKeywords.some((keyword) => source.includes(keyword))) {
    return "local";
  }
  return "standard";
}

function inferCategory(title: string, worldType: WorldType): string {
  const source = title.toLowerCase();
  if (source.includes("dragon") || source.includes("phoenix") || source.includes("myth")) return "Traditional";
  if (source.includes("cosmic")) return "Cosmic";
  if (source.includes("digital")) return "Digital";
  if (source.includes("crystal")) return "Abstract";
  if (source.includes("paper crane") || source.includes("festival")) return "Festival";
  return worldType === "local" ? "Ambient" : "Abstract";
}

function inferTags(title: string, worldType: WorldType): string[] {
  const source = title.toLowerCase();
  const tags = new Set<string>([worldType === "local" ? "ambient" : "cinematic"]);

  const keywordMap: Array<[string, string[]]> = [
    ["dragon", ["dragon", "myth", "energy"]],
    ["phoenix", ["phoenix", "rebirth", "light"]],
    ["cosmic", ["cosmic", "space", "nebula"]],
    ["digital", ["digital", "motion", "light"]],
    ["crystal", ["crystal", "shimmer", "abstract"]],
    ["paper crane", ["paper-crane", "festival", "korean"]],
    ["battle", ["dramatic", "kinetic", "duality"]],
    ["nightscape", ["night", "city", "mythic"]],
    ["dreamy", ["dreamy", "soft", "immersive"]],
  ];

  for (const [keyword, mapped] of keywordMap) {
    if (source.includes(keyword)) {
      mapped.forEach((tag) => tags.add(tag));
    }
  }

  return Array.from(tags).slice(0, 6);
}

function buildDescription(title: string, worldType: WorldType, category: string): string {
  const subject = worldType === "local" ? "공간 무드를 부드럽게 채우는" : "시선을 끌어당기는";
  return `${title}을 중심으로 ${subject} ${category.toLowerCase()} 계열 미디어아트 영상입니다.`;
}

function toPublicPath(absolutePath: string) {
  return `/${path.relative(PUBLIC_DIR, absolutePath).replace(/\\/g, "/")}`;
}

async function collectExistingHashes(): Promise<Set<string>> {
  const hashes = new Set<string>();
  const existingManaged = readManagedArtworks();

  for (const artwork of existingManaged) {
    if (artwork.sourceHash) hashes.add(artwork.sourceHash);
  }

  const libraryVideos = walkVideoFiles(path.resolve(PUBLIC_DIR, "videos"));
  for (const filePath of libraryVideos) {
    hashes.add(await hashFile(filePath));
  }

  return hashes;
}

async function importManagedArtworks(): Promise<ImportResult> {
  ensureDir(IMPORTED_VIDEO_DIR);
  ensureDir(IMPORTED_THUMB_DIR);
  ensureDir(DATA_DIR);

  const existingManaged = readManagedArtworks();
  const existingHashes = await collectExistingHashes();
  const seenSemanticKeys = new Set<string>();
  const imported: ManagedArtwork[] = [];
  const skipped: Array<{ path: string; reason: string }> = [];

  const prepared = importSources
    .filter((item) => fs.existsSync(item.path))
    .map((item) => ({ item, size: fs.statSync(item.path).size }))
    .sort((left, right) => right.size - left.size);

  for (const { item } of prepared) {
    const sourcePath = item.path;
    const sourceTitle = item.title ?? parseSourceTitle(sourcePath);
    const probe = probeVideo(sourcePath);
    const semanticKey = `${normalizeTitle(sourceTitle)}:${Math.round(probe.durationSec)}:${probe.width}x${probe.height}`;

    if (seenSemanticKeys.has(semanticKey)) {
      skipped.push({ path: sourcePath, reason: "semantic-duplicate-in-import-batch" });
      continue;
    }
    seenSemanticKeys.add(semanticKey);

    const sourceHash = await hashFile(sourcePath);
    if (existingHashes.has(sourceHash)) {
      skipped.push({ path: sourcePath, reason: "hash-duplicate-in-site-library" });
      continue;
    }

    const worldType = item.worldType ?? inferWorldType(sourceTitle);
    const category = item.category ?? inferCategory(sourceTitle, worldType);
    const tags = item.tags ?? inferTags(sourceTitle, worldType);
    const slug = slugify(sourceTitle || path.basename(sourcePath, path.extname(sourcePath)));
    const fileToken = `${slug}-${sourceHash.slice(0, 8)}`;
    const targetVideoPath = path.resolve(IMPORTED_VIDEO_DIR, `${fileToken}.mp4`);
    const targetThumbPath = path.resolve(IMPORTED_THUMB_DIR, `${fileToken}.jpg`);

    fs.copyFileSync(sourcePath, targetVideoPath);
    const thumbSecond = Math.max(0, Math.min(probe.durationSec * 0.25, 2));
    extractThumbnail(sourcePath, targetThumbPath, thumbSecond);

    const artwork: ManagedArtwork = {
      id: `managed-${fileToken}`,
      title: sourceTitle,
      description: buildDescription(sourceTitle, worldType, category),
      category,
      image: toPublicPath(targetThumbPath),
      videoSrc: toPublicPath(targetVideoPath),
      displayType: probe.height > probe.width ? "Vertical" : "Horizontal",
      runtime: `${Math.max(1, Math.round(probe.durationSec))}s`,
      resolution: `${probe.width}x${probe.height}`,
      tags,
      worldType,
      sourcePath,
      sourceHash,
      importedAt: new Date().toISOString(),
    };

    existingHashes.add(sourceHash);
    imported.push(artwork);
  }

  const merged = [...imported, ...existingManaged].filter((artwork, index, array) => {
    return array.findIndex((candidate) => candidate.sourceHash === artwork.sourceHash) === index;
  });

  fs.writeFileSync(MANAGED_JSON_PATH, JSON.stringify(merged, null, 2), "utf-8");
  fs.writeFileSync(
    REPORT_JSON_PATH,
    JSON.stringify(
      {
        importedCount: imported.length,
        skippedCount: skipped.length,
        imported,
        skipped,
      },
      null,
      2,
    ),
    "utf-8",
  );

  return { imported, skipped };
}

async function main() {
  const missing = importSources
    .filter((item) => !fs.existsSync(item.path))
    .map((item) => item.path);

  if (missing.length > 0) {
    console.log("Missing source files:");
    missing.forEach((entry) => console.log(`- ${entry}`));
  }

  const result = await importManagedArtworks();
  console.log(`Imported: ${result.imported.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
  console.log(`Managed JSON: ${MANAGED_JSON_PATH}`);
  console.log(`Report JSON: ${REPORT_JSON_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
