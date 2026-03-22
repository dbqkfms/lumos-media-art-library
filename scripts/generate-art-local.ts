/**
 * LUMOS x AntiGravity 프로시저럴 미디어 아트 생성기
 * 외부 API 없이 로컬에서 고품질 제너레이티브 아트 생성
 *
 * 사용법: npx tsx scripts/generate-art-local.ts
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(ROOT, "client/public/thumbnails/generated");
const DATA_OUT = path.resolve(ROOT, "scripts/generated-artworks.json");

// ─── 시드 랜덤 (재현 가능) ──────────────────────────────────────────────────

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── SVG 제너레이티브 아트 엔진 ─────────────────────────────────────────────

type ArtStyle =
  | "gravity-waves"
  | "cosmic-crystal"
  | "digital-sansu"
  | "wave-resonance"
  | "fractal-light"
  | "hanok-light"
  | "moonlit-garden"
  | "flowing-ink";

interface ArtConfig {
  style: ArtStyle;
  titleKo: string;
  category: string;
  displayType: "Horizontal" | "Vertical";
  world: "standard" | "local";
  description: string;
  tags: string[];
}

const CONFIGS: ArtConfig[] = [
  {
    style: "gravity-waves",
    titleKo: "반중력 파동",
    category: "Abstract",
    displayType: "Horizontal",
    world: "standard",
    description:
      "깊은 우주 속 빛의 입자들이 중력을 거스르며 황금빛 궤적을 그립니다. 어둠 속에서 피어나는 안티그래비티의 미학.",
    tags: ["abstract", "gravity", "light", "space"],
  },
  {
    style: "cosmic-crystal",
    titleKo: "우주 결정체",
    category: "Cosmic",
    displayType: "Horizontal",
    world: "standard",
    description:
      "성운 속 떠다니는 크리스탈 구조물. 바이오루미네선스 유기체들이 무중력 상태에서 빛을 발합니다.",
    tags: ["cosmic", "crystal", "nebula", "luxury"],
  },
  {
    style: "digital-sansu",
    titleKo: "디지털 산수",
    category: "Oriental",
    displayType: "Vertical",
    world: "standard",
    description:
      "전통 산수화가 디지털 빛의 흐름으로 재해석됩니다. 먹의 번짐과 네온 궤적이 어우러진 현대적 동양화.",
    tags: ["oriental", "mountain", "digital", "ink"],
  },
  {
    style: "wave-resonance",
    titleKo: "파동 공명",
    category: "Abstract",
    displayType: "Horizontal",
    world: "standard",
    description:
      "소리의 파동이 빛의 동심원으로 시각화됩니다. 골드와 화이트 빛이 어둠 위에 기하학적 패턴을 그립니다.",
    tags: ["wave", "sound", "minimal", "geometric"],
  },
  {
    style: "fractal-light",
    titleKo: "생명의 프랙탈",
    category: "Nature",
    displayType: "Vertical",
    world: "standard",
    description:
      "자연에서 영감받은 유기적 프랙탈 패턴. 빛 입자로 이루어진 나뭇가지가 어둠 속에서 성장합니다.",
    tags: ["fractal", "nature", "organic", "light"],
  },
  {
    style: "hanok-light",
    titleKo: "한옥의 빛",
    category: "Traditional",
    displayType: "Horizontal",
    world: "local",
    description:
      "한옥 창호를 통해 스며드는 부드러운 빛. 전통 건축의 아름다움이 디지털 아트로 재탄생합니다.",
    tags: ["hanok", "traditional", "warm", "Korean"],
  },
  {
    style: "moonlit-garden",
    titleKo: "달빛 정원",
    category: "Nature",
    displayType: "Horizontal",
    world: "local",
    description:
      "달빛 아래 한국 전통 정원. 대나무와 소나무가 은은한 빛에 감싸여 고요한 밤 풍경을 연출합니다.",
    tags: ["garden", "moon", "bamboo", "night"],
  },
  {
    style: "flowing-ink",
    titleKo: "흐르는 먹",
    category: "Oriental",
    displayType: "Vertical",
    world: "local",
    description:
      "한지 위에 먹물이 흐르는 순간을 포착한 디지털 수묵화. 번짐과 농담의 미학이 현대적으로 재해석됩니다.",
    tags: ["ink", "calligraphy", "zen", "Korean"],
  },
];

// ─── SVG 생성 함수들 ─────────────────────────────────────────────────────────

function generateGravityWaves(
  w: number,
  h: number,
  rand: () => number
): string {
  const particles: string[] = [];
  const trails: string[] = [];

  // 배경 그라데이션
  const bg = `<defs>
    <radialGradient id="bg1" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0a0a2e"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow2"><feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg1)"/>`;

  // 파동 곡선들
  for (let i = 0; i < 12; i++) {
    const y = h * 0.3 + rand() * h * 0.4;
    const amp = 30 + rand() * 60;
    const freq = 0.003 + rand() * 0.005;
    const opacity = 0.15 + rand() * 0.3;
    const color =
      rand() > 0.5
        ? `rgba(212,175,55,${opacity})`
        : `rgba(100,149,237,${opacity})`;
    let d = `M 0 ${y}`;
    for (let x = 0; x <= w; x += 5) {
      const yy =
        y + Math.sin(x * freq + i * 0.5) * amp + Math.cos(x * freq * 1.5) * amp * 0.5;
      d += ` L ${x} ${yy}`;
    }
    trails.push(
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="${1 + rand() * 2}" filter="url(#glow)"/>`
    );
  }

  // 빛 입자
  for (let i = 0; i < 80; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 1 + rand() * 4;
    const opacity = 0.3 + rand() * 0.7;
    const color = rand() > 0.6 ? "#D4AF37" : "#6495ED";
    particles.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" opacity="${opacity}" filter="url(#glow)"/>`
    );
  }

  // 큰 빛 구체
  for (let i = 0; i < 5; i++) {
    const x = w * 0.2 + rand() * w * 0.6;
    const y = h * 0.2 + rand() * h * 0.6;
    const r = 15 + rand() * 30;
    particles.push(
      `<circle cx="${x}" cy="${y}" r="${r}" fill="#D4AF37" opacity="${0.05 + rand() * 0.1}" filter="url(#glow2)"/>`
    );
  }

  return `${bg}${trails.join("")}${particles.join("")}`;
}

function generateCosmicCrystal(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <radialGradient id="nebula" cx="40%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#2a0845"/>
      <stop offset="50%" stop-color="#15023a"/>
      <stop offset="100%" stop-color="#000005"/>
    </radialGradient>
    <filter id="g1"><feGaussianBlur stdDeviation="4"/></filter>
    <filter id="g2"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#nebula)"/>`;

  // 성운 구름
  for (let i = 0; i < 8; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const rx = 80 + rand() * 200;
    const ry = 40 + rand() * 100;
    const hue = rand() > 0.5 ? "160,50,120" : "80,40,100";
    svg += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="rgb(${hue})" opacity="${0.03 + rand() * 0.05}" filter="url(#g2)"/>`;
  }

  // 크리스탈 구조
  for (let i = 0; i < 15; i++) {
    const cx = w * 0.15 + rand() * w * 0.7;
    const cy = h * 0.15 + rand() * h * 0.7;
    const size = 20 + rand() * 60;
    const sides = 4 + Math.floor(rand() * 4);
    const opacity = 0.1 + rand() * 0.3;
    let points = "";
    for (let j = 0; j < sides; j++) {
      const angle = (Math.PI * 2 * j) / sides - Math.PI / 2;
      const r = size * (0.7 + rand() * 0.3);
      points += `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r} `;
    }
    svg += `<polygon points="${points}" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="${opacity}" filter="url(#g1)"/>`;
    svg += `<polygon points="${points}" fill="#D4AF37" opacity="${opacity * 0.1}" filter="url(#g1)"/>`;
  }

  // 별
  for (let i = 0; i < 150; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 0.3 + rand() * 1.5;
    svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${0.2 + rand() * 0.8}"/>`;
  }

  return svg;
}

function generateDigitalSansu(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="60%" stop-color="#0d1117"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
    <filter id="mist"><feGaussianBlur stdDeviation="15"/></filter>
    <filter id="gl"><feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>`;

  // 산 레이어
  for (let layer = 0; layer < 5; layer++) {
    const baseY = h * (0.3 + layer * 0.12);
    const opacity = 0.15 + layer * 0.08;
    const shade = 30 + layer * 15;
    let d = `M 0 ${h}`;
    for (let x = 0; x <= w; x += 3) {
      const noise1 = Math.sin(x * 0.008 + layer * 2) * 80;
      const noise2 = Math.sin(x * 0.02 + layer) * 30;
      const noise3 = Math.sin(x * 0.05) * 10;
      const y = baseY + noise1 + noise2 + noise3;
      d += ` L ${x} ${y}`;
    }
    d += ` L ${w} ${h} Z`;
    svg += `<path d="${d}" fill="rgb(${shade},${shade},${shade + 10})" opacity="${opacity}"/>`;
  }

  // 안개
  for (let i = 0; i < 6; i++) {
    const y = h * 0.35 + rand() * h * 0.3;
    svg += `<ellipse cx="${w * 0.5}" cy="${y}" rx="${w * 0.6}" ry="${20 + rand() * 40}" fill="white" opacity="${0.02 + rand() * 0.04}" filter="url(#mist)"/>`;
  }

  // 네온 에너지 스트림
  for (let i = 0; i < 6; i++) {
    const startX = rand() * w;
    const startY = h * 0.2 + rand() * h * 0.3;
    let d = `M ${startX} ${startY}`;
    for (let j = 0; j < 8; j++) {
      const x = startX + (rand() - 0.5) * 200;
      const y = startY + j * 30 + rand() * 20;
      d += ` Q ${x + rand() * 50} ${y - 10} ${x} ${y}`;
    }
    const color = rand() > 0.5 ? "#D4AF37" : "#4a9eff";
    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="1" opacity="${0.2 + rand() * 0.3}" filter="url(#gl)"/>`;
  }

  // 달
  svg += `<circle cx="${w * 0.75}" cy="${h * 0.12}" r="30" fill="#fffbe6" opacity="0.15" filter="url(#mist)"/>`;
  svg += `<circle cx="${w * 0.75}" cy="${h * 0.12}" r="15" fill="#fffbe6" opacity="0.3"/>`;

  return svg;
}

function generateWaveResonance(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <filter id="gw"><feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#050505"/>`;

  const cx = w * 0.5;
  const cy = h * 0.5;

  // 동심원 파동
  for (let i = 0; i < 30; i++) {
    const r = 20 + i * 18;
    const opacity = 0.4 - i * 0.012;
    if (opacity <= 0) break;
    const strokeW = 0.5 + rand() * 1.5;
    const color =
      i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#ffffff" : "#8B7536";
    // 약간 불규칙한 원
    let d = "";
    const segments = 60;
    for (let j = 0; j <= segments; j++) {
      const angle = (Math.PI * 2 * j) / segments;
      const rr = r + Math.sin(angle * 5 + i) * (2 + rand() * 4);
      const x = cx + Math.cos(angle) * rr;
      const y = cy + Math.sin(angle) * rr;
      d += j === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    d += " Z";
    svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeW}" opacity="${opacity}" filter="url(#gw)"/>`;
  }

  // 중심 빛
  svg += `<circle cx="${cx}" cy="${cy}" r="8" fill="#D4AF37" opacity="0.8" filter="url(#gw)"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="25" fill="#D4AF37" opacity="0.1" filter="url(#gw)"/>`;

  return svg;
}

function generateFractalLight(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <filter id="fg"><feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#030308"/>`;

  // 프랙탈 나무
  function branch(
    x: number,
    y: number,
    angle: number,
    len: number,
    depth: number
  ) {
    if (depth <= 0 || len < 3) return;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    const opacity = 0.2 + (depth / 10) * 0.5;
    const color = depth > 5 ? "#D4AF37" : depth > 3 ? "#8B7536" : "#4a6741";
    svg += `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${depth * 0.4}" opacity="${opacity}" filter="url(#fg)"/>`;

    const spread = 0.4 + rand() * 0.3;
    branch(x2, y2, angle - spread, len * (0.65 + rand() * 0.1), depth - 1);
    branch(x2, y2, angle + spread, len * (0.65 + rand() * 0.1), depth - 1);
    if (rand() > 0.6) {
      branch(
        x2,
        y2,
        angle + (rand() - 0.5) * 0.3,
        len * 0.5,
        depth - 2
      );
    }
  }

  branch(w * 0.5, h * 0.85, -Math.PI / 2, h * 0.18, 9);

  // 빛 입자
  for (let i = 0; i < 60; i++) {
    const x = w * 0.2 + rand() * w * 0.6;
    const y = rand() * h * 0.7;
    const r = 1 + rand() * 3;
    svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="#D4AF37" opacity="${0.1 + rand() * 0.4}" filter="url(#fg)"/>`;
  }

  return svg;
}

function generateHanokLight(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <filter id="wg"><feGaussianBlur stdDeviation="20"/></filter>
    <filter id="sg"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#f5f0e8"/>`;

  // 따뜻한 빛 배경
  svg += `<ellipse cx="${w * 0.5}" cy="${h * 0.4}" rx="${w * 0.4}" ry="${h * 0.3}" fill="#f0d9a0" opacity="0.3" filter="url(#wg)"/>`;

  // 창호 격자
  const gridX = w * 0.2;
  const gridY = h * 0.15;
  const gridW = w * 0.6;
  const gridH = h * 0.7;
  const cols = 4;
  const rows = 5;

  svg += `<rect x="${gridX}" y="${gridY}" width="${gridW}" height="${gridH}" fill="none" stroke="#5c4a32" stroke-width="3"/>`;

  for (let i = 1; i < cols; i++) {
    const x = gridX + (gridW / cols) * i;
    svg += `<line x1="${x}" y1="${gridY}" x2="${x}" y2="${gridY + gridH}" stroke="#5c4a32" stroke-width="1.5"/>`;
  }
  for (let i = 1; i < rows; i++) {
    const y = gridY + (gridH / rows) * i;
    svg += `<line x1="${gridX}" y1="${y}" x2="${gridX + gridW}" y2="${y}" stroke="#5c4a32" stroke-width="1.5"/>`;
  }

  // 한지 질감 - 각 칸에 부드러운 빛
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const cx = gridX + (gridW / cols) * (c + 0.5);
      const cy = gridY + (gridH / rows) * (r + 0.5);
      const warmth = 0.03 + rand() * 0.08;
      svg += `<ellipse cx="${cx}" cy="${cy}" rx="${gridW / cols / 2.5}" ry="${gridH / rows / 2.5}" fill="#e8c170" opacity="${warmth}" filter="url(#sg)"/>`;
    }
  }

  // 기둥
  svg += `<rect x="${gridX - 8}" y="${gridY - 10}" width="6" height="${gridH + 20}" fill="#3d2b1f" opacity="0.7"/>`;
  svg += `<rect x="${gridX + gridW + 2}" y="${gridY - 10}" width="6" height="${gridH + 20}" fill="#3d2b1f" opacity="0.7"/>`;

  // 처마 라인
  svg += `<line x1="${gridX - 30}" y1="${gridY - 10}" x2="${gridX + gridW + 30}" y2="${gridY - 10}" stroke="#3d2b1f" stroke-width="4"/>`;

  return svg;
}

function generateMoonlitGarden(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#1a2744"/>
    </linearGradient>
    <filter id="ml"><feGaussianBlur stdDeviation="15"/></filter>
    <filter id="ms"><feGaussianBlur stdDeviation="3"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#night)"/>`;

  // 달
  svg += `<circle cx="${w * 0.8}" cy="${h * 0.15}" r="40" fill="#fffde7" opacity="0.2" filter="url(#ml)"/>`;
  svg += `<circle cx="${w * 0.8}" cy="${h * 0.15}" r="20" fill="#fffde7" opacity="0.6"/>`;

  // 달빛 반사
  svg += `<ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.3}" ry="${h * 0.2}" fill="#c0cfe0" opacity="0.03" filter="url(#ml)"/>`;

  // 대나무
  for (let i = 0; i < 8; i++) {
    const x = w * 0.05 + rand() * w * 0.3;
    const baseY = h * 0.9;
    const topY = h * 0.05 + rand() * h * 0.2;
    svg += `<line x1="${x}" y1="${baseY}" x2="${x + rand() * 10 - 5}" y2="${topY}" stroke="#2d5a3d" stroke-width="${2 + rand() * 2}" opacity="${0.4 + rand() * 0.3}"/>`;
    // 마디
    for (let j = 0; j < 6; j++) {
      const ny = topY + ((baseY - topY) / 7) * (j + 1);
      svg += `<line x1="${x - 3}" y1="${ny}" x2="${x + 3}" y2="${ny}" stroke="#3a7a52" stroke-width="1" opacity="0.3"/>`;
    }
  }

  // 소나무 실루엣
  const pineX = w * 0.7;
  const pineBase = h * 0.85;
  svg += `<line x1="${pineX}" y1="${pineBase}" x2="${pineX}" y2="${h * 0.3}" stroke="#1a3a2a" stroke-width="4" opacity="0.6"/>`;
  for (let i = 0; i < 5; i++) {
    const y = h * 0.35 + i * 30;
    const spread = 40 + i * 15;
    svg += `<ellipse cx="${pineX}" cy="${y}" rx="${spread}" ry="${12 + rand() * 8}" fill="#1a3a2a" opacity="${0.3 + rand() * 0.2}"/>`;
  }

  // 석등
  const lx = w * 0.45;
  const ly = h * 0.7;
  svg += `<rect x="${lx - 5}" y="${ly}" width="10" height="30" fill="#4a4a4a" opacity="0.5"/>`;
  svg += `<rect x="${lx - 12}" y="${ly - 15}" width="24" height="15" fill="#5a5a5a" opacity="0.4"/>`;
  svg += `<circle cx="${lx}" cy="${ly - 8}" r="6" fill="#ffdd88" opacity="0.3" filter="url(#ms)"/>`;

  // 별
  for (let i = 0; i < 40; i++) {
    const x = rand() * w;
    const y = rand() * h * 0.4;
    svg += `<circle cx="${x}" cy="${y}" r="${0.5 + rand()}" fill="white" opacity="${0.2 + rand() * 0.5}"/>`;
  }

  return svg;
}

function generateFlowingInk(
  w: number,
  h: number,
  rand: () => number
): string {
  let svg = `<defs>
    <filter id="ink"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="ink2"><feGaussianBlur stdDeviation="2"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#f8f4ec"/>`;

  // 먹 번짐 효과
  for (let i = 0; i < 10; i++) {
    const cx = w * 0.3 + rand() * w * 0.4;
    const cy = h * 0.1 + rand() * h * 0.7;
    const rx = 20 + rand() * 80;
    const ry = 30 + rand() * 120;
    const opacity = 0.03 + rand() * 0.08;
    svg += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#1a1a1a" opacity="${opacity}" filter="url(#ink)" transform="rotate(${rand() * 30 - 15} ${cx} ${cy})"/>`;
  }

  // 붓 터치 스트로크
  for (let i = 0; i < 5; i++) {
    const startX = w * 0.2 + rand() * w * 0.2;
    const startY = h * 0.1 + rand() * h * 0.1;
    let d = `M ${startX} ${startY}`;
    let x = startX;
    let y = startY;
    for (let j = 0; j < 12; j++) {
      x += rand() * 30 - 5;
      y += 20 + rand() * 40;
      const cpx = x + rand() * 60 - 30;
      const cpy = y - 10 + rand() * 20;
      d += ` Q ${cpx} ${cpy} ${x} ${y}`;
    }
    const sw = 1 + rand() * 4;
    svg += `<path d="${d}" fill="none" stroke="#2a2a2a" stroke-width="${sw}" opacity="${0.15 + rand() * 0.25}" stroke-linecap="round" filter="url(#ink2)"/>`;
  }

  // 점
  for (let i = 0; i < 20; i++) {
    const x = w * 0.2 + rand() * w * 0.6;
    const y = rand() * h;
    const r = 2 + rand() * 8;
    svg += `<circle cx="${x}" cy="${y}" r="${r}" fill="#1a1a1a" opacity="${0.03 + rand() * 0.07}" filter="url(#ink)"/>`;
  }

  // 낙관 (도장)
  const sx = w * 0.75;
  const sy = h * 0.85;
  svg += `<rect x="${sx}" y="${sy}" width="30" height="35" fill="#c0392b" opacity="0.6" rx="2"/>`;
  svg += `<text x="${sx + 15}" y="${sy + 24}" font-family="serif" font-size="16" fill="white" text-anchor="middle" opacity="0.8">墨</text>`;

  return svg;
}

// ─── 메인 생성 로직 ──────────────────────────────────────────────────────────

function generateSvg(
  config: ArtConfig,
  seed: number
): { svg: string; w: number; h: number } {
  const rand = seededRandom(seed);
  const w = config.displayType === "Horizontal" ? 1280 : 720;
  const h = config.displayType === "Horizontal" ? 720 : 1280;

  let body: string;
  switch (config.style) {
    case "gravity-waves":
      body = generateGravityWaves(w, h, rand);
      break;
    case "cosmic-crystal":
      body = generateCosmicCrystal(w, h, rand);
      break;
    case "digital-sansu":
      body = generateDigitalSansu(w, h, rand);
      break;
    case "wave-resonance":
      body = generateWaveResonance(w, h, rand);
      break;
    case "fractal-light":
      body = generateFractalLight(w, h, rand);
      break;
    case "hanok-light":
      body = generateHanokLight(w, h, rand);
      break;
    case "moonlit-garden":
      body = generateMoonlitGarden(w, h, rand);
      break;
    case "flowing-ink":
      body = generateFlowingInk(w, h, rand);
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
  return { svg, w, h };
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║  LUMOS x AntiGravity 아트 생성기 (로컬)      ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const timestamp = Date.now();
  const results: any[] = [];

  for (let i = 0; i < CONFIGS.length; i++) {
    const config = CONFIGS[i];
    const seed = timestamp + i * 1337;

    console.log(`[${i + 1}/${CONFIGS.length}] ${config.titleKo} (${config.style})`);

    const { svg, w, h } = generateSvg(config, seed);
    const slug = config.style;
    const filename = `${slug}-${timestamp}.jpg`;
    const outPath = path.join(OUT_DIR, filename);

    // SVG → JPG 변환 (sharp의 SVG 렌더링 사용)
    await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(outPath);

    console.log(`  → ${outPath} (${w}x${h})`);

    results.push({
      id: `gen-${slug}-${timestamp}`,
      title: config.titleKo,
      description: config.description,
      category: config.category,
      image: `/thumbnails/generated/${filename}`,
      displayType: config.displayType,
      runtime: "∞",
      resolution: `${w}x${h}`,
      tags: config.tags,
      worldType: config.world,
      generatedAt: new Date().toISOString(),
    });
  }

  // JSON 저장
  let existing: any[] = [];
  if (fs.existsSync(DATA_OUT)) {
    existing = JSON.parse(fs.readFileSync(DATA_OUT, "utf-8"));
  }
  fs.writeFileSync(
    DATA_OUT,
    JSON.stringify([...existing, ...results], null, 2),
    "utf-8"
  );

  console.log(`\n  ${results.length}개 작품 생성 완료!`);
  console.log(`  이미지: ${OUT_DIR}`);
  console.log(`  데이터: ${DATA_OUT}`);
  console.log(
    `\n  다음: npx tsx scripts/merge-artworks.ts 로 LUMOS에 등록\n`
  );
}

main().catch(console.error);
