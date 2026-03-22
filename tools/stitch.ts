/**
 * Stitch AI (Google Labs) 래퍼 — LUMOS 플랫폼용
 * UI 디자인 생성, 프로젝트 관리
 *
 * 사용법:
 *   npx tsx tools/stitch.ts projects           # 프로젝트 목록
 *   npx tsx tools/stitch.ts create "제목"      # 프로젝트 생성
 *   npx tsx tools/stitch.ts generate "설명"    # UI 화면 생성
 *   npx tsx tools/stitch.ts export <id>        # HTML 추출
 *
 * Stitch SDK (@google/stitch-sdk) 기반
 * API Key: STITCH_API_KEY 환경변수
 */

import "dotenv/config";

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error("❌ STITCH_API_KEY 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

// Stitch SDK 동적 임포트 (설치 후 사용)
let StitchToolClient: any;

async function ensureSDK() {
  try {
    const mod = await import("@google/stitch-sdk");
    StitchToolClient = mod.StitchToolClient;
    return true;
  } catch {
    console.error("⚠️ @google/stitch-sdk가 설치되지 않았습니다.");
    console.error("설치: pnpm add @google/stitch-sdk");
    return false;
  }
}

async function getClient() {
  if (!await ensureSDK()) process.exit(1);
  return new StitchToolClient({ apiKey: API_KEY });
}

// --- 명령어 ---

async function listProjects() {
  const client = await getClient();
  try {
    const result = await client.callTool("list_projects", {});
    console.log("📋 Stitch 프로젝트 목록:\n");
    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    await client.close();
  }
}

async function createProject(title: string) {
  const client = await getClient();
  try {
    const result = await client.callTool("create_project", { title });
    console.log(`✅ 프로젝트 생성: ${title}`);
    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    await client.close();
  }
}

async function generateScreen(prompt: string, projectId?: string) {
  const client = await getClient();
  try {
    const params: Record<string, string> = { prompt };
    if (projectId) params.projectId = projectId;

    const result = await client.callTool("generate_screen_from_text", params);
    console.log("🎨 UI 화면 생성 완료:");
    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    await client.close();
  }
}

async function exportHtml(screenId: string) {
  const client = await getClient();
  try {
    const result = await client.callTool("get_screen_html", { screen_id: screenId });
    console.log(result);
    return result;
  } finally {
    await client.close();
  }
}

async function testConnection() {
  console.log("🔌 Stitch API 연결 테스트...\n");

  // SDK 없이 직접 API 테스트 (MCP stdio 기반이라 직접 HTTP 호출 불가)
  if (!await ensureSDK()) {
    console.log("\n💡 SDK 미설치. 아래 명령으로 설치 후 재시도:");
    console.log("   pnpm add @google/stitch-sdk");
    return false;
  }

  try {
    const client = await getClient();
    const result = await client.callTool("list_projects", {});
    console.log("✅ 연결 성공!");
    console.log(`   프로젝트 수: ${Array.isArray(result) ? result.length : "확인 필요"}`);
    await client.close();
    return true;
  } catch (err: any) {
    console.error(`❌ 연결 실패: ${err.message}`);
    return false;
  }
}

// --- CLI ---

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case "test":
    await testConnection();
    break;
  case "projects":
    await listProjects();
    break;
  case "create":
    if (!args[0]) { console.error('사용법: stitch.ts create "프로젝트 제목"'); process.exit(1); }
    await createProject(args.join(" "));
    break;
  case "generate":
    if (!args[0]) { console.error('사용법: stitch.ts generate "UI 설명" [project-id]'); process.exit(1); }
    await generateScreen(args[0], args[1]);
    break;
  case "export":
    if (!args[0]) { console.error("사용법: stitch.ts export <screen-id>"); process.exit(1); }
    await exportHtml(args[0]);
    break;
  default:
    console.log("LUMOS Stitch CLI");
    console.log("  npx tsx tools/stitch.ts test");
    console.log("  npx tsx tools/stitch.ts projects");
    console.log('  npx tsx tools/stitch.ts create "프로젝트 제목"');
    console.log('  npx tsx tools/stitch.ts generate "다크 테마 아트워크 카드 그리드"');
    console.log("  npx tsx tools/stitch.ts export <screen-id>");
}
