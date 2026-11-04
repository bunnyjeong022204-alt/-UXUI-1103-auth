// 회원 탈퇴 Edge Function
//   1) 요청한 사람의 토큰으로 본인 확인
//   2) 닉네임을 withdrawn_players 에 30일 보관 (재가입 때 복구)
//   3) Auth 사용자 삭제 → profiles 는 on delete cascade 로 함께 삭제
// 배포: supabase functions deploy withdraw
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "unauthorized" }, 401);

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
    auth: { persistSession: false },
  });

  const { data: userData, error: userErr } = await admin.auth.getUser(token);
  const user = userData?.user;
  if (userErr || !user?.email) return json({ error: "unauthorized" }, 401);

  const { data: profile } = await admin.from("profiles").select("nickname").eq("id", user.id).maybeSingle();

  const { error: keepErr } = await admin.from("withdrawn_players").upsert({
    email: user.email.toLowerCase(),
    nickname: profile?.nickname ?? "",
    withdrawn_at: new Date().toISOString(),
  });
  if (keepErr) return json({ error: "keep_failed", detail: keepErr.message }, 500);

  const { error: delErr } = await admin.auth.admin.deleteUser(user.id);
  if (delErr) return json({ error: "delete_failed", detail: delErr.message }, 500);

  return json({ ok: true, nickname: profile?.nickname ?? null });
});
