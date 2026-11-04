/* =====================================================================
 * 유저버스 인증 서비스
 *   Supabase 설정이 있으면 Supabase Auth + DB 함수 사용
 *   없으면 브라우저 저장소(localStorage)로 같은 동작을 흉내 내는 DEMO 모드
 * 화면 코드는 아래 7개 함수만 부른다 — 어느 모드든 모양이 같다.
 *   checkEmail(email)              → { status: 'new'|'exists'|'rejoin', nickname? }
 *   checkNickname(nick, email?)    → true(사용 가능) | false
 *   signUp({email,password,nickname,country}) → { ok, needsConfirm?, error? }
 *   signIn(email, password)        → { ok, profile?, error?: 'invalid'|'unconfirmed'|'rate_limited'|'network' }
 *   currentProfile()               → { email, nickname, country } | null
 *   signOut()
 *   withdraw()                     → { ok, error? }
 * ===================================================================== */
(function () {
  const cfg = window.USERVERSE_AUTH || {};
  const useSupabase = !!(cfg.supabaseUrl && cfg.supabaseAnonKey);
  const norm = (e) => String(e || "").trim().toLowerCase();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------------------------------------------------------------- Supabase */
  function supabaseService() {
    let clientPromise = null;
    function client() {
      if (!clientPromise) {
        clientPromise = new Promise((resolve, reject) => {
          if (window.supabase && window.supabase.createClient) return resolve(window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey));
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
          s.onload = () => resolve(window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey));
          s.onerror = () => reject(new Error("supabase-js load failed"));
          document.head.appendChild(s);
        });
      }
      return clientPromise;
    }
    const mapAuthError = (err) => {
      if (!err) return null;
      const m = (err.message || "").toLowerCase();
      if (err.status === 429 || m.includes("rate limit") || m.includes("too many")) return "rate_limited";
      if (m.includes("email not confirmed")) return "unconfirmed";
      if (m.includes("invalid login credentials")) return "invalid";
      if (m.includes("already registered") || m.includes("already been registered")) return "exists";
      if (m.includes("database error saving new user")) return "nickname_taken";
      if (m.includes("password")) return "weak_password";
      if (m.includes("fetch") || m.includes("network")) return "network";
      return "unknown";
    };
    async function profileOf(sb, user) {
      if (!user) return null;
      const { data } = await sb.from("profiles").select("nickname,country").eq("id", user.id).maybeSingle();
      return { email: user.email, nickname: data ? data.nickname : (user.user_metadata || {}).nickname, country: data ? data.country : "KR" };
    }
    return {
      mode: "supabase",
      async checkEmail(email) {
        const sb = await client();
        const { data, error } = await sb.rpc("email_status", { p_email: norm(email) });
        if (error) throw error;
        return data;
      },
      async checkNickname(nick, email) {
        const sb = await client();
        const { data, error } = await sb.rpc("nickname_available", { p_nickname: nick, p_email: email ? norm(email) : null });
        if (error) throw error;
        return !!data;
      },
      async signUp({ email, password, nickname, country }) {
        const sb = await client();
        const { data, error } = await sb.auth.signUp({
          email: norm(email), password,
          options: { data: { nickname, country } },
        });
        if (error) return { ok: false, error: mapAuthError(error) };
        // 이미 있는 이메일이면 Supabase는 오류 대신 identities가 빈 사용자를 돌려준다
        if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) return { ok: false, error: "exists" };
        return { ok: true, needsConfirm: !data.session };
      },
      async signIn(email, password) {
        const sb = await client();
        const { data, error } = await sb.auth.signInWithPassword({ email: norm(email), password });
        if (error) return { ok: false, error: mapAuthError(error) };
        return { ok: true, profile: await profileOf(sb, data.user) };
      },
      async currentProfile() {
        const sb = await client();
        const { data } = await sb.auth.getUser();
        return profileOf(sb, data && data.user);
      },
      async signOut() {
        const sb = await client();
        await sb.auth.signOut();
      },
      async withdraw() {
        const sb = await client();
        const { error } = await sb.functions.invoke("withdraw", { method: "POST" });
        if (error) return { ok: false, error: "unknown" };
        await sb.auth.signOut();
        return { ok: true };
      },
    };
  }

  /* ---------------------------------------------------------------- DEMO */
  function demoService() {
    const KEY = "userverse-demo-db-v1";
    let memory = null;
    const DAY = 864e5;
    async function hash(pw) {
      try {
        const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("uv:" + pw));
        return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
      } catch (e) {
        let h = 0; for (const c of "uv:" + pw) h = (h * 31 + c.charCodeAt(0)) | 0; return "x" + h;
      }
    }
    async function seed() {
      return {
        users: [{ email: "sisbhjj@gmail.com", pw: await hash("userverse1"), nickname: "시스비", country: "KR", createdAt: Date.now() - 40 * DAY }],
        withdrawn: [{ email: "comeback@gmail.com", nickname: "CometRider", withdrawnAt: Date.now() - 3 * DAY }],
        reserved: ["gamer123", "userverse", "admin", "운영자"],
        session: null,
      };
    }
    async function load() {
      if (memory) return memory;
      try { const raw = localStorage.getItem(KEY); if (raw) { memory = JSON.parse(raw); return memory; } } catch (e) {}
      memory = await seed(); save(); return memory;
    }
    function save() { try { localStorage.setItem(KEY, JSON.stringify(memory)); } catch (e) {} }
    const held = (db, now = Date.now()) => db.withdrawn.filter((w) => now - w.withdrawnAt < 30 * DAY);
    const lag = () => wait(250 + Math.round(Math.random() * 250)); // 서버를 거치는 느낌
    return {
      mode: "demo",
      async checkEmail(email) {
        const db = await load(); await lag(); const e = norm(email);
        if (db.users.some((u) => u.email === e)) return { status: "exists" };
        const w = held(db).find((x) => x.email === e);
        return w ? { status: "rejoin", nickname: w.nickname } : { status: "new" };
      },
      async checkNickname(nick, email) {
        const db = await load(); await wait(180); const n = String(nick).trim().toLowerCase(), e = norm(email);
        if (db.users.some((u) => u.nickname.toLowerCase() === n)) return false;
        if (db.reserved.includes(n)) return false;
        if (held(db).some((w) => w.nickname.toLowerCase() === n && w.email !== e)) return false;
        return true;
      },
      async signUp({ email, password, nickname, country }) {
        const db = await load(); await lag(); const e = norm(email);
        if (db.users.some((u) => u.email === e)) return { ok: false, error: "exists" };
        if (!(await this.checkNickname(nickname, e))) return { ok: false, error: "nickname_taken" };
        db.users.push({ email: e, pw: await hash(password), nickname, country, createdAt: Date.now() });
        db.withdrawn = db.withdrawn.filter((w) => w.email !== e);
        save();
        return { ok: true, needsConfirm: false };
      },
      async signIn(email, password) {
        const db = await load(); await lag(); const e = norm(email);
        const u = db.users.find((x) => x.email === e);
        // 이메일이 없는 경우와 비밀번호가 틀린 경우를 구분해 알려주지 않는다
        if (!u || u.pw !== (await hash(password))) return { ok: false, error: "invalid" };
        db.session = e; save();
        return { ok: true, profile: { email: u.email, nickname: u.nickname, country: u.country } };
      },
      async currentProfile() {
        const db = await load(); const u = db.users.find((x) => x.email === db.session);
        return u ? { email: u.email, nickname: u.nickname, country: u.country } : null;
      },
      async signOut() { const db = await load(); db.session = null; save(); },
      async withdraw() {
        const db = await load(); await lag(); const u = db.users.find((x) => x.email === db.session);
        if (!u) return { ok: false, error: "unauthorized" };
        db.users = db.users.filter((x) => x !== u);
        db.withdrawn = db.withdrawn.filter((w) => w.email !== u.email).concat({ email: u.email, nickname: u.nickname, withdrawnAt: Date.now() });
        db.session = null; save();
        return { ok: true };
      },
      async reset() { memory = await seed(); save(); },
    };
  }

  window.UVAuth = useSupabase ? supabaseService() : demoService();
})();
