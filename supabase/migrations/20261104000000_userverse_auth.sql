-- =====================================================================
-- 유저버스 인증 스키마 (Supabase)
-- Supabase 대시보드 > SQL Editor 에 통째로 붙여 넣고 Run.
--   · 로그인/비밀번호 확인은 Supabase Auth(auth.users)가 담당
--   · 여기서는 플레이어 프로필, 탈퇴 후 30일 보관, 가입 전 확인용 함수만 만든다
-- =====================================================================

-- 1) 플레이어 프로필 ------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nickname    text not null
              check (char_length(nickname) between 2 and 12
                     and nickname ~ '^[가-힣A-Za-z0-9]+$'),
  country     text not null default 'KR',
  created_at  timestamptz not null default now()
);
-- 닉네임은 대소문자 구분 없이 하나만
create unique index if not exists profiles_nickname_lower_key
  on public.profiles (lower(nickname));

-- 2) 탈퇴한 플레이어 (30일 동안 닉네임 보관 → 재가입 시 복구) -------------
create table if not exists public.withdrawn_players (
  email         text primary key,            -- 소문자로 저장
  nickname      text not null,
  withdrawn_at  timestamptz not null default now()
);

-- 3) 운영상 쓸 수 없는 닉네임 ---------------------------------------------
create table if not exists public.reserved_nicknames (
  nickname text primary key                  -- 소문자로 저장
);
insert into public.reserved_nicknames (nickname)
values ('gamer123'), ('userverse'), ('admin'), ('운영자')
on conflict do nothing;

-- 4) 행 수준 보안 ---------------------------------------------------------
alter table public.profiles           enable row level security;
alter table public.withdrawn_players  enable row level security;   -- 정책 없음 = 클라이언트 직접 접근 불가
alter table public.reserved_nicknames enable row level security;

drop policy if exists "본인 프로필 조회" on public.profiles;
create policy "본인 프로필 조회" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "본인 프로필 수정" on public.profiles;
create policy "본인 프로필 수정" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- 5) 가입 전 이메일 상태: new / exists / rejoin ---------------------------
create or replace function public.email_status(p_email text)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(p_email));
  v_nick  text;
begin
  if exists (select 1 from auth.users u where lower(u.email) = v_email) then
    return json_build_object('status', 'exists');
  end if;

  select w.nickname into v_nick
    from public.withdrawn_players w
   where w.email = v_email
     and w.withdrawn_at > now() - interval '30 days';

  if v_nick is not null then
    return json_build_object('status', 'rejoin', 'nickname', v_nick);
  end if;

  return json_build_object('status', 'new');
end;
$$;

-- 6) 닉네임 사용 가능 여부 -------------------------------------------------
--    재가입하는 본인(p_email)은 예전 닉네임을 다시 쓸 수 있다
create or replace function public.nickname_available(p_nickname text, p_email text default null)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_nick  text := lower(trim(p_nickname));
  v_email text := lower(trim(coalesce(p_email, '')));
begin
  if exists (select 1 from public.profiles p where lower(p.nickname) = v_nick) then
    return false;
  end if;
  if exists (select 1 from public.reserved_nicknames r where r.nickname = v_nick) then
    return false;
  end if;
  if exists (select 1 from public.withdrawn_players w
              where lower(w.nickname) = v_nick
                and w.withdrawn_at > now() - interval '30 days'
                and w.email <> v_email) then
    return false;                              -- 다른 사람이 탈퇴하며 30일간 보관 중
  end if;
  return true;
end;
$$;

revoke all on function public.email_status(text)             from public;
revoke all on function public.nickname_available(text, text) from public;
grant execute on function public.email_status(text)             to anon, authenticated;
grant execute on function public.nickname_available(text, text) to anon, authenticated;

-- 7) 가입되면 프로필 자동 생성 + 재가입이면 보관 기록 정리 ------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, nickname, country)
  values (
    new.id,
    -- 대시보드에서 직접 만든 계정처럼 닉네임이 없으면 임시 닉네임
    coalesce(nullif(new.raw_user_meta_data ->> 'nickname', ''), 'player' || substr(replace(new.id::text, '-', ''), 1, 6)),
    coalesce(nullif(new.raw_user_meta_data ->> 'country', ''), 'KR')
  );
  delete from public.withdrawn_players where email = lower(new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 8) (선택) 30일 지난 탈퇴 기록 매일 삭제 — pg_cron 확장을 켠 경우
-- select cron.schedule('purge-withdrawn', '0 4 * * *',
--   $$delete from public.withdrawn_players where withdrawn_at < now() - interval '30 days'$$);
