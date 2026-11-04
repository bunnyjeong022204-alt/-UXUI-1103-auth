-- 데모용 데이터 (마이그레이션 뒤에 SQL Editor에서 실행)
-- 탈퇴 후 재가입 시나리오: comeback@gmail.com 이 3일 전에 탈퇴, 예전 닉네임 CometRider
insert into public.withdrawn_players (email, nickname, withdrawn_at)
values ('comeback@gmail.com', 'CometRider', now() - interval '3 days')
on conflict (email) do update
  set nickname = excluded.nickname, withdrawn_at = excluded.withdrawn_at;

-- 이미 가입된 계정 시나리오(sisbhjj@gmail.com)는 Auth 사용자라서 SQL로 만들지 않는다.
-- 앱에서 한 번 가입하거나, 대시보드 > Authentication > Users > Add user 로 만든다.
