# 유저버스 인증 백엔드 (Supabase)

로그인·비밀번호 확인은 **Supabase Auth**가, 플레이어 정보와 탈퇴 후 30일 보관은 **Supabase DB(Postgres)**가 맡아요.
설정을 넣기 전에는 프로토타입이 **DEMO 모드**로 돌아가요. 같은 흐름을 브라우저 저장소로 흉내 내서, 배포 사이트에서도 바로 시연할 수 있어요.

## 구조
```
index.html                 프로토타입 (로그인·가입·허브 화면)
js/auth-config.js          Supabase URL · anon key (비어 있으면 DEMO 모드)
js/auth.js                 인증 서비스 — Supabase 모드 / DEMO 모드, 같은 함수 7개
supabase/migrations/…sql   테이블 · RLS · 확인 함수 · 가입 트리거
supabase/seed.sql          데모 데이터 (탈퇴 후 재가입 계정)
supabase/functions/withdraw  회원 탈퇴 Edge Function
```

## 데이터
| 테이블 | 내용 |
|---|---|
| `auth.users` | Supabase가 관리. 이메일 + 비밀번호(해시) |
| `profiles` | 닉네임(2~12자, 한글·영문·숫자, 대소문자 무시 중복 불가), 국가 |
| `withdrawn_players` | 탈퇴한 이메일과 닉네임, 탈퇴 시각. 30일 동안 닉네임 보관 |
| `reserved_nicknames` | 쓸 수 없는 닉네임 (gamer123, admin …) |

| 함수 | 하는 일 |
|---|---|
| `email_status(email)` | `new` / `exists` / `rejoin`(+예전 닉네임) |
| `nickname_available(nick, email)` | 사용 가능 여부. 재가입 본인은 예전 닉네임 사용 가능 |
| `handle_new_user` 트리거 | 가입되면 프로필 생성, 재가입이면 보관 기록 삭제 |
| `withdraw` Edge Function | 닉네임 보관 → Auth 사용자 삭제(프로필도 함께 삭제) |

## 연결하기 (약 10분)
1. [supabase.com](https://supabase.com)에서 새 프로젝트를 만들어요.
2. **SQL Editor**에 `migrations/20261104000000_userverse_auth.sql`을 붙여 넣고 Run, 이어서 `seed.sql`도 Run.
3. **Authentication › Sign In / Providers › Email**
   - 시연용이면 **Confirm email**을 꺼요. 켜 두면 가입 후 메일 인증을 해야 로그인돼요(화면에서도 그렇게 안내해요).
   - **Minimum password length**를 8로 맞추면 화면 규칙과 같아져요.
4. **Project Settings › API**의 Project URL과 `anon` public key를 `js/auth-config.js`에 넣어요.
5. 탈퇴 기능: [Supabase CLI](https://supabase.com/docs/guides/cli)로 `supabase functions deploy withdraw` (서비스 키는 Supabase가 자동으로 넣어줘요).
6. `sisbhjj@gmail.com`(이미 가입 시나리오)은 앱에서 한 번 가입하거나 **Authentication › Users › Add user**로 만들어요.

상단 배지가 **SUPABASE 연결됨**으로 바뀌면 연결된 거예요.

## 비밀번호가 틀렸다고 말하는 타이밍
| 언제 | 무엇을 |
|---|---|
| 입력하는 동안 | 아무 말도 하지 않음 (정답은 서버만 안다) |
| 로그인을 누르고 서버 답을 받은 뒤 | "이메일 또는 비밀번호가 맞지 않아요" — 둘 중 무엇이 틀렸는지는 말하지 않음 |
| 틀린 직후 | 비밀번호 칸만 비우고 다시 포커스, 이메일은 그대로 |
| 다시 입력을 시작하면 | 안내를 바로 지움 |
| 3번째 실패부터 | 남은 횟수 + "비밀번호를 잊으셨나요?" 강조 |
| 5번째 실패 | 30초 동안 로그인 버튼 잠금(남은 초 표시) |
| 가입의 비밀번호 확인 | 끝까지 입력했거나 칸을 벗어난 뒤에만 "일치하지 않아요" |

30초 잠금은 화면에서 하는 장치예요. 실제 무차별 대입 방어는 Supabase Auth의 요청 제한이 맡고, 그 응답(429)도 "잠시 후 다시 시도해 주세요"로 보여줘요.

## 알아둘 점
- `email_status`는 가입 화면의 "당신 계정 아닌가요?"를 위해 이메일 가입 여부를 알려줘요. 편의를 택한 대신, 가입 여부가 노출된다는 트레이드오프가 있어요.
- 로그인 오류는 반대로 이메일·비밀번호 중 어느 쪽이 틀렸는지 알려주지 않아요.
- 탈퇴 기록은 조회할 때 30일로 걸러져요. 실제로 지우려면 마이그레이션 끝의 `pg_cron` 예시를 켜요.
- 만 14세 미만 가입은 법정대리인 동의가 필요해서([개인정보보호포털](https://www.privacy.go.kr/front/contents/cntntsView.do?contsNo=78)), 실제 서비스에서는 연령 확인 단계를 바꿔야 해요.
