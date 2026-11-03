---
brand: UserVerse
brand_ko: 유저버스
slug: userverse
generated: 2026-11-03
source_type: reference_image
confidence: medium
is_official: false

region: korea
industry:
  - gaming
  - community

color_tone: warm
primary_color_hex: "#FF2D95"
primary_color_name: "Hot Pink"
mood:
  - Y2K
  - 레트로게임
  - 픽셀

font_category: pixel
font_primary: Galmuri11
font_korean_supported: true

density: comfortable
corner_style: pixel
flatness: flat

visual_style:
  - y2k
  - pixel-art
  - game-ui

theme_modes:
  - dark

released_year: 2026
last_major_revision: 2026
signature_keyword: "차콜 블랙 + 핫핑크 단색 + 픽셀 폰트·계단 모서리 — 입력칸 하나하나가 게임 HUD처럼 반응하는 플레이어 가입"

hero_html: |
  <div style="font-family:'Galmuri11','Noto Sans KR',sans-serif;background:#1C1C1C;color:#fff;height:100%;min-height:300px;position:relative;overflow:hidden;padding:24px 20px;display:flex;flex-direction:column;justify-content:center;gap:10px;">
    <svg style="position:absolute;right:-34px;top:12px;opacity:.45" width="120" height="120" viewBox="0 0 150 150" fill="none" stroke="#FF2D95" stroke-width="2"><circle cx="75" cy="75" r="40"/><ellipse cx="75" cy="78" rx="70" ry="17" transform="rotate(-12 75 78)"/></svg>
    <div style="display:grid;grid-template-columns:repeat(24,1fr);gap:2px;height:8px"><b style="grid-column:span 14;background:#FF2D95"></b><b style="grid-column:span 10;background:#2A2A2A"></b></div>
    <span style="font-family:'Silkscreen',monospace;font-size:10px;letter-spacing:.12em;color:#FF2D95;">✦ PROFILE SETUP</span>
    <div style="font-family:'Galmuri14',sans-serif;font-size:24px;">플레이어 정보 입력</div>
    <div style="display:flex;justify-content:space-between;font-size:12px;color:#D6D6D6"><span><span style="color:#FF2D95">▶</span> 닉네임</span><span style="font-family:'Silkscreen';font-size:9px;background:#4DFFC3;color:#0D0D0D;padding:1px 5px">OK!</span></div>
    <div style="height:46px;background:#170F13;border:2px solid #4DFFC3;display:flex;align-items:center;gap:8px;padding:0 8px 0 12px;font-size:14px;">핑크곰돌이96<span style="margin-left:auto;font-family:'Silkscreen';font-size:10px;color:#9A9A9A">7/12</span><span style="background:#FF2D95;color:#0D0D0D;font-size:11px;padding:6px 8px">🎲 추천</span></div>
    <div style="height:48px;background:#FF2D95;color:#0D0D0D;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:inset 0 -4px 0 rgba(0,0,0,.28)">가입 완료</div>
  </div>

sources:
  - 사용자 제공 레퍼런스 이미지 "Design Trends to Watch in 2026"
---

### ① 브랜드 DNA
- **브랜드명**: UserVerse (유저버스) — 게이머 커뮤니티 앱
- **한 줄 정체성**: 가입부터 게임처럼 — 플레이어가 캐릭터를 만들듯 계정을 만드는 곳
- **디자인 철학**: "One color, pixel shapes, game feedback" — 색은 핫핑크 하나, 형태는 픽셀, 모든 입력에 게임 같은 반응
- **시그니처 요소 1개**: 차콜 #1C1C1C 위 핫핑크 픽셀 별·궤도 링, 계단 모서리 입력칸, 블록이 채워지는 XP 게이지

### ② 톤 & 무드
- **핵심 키워드 3개**: Y2K, 레트로게임, 픽셀
- **무드 설명**: 2000년대 휴대용 게임기 메뉴 화면. 어두운 배경에 핑크 픽셀 그래픽이 네온처럼 빛나고, 입력할 때마다 ▶ 커서·OK!·+10 XP가 반응한다. 장난스럽지만 정보는 또렷하게.
- **비주얼 스타일**: Y2K + 픽셀아트 + 게임 HUD
- **밀도(Density)**: Comfortable
- **모서리 성향**: Pixel — 모든 컨트롤은 2px 계단 모서리(clip-path), 둥근 모서리 없음
- **평면성**: Flat — 그림자 대신 하단 4px 안쪽 음영(눌리는 버튼)과 외곽선

### ③ 컬러 시스템 (CSS 변수)

```css
:root {
  /* Primary - Hot Pink */
  --color-primary-100: #FFD6EA;
  --color-primary-300: #FF7AB8;   /* 링크, hover, 게이지 끝 블록 */
  --color-primary-500: #FF2D95;   /* 시그니처 */
  --color-primary-700: #C4006B;
  --color-primary-tint: rgba(255,45,149,0.14);

  /* Neutral - Charcoal */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-100: #D6D6D6;
  --color-neutral-300: #9A9A9A;
  --color-neutral-500: #666666;
  --color-neutral-600: #4D4D4D;
  --color-neutral-700: #3A3A3A;
  --color-neutral-750: #5A5A5A;
  --color-neutral-800: #2A2A2A;
  --color-neutral-850: #1C1C1C;
  --color-neutral-900: #151515;
  --color-neutral-950: #0D0D0D;

  /* Semantic — 게임 HUD 색 */
  --color-error-fg:   #FF6A3D;   /* ERR, 경고 말풍선 */
  --color-error-bg:   #2A1510;
  --color-success-fg: #4DFFC3;   /* OK!, +XP, 퀘스트 완료 */

  /* Surface */
  --bg-page:     #0D0D0D;
  --bg-base:     #1C1C1C;
  --bg-subtle:   #151515;
  --bg-elevated: #2A2A2A;
  --bg-input:    #121212;
  --bg-input-focus: #170F13;

  /* Text */
  --text-primary:     #FFFFFF;
  --text-secondary:   #D6D6D6;
  --text-tertiary:    #9A9A9A;
  --text-placeholder: #666666;
  --text-link:        #FF7AB8;
  --text-on-primary:  #0D0D0D;
  --text-disabled:    #4D4D4D;

  /* Border */
  --border-default: #3A3A3A;
  --border-strong:  #5A5A5A;
  --border-focus:   #FF2D95;
}
```

### ④ 타이포그래피
- **폰트 페어링** (전부 픽셀)
  - 한글 본문·UI: **Galmuri11** (`cdn.jsdelivr.net/npm/galmuri/dist/galmuri.css`)
  - 한글 제목: **Galmuri14**
  - 영문 라벨·숫자·뱃지: **Silkscreen** (Google Fonts)
  - 폴백: Noto Sans KR
- 렌더링: `-webkit-font-smoothing:none` 으로 픽셀 가장자리 유지
- **위계**:
  - H1: Galmuri14 26px / 1.3
  - H2 (카드 제목): Galmuri14 16px / 1.4
  - Eyebrow: Silkscreen 11px / 0.12em, 앞에 ✦ (예: `✦ NEW PLAYER`)
  - Button: Galmuri11 16px
  - Input: Galmuri11 15px
  - Body: Galmuri11 14px / 1.6
  - Label: Galmuri11 13px
  - Chip·Caption: Galmuri11 12px
  - Badge·Counter: Silkscreen 10~11px

### ⑤ 스페이싱
- **Base unit**: 4px
- **토큰**: `--space-xs 4 / sm 8 / md 12 / lg 20 / xl 28`
- **모바일 레이아웃**: 화면 좌우 20, 섹션 간격 20, 라벨↔입력 8, 토글끼리 8
- **구조**: 상태바 → 헤더(‹ 뒤로 + ✦USERVERSE 로고) → XP 게이지 → 제목 → 입력 → 하단 고정 CTA

### ⑥ 모서리 (Pixel Corner)
```css
/* 2px 계단 모서리 — 모든 입력칸·버튼·카드·뱃지 */
--px: polygon(4px 0,calc(100% - 4px) 0,calc(100% - 4px) 2px,calc(100% - 2px) 2px,calc(100% - 2px) 4px,100% 4px,
  100% calc(100% - 4px),calc(100% - 2px) calc(100% - 4px),calc(100% - 2px) calc(100% - 2px),calc(100% - 4px) calc(100% - 2px),
  calc(100% - 4px) 100%,4px 100%,4px calc(100% - 2px),2px calc(100% - 2px),2px calc(100% - 4px),0 calc(100% - 4px),
  0 4px,2px 4px,2px 2px,4px 2px);
```
border-radius는 쓰지 않는다(폰 프레임 제외).

### ⑦ Depth
```css
--press-depth: inset 0 -4px 0 rgba(0,0,0,.28);   /* 버튼 기본 */
--press-down:  inset 0 -2px 0 rgba(0,0,0,.28);   /* 누를 때 + translateY(2px) */
--ghost-line:  inset 0 0 0 2px #FF2D95;
```
드롭섀도·블러 글로우 없음. clip-path가 바깥 그림자를 자르므로 깊이는 안쪽 음영으로만.

### ⑧ Iconography & Graphic
- **아이콘**: 8×8 그리드 픽셀 아이콘 (`shape-rendering:crispEdges`) — 뒤로, 체크, 셰브론, ! 경고, 사용자, 주사위
- **그래픽 모티프**: 픽셀 별(13×12), 궤도 링, ✦ 반짝이, 점선 구분선, 블록 게이지, 픽셀 컨페티
- **사용 규칙**: 장식은 로그인·완료 화면 위주, 콘텐츠를 가리지 않게 제목 오른쪽에만

### ⑨ 컴포넌트 가이드 — "모든 칸이 게임처럼"

**Game Field (입력칸)**
| 상태 | 표현 |
|---|---|
| 기본 | 2px #3A3A3A 테두리, 픽셀 모서리 |
| hover | 테두리 #5A5A5A |
| focus | 라벨 앞 깜빡이는 `▶`, 테두리 핑크, 배경 #170F13, 핑크 캐럿, 블립음 |
| 입력 중 | 키 입력마다 아주 작은 타자음 |
| 통과 | 테두리 민트, 라벨 오른쪽 `OK!` 뱃지, `+10 XP` 떠오름 + 코인음 |
| 오류 | 테두리 레드오렌지, `ERR` 뱃지, 흔들림 + 낮은 두 음 |

```css
.input{height:50px;background:#121212;border:2px solid #3A3A3A;clip-path:var(--px);padding:0 8px 0 12px}
.field.focus .input{border-color:#FF2D95;background:#170F13}
.input.ok{border-color:#4DFFC3} .input.err{border-color:#FF6A3D}
.badge.ok{background:#4DFFC3;color:#0D0D0D;font:10px 'Silkscreen'} .badge.err{background:#FF6A3D;color:#0D0D0D}
```

**Quest Chips (조건 체크리스트)** — 닉네임·비밀번호 조건을 퀘스트처럼
```css
.quest span{font-size:12px;color:#9A9A9A;background:#151515;border:1px solid #3A3A3A;clip-path:var(--px);padding:3px 8px 3px 6px}
.quest span i{width:8px;height:8px;background:#5A5A5A}            /* 픽셀 점 */
.quest span.ok{color:#4DFFC3} .quest span.ok i{background:#4DFFC3}
.quest span.bad{color:#FF6A3D} .quest span.bad i{background:#FF6A3D}
```
- 닉네임: `2~12자` · `한글·영문·숫자만` · `아무도 안 쓰는 이름` + 입력칸 안 `n/12` 카운터
- 비밀번호: `영문 포함` · `숫자 포함` · `8자 이상`

**Warning Bubble (형식 오류 말풍선)** — 입력을 마친 뒤(blur·Enter)에만 표시, 고쳐질 때까지 유지
```css
.bubble{background:#2A1510;border:2px solid #FF6A3D;clip-path:var(--px);padding:8px 12px;color:#FFD9CC;font-size:13px}
/* 제목 "이메일 형식을 확인해 주세요" + 예시 "예: player@userverse.gg" */
```
※ 누르는 도중에 말풍선이 생기면 레이아웃이 밀려 클릭이 빗나가므로, 포인터를 뗀 뒤에 띄운다.

**Dice Button (닉네임 추천)** — 처음 가입할 때만
```css
.dice{background:#FF2D95;color:#0D0D0D;height:30px;padding:0 10px;clip-path:var(--px);box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)}
```
누르면 70ms 간격으로 9번 슬롯머신처럼 이름이 바뀌고(틱음), 멈추면 코인음 + `+10 XP`.
조합: 형용사(반짝이는·용감한·네온·픽셀…) + 명사(고양이·유니콘·슬라임…) + 숫자(선택), 12자 이내, 중복 제외.

**Button**
```css
.btn{height:52px;border:0;clip-path:var(--px);font:16px 'Galmuri11';box-shadow:var(--press-depth)}
.btn.primary{background:#FF2D95;color:#0D0D0D} .btn.primary:hover{background:#FF7AB8}
.btn.ghost{background:#121212;color:#FF2D95;box-shadow:var(--ghost-line),inset 0 -4px 0 rgba(255,45,149,.25)}
.btn:active{transform:translateY(2px);box-shadow:var(--press-down)}
.btn:disabled{background:#2A2A2A;color:#4D4D4D;box-shadow:none}
```

**Toggle (캡차·약관)** — 픽셀 사각 체크박스, 체크 시 팝 애니메이션 + 두 음 + `+10 XP`

**XP Gauge (진행도)** — 숫자 없이 24칸 블록, 단계 + 현재 단계에서 완료한 항목 수만큼 실시간으로 채워짐, 마지막 블록은 #FF7AB8

**Notice Card**
- 가입된 이메일: 핑크 테두리 카드 "당신 계정 아닌가요?" + `로그인하기`(이메일 채워 이동) + `비밀번호 찾기`
- 재가입: 핑크 그라데이션 카드 "다시 돌아오신 걸 환영해요!" + ✦ 깜빡임, 화면 상단 핑크 빛, 제목 "다시 오셨군요!", 버튼 "다시 시작하기"

**Completion** — `✦ STAGE CLEAR` + 둥실 뜨는 픽셀 별 + 픽셀 컨페티 + 4음 팡파르

### ⑩ Motion & Sound
```css
--duration-instant: 80ms;   /* 버튼 눌림 */
--duration-fast: 120ms;
--duration-base: 320ms;     /* 화면 전환 */
--ease: cubic-bezier(0.16, 1, 0.3, 1);
```
| 이벤트 | 사운드 (Web Audio 합성, 아주 작게) |
|---|---|
| hover | square 1568Hz 22ms |
| focus / 타자 | square 988Hz / 900~1100Hz 18ms |
| 버튼 눌림 | 220→150Hz '톡' |
| 체크 | square 두 음 상승·하강 |
| 조건 통과 | 코인 (988 → 1319Hz) |
| 오류 | square 311 → 233Hz |
| 화면 전환 | 노이즈 swoosh + 음 하나 |
| 재가입 환영 | G-C-E 세 음 |
| 가입 완료 | C-E-G-C 팡파르 |

### ⑪ Anti-patterns
1. 둥근 모서리 금지 — 픽셀 계단 모서리만
2. 픽셀이 아닌 폰트로 제목·버튼 금지 (폴백 제외)
3. 핑크 외 강조색 추가 금지 — HUD 색(ERR 레드오렌지, OK 민트)만 예외
4. 입력 도중 오류 표시 금지 — 형식 오류는 입력을 마친 뒤, 비밀번호 확인은 다 입력한 뒤
5. 체크박스 기본 체크 금지
6. 장식이 입력칸·버튼을 가리면 안 됨
7. 소리가 크거나 길면 안 됨 — 경박한 효과음·총소리 금지, 끄기 버튼 필수

### ⑫ 시그니처 적용 예시

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap">
<style>
  .uv{--px:polygon(4px 0,calc(100% - 4px) 0,calc(100% - 4px) 2px,calc(100% - 2px) 2px,calc(100% - 2px) 4px,100% 4px,100% calc(100% - 4px),calc(100% - 2px) calc(100% - 4px),calc(100% - 2px) calc(100% - 2px),calc(100% - 4px) calc(100% - 2px),calc(100% - 4px) 100%,4px 100%,4px calc(100% - 2px),2px calc(100% - 2px),2px calc(100% - 4px),0 calc(100% - 4px),0 4px,2px 4px,2px 2px,4px 2px);
      background:#1C1C1C;color:#fff;font:14px/1.6 'Galmuri11',sans-serif;padding:20px;display:flex;flex-direction:column;gap:20px;-webkit-font-smoothing:none}
  .uv-gauge{display:grid;grid-template-columns:repeat(24,1fr);gap:2px;height:10px}
  .uv-gauge b{background:#2A2A2A}.uv-gauge b.on{background:#FF2D95}
  .uv-eyebrow{font:11px 'Silkscreen';letter-spacing:.12em;color:#FF2D95}
  .uv-title{font:26px/1.3 'Galmuri14';margin-top:-12px}
  .uv-lab{display:flex;justify-content:space-between;font-size:13px;color:#D6D6D6}
  .uv-ok{font:10px 'Silkscreen';background:#4DFFC3;color:#0D0D0D;padding:2px 6px;clip-path:var(--px)}
  .uv-input{height:50px;background:#170F13;border:2px solid #FF2D95;clip-path:var(--px);display:flex;align-items:center;gap:8px;padding:0 8px 0 12px}
  .uv-dice{margin-left:auto;background:#FF2D95;color:#0D0D0D;font-size:12px;padding:6px 10px;clip-path:var(--px);box-shadow:inset 0 -3px 0 rgba(0,0,0,.25)}
  .uv-quest{display:flex;gap:6px;font-size:12px}
  .uv-quest span{color:#4DFFC3;background:#151515;border:1px solid rgba(77,255,195,.4);padding:3px 8px;clip-path:var(--px)}
  .uv-btn{height:52px;border:0;background:#FF2D95;color:#0D0D0D;font:16px 'Galmuri11';clip-path:var(--px);box-shadow:inset 0 -4px 0 rgba(0,0,0,.28)}
</style>

<div class="uv">
  <div class="uv-gauge"><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b class="on"></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div>
  <span class="uv-eyebrow">✦ PROFILE SETUP</span>
  <div class="uv-title">플레이어 정보 입력</div>
  <div class="uv-lab"><span><span style="color:#FF2D95">▶</span> 닉네임</span><span class="uv-ok">OK!</span></div>
  <div class="uv-input">핑크곰돌이96<span style="font:11px 'Silkscreen';color:#9A9A9A;margin-left:auto">7/12</span><span class="uv-dice">🎲 추천</span></div>
  <div class="uv-quest"><span>■ 2~12자</span><span>■ 한글·영문·숫자만</span><span>■ 아무도 안 쓰는 이름</span></div>
  <button class="uv-btn">가입 완료</button>
</div>
```
