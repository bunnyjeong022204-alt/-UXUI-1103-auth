# 유저버스 회원가입 발표 영상 (HyperFrames)

2분 22초 · 1920×1080 · 장면 7개 (`compositions/`)

| 시작 | 장면 |
|---|---|
| 0:00 | hook — 쿠땅 항공 콩트 |
| 0:30 | problem — 재가입이 차가운 이유 |
| 0:47 | principle — 오는 사람은 막지 않는다 |
| 0:59 | demo — 이럴 때, 유저버스는 |
| 1:30 | brand — 가입은 첫 퀘스트 |
| 1:42 | backend — 약속은 서버가 지킨다 |
| 1:58 | closing — 유저버스 항공, 환영받는 탈퇴 회원 · THANKS TO |

## 소리
- `narration.mp3`, `narration2.mp3`: 녹음 원본. 문장마다 `vo-…` 오디오 클립으로 잘라 배치했어요(`data-media-start` = 녹음 안 위치).
- `narration3.mp3`: "돌아온 사람에게 왜 이렇게 불친절하지" 녹음.
- `cough.wav`: "웃기죠" 자리에 넣은 헛기침 소리.
- 음악·효과음은 직접 합성한 8비트 소리예요.

## 열기
`npx hyperframes check --json` → `npx hyperframes preview` → `npx hyperframes render` (Node 22+, FFmpeg)

## 미리보기
`preview.mp4`는 확인용 저해상도(960×540, 15fps) 영상이에요. 최종 영상은 이 폴더에서 `npx hyperframes render`로 만들어요.
