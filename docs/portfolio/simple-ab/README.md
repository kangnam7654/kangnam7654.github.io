# 외부 서비스 없는 포트폴리오 A/B

## 현재 범위

두 완성된 홈을 브라우저에서 나눠 보여주는 기능만 사용한다. 외부 분석 서비스,
SDK, 수집 서버, 방문자 카운터, 실험 관리 콘솔, 방문·전환 통계 보고서는 사용하지 않는다.
이는 디자인 분기이며 통계적 우열을 판단하는 측정 실험은 아니다.
기술적 품질 유지 자동화는 별도로 [AUTOMATION.md](AUTOMATION.md)에 정리한다.

- `/`: 원본 유지. 첫 화면을 자동 교체하지 않는다.
- `/ab/`: 최초 진입 시 같은 확률로 타이포그래피 또는 오브젝트로 이동한다.
- `/variants/type/`, `/variants/objects/`: 같은 공개 본문·프로젝트·이력서·연락 동선.
- `/directions/`: 두 화면을 직접 비교하는 정적 페이지.
- `/ab/?review=1`: 자동 이동하지 않는 수동 검토 입구.
- `/ab/?variant=type` 또는 `objects`: 저장을 바꾸지 않고 해당 검토 화면을 연다.
- `/ab/privacy/`: 실제 저장 방식과 선택 초기화 안내.

## 배정과 저장

`src/data/portfolio-ab-config.json`과 `src/lib/portfolio-ab.ts`가 전부다.
외부 서비스 설정이나 인증정보는 없다. 두 구간으로 나눈 무작위 표본을 사용하며,
정확한 누적 방문자 수가 반반이 되는 것은 보장하지 않는다.

선택이 가능하면 localStorage의 `portfolio-directions-v1:variant` 키에
`type` 또는 `objects` 하나만 저장한다. 방문자 ID, 시각, 클릭 이력을 만들지 않는다.
이 값은 A/B 코드에서 서버로 전송하지 않는다. 같은 출처·브라우저 프로필에서
선택을 지울 때까지 유지되며, 다른 브라우저나 비공개 창은 별도 저장소다.

저장소가 차단되거나 GPC/DNT 거절 신호가 있으면 저장하지 않고 표시만 한다.
그 환경에서는 재방문 때 화면이 달라질 수 있다. 직접 보기·검토·비교 페이지는
배정을 바꾸지 않는다. JavaScript가 없으면 수동 링크로 두 화면을 볼 수 있다.
선택 초기화가 실패했을 때 성공했다고 표시하지 않는다.

기존 CTA의 `data-ab-*` 속성은 링크 동등성 QA를 위한 수동 마크업으로 남아 있지만,
클릭 수집 리스너나 노출 이벤트 전송은 없다. 이전의 측정용 클라이언트는 제거됐다.
이전 `docs/portfolio/live-ab/`의 영수증은 과거 어댑터 준비 단계의 기록이며,
현재 요구사항 또는 실제 측정 연결을 뜻하지 않는다.

## 검증

기존 Node 22·Playwright·Chrome·로컬 axe 환경을 재사용한다. 의존성이나 lockfile은
바꾸지 않았다. 실제 설치된 Astro 6의 CLI 경로로 빌드한다.

```sh
npm exec --yes --package=node@22.23.4 -- node node_modules/astro/bin/astro.mjs build
python3 tools/check_portfolio_ab_contract.py
python3 tools/check_portfolio_entry.py
python3 tools/check_full_portfolio.py
```

실행 환경의 `TMPDIR`는 Hermes scratch 디렉터리로 지정한다. 두 새 QA 명령은
실제 `dist`를 일회용 loopback 서버에서 읽고 종료 시 서버를 닫는다. 가짜 수집기나
실제 계정은 사용하지 않는다. 결과는 scratch에 저장하고 `verification.json`에
요약한다. 기존 측정 준비 단계의 검증 파일을 덮어쓰지 않는다.

## 공개 배포

로컬 빌드와 공개 배포는 별개다. 소스의 분기는 준비됐지만 공개 배포는 별도의
기존 배포 차단 해결·검증 및 소스 검토가 필요하다. 원본·기존 시안은 유지하며,
호스팅·계정 결제·권한·인증 설정을 우회 변경하지 않는다. Google/PostHog 계정
연결이나 실제 통계 probe는 이 범위의 선행 조건이 아니다.
