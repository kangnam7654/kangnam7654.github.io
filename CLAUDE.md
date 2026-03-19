# 포트폴리오 사이트 (kangnam7654.github.io)

## 기술 스택
- **Framework**: Astro 6 (정적 사이트 생성)
- **UI**: React (interactive 컴포넌트), Tailwind CSS 4
- **Animation**: Framer Motion
- **배포**: GitHub Pages + GitHub Actions (withastro/action, Node 22)
- **대용량 파일**: Git LFS (*.mp4)

## 구조
- `src/pages/` — 페이지 라우팅 (Astro 파일 기반)
- `src/components/sections/` — 섹션 컴포넌트 (Hero, About, Experience 등)
- `src/components/layout/` — Navbar, Footer
- `src/components/ui/` — 재사용 UI (GlassCard, TypeWriter, ScrollProgress 등)
- `src/layouts/` — BaseLayout, ProjectLayout
- `src/styles/global.css` — CSS 변수, 다크/라이트 테마
- `src/data/` — experience, education, skills 데이터
- `public/images/projects/` — 프로젝트 이미지/GIF
- `assets/` — 원본 소스 (PPT, 영상, 이미지) - Git에 포함하지 않음 (.gitignore 권장)

## 테마 시스템
- 다크모드 기본, 라이트모드 지원
- `html.light` 클래스로 CSS 변수 오버라이드 (`global.css`)
- `localStorage('theme')` + `prefers-color-scheme` 감지
- 토글 버튼: 사이드바 + 모바일 네비

## 프로젝트 페이지
- `ProjectLayout.astro` — 공통 레이아웃 (props: title, company, period, role, tags, github?, sideProject?, claudeCode?)
- `Projects.tsx` — 프로젝트 카드 그리드 + 필터 (전체/회사/사이드/Claude Code 토글)
- 프로젝트 데이터는 `Projects.tsx` 내 `projects` 배열에 정의
- 배지: Side Project (에메랄드), Claude Code (앰버)

## 회사 프로젝트 (8개)
| 프로젝트 | 회사 | GitHub |
|---------|------|--------|
| UE5 MCP 플러그인 | 위메이드 넥스트 | kangnam-unreal-mcp |
| AI 자동평가 시스템 | 크레버스 | Multi-Agent-English-Assessment-System |
| Face-to-Character | 메타버스월드 | face_to_parameter |
| 모션 트래킹 | 메타버스월드 | - |
| 추천 시스템 | 코코넛사일로 | private |
| 레이더 객체 탐지 | 코코넛사일로 | Vision_Radar_od |
| 이상 탐지 | 코코넛사일로 | private |
| 매칭 플랫폼 | 가이온 | - |

## 사이드 프로젝트 (7개, 모두 Claude Code)
| 프로젝트 | GitHub | 기술 |
|---------|--------|------|
| MCP 데스크탑 클라이언트 | kangnam-client | Tauri, Rust |
| AutoShorts | AutoShorts | Python, Veo 3.1 |
| What Health | what_health | Swift, Rust |
| 달결 (AI 사주·타로) | private | Rust, Swift |
| Quorum (멀티에이전트) | 미등록 | Rust, Next.js, Tauri |
| Game NPC with LLM | Game-NPC-with-LLM | Python |
| Story Writer | multi_agent_storywriter | Python, LangGraph |

## 주의사항
- 프로젝트 성과에 없는 내용을 지어내지 말 것 (사용자가 여러 차례 수정 요청함)
- TTS 파인튜닝은 "실험 단계", Face-to-Character는 "PoC 완료"
- 레이더 프로젝트: image8은 Hough 원 추출 결과, 원본 아님
- 발표태도 평가 이미지 중 head 사진은 학생 얼굴 → 크롭 필요, hand 사진은 본인
- PPT 이미지 소스: `assets/_포트폴리오_251203.pptx` (unzip으로 추출)

## 다음 작업
- [ ] i18n (한국어/영어/일본어) 지원
