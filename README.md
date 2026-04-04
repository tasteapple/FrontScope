# FrontScope

## Overview / 개요

**FrontScope** is a client-side security reconnaissance and reporting tool for web applications. It analyzes browser-facing attack surface, collects frontend assets, fetches JavaScript, applies security heuristics, performs low-risk validation, and generates structured reports for both single-page and limited site-level scans.

**FrontScope**는 웹 애플리케이션의 브라우저 노출면을 분석하는 클라이언트 사이드 보안 정찰 및 리포트 도구다. 프론트엔드 자산 수집, JavaScript fetch, 보안 휴리스틱 분석, 저위험 활성 검증, 단일 페이지 및 제한적 사이트 단위 스캔 결과 생성을 지원한다.

---

## What It Does / 이 프로젝트가 하는 일

FrontScope currently supports:
FrontScope는 현재 아래 기능을 지원한다.

- security header analysis / 보안 헤더 분석
- cookie attribute analysis / 쿠키 속성 분석
- HTML asset extraction / HTML 자산 추출
- JavaScript asset fetch and analysis / JavaScript 자산 fetch 및 분석
- endpoint exposure and risk tagging / endpoint 노출 및 리스크 태깅
- XSS-related heuristic analysis / XSS 관련 휴리스틱 분석
- SQLi-risk heuristic analysis / SQLi 리스크 휴리스틱 분석
- library detection and advisory mapping / 라이브러리 탐지 및 advisory 매핑
- sourcemap validation / sourcemap 검증
- same-origin crawl with sitemap and enterprise route seeding / sitemap 및 엔터프라이즈 경로 시드를 활용한 same-origin 크롤
- JSON / Markdown / HTML reporting / JSON / Markdown / HTML 리포트

---

## Current Positioning / 현재 포지셔닝

FrontScope is best described as a **browser-facing security assessment and reporting tool**.
FrontScope는 **브라우저 노출면 기반 보안 분석 및 리포트 도구**로 정의하는 것이 가장 적절하다.

It is not positioned as an exploit framework.
이 프로젝트는 익스플로잇 프레임워크로 포지셔닝하지 않는다.

Its strength is structured discovery, security signal analysis, low-risk validation, and readable report generation.
강점은 구조화된 발견, 보안 시그널 분석, 저위험 검증, 읽기 쉬운 리포트 생성에 있다.

---

## Installation / 설치

```bash
npm install
npm run build
```

---

## Basic Usage / 기본 사용법

### Single-page scan / 단일 페이지 스캔
```bash
npm run scan -- https://target.example
```

### Enable low-risk active checks / 저위험 활성 검증 포함
```bash
npm run scan -- https://target.example --active-low-risk
```

### Crawl subpages / 하위 페이지 크롤
```bash
npm run scan -- https://target.example --crawl-depth=1 --max-pages=10
```

### Combined mode / 결합 모드
```bash
npm run scan -- https://target.example --active-low-risk --crawl-depth=1 --max-pages=10
```

### Smoke test / 스모크 테스트
```bash
npm run smoke
```

---

## CLI Options / CLI 옵션

### `--active-low-risk`
Enable limited low-risk active validation.
제한적인 저위험 활성 검증을 켠다.

### `--crawl-depth=N`
Set crawl depth for same-origin exploration.
same-origin 탐색의 depth를 설정한다.

### `--max-pages=N`
Set the maximum number of pages to scan during crawl.
크롤 중 스캔할 최대 페이지 수를 설정한다.

---

## Report Outputs / 리포트 출력

After running a scan, FrontScope currently generates:
스캔 실행 후 FrontScope는 현재 아래 파일을 생성한다.

### Page-level outputs / 페이지 단위 출력
- `reports/report.json`
- `reports/report.md`
- `reports/report.html`

### Site-level outputs / 사이트 단위 출력
- `reports/site-report.json`
- `reports/site-summary.json`

### Smoke outputs / 스모크 테스트 출력
- `reports/smoke-report.json`
- `reports/smoke-report.md`
- `reports/smoke-report.html`

---

## Current Analysis Areas / 현재 분석 영역

### Browser Security Controls / 브라우저 보안 제어
- Content-Security-Policy
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### Cookies / 쿠키
- Secure
- HttpOnly
- SameSite

### Client Assets / 클라이언트 자산
- scripts
- stylesheets
- images
- iframes
- manifests

### JavaScript Analysis / JavaScript 분석
- DOM XSS source/sink heuristics
- legacy library detection
- library advisory mapping
- endpoint extraction
- localhost/internal indicator detection

### Server-side Risk Hints / 서버측 리스크 힌트
- SQL/DB error signatures
- parameterized endpoint risk tagging
- download/view/login endpoint heuristics

### Crawl / 크롤
- same-origin anchors
- sitemap seeds
- indicator seeds
- enterprise route seeds
- URL normalization and filtering

---

## Confidence Model / 신뢰도 모델

Each finding may include a confidence label.
각 finding에는 신뢰도 라벨이 포함될 수 있다.

- `heuristic` → pattern-based signal / 패턴 기반 시그널
- `matched` → stronger match or mapping / 더 강한 매칭 또는 매핑
- `validated` → directly confirmed / 직접 확인된 결과

---

## Current Architecture / 현재 아키텍처

```text
FrontScope/
├─ src/
│  ├─ cli/
│  ├─ core/
│  ├─ collectors/
│  ├─ analyzers/
│  ├─ extractors/
│  ├─ report/
│  ├─ scoring/
│  ├─ models/
│  ├─ config/
│  └─ utils/
├─ data/
│  ├─ advisories/
│  └─ advisories-cache/
├─ docs/
├─ examples/
├─ reports/
├─ scripts/
└─ tests/
```

---

## Current Limitations / 현재 한계

- crawl is intentionally conservative / 크롤은 의도적으로 보수적이다
- no authenticated crawl yet / 아직 인증 세션 기반 크롤은 없다
- no full browser automation layer yet / 아직 전체 브라우저 자동화 계층은 없다
- semver handling is lightweight, not full npm semver / semver 처리는 가벼운 구현이며 full npm semver는 아니다
- heuristic findings still require manual review / 휴리스틱 finding은 여전히 수동 검토가 필요하다

---

## Recommended Next Directions / 추천 다음 방향

- richer site-summary reporting / 더 풍부한 site-summary 리포트
- broader library coverage / 더 넓은 라이브러리 커버리지
- stronger route discovery for framework-specific apps / 프레임워크 특화 경로 탐지 강화
- optional browser automation layer / 선택적 브라우저 자동화 계층
- improved active-low-risk probes / 개선된 저위험 활성 검증

---

## Documentation Note / 문서 정책

Project-facing documentation should remain bilingual where practical.
대외/내부 설명 문서는 가능한 한 영문과 한글을 함께 병기한다.
