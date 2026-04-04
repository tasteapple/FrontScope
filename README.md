# FrontScope

## Overview / 개요

**FrontScope** is a client-side security reconnaissance and reporting tool for web applications. It analyzes a target from the browser-facing surface and generates structured reports about security headers, cookies, client assets, sourcemaps, third-party dependencies, and exposure indicators found in HTML and JavaScript.

**FrontScope**는 웹 애플리케이션의 **브라우저 노출면(client-side surface)** 을 분석하는 보안 정찰 및 리포트 생성 도구다. 보안 헤더, 쿠키, 클라이언트 자산, 소스맵, 서드파티 의존성, HTML/JavaScript 내 노출 시그널을 수집하고 구조화된 결과를 만든다.

---

## Goal / 목표

FrontScope is not meant to be a server-side exploit scanner. Its purpose is to inspect what is exposed to the browser and organize that information into practical security findings.

FrontScope는 서버 익스플로잇 스캐너가 아니다. 이 프로젝트의 목적은 **브라우저에서 보이는 정보와 설정**을 기준으로 노출 요소를 정리하고, 이를 실용적인 보안 진단 결과로 구조화하는 것이다.

### It focuses on / 중점 분석 대상
- browser-facing security headers / 브라우저 보안 헤더
- cookies and client-side session handling hints / 쿠키 및 클라이언트 세션 처리 시그널
- JavaScript, CSS, iframes, and other loaded assets / JavaScript, CSS, iframe 등 로딩 자산
- sourcemap exposure and debug artifact leakage / 소스맵 및 디버그 아티팩트 노출
- third-party scripts and dependencies / 서드파티 스크립트 및 의존성
- potentially sensitive indicators in HTML and JavaScript / HTML 및 JavaScript 내 민감 노출 시그널

---

## What FrontScope Does / FrontScope가 하는 일

Given a URL, FrontScope is designed to:

URL 하나가 주어지면, FrontScope는 아래 흐름으로 동작하도록 설계된다.

1. normalize the input URL  
   입력 URL을 정규화한다.
2. fetch the target and record redirects  
   대상을 요청하고 리다이렉트 흐름을 기록한다.
3. collect headers, HTML, and linked assets  
   헤더, HTML, 연결된 자산을 수집한다.
4. render the page in a headless browser when needed  
   필요 시 헤드리스 브라우저로 페이지를 렌더링한다.
5. inspect browser-visible security controls  
   브라우저 관점의 보안 제어 구성을 점검한다.
6. extract exposure indicators from frontend resources  
   프론트엔드 자원에서 노출 시그널을 추출한다.
7. generate reports in JSON, Markdown, and HTML  
   JSON, Markdown, HTML 리포트를 생성한다.

---

## Core Analysis Areas / 핵심 분석 영역

### 1. Security Headers / 보안 헤더
FrontScope checks headers such as:
FrontScope는 아래와 같은 헤더를 검사한다.

- Content-Security-Policy
- Strict-Transport-Security
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Later versions should evaluate not only presence, but also weak or overly broad values.
향후 버전에서는 단순 존재 여부뿐 아니라 값이 약한지, 과도하게 넓은지도 평가한다.

### 2. Cookies / 쿠키
FrontScope inspects cookie-related security signals.
FrontScope는 쿠키 관련 보안 시그널을 점검한다.

- Secure
- HttpOnly
- SameSite
- scope and handling hints / 범위 및 처리 방식 힌트

### 3. Client Assets / 클라이언트 자산
FrontScope extracts browser-loaded assets.
FrontScope는 브라우저에서 로드되는 자산을 추출한다.

- JavaScript files
- CSS files
- images
- iframes
- manifests
- third-party resources / 외부 리소스

### 4. Sourcemaps and Debug Artifacts / 소스맵 및 디버그 아티팩트
FrontScope looks for exposed debug traces.
FrontScope는 노출된 디버그 흔적을 탐지한다.

- `sourceMappingURL`
- accessible `.map` files / 접근 가능한 `.map` 파일
- source path hints / 원본 경로 힌트
- development artifact leakage / 개발 아티팩트 노출

### 5. Exposure Indicators in Frontend Code / 프론트엔드 코드 내 노출 시그널
FrontScope scans HTML and JavaScript for indicators such as:
FrontScope는 HTML과 JavaScript에서 아래와 같은 시그널을 탐지한다.

- API endpoint references / API 엔드포인트 참조
- internal or staging hostnames / 내부 또는 스테이징 호스트명
- localhost references / localhost 참조
- token-like strings / 토큰 형태 문자열
- framework configuration objects / 프레임워크 설정 객체
- storage key names / 스토리지 키 이름
- third-party service identifiers / 서드파티 서비스 식별자

---

## Current Project Structure / 현재 프로젝트 구조

```text
FrontScope/
├─ src/
│  ├─ cli/          # CLI entrypoints / CLI 진입점
│  ├─ core/         # pipeline and orchestration / 파이프라인 및 오케스트레이션
│  ├─ collectors/   # raw data collection / 원시 데이터 수집
│  ├─ analyzers/    # security analysis rules / 보안 분석 규칙
│  ├─ extractors/   # extraction logic / 추출 로직
│  ├─ report/       # report generation / 리포트 생성
│  ├─ scoring/      # severity and scoring / 심각도 및 점수화
│  ├─ models/       # shared models / 공용 데이터 모델
│  ├─ config/       # configuration / 설정
│  └─ utils/        # helpers / 유틸리티
├─ docs/
│  ├─ architecture/ # architecture documents / 아키텍처 문서
│  ├─ roadmap/      # scope and milestones / 범위 및 마일스톤
│  └─ examples/     # examples and notes / 예시 및 메모
├─ examples/        # sample inputs and outputs / 샘플 입력 및 출력
├─ reports/         # generated reports / 생성된 리포트
├─ scripts/         # helper scripts / 보조 스크립트
├─ tests/           # tests / 테스트
└─ README.md
```

---

## How It Works / 동작 방식

FrontScope is intended to use a pipeline-based design.
FrontScope는 파이프라인 기반 구조를 따른다.

### Step 1. Input Normalization / 입력 정규화
- normalize the URL / URL 정규화
- resolve protocol issues / 프로토콜 보정
- derive target metadata / 대상 메타데이터 추출

### Step 2. Static Collection / 정적 수집
- fetch the target / 대상 요청
- record status and redirects / 상태 및 리다이렉트 기록
- collect headers / 헤더 수집
- download HTML / HTML 다운로드
- extract asset references / 자산 참조 추출

### Step 3. Browser Collection / 브라우저 수집
- load the page in a headless browser / 헤드리스 브라우저 로딩
- record network requests / 네트워크 요청 기록
- capture dynamically loaded assets / 동적 자산 캡처
- collect cookie and console signals / 쿠키 및 콘솔 시그널 수집

### Step 4. Analysis / 분석
- run header rules / 헤더 규칙 적용
- inspect cookie attributes / 쿠키 속성 점검
- detect sourcemap exposure / 소스맵 노출 탐지
- extract exposure indicators / 노출 시그널 추출
- classify third-party dependencies / 서드파티 의존성 분류

### Step 5. Reporting / 리포트 생성
- build normalized findings / 정규화된 finding 생성
- assign severity and category / 심각도 및 카테고리 부여
- generate JSON, Markdown, and HTML reports / JSON, Markdown, HTML 리포트 생성

---

## MVP Scope / MVP 범위

### Included in v1 / v1 포함 항목
- single URL scanning / 단일 URL 스캔
- header collection and analysis / 헤더 수집 및 분석
- HTML parsing and asset extraction / HTML 파싱 및 자산 추출
- sourcemap presence detection / 소스맵 존재 탐지
- basic exposure keyword scanning / 기본 노출 키워드 탐지
- Markdown and JSON reporting / Markdown 및 JSON 리포트

### Excluded from v1 / v1 제외 항목
- authenticated scanning / 인증 세션 기반 스캔
- multi-page crawling / 다중 페이지 크롤링
- advanced DOM XSS heuristics / 고급 DOM XSS 휴리스틱
- CI/CD integration / CI/CD 연동
- full browser storage inspection / 전체 브라우저 스토리지 분석

---

## Documentation Policy / 문서 작성 정책

Project-facing documentation should be written in both English and Korean whenever practical.
이 프로젝트의 대외/내부 설명 문서는 가능한 한 **영문과 한글을 함께 병기**하는 것을 원칙으로 한다.

The main reason is to keep the repository readable for both international-style technical documentation and direct local review.
그 이유는 저장소를 국제적인 기술 문서 스타일로도 읽을 수 있게 하면서, 동시에 마스터가 직접 검토할 때도 즉시 이해 가능하도록 하기 위함이다.

---

## Positioning / 포지셔닝

FrontScope is best described as a **client-side security reconnaissance and reporting tool**.
FrontScope는 **클라이언트 사이드 보안 정찰 및 리포트 도구**로 정의하는 것이 가장 적절하다.

It is not positioned as an exploit framework. Its strength is structured discovery, evidence collection, and report generation from the browser surface.
이 프로젝트는 익스플로잇 프레임워크로 포지셔닝하지 않는다. 강점은 브라우저 노출면을 기준으로 한 구조화된 수집, 증거 정리, 리포트 생성에 있다.
