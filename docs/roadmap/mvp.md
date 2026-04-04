# MVP Roadmap / MVP 로드맵

## Objective / 목표

Build the first usable version of FrontScope with a narrow but solid scope.
좁지만 단단한 범위로 FrontScope의 첫 사용 가능한 버전을 만든다.

## Included in MVP / MVP 포함 범위

### Scan Scope / 스캔 범위
- single URL input / 단일 URL 입력
- basic redirect tracking / 기본 리다이렉트 추적
- static response collection / 정적 응답 수집

### Analysis Scope / 분석 범위
- security header checks / 보안 헤더 점검
- cookie attribute checks / 쿠키 속성 점검
- asset extraction from HTML / HTML 기반 자산 추출
- sourcemap presence detection / 소스맵 존재 탐지
- basic exposure keyword detection / 기본 노출 키워드 탐지

### Output Scope / 출력 범위
- JSON report / JSON 리포트
- Markdown report / Markdown 리포트

## Excluded from MVP / MVP 제외 범위

- authenticated scanning / 인증 세션 기반 스캔
- multi-page crawl / 다중 페이지 크롤링
- advanced DOM XSS heuristics / 고급 DOM XSS 휴리스틱
- full Playwright-driven browser analysis / 전체 Playwright 기반 브라우저 분석
- CI/CD integration / CI/CD 연동
- report diffing / 리포트 비교 기능

## Development Order / 개발 순서

1. finalize structure and docs  
   구조와 문서를 먼저 확정한다.
2. define shared models  
   공용 모델을 정의한다.
3. implement static collectors  
   정적 수집기를 구현한다.
4. implement analyzers  
   분석기를 구현한다.
5. implement reporters  
   리포터를 구현한다.
6. test against sample targets  
   샘플 대상에 대해 테스트한다.

## Success Criteria / 성공 기준

The MVP is successful if:
MVP는 아래 조건을 만족하면 성공으로 본다.

- a single URL can be scanned reliably  
  단일 URL을 안정적으로 스캔할 수 있다.
- findings are generated in a consistent structure  
  finding이 일관된 구조로 생성된다.
- reports can be exported as JSON and Markdown  
  JSON과 Markdown으로 리포트를 내보낼 수 있다.
- the codebase remains clean enough for browser-analysis expansion later  
  이후 브라우저 분석 확장이 가능할 정도로 코드베이스가 깔끔하다.
