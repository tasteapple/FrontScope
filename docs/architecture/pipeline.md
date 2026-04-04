# Scan Pipeline / 스캔 파이프라인

## Purpose / 목적

This document explains how a FrontScope scan should move from input to final report.
이 문서는 FrontScope 스캔이 입력부터 최종 리포트까지 어떻게 흐르는지 설명한다.

## Pipeline / 파이프라인

```text
Target URL
  ↓
Input Normalization
  ↓
Static Collection
  ↓
Optional Browser Collection
  ↓
Normalization
  ↓
Analysis
  ↓
Finding Assembly
  ↓
Scoring
  ↓
Report Generation
```

## Detailed Steps / 상세 단계

### 1. Input Normalization / 입력 정규화
- normalize URL format / URL 형식 정규화
- ensure protocol / 프로토콜 보정
- derive canonical target / 기준 대상 식별

### 2. Static Collection / 정적 수집
- fetch initial response / 초기 응답 요청
- record redirect chain / 리다이렉트 체인 기록
- capture headers / 헤더 캡처
- retrieve HTML / HTML 수집
- extract linked assets / 연결 자산 추출

### 3. Optional Browser Collection / 선택적 브라우저 수집
- render in headless browser / 헤드리스 브라우저 렌더링
- record network requests / 네트워크 요청 기록
- observe dynamically loaded assets / 동적 자산 관찰
- collect cookie and console signals / 쿠키 및 콘솔 시그널 수집

### 4. Normalization / 정규화
- convert collector outputs into common internal models / 수집 결과를 공통 내부 모델로 변환
- deduplicate repeated assets / 중복 자산 제거
- unify URLs and domains / URL 및 도메인 통일

### 5. Analysis / 분석
- evaluate headers / 헤더 평가
- inspect cookie attributes / 쿠키 속성 점검
- detect sourcemaps / 소스맵 탐지
- search exposure indicators in HTML/JS / HTML/JS 내 노출 시그널 탐색
- classify third-party dependencies / 서드파티 의존성 분류

### 6. Finding Assembly / finding 조립
- create normalized finding entries / 정규화된 finding 항목 생성
- attach evidence / 근거 첨부
- assign category / 카테고리 부여

### 7. Scoring / 점수화
- calculate severity distribution / 심각도 분포 계산
- compute optional summary scores / 선택적 요약 점수 계산

### 8. Report Generation / 리포트 생성
- build JSON output / JSON 출력 생성
- build Markdown output / Markdown 출력 생성
- build HTML output / HTML 출력 생성

## Notes / 메모

The MVP should prioritize a clean static collection pipeline before advanced browser-driven logic.
MVP 단계에서는 고급 브라우저 기반 로직보다 정적 수집 파이프라인을 먼저 안정적으로 만드는 것을 우선한다.
