# Security Analyzer Expansion / 보안 분석기 확장

## Purpose / 목적

This document records the first security-focused analyzer expansion beyond basic headers and exposure collection.
이 문서는 기본 헤더/노출 수집을 넘어선 첫 보안 중심 analyzer 확장을 기록한다.

## Added Analyzer Areas / 추가된 분석 영역

### 1. Cookie Analysis / 쿠키 분석
Checks whether response cookies are missing important attributes.
응답 쿠키에 중요한 속성이 빠져 있는지 점검한다.

Current checks:
현재 점검 항목:
- missing `Secure`
- missing `SameSite`

### 2. Endpoint Risk Analysis / 엔드포인트 리스크 분석
Classifies client-exposed endpoints into security-relevant categories.
클라이언트에 노출된 엔드포인트를 보안적으로 의미 있는 범주로 분류한다.

Current tags:
현재 태그:
- login
- verify
- auth
- recovery
- download
- content
- parameterized

### 3. XSS Signal Analysis / XSS 시그널 분석
Searches for DOM XSS-related sources, sinks, and inline handler patterns.
DOM XSS 관련 source, sink, inline handler 패턴을 탐지한다.

Current examples:
현재 예시:
- `location.search`, `location.hash`, `document.referrer`
- `innerHTML`, `document.write`, `eval`, `new Function`
- inline event handlers like `onclick=`

## Design Position / 설계 위치

These analyzers are intentionally heuristic in MVP+ form.
이 analyzer들은 MVP+ 단계에서 의도적으로 휴리스틱 기반으로 동작한다.

They do not claim full exploitability by themselves.
이 결과만으로 곧바로 완전한 exploitability를 주장하지는 않는다.

Their purpose is to:
그 목적은 다음과 같다:
- raise useful security attention / 유의미한 보안 주의 포인트 제시
- prioritize manual review / 수동 검토 우선순위 설정
- make report output more actionable / 리포트를 더 실전적으로 만들기
