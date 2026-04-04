# JavaScript Asset Analysis / JavaScript 자산 분석

## Purpose / 목적

This layer extends FrontScope from HTML-only inspection to fetched JavaScript asset analysis.
이 계층은 FrontScope를 HTML 전용 점검에서 실제 JavaScript 자산 분석 단계로 확장한다.

## Current Flow / 현재 흐름

1. extract script assets from HTML  
   HTML에서 script 자산을 추출한다.
2. fetch the script assets  
   script 자산을 실제로 요청한다.
3. store fetched asset content  
   가져온 자산 내용을 저장한다.
4. analyze JavaScript contents for security signals  
   JavaScript 내용에서 보안 시그널을 분석한다.

## Current Analyzer Coverage / 현재 분석 범위

### JavaScript content findings / JavaScript 내용 기반 finding
- DOM XSS source patterns
- dangerous sink patterns
- outdated jQuery version hint

### JavaScript indicators / JavaScript 지표
- token-like strings
- service identifiers
- localhost/internal hostnames
- absolute URLs and endpoints

## Design Note / 설계 메모

This is still a heuristic stage, not a full JavaScript parser or taint engine.
이 단계는 아직 완전한 JavaScript 파서나 taint engine이 아니라 휴리스틱 분석 단계다.

The goal is to improve signal quality quickly while preserving a lightweight architecture.
목표는 가벼운 구조를 유지하면서도 시그널 품질을 빠르게 끌어올리는 것이다.
