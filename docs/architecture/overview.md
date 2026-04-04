# Architecture Overview / 아키텍처 개요

## Purpose / 목적

This document defines the high-level architecture of FrontScope.
이 문서는 FrontScope의 상위 수준 아키텍처를 정의한다.

FrontScope is designed as a pipeline-based client-side security reconnaissance tool.
FrontScope는 파이프라인 기반의 클라이언트 사이드 보안 정찰 도구로 설계된다.

## High-Level Flow / 상위 흐름

```text
Input URL
  ↓
Collectors
  ↓
Normalization Layer
  ↓
Analyzers
  ↓
Findings
  ↓
Scoring
  ↓
Reporters
```

## Main Layers / 주요 계층

### 1. Collectors / 수집 계층
Responsible for gathering raw data from the target.
대상으로부터 원시 데이터를 수집하는 계층이다.

Examples:
- HTTP headers / HTTP 헤더
- HTML body / HTML 본문
- asset references / 자산 참조
- browser network events / 브라우저 네트워크 이벤트
- cookies / 쿠키

### 2. Normalization Layer / 정규화 계층
Converts raw collector output into consistent internal structures.
수집 결과를 내부에서 일관되게 사용할 수 있는 구조로 정규화한다.

### 3. Analyzers / 분석 계층
Applies security logic to normalized data.
정규화된 데이터에 보안 분석 로직을 적용한다.

Examples:
- header analysis / 헤더 분석
- cookie analysis / 쿠키 분석
- sourcemap detection / 소스맵 탐지
- client exposure indicators / 클라이언트 노출 시그널 분석

### 4. Scoring / 점수화 계층
Calculates severity or summary scores from findings.
분석 결과를 바탕으로 심각도 및 요약 점수를 계산한다.

### 5. Reporters / 리포트 계층
Transforms findings and metadata into exportable outputs.
finding과 메타데이터를 실제 출력 가능한 리포트 형식으로 변환한다.

Supported targets:
- JSON
- Markdown
- HTML

## Design Principles / 설계 원칙

- Separate collection from analysis / 수집과 분석을 분리한다
- Keep data models explicit / 데이터 모델을 명시적으로 유지한다
- Make analyzers composable / 분석기를 조합 가능하게 만든다
- Keep reporting independent from scan logic / 리포트는 스캔 로직과 분리한다
- Allow future browser and crawl expansion / 추후 브라우저/크롤링 확장을 고려한다
