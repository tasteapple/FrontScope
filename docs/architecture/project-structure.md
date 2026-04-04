# Project Structure / 프로젝트 구조

## Purpose / 목적

This document describes the intended responsibility of each directory in FrontScope.
이 문서는 FrontScope에서 각 디렉토리가 맡는 책임을 설명한다.

## Top-Level Directories / 최상위 디렉토리

### `src/`
Main source code.
메인 소스코드 위치.

### `docs/`
Architecture notes, roadmap, examples, and design decisions.
아키텍처 메모, 로드맵, 예시, 설계 결정 사항을 정리하는 문서 위치.

### `examples/`
Sample input/output artifacts.
샘플 입력/출력 아티팩트 저장 위치.

### `reports/`
Generated scan reports.
생성된 스캔 리포트 저장 위치.

### `scripts/`
Helper or automation scripts used during development.
개발 중 사용하는 보조/자동화 스크립트 위치.

### `tests/`
Unit, integration, and regression tests.
단위 테스트, 통합 테스트, 회귀 테스트 위치.

## Source Layout / 소스 구조

### `src/cli/`
Command-line entrypoints and command parsing.
CLI 진입점 및 명령어 파싱을 담당한다.

### `src/core/`
Main scan pipeline, orchestration, and execution flow.
메인 스캔 파이프라인, 오케스트레이션, 실행 흐름을 담당한다.

### `src/collectors/`
Raw data collection modules.
원시 데이터 수집 모듈이 위치한다.

Expected examples:
- headers collector / 헤더 수집기
- HTML collector / HTML 수집기
- browser/network collector / 브라우저/네트워크 수집기
- cookie collector / 쿠키 수집기

### `src/analyzers/`
Security analysis modules that produce findings.
finding을 생성하는 보안 분석 모듈 위치.

Expected examples:
- headers analyzer / 헤더 분석기
- CSP analyzer / CSP 분석기
- sourcemap analyzer / 소스맵 분석기
- secrets/exposure analyzer / 노출 시그널 분석기

### `src/extractors/`
Extraction utilities for URLs, patterns, frameworks, tokens, and similar artifacts.
URL, 패턴, 프레임워크, 토큰 등 각종 아티팩트를 추출하는 유틸리티 위치.

### `src/report/`
Report builders and format-specific output modules.
리포트 생성기 및 출력 형식별 모듈 위치.

### `src/scoring/`
Severity mapping and score calculation rules.
심각도 매핑 및 점수 계산 규칙 위치.

### `src/models/`
Shared data schemas and internal models.
공용 데이터 스키마 및 내부 모델 위치.

### `src/config/`
Configuration defaults, rule packs, and tunable settings.
기본 설정, 규칙 묶음, 조정 가능한 설정 위치.

### `src/utils/`
Common helpers and normalization utilities.
공통 보조 함수 및 정규화 유틸리티 위치.

## Structural Rules / 구조 규칙

- Collectors should gather data, not decide severity.  
  수집기는 데이터를 모아야 하며 심각도를 판단하지 않는다.
- Analyzers should consume normalized data and emit findings.  
  분석기는 정규화된 데이터를 입력받아 finding을 생성해야 한다.
- Reporters should not perform raw collection.  
  리포터는 원시 수집을 수행하지 않는다.
- Shared types should live in `src/models/`.  
  공용 타입은 `src/models/`에 둔다.
- Experimental notes belong in `docs/`, not in source folders.  
  실험 메모는 소스 폴더가 아니라 `docs/`에 둔다.
