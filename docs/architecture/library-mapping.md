# Library Mapping and Version Fingerprinting / 라이브러리 매핑 및 버전 식별

## Purpose / 목적

This layer identifies known client-side libraries and maps them into structured findings.
이 계층은 알려진 클라이언트 라이브러리를 식별하고 이를 구조화된 finding으로 매핑한다.

## Current Mapping Scope / 현재 매핑 범위

### jQuery 1.10.2
- detected by filename or inline signature
- treated as an outdated library finding

### JSON2 legacy library
- detected as a legacy compatibility shim
- treated as a maintenance / security-surface signal

## Why This Matters / 왜 중요한가

Library version detection is a bridge between raw asset collection and vulnerability-oriented analysis.
라이브러리 버전 식별은 원시 자산 수집과 취약성 중심 분석을 이어주는 다리다.

It allows FrontScope to evolve from generic reconnaissance into prioritized security assessment.
이를 통해 FrontScope는 일반 정찰 도구에서 우선순위 기반 보안 분석 도구로 발전할 수 있다.

## Near-Term Direction / 단기 방향

The next improvement is to expand signature coverage and attach vulnerability or maintenance hints to more libraries.
다음 개선 방향은 더 많은 라이브러리 시그니처를 추가하고 취약성 또는 유지보수 힌트를 연결하는 것이다.
