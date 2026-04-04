# Semver Range Matching / 버전 범위 매칭

## Purpose / 목적

This layer extends advisory matching beyond exact version equality.
이 계층은 advisory 매칭을 정확히 같은 버전 비교에서 벗어나 범위 비교까지 확장한다.

## Current Supported Forms / 현재 지원 형식

- exact version equality through advisory `affectedVersions`
- comparison ranges such as:
  - `<3.5.0`
  - `<=1.12.4`
  - `>=1.0.0 <3.0.0`
- major branch shorthand such as:
  - `1.x`

## Current Limitations / 현재 한계

The current matcher is intentionally lightweight.
현재 매처는 의도적으로 가벼운 구현이다.

It assumes normalized `major.minor.patch` version strings and does not yet implement full npm semver semantics.
정규화된 `major.minor.patch` 버전 문자열을 가정하며, 아직 npm semver 전체 문법을 구현하지는 않는다.

## Why This Matters / 왜 중요한가

Range matching is necessary if FrontScope is to evolve from hand-curated version hits into practical advisory correlation.
범위 매칭은 FrontScope가 수동 버전 히트 수준을 넘어 실용적인 advisory 상관 분석 도구로 발전하기 위해 필수적이다.
