# Library Coverage Expansion / 라이브러리 커버리지 확장

## Purpose / 목적

This document tracks the expansion of FrontScope's library detection coverage.
이 문서는 FrontScope 라이브러리 탐지 커버리지 확장을 기록한다.

## Current Detection Targets / 현재 탐지 대상

- jquery
- json2
- axios
- lodash
- bootstrap
- moment
- vue
- react
- angular

## Detection Strategy / 탐지 전략

The current detector uses a lightweight mix of:
현재 detector는 아래를 조합한 가벼운 방식으로 동작한다:
- filename patterns
- inline version banners
- common version property patterns

## Design Note / 설계 메모

Coverage expansion matters because the advisory engine only becomes useful when detections are broad enough to trigger real matching opportunities.
커버리지가 넓어져야 advisory 엔진이 실제 매칭 기회를 많이 가지므로 전체 가치가 올라간다.
