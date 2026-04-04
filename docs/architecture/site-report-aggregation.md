# Site Report Aggregation / 사이트 리포트 집계

## Purpose / 목적

This layer summarizes multi-page crawl results into a site-level view.
이 계층은 다중 페이지 크롤 결과를 사이트 단위 시각으로 요약한다.

## Current Output / 현재 출력

- `site-report.json`: raw scanned page results
- `site-summary.json`: aggregated site-level summary

## Current Aggregates / 현재 집계 항목

- total pages scanned
- total findings across pages
- severity totals
- endpoint finding count
- library finding count
- page-by-page summary

## Why It Matters / 왜 중요한가

Once crawl mode is active, single-page reporting is no longer enough.
크롤 모드가 활성화되면 단일 페이지 리포트만으로는 부족하다.

A site summary makes multi-page reconnaissance easier to read and compare.
사이트 요약은 다중 페이지 정찰 결과를 더 읽기 쉽고 비교 가능하게 만든다.
