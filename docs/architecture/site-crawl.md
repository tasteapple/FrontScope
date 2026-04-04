# Site Crawl / 사이트 크롤

## Purpose / 목적

This layer expands FrontScope from single-page scanning into limited same-origin site exploration.
이 계층은 FrontScope를 단일 페이지 스캔에서 제한된 same-origin 사이트 탐색으로 확장한다.

## Current Rules / 현재 규칙

- same-origin links only
- anchor tags only
- depth-limited crawl
- page-count-limited crawl
- breadth-first style queue

## Current CLI Options / 현재 CLI 옵션

```bash
--crawl-depth=N
--max-pages=N
```

## Current Output / 현재 출력

- `report.json` / `report.md` / `report.html` for the primary page
- `site-report.json` for the multi-page crawl result

## Design Note / 설계 메모

The current version is intentionally conservative.
현재 버전은 의도적으로 보수적으로 설계되었다.

It does not yet use sitemap seeding, JavaScript-discovered routes, or authenticated crawl logic.
아직 sitemap seed, JavaScript 기반 라우트, 인증 세션 기반 크롤 로직은 사용하지 않는다.
