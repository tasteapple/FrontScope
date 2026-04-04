# Crawl Seeding / 크롤 시드 확장

## Purpose / 목적

This layer improves site crawl coverage by adding more starting points beyond anchor links.
이 계층은 anchor 링크 외에 더 많은 시작점을 추가해 사이트 크롤 커버리지를 높인다.

## Current Seed Sources / 현재 시드 소스

- same-origin anchor links from HTML
- same-origin API endpoint indicators extracted during analysis
- `/sitemap.xml` URLs when available

## Why It Matters / 왜 중요한가

Many modern applications do not expose enough meaningful navigation through simple anchor tags alone.
현대 웹 애플리케이션은 단순 anchor 링크만으로 충분한 탐색 경로를 드러내지 않는 경우가 많다.

Seeding from sitemap and extracted endpoints makes crawl mode much more useful in practice.
sitemap과 추출된 endpoint를 시드로 활용하면 실제 크롤 모드의 유용성이 훨씬 올라간다.
