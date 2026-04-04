# Enterprise Route Discovery / 엔터프라이즈 경로 탐지

## Purpose / 목적

This layer improves crawl coverage for legacy and enterprise-style web applications that do not expose navigation primarily through normal anchor links.
이 계층은 일반 anchor 링크보다 설정 문자열과 스크립트 경로에 더 많이 의존하는 레거시/엔터프라이즈 웹앱의 크롤 커버리지를 높인다.

## Current Route Patterns / 현재 경로 패턴

The current extractor looks for same-origin routes such as:
현재 extractor는 다음과 같은 same-origin 경로를 찾는다:
- `.jsp`
- `.do`
- `.xml`
- `.wq`
- `.json`
- `/websquare/...`

## Current Sources / 현재 소스

- HTML body
- fetched JavaScript asset contents

## Why It Matters / 왜 중요한가

Applications built around older portal frameworks, WebSquare-style routing, and server-rendered workflow endpoints often hide meaningful paths inside scripts and config strings.
오래된 포털 프레임워크, WebSquare 스타일 라우팅, 서버 렌더링 워크플로 엔드포인트 기반 애플리케이션은 의미 있는 경로를 스크립트와 설정 문자열 안에 숨기는 경우가 많다.
