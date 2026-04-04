# Remote Advisory Fallback / 원격 어드바이저리 fallback

## Purpose / 목적

When local advisory data is missing or insufficient, FrontScope can query a remote advisory source and cache the result.
로컬 advisory 데이터가 없거나 부족할 때, FrontScope는 원격 advisory 소스를 조회하고 결과를 캐시할 수 있다.

## Current Behavior / 현재 동작

1. check local advisory files  
   로컬 advisory 파일을 먼저 확인한다.
2. check cached remote advisory files  
   캐시된 원격 advisory 파일을 확인한다.
3. if still unmatched, query OSV  
   여전히 매칭되지 않으면 OSV를 조회한다.
4. cache fetched advisories under `data/advisories-cache/`  
   가져온 advisory를 `data/advisories-cache/` 아래에 캐시한다.

## Why This Matters / 왜 중요한가

This closes the gap between a hand-curated local rule set and a practical version-aware library assessment workflow.
이는 수동 로컬 룰셋과 실전적인 버전 인지형 라이브러리 평가 워크플로 사이의 간극을 줄여준다.

## Current Limitation / 현재 한계

The current implementation queries a generic remote source and still depends on the quality of library detection.
현재 구현은 일반적인 원격 소스를 조회하지만, 여전히 라이브러리 탐지 품질에 의존한다.
