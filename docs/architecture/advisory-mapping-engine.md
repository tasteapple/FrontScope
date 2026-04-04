# Advisory Mapping Engine / 어드바이저리 매핑 엔진

## Purpose / 목적

This layer moves FrontScope beyond hardcoded version findings and toward a structured library detection and advisory mapping system.
이 계층은 FrontScope를 하드코딩된 버전 finding 수준에서 벗어나 구조화된 라이브러리 탐지 및 어드바이저리 매핑 시스템으로 확장한다.

## Current Flow / 현재 흐름

1. detect library name and version from fetched JavaScript  
   fetch된 JavaScript에서 라이브러리 이름과 버전을 탐지한다.
2. load local advisory records  
   로컬 advisory 레코드를 불러온다.
3. match detected version against known affected versions  
   탐지된 버전을 알려진 영향 버전과 비교한다.
4. emit mapped findings or fallback findings  
   매핑된 finding 또는 fallback finding을 생성한다.

## Current Limitation / 현재 한계

The current version matcher uses exact version matching only.
현재 버전 매처는 정확히 일치하는 버전만 비교한다.

Near-term improvement should include semver range handling and optional remote advisory hydration.
가까운 다음 개선에서는 semver 범위 처리와 선택적 원격 advisory 보강이 들어가야 한다.
