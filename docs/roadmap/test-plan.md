# Test Plan / 테스트 계획

## Purpose / 목적

This document defines the first validation plan for the FrontScope MVP.
이 문서는 FrontScope MVP의 첫 검증 계획을 정의한다.

## Phase 1 Validation / 1차 검증

### Environment / 환경
- install dependencies / 의존성 설치
- verify TypeScript build / TypeScript 빌드 확인
- verify CLI execution / CLI 실행 확인

### Functional Checks / 기능 점검
- scan a simple HTTPS site / 단순 HTTPS 사이트 스캔
- verify JSON report generation / JSON 리포트 생성 확인
- verify Markdown report generation / Markdown 리포트 생성 확인
- verify redirect handling / 리다이렉트 처리 확인
- verify asset extraction count / 자산 추출 개수 확인
- verify findings are populated / finding 생성 확인

### Initial Targets / 초기 대상
- `https://example.com`
- `https://developer.mozilla.org`

## Expected Outcomes / 기대 결과

- the CLI should complete without crashing  
  CLI가 비정상 종료 없이 완료되어야 한다.
- report files should be created under `reports/`  
  `reports/` 아래 리포트 파일이 생성되어야 한다.
- findings should include at least basic header-related output where applicable  
  가능한 경우 기본 헤더 관련 finding이 포함되어야 한다.
- extracted assets should appear in the JSON output when present  
  자산이 존재하면 JSON 출력에 포함되어야 한다.
