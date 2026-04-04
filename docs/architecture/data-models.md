# Data Models / 데이터 모델

## Purpose / 목적

This document defines the core internal data models that FrontScope should use across collection, analysis, scoring, and reporting.
이 문서는 FrontScope가 수집, 분석, 점수화, 리포트 생성 전반에서 공통으로 사용할 핵심 내부 데이터 모델을 정의한다.

The goal is to keep module boundaries clean and prevent each component from inventing its own incompatible shape.
목표는 모듈 간 경계를 명확하게 유지하고, 각 컴포넌트가 제각각 다른 형식을 만드는 것을 막는 것이다.

---

## Model Design Principles / 모델 설계 원칙

- collector output should be normalized before analysis  
  수집기 출력은 분석 전에 정규화되어야 한다.
- analyzers should read shared models and emit findings  
  분석기는 공용 모델을 입력으로 받고 finding을 출력해야 한다.
- reporters should consume a single final result model  
  리포터는 단일 최종 결과 모델을 입력으로 사용해야 한다.
- evidence should be preserved without forcing raw dumps everywhere  
  모든 원시 데이터를 그대로 덤프하지 않더라도 핵심 근거는 보존해야 한다.

---

## Core Models / 핵심 모델

### 1. ScanInput / 스캔 입력
Represents the user-provided scan request.
사용자가 제공한 스캔 요청을 나타낸다.

Suggested fields / 권장 필드:
- `targetUrl` / 대상 URL
- `scanMode` / 스캔 모드
- `followRedirects` / 리다이렉트 추적 여부
- `enableBrowserCollection` / 브라우저 수집 활성화 여부
- `outputFormats` / 출력 형식 목록
- `timeoutMs` / 타임아웃

---

### 2. TargetMetadata / 대상 메타데이터
Represents normalized information about the scan target.
정규화된 대상 정보를 나타낸다.

Suggested fields / 권장 필드:
- `originalUrl` / 원본 URL
- `normalizedUrl` / 정규화 URL
- `scheme` / 스킴
- `hostname` / 호스트명
- `port` / 포트
- `origin` / 오리진
- `scanStartedAt` / 스캔 시작 시각

---

### 3. RedirectEntry / 리다이렉트 항목
Represents a single redirect transition.
단일 리다이렉트 전환을 나타낸다.

Suggested fields / 권장 필드:
- `fromUrl` / 이전 URL
- `toUrl` / 다음 URL
- `statusCode` / 상태 코드
- `locationHeader` / Location 헤더

---

### 4. ResponseSnapshot / 응답 스냅샷
Represents the primary static HTTP response.
주요 정적 HTTP 응답 정보를 나타낸다.

Suggested fields / 권장 필드:
- `finalUrl` / 최종 URL
- `statusCode` / 상태 코드
- `headers` / 헤더 집합
- `contentType` / 콘텐츠 타입
- `bodyLength` / 본문 길이
- `html` / HTML 내용

---

### 5. CollectedAsset / 수집된 자산
Represents a browser-facing asset discovered during collection.
수집 과정에서 발견된 브라우저 노출 자산을 나타낸다.

Suggested fields / 권장 필드:
- `url` / 자산 URL
- `type` / 자산 유형
- `source` / 발견 출처
- `isThirdParty` / 서드파티 여부
- `integrity` / integrity 속성
- `attributes` / 기타 속성

Possible asset types / 가능한 자산 유형:
- `script`
- `stylesheet`
- `image`
- `iframe`
- `manifest`
- `font`
- `xhr`
- `fetch`
- `websocket`
- `other`

---

### 6. BrowserObservation / 브라우저 관찰 결과
Represents optional browser-collected runtime data.
선택적으로 수집되는 브라우저 런타임 데이터를 나타낸다.

Suggested fields / 권장 필드:
- `networkRequests` / 네트워크 요청 목록
- `consoleMessages` / 콘솔 메시지 목록
- `cookies` / 브라우저 쿠키 목록
- `storageKeys` / 스토리지 키 목록
- `loadedAssets` / 동적으로 로드된 자산

---

### 7. ExposureIndicator / 노출 시그널
Represents a suspicious or interesting string or pattern discovered in client-side resources.
클라이언트 리소스에서 발견된 의심스럽거나 주목할 만한 문자열/패턴을 나타낸다.

Suggested fields / 권장 필드:
- `kind` / 시그널 종류
- `value` / 발견 값
- `location` / 발견 위치
- `sourceAsset` / 원본 자산
- `confidence` / 신뢰도
- `notes` / 메모

Possible kinds / 가능한 종류:
- `api-endpoint`
- `token-like-string`
- `internal-hostname`
- `localhost-reference`
- `framework-config`
- `storage-key`
- `sourcemap-reference`
- `third-party-service-id`

---

### 8. Finding / finding
Represents a normalized security observation produced by analyzers.
분석기가 생성하는 정규화된 보안 관찰 결과를 나타낸다.

Suggested fields / 권장 필드:
- `id` / 고유 식별자
- `title` / 제목
- `severity` / 심각도
- `category` / 카테고리
- `target` / 대상 위치
- `description` / 설명
- `evidence` / 근거
- `recommendation` / 권고 사항
- `references` / 참고 자료

Suggested severity values / 권장 심각도 값:
- `info`
- `low`
- `medium`
- `high`

Suggested categories / 권장 카테고리:
- `headers`
- `cookies`
- `csp`
- `sourcemap`
- `javascript`
- `third-party`
- `storage`
- `configuration`
- `exposure`

---

### 9. ScanSummary / 스캔 요약
Represents top-level summary numbers for the completed scan.
완료된 스캔의 상위 요약 수치를 나타낸다.

Suggested fields / 권장 필드:
- `totalFindings` / 전체 finding 수
- `severityCounts` / 심각도별 개수
- `assetCounts` / 자산 유형별 개수
- `thirdPartyDomainCount` / 서드파티 도메인 수
- `redirectCount` / 리다이렉트 수
- `score` / 종합 점수

---

### 10. ScanResult / 최종 스캔 결과
Represents the single final object passed to reporters.
리포터에 전달되는 최종 단일 결과 객체를 나타낸다.

Suggested fields / 권장 필드:
- `metadata` / 메타데이터
- `redirects` / 리다이렉트 목록
- `response` / 주요 응답 정보
- `assets` / 자산 목록
- `browser` / 브라우저 관찰 결과
- `indicators` / 노출 시그널 목록
- `findings` / finding 목록
- `summary` / 요약 정보
- `errors` / 오류 목록

---

## Recommended Flow / 권장 데이터 흐름

```text
ScanInput
  ↓
TargetMetadata
  ↓
Collectors
  ↓
ResponseSnapshot + CollectedAsset + BrowserObservation
  ↓
ExposureIndicator
  ↓
Finding
  ↓
ScanSummary
  ↓
ScanResult
```

---

## Notes for Implementation / 구현 메모

- The MVP should start with simple versions of these models and avoid premature complexity.  
  MVP에서는 이 모델들을 단순한 형태로 시작하고 과도한 복잡성을 피한다.
- Optional browser fields can remain nullable until browser collection is implemented.  
  브라우저 수집이 구현되기 전까지 브라우저 관련 필드는 nullable로 둘 수 있다.
- The main contract that must stay stable is `ScanResult`.  
  가장 안정적으로 유지해야 할 핵심 계약은 `ScanResult`다.
