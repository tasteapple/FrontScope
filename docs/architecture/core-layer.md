# Core Layer / 코어 계층

## Purpose / 목적

The core layer is responsible for orchestrating collectors, analyzers, and reporters into a single scan flow.
코어 계층은 collector, analyzer, reporter를 하나의 스캔 흐름으로 묶는 역할을 한다.

It should not duplicate low-level collection logic.
저수준 수집 로직을 중복 구현해서는 안 된다.

---

## Current Responsibilities / 현재 책임

### `target.ts`
Builds normalized target metadata from scan input.
스캔 입력으로부터 정규화된 대상 메타데이터를 생성한다.

### `static-scan.ts`
Assembles static collector output into a base `ScanResult`.
정적 collector 출력값을 조립하여 기본 `ScanResult`를 생성한다.

---

## Design Rules / 설계 규칙

- Core modules orchestrate, they do not replace collectors.  
  코어 모듈은 오케스트레이션을 담당하며 collector를 대체하지 않는다.
- The base scan result should be valid even before analyzers are attached.  
  analyzer가 붙기 전에도 기본 스캔 결과는 유효해야 한다.
- Summary generation may begin in core and later be refined by scoring modules.  
  요약 정보 생성은 core에서 시작하고 이후 scoring 계층에서 고도화할 수 있다.

---

## Near-Term Next Step / 단기 다음 단계

The next step is to connect analyzers to the base static scan result so findings and indicators can be populated.
다음 단계는 기본 정적 스캔 결과에 analyzer를 연결해 finding과 indicator를 채우는 것이다.
