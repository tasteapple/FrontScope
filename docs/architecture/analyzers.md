# Analyzers Layer / 분석기 계층

## Purpose / 목적

Analyzers consume normalized data and produce findings or indicators.
analyzer는 정규화된 데이터를 입력으로 받아 finding 또는 indicator를 생성한다.

They should contain security logic, but they should not handle raw network collection directly.
analyzer는 보안 로직을 담아야 하지만, 원시 네트워크 수집 자체를 직접 처리해서는 안 된다.

---

## Current Analyzers / 현재 분석기

### `headers.analyzer.ts`
Checks for missing browser-facing security headers.
브라우저 보안 헤더 누락 여부를 점검한다.

### `sourcemap.analyzer.ts`
Searches for `sourceMappingURL`-style references in collected HTML.
수집된 HTML에서 `sourceMappingURL` 형태의 참조를 탐지한다.

### `exposure.analyzer.ts`
Scans static HTML for exposure-related patterns and emits indicators.
정적 HTML에서 노출 관련 패턴을 탐지하고 indicator를 생성한다.

---

## Rules / 규칙

- Analyzers must read shared models.  
  analyzer는 공용 모델을 사용해야 한다.
- Analyzers should emit normalized outputs.  
  analyzer는 정규화된 출력값을 만들어야 한다.
- Indicator extraction and finding generation may be separated when useful.  
  필요하다면 indicator 추출과 finding 생성은 분리할 수 있다.
- Severity logic should remain understandable and adjustable.  
  심각도 로직은 이해 가능하고 조정 가능해야 한다.

---

## Near-Term Next Step / 단기 다음 단계

The next step is to expand analyzer coverage to cookies, asset-level signals, and stronger CSP evaluation.
다음 단계는 쿠키, 자산 단위 시그널, 더 강한 CSP 평가까지 analyzer 범위를 확장하는 것이다.
