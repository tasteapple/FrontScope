# Reporters Layer / 리포터 계층

## Purpose / 목적

Reporters transform the final `ScanResult` into exportable output formats.
reporter는 최종 `ScanResult`를 외부로 내보낼 수 있는 출력 형식으로 변환한다.

They should not perform collection or analysis.
reporter는 수집이나 분석을 수행해서는 안 된다.

---

## Current Reporters / 현재 리포터

### `json.reporter.ts`
Serializes the full result object as JSON.
전체 결과 객체를 JSON으로 직렬화한다.

### `markdown.reporter.ts`
Builds a human-readable Markdown summary of the scan.
스캔 결과를 사람이 읽기 쉬운 Markdown 요약으로 변환한다.

---

## Rules / 규칙

- Reporters consume `ScanResult` only.  
  reporter는 `ScanResult`만 입력으로 사용한다.
- Reporters should remain format-focused.  
  reporter는 출력 형식 자체에 집중해야 한다.
- Rendering logic should not silently alter core findings.  
  렌더링 로직은 핵심 finding을 임의로 바꾸면 안 된다.

---

## Near-Term Next Step / 단기 다음 단계

The next step is to connect these reporters to a CLI entrypoint so reports can be generated from a target URL.
다음 단계는 이 reporter를 CLI 진입점에 연결해 실제 대상 URL로부터 리포트를 생성할 수 있게 만드는 것이다.
