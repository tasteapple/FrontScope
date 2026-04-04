# Collectors Layer / 수집기 계층

## Purpose / 목적

This document defines the responsibility of the collector layer in FrontScope.
이 문서는 FrontScope에서 collector 계층이 맡는 책임을 정의한다.

Collectors are responsible for gathering and shaping raw input data into normalized intermediate objects.
collector는 원시 입력 데이터를 수집하고, 이를 정규화된 중간 객체로 바꾸는 역할을 맡는다.

Collectors do **not** decide severity or produce final security findings.
collector는 **심각도를 판단하거나 최종 finding을 생성하지 않는다.**

---

## Current Static Collectors / 현재 정적 수집기

### `redirect.collector.ts`
Converts redirect chain input into normalized `RedirectEntry[]`.
리다이렉트 체인 입력을 정규화된 `RedirectEntry[]`로 변환한다.

### `headers.collector.ts`
Builds a `ResponseSnapshot` from HTTP response metadata.
HTTP 응답 메타데이터로부터 `ResponseSnapshot`을 생성한다.

### `html.collector.ts`
Stores HTML content and derived size metadata.
HTML 내용과 길이 같은 파생 메타데이터를 정리한다.

### `assets.collector.ts`
Builds `CollectedAsset` objects and determines third-party status by origin comparison.
`CollectedAsset` 객체를 만들고, origin 비교를 통해 서드파티 여부를 판단한다.

---

## Rules / 규칙

- Collectors should return shared model objects.  
  collector는 공용 모델 객체를 반환해야 한다.
- Collectors should avoid embedded analysis logic.  
  collector는 분석 로직을 내부에 섞지 않아야 한다.
- Collector output should be easy to test in isolation.  
  collector 출력은 단독 테스트가 쉬워야 한다.
- Browser collectors can be added later without changing analyzer contracts.  
  추후 브라우저 수집기를 추가하더라도 analyzer 계약은 크게 바뀌지 않아야 한다.

---

## Near-Term Next Step / 단기 다음 단계

The next step is to connect these collectors into a single static pipeline.
다음 단계는 이 collector들을 하나의 정적 파이프라인으로 연결하는 것이다.
