# Extractors Layer / 추출기 계층

## Purpose / 목적

Extractors are responsible for pulling structured signals or candidates out of raw content.
extractor는 원시 콘텐츠에서 구조화된 시그널이나 후보 데이터를 뽑아내는 역할을 맡는다.

They sit between raw content and higher-level analysis or collection assembly.
이 계층은 원시 콘텐츠와 상위 분석/수집 조립 계층 사이에 위치한다.

---

## Current Extractors / 현재 추출기

### `assets.extractor.ts`
Extracts asset candidates such as scripts, stylesheets, images, iframes, and manifests from static HTML.
정적 HTML에서 script, stylesheet, image, iframe, manifest 같은 자산 후보를 추출한다.

Current behavior:
현재 동작:
- parse tag attributes / 태그 속성 파싱
- resolve relative URLs / 상대 URL 정규화
- return asset candidates for collector conversion / collector 변환용 자산 후보 반환

---

## Rules / 규칙

- Extractors should focus on extraction, not severity decisions.  
  extractor는 추출에 집중하고 심각도 판단은 하지 않는다.
- Extracted output should be easy to convert into shared models.  
  추출 결과는 공용 모델로 쉽게 변환 가능해야 한다.
- Regex-based extraction is acceptable in MVP if limitations are documented.  
  MVP에서는 한계가 문서화되어 있다면 정규식 기반 추출도 허용된다.

---

## Notes / 메모

The current asset extractor is intentionally lightweight and may later be replaced or expanded with an HTML parser for stronger accuracy.
현재 asset extractor는 의도적으로 가볍게 시작했으며, 추후 정확도 향상을 위해 HTML 파서 기반으로 교체 또는 확장될 수 있다.
