# Static Fetch Layer / 정적 fetch 계층

## Purpose / 목적

The static fetch layer performs the first real network request for a target URL and converts the response into data the collector layer can consume.
정적 fetch 계층은 대상 URL에 대한 첫 실제 네트워크 요청을 수행하고, 그 응답을 collector 계층이 소비할 수 있는 데이터로 바꾼다.

---

## Current Behavior / 현재 동작

### `src/utils/http.ts`
Provides `fetchWithMetadata()`.
`fetchWithMetadata()`를 제공한다.

Current responsibilities:
현재 책임:
- request the target URL / 대상 URL 요청
- manually follow redirects / 수동 리다이렉트 추적
- preserve redirect chain metadata / 리다이렉트 체인 메타데이터 보존
- capture response headers / 응답 헤더 수집
- collect response body / 응답 본문 수집
- expose content type / 콘텐츠 타입 제공

---

## Why It Lives in `utils/` for Now / 현재 `utils/`에 두는 이유

At the current project stage, static fetching is still infrastructure rather than analysis logic.
현재 프로젝트 단계에서 정적 fetch는 분석 로직이 아니라 인프라 계층에 가깝다.

It may later move into a dedicated transport or runtime layer if the project grows.
프로젝트가 커지면 추후 transport 또는 runtime 전용 계층으로 분리될 수 있다.

---

## Near-Term Next Step / 단기 다음 단계

The next step is to connect asset extraction so the fetched HTML produces real `CollectedAsset` entries rather than an empty asset list.
다음 단계는 fetch된 HTML로부터 실제 `CollectedAsset` 목록이 생성되도록 asset extraction을 연결하는 것이다.
