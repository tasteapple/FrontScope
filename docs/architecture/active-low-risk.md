# Active Low-Risk Mode / 저위험 활성 모드

## Purpose / 목적

This mode adds limited active validation on top of passive collection.
이 모드는 수동 수집 위에 제한적인 활성 검증을 추가한다.

It is designed to stay low-risk and informational by default.
기본적으로 저위험·정보성 수준에 머물도록 설계된다.

## Current Checks / 현재 점검 항목

- `/.well-known/security.txt` reachability
- `/robots.txt` reachability
- `/manifest.json` reachability
- `/service-worker.js` reachability
- confirmation that exposed endpoints exist for deeper manual review

## Invocation / 실행

```bash
npm run scan -- https://target.example --active-low-risk
```

## Design Position / 설계 위치

This is not exploit logic.
이것은 익스플로잇 로직이 아니다.

The goal is to validate low-impact observable behavior and enrich the report with slightly stronger evidence.
목표는 영향이 낮은 관찰 가능 동작을 검증하고, 리포트에 조금 더 강한 근거를 추가하는 것이다.
