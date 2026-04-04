# Validation Status / 검증 상태

## Current State / 현재 상태

### Verified / 검증 완료
- TypeScript project configuration is present.  
  TypeScript 프로젝트 설정이 추가되었다.
- `npm install` completes successfully.  
  `npm install`이 정상 완료된다.
- `npm run build` completes successfully.  
  `npm run build`가 정상 완료된다.
- The static scan pipeline can generate reports from a local fixture.  
  정적 스캔 파이프라인이 로컬 fixture 기준으로 리포트를 생성할 수 있다.

### Not Fully Verified in This Session / 이 세션에서 완전 검증되지 않은 항목
- External network scanning against live public URLs.  
  실제 외부 공개 URL 대상 네트워크 스캔.

## Reason / 이유

The current execution environment cannot reliably resolve or connect to external targets.
현재 실행 환경에서는 외부 대상에 대한 DNS 해석 또는 연결이 정상적으로 동작하지 않는다.

Observed examples:
관찰된 예시:
- Node fetch: `Connect Timeout Error`
- PowerShell web request: `The remote name could not be resolved`

## Practical Meaning / 실질적 의미

This does **not** automatically mean the FrontScope code is broken.
이것이 곧바로 FrontScope 코드 자체가 깨졌다는 의미는 아니다.

It means the runtime environment used during this session is not suitable for validating live external URL scanning.
이번 세션에서 사용한 런타임 환경이 외부 실 URL 스캔 검증에 적합하지 않다는 뜻이다.

## Recommended Next Validation / 권장 다음 검증

Run the following on the user machine or any environment with normal outbound network access:
정상적인 외부 네트워크 접근이 가능한 사용자 머신에서 아래를 실행한다.

```bash
npm install
npm run build
npm run smoke
npm run scan -- https://example.com
```
