# HTML Report Layer / HTML 리포트 계층

## Purpose / 목적

This layer renders FrontScope results into a visually readable standalone HTML report.
이 계층은 FrontScope 결과를 시각적으로 읽기 쉬운 독립형 HTML 리포트로 렌더링한다.

## Current Output / 현재 출력

The HTML report currently includes:
현재 HTML 리포트에는 다음이 포함된다:
- target metadata
- summary cards
- finding cards with severity, category, confidence, evidence, and recommendation

## Why It Matters / 왜 중요한가

As FrontScope grows beyond a small CLI utility, human-readable presentation becomes important for review and sharing.
FrontScope가 단순 CLI 유틸리티를 넘어서면, 사람이 읽기 쉬운 표현 방식이 검토와 공유에서 중요해진다.

## Current File Outputs / 현재 출력 파일

- `reports/report.json`
- `reports/report.md`
- `reports/report.html`
