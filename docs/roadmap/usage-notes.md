# Usage Notes / 사용 메모

## Recommended Quick Start / 추천 빠른 시작

```bash
npm install
npm run build
npm run smoke
npm run scan -- https://target.example --active-low-risk
```

## Recommended Crawl Run / 추천 크롤 실행 예시

```bash
npm run scan -- https://target.example --active-low-risk --crawl-depth=1 --max-pages=10
```

## Practical Reading Order / 실전 확인 순서

1. `report.html`  
   사람이 빠르게 보기 좋다.
2. `report.md`  
   텍스트 기반 검토와 공유에 좋다.
3. `report.json`  
   상세 후처리와 자동화에 좋다.
4. `site-summary.json`  
   다중 페이지 스캔의 상위 요약 확인에 좋다.

## Current Best Fit / 현재 가장 잘 맞는 대상

- login pages
- legacy enterprise portals
- JSP / WebSquare style applications
- sites with exposed frontend assets and script-heavy flows
