# Finding Normalization / finding 정규화

## Purpose / 목적

As FrontScope grows, multiple analyzers can emit overlapping findings.
FrontScope가 커질수록 여러 analyzer가 겹치는 finding을 만들 수 있다.

This layer reduces duplicated noise and keeps the final report more readable.
이 계층은 중복 잡음을 줄이고 최종 리포트를 더 읽기 쉽게 만든다.

## Current Strategy / 현재 전략

Findings are normalized by a key composed of:
finding은 아래 조합 키 기준으로 정규화된다:
- category
- target
- normalized title

When duplicates are merged:
중복이 합쳐질 때:
- higher severity is preserved  
  더 높은 severity를 유지한다.
- stronger confidence is preserved  
  더 강한 confidence를 유지한다.
- evidence is unioned and deduplicated  
  evidence를 합치고 중복 제거한다.
- references are unioned  
  references를 합친다.

## Why This Matters / 왜 중요한가

A security report with repeated findings quickly becomes noisy and harder to trust.
보안 리포트에서 같은 finding이 반복되면 잡음이 커지고 신뢰도가 떨어진다.

Normalization improves signal-to-noise ratio without weakening the underlying analyzers.
정규화는 analyzer 자체를 약화시키지 않으면서 신호 대비 잡음비를 개선한다.
