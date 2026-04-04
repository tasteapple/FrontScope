# SQLi Risk Heuristics / SQLi 리스크 휴리스틱

## Purpose / 목적

This layer does not attempt full SQL injection exploitation.
이 계층은 완전한 SQL injection 익스플로잇을 시도하지 않는다.

Instead, it raises server-side input handling risks that are visible from client-side assets and responses.
대신 클라이언트 자산과 응답에서 보이는 서버측 입력 처리 리스크를 끌어올리는 역할을 한다.

## Current Heuristics / 현재 휴리스틱

### 1. SQL error signature detection / SQL 오류 시그니처 탐지
Looks for signs such as:
아래와 같은 흔적을 찾는다:
- `SQLException`
- `JDBC`
- `ORA-`
- `MySQL`
- `PostgreSQL`
- `SQL Server`
- generic SQL syntax error phrases

### 2. Risky parameter detection / 위험 파라미터 탐지
Flags endpoints with parameters such as:
다음과 같은 파라미터가 있는 endpoint를 표시한다:
- `id`
- `user`, `userid`, `loginid`
- `boardNo`, `articleNo`, `attachNo`
- `search`, `query`, `keyword`
- `page`, `sort`

### 3. Endpoint behavior hints / 엔드포인트 동작 힌트
Prioritizes endpoints with behaviors such as:
다음과 같은 성격의 endpoint를 우선시한다:
- login
- search
- list
- view
- download
- api

## Design Position / 설계 위치

These findings are intentionally labeled as risk signals rather than confirmed SQL injection vulnerabilities.
이 finding들은 확인된 SQL injection 취약점이 아니라 리스크 시그널로 의도적으로 분류된다.

The goal is to guide deeper review and later low-risk active validation.
목표는 더 깊은 검토와 향후 저위험 활성 검증을 유도하는 것이다.
