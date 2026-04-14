# GLM Quota Monitor

VSCode 확장 프로그램. 지푸AI(GLM) API 잔여 사용량을 상태 표시줄에서 실시간 확인.

## 기능
- 상태 표시줄 우측에 현재 잔액 표시
- 클릭 시 잔액 상세 팝업
- 5분 자동 갱신
- API 키는 VSCode SecretStorage에 안전 저장

## API 엔드포인트
- URL: `https://open.bigmodel.cn/api/paas/v4/billing/query_balance`
- Method: GET
- Auth: Bearer Token (지푸AI API 키)

## 프로젝트 구조
```
quotaMonitor/
├── src/
│   ├── extension.ts      # 진입점, 명령어 등록
│   ├── apiClient.ts      # 지푸AI 잔액 조회 API 클라이언트
│   ├── statusBar.ts      # 상태 표시줄 관리 (표시, 자동 갱신)
│   └── quotaPanel.ts     # 클릭 시 Webview 팝업
├── docs/
│   ├── INDEX.md
│   ├── quotaMonitor.md
│   └── savepoint/
├── package.json
└── tsconfig.json
```

## 사용법
1. VSCode에서 `~/projects/quotaMonitor` 폴더 열기
2. F5로 디버그 실행 (Extension Development Host)
3. `Ctrl+Shift+P` → `GLM: API 키 설정`으로 API 키 입력
4. 상태 표시줄 우측에서 잔액 확인, 클릭으로 상세 팝업

## 명령어
| 명령어 | 동작 |
|--------|------|
| `GLM: API 키 설정` | API 키 입력/변경 |
| `GLM: 잔여량 확인` | 잔액 팝업 열기 |
| `GLM: 새로고침` | 수동 갱신 |
