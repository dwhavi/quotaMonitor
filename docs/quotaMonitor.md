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


----------------------------------------------
1. API 엔드포인트 (Endpoint)
잔액 조회를 위한 공식 엔드포인트는 다음과 같습니다.

URL: https://open.bigmodel.cn/api/paas/v4/billing/query_balance
Method: GET
2. 요청 방법
API 키(API Key)를 Authorization 헤더에 포함하여 GET 요청을 보내면 됩니다.

Python 예제 코드:

python

import requests

API_KEY = "YOUR_API_KEY"  # 실제 API 키로 변경하세요.

url = "https://open.bigmodel.cn/api/paas/v4/billing/query_balance"
headers = {
    "Authorization": f"Bearer {API_KEY}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print("잔액 정보:", data)
else:
    print("오류 발생:", response.status_code, response.text)
3. 응답 예시
요청이 성공하면 다음과 같은 형식의 JSON 응답을 받게 됩니다.

json

{
    "code": "success",
    "data": {
        "total_balance": "100.00",  # 총 잔액 (보통 위안화 또는 토큰 단위)
        "granted_balance": "50.00", # 지급된 크레딧 (프로모션 등)
        "topped_balance": "50.00",  # 충전한 금액
        "is_available": true        # 서비스 이용 가능 여부
    },
    "msg": ""
}
4. 참고 사항
단위: 응답 값의 단위는 주로 위안화(CNY) 기준의 금액인 경우가 많습니다. 지푸 AI는 토큰 수가 아닌 금액 기준으로 과금되는 구조를 가집니다.
SDK 사용: 만약 공식 Python SDK(zhipuai)를 사용 중이라면, 라이브러리 내에 구현된 메서드가 있을 수 있으나, 대부분 HTTP 요청으로 위 엔드포인트를 직접 호출하는 것이 가장 확실합니다.
상세 사용 내역: 날짜별 모델 사용량 등 상세한 내역은 API보다는 지푸 AI 오픈 플랫폼 콘솔(Open Bigmodel Console)의 '청구 관리(Billing)' 메뉴에서 확인하는 것이 더 정확합니다.