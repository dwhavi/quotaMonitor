---
summary: "VSCode 확장 - 지푸AI(GLM) API 잔여 사용량을 상태 표시줄에서 확인"
icon: "📊"
tags: ["vscode", "extension", "ai", "monitor"]
---

# 사용 기술

- TypeScript
- VSCode Extension API

# 프로젝트 구조

```
src/
  extension.ts         # VSCode 확장 메인
out/                   # 컴파일된 JS 파일
```

# 기능

## 잔여량 확인
- GLM API 잔여 사용량을 VSCode 상태 표시줄에 표시
- `glm-quota-monitor.showQuota` 명령으로 확인

## API 키 설정
- GLM API 키 설정
- `glm-quota-monitor.setApiKey` 명령으로 설정

## 새로고침
- 잔여량 갱신
- `glm-quota-monitor.refresh` 명령으로 새로고침

# 명령어

| 명령 | 설명 |
|------|------|
| `glm-quota-monitor.showQuota` | 잔여량 확인 |
| `glm-quota-monitor.setApiKey` | API 키 설정 |
| `glm-quota-monitor.refresh` | 새로고침 |

# 정보

- **DisplayName**: GLM Quota Monitor
- **Version**: 0.1.0
- **Publisher**: dwhavi
- **VSCode**: ^1.85.0
