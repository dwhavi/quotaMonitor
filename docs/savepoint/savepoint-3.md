# Save Point 3 — API 응답 구조 수정 및 원인 분석

## 완료된 작업
- API 응답 파싱 수정: `balance`/`balance_str` → `total_balance`/`granted_balance`/`topped_balance`/`is_available`
- 에러 체크 수정: `json.error_code` → `json.code !== 'success'`
- `QuotaInfo` 인터페이스, statusBar, quotaPanel 전반 수정
- VSIX 재패키징 및 Contabo 서버 VSCode에 설치
- API 호출 404 원인 분석 완료

## 생성/수정 파일
- `src/apiClient.ts` — API 응답 구조 수정
- `src/statusBar.ts` — totalBalance 참조로 변경
- `src/quotaPanel.ts` — 잔액 분리 표시 수정
- `glm-quota-monitor-0.1.0.vsix` — 재패키징

## 원인 분석 결과
- `GLM_API_KEY`는 빅모델 공식 키가 아닌 **Z.AI 전용 프록시 키**
- Z.AI는 `chat/completions`만 지원, `billing/query_balance` 엔드포인트 없음
- `open.bigmodel.cn`에 Z.AI 키로는 인증 불가 → 404
- 해결 필요: 빅모델 공식 API 키 확보 후 확장에 설정

## 복구 방법
1. `docs/quotaMonitor.md` 읽고 프로젝트 개요 확인
2. `docs/INDEX.md` 읽고 작업 매핑 확인

## 다음 단계
- 빅모델 공식 API 키 확보 (마스터 확인 중)
- 공식 키로 `open.bigmodel.cn` billing API 호출 테스트
- 정상 작동 확인 후 Contabo 서버에 최종 배포
