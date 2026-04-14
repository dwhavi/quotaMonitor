# Save Point 1 — 프로젝트 초기 세팅

## 완료된 작업
- VSCode 확장 프로젝트 스캐폴딩 (package.json, tsconfig.json)
- API 클라이언트 구현 (지푸AI 잔액 조회 엔드포인트 연동)
- 상태 표시줄 구현 (잔액 표시, 5분 자동 갱신)
- Webview 팝업 구현 (잔액 상세)
- API 키 설정/저장 (SecretStorage)
- TypeScript 컴파일 성공 확인

## 생성/수정 파일
- `package.json`
- `tsconfig.json`
- `src/extension.ts`
- `src/apiClient.ts`
- `src/statusBar.ts`
- `src/quotaPanel.ts`

## 복구 방법
1. `docs/quotaMonitor.md` 읽고 프로젝트 개요 확인
2. `docs/INDEX.md` 읽고 작업 매핑 확인
3. VSCode에서 `~/projects/quotaMonitor` 열고 F5로 디버그 실행

## 다음 단계
- 실제 지푸AI API 키로 테스트 후 응답 구조 확인/보정
- 5시간/주간/월간 잔여량 분리 표시 (현재는 잔액만)
- VSCode Marketplace 배포 준비 (README, icon, .vscodeignore)
