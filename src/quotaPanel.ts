import * as vscode from 'vscode';

export class QuotaPanel {
  private panel: vscode.WebviewPanel | null = null;

  show(
    context: vscode.ExtensionContext,
    quotaData: { balanceStr: string; updatedAt: string } | null,
    apiKeySet: boolean
  ) {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'glmQuota',
        'GLM 잔여량',
        vscode.ViewColumn.One,
        { enableScripts: false }
      );
      this.panel.onDidDispose(() => { this.panel = null; });
    }

    this.panel.webview.html = this.getHtml(quotaData, apiKeySet);
  }

  private getHtml(
    quota: { balanceStr: string; updatedAt: string } | null,
    apiKeySet: boolean
  ): string {
    const body = !apiKeySet
      ? `<p style="color:#f85149;">API 키가 설정되지 않았습니다.</p>
         <p>Ctrl+Shift+P → <b>GLM: API 키 설정</b>을 실행해 주세요.</p>`
      : quota
        ? `<table>
             <tr><td class="label">잔액</td><td class="value">¥${quota.balanceStr}</td></tr>
             <tr><td class="label">갱신 시간</td><td class="value">${quota.updatedAt}</td></tr>
           </table>`
        : `<p>데이터를 불러오지 못했습니다.</p>
           <p>상태 표시줄에서 새로고침을 시도해 주세요.</p>`;

    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: -apple-system, sans-serif; padding: 16px; color: var(--vscode-foreground); }
  h2 { margin: 0 0 12px; }
  table { border-collapse: collapse; width: 100%; }
  td { padding: 8px 12px; border-bottom: 1px solid var(--vscode-panel-border); }
  .label { color: var(--vscode-descriptionForeground); }
  .value { font-weight: 600; text-align: right; font-size: 1.1em; }
  .note { margin-top: 16px; font-size: 0.85em; color: var(--vscode-descriptionForeground); }
</style></head>
<body>
  <h2>$(robot) GLM 잔여량</h2>
  ${body}
  <p class="note">엔드포인트: open.bigmodel.cn/api/paas/v4/billing/query_balance</p>
  <p class="note">5분마다 자동 갱신됩니다. 상태 표시줄 클릭으로 수동 갱신.</p>
</body></html>`;
  }
}
