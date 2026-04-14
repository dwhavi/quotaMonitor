"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotaPanel = void 0;
const vscode = __importStar(require("vscode"));
class QuotaPanel {
    constructor() {
        this.panel = null;
    }
    show(context, quotaData, apiKeySet) {
        if (this.panel) {
            this.panel.reveal(vscode.ViewColumn.One);
        }
        else {
            this.panel = vscode.window.createWebviewPanel('glmQuota', 'GLM 잔여량', vscode.ViewColumn.One, { enableScripts: false });
            this.panel.onDidDispose(() => { this.panel = null; });
        }
        this.panel.webview.html = this.getHtml(quotaData, apiKeySet);
    }
    getHtml(quota, apiKeySet) {
        const body = !apiKeySet
            ? `<p style="color:#f85149;">API 키가 설정되지 않았습니다.</p>
         <p>Ctrl+Shift+P → <b>GLM: API 키 설정</b>을 실행해 주세요.</p>`
            : quota
                ? `<table>
             <tr><td class="label">총 잔액</td><td class="value">¥${quota.totalBalance}</td></tr>
             <tr><td class="label">충전 금액</td><td class="value">¥${quota.toppedBalance}</td></tr>
             <tr><td class="label">지급 크레딧</td><td class="value">¥${quota.grantedBalance}</td></tr>
             <tr><td class="label">서비스 상태</td><td class="value">${quota.isAvailable ? '✓ 이용 가능' : '✗ 이용 불가'}</td></tr>
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
  <h2>GLM 잔여량</h2>
  ${body}
  <p class="note">엔드포인트: open.bigmodel.cn/api/paas/v4/billing/query_balance</p>
  <p class="note">5분마다 자동 갱신됩니다. 상태 표시줄 클릭으로 수동 갱신.</p>
</body></html>`;
    }
}
exports.QuotaPanel = QuotaPanel;
//# sourceMappingURL=quotaPanel.js.map