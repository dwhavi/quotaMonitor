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
exports.StatusBarManager = void 0;
const vscode = __importStar(require("vscode"));
const apiClient_1 = require("./apiClient");
class StatusBarManager {
    constructor(context) {
        this.apiClient = null;
        this.currentQuota = null;
        this.intervalId = null;
        this.context = context;
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this.statusBarItem.command = 'glm-quota-monitor.showQuota';
        this.statusBarItem.tooltip = 'GLM 잔여량 확인 (클릭)';
        this.statusBarItem.show();
    }
    setApiKey(apiKey) {
        this.apiClient = new apiClient_1.QuotaApiClient(apiKey);
        this.refresh();
        this.startAutoRefresh();
    }
    clearApiKey() {
        this.apiClient = null;
        this.currentQuota = null;
        this.stopAutoRefresh();
        this.statusBarItem.text = '$(key) GLM: API 키 없음';
        this.statusBarItem.tooltip = '클릭하여 API 키 설정';
    }
    async refresh() {
        if (!this.apiClient) {
            this.statusBarItem.text = '$(key) GLM: API 키 없음';
            return;
        }
        this.statusBarItem.text = '$(sync~spin) GLM: 조회 중...';
        try {
            this.currentQuota = await this.apiClient.fetchQuota();
            const q = this.currentQuota;
            const avail = q.isAvailable ? '✓' : '✗';
            this.statusBarItem.text = `$(check) GLM: ¥${q.totalBalance} ${avail}`;
            this.statusBarItem.tooltip = `총 잔액: ¥${q.totalBalance}\n충전: ¥${q.toppedBalance} / 지급: ¥${q.grantedBalance}\n갱신: ${q.updatedAt}`;
        }
        catch (err) {
            this.statusBarItem.text = '$(error) GLM: 조회 실패';
            this.statusBarItem.tooltip = `오류: ${err instanceof Error ? err.message : '알 수 없음'}`;
        }
    }
    getQuota() {
        return this.currentQuota;
    }
    startAutoRefresh() {
        this.stopAutoRefresh();
        this.intervalId = setInterval(() => this.refresh(), 5 * 60 * 1000);
    }
    stopAutoRefresh() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    dispose() {
        this.stopAutoRefresh();
        this.statusBarItem.dispose();
    }
}
exports.StatusBarManager = StatusBarManager;
//# sourceMappingURL=statusBar.js.map