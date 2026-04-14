import * as vscode from 'vscode';
import { QuotaApiClient, QuotaInfo } from './apiClient';

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private apiClient: QuotaApiClient | null = null;
  private currentQuota: QuotaInfo | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this.statusBarItem.command = 'glm-quota-monitor.showQuota';
    this.statusBarItem.tooltip = 'GLM 잔여량 확인 (클릭)';
    this.statusBarItem.show();
  }

  setApiKey(apiKey: string) {
    this.apiClient = new QuotaApiClient(apiKey);
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
    } catch (err) {
      this.statusBarItem.text = '$(error) GLM: 조회 실패';
      this.statusBarItem.tooltip = `오류: ${err instanceof Error ? err.message : '알 수 없음'}`;
    }
  }

  getQuota(): QuotaInfo | null {
    return this.currentQuota;
  }

  private startAutoRefresh() {
    this.stopAutoRefresh();
    this.intervalId = setInterval(() => this.refresh(), 5 * 60 * 1000);
  }

  private stopAutoRefresh() {
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
