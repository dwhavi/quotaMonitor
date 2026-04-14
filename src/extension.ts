import * as vscode from 'vscode';
import { StatusBarManager } from './statusBar';
import { QuotaPanel } from './quotaPanel';

const SECRET_KEY = 'glm.api.key';

export function activate(context: vscode.ExtensionContext) {
  const statusBar = new StatusBarManager(context);
  const panel = new QuotaPanel();

  // 저장된 API 키 로드
  const secretStorage = context.secrets;
  secretStorage.get(SECRET_KEY).then((key) => {
    if (key) {
      statusBar.setApiKey(key);
    } else {
      statusBar.clearApiKey();
    }
  });

  // API 키 설정
  const setKeyCmd = vscode.commands.registerCommand(
    'glm-quota-monitor.setApiKey',
    async () => {
      const input = await vscode.window.showInputBox({
        prompt: '지푸AI API 키를 입력하세요',
        placeHolder: 'xxxxxxxxxxxxxxxx',
        password: true,
        ignoreFocusOut: true,
      });
      if (input) {
        await secretStorage.store(SECRET_KEY, input.trim());
        statusBar.setApiKey(input.trim());
        vscode.window.showInformationMessage('GLM API 키가 저장되었습니다.');
      }
    }
  );

  // 잔여량 확인 팝업
  const showCmd = vscode.commands.registerCommand(
    'glm-quota-monitor.showQuota',
    () => {
      panel.show(context, statusBar.getQuota(), !!statusBar.getQuota());
    }
  );

  // 새로고침
  const refreshCmd = vscode.commands.registerCommand(
    'glm-quota-monitor.refresh',
    () => {
      statusBar.refresh();
      vscode.window.showInformationMessage('GLM 잔여량 새로고침 완료');
    }
  );

  context.subscriptions.push(statusBar, setKeyCmd, showCmd, refreshCmd);
}

export function deactivate() {}
