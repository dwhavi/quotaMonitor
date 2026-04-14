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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const statusBar_1 = require("./statusBar");
const quotaPanel_1 = require("./quotaPanel");
const SECRET_KEY = 'glm.api.key';
function activate(context) {
    const statusBar = new statusBar_1.StatusBarManager(context);
    const panel = new quotaPanel_1.QuotaPanel();
    // 저장된 API 키 로드
    const secretStorage = context.secrets;
    secretStorage.get(SECRET_KEY).then((key) => {
        if (key) {
            statusBar.setApiKey(key);
        }
        else {
            statusBar.clearApiKey();
        }
    });
    // API 키 설정
    const setKeyCmd = vscode.commands.registerCommand('glm-quota-monitor.setApiKey', async () => {
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
    });
    // 잔여량 확인 팝업
    const showCmd = vscode.commands.registerCommand('glm-quota-monitor.showQuota', () => {
        panel.show(context, statusBar.getQuota(), !!statusBar.getQuota());
    });
    // 새로고침
    const refreshCmd = vscode.commands.registerCommand('glm-quota-monitor.refresh', () => {
        statusBar.refresh();
        vscode.window.showInformationMessage('GLM 잔여량 새로고침 완료');
    });
    context.subscriptions.push(statusBar, setKeyCmd, showCmd, refreshCmd);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map