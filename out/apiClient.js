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
exports.QuotaApiClient = void 0;
const https = __importStar(require("https"));
class QuotaApiClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    fetchQuota() {
        return new Promise((resolve, reject) => {
            const url = new URL('https://open.bigmodel.cn/api/paas/v4/billing/query_balance');
            const options = {
                hostname: url.hostname,
                path: url.pathname,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                },
            };
            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        // API 응답: { code: "success", data: { total_balance, granted_balance, topped_balance, is_available }, msg: "" }
                        if (json.code !== 'success') {
                            reject(new Error(json.msg || 'API 오류'));
                            return;
                        }
                        const d = json.data || {};
                        resolve({
                            totalBalance: d.total_balance ?? '0',
                            grantedBalance: d.granted_balance ?? '0',
                            toppedBalance: d.topped_balance ?? '0',
                            isAvailable: d.is_available ?? false,
                            updatedAt: new Date().toLocaleTimeString('ko-KR'),
                        });
                    }
                    catch {
                        reject(new Error('응답 파싱 실패'));
                    }
                });
            });
            req.on('error', reject);
            req.setTimeout(10000, () => {
                req.destroy();
                reject(new Error('요청 시간 초과'));
            });
            req.end();
        });
    }
}
exports.QuotaApiClient = QuotaApiClient;
//# sourceMappingURL=apiClient.js.map