import * as https from 'https';

export interface QuotaInfo {
  totalBalance: string;
  grantedBalance: string;
  toppedBalance: string;
  isAvailable: boolean;
  updatedAt: string;
}

export class QuotaApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  fetchQuota(): Promise<QuotaInfo> {
    return new Promise((resolve, reject) => {
      const url = new URL('https://open.bigmodel.cn/api/paas/v4/billing/query_balance');
      const options: https.RequestOptions = {
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
          } catch {
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
