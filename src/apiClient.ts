import * as https from 'https';

export interface QuotaInfo {
  balance: number;
  balanceStr: string;
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
            if (json.error_code) {
              reject(new Error(json.error_msg || 'API error'));
              return;
            }
            resolve({
              balance: json.data?.balance ?? 0,
              balanceStr: json.data?.balance_str ?? '0',
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
