import requests

API_KEY = "7491e7eee15940fc83701837768c181e.Xg9DmIgFvsEysB6I"  # 실제 API 키로 변경하세요.

url = "https://open.bigmodel.cn/api/paas/v4/billing/query_balance"
headers = {
    "Authorization": f"Bearer {API_KEY}"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    print("잔액 정보:", data)
else:
    print("오류 발생:", response.status_code, response.text)