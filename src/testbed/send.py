import requests

url = "https://api.z.ai/api/coding/paas/v4/billing/query_balance/"
api_key = "7491e7eee15940fc83701837768c181e.Xg9DmIgFvsEysB6I" # 여기에 API 키 입력

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# 반드시 GET 요청이어야 합니다.
response = requests.get(url, headers=headers)

print(response.status_code)
print(response.json())