import os
import hmac
import hashlib
import json
import requests
from time import gmtime, strftime

# 🛡️ 깃허브 Secrets에서 안전하게 키를 불러옵니다! (여기에 키를 직접 적지 마세요)
ACCESS_KEY = os.environ.get('COUPANG_ACCESS_KEY', '')
SECRET_KEY = os.environ.get('COUPANG_SECRET_KEY', '')

# 쿠팡 파트너스 API 보안 인증(HMAC) 생성 함수
def generate_hmac(method, url, secret_key, access_key):
    path, *query = url.split("?")
    datetime_GMT = strftime('%y%m%d', gmtime()) + 'T' + strftime('%H%M%S', gmtime()) + 'Z'
    message = datetime_GMT + method + path + (query[0] if query else "")
    signature = hmac.new(bytes(secret_key, "utf-8"), message.encode("utf-8"), hashlib.sha256).hexdigest()
    return f"CEA algorithm=HmacSHA256, access-key={access_key}, signed-date={datetime_GMT}, signature={signature}"

def fetch_coupang_data():
    if not ACCESS_KEY or not SECRET_KEY:
        print("🚨 API 키가 설정되지 않았습니다. 깃허브 Secrets를 확인하세요.")
        return

    # 💡 검색할 키워드
    keyword = "사무용품" 
    
    method = "GET"
    url = f"/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword={keyword}&limit=10"
    domain = "https://api-gateway.coupang.com"
    
    authorization = generate_hmac(method, url, SECRET_KEY, ACCESS_KEY)
    headers = {
        "Authorization": authorization,
        "Content-Type": "application/json"
    }
    
    try:
        print("🔄 쿠팡 파트너스 API를 호출합니다...")
        response = requests.get(domain + url, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # 홈페이지에 뿌릴 수 있도록 데이터 가공
        product_list = []
        for item in data.get('data', {}).get('productData', []):
            product_list.append({
                "name": item.get('productName'),
                "price": f"{item.get('productPrice'):,}원",
                "link": item.get('productUrl'),
                "img": item.get('productImage')
            })
            
        # 가공된 데이터를 JSON 파일로 저장
        with open('coupang_data.json', 'w', encoding='utf-8') as f:
            json.dump(product_list, f, ensure_ascii=False, indent=4)
            
        print("✅ 성공적으로 데이터를 업데이트하고 coupang_data.json 파일을 생성했습니다.")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")

if __name__ == "__main__":
    fetch_coupang_data()
