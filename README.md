# 코드숨 OAuth2.0 마스터 핸즈온

[코드숨 핸즈온](https://www.codesoom.com/courses/handson)에서 사용할 실습 코드 입니다.

## API 목록

### 깃헙 프로필 사진 불러오기

깃헙 프로필 이미지를 불러옵니다.

- 요청

```
GET /api/profile
```

- 응답

```
200 OK
Content-Type: applicatoin/json

{
  "profile": "https://image.com/address/profile.jpg"
}
```

접근 권한 토큰이 없을 경우

```
401 Unauthorized
Content-Type: applicatoin/json

{
  "messagge": "접근 권한이 없습니다.
}
```

### GitHub 인가 요청

GitHub 인가 요청 프로세스를 시작합니다.

- 요청

```
GET /api/authorize
```

- 응답

```
302 Found
Location: https://github.com/login/oauth/authorize?client_id=1234&response_type=code&scope=read:user&redirect_uri=http://localhost:3000/api/authorize/result
```

### GitHub 접근 권한 토큰 요청

GitHub의 임시 인증 코드로 접근 권한 토큰을 발급합니다.

- 요청

```
GET /api/authorize/result?code=abcd
```

- 응답

```
302 Found
Location: http://localhost:3000/
```

## 참고

- [OAuth 앱 권한 부여](https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [OAuth 2 in Action](https://product.kyobobook.co.kr/detail/S000001804662)
