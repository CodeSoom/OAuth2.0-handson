import { getSession } from "@/app/api-utils/get-session";
import { nanoid } from "nanoid";

// /api/authorize
export const GET = async () => {
  const state = nanoid();

  const session = await getSession();
  session.state = state;

  // 1. 어디로 가야하는지 변경이 될 수도 있음.
  // 2. state를 저장해놓기 위함.

  // 1. 완전히 같은지 확인
  // 2. 하위 URL은 허용 -> 유연성은 확보
  // 3. 같은 도메인이면 허용
  const url = 'https://github.com/login/oauth/authorize'
  + `?client_id=${process.env.CLIENT_ID}`
  + `&scope=read:user`
  + `&redirect_uri=http://localhost:3000/api/authorize/result`
  + `&state=${state}`;

  return Response.json({}, {
    status: 307,
    headers: {
      Location: url,
    }
  });
};
