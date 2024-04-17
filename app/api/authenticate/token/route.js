import axios from 'axios';

import { getSession } from "@/app/api-utils/get-session";

export const POST = async (request) => {
  const session = await getSession();
  const { code, state } = await request.json();
  if (!state || session.state !== state) {
    return Response.json({
      message: '스테이트가 일치하지 않습니다.',
    }, {
      status: 400
    });
  }

  const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/authenticate/result',
    grant_type: 'authorization_code',
  });

  return Response.json({
    accessToken: data.id_token,
  });
}