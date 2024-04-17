import axios from 'axios';

import { getSession } from "@/app/api-utils/get-session";
import { verifyToken } from "@/app/api-utils/verify-token";

// /api/profile
export const GET = async (request) => {
  const accessToken = request.headers.get('authorization');
  if (!accessToken
    || !accessToken.startsWith('Bearer ')
    || accessToken === 'Bearer null') {
    return Response.json({
      message: '인증 토큰이 없습니다.',
    }, {
      status: 401,
    });
  }

  const token = accessToken.replace('Bearer ', '');
  try {
    const tokenValue = await verifyToken(token);
    console.log('tokenValue: ', tokenValue);
  } catch (err) {
    return Response.json({
      message: err.message,
    }, {
      status: 401,
    });
  }

  const session = await getSession();
  if (!session.accessToken) {
    return Response.json({
      message: '권한이 없습니다.',
    }, {
      status: 401,
    });
  }

  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return Response.json({
    profile: data.avatar_url,
  });
};
