import axios from 'axios';

import { getSession } from '@/app/api-utils/get-session';

// /api/authorzie/result
export const GET = async (request) => {
  const session = await getSession();
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return Response.json({}, {
      status: 307,
      headers: {
        Location: `/fail?reason=${error}`,
      },
    });
  }

  if (!state || session.state !== state) {
    return Response.json({}, {
      status: 307,
      headers: {
        Location: '/fail?reason=state_missmatch',
      },
    });
  }

  session.state = undefined;

  const { data } = await axios.post('https://github.com/login/oauth/access_token', {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  }, {
    headers: {
      accept: 'application/json',
    },
  });

  session.accessToken = data.access_token;

  return Response.json({}, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
};
