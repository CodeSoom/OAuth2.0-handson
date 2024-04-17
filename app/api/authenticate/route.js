import { nanoid } from "nanoid";

const { getSession } = require("@/app/api-utils/get-session");

export const GET = async () => {
  const session = await getSession();
  session.state = nanoid();
  const url = 'https://accounts.google.com/o/oauth2/v2/auth'
  + `?client_id=${process.env.GOOGLE_CLIENT_ID}`
  + `&scope=openid email`
  + `&redirect_uri=http://localhost:3000/authenticate/result`
  + `&state=${session.state}`
  + `&response_type=code`;

  return Response.json({}, {
    status: 307,
    headers: {
      location: url
    },
  });
};
