import crypto from 'crypto';

import axios from 'axios';
import jwt from 'jsonwebtoken';

export const verifyToken = async (accessToken) => {
  const { data } = await axios
    .get('https://accounts.google.com/.well-known/openid-configuration');
  const { data: { keys } } = await axios.get(data.jwks_uri);
  const { header: { kid } } = jwt.decode(accessToken, { complete: true });

  const key = keys.find((it) => it.kid === kid);

  const pem = crypto.createPublicKey({
    key,
    format: 'jwk',
    type: 'spki'
  }).export({ type: 'spki', format: 'pem'});

  const payload = jwt.verify(accessToken, pem);
  if (payload.iss !== 'https://accounts.google.com' 
  || payload.aud !== process.env.GOOGLE_CLIENT_ID) {
    throw new Error('올바른 토큰이 아닙니다.')
  }
  
  return payload;
}