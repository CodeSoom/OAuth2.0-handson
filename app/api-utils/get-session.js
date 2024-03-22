/* eslint-disable no-param-reassign */
import { cookies } from 'next/headers';

import { nanoid } from 'nanoid';

const SESSION_KEY = 'sessionId';

const sessions = new Map();

export const getSession = async () => {
  const sessionKey = cookies().get(SESSION_KEY)?.value ?? nanoid();
  const session = sessions.get(sessionKey);
  if (!session) {
    const value = {
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      },
    };
    sessions.set(sessionKey, value);
    cookies().set(SESSION_KEY, sessionKey, value.cookie);
  }

  return new Proxy(sessions.get(sessionKey), {
    set(target, prop, value) {
      target[prop] = value;
      sessions.set(sessionKey, target);
      return true;
    },
  });
};
