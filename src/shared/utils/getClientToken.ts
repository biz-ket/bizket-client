// utils/clientToken.ts
import { v4 as uuidv4 } from 'uuid';

const CLIENT_TOKEN_KEY = 'clientToken';

export const getClientToken = (): string => {
  if (typeof window === 'undefined') return ''; // SSR 보호

  let token = localStorage.getItem(CLIENT_TOKEN_KEY);

  if (!token) {
    token = uuidv4();
    localStorage.setItem(CLIENT_TOKEN_KEY, token);
  }

  return token;
};
