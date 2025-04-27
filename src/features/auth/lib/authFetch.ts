import { fetchApi } from '@/shared/utils/fetchApi';
import { useAuthStore } from '../model/useAuthStore';

export async function authFetch(url: string, opts: RequestInit = {}) {
  const { token, logout } = useAuthStore.getState();
  const headers = new Headers(opts.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  try {
    return await fetchApi(url, {
      ...opts,
      headers,
      credentials: 'include', // 리프레시 쿠키 자동 포함
    });
  } catch (err: any) {
    // 401 또는 '세션 만료' 메시지일 때 로그아웃 처리
    if (err.message.includes('401')) {
      logout();
      throw new Error('세션이 만료되었습니다.');
    }
    throw err;
  }
}
