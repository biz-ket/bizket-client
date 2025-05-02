import { fetchApi } from '@/shared/utils/fetchApi';
import { useAuthStore } from '../model/useAuthStore';

export const authFetch = async (url: string, opts: RequestInit = {}) => {
  const { token, logout, setToken } = useAuthStore.getState();

  const makeRequest = () => {
    const headers = new Headers(opts.headers);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return fetchApi(url, {
      ...opts,
      headers,
      credentials: 'include',
    });
  };

  try {
    return await makeRequest();
  } catch (err: any) {
    if (err.message.includes('401')) {
      try {
        // TODO: 리프레시 토큰으로 재발급 시도 (리프레시토큰 api 나오면)
        const { jwtToken: newToken } = await fetchApi('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });
        //전역 스토어에 새 토큰 저장
        setToken(newToken);
        //원래 요청 다시 시도
        return await makeRequest();
      } catch {
        //재발급 실패하면 로그아웃
        logout();
        throw new Error(
          '세션이 만료되어 로그아웃되었습니다. 다시 로그인해주세요.',
        );
      }
    }
    throw err;
  }
};
