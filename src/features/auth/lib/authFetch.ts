import { fetchApi } from '@/shared/utils/fetchApi';
import { useAuthStore } from '../model/useAuthStore';

export const authFetch = async (url: string, opts: RequestInit = {}) => {
  const { logout, setToken, setRefreshToken } = useAuthStore.getState();

  const makeRequest = () => {
    const { token: currentToken } = useAuthStore.getState();
    const headers = new Headers(opts.headers);
    if (currentToken) headers.set('Authorization', `Bearer ${currentToken}`);
    return fetchApi(url, {
      ...opts,
      headers,
      credentials: 'include',
    });
  };

  try {
    return await makeRequest();
  } catch (err: any) {
    if (err.status === 401) {
      try {
        const { refreshToken: currentRefresh } = useAuthStore.getState();
        const data = await fetchApi('/auth/instagram/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: currentRefresh }),
          credentials: 'include',
        });
        // 새 토큰 저장
        setToken(data.jwtToken);
        setRefreshToken(data.refreshToken);
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
