import { useAuthStore } from '@/features/auth/model/useAuthStore';

interface FetchApiOptions extends RequestInit {
  body?: any;
  auth?: boolean;
}

export const fetchApi = async (
  endPoint: string,
  options: FetchApiOptions = {},
) => {
  const { logout, setToken, setRefreshToken } = useAuthStore.getState();
  const isFormData = options.body instanceof FormData;

  console.log(isFormData);

  const buildHeaders = () => {
    const headers = new Headers(
      options.headers as Record<string, string> | Headers | undefined,
    );

    if (!isFormData && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    if (options.auth) {
      const { token } = useAuthStore.getState();
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  };

  const makeRequest = async () => {
    const finalOptions: RequestInit = {
      ...options,
      headers: buildHeaders(),
      credentials: 'include',
      body: isFormData ? options.body : JSON.stringify(options.body),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}${endPoint}`,
      finalOptions,
    );
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const error = new Error(errData.message || '서버 오류 발생') as any;
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  try {
    return await makeRequest();
  } catch (err: any) {
    if (options.auth && err.status === 401) {
      try {
        const { refreshToken } = useAuthStore.getState();
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BIZKET_API_BASE_URL}/auth/instagram/refresh`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
            credentials: 'include',
          },
        ).then((res) => res.json());

        setToken(data.jwtToken);
        setRefreshToken(data.refreshToken);
        return await makeRequest(); // 재시도
      } catch {
        logout();
        throw new Error(
          '세션이 만료되어 로그아웃되었습니다. 다시 로그인해주세요.',
        );
      }
    }
    throw err;
  }
};
