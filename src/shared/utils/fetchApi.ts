interface FetchApiOptions extends RequestInit {
  body?: any;
}

export const fetchApi = async (url: string, options: FetchApiOptions = {}) => {
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = new Headers();
  if (!isFormData) defaultHeaders.set('Content-Type', 'application/json');

  const custom =
    options.headers instanceof Headers
      ? options.headers
      : new Headers(options.headers as Record<string, string>);
  for (const [k, v] of custom) {
    defaultHeaders.set(k, v);
  }

  const finalOptions: RequestInit = {
    ...options,
    headers: defaultHeaders,
    body: isFormData ? options.body : JSON.stringify(options.body),
  };

  try {
    const res = await fetch(url, finalOptions);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || '서버 오류 발생');
    }
    return res.json();
  } catch (e) {
    console.error('🚨 Fetch 오류:', e);
    throw e;
  }
};
