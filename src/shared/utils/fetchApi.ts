interface FetchApiOptions extends RequestInit {
  body?: any;
}

export const fetchApi = async (url: string, options: FetchApiOptions = {}): Promise<any> => {
  const isFormData = options.body instanceof FormData;

  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  };

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    body: isFormData ? options.body : JSON.stringify(options.body),
  };

  try {
    const response = await fetch(`${url}`, finalOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || '서버 오류 발생');
    }

    return response.json();
  } catch (error) {
    console.error('🚨 Fetch 오류:', error);
    throw error;
  }
};
