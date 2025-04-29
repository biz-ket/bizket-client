// src/app/insight/page.tsx
'use client';

import { useMediaInsights } from '@/features/insight/hooks/useMediaInsights';
import Container from '@/shared/ui/layout/Container';

export default function InsightPage() {
  const { data, isLoading, isError, error } = useMediaInsights();

  // 1) 로딩 중
  if (isLoading) {
    return (
      <Container>
        <p>인사이트 불러오는 중…</p>
      </Container>
    );
  }

  // 2) 에러 처리
  if (isError) {
    return (
      <Container>
        <p className="text-red-500">인사이트 로드 실패: {error.message}</p>
      </Container>
    );
  }

  // 3) data가 undefined일 수도 있으니 기본값을 빈 배열로
  const insights = data ?? [];

  return (
    <Container>
      <h1 className="text-2xl mb-4">미디어 인사이트</h1>
      <ul>
        {insights.map((item) => (
          <li key={item.id} className="mb-2">
            <p>
              <strong>ID:</strong> {item.id}
            </p>
            <p>
              <strong>Caption:</strong> {item.caption}
            </p>
          </li>
        ))}
      </ul>
      {insights.length === 0 && <p>표시할 인사이트가 없습니다.</p>}
    </Container>
  );
}
