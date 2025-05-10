'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaInsights } from '@/features/report/hooks/useMediaInsights';
import { useBusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Header from '@/features/my/ui/Header';
import ProfileCard from '@/features/report/ui/ProfileCard';
import InsightsTable from '@/features/report/ui/InsightsTable';

const InsightPage = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  const router = useRouter();

  // 기존 훅 호출
  const insightsRes = useMediaInsights();
  const profileRes = useBusinessProfile();
  const userRes = useCurrentUser();
  const memberRes = useMemberInfo();

  const results = [insightsRes, profileRes, userRes, memberRes];
  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const errorMsg =
    results.find((r) => r.isError)?.error?.message ?? '알 수 없는 오류';

  if (!hasMounted) {
    return (
      <Container>
        <h1 className="text-2xl font-bold mb-4">미디어 인사이트</h1>
        <p>클라이언트 로드 대기 중…</p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <p>데이터 불러오는 중…</p>
      </Container>
    );
  }

  if (isError || !userRes.data) {
    return (
      <Container>
        <p className="text-red-500">데이터 로드 실패: {errorMsg}</p>
      </Container>
    );
  }

  return (
    <div>
      <Header
        title="마이페이지"
        userName={userRes.data.nickname}
        action={{
          label: '내 정보 수정',
          onClick: () => router.push('/my/edit'),
        }}
      />

      <Container>
        <Flex gap={35} className="pt-90 pb-80">
          <ProfileCard profile={profileRes.data!} member={memberRes.data!} />
          <InsightsTable insights={insightsRes.data!} />
        </Flex>
      </Container>
    </div>
  );
};
export default InsightPage;
