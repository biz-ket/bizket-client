'use client';

import { useRouter } from 'next/navigation';
import { useMediaInsights } from '@/features/report/hooks/useMediaInsights';
import { useBusinessProfile } from '@/entities/business-profile';
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';
import Container from '@/shared/ui/layout/Container';
import Flex from '@/shared/ui/layout/Flex';
import Header from '@/features/my/ui/Header';
import ProfileCard from '@/features/report/ui/ProfileCard';
import InsightsTable from '@/features/report/ui/InsightsTable';
import Skeleton from '@/shared/ui/skeleton/Skeleton';
import InsightsChart from '@/features/report/ui/InsightsChart';

const InsightPage = () => {
  const router = useRouter();
  const insightsRes = useMediaInsights();
  const profileRes = useBusinessProfile();
  const userRes = useCurrentUser();

  const isLoading = [insightsRes, profileRes, userRes].some((r) => r.isLoading);
  const errorResult = [insightsRes, profileRes, userRes].find((r) => r.isError);
  const errorMsg = errorResult?.error?.message ?? '알 수 없는 오류';

  if (isLoading) {
    return (
      <Container>
        <Flex gap={35} className="pt-90 pb-80">
          <Skeleton className="w-[400px] h-[635px] rounded-20" />
          <Flex direction="col" className="flex-1 w-full gap-4">
            <Skeleton as="div" count={7} className="h-[80px] w-full mb-10" />
          </Flex>
        </Flex>
      </Container>
    );
  }
  if (errorResult || !userRes.data)
    return (
      <Container>
        <p className="text-red-500">데이터 로드 실패: {errorMsg}</p>
      </Container>
    );

  return (
    <div>
      <Header
        title="비즈니스 보고서"
        userName={userRes.data.nickname}
        action={{
          label: '내 정보 수정',
          onClick: () => router.push('/my/edit'),
        }}
      />

      <Container>
        <Flex direction="col" gap={30} className="w-full pb-80">
          <Flex gap={35} className="w-full pt-90">
            <ProfileCard profile={profileRes.data!} />
            <InsightsTable
              insights={insightsRes.data!}
              onCreate={() => router.push('/my/edit')}
            />
          </Flex>
          <InsightsChart insights={insightsRes.data!} />
          <p className="w-full text-right text-gray-400 body-sm-semibold">
            *비즈니스 계정 전환 이후의 데이터만 집계 가능합니다.
          </p>
        </Flex>
      </Container>
    </div>
  );
};
export default InsightPage;
