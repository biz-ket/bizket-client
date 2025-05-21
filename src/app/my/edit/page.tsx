'use client';

import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import Header from '@/features/my/ui/Header';
import Flex from '@/shared/ui/layout/Flex';
import Container from '@/shared/ui/layout/Container';
import MyPageEditForm from '../../../features/my/ui/MyPageEditForm';
import Image from 'next/image';
import { useBusinessProfile } from '@/entities/business-profile';

export default function MyPageEdit() {
  const { data: member, isLoading: memLoading } = useMemberInfo();
  const { data: profile, isLoading: profLoading } = useBusinessProfile();

  if (memLoading || profLoading) {
    return (
      <>
        <Header title="마이페이지" subtitle="정보수정" />
        <Container>
          <div>로딩 중...</div>
        </Container>
      </>
    );
  }
  if (!member || !profile) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }
  return (
    <>
      <Header title="마이페이지" subtitle="정보수정" />
      <Container>
        <Flex justify="between" align="center" className="mt-90">
          <div>
            <h1 className="title-xl-semibold mb-10">
              내 정보를 입력해서 사업을 성장시키세요!
            </h1>
            <p className="body-md-regular text-font-30">
              비즈니스 보고서와 트렌드 키워드 검색에서 마케팅 인사이트를 얻을 수
              있습니다.
            </p>
          </div>

          <Flex gap={4}>
            <div className="w-[125px] h-[125px] relative rounded-full overflow-hidden border">
              <Image src="/images/shared/profile.svg" fill alt="프로필" />
            </div>
          </Flex>
        </Flex>
        <MyPageEditForm member={member!} profile={profile!} />
      </Container>
    </>
  );
}
