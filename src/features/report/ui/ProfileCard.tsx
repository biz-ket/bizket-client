'use client';

import Image from 'next/image';
import Flex from '@/shared/ui/layout/Flex';
import { BusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import Link from 'next/link';

import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';

interface ProfileCardProps {
  profile: BusinessProfile | { message: string };
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const isEmpty = 'message' in profile;
  const { data } = useMemberInfo();
  console.log(data);
  return (
    <div className="relative w-[400px] h-[635px] px-30 py-45 bg-gradient-to-br from-primary-50 to-primary-30 text-white rounded-20 overflow-hidden">
      <div className="relative">
        <p className="text-primary-10 mb-40">고객 프로필</p>
        <Link
          href={'/my/edit'}
          className="absolute right-0 top-[-7px] z-30 cursor-pointer"
        >
          <Image
            src={'/images/shared/file-text.svg'}
            width={24}
            height={24}
            alt="정보 수정하기 버튼"
          />
        </Link>
      </div>
      <Flex align="center" gap={13} className="mb-15">
        <h2 className="title-xl2-semibold">
          {isEmpty ? '정보없음' : profile.placeName}
        </h2>
        {isEmpty || (
          <p className="rounded-20 bg-white px-10 py-5 text-primary-50 label-sm-semibold">
            {profile.businessSubCategoryName}
          </p>
        )}
      </Flex>
      {isEmpty || (
        <Flex gap={10} className="mb-10">
          <p className="body-md-regular">
            {profile.customerAgeGroupLabel} 고객층
          </p>
          <p className="text-primary-10 body-md-regular">
            {profile.openDate} 오픈
          </p>
        </Flex>
      )}
      <p className="body-md-regular border-b border-white mb-18 pb-15">
        {isEmpty ? '프로필 정보를 등록해 주세요' : profile.address}
      </p>
      <div>
        <p className="body-md-regular mb-8">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            팔로워
          </span>
          {isEmpty ? '-' : profile.followerCount}
        </p>
        <p className="body-md-regular mb-8">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            스레드
          </span>
          {isEmpty
            ? '등록 된 계정 없음'
            : profile.threadsAccountId
            ? profile.threadsAccountId
            : '-'}
        </p>
        <p className="body-md-regular">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            인스타그램
          </span>
          {data?.instagramAccountId}
        </p>
      </div>
      <Image
        src="/images/shared/insight-profile.svg"
        alt="프로필 카드 배경"
        fill
        className="absolute !bottom-[-9px] !top-auto right-0"
      />
    </div>
  );
};

export default ProfileCard;
