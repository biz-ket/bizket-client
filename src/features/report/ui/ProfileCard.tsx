'use client';

import Image from 'next/image';
import Flex from '@/shared/ui/layout/Flex';
import { BusinessProfile } from '@/features/report/hooks/useBusinessProfile';
import Link from 'next/link';

interface ProfileCardProps {
  profile: BusinessProfile | { message: string };
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  // 사업장 정보가 없을 때
  if ('message' in profile) {
    return (
      <div className="relative w-[400px] h-[635px] px-30 py-45 bg-gradient-to-br from-primary-50 to-primary-30 text-white rounded-20 overflow-hidden">
        <p className="mb-6 text-lg font-medium text-gray-700">
          {profile.message}
        </p>
        <Link
          href="/my/edit"
          className="px-6 py-3 bg-primary-10 text-primary-50 rounded-10 inline-block text-center"
        >
          정보 수정하러 가기
        </Link>
        <Image
          src="/images/shared/insight-profile.svg"
          alt="프로필 카드 배경"
          fill
          className="absolute !bottom-[-9px] !top-auto right-0"
        />
      </div>
    );
  }

  return (
    <div className="relative w-[400px] h-[635px] px-30 py-45 bg-gradient-to-br from-primary-50 to-primary-30 text-white rounded-20 overflow-hidden">
      <p className="text-primary-10 mb-40">고객 프로필</p>
      <Flex align="center" gap={13} className="mb-15">
        <h2 className="title-xl2-semibold">{profile.placeName}</h2>
        <p className="rounded-20 bg-white px-10 py-5 text-primary-50 label-sm-semibold">
          {profile.businessSubCategoryName}
        </p>
      </Flex>
      <Flex gap={10} className="mb-10">
        <p className="body-md-regular">
          {profile.customerAgeGroupLabel} 고객층
        </p>
        <p className="text-primary-10 body-md-regular">
          {profile.openDate} 오픈
        </p>
      </Flex>
      <p className="body-md-regular border-b border-white mb-18 pb-15">
        {profile.address}
      </p>
      <div>
        <p className="body-md-regular mb-8">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            팔로워
          </span>
          {profile.followerCount}
        </p>
        <p className="body-md-regular mb-8">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            스레드
          </span>
          {profile.threadsAccountId}
        </p>
        <p className="body-md-regular">
          <span className="text-primary-10 inline-block w-[70px] mr-15">
            인스타그램
          </span>
          {profile.instagramAccountId}
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
