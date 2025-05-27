import Flex from '@/shared/ui/layout/Flex';
import HomeIcon from './HomeIcon';
import { formatDate } from '../utils/formatDate';
import UserIcon from './UserIcon';
import DocumentIcon from './DocumentIcon';
import MapIcon from './MapIcon';
import { useBusinessProfile } from '@/entities/business-profile';
import { useRouter } from 'next/navigation';

const BusinessProfile = () => {
  const { data } = useBusinessProfile();
  const router = useRouter();

  const onClickBusinessButton = () => {
    router.push('/report');
  };

  return (
    <div className="relative flex-1 h-full overflow-hidden pl-39 pr-19">
      {data && (
        <>
          <Flex direction="col" gap={23} className="w-full">
            <Flex direction="col" gap={4} className="relative w-full pt-37">
              <div className="relative w-full body-sm-regular text-font-20">
                {`사업자 정보 >`}
                <button
                  onClick={onClickBusinessButton}
                  className="absolute bottom-0 right-0 flex items-center justify-center rounded-12 bg-line-20 w-34 h-34"
                >
                  <DocumentIcon fill="#999999" />
                </button>
              </div>
              <Flex gap={8} align="center" wrap className="max-w-full">
                <div className="max-w-full truncate title-md-bold">
                  {data.placeName || '정보 없음'}
                </div>
                {data.businessDetailCategoryName && (
                  <div className="px-10 py-6 text-white bg-primary-50 label-sm-semibold rounded-20">
                    {data.businessDetailCategoryName}
                  </div>
                )}
              </Flex>
            </Flex>

            <Flex direction="col" gap={4}>
              <Flex gap={14}>
                <Flex gap={6} align="center">
                  <HomeIcon />
                  <span className="body-md-regular">
                    {data?.openDate
                      ? formatDate(data.openDate)
                      : '오픈일 정보 없음'}
                  </span>
                </Flex>
                <Flex gap={6} align="center">
                  <UserIcon />
                  <span className="body-md-regular">
                    {data.customerAgeGroupLabel
                      ? `${data.customerAgeGroupLabel} 고객층`
                      : '고객층 정보 없음'}
                  </span>
                </Flex>
              </Flex>
              <Flex gap={6} align="center">
                <MapIcon />
                <span className="body-md-regular">
                  {data.address || '사업장 주소 정보 없음'}
                </span>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </div>
  );
};

export default BusinessProfile;
