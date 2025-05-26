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
  console.log(data);
  const router = useRouter();

  const onClickBusinessButton = () => {
    router.push('/report');
  };

  return (
    <div className="flex-1 h-full relative overflow-hidden pl-39 pr-19">
      {data && (
        <>
          <Flex direction="col" gap={23} className="w-full">
            <Flex direction="col" gap={4} className="w-full relative pt-37">
              <div className="w-full body-sm-regular text-font-20 relative">
                {`사업자 정보 >`}
                <button
                  onClick={onClickBusinessButton}
                  className="flex justify-center items-center rounded-12 bg-line-20 w-34 h-34 absolute right-0 bottom-0"
                >
                  <DocumentIcon fill="#999999" />
                </button>
              </div>
              <Flex gap={8} align="center" wrap className="max-w-full">
                <div className="title-md-bold max-w-full truncate">
                  {data.placeName || '정보 없음'}
                </div>
                {data.businessDetailCategoryName && (
                  <div className="bg-primary-50 text-white label-sm-semibold rounded-20 px-10 py-6">
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
