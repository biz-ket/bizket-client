import Flex from '@/shared/ui/layout/Flex';
import HomeIcon from './HomeIcon';
import { formatDate } from '../utils/formatDate';
import UserIcon from './UserIcon';
import DocumentIcon from './DocumentIcon';
import MapIcon from './MapIcon';

const businessPlace: {
  name: string;
  industry: string;
  address: string;
  customerAgeGroup: number;
  openDate: Date;
} = {
  name: '오메이크업',
  industry: '메이크업',
  address: '서울 송파구 오금로18길 6 1층 104호',
  customerAgeGroup: 20,
  openDate: new Date(2024, 11, 1),
};

const BusinessProfile = () => {
  return (
    <div className="flex-1 h-full relative">
      <Flex direction="col" gap={23}>
        <Flex direction="col" gap={4}>
          <div className="body-sm-regular text-font-20">{`사업자 정보 >`}</div>
          <Flex gap={8} align="center">
            <div className="title-md-bold">{businessPlace.name}</div>
            <div className="bg-primary-50 text-white label-sm-semibold rounded-20 px-10 py-6">
              {businessPlace.industry}
            </div>
          </Flex>
        </Flex>
        <Flex direction="col" gap={4}>
          <Flex gap={14}>
            <Flex gap={6} align="center">
              <HomeIcon />
              <span className="body-md-regular">{`${formatDate(
                businessPlace.openDate,
              )} 오픈`}</span>
            </Flex>
            <Flex gap={6} align="center">
              <UserIcon />
              <span className="body-md-regular">{`${businessPlace.customerAgeGroup}대 고객층`}</span>
            </Flex>
          </Flex>
          <Flex gap={6} align="center">
            <MapIcon />
            <span className="body-md-regular">{businessPlace.address}</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justify="center"
        align="center"
        className="rounded-12 bg-line-20 w-34 h-34 absolute right-19 top-0"
      >
        <DocumentIcon fill="#999999" />
      </Flex>
    </div>
  );
};

export default BusinessProfile;
