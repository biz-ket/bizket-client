import HistoryCard from '@/features/create-marketing/ui/HistoryCard';
import SearchIcon from '@/features/create-marketing/ui/SearchIcon';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';

const DUMMY_HISTORY_DATA = [
  {
    title: '모카무스 메이크업',
    tags: ['마케팅 콘텐츠', '인스타그램'],
    desc: '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
    date: '2025.03.25',
  },
  {
    title: '프로필 촬영 메이크업',
    tags: ['마케팅 콘텐츠', '인스타그램'],
    desc: '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
    date: '2025.03.25',
  },
  {
    title: '모카무스 메이크업',
    tags: ['마케팅 콘텐츠', '인스타그램'],
    desc: '20대 여성의 말투로 메이크업 컨셉, 컬러 특징을 포함해서 메이크업에 대한 설명을 간략히 작성해줘',
    date: '2025.03.25',
  },
];

const CreateHistory = () => {
  return (
    <Flex direction="col" gap={30} className="w-full">
      <Flex direction="col" gap={14} className="w-full">
        <h3 className="body-md-regular text-font-40">생성이력</h3>
        <div className="relative w-full">
          <Input placeholder="검색하려는 이력을 작성해 주세요." />
          <button className="absolute -translate-y-1/2 top-1/2 right-18">
            <SearchIcon />
          </button>
        </div>
      </Flex>
      <Flex direction="col" gap={24} className="w-full">
        {DUMMY_HISTORY_DATA?.map((data, index) => (
          <HistoryCard key={data.title + index} data={data} />
        ))}
      </Flex>
    </Flex>
  );
};

export default CreateHistory;
