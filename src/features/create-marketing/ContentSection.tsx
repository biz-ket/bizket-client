'use client';

import ContentTitle from '@/features/create-marketing/ContentTitle';
import DesignIcon from '@/features/create-marketing/DesignIcon';
import IconSelectButton from '@/features/create-marketing/IconSelectButton';
import PlatformSelectButton from '@/features/create-marketing/PlatformSelectButton';
import PriceIcon from '@/features/create-marketing/PriceIcon';
import QuilityIcon from '@/features/create-marketing/QuilityIcon';
import TrendIcon from '@/features/create-marketing/TrendIcon';
import Flex from '@/shared/ui/layout/Flex';
import Textarea from '@/shared/ui/textarea/Textarea';
import { ChangeEvent, useState } from 'react';

const ContentSection = () => {
  const [prompt, setPrompt] = useState('');

  const handleChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="w-[526px] px-48 bg-white py-55 bg-primary-40">
      <Flex direction="col" gap={40} className="w-full">
        <Flex direction="col" gap={32} className="w-full">
          <Flex direction="col" gap={14} className="w-full">
            <ContentTitle title="플랫폼 선택" />
            <Flex justify="between" align="center" className="w-full">
              <PlatformSelectButton label="인스타그램" isActive />
              <PlatformSelectButton label="스레드" />
            </Flex>
          </Flex>
          <Flex direction="col" gap={14} className="w-full">
            <ContentTitle title="게시 이미지 업로드" />
            <button className="w-full h-64 rounded-10 bg-primary-10 label-lg-medium text-primary-50">
              이미지 업로드
            </button>
          </Flex>
          <Flex direction="col" gap={14} className="w-full">
            <ContentTitle title="프롬프트 입력" />
            <Textarea
              value={prompt}
              onChange={handleChangePrompt}
              placeholder="ex) 20대 여자의 말투로 작성해주고, 이미지의 메이크업에 대해 30자 이내로 작성해줘"
            />
          </Flex>
          <Flex direction="col" gap={14} className="w-full">
            <ContentTitle title="강조하기" />
            <Flex justify="between" align="center" className="w-full">
              <IconSelectButton
                label="퀄리티"
                icon={<QuilityIcon />}
                isActive
              />
              <IconSelectButton label="가격" icon={<PriceIcon />} />
              <IconSelectButton label="디자인" icon={<DesignIcon />} />
              <IconSelectButton label="트렌드" icon={<TrendIcon />} />
            </Flex>
          </Flex>
        </Flex>
        <button className="w-full h-64 text-white bg-primary-50 rounded-10 label-xl-medium">
          생성하기
        </button>
      </Flex>
    </div>
  );
};

export default ContentSection;
