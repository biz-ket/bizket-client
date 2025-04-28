'use client';

import ContentTitle from '@/features/create-marketing/ContentTitle';
import DesignIcon from '@/features/create-marketing/DesignIcon';
import IconSelectButton from '@/features/create-marketing/IconSelectButton';
import InputBox from '@/features/create-marketing/InputBox';
import PlatformSelectButton from '@/features/create-marketing/PlatformSelectButton';
import PriceIcon from '@/features/create-marketing/PriceIcon';
import QuilityIcon from '@/features/create-marketing/QuilityIcon';
import TrendIcon from '@/features/create-marketing/TrendIcon';
import ToggleIcon from '@/shared/ui/icons/ToggleIcon';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';
import Textarea from '@/shared/ui/textarea/Textarea';
import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import SelectBox from '@/shared/ui/input/SelectBox';
import CategorySelectBox from '@/features/create-marketing/CategorySelectBox';

const CreateContent = () => {
  const [prompt, setPrompt] = useState('');
  const [isBusinessInfoOpen, setIsBusinessInfoOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  console.log(selectedCategory);

  const handleToggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIsCategoryOpen(false);
  };

  const handleChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const toggleBusinessInfo = () => {
    setIsBusinessInfoOpen((prev) => !prev);
  };

  return (
    <Flex direction="col" gap={40} className="w-full">
      <Flex direction="col" gap={24} className="w-full">
        <Flex direction="col" gap={18} className="w-full">
          <button
            className="flex items-center justify-between w-full pb-12 border-b border-line-20"
            onClick={toggleBusinessInfo}
          >
            <ContentTitle title="사업장 정보" />
            <motion.div
              initial={false}
              animate={{
                rotate: isBusinessInfoOpen ? 180 : 0,
              }}
            >
              <ToggleIcon />
            </motion.div>
          </button>
          <motion.div
            className="flex flex-col w-full gap-18"
            initial={false}
            animate={{
              height: isBusinessInfoOpen ? 'auto' : 0,
              opacity: isBusinessInfoOpen ? 1 : 0,
              marginTop: isBusinessInfoOpen ? '18px' : 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
          >
            <Flex justify="between" className="w-full">
              <InputBox label="상호명" width="151px">
                <Input placeholder="상호명명" />
              </InputBox>
              <InputBox label="계정" width="151px">
                <Input placeholder="@bizket" />
              </InputBox>
            </Flex>
            <InputBox label="업종">
              <SelectBox
                isActive={isCategoryOpen}
                placeholder="업종을 선택해주세요."
                value={selectedCategory}
                handleClick={handleToggleCategory}
              >
                <CategorySelectBox
                  onSelect={handleCategoryChange}
                  currentValue={selectedCategory}
                />
              </SelectBox>
            </InputBox>
            <InputBox label="고객 연령층">
              <Input />
            </InputBox>
          </motion.div>
        </Flex>
        <Flex direction="col" gap={14} className="w-full">
          <ContentTitle title="플랫폼 선택" />
          <Flex justify="between" align="center" className="w-full">
            <PlatformSelectButton label="인스타그램" isActive />
            <PlatformSelectButton label="스레드" />
          </Flex>
        </Flex>
        <Flex direction="col" gap={14} className="w-full">
          <ContentTitle title="게시 이미지 업로드" />
          <button className="w-full h-48 rounded-10 bg-primary-10 body-sm-regular text-primary-50">
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
            <IconSelectButton label="퀄리티" icon={<QuilityIcon />} isActive />
            <IconSelectButton label="가격" icon={<PriceIcon />} />
            <IconSelectButton label="디자인" icon={<DesignIcon />} />
            <IconSelectButton label="트렌드" icon={<TrendIcon />} />
          </Flex>
        </Flex>
      </Flex>
      <button className="w-full h-48 text-white bg-primary-50 rounded-10 body-md-medium">
        생성하기
      </button>
    </Flex>
  );
};

export default CreateContent;
