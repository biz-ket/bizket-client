'use client';

import ContentTitle from '@/features/create-marketing/ui/ContentTitle';
import DesignIcon from '@/features/create-marketing/ui/DesignIcon';
import IconSelectButton from '@/features/create-marketing/ui/IconSelectButton';
import InputBox from '@/features/create-marketing/ui/InputBox';
import PlatformSelectButton from '@/features/create-marketing/ui/PlatformSelectButton';
import PriceIcon from '@/features/create-marketing/ui/PriceIcon';
import QuilityIcon from '@/features/create-marketing/ui/QuilityIcon';
import TrendIcon from '@/features/create-marketing/ui/TrendIcon';
import ToggleIcon from '@/shared/ui/icons/ToggleIcon';
import Input from '@/shared/ui/input/Input';
import Flex from '@/shared/ui/layout/Flex';
import Textarea from '@/shared/ui/textarea/Textarea';
import { ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import SelectBox from '@/shared/ui/input/SelectBox';
import CategorySelectBox from '@/features/create-marketing/ui/CategorySelectBox';
import AgeSelectBox from '@/features/create-marketing/ui/AgeSelectBox';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import Image from 'next/image';
import { useFileUpload } from '@/shared/hooks/useFileUpload';
import { useCreateMarketingMutation } from '@/features/create-marketing/hooks/useCreateMarketingMutation';
import {
  CreateMarketingRequestType,
  Tags,
} from '@/features/create-marketing/types/apiType';
import { useMemberInfo } from '@/features/auth/hooks/useMemberInfo';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import ImageDeleteIcon from '@/features/create-marketing/ui/ImageDeleteIcon';

const CreateContent = () => {
  const [prompt, setPrompt] = useState('');
  const [isBusinessInfoOpen, setIsBusinessInfoOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'threads'>(
    'instagram',
  );
  const [accent, setAccent] = useState<Tags[]>(['QUALITY']);
  const [account, setAccount] = useState('');
  const [brandName, setBrandName] = useState('');

  const { files, previews, addFiles, removeFile } = useFileUpload(3);

  const { data: userData } = useMemberInfo();
  const { token } = useAuthStore();
  const { mutate } = useCreateMarketingMutation();

  const isDisabled: boolean = token
    ? !prompt ||
      !selectedCategory ||
      !selectedAge ||
      !account ||
      !accent.length ||
      !brandName ||
      !files.length
    : !prompt || !accent.length || !files.length;

  const handleChangeAccount = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const handleChangeBrandName = (e: ChangeEvent<HTMLInputElement>) => {
    setBrandName(e.target.value);
  };

  const toggleBox = useSelectBoxStore((state) => state.toggleBox);

  const handleChangeFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    addFiles(files);
  };

  const handleClickAge = (age: string) => {
    console.log(age);
    setSelectedAge(age);
    toggleBox('age');
  };

  const handleChangeAccent = (
    acc: 'QUALITY' | 'PRICE' | 'DESIGN' | 'TREND',
  ) => {
    setAccent((prev) =>
      prev.includes(acc) ? prev.filter((item) => item !== acc) : [...prev, acc],
    );
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    toggleBox('category');
  };

  const handleChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const toggleBusinessInfo = () => {
    setIsBusinessInfoOpen((prev) => !prev);
  };

  const handleChangePlatform = (platform: 'instagram' | 'threads') => {
    setPlatform(platform);
  };

  const handleSubmit = () => {
    const data: CreateMarketingRequestType = {
      userType: token ? 'BUSINESS' : 'GUEST',
      memberId: token && userData ? userData?.id : null,
      brandName: token ? brandName : null,
      account: token ? account : null,
      industry: token ? selectedCategory : null,
      clientToken: token ? null : 'test',
      platform: token ? platform : null,
      targetAgeGroup: null,
      prompt,
      emphasisTags: accent,
      imageUrls: files,
    };

    console.log(data);

    try {
      mutate(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex direction="col" gap={40} className="w-full">
      <Flex direction="col" gap={24} className="w-full">
        <Flex direction="col" className="w-full">
          <button
            className="flex items-center justify-between w-full pb-12 border-b border-line-20"
            onClick={toggleBusinessInfo}
          >
            <ContentTitle title="사업장 정보" isLogin={!token} />
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
            style={{
              pointerEvents: isBusinessInfoOpen ? 'auto' : 'none',
              overflow: 'hidden',
            }}
          >
            <Flex justify="between" className="w-full">
              <InputBox label="상호명" width="151px">
                <Input
                  placeholder="상호명"
                  value={brandName}
                  onChange={handleChangeBrandName}
                  disabled={!token}
                />
              </InputBox>
              <InputBox label="계정" width="151px">
                <Input
                  placeholder="@bizket"
                  value={account}
                  onChange={handleChangeAccount}
                  disabled={!token}
                />
              </InputBox>
            </Flex>
            <InputBox label="업종">
              <SelectBox
                id="category"
                placeholder="업종을 선택해주세요."
                value={selectedCategory}
                isSelected={!!selectedCategory}
                disabled={!token}
              >
                <CategorySelectBox
                  onSelect={handleCategoryChange}
                  currentValue={selectedCategory}
                />
              </SelectBox>
            </InputBox>
            <InputBox label="고객 연령층">
              <SelectBox
                id="age"
                placeholder="고객 연령층 선택"
                value={selectedAge}
                isSelected={!!selectedAge}
                disabled={!token}
              >
                <AgeSelectBox age={selectedAge} handleClick={handleClickAge} />
              </SelectBox>
            </InputBox>
          </motion.div>
        </Flex>
        <Flex direction="col" gap={14} className="relative w-full z-dropdown">
          <ContentTitle title="플랫폼 선택" isLogin={!token} />
          <Flex justify="between" align="center" className="w-full">
            <PlatformSelectButton
              label="인스타그램"
              name="instagram"
              isActive={platform === 'instagram'}
              onClick={handleChangePlatform}
              disabled={!token}
            />
            <PlatformSelectButton
              label="스레드"
              name="threads"
              isActive={platform === 'threads'}
              onClick={handleChangePlatform}
              disabled={!token}
            />
          </Flex>
        </Flex>
        <Flex direction="col" gap={14} className="w-full">
          <ContentTitle title="게시 이미지 업로드" />
          <div className="w-full">
            <input
              id="content-file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleChangeFiles}
            />
            <label
              htmlFor="content-file-upload"
              className="flex items-center justify-center w-full h-48 cursor-pointer rounded-10 bg-primary-10 body-sm-regular text-primary-50"
            >
              이미지 업로드
            </label>
          </div>
          <Flex gap={10}>
            {previews.map((preview, index) => (
              <div key={`preview-${index}`} className="relative">
                <div
                  style={{ width: '97.5px', height: '97.5px' }}
                  className="overflow-hidden border rounded-8 border-line-20"
                >
                  <Image src={preview} fill alt="미리보기 이미지" />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-5 -right-5"
                  >
                    <ImageDeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </Flex>
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
              name="QUALITY"
              icon={<QuilityIcon isActive={accent.includes('QUALITY')} />}
              isActive={accent.includes('QUALITY')}
              onClick={handleChangeAccent}
            />
            <IconSelectButton
              label="가격"
              name="PRICE"
              icon={<PriceIcon isActive={accent.includes('PRICE')} />}
              isActive={accent.includes('PRICE')}
              onClick={handleChangeAccent}
            />
            <IconSelectButton
              label="디자인"
              name="DESIGN"
              icon={<DesignIcon isActive={accent.includes('DESIGN')} />}
              isActive={accent.includes('DESIGN')}
              onClick={handleChangeAccent}
            />
            <IconSelectButton
              label="트렌드"
              name="TREND"
              icon={<TrendIcon isActive={accent.includes('TREND')} />}
              isActive={accent.includes('TREND')}
              onClick={handleChangeAccent}
            />
          </Flex>
        </Flex>
      </Flex>
      <button
        onClick={handleSubmit}
        className="w-full h-48 text-white bg-primary-50 rounded-10 body-md-medium disabled:opacity-50"
        disabled={isDisabled}
      >
        생성하기
      </button>
    </Flex>
  );
};

export default CreateContent;
