import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import Flex from '@/shared/ui/layout/Flex';
import Label from '@/features/my/ui/Label';
import Input from '@/shared/ui/input/Input';
import SingleDatePicker from '@/features/my/ui/SingleDatePicker';
import AgeCheckbox from '@/features/create-marketing/ui/AgeCheckbox';
import OptionsList, { Option } from '@/features/my/ui/OptionList';
import OptionSelectBox from '@/features/my/ui/OptionSelectBox';
import { ProfileFormValues } from '@/features/profile/model/profileSchema';

interface CategoryOption {
  id: number;
  name: string;
}

interface Props {
  register: UseFormRegister<ProfileFormValues>;
  control: Control<ProfileFormValues>;
  watch: UseFormWatch<ProfileFormValues>;
  ageOptions: { id: number; label: string }[];
  categories: CategoryOption[];
  subCategories: CategoryOption[];
  detailCategories: CategoryOption[];
  dirtyFields: Partial<Record<keyof ProfileFormValues, boolean>>;
  setValue: UseFormSetValue<ProfileFormValues>;
  closeAllBoxes: () => void;
}

export const BusinessProfileFields = ({
  register,
  control,
  watch,
  ageOptions,
  categories,
  subCategories,
  detailCategories,
  dirtyFields,
  setValue,
  closeAllBoxes,
}: Props) => {
  const selectedCategory = watch('categoryId');
  const selectedSubCategory = watch('subCategoryId');
  const selectedDetailCategory = watch('detailCategoryId');

  // CategoryOption -> Option 으로 변환
  const categoryOpts: Option[] = categories.map((c) => ({
    id: c.id,
    label: c.name,
  }));
  const subCategoryOpts: Option[] = subCategories.map((sc) => ({
    id: sc.id,
    label: sc.name,
  }));
  const detailCategoryOpts: Option[] = detailCategories.map((dc) => ({
    id: dc.id,
    label: dc.name,
  }));

  return (
    <Flex direction="col" gap={38} align="stretch">
      {/* 상호명 */}
      <div>
        <Label htmlFor="brand">상호명</Label>
        <Input
          id="brand"
          {...register('brand', { required: '필수 입력입니다' })}
        />
      </div>

      {/* 사업 시작일 */}
      <div>
        <Label htmlFor="startDate">사업 시작일</Label>
        <SingleDatePicker control={control} name="startDate" />
      </div>

      {/* 업종 선택 */}
      <div>
        <Label>업종</Label>
        <Flex gap={18} align="stretch">
          {[
            {
              name: 'categoryId',
              placeholder: '대분류',
              options: categoryOpts,
              value: selectedCategory,
            },
            {
              name: 'subCategoryId',
              placeholder: '중분류',
              options: subCategoryOpts,
              value: selectedSubCategory,
            },
            {
              name: 'detailCategoryId',
              placeholder: '소분류',
              options: detailCategoryOpts,
              value: selectedDetailCategory,
            },
          ].map(({ name, placeholder, options, value }) => (
            <div className="flex-1" key={name}>
              <OptionSelectBox
                id={name}
                placeholder={placeholder}
                value={options.find((o) => o.id === value)?.label || ''}
                isSelected={!!dirtyFields[name as keyof ProfileFormValues]}
              >
                <OptionsList
                  options={options}
                  activeId={value!}
                  onSelect={(id) => {
                    setValue(name as any, id as any);
                    if (name === 'categoryId') {
                      setValue('subCategoryId', null);
                      setValue('detailCategoryId', null);
                    }
                    if (name === 'subCategoryId') {
                      setValue('detailCategoryId', null);
                    }
                    closeAllBoxes();
                  }}
                />
              </OptionSelectBox>
            </div>
          ))}
        </Flex>
      </div>

      {/* 주소 */}
      <div>
        <Label htmlFor="street">사업장 주소</Label>
        <Input
          id="street"
          {...register('street', { required: '필수 입력입니다' })}
        />
      </div>

      {/* 고객 연령층 */}
      <div>
        <Label>고객 연령층</Label>
        <div className="grid grid-cols-4 gap-6">
          {ageOptions.map((age) => (
            <AgeCheckbox
              key={age.id}
              label={age.label}
              isChecked={watch('ageGroupId') === age.id}
              onClick={() => setValue('ageGroupId', age.id)}
            />
          ))}
        </div>
      </div>
    </Flex>
  );
};
