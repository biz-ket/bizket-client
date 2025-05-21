'use client';
import { FormProvider } from 'react-hook-form';
import { BusinessProfileFields } from './BusinessProfileFields';
import { MemberFields } from './MemberFields';
import useMyPageEditForm from '../hooks/useMyPageEditForm';
import CheckRequiredFieldModal from '@/shared/ui/modal/CheckRequiredFieldModal';
import SaveConfirmModal from '@/shared/ui/modal/SaveConfirmModal';
import CheckDeleteAccountModal from '@/features/update-my-info/ui/CheckDeleteAccountModal';
import { Member } from '@/features/auth/hooks/useMemberInfo';
import { useSelectBoxStore } from '@/shared/store/useSelectBoxStore';
import Flex from '@/shared/ui/layout/Flex';
import { BusinessProfile } from '@/entities/business-profile';

interface Props {
  member: Member;
  profile: BusinessProfile;
}
export const MyPageEditForm = ({ member, profile }: Props) => {
  const {
    methods,
    data,
    handlers: { onSaveClick, onConfirmSave, onDelete, openDelete },
    modals: { isRequiredOpen, isSaveOpen, isDeleteOpen, setRequiredOpen },
  } = useMyPageEditForm(member, profile);

  const { closeAllBoxes } = useSelectBoxStore();

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className="flex gap-60 pt-56 pb-[165px]">
        <Flex className="flex-1" direction="col" gap={38} align="stretch">
          <MemberFields register={methods.register} />
        </Flex>

        <Flex className="flex-1" direction="col" gap={38} align="stretch">
          <BusinessProfileFields
            {...data}
            register={methods.register}
            control={methods.control}
            setValue={methods.setValue}
            watch={methods.watch}
            closeAllBoxes={closeAllBoxes}
          />
          <Flex justify="end" className="mt-6" gap={20}>
            <button
              type="button"
              onClick={openDelete}
              className="flex-1 h-65 px-6 border rounded-10 label-xl-medium text-font-20"
            >
              회원탈퇴
            </button>
            <button
              type="button"
              onClick={onSaveClick}
              disabled={!isValid || isSubmitting}
              className="flex-1 h-65 px-6 bg-primary-50 text-white rounded-10 label-xl-medium disabled:opacity-50"
            >
              저장하기
            </button>
          </Flex>
        </Flex>
      </form>

      {isRequiredOpen && (
        <CheckRequiredFieldModal
          usePortal
          onClose={() => setRequiredOpen(false)}
        />
      )}
      {isSaveOpen && (
        <SaveConfirmModal
          usePortal
          onClose={() => {}}
          onConfirm={onConfirmSave}
        />
      )}
      {isDeleteOpen && (
        <CheckDeleteAccountModal onClose={() => {}} onConfirm={onDelete} />
      )}
    </FormProvider>
  );
};

export default MyPageEditForm;
