import { UseFormRegister } from 'react-hook-form';
import Flex from '@/shared/ui/layout/Flex';
import Label from '@/features/my/ui/Label';
import Input from '@/shared/ui/input/Input';

interface Props {
  register: UseFormRegister<any>;
}

export const MemberFields = ({ register }: Props) => (
  <Flex direction="col" gap={38} align="stretch">
    <div>
      <Label htmlFor="name">이름</Label>
      <Input {...register('name', { required: '필수 입력입니다' })} />
    </div>

    <div>
      <Label htmlFor="placeEmail">로그인 이메일</Label>
      <Input {...register('placeEmail', { required: '필수 입력입니다' })} />
    </div>

    <div>
      <Label>연락처</Label>
      <Flex gap={8}>
        {(['phone1', 'phone2', 'phone3'] as const).map((f, i) => (
          <Input
            key={f}
            {...register(f, {
              required: '필수 입력입니다',
              pattern: { value: /^\d*$/, message: '숫자만 입력하세요' },
              maxLength: { value: 4, message: '최대 4자리' },
            })}
            inputMode="numeric"
            maxLength={4}
            placeholder={['010', '1234', '5678'][i]}
            onInput={(e) => {
              const t = e.currentTarget;
              t.value = t.value.replace(/\D/g, '').slice(0, 4);
            }}
          />
        ))}
      </Flex>
    </div>

    <div>
      <Label htmlFor="instagram">인스타그램 계정</Label>
      <Input {...register('instagram', { required: '필수 입력입니다' })} />
    </div>

    <div>
      <Label htmlFor="threads">스레드 계정</Label>
      <Input {...register('threads', { required: '필수 입력입니다' })} />
    </div>
  </Flex>
);
