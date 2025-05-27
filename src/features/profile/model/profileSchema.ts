import * as z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  brand: z.string().min(1, '상호명을 입력하세요'),
  placeEmail: z
    .string()
    .email('유효한 사업장 이메일을 입력해주세요.')
    .nonempty('사업장 이메일을 입력해주세요.'),
  startDate: z.date({ required_error: '시작일을 입력하세요' }),
  phone1: z.string().min(1, '전화번호를 입력하세요'),
  phone2: z.string().min(1),
  phone3: z.string().min(1),
  categoryId: z.number().nullable(),
  subCategoryId: z.number().nullable(),
  detailCategoryId: z.number().nullable(),
  instagram: z.string().optional(),
  street: z.string().min(1, '사업장 주소를 입력해주세요'),
  threads: z.string().nonempty('스레드 주소를 입력해주세요'),
  ageGroupId: z.number({ required_error: '고객 연령층을 선택해주세요.' }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
