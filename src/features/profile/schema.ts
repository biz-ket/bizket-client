import * as z from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  brand: z.string().min(1, '상호명을 입력하세요'),
  email: z.string().email('유효한 이메일을 입력하세요'),
  startDate: z.string().min(1, '시작일을 입력하세요'),
  phone1: z.string().min(1, '전화번호를 입력하세요'),
  phone2: z.string().min(1),
  phone3: z.string().min(1),
  categoryId: z.number().nullable(),
  subCategoryId: z.number().nullable(),
  detailCategoryId: z.number().nullable(),
  instagram: z.string().optional(),
  street: z.string().optional(),
  threads: z.string().optional(),
  ageGroupIds: z.array(z.number()).nonempty('하나 이상의 연령대를 선택하세요'),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
