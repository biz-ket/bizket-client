import { TrendSearchFormValues } from '../model/types';

export function validateFormValues(formValues: TrendSearchFormValues): boolean {
  if (formValues.keyword === '') {
    return false;
  }

  return true;
}
