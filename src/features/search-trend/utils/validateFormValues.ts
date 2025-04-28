import { TrendSearchFormValues } from '../model/types';

function isValidDateRange(range: { from: Date; to?: Date }): boolean {
  const { from, to } = range;

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = to ?? from;
  return target < today;
}

export function validateFormValues(formValues: TrendSearchFormValues): boolean {
  if (!isValidDateRange(formValues.dateRange)) {
    return false;
  }

  return true;
}
