function getLastSixMonths() {
  const result: string[] = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    result.push(`${year}-${month}`);
  }
  return result.reverse();
}

export function getErrorData(): any[] {
  const lastSixMonths = getLastSixMonths();
  return lastSixMonths.map((yearMonth) => ({
    yearMonth,
    searchVolume: undefined,
  }));
}
