export function formatDate(dateStr: string): string | null {
  // yyyy-mm-dd -> yyyy.m.d
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${year}.${month}.${day}`;
}
