export function formatDate(dateStr: string): string {
  // yyyy-mm-dd -> yyyy.m.d
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${year}.${month}.${day}`;
}
