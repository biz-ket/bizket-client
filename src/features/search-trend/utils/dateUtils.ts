export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getYesterday(): Date {
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  return new Date(yesterday);
}
