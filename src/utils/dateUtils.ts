export const toISO = (date: Date | null) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`
    : null;

export const fromISO = (s: string | null) => {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
};

export function generateNext10Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 10; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export function getDatePlusDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}
export const TEN_DAYS_FROM_NOW = getDatePlusDays(7);

export function formatDateSecond(date: string) {
  return date.replace(/-/g, '/');
}
export const formatDate = (date: Date | null) => {
  if (!date) return null;
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};
