import {
  differenceInCalendarDays,
  format,
  parseISO,
  startOfToday,
} from 'date-fns';

export function openingLabel(projectionStart: string) {
  const target = parseISO(projectionStart);
  if (isNaN(target.getTime())) return '';
  const today = startOfToday();

  const diff = differenceInCalendarDays(target, today);
  if (diff >= 0 && diff <= 7) {
    return `Opens ${format(target, 'EEEE')}`;
  }

  return format(target, 'EEE, MMM d, yyyy');
}
