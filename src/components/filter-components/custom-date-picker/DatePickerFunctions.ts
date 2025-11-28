import { fromISO } from '../../../utils/dateUtils';

export function DateToString(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function createHandleDateChange(setTempStart: Function, setTempEnd: Function) {
    return function handleDateChange(dates: [Date | null, Date | null]) {
        const [start, end] = dates;
        setTempStart(start);
        setTempEnd(end);
    };
}

export function createHandleCalendarOpen(
    setIsOpen: Function,
    setTempStart: Function,
    setTempEnd: Function,
    value: { fromDate: string | null; toDate: string | null }
) {
    return function handleCalendarOpen() {
        setIsOpen(true);
        setTempStart(fromISO(value.fromDate));
        setTempEnd(fromISO(value.toDate));
    };
}

export function createToggle(setter: (fn: any) => void) {
    return function toggle() {
        setter((prev: boolean) => !prev);
    };
}
export function getPlaceholder(tempStart: Date | null, tempEnd: Date | null) {
    if (tempStart && tempEnd) return `${tempStart} - ${tempEnd}`;
    return 'Pick Range';
}

