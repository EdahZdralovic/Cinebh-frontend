import { useMemo } from "react";
import { formatDate, fromISO } from '../../utils/dateUtils.ts';


export function useDateRangeLabel(
    tempStart: Date | null,
    tempEnd: Date | null,
    value: { fromDate: string | null; toDate: string | null }
) {
    return useMemo(() => {
        const start = tempStart || fromISO(value.fromDate);
        const end = tempEnd || fromISO(value.toDate);

        if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
        if (start) return `${formatDate(start)} - ...`;

        return "Pick Range";
    }, [tempStart, tempEnd, value.fromDate, value.toDate]);
}
