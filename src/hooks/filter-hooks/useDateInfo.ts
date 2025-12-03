import { useMemo } from 'react';

export function useDateInfo(date: Date) {
    return useMemo(() => {
        const monthName = date.toLocaleString('en-US', { month: 'short' });
        const dayNumber = date.getDate();
        const weekday = date.toLocaleString('en-US', { weekday: 'short' });

        const today = new Date();
        const isToday =
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === date.getDate();

        return { monthName, dayNumber, weekday, isToday };
    }, [date]);
}


