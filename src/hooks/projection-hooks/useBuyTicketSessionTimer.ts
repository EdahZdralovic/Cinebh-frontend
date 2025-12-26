import { useEffect, useState } from 'react';
import { getOrCreateSeatSessionEnd } from '../../utils/ProjectionFunctions.ts';

export function useBuyTicketSessionTimer() {
  const [sessionEnd] = useState(getOrCreateSeatSessionEnd);
  const [remainingMs, setRemainingMs] = useState(sessionEnd - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(sessionEnd - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionEnd]);

  const isExpired = remainingMs <= 0;

  return { remainingMs, isExpired };
}
