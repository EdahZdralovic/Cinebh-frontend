import { useEffect, useState } from 'react';

export function useSeatSessionCountdown(expiresAt?: number) {
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!expiresAt) {
      setRemainingMs(0);
      setIsExpired(false);
      return;
    }

    const tick = () => {
      const ms = expiresAt - Date.now();
      setRemainingMs(ms);
      if (ms <= 0) setIsExpired(true);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  return {
    remainingMs: Math.max(0, remainingMs),
    isExpired,
  };
}
