import { useEffect, useState } from 'react';

export function useCountdown(duration: number, start: boolean) {
  const [counter, setCounter] = useState(duration);

  useEffect(() => {
    if (!start) return;
    setCounter(duration);

    const timer = setInterval(() => {
      setCounter((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [start, duration]);

  const reset = () => setCounter(duration);

  return {
    counter,
    reset,
  };
}
