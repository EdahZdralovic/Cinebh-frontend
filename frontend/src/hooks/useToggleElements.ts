import { useEffect, useState } from 'react';

export function useToggleElements(defaultValues: number[] = []) {
  const [selected, setSelected] = useState<number[]>(defaultValues);
  useEffect(() => {
    setSelected(defaultValues);
  }, [defaultValues]);

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  return { selected, setSelected, toggle };
}
