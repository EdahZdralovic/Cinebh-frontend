import { useState } from 'react';

export function useToggleElements(defaultValues: number[] = []) {
  const [selected, setSelected] = useState<number[]>(defaultValues);

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  }

  return { selected, setSelected, toggle };
}
