import { useEffect, useState } from 'react';

export function useToggleElements<T extends string | number>(defaultValues: T[] = []) {
    const [selected, setSelected] = useState<T[]>(defaultValues);

    useEffect(() => {
        setSelected(defaultValues);
    }, [defaultValues]);

    function toggle(id: T) {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
        );
    }

    return { selected, setSelected, toggle };
}
