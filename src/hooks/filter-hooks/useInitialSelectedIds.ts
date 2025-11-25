import { useEffect, useState } from "react";
import type { FilterProps } from "../../types/Filters.ts";

export function useInitialSelectedIds(
    value: (string | number)[],
    elements: FilterProps[]
) {
    const [initialSelectedIds, setInitialSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        if (elements.length === 0) return;

        const ids =
            typeof value?.[0] === "string"
                ? elements.filter(el => value.includes(el.name)).map(el => el.id)
                : (value as number[]);

        setInitialSelectedIds(ids);
    }, [elements, value]);

    return initialSelectedIds;
}