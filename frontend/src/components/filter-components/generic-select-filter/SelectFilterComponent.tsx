import React, { type ReactNode, useEffect, useState } from "react";
import useFilterData from "../../../hooks/useFilterData.ts";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export interface FilterProps {
    location: any;
    cityId: any;
    id: number;
    name: string;
}

export interface FilterType {
    endpoint: string;
    params?: object;
    placeholder: string;
    value: number[];
    onApply: (ids: number[], allElements?: FilterProps[]) => void;
    labelKey?: string;
    icon: ReactNode;

}

export default function SelectFilterComponent({ endpoint, params, placeholder, value, onApply, icon }: FilterType) {

    const { elements, loading, error } = useFilterData<FilterProps>(endpoint, params);
    const [open, setOpen] = useState(false);
    const [localSel, setLocalSel] = useState<number[]>(value);

    useEffect(() => setLocalSel(value), [value]);

    const toggleElements = (id: number) => {
        setLocalSel(prev =>
            prev.includes(id)
                ? prev.filter(genreId => genreId !== id)
                : [...prev, id]
        );
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading genres</p>;
    if (!elements || elements.length === 0) return null;

    const handleApply = () => {
        setOpen(false);
        onApply(localSel, elements);
    };
    const handleCancel = () => {
        setOpen(false);
        onApply([]);
    };
    const selectedNames = elements
        .filter(el => localSel.includes(el.id))
        .map(el => el.name);

    return (
        <section>
            <div className={`relative rounded-lg  ${open ? "border-[2px] border-red-200" : ""}`}>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className={ "flex justify-between bg-white items-center h-12 border rounded-md shadow-lg " + (open ? " border-[var(--color-secondary)]" : "border-gray-300")}
            >
                <div className={"flex justify-start items-center" }>
                <div
                    className={" ml-3 " + (open ? "  text-[var(--color-secondary)] " : "text-[var(--color-primary)] ")}
                >
                    {icon}
                </div>
                <span className="pl-2 text-gray-500 text-[16px] col-span-9 max-w-[250px] max-h-12 truncate">
                         {selectedNames.length === 0
                             ? `All ${placeholder}`
                             : selectedNames.join(", ")}
                </span>
                </div>
                <div
                    className={ " col-span-2 mr-2 font-extralight " + ( open
                        ? " text-[var(--color-secondary)] "
                        : " text-[var(--color-primary)] ")
                    }
                >
                    {open ? <IoIosArrowUp size={20} fontWeight={100} /> : <IoIosArrowDown size={20} />}
                </div>

            </div>
            </div>
            {open && (
                <div className="relative mt-1 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
                    <ul>
                        {elements.map((filterProps: FilterProps) => (
                            <li
                                key={filterProps.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleElements(filterProps.id);
                                }}
                                className={`px-3 py-2 text-sm cursor-pointer flex items-center ${
                                    localSel.includes(filterProps.id)
                                        ? "bg-[#FDE3E3]  font-bold rounded-md"
                                        : ""
                                }`}
                            >
                                {filterProps.name}
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end py-2 px-2 gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-[#B22222] border border-[#B22222] font-medium rounded-xl hover:bg-gray-100 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-[var(--color-secondary)] text-white font-medium rounded-xl text-sm"
                            onClick={handleApply}
                        >
                            Apply
                        </button>
                    </div>
                </div>

            )}
        </section>
    );
}
