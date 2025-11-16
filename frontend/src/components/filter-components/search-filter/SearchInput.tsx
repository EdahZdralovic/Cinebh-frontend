import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";


type SearchInputProps = {
    value: string;
    onSearch: (query: string) => void;
};

export default function SearchInput({ value, onSearch }: SearchInputProps) {
    const [localValue, setLocalValue] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => setLocalValue(value), [value]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(localValue);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [localValue]);

    return (
        <div className={"flex w-full h-12 border rounded-md bg-white items-center shadow-lg justify-start " +
            (isOpen ? "border-[var(--color-secondary)]  " : "border-gray-300")}
            >
            <IoSearchOutline className={"ml-4 text-[var(--color-primary)]"}/>
        <input
            type="text"
            placeholder="  Search Movies"
            value={localValue}
            onClick={() => {setIsOpen(true)} }
            onChange={(e) => setLocalValue(e.target.value)}
            className="w-full border-none focus:outline-none border-gray-300"
        />
        </div>
    );
}
