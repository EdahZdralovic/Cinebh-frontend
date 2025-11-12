import React, { useState } from "react";
import useFilterData from "../../../hooks/useFilterData.ts";


export interface Location {
    id: number;
    city: string;
}

export default function SelectLocationsFilter() {
    const { elements , loading, error } = useFilterData<Location>("locations");
    const [open, setOpen] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState<number[]>([]);

    const toggleGenre = (id: number) => {
        setSelectedLocations((prev) =>
            prev.includes(id)
                ? prev.filter((genreId) => genreId !== id)
                : [...prev, id]
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading genres</p>;
    if (!elements ) return null;

    const handleApply = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setSelectedLocations([])
    };

    return (
        <section>
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="relative bg-white h-12 rounded-md grid border-1 shadow-lg border-gray-300 grid-cols-12 justify-self-start items-center mb-0"
            >
                <img
                    src="/assets/logos/genres_filter_icon.png"
                    className="relative col-span-1 h-[16px] w-[18px]  ml-2 z-30 object-cover"
                    alt="genres logo"
                />
                <span className="pl-4 text-gray-500 text-[16px] col-span-8">
          {selectedLocations.length > 0
              ? `Selected ${selectedLocations.length} Cities`
              : "All Cities"}
        </span>
            </div>

            {open && (
                <div className="relative mt-1 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
                    <ul>
                        {elements.map((location : Location) => (
                            <li
                                key={location.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleGenre(location.id);
                                }}
                                className={`px-3 py-2 text-sm cursor-pointer  flex items-center ${
                                    selectedLocations.includes(location.id)
                                        ? " bg-[var(--color-secondary)] text-white font-bold rounded-md"
                                        : ""
                                }`}
                            >
                                {location.city}
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
                            onClick={handleApply}
                            className="px-4 py-2 bg-[#B22222] text-white rounded-xl text-sm"
                        >
                            Apply
                        </button>
                    </div>
                </div>

            )}

        </section>
    );
}
