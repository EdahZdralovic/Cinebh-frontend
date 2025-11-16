import React, {useRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-overrides.css";
import {FiCalendar} from "react-icons/fi";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";


export type DatePickerProps = {
    value: { fromDate: string | null; toDate: string | null };
    onApply: (patch: { fromDate: string | null; toDate: string | null }) => void;
};



export function CustomDatePicker({value, onApply}: DatePickerProps) {
    const [tempStart, setTempStart] = useState(null);
    const [tempEnd, setTempEnd] = useState(null);
    const datePickerRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toISO = (d: Date | null) =>
        d
            ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`
            : null;

    const fromISO = (s: string | null) => {
        if (!s) return null;
        const [y, m, d] = s.split("-").map(Number);
        return new Date(y, (m ?? 1) - 1, d ?? 1);
    };
    const handleApply = () => {
        const dateRange = { fromDate: toISO(tempStart), toDate: toISO(tempEnd) };
        onApply(dateRange);
        setIsOpen(false);

    };

    const handleCancel = () => {
        setTempStart(null);
        setTempEnd(null);
        setIsOpen(false);


    };


    const formatDate = (date) => {
        if (!date) return null;
        return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
    };


    return (
        <div className={`relative bg-white rounded-lg shadow-lg flex w-full
    ${isOpen ? "border-[2px] border-red-200" : ""}`}>
            <div className={`relative items-center  rounded-md shadow-2xl flex w-full
    ${isOpen ? "border-[1px] border-[#B22222]" : "border border-gray-300"}`}>

                <button
                    type="button"
                    className="ml-2 flex justify-between bg-white"
                    aria-label="Open calendar"
                    onClick={() => {}}>
                    <FiCalendar className={" ml-3 " + (isOpen ? "  text-[var(--color-secondary)] flex justify-center"
                        : "text-[var(--color-primary)]  flex justify-center")
                    }/>
                </button>
                <DatePicker
                    ref={datePickerRef}
                    className="w-full bg-transparent rounded-lg outline-none border-0 text-[#1D2939] pl-3  z-10 h-14  "
                    selectsRange
                    startDate={tempStart}
                    endDate={tempEnd}
                    shouldCloseOnSelect={false}

                    placeholderText={"Date Range"}

                    onChange={(dates) => {
                        const [start, end] = dates;
                        setTempStart(start);
                        console.log(tempStart)
                        setTempEnd(end);
                    }}

                    onCalendarOpen={() => {
                        setIsOpen(true);
                        setTempStart(fromISO(value.fromDate));
                        setTempEnd(fromISO(value.toDate));
                    }}
                    onCalendarClose={() => setIsOpen(false)}
                    formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}

                    renderCustomHeader={({
                                             date,
                                             decreaseMonth,
                                             increaseMonth,
                                             prevMonthButtonDisabled,
                                             nextMonthButtonDisabled
                                         }) => (
                        <div className="w-full z-100">
                            <div className="grid grid-cols-2 gap-2 px-2 text-[#1D2939] py-3 bg-white">
                                <div className="border z-40 text-start p-2 px-3 border-gray-200 rounded-xl">
                                    <div className="text-xs text-gray-500 font-thin">Start Date</div>
                                    <div className="text-sm font-normal">
                                        {tempStart ? formatDate(tempStart) : "Choose date"}
                                    </div>
                                </div>
                                <div className="border text-start p-2 px-3 z-40 border-gray-200 rounded-xl">
                                    <div className="text-xs text-gray-500 font-medium">End Date</div>
                                    <div className="text-sm">
                                        {tempEnd ? formatDate(tempEnd) : "Choose date"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center z-60 justify-between px-4 py-2">
                                <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                    </svg>
                                </button>
                                <span className="font-normal text-gray-800">
                            {date.toLocaleDateString("en-US", {month: "short", year: "numeric"})}
                        </span>
                                <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                >

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

                </DatePicker>
                <div className={ "mr-3"}>
                    {isOpen ? <IoIosArrowUp size={20} color={"#B22222"} fontWeight={100} /> : <IoIosArrowDown size={20} fontWeight={100} />}
                </div>
            </div>
        </div>
    );
}