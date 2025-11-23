import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-overrides.css';
import { FiCalendar } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import type { DatePickerProps } from '../../../types/Filters.ts';
import { formatDate, fromISO, toISO } from '../../../utils/dateUtils.ts';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

export function CustomDatePicker({ value, onApply }: DatePickerProps) {
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const datePickerRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

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
  const CustomInput = ({ onClick }: { onClick: () => void }) => (
    <div
      onClick={onClick}
      className="w-full flex items-center gap-2 bg-white  rounded-lg px-3 h-12 cursor-pointer"
    >
      <FiCalendar
        className={
          ' ml-0 flex justify-center ' +
          (isOpen
            ? '  text-[var(--color-secondary)] '
            : 'text-[var(--color-primary)]  ')
        }
      />
      <span
        className={isOpen ? ' text-[var(--color-primary)] ' : 'text-gray-500 '}
      >
        {'Pick Range'}
      </span>
    </div>
  );
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const placeHolder =
    tempStart != null && tempEnd != null
      ? { tempStart } + ' - ' + { tempEnd }
      : 'Pick Range';

  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg flex w-full
    ${isOpen ? 'border-[2px] border-red-200' : ''}`}
    >
      <div
        className={`relative items-center  rounded-md shadow-sm flex w-full
    ${isOpen ? 'border-[1px] border-[#B22222]' : 'border border-gray-200'}`}
      >
        <DatePicker
          ref={datePickerRef}
          className="w-full bg-transparent rounded-lg outline-none text-[#1D2939] z-30 h-14 placeholder:text-gray-500 "
          selectsRange
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          startDate={tempStart}
          customInput={<CustomInput onClick={() => setIsOpen(true)} />}
          popperPlacement="bottom"
          endDate={tempEnd}
          shouldCloseOnSelect={false}
          placeholderText={placeHolder}
          onChange={(dates) => {
            const [start, end] = dates;
            setTempStart(start);
            console.log(tempStart);
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
            nextMonthButtonDisabled,
          }) => (
            <div className="w-full z-100 ">
              <div className="grid grid-cols-2 gap-4 mx-2 px-2 text-[#1D2939] py-3 bg-white">
                <div className="border z-40 text-start p-2 px-3 border-gray-200 rounded-xl">
                  <div className="text-xs text-gray-500 font-thin">
                    Start Date
                  </div>
                  <div className="text-sm font-normal">
                    {tempStart ? formatDate(tempStart) : 'Choose date'}
                  </div>
                </div>
                <div className="border text-start p-2 px-3 z-40 border-gray-200 rounded-xl">
                  <div className="text-xs text-gray-500 font-medium">
                    End Date
                  </div>
                  <div className="text-sm">
                    {tempEnd ? formatDate(tempEnd) : 'Choose date'}
                  </div>
                </div>
              </div>
              <div className="flex items-center z-60 justify-between px-4 py-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="p-1 text-[var(--color-primary)]  rounded disabled:opacity-50"
                >
                  <MdArrowBackIos />
                </button>
                <span className="font-normal text-gray-800">
                  {date.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="p-1 text-[var(--color-primary)]  rounded disabled:opacity-50"
                >
                  <MdArrowForwardIos />
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
        <div className={'mr-3'} onClick={toggle}>
          {isOpen ? (
            <IoIosArrowUp size={20} color={'#B22222'} fontWeight={100} />
          ) : (
            <IoIosArrowDown size={20} color={'#6B7280'} fontWeight={100} />
          )}
        </div>
      </div>
    </div>
  );
}
