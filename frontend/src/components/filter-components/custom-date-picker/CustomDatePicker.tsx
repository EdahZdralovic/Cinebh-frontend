import { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-overrides.css';

export function CustomDatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempStart, setTempStart] = useState(null);
  const [tempEnd, setTempEnd] = useState(null);
  const datePickerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleApply = () => {
    setStartDate(tempStart);
    setEndDate(tempEnd);
    datePickerRef.current.setOpen(false);
  };

  const handleCancel = () => {
    setTempStart(null);
    setTempEnd(null);
    datePickerRef.current.setOpen(false);
  };

  const formatDate = date => {
    if (!date) return null;
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const displayValue = () => {
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return '';
  };

  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg flex w-full
    ${isOpen ? 'border-[2px] border-red-200' : ''}`}
    >
      <div
        className={`relative bg-white rounded-md shadow-2xl flex w-full
    ${isOpen ? 'border-[1px] border-[#B22222]' : 'border border-gray-300'}`}
      >
        <button type="button" className="ml-2 bg-white" aria-label="Open calendar">
          <svg
            width="16px"
            height="18px"
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="1.392"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                stroke="#B22222"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{' '}
            </g>
          </svg>
        </button>
        <DatePicker
          ref={datePickerRef}
          className="w-full bg-transparent rounded-lg outline-none border-0 text-[#1D2939] pl-3  h-14  "
          selectsRange
          shouldCloseOnSelect={false}
          startDate={tempStart}
          endDate={tempEnd}
          value={displayValue()}
          onChange={dates => {
            const [start, end] = dates;
            setTempStart(start);
            setTempEnd(end);
          }}
          onCalendarOpen={() => {
            setIsOpen(true);
            setTempStart(startDate);
            setTempEnd(endDate);
          }}
          onCalendarClose={() => setIsOpen(false)}
          placeholderText="Date Range"
          formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
          dateFormat="yyyy/MM/dd - yyyy/MM/dd"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 px-2 text-[#1D2939] py-3 bg-white">
                <div className="border text-start p-2 px-3 border-gray-200 rounded-xl">
                  <div className="text-xs text-gray-500 font-thin">Start Date</div>
                  <div className="text-sm font-normal">
                    {tempStart ? formatDate(tempStart) : 'Choose date'}
                  </div>
                </div>
                <div className="border text-start p-2 px-3 border-gray-200 rounded-xl">
                  <div className="text-xs text-gray-500 font-medium">End Date</div>
                  <div className="text-sm">{tempEnd ? formatDate(tempEnd) : 'Choose date'}</div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <span className="font-normal text-gray-800">
                  {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
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
      </div>
    </div>
  );
}
