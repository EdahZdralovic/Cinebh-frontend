import 'react-datepicker/dist/react-datepicker.css';
import { CustomDatePicker } from './custom-date-picker/CustomDatePicker.tsx';

export function UpcomingFilter() {
  return (
    <section className="mt-4 text-[var(--color-primary)]">
      <input
        type="text"
        name="fullName"
        placeholder={'Search Movies'}
        className="w-full h-10 border-1 shadow-lg border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-4 mt-4  gap-4 h-10 justify-evenly ">
        <div className="relative items-center mb-0">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
            />
          </svg>
          <select
            defaultValue="All Cities"
            className="w-full pl-8 h-10 rounded-md text-[var(--color-primary)] border-1 shadow-lg border-gray-300"
          >
            <option value="">All Cities</option>
          </select>
        </div>
        <select className="w-full text-black border-1 rounded-md shadow-lg border-gray-300 ">
          <option value="" disabled hidden>
            <svg
              className="w-6 h-2 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"
              />
            </svg>
            All Cinemas
          </option>
        </select>
        <select
          placeholder="All Genres"
          className="w-full border-1 shadow-lg rounded-md border-gray-300"
        ></select>
        <div className="">
          <CustomDatePicker />
        </div>
      </div>
    </section>
  );
}
