import 'react-datepicker/dist/react-datepicker.css';
import SelectFilterComponent, {
  type FilterProps,
} from './generic-select-filter/SelectFilterComponent.tsx';
import { CustomDatePicker } from './custom-date-picker/CustomDatePicker.tsx';

export default function UpcomingFilter() {
  return (
    <section className="mt-4 text-[var(--color-primary)]">
      <input
        type="text"
        name="fullName"
        placeholder={'  Search Movies'}
        className="w-full h-10 border-1 shadow-lg border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-4 mt-4  gap-4 h-10 justify-evenly ">
        <SelectFilterComponent
          endpoint={'locations'}
          placeholder={'locations'}
          value={[]}
          onApply={function (ids: number[], allElements?: FilterProps[]): void {
            throw new Error('Function not implemented.');
          }}
          icon={undefined}
        />
        <SelectFilterComponent
          endpoint={'venues'}
          placeholder={'venues'}
          value={[]}
          onApply={function (ids: number[], allElements?: FilterProps[]): void {
            throw new Error('Function not implemented.');
          }}
          icon={undefined}
        />
        <SelectFilterComponent
          endpoint={'genres'}
          placeholder={'genres'}
          value={[]}
          onApply={function (ids: number[], allElements?: FilterProps[]): void {
            throw new Error('Function not implemented.');
          }}
          icon={undefined}
        />
        <div className="">
          <CustomDatePicker
            value={{
              fromDate: null,
              toDate: null,
            }}
            onApply={function (patch: {
              fromDate: string | null;
              toDate: string | null;
            }): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </section>
  );
}
