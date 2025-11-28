import { formatDate } from '../../../utils/dateUtils';

interface StartEndDateSectionProps {
  tempStart: Date | null;
  tempEnd: Date | null;
}

export default function StartEndDateSection({
  tempStart,
  tempEnd,
}: StartEndDateSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mx-2 px-2 text-[#1D2939] py-3 bg-white">
      <div className="border z-40 text-start p-2 px-3 border-gray-200 rounded-xl">
        <div className="text-xs text-gray-500 font-thin">Start Date</div>
        <div className="text-sm font-normal">
          {tempStart ? formatDate(tempStart) : 'Choose date'}
        </div>
      </div>
      <div className="border text-start p-2 px-3 z-40 border-gray-200 rounded-xl">
        <div className="text-xs text-gray-500 font-medium">End Date</div>
        <div className="text-sm">
          {tempEnd ? formatDate(tempEnd) : 'Choose date'}
        </div>
      </div>
    </div>
  );
}
