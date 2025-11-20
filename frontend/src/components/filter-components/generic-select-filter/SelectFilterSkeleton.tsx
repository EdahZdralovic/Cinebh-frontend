import { RiLoader2Fill } from 'react-icons/ri';
export default function SelectFilterSkeleton() {
  return (
    <div className="flex justify-start pl-2 items-center h-12 border rounded-md shadow-sm text-gray-500 bg-white animate-pulse border-gray-300">
      <RiLoader2Fill className={'pr-2 size-7'} /> Loading...
    </div>
  );
}
