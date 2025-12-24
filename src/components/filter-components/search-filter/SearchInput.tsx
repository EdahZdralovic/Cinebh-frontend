import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useDebounce } from '../../../hooks/useDebounce.ts';

type SearchInputProps = {
  value?: string;
  onSearch?: (query: string) => void;
};

export default function SearchInput({
  value = '',
  onSearch = () => {},
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const debounce = useDebounce(localValue, 1000);

  useEffect(() => {
    onSearch(debounce);
  }, [debounce]);

  return (
    <div
      className={
        'flex w-full h-12 border rounded-md bg-white items-center drop-shadow-md justify-start ' +
        (isOpen ? 'border-[var(--color-secondary)]  ' : 'border-gray-200')
      }
    >
      <IoSearchOutline
        className={'ml-4   text-xl text-[var(--color-primary)]'}
      />
      <input
        type="text"
        placeholder="Search Movies"
        value={localValue}
        onClick={() => {
          setIsOpen(true);
        }}
        onChange={(e) => (isOpen ? setLocalValue(e.target.value) : null)}
        className="w-full border-none focus:outline-none pl-2 border-gray-300 placeholder:text-gray-500 placeholder:font-extralight "
      />
    </div>
  );
}
