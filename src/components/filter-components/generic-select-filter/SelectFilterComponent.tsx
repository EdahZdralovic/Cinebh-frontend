import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { type ReactNode } from 'react';
import useFilterData from '../../../hooks/useFilterData.ts';
import SelectFilterSkeleton from './SelectFilterSkeleton.tsx';
import { useToggleElements } from '../../../hooks/useToggleElements.ts';
import { useClickOutside } from '../../../hooks/useClickOutside.ts';
import type { FilterProps, FilterTypeProps } from '../../../types/Filters.ts';

export default function SelectFilterComponent({
  endpoint,
  params,
  placeholder,
  value,
  onApply,
  icon,
  isOpen,
  onToggle,
}: FilterTypeProps) {
  const { elements, loading, error } = useFilterData<FilterProps>(
    endpoint,
    params
  );

  const { selected, toggle, setSelected } = useToggleElements(value);

  useClickOutside(isOpen, () => {
    onToggle?.();
    handleApply();
  });

  if (loading) return <SelectFilterSkeleton />;
  if (error) return <p>Error loading...</p>;

  const handleApply = () => {
    onToggle?.();
    onApply(selected, elements);
  };

  const handleCancel = () => {
    onToggle?.();
    setSelected([]);
    onApply([]);
  };

  const selectedNames = elements
    .filter((el) => selected.includes(el.id))
    .map((el) => el.name);

  return (
    <section>
      <div
        className={`relative rounded-lg ${isOpen ? 'border-2 border-red-200' : ''}`}
      >
        <div
          onClick={() => onToggle?.()}
          className={
            'flex justify-between bg-white items-center h-12 border rounded-md shadow-sm ' +
            (isOpen ? 'border-[var(--color-secondary)]' : 'border-gray-200')
          }
        >
          <div className="flex items-center">
            <span
              className={
                'ml-3 ' +
                (isOpen
                  ? 'text-[var(--color-secondary)]'
                  : 'text-[var(--color-primary)]')
              }
            >
              {icon}
            </span>

            <span className="pl-2 text-gray-500 truncate overlay text-wrap max-h-12">
              {selectedNames.length === 0
                ? `All ${placeholder}`
                : selectedNames.join(', ')}
            </span>
          </div>

          <span
            onClick={(e) => {
              e.stopPropagation();
              onToggle?.();
            }}
            className={
              'mr-2 ' +
              (isOpen ? 'text-[var(--color-secondary)]' : 'text-gray-500')
            }
          >
            {isOpen ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="relative mt-1 w-full bg-white border rounded-md shadow-lg max-h-64 overflow-y-auto z-50">
          <ul>
            {elements.map((el) => (
              <li
                key={el.id}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(el.id);
                }}
                className={
                  'px-3 py-2 text-sm cursor-pointer flex items-center truncate  ' +
                  (selected.includes(el.id)
                    ? 'bg-[#FDE3E3] font-bold rounded-md'
                    : '')
                }
              >
                {el.name}
              </li>
            ))}
          </ul>

          <div className="flex justify-end p-2 gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-[#B22222] border border-[#B22222] rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-xl"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
