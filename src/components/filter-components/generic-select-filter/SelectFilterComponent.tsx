import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import useFilterData from '../../../hooks/filter-hooks/useFilterData.ts';
import SelectFilterSkeleton from './SelectFilterSkeleton.tsx';
import { useToggleElements } from '../../../hooks/filter-hooks/useToggleElements.ts';
import { useClickOutside } from '../../../hooks/filter-hooks/useClickOutside.ts';
import type { FilterProps, FilterTypeProps } from '../../../types/Filters.ts';
import { useInitialSelectedIds } from '../../../hooks/filter-hooks/useInitialSelectedIds.ts';

export default function SelectFilterComponent({
  endpoint,
  params,
  placeholder,
  value,
  onApply,
  icon,
  isOpen,
  onToggle,
  singleSelect = false,
}: FilterTypeProps) {
  const { elements, loading, error } = useFilterData<FilterProps>(
    endpoint,
    params
  );

  const initialSelectedIds = useInitialSelectedIds(value, elements);
  const { selected, toggle, setSelected } =
    useToggleElements(initialSelectedIds);

  const handleApply = () => {
    onToggle?.();
    onApply(selected, elements);
  };

  const handleCancel = () => {
    setSelected([]);
    onApply([]);
  };

  useClickOutside(isOpen, () => {
    handleApply();
  });

  const isSingleLocked = singleSelect && selected.length === 1;

  const selectedNames = elements
    .filter((el) => selected.includes(el.id))
    .map((el) => el.name);

  if (loading) return <SelectFilterSkeleton />;
  if (error) return <p>Error loading...</p>;

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
            {elements.map((el) => {
              const isSelected = selected.includes(el.id);
              const isDisabled = isSingleLocked && !isSelected;
              return (
                <li
                  key={el.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isDisabled) return; // 🔒 STOP
                    toggle(el.id);
                  }}
                  className={
                    'px-3 py-2 text-sm flex items-center truncate rounded-md ' +
                    (isSelected ? 'bg-[#FDE3E3] font-bold' : '') +
                    (isDisabled
                      ? ' opacity-50 cursor-not-allowed'
                      : ' cursor-pointer hover:bg-gray-100')
                  }
                >
                  {el.name}
                </li>
              );
            })}
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
