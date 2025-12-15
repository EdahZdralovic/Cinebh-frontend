import SelectFilterComponent from '../../filter-components/generic-select-filter/SelectFilterComponent.tsx';
import { ROUTES } from '../../../utils/Constants.ts';
import { useState } from 'react';
import {
  createHandleCityApply,
  createHandleVenueApply,
  createToggleFilter,
} from '../../../utils/FilterFunctions.ts';
import type { Filters } from '../../../types/Filters.ts';
import { LocationIcon, VenueIcon } from '../../../utils/icons.tsx';
import DayDateButton from '../../buttons/DayDateButton.tsx';
import { generateNext10Days } from '../../../utils/dateUtils.ts';
import ArrowButton, { ArrowDirection } from '../../buttons/ArrowButton.tsx';

interface MovieDetailsProjectionsFilterProps {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}
export function MovieDetailsProjectionsFilter({
  filters,
  onChange,
}: MovieDetailsProjectionsFilterProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const toggleFilter = createToggleFilter(setOpenFilter);
  const handleVenueApply = createHandleVenueApply(onChange);
  const handleCityApply = createHandleCityApply(onChange);
  const days = generateNext10Days();
  const [dayIndex, setDayIndex] = useState(0);
  const visibleDays = days.slice(dayIndex, dayIndex + 6);
  const canGoLeft = dayIndex > 0;
  const canGoRight = dayIndex < days.length - 6;

  return (
    <section>
      <div
        className={
          'grid md:grid-cols-2 grid-col-1 gap-3 relative overflow-visible  max-h-12  '
        }
      >
        <div data-filter="city" className="relative  ">
          <SelectFilterComponent
            endpoint={ROUTES.LOCATION_FILTER_ENDPOINT}
            placeholder="Cities"
            isOpen={openFilter === 'city'}
            onToggle={() => toggleFilter('city')}
            value={filters.cityId}
            onApply={handleCityApply}
            icon={LocationIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
        <div data-filter="venue" className="relative">
          <SelectFilterComponent
            endpoint={ROUTES.VENUE_FILTER_ENDPOINT}
            placeholder="Cinemas"
            value={filters.venueId}
            isOpen={openFilter === 'venue'}
            onToggle={() => toggleFilter('venue')}
            onApply={handleVenueApply}
            icon={VenueIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
      </div>
      <div
        className={
          'grid md:grid-cols-6 grid-cols-3 gap-5 col-span-2 md:mt-6 mt-[24%]  '
        }
      >
        {visibleDays.map((day, index) => (
          <DayDateButton
            key={index}
            date={day}
            isActive={day.toISOString().split('T')[0] === filters.selectedDate}
            onClick={() => {
              if (onChange) {
                onChange({
                  selectedDate: day.toISOString().split('T')[0],
                });
              }
            }}
          />
        ))}
      </div>
      <div className={'flex justify-end col-span-2 gap-5 mt-6 '}>
        <ArrowButton
          onClick={() => canGoLeft && setDayIndex(dayIndex - 4)}
          disabled={!canGoLeft}
          direction={ArrowDirection.Left}
        />
        <ArrowButton
          onClick={() => canGoRight && setDayIndex(dayIndex + 4)}
          direction={ArrowDirection.Right}
          disabled={!canGoRight}
        />
      </div>
    </section>
  );
}
