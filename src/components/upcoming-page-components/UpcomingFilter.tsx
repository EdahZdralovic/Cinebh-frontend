import 'react-datepicker/dist/react-datepicker.css';
import { CustomDatePicker } from '../filter-components/custom-date-picker/CustomDatePicker.tsx';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';

import SearchInput from '../filter-components/search-filter/SearchInput.tsx';
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import type { UpcomingFilterProps } from '../../types/Filters.ts';
import { ROUTES } from '../../utils/Constants.ts';
import {
  createHandleCityApply,
  createHandleGenreApply,
  createHandleSearch,
  createHandleVenueApply,
} from '../../utils/FilterFunctions.ts';
import { GenreIcon, LocationIcon, VenueIcon } from '../../utils/icons.tsx';

export default function UpcomingFilter({
  filters,
  onChange,
}: UpcomingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  function toggleFilter(name: string) {
    setOpenFilter((prev) => (prev === name ? null : name));
  }

  const handleSearch = createHandleSearch(onChange);
  const handleVenueApply = createHandleVenueApply(onChange);
  const handleGenreApply = createHandleGenreApply(onChange);
  const handleCityApply = createHandleCityApply(onChange);

  return (
    <section className="mt-4 text-[var(--color-primary)]  ">
      <SearchInput value={filters.q} onSearch={handleSearch} />
      <div className=" sm:grid-cols-4 grid-cols-1 mt-4 hidden lg:grid gap-4 h-10 justify-evenly ">
        <div data-filter="city" className="relative">
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
        <div data-filter="genre" className="relative">
          <SelectFilterComponent
            endpoint={ROUTES.GENRE_FILTER_UPCOMING_ENDPOINT}
            placeholder="Genres"
            isOpen={openFilter === 'genre'}
            onToggle={() => toggleFilter('genre')}
            value={filters.genreIds}
            params={
              filters.venueId.length > 0
                ? { venueIds: filters.venueId }
                : undefined
            }
            onApply={handleGenreApply}
            icon={GenreIcon}
          />
        </div>
        <div data-filter="date" className="relative">
          <CustomDatePicker
            value={{ fromDate: filters.fromDate, toDate: filters.toDate }}
            onToggle={() => toggleFilter('date')}
            onApply={({ fromDate, toDate }) => onChange({ fromDate, toDate })}
          />
        </div>
      </div>

      <div
        className={'lg:hidden grid  items-center text-[var(--color-primary)]'}
      >
        <button
          className={
            'bg-white flex  justify-start border items-center  rounded-md w-full h-12 ' +
            (isOpen
              ? ' text-[var(--color-secondary)] '
              : ' text-[var(--color-primary)]')
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiFilter className={'ml-3 mr-3 '} /> Filters
        </button>
        {isOpen && (
          <div className={'grid grid-cols-1'}>
            <div data-filter="city" className="relative">
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
            <div data-filter="genre" className="relative">
              <SelectFilterComponent
                endpoint={ROUTES.GENRE_FILTER_UPCOMING_ENDPOINT}
                placeholder="Genres"
                isOpen={openFilter === 'genre'}
                onToggle={() => toggleFilter('genre')}
                value={filters.genreIds}
                params={{ venueIds: filters.venueId }}
                onApply={handleGenreApply}
                icon={GenreIcon}
              />
            </div>
            <div data-filter="date" className="relative">
              <CustomDatePicker
                value={{ fromDate: filters.fromDate, toDate: filters.toDate }}
                onToggle={() => toggleFilter('date')}
                onApply={({ fromDate, toDate }) =>
                  onChange({ fromDate, toDate })
                }
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
