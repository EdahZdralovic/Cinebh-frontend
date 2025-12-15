import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import { CiFilter } from 'react-icons/ci';
import { ROUTES } from '../../utils/Constants.ts';
import type { Filters } from '../../types/Filters.ts';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';

import {
  createHandleCityApply,
  createHandleGenreApply,
  createHandleTimeApply,
  createHandleVenueApply,
  createToggleFilter,
} from '../../utils/FilterFunctions';
import {
  GenreIcon,
  LocationIcon,
  ProjectionIcon,
  VenueIcon,
} from '../../utils/icons.tsx';

type CurrentlyShowingFilterProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
};

function CurrentlyShowingFilter({
  filters,
  onChange,
}: CurrentlyShowingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const toggleFilter = createToggleFilter(setOpenFilter);
  const handleVenueApply = createHandleVenueApply(onChange);
  const handleGenreApply = createHandleGenreApply(onChange);
  const handleTimeApply = createHandleTimeApply(onChange);
  const handleCityApply = createHandleCityApply(onChange);

  return (
    <section className=" text-[var(--color-primary)]  ">
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
            endpoint={ROUTES.GENRES_FILTER_BY_DAY_ENDPOINT}
            placeholder="Genres"
            isOpen={openFilter === 'genre'}
            onToggle={() => toggleFilter('genre')}
            value={filters.genreIds}
            params={{
              selectedDate: filters.selectedDate,
              venueIds: filters.venueId,
              cityIds: filters.cityId,
              projectionTimes: filters.projectionTimes,
            }}
            valueKey="id"
            labelKey="name"
            onApply={handleGenreApply}
            icon={GenreIcon}
          />
        </div>
        <div data-filter="time" className="relative">
          <SelectFilterComponent
            endpoint={ROUTES.PROJECTIONS_FILTER_BY_DAY_ENDPOINT}
            placeholder="Projection Times"
            isOpen={openFilter === 'time'}
            onToggle={() => toggleFilter('time')}
            value={filters.projectionTimes ?? []}
            params={{
              cityId: filters.cityId,
              venueId: filters.venueId,
              genreIds: filters.genreIds,
              selectedDate: filters.selectedDate,
            }}
            valueKey="id"
            labelKey="name"
            valueType="string"
            onApply={handleTimeApply}
            icon={ProjectionIcon}
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
              : '  text-[var(--color-primary)]')
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
                value={filters.cityId}
                isOpen={openFilter === 'city'}
                onToggle={() => toggleFilter('city')}
                onApply={handleCityApply}
                icon={LocationIcon}
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
                endpoint={ROUTES.GENRES_FILTER_BY_DAY_ENDPOINT}
                placeholder="Genres"
                isOpen={openFilter === 'genre'}
                onToggle={() => toggleFilter('genre')}
                value={filters.genreIds}
                params={{
                  selectedDate: filters.selectedDate,
                  venueIds: filters.venueId,
                  cityIds: filters.cityId,
                  projectionTimes: filters.projectionTimes,
                }}
                valueKey="id"
                labelKey="name"
                onApply={handleGenreApply}
                icon={GenreIcon}
              />
            </div>
            <div data-filter="time" className="relative">
              <SelectFilterComponent
                endpoint={ROUTES.PROJECTIONS_FILTER_BY_DAY_ENDPOINT}
                placeholder="Projection Times"
                isOpen={openFilter === 'time'}
                onToggle={() => toggleFilter('time')}
                value={filters.projectionTimes ?? []}
                params={{
                  cityId: filters.cityId,
                  venueId: filters.venueId,
                  genreIds: filters.genreIds,
                  selectedDate: filters.selectedDate,
                }}
                valueKey="id"
                labelKey="name"
                valueType="string"
                onApply={handleTimeApply}
                icon={ProjectionIcon}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CurrentlyShowingFilter;
