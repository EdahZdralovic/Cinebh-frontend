import 'react-datepicker/dist/react-datepicker.css';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import SearchInput from '../filter-components/search-filter/SearchInput.tsx';
import { SlLocationPin } from 'react-icons/sl';
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { MdOutlineAccessTime } from 'react-icons/md';
import type { FilterProps, Filters } from '../../types/Filters.ts';

type CurrentlyShowingFilterProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
};

const LocationIcon = <SlLocationPin />;
const VenueIcon = <HiOutlineOfficeBuilding />;
const GenreIcon = <BiCameraMovie />;
const ProjectionIcon = <MdOutlineAccessTime />;

export default function CurrentlyShowingFilter({
  filters,
  onChange,
}: CurrentlyShowingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  function toggleFilter(name: string) {
    setOpenFilter((prev) => (prev === name ? null : name));
  }
  return (
    <section className="mt-4 text-[var(--color-primary)]  ">
      <SearchInput
        value={filters.q}
        onSearch={(q) =>
          q.length >= 3 ? onChange({ q }) : onChange({ q: '' })
        }
      />
      <div className=" sm:grid-cols-4 grid-cols-1 mt-4 hidden lg:grid gap-4 h-10 justify-evenly ">
        <div data-filter="city" className="relative">
          <SelectFilterComponent
            endpoint="/locations"
            placeholder="Cities"
            isOpen={openFilter === 'city'}
            onToggle={() => toggleFilter('city')}
            value={filters.cityId}
            onApply={(ids: number[]) => onChange({ cityId: ids })}
            icon={LocationIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
        <div data-filter="venue" className="relative">
          <SelectFilterComponent
            endpoint="/venues/all"
            placeholder="Cinemas"
            value={filters.venueId}
            isOpen={openFilter === 'venue'}
            onToggle={() => toggleFilter('venue')}
            onApply={(selectedVenueIds, venuesList?: FilterProps[]) => {
              if (!venuesList) {
                return onChange({ venueId: selectedVenueIds });
              }

              const matchedCities = venuesList
                .filter((v) => selectedVenueIds.includes(v.id))
                .map((v) => v.location.id);

              onChange({
                venueId: selectedVenueIds,
                cityId: [...new Set(matchedCities)],
              });
            }}
            icon={VenueIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
        <div data-filter="genre" className="relative">
          <SelectFilterComponent
            endpoint="/genres/by-day"
            placeholder="Genres"
            isOpen={openFilter === 'genre'}
            onToggle={() => toggleFilter('genre')}
            value={filters.genreIds}
            params={{
              selectedDate: filters.selectedDate,
              venueIds: filters.venueId,
              cityIds: filters.cityId,
            }}
            valueKey="id"
            labelKey="name"
            onApply={(ids: number[]) => onChange({ genreIds: ids })}
            icon={GenreIcon}
          />
        </div>
        <div data-filter="time" className="relative">
          <SelectFilterComponent
            endpoint="/projections/times"
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
            onApply={(selectedIds: number[], allItems?: FilterProps[]) => {
              if (!allItems) return;
              const times = allItems
                .filter((item) => selectedIds.includes(item.id))
                .map((item) => item.name);

              onChange({ projectionTimes: times });
            }}
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
                endpoint="/locations"
                placeholder="Cities"
                value={filters.cityId}
                isOpen={openFilter === 'city'}
                onToggle={() => toggleFilter('city')}
                onApply={(ids: number[]) => onChange({ cityId: ids })}
                icon={LocationIcon}
              />
            </div>
            <div data-filter="venue" className="relative">
              <SelectFilterComponent
                endpoint="/venues/all"
                placeholder="Cinemas"
                value={filters.venueId}
                isOpen={openFilter === 'venue'}
                onToggle={() => toggleFilter('venue')}
                onApply={(selectedVenueIds, venuesList?: FilterProps[]) => {
                  if (!venuesList) {
                    return onChange({ venueId: selectedVenueIds });
                  }

                  const matchedCities = venuesList
                    .filter((v) => selectedVenueIds.includes(v.id))
                    .map((v) => v.location.id);

                  onChange({
                    venueId: selectedVenueIds,
                    cityId: [...new Set(matchedCities)],
                  });
                }}
                icon={VenueIcon}
                params={{ cityId: filters.cityId }}
              />
            </div>
            <div data-filter="genre" className="relative">
              <SelectFilterComponent
                endpoint="/genres/by-day"
                placeholder="Genres"
                isOpen={openFilter === 'genre'}
                onToggle={() => toggleFilter('genre')}
                value={filters.genreIds}
                params={{
                  selectedDate: filters.selectedDate,
                  venueIds: filters.venueId,
                  cityIds: filters.cityId,
                }}
                valueKey="id"
                labelKey="name"
                onApply={(ids: number[]) => onChange({ genreIds: ids })}
                icon={GenreIcon}
              />
            </div>
            <div data-filter="time" className="relative">
              <SelectFilterComponent
                endpoint="/projections/times"
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
                onApply={(selectedIds: number[], allItems?: FilterProps[]) => {
                  if (!allItems) return;
                  const times: string[] = allItems
                    .filter((item) => selectedIds.includes(item.id))
                    .map((item) => item.name);

                  onChange({ projectionTimes: times });
                }}
                icon={ProjectionIcon}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
