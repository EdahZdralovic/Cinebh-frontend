import 'react-datepicker/dist/react-datepicker.css';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import SearchInput from '../filter-components/search-filter/SearchInput.tsx';
import { SlLocationPin } from 'react-icons/sl';
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { MdOutlineAccessTime } from 'react-icons/md';

type Filters = {
  cityId: number[];
  venueId: number[];
  genreIds: number[];
  selectedDate: string | null;
  projectionTimes: string[] | null;
  q: string;
};

type UpcomingFilterProps = {
  filters?: Filters;
  onChange?: (patch: Partial<Filters>) => void;
};

const LocationIcon = <SlLocationPin />;
const VenueIcon = <HiOutlineOfficeBuilding />;
const GenreIcon = <BiCameraMovie />;
const ProjectionIcon = <MdOutlineAccessTime />;

export default function CurrentlyShowingFilter({
  filters,
  onChange,
}: UpcomingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  function toggleFilter(name: string) {
    setOpenFilter((prev) => (prev === name ? null : name));
  }
  return (
    <section className="mt-4 text-[var(--color-primary)]  ">
      <SearchInput value={filters.q} onSearch={(q) => onChange({ q })} />
      <div className=" sm:grid-cols-4 grid-cols-1 mt-4 hidden lg:grid gap-4 h-10 justify-evenly ">
        <div data-filter="city" className="relative">
          <SelectFilterComponent
            endpoint="locations"
            placeholder="Cities"
            isOpen={openFilter === 'city'}
            onToggle={() => toggleFilter('city')}
            value={filters.cityId}
            onApply={(ids) => onChange({ cityId: ids })}
            icon={LocationIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
        <div data-filter="venue" className="relative">
          <SelectFilterComponent
            endpoint="venues"
            placeholder="Cinemas"
            value={filters.venueId}
            isOpen={openFilter === 'venue'}
            onToggle={() => toggleFilter('venue')}
            onApply={(selectedVenueIds) => {
              onChange({
                venueId: selectedVenueIds,
              });
            }}
            icon={VenueIcon}
            params={{ cityId: filters.cityId }}
          />
        </div>
        <div data-filter="genre" className="relative">
          <SelectFilterComponent
            endpoint="genres"
            placeholder="Genres"
            isOpen={openFilter === 'genre'}
            onToggle={() => toggleFilter('genre')}
            value={filters.genreIds}
            params={
              filters.venueId.length > 0
                ? { venueIds: filters.venueId }
                : undefined
            }
            onApply={(ids) => onChange({ genreIds: ids })}
            icon={GenreIcon}
          />
        </div>
        <div data-filter="time" className="relative">
          <SelectFilterComponent
            endpoint="projections"
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
            valueKey="name"
            labelKey="name"
            onApply={(times) => onChange({ projectionTimes: times })}
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
            <SelectFilterComponent
              endpoint="locations"
              placeholder="Cities"
              value={filters.cityId}
              onApply={(ids) => onChange({ cityId: ids })}
              icon={LocationIcon}
            />
            <SelectFilterComponent
              endpoint="venues"
              placeholder="Cinemas"
              value={filters.venueId}
              icon={VenueIcon}
              params={{ cityId: filters.cityId }}
              onApply={(selectedVenueIds, venuesList) => {
                const matchedCities = venuesList
                  .filter((v) => selectedVenueIds.includes(v.id))
                  .map((v) => v.location.id);
                onChange({
                  venueIds: selectedVenueIds,
                  cityId: [...new Set(matchedCities)],
                });
              }}
            />
            <SelectFilterComponent
              endpoint="projections"
              placeholder="Projection Times"
              value={filters.projectionTimes ?? []}
              params={{
                cityId: filters.cityId,
                venueId: filters.venueId,
                genreIds: filters.genreIds,
                selectedDate: filters.selectedDate,
              }}
              onApply={(times) => onChange({ projectionTimes: times })}
              icon={ProjectionIcon}
            />
          </div>
        )}
      </div>
    </section>
  );
}
