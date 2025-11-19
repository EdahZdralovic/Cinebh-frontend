import 'react-datepicker/dist/react-datepicker.css';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import SearchInput from '../filter-components/search-filter/SearchInput.tsx';
import { SlLocationPin } from 'react-icons/sl';
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';

type Filters = {
  cityId: number[];
  venueId: number[];
  genreIds: number[];
  selectedDate: string | null;
  projectionTimes: string[] | null;
  q: string;
};

type UpcomingFilterProps = {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
};

const LocationIcon = <SlLocationPin />;
const VenueIcon = <HiOutlineOfficeBuilding />;
const GenreIcon = <BiCameraMovie />;

export default function CurrentlyShowingFilter({
  filters,
  onChange,
}: UpcomingFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mt-4 text-[var(--color-primary)]  ">
      <SearchInput value={filters.q} onSearch={(q) => onChange({ q })} />
      <div className=" sm:grid-cols-4 grid-cols-1 mt-4 hidden lg:grid gap-4 h-10 justify-evenly ">
        <SelectFilterComponent
          endpoint="locations"
          placeholder="Cities"
          value={filters.cityId}
          onApply={(ids) => onChange({ cityId: ids })}
          icon={LocationIcon}
          params={{ venueIds: filters.venueId }}
        />
        <SelectFilterComponent
          endpoint="venues"
          placeholder="Cinemas"
          value={filters.venueId}
          onApply={(selectedVenueIds, venuesList) => {
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
        <SelectFilterComponent
          endpoint="genres"
          placeholder="Genres"
          value={filters.genreIds}
          params={{ venueIds: filters.venueId }}
          onApply={(ids) => onChange({ genreIds: ids })}
          icon={GenreIcon}
        />
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
              endpoint="genres"
              params={{ venueIds: filters.venueId }}
              placeholder="Genres"
              value={filters.genreIds}
              onApply={(ids) => onChange({ genreIds: ids })}
              icon={GenreIcon}
            />
          </div>
        )}
      </div>
    </section>
  );
}
