import 'react-datepicker/dist/react-datepicker.css';
import { CustomDatePicker } from '../filter-components/custom-date-picker/CustomDatePicker.tsx';
import SelectFilterComponent from '../filter-components/generic-select-filter/SelectFilterComponent.tsx';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BiCameraMovie } from 'react-icons/bi';
import SearchInput from '../filter-components/search-filter/SearchInput.tsx';
import { SlLocationPin } from 'react-icons/sl';
import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import type { FilterProps, UpcomingFilterProps } from '../../types/Filters.ts';

const LocationIcon = <SlLocationPin />;
const VenueIcon = <HiOutlineOfficeBuilding />;
const GenreIcon = <BiCameraMovie />;

export default function UpcomingFilter({
  filters,
  onChange,
}: UpcomingFilterProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  function toggleFilter(name: string) {
    setOpenFilter((prev) => (prev === name ? null : name));
  }
  const [isOpen, setIsOpen] = useState(false);

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
            endpoint="locations"
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
            endpoint="venues"
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
            endpoint="genres-upcoming"
            placeholder="Genres"
            isOpen={openFilter === 'genre'}
            onToggle={() => toggleFilter('genre')}
            value={filters.genreIds}
            params={
              filters.venueId.length > 0
                ? { venueIds: filters.venueId }
                : undefined
            }
            onApply={(ids: number[]) => onChange({ genreIds: ids })}
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
                endpoint="locations"
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
                endpoint="venues"
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
                endpoint="genres-upcoming"
                placeholder="Genres"
                isOpen={openFilter === 'genre'}
                onToggle={() => toggleFilter('genre')}
                value={filters.genreIds}
                params={{ venueIds: filters.venueId }}
                onApply={(ids: number[]) => onChange({ genreIds: ids })}
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
