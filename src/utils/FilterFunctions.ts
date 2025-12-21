import type { FilterProps, Filters } from '../types/Filters';

export function createToggleFilter(setOpenFilter: Function) {
  return function toggleFilter(name: string) {
    setOpenFilter((prev: string | null) => (prev === name ? null : name));
  };
}

export function createHandleSearch(
  onChange: (patch: Partial<Filters>) => void
) {
  return function handleSearch(q: string) {
    if (q.length >= 3) {
      onChange({ q });
    } else if (q.length === 0) {
      onChange({ q: '' });
    }
  };
}

export function createHandleVenueApply(
  onChange: (patch: Partial<Filters>) => void,
  singleVenue = false
) {
  return function handleVenueApply(
    selectedVenueIds: number[],
    venuesList?: FilterProps[]
  ) {
    const venueId = singleVenue
      ? selectedVenueIds.slice(0, 1)
      : selectedVenueIds;

    if (!venuesList) {
      return onChange({ venueId });
    }

    const matchedCities = venuesList
      .filter((v) => venueId.includes(v.id))
      .map((v) => v.location.id);

    onChange({
      venueId,
      cityId: [...new Set(matchedCities)],
    });
  };
}

export function createHandleGenreApply(
  onChange: (patch: Partial<Filters>) => void
) {
  return function handleGenreApply(ids: number[]) {
    onChange({ genreIds: ids });
  };
}

export function createHandleTimeApply(
  onChange: (patch: Partial<Filters>) => void
) {
  return function handleTimeApply(
    selectedIds: number[],
    allItems?: FilterProps[]
  ) {
    if (!allItems) return;

    const times = allItems
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => item.name);

    onChange({ projectionTimes: times });
  };
}

export function createHandleCityApply(
  onChange: (patch: Partial<Filters>) => void
) {
  return function handleCityApply(ids: number[]) {
    onChange({ cityId: ids });
  };
}
