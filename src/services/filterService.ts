import axiosInstance from './axiosInstance.tsx';

type FilterParams = {
  venueIds?: number[];
  cityId?: number[];
};

export async function getFilterData(type: string, params?: FilterParams) {
  try {
    const endpoint = (() => {
      switch (type) {
        case 'genres-upcoming':
          return '/genres/by-venues/upcoming';
        case 'genres-currently':
          return '/genres/by-day';
        case 'locations':
          return '/locations';
        case 'venues':
          return '/venues/all';
        case 'projections':
          return '/projections/times';
        default:
          throw new Error(`Unknown filter type: ${type}`);
      }
    })();

    const { data } = await axiosInstance.get(endpoint, { params });
    return data;
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
}
