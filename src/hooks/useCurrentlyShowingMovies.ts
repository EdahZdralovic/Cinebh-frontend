import { useQuery } from '@tanstack/react-query';
import { getCurrentlyShowingMovies } from '../services/movieService.ts';
import type { MainCardResponse } from './useMainCards.ts';
import type { Filters } from '../types/Filters.ts';

export function useCurrentlyShowingMovies(
  filters: Filters,
  type: string,
  page: number,
  size: number
) {
  const { data, isLoading, isError, error } = useQuery<MainCardResponse>({
    queryKey: [filters, 'currently-cards', page, size],
    queryFn: () => getCurrentlyShowingMovies(type, filters, page, size),
    staleTime: 1000 * 60 * 5,
  });

  return {
    currentlyCards: data?.content ?? [],
    loading: isLoading,
    error: isError ? error : null,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    pageNumber: data?.pageNumber ?? 0,
  };
}
