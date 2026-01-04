import { useQuery } from '@tanstack/react-query';

import type { Filters } from '../../types/Filters';
import { getMovieDetailsProjections } from '../../services/filterService.ts';

export function useMovieProjections(movieId: number, filters: Filters) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movie-projections', movieId, filters],
    queryFn: () => getMovieDetailsProjections(movieId, filters),
    staleTime: 1000 * 60 * 5,
  });

  return {
    projections: Array.isArray(data) ? data : (data?.content ?? []),
    loading: isLoading,
    error: isError ? error : null,
  };
}
