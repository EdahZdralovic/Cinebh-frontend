import { useQuery } from '@tanstack/react-query';
import type { MovieDetailsProps } from '../../types/MovieTypes.ts';
import { getMovieDetails } from '../../services/movieService.ts';

export function useMovieDetails(id: number) {
  const { data, isLoading, isFetching, isError, error } =
    useQuery<MovieDetailsProps>({
      queryKey: ['movie-details', id],
      queryFn: () => getMovieDetails(id as number),
      enabled: !!id,
      staleTime: 1000 * 60 * 5,
    });

  return {
    movie: data,
    loading: isLoading,
    fetching: isFetching,
    error: isError ? error : null,
  };
}
