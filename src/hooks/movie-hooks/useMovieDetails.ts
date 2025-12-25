import { useQuery } from '@tanstack/react-query';
import type { MovieDetailsProps } from '../../types/MovieTypes.ts';
import { getMovieDetails } from '../../services/movieService.ts';
import { AxiosError } from 'axios';

export function useMovieDetails(id: number) {
  const { data, isLoading, error } = useQuery<MovieDetailsProps, AxiosError>({
    queryKey: ['movie-details', id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    movie: data,
    loading: isLoading,
    error,
  };
}
