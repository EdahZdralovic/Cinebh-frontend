import { useQuery } from '@tanstack/react-query';
import { getCards } from '../../services/movieService.ts';
import type { MainCardResponse } from '../../types/Cards.ts';
export type { MainCardResponse } from '../../types/Cards.ts';

export function useMainCards(page: number, size: number, type: string) {
  const { data, isLoading, isError, error } = useQuery<MainCardResponse>({
    queryKey: ['main-cards', type, page, size],
    queryFn: () => getCards(type, page, size),
    staleTime: 1000 * 60 * 5,
  });
  return {
    mainCards: data?.content ?? [],
    loading: isLoading,
    error: isError ? error : null,
    totalPages: data?.totalPages ?? 0,
    totalElements: data?.totalElements ?? 0,
    pageNumber: data?.pageNumber ?? 0,
  };
}
