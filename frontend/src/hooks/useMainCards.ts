import { useQuery } from '@tanstack/react-query';
import { getCards } from '../services/movieService.ts';
import type { MainCardProps } from '../components/cards/MainCard.tsx';

export interface MainCardResponse {
  content: MainCardProps[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

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
