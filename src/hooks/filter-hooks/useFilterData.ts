import { useQuery } from '@tanstack/react-query';
import { getFilterData } from '../../services/filterService.ts';

export default function useFilterData<T>(type: string, params?: object) {
  const { data, isLoading, isError, error } = useQuery<T[]>({
    queryKey: ['filter', type, JSON.stringify(params ?? null)],
    queryFn: () => getFilterData(type, params),
    staleTime: 1000 * 60 * 5,
  });

  return {
    elements: data ?? [],
    loading: isLoading,
    error: isError ? error : null,
  };
}
