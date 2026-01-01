import { useQuery } from '@tanstack/react-query';
import type { ProjectionSeatLayout } from '../../types/ProjectionSeatLayout';
import { getProjectionSeatLayout } from '../../services/projectionService';
import { AxiosError } from 'axios';

export const useProjectionSeatLayout = (projectionId?: number) => {
  const { data, isLoading, error } = useQuery<ProjectionSeatLayout, AxiosError>(
    {
      queryKey: ['projection-seat-layout', projectionId],
      queryFn: () => getProjectionSeatLayout(projectionId!),
      enabled: !!projectionId,

      retry: (failureCount, error) => {
        if (error?.response?.status === 404) return false;
        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5,
      refetchOnMount: true,
    }
  );

  return {
    projectionData: data,
    loading: isLoading,
    error,
  };
};
