import { useQuery } from '@tanstack/react-query';
import type { ProjectionSeatLayout } from '../../types/ProjectionSeatLayout.ts';
import { getProjectionSeatLayout } from '../../services/projectionService.ts';

export const useProjectionSeatLayout = (projectionId?: number) => {
  return useQuery<ProjectionSeatLayout>({
    queryKey: ['projection-seat-layout', projectionId],
    queryFn: () => getProjectionSeatLayout(projectionId!),
    enabled: !!projectionId,
  });
};
