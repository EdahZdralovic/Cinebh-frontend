import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '../../utils/Constants';
import axiosInstance from '../../services/axiosInstance.tsx';

interface ReserveSeatsPayload {
  projectionId: number;
  seatIds: number[];
}

export function useReserveSeats() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ projectionId, seatIds }: ReserveSeatsPayload) => {
      const { data } = await axiosInstance.post(
        ROUTES.RESERVE_SEATS_POST(projectionId),
        seatIds
      );
      return data as number; // bookingId
    },

    onSuccess: (_bookingId, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['projection-seat-layout', variables.projectionId],
      });
      queryClient.refetchQueries({
        queryKey: ['projection-seat-layout', variables.projectionId],
      });
    },
  });

  return {
    reserveSeats: mutation.mutateAsync,
    bookingId: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError ? mutation.error : null,
  };
}
