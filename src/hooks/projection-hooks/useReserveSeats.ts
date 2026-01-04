import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance.tsx';
import { ROUTES } from '../../utils/Constants.ts';

type ReservationMode = 'HOLD' | 'PAYMENT';

interface ReserveSeatsPayload {
  projectionId: number;
  seatIds: number[];
  mode: ReservationMode;
  sessionId?: string; // NEW
}

export function useReserveSeats() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      projectionId,
      seatIds,
      mode,
      sessionId,
    }: ReserveSeatsPayload) => {
      const body: any = { seatIds, mode };

      if (mode === 'PAYMENT') {
        body.sessionId = sessionId;
      }

      const { data } = await axiosInstance.post(
        ROUTES.RESERVE_SEATS_POST(projectionId),
        body
      );

      return data as number;
    },

    onSuccess: (_bookingId, variables) => {
      queryClient.invalidateQueries({
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
