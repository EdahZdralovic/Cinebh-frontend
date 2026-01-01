import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from '../../services/axiosInstance.tsx';
import { ROUTES } from '../../utils/Constants.ts';
import type { BuyTicketDto } from '../../types/ProjectionSeatLayout.ts';

export const useBookingForPayment = (bookingId: number) => {
  const { data, isLoading, error } = useQuery<BuyTicketDto, AxiosError>({
    queryKey: ['booking-payment', bookingId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        ROUTES.GET_PAYMENT_PAGE(bookingId)
      );
      return data;
    },
    enabled: !!bookingId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    booking: data,
    loading: isLoading,
    error,
  };
};
