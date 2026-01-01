import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '../../utils/Constants';
import axiosInstance from '../../services/axiosInstance.tsx';

export function useCreatePayment() {
  const mutation = useMutation({
    mutationFn: async (bookingId: number): Promise<string> => {
      const { data } = await axiosInstance.post(
        ROUTES.CREATE_PAYMENT_INTENT_POST(bookingId)
      );
      return data.clientSecret;
    },
  });

  return {
    createPaymentIntent: mutation.mutateAsync,
    clientSecret: mutation.data,
    loading: mutation.isPending,
    error: mutation.isError ? mutation.error : null,
  };
}
