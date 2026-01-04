import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../services/axiosInstance';
import { BRANDS_OF_BANK_CARDS, ROUTES } from '../../utils/Constants';

export interface CardDto {
  id: string;
  maskedNumber: string;
  brand: BRANDS_OF_BANK_CARDS;
  expMonth: number;
  expYear: number;
}

export const useSavedCards = () => {
  const { data, isLoading, error } = useQuery<CardDto[]>({
    queryKey: ['saved-cards'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(ROUTES.GET_SAVED_CARDS());
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    cards: data ?? [],
    loadingCards: isLoading,
    error,
  };
};
