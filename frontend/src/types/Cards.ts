import type { MainCardProps } from '../components/cards/MainCard.tsx';

export interface MainCardResponse {
  content: MainCardProps[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}
