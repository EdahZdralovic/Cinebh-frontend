export interface MainCardResponse {
  content: MainCardProps[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

export interface MainCardProps {
  id?: number;
  coverImageUrl: string;
  title: string;
  duration?: number;
  movieGenres?: string[];
  street?: string;
  isMovie?: boolean;
  synopsis?: string;
  redStrip?: boolean;
  projectionStart?: string;
}
export interface CurrentlyShowingCardProps {
  id?: number;
  coverImageUrl: string;
  title?: string;
  duration?: number;
  pgRating?: string;
  language?: string;
  movieGenres?: string[];
  projectionEnd?: string;
  projectionTimes?: string[];
  isSkeleton?: boolean;
}
