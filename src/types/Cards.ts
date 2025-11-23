export interface MainCardResponse {
  content: MainCardProps[];
  totalPages: number;
  totalElements: number;
  pageNumber: number;
}

export interface MainCardProps {
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
    coverImageUrl: string;
    title?: string;
    duration?: number;
    PGRating?: string;
    language?: string;
    movieGenres?: string[];
    projectionEnd?: string;
    projections?: string[];
    isSkeleton?: boolean;
}
