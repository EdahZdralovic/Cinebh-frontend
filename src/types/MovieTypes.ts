import type { MainCardProps } from './Cards.ts';
import type { ReactNode } from 'react';

export interface CrewMemberProps {
  fullName: string;
  characterName: string | null;
  role: string;
}

export interface MovieDetailsProps {
  id: number;
  title: string;
  language: string;
  synopsis: string;
  duration: number;
  coverImageUrl: string;
  pgRating: string;
  imdbRating: number;
  rottenTomatoesRating: number;
  genres: string[];
  mediaPhotoUrls: string[];
  mediaVideoUrl: string;
  crew: CrewMemberProps[];
  projectionStart: string;
  projectionEnd: string;
}

export interface DescriptionContainerProps {
  pgRating: string | ReactNode;
  language: string | ReactNode;
  duration: number | ReactNode;
  dateStart: string;
  dateEnd: string;
  genres: string[];
  directors: CrewMemberProps[];
  writers: CrewMemberProps[];
  synopsis: string;
}

export interface Projection {
  id: number;
  name: string;
}

export interface HomeSectionProps {
  cards: MainCardProps[];
  sectionName: string;
  pageNumber: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  totalElements: number;
  isMovie: boolean;
  seeAllLink: string;
  sectionForVenues: boolean;
  loading: boolean;
}

export interface ActorsContainerProps {
  actors: CrewMemberProps[];
}

export interface MovieUpcomingProjectionsProps {
  title: string;
  startDate: string;
  isSkeleton?: boolean;
}
