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
  pgRating: string;
  language: string;
  duration: number;
  dateStart: string;
  dateEnd: string;
  genres: string[];
  directors: CrewMemberProps[];
  writers: CrewMemberProps[];
  synopsis: string;
}
