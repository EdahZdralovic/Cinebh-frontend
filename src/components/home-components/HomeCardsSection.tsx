import MainCard from '../cards/MainCard.tsx';
import ArrowButton, { ArrowDirection } from '../buttons/ArrowButton.tsx';
import { Link } from 'react-router-dom';
import type {MainCardProps} from "../../types/Cards.ts";

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
}

export default function HomeCardsSection({
  cards,
  isMovie,
  totalElements,
  totalPages,
  pageNumber,
  sectionName,
  onPreviousPage,
  onNextPage,
  seeAllLink,
}: HomeSectionProps) {
  return (
    <section className="flex justify-center px-[4%] items-center text-[var(--color-primary)]">
      <div className=" relative w-full lg:mx-10 mt-8 rounded-3xl h-full items-center ">
        <div className="flex justify-between align-middle  ">
          <h1 className=" sm:text-3xl text-xl font-bold ">{sectionName}</h1>
          <h6 className="text-[var(--color-secondary)] text-md pt-4 font-semibold">
            <Link to={seeAllLink}>See All</Link>
          </h6>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 pt-4">
          {cards.map((card) => (
            <MainCard
              coverImageUrl={card.coverImageUrl}
              title={card.title}
              duration={card.duration}
              movieGenres={card.movieGenres}
              isMovie={isMovie}
              street={card.street}
              redStrip={false}
              projectionStart={card.projectionStart}
            />
          ))}
        </div>
        <div className="flex flex-row justify-end items-center gap-4 pt-6 font-thin mb-10 text-md ">
          <div>
            <span> Showing </span>
            <span className="font-semibold">
              {pageNumber * 4 + cards.length}
            </span>
            <span> out of </span>
            <span className="font-semibold">{totalElements}</span>
          </div>
          <ArrowButton
            onClick={onPreviousPage}
            disabled={pageNumber === 0}
            direction={ArrowDirection.Left}
          />
          <ArrowButton
            onClick={onNextPage}
            disabled={pageNumber === totalPages - 1}
            direction={ArrowDirection.Right}
          />
        </div>
      </div>
    </section>
  );
}
