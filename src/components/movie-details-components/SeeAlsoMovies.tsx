import { useMainCards } from '../../hooks/movie-hooks/useMainCards.ts';
import { IMAGE_ROUTES, NUMBERS, ROUTES } from '../../utils/Constants.ts';
import { MiniMovieCard } from '../cards/MiniMovieCard.tsx';
import ArrowButton, { ArrowDirection } from '../buttons/ArrowButton.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SeeAlsoMovies() {
  const [page, setPage] = useState(0);
  const { mainCards, loading, totalPages, totalElements } = useMainCards(
    page,
    NUMBERS.SIX,
    ROUTES.CURRENTLY_SHOWING
  );

  function nextPage() {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  }
  function previousPage() {
    setPage((p) => Math.max(p - 1, 0));
  }
  return (
    <section className={'text-[var(--color-primary)]'}>
      <h2 className={'text-xl font-bold'}>See Also</h2>
      <div className={' grid md:grid-cols-6 grid-cols-2  md:gap-4 gap-2 my-4'}>
        {loading
          ? Array.from({ length: NUMBERS.SIX }).map((_, i) => (
              <MiniMovieCard
                key={i}
                coverImageUrl={IMAGE_ROUTES.GRAY_PHOTO}
                isSkeleton={true}
              />
            ))
          : mainCards.map((miniCard, index) => (
              <Link to={ROUTES.MOVIE_DETAILS_ROUTE(miniCard.id)}>
                <MiniMovieCard
                  title={miniCard.title}
                  coverImageUrl={miniCard.coverImageUrl}
                  key={index}
                  isSkeleton={false}
                />
              </Link>
            ))}
      </div>
      <div className="flex flex-row justify-end items-center gap-4  pt-6 font-thin mb-10 text-md ">
        <div>
          <span> Showing </span>
          <span className="font-semibold">
            {page * NUMBERS.SIX + mainCards.length}
          </span>
          <span> out of </span>
          <span className="font-semibold">{totalElements}</span>
        </div>

        <ArrowButton
          onClick={previousPage}
          disabled={page === 0}
          direction={ArrowDirection.Left}
        />
        <ArrowButton
          onClick={nextPage}
          disabled={page === totalPages - 1}
          direction={ArrowDirection.Right}
        />
      </div>
    </section>
  );
}
