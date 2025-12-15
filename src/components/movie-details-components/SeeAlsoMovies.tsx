import { useMainCards } from '../../hooks/movie-hooks/useMainCards.ts';
import { ROUTES } from '../../utils/Constants.ts';
import { MiniMovieCard } from '../cards/MiniMovieCard.tsx';
import ArrowButton, { ArrowDirection } from '../buttons/ArrowButton.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MiniMovieSkeletonCard } from '../cards/MiniMovieSkeletonCard.tsx';

export function SeeAlsoMovies() {
  const [page, setPage] = useState(0);
  const size = 6;
  const { mainCards, loading, error, totalPages, totalElements } = useMainCards(
    page,
    size,
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
        {mainCards.map((miniCard, index) => (
          <Link to={`/movies/${miniCard.id}`}>
            <MiniMovieCard
              title={miniCard.title}
              coverImageUrl={miniCard.coverImageUrl}
              key={index}
              loading={loading}
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-row justify-end items-center gap-4  pt-6 font-thin mb-10 text-md ">
        <div>
          <span> Showing </span>
          <span className="font-semibold">{page * 6 + mainCards.length}</span>
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
