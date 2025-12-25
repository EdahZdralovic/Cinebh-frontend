import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../../hooks/movie-hooks/useMovieDetails.ts';
import { MediaContainer } from '../../components/movie-details-components/movie-description-components/MediaContainer.tsx';
import { ActorsContainer } from '../../components/movie-details-components/movie-description-components/ActorsContainer.tsx';
import { DescriptionContainer } from '../../components/movie-details-components/movie-description-components/DescriptionContainer.tsx';
import { SeeAlsoMovies } from '../../components/movie-details-components/SeeAlsoMovies.tsx';
import { RatingContainer } from '../../components/movie-details-components/movie-description-components/RatingContainer.tsx';
import { MovieUpcomingProjections } from '../../components/movie-details-components/movie-projections-components/MovieUpcomingProjections.tsx';
import { useScrollToTop } from '../../hooks/useScrollToTop.ts';
import { formatDateSecond, TEN_DAYS_FROM_NOW } from '../../utils/dateUtils.ts';
import { MovieProjections } from '../../components/movie-details-components/movie-projections-components/MovieProjections.tsx';
import { MovieDetailsSkeleton } from '../../components/movie-details-components/movie-details-skeletons/MovieDetailsSkeleton.tsx';
import { MovieNotFoundComponent } from '../../components/movie-details-components/movie-details-skeletons/MovieNotFoundComponent.tsx';

export function MovieDetails() {
  useScrollToTop();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { movie, loading, error } = useMovieDetails(movieId);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }
  if (!id || !movie) {
    return <MovieNotFoundComponent />;
  }
  if (error?.response?.status === 404) {
    return <MovieNotFoundComponent />;
  }
  if (error) {
    return (
      <MovieNotFoundComponent Not404Error={true} errorMessage={error.message} />
    );
  }

  const dateStart = formatDateSecond(movie.projectionStart);
  const dateEnd = formatDateSecond(movie.projectionEnd);
  const mediaPhotos = movie.mediaPhotoUrls;
  const trailer = movie.mediaVideoUrl;
  const genres = movie.genres;
  const members = movie.crew;
  const actors = members.filter((m) => m.role === 'ACTOR');
  const directors = members.filter((m) => m.role === 'DIRECTOR');
  const writers = members.filter((m) => m.role === 'WRITER');
  return (
    <section>
      <div
        className={
          'flex flex-col lg:mx-[6%] mx-4 md:mt-8 mt-3 text-[var(--color-primary)]  '
        }
      >
        <div>
          <h2 className={'md:text-3xl text-xl font-bold'}>Movie Details</h2>
        </div>
        {loading ? (
          <MediaContainer isSkeleton={true} />
        ) : (
          <MediaContainer videoUrl={trailer} mediaPhotos={mediaPhotos} />
        )}
        <div className={'mt-6 grid md:grid-cols-2 grid-cols-1'}>
          <div className={'flex flex-col md:pr-4'}>
            <h1
              className={
                'font-bold md:text-3xl text-xl text-[var(--color-primary)]'
              }
            >
              {loading ? 'Loading...' : movie.title}
            </h1>
            <DescriptionContainer
              pgRating={movie.pgRating}
              language={movie.language}
              duration={movie.duration}
              dateStart={dateStart}
              dateEnd={dateEnd}
              genres={genres}
              directors={directors}
              writers={writers}
              synopsis={movie.synopsis}
            />
            <div className={'md:mt-8 mt-2 flex flex-col '}>
              <ActorsContainer actors={actors} />
              <RatingContainer
                rottenTomatoesRating={movie.rottenTomatoesRating}
                imdbRating={movie.imdbRating}
              />
            </div>
          </div>
          <div className={'md:mr-6 md:ml-4'}>
            {TEN_DAYS_FROM_NOW > movie.projectionStart ? (
              <MovieProjections movieId={movieId} />
            ) : (
              <MovieUpcomingProjections
                title={movie.title}
                startDate={dateStart}
              />
            )}
          </div>
        </div>
        <div className={'md:mt-0 mt-5'}>
          <SeeAlsoMovies />
        </div>
      </div>
    </section>
  );
}
