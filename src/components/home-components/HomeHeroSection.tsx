import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GenreButton from '../buttons/GenreButton.tsx';

import { useMainCards } from '../../hooks/useMainCards.ts';
import { HeroButton } from '../buttons/HeroButton.tsx';
import { HomeCardsErrorMessage } from './HomeCardsErrorMessage.tsx';
import { HomeHeroSkeleton } from './HomeHeroSkeleton.tsx';
import { ROUTES } from '../../utils/Constants.ts';
import { HomeHeroVariants } from '../../utils/animations.ts';

function HomeHeroSection() {
  const COUNT = 3;
  const { mainCards, loading, error } = useMainCards(
    0,
    3,
    ROUTES.CURRENTLY_SHOWING
  );
  const [movieNumber, setMovieNumber] = useState(0);
  const movies = mainCards;
  useEffect(() => {
    const interval = setInterval(() => {
      setMovieNumber((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, [movieNumber]);

  if (loading) return <HomeHeroSkeleton />;
  if (error)
    return (
      <HomeCardsErrorMessage
        errorMessage={error.message}
        errorCode={error.name}
      />
    );
  if (!movies || movies.length === 0) return <HomeHeroSkeleton />;

  const movie = movies[movieNumber];
  const genre = movie.movieGenres?.[0];

  return (
    <section>
      <AnimatePresence mode="wait">
        <motion.div
          key={movieNumber}
          variants={HomeHeroVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative hero-zoom overflow-hidden bg-center flex justify-end flex-col bg-cover sm:aspect-[16/8] aspect-[8/16]"
          style={{ backgroundImage: `url(${movie.coverImageUrl})` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/55  to-transparent pointer-events-none" />
          <div className="relative pl-[6%] pb-[10%] flex flex-col text-white  items-start justify-end font-bold">
            <GenreButton name={genre} />
            <h1 className="mt-3 sm:text-5xl text-xl">{movie.title}</h1>
            <p className="sm:text-xl text-sm pt-4 leading-relaxed font-semibold sm:max-w-[50%] max-w-[70%]">
              {' '}
              {movie.synopsis}
            </p>
          </div>

          <div className="relative  pb-6 left-1/2-translate-x-1/2 flex justify-center gap-6 ">
            {Array.from({ length: COUNT }).map((_, i) => (
              <HeroButton
                 isActive={movieNumber === i}
                onClick={() => setMovieNumber(i)}
                key={i}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default HomeHeroSection;
