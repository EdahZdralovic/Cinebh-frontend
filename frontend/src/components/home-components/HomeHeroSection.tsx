import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useMainCards } from '../../hooks/useMainCards.ts';
import { HeroButton } from '../buttons/HeroButton.tsx';

export function HomeHeroSection() {
  const { mainCards, loading, error } = useMainCards(
    2,
    3,
    'movies/currently-showing'
  );
  const [movieNumber, setMovieNumber] = useState(0);
  const movies = mainCards;
  useEffect(() => {
    const interval = setInterval(() => {
      setMovieNumber((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, [movieNumber]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p></p>;
  if (!movies || movies.length === 0) return null;

  const movie = movies[movieNumber];

  const genre = movie.movieGenres?.[0];
  const variants = {
    enter: {
      opacity: 0.3,
      x: 200,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: {
      opacity: 0.3,
      x: -200,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section>
      <AnimatePresence mode="wait">
        <motion.div
          key={movieNumber} // Changed from movie.coverImageUrl
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative hero-zoom overflow-hidden bg-center flex justify-end flex-col bg-cover sm:aspect-[16/8] aspect-[9/16]"
          style={{ backgroundImage: `url(${movie.coverImageUrl})` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[60%]  bg-gradient-to-t from-black/55  to-transparent pointer-events-none" />
          <div className="relative pl-[6%] pb-[10%] flex flex-col text-white  items-start justify-end font-bold">
            <button className="sm:h-[32px] h-6 px-4 mb-2 w-auto font-thin text-[12px] text-[var(--color-primary)]  bg-gray-200 rounded-[8px] ">
              {genre}
            </button>
            <h1 className="mt-3 sm:text-5xl text-xl">{movie.title}</h1>
            <p className="sm:text-xl text-sm pt-4 leading-relaxed font-semibold max-w-[80%]">
              {' '}
              {movie.synopsis}
            </p>
          </div>

          <div className="relative  pb-6 left-1/2-translate-x-1/2 flex justify-center gap-6 ">
            <HeroButton
              isActive={movieNumber === 0}
              onClick={() => setMovieNumber(0)}
            />
            <HeroButton
              isActive={movieNumber === 1}
              onClick={() => setMovieNumber(1)}
            />
            <HeroButton
              isActive={movieNumber === 2}
              onClick={() => setMovieNumber(2)}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
