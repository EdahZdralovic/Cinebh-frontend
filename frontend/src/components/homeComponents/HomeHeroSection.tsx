import type { MainCardProps } from "../cards/MainCard.tsx";
import {useEffect, useState} from "react";
import { useMainCards } from "../../hooks/useMainCards.ts";
import { HeroButton } from "../buttons/HeroButton.tsx";
import { motion, AnimatePresence } from "framer-motion";

export function HomeHeroSection() {
    const {mainCard, loading, error} = useMainCards(0, 3, "movies/currently-showing");
    const [movieNumber, setMovieNumber] = useState(0);
    const movies = mainCard

    useEffect(() => {
        const interval = setInterval(() => {
            setMovieNumber((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p></p>;
    if (!movies || movies.length === 0) return; //bez ovoga zna nekada crashat home
    const movie = movies[movieNumber];
    const genre = movie.movieGenres?.[0]


    return (
        <section className="bg-black">
            <AnimatePresence  mode="wait" initial={false}>
                <motion.div
                    key={movie.coverImageUrl}
                    className="hero-bg fade-in bg-center flex justify-end flex-col bg-cover sm:aspect-[16/8] aspect-[9/16] overflow-hidden"
                    style={{ backgroundImage: `url(${movie.coverImageUrl})` }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "0%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <img src={movies[(movieNumber + 1) % 3]?.coverImageUrl}
                         style={{ position: "absolute", width: 0, height: 0, opacity: 0}}
                     alt={"hero photo"} />

                    <div className="relative pl-[6%] pb-[10%]  flex flex-col text-white  items-start justify-end font-bold">
                    <button className="sm:h-[32px] h-6 px-4 mb-2 w-auto font-thin text-[12px] text-[var(--color-primary)]  bg-gray-200 rounded-[8px] ">
                        {genre}
                    </button>
                    <h1 className="mt-3 sm:text-5xl text-xl">{movie.title}</h1>
                    <p className="sm:text-xl text-sm pt-4 leading-relaxed font-semibold max-w-[80%]"> {movie.synopsis}</p>
                </div>

                <div className="relative  pb-6 left-1/2-translate-x-1/2 flex justify-center gap-6 ">
                    <HeroButton isActive={movieNumber === 0} onClick={() => setMovieNumber(0)} />
                    <HeroButton isActive={movieNumber === 1} onClick={() => setMovieNumber(1)} />
                    <HeroButton isActive={movieNumber === 2} onClick={() => setMovieNumber(2)} />
                </div>
                    </motion.div>
                </AnimatePresence>

        </section>
    );
}