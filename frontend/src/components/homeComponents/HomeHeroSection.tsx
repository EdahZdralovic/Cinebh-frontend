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
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p></p>;
    if (!movies || movies.length === 0) return; //bez ovoga zna nekada crashat home


    const movie = movies[movieNumber];

    const genre = movie.movieGenres?.[0]
    const variants = {
        enter: {opacity: 0, y: -50, scale: 1.02,},
        center: {opacity: 1, y: 0, scale: 1, transition: {duration: 0.8, ease: [0.45, 0, 0.55, 1],
            },
        },
        exit: {
            opacity: 0,
            y: 50, // klizi lagano dole
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };


    return (
        <section>
            <AnimatePresence mode="wait">
            <motion.div key={movie.coverImageUrl}
                 variants={variants} initial="enter" animate="center" exit="exit"
                 transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                 className=" bg-center flex justify-end flex-col bg-cover sm:aspect-[16/8] aspect-[9/16] transition-all duration-[1000ms] ease-[cubic-bezier(0.45,0,0.55,1)] "
                 style={{backgroundImage: `url(${movie.coverImageUrl})`}}>
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