import type {MainCardProps} from "./Cards/MainCard.tsx";
import {useState} from "react";
import {useMainCards} from "../hooks/useMainCards.ts";

export interface HomeHeroProps {
    movies: MainCardProps[];
    totalMovies: number;
}

export function HomeHeroSection() {
    const {mainCard, loading, error} = useMainCards(0, 4, "movies/currently-showing");
    const [movieNumber, setMovieNumber] = useState(0);
    const movies = mainCard

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    if (!movies || movies.length === 0) return <p>No movies available.</p>; //bez ovoga zna nekada crashat home

    const movie = movies[movieNumber];
    const genre = movie.movieGenres?.[0]

    return (
        <section >
            <div className=" bg-center flex justify-end flex-col bg-cover aspect-[16/9] "
                 style={{backgroundImage: `url(${movie.coverImageUrl})`}}>
                <div
                    className="relative pl-[6%] pb-[10%] flex flex-col text-white  items-start justify-end font-bold">
                    <button
                        className="h-[32px] px-4 mb-2 w-auto font-thin text-[12px] text-[var(--color-primary)]  bg-gray-200 rounded-[8px] ">
                        {genre}
                    </button>
                    <h1 className="mt-3 text-5xl ">{movie.title}</h1>
                    <p className="text-xl pt-4 leading-relaxed font-semibold max-w-[80%]"> {movie.synopsis}</p>
                </div>

                <div className="relative  pb-6 left-1/2-translate-x-1/2 flex justify-center gap-6 ">
                    <button onClick={() => setMovieNumber(0)}
                            className={`h-1 w-10 rounded-xl ${movieNumber === 0 ? "bg-white" : "bg-gray-200/60 hover:bg-gray-100/60"}`}>
                    </button>
                    <button onClick={() => setMovieNumber(1)}
                            className={`h-1 w-10 rounded-xl ${movieNumber === 1 ? "bg-white " : "bg-gray-200/60 hover:bg-white"}`}>
                    </button>
                    <button onClick={() => setMovieNumber(2)}
                            className={`h-1 w-10 rounded-xl ${movieNumber === 2 ? "bg-white " : "bg-gray-200/60 hover:bg-white"}`}>
                    </button>
                </div>
            </div>
        </section>
    );
}