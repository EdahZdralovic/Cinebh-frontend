import { useEffect, useState } from "react";
import axios from "axios";
import { type MainCardProps } from "../components/cards/MainCard";

interface MoviesResponse {
    content: MainCardProps[];
    totalPages: number;
    totalElements: number;
    number: number;
}

export function useMovies(page: number, size: number) {
    const [movies, setMovies] = useState<MainCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/movies?page=${page}&size=${size}`
                );
                setMovies(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("errorr", error);
                setError("ggreška");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page, size]);

    return { movies, loading, error, totalPages };
}
