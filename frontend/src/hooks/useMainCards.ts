import {useQuery} from "@tanstack/react-query";
import {getMovies} from "../services/movieService.ts";
import type {MainCardProps} from "../components/Cards/MainCard.tsx";


interface MainCardResponse {
    content: MainCardProps[];
    totalPages: number;
    totalElements: number;
    pageNumber: number;
}

export function useMainCards(page: number, size: number, type: string) {
    const {data, isLoading, isError, error,} = useQuery<MainCardResponse>({
        queryKey: ["main-cards", type, page, size],
        queryFn: () => getMovies(type, page, size),
        staleTime: 1000 * 60 * 5, //jel oke 5 minuta da traje do iduceg fetcha
    });

    return {
        mainCard: data?.content ?? [],
        loading: isLoading,
        error: isError ? error : null,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
        pageNumber: data?.pageNumber ?? 0,
    }
}
