import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../services/movieService.ts";
import type { MainCardResponse } from "./useMainCards.ts";

export function useUpcomingMovies(filters: {
                                      cityId: null; venueId: null; genreIds: number[]; fromDate: string | null;
                                      toDate: string | null; q: string
                                  },
                                  type: string, page: number, size: number) {
    const {data, isLoading, isError, error} = useQuery<MainCardResponse>({
        queryKey: [filters, "upcoming-cards", page, size],
        queryFn: () => getUpcomingMovies(type, filters, page, size),
        staleTime: 1000 * 60 * 5,
    });

    return {
        upcomingCards: data?.content ?? [],
        loading: isLoading,
        error: isError ? error : null,
        totalPages: data?.totalPages ?? 0,
        totalElements: data?.totalElements ?? 0,
        pageNumber: data?.pageNumber ?? 0,

    }
}