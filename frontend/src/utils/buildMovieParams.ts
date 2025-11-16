
export type Filters = {
    cityId: number | null;
    venueId: number | null;
    genreIds: number[];
    fromDate: string | null;
    toDate: string | null;
    q: string;
};

export function buildMovieParams(filters: any, page = 0, size = 12) {
    const params: Record<string, any> = {page, size};
    if (filters.cityId) params.cityId = filters.cityId;
    if (filters.venueId) params.venueId = filters.venueId;
    if (filters.genreIds && filters.genreIds.length) params.genreIds = filters.genreIds.join(",");
    if (filters.fromDate) params.fromDate = filters.fromDate;
    if (filters.toDate) params.toDate = filters.toDate;
    if (filters.q && filters.q.trim()) params.q = filters.q.trim();

    return params;
}