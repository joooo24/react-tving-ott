import { useQueries } from "@tanstack/react-query";
import api from "../utils/api";

const MAX_PAGES = 500; // 500페이지 (20개씩)

const fetchSearchMovies = ({ keyword, page }) => {
    return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`) : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword }) => {
    const queries = useQueries({
        queries: Array.from({ length: MAX_PAGES }, (_, i) => i + 1).map((page) => ({
            queryKey: ["movie-search", { keyword, page }],
            queryFn: () => fetchSearchMovies({ keyword, page }),
            select: (results) => results.data?.results || [],
        })),
    });

    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);
    const error = queries.find((query) => query.error)?.error;

    // 모든 결과를 하나의 배열로 합치기
    const allMovies = queries.map((query) => query.data || []).flat();

    return {
        data: allMovies,
        isLoading,
        isError,
        error,
    };
};
