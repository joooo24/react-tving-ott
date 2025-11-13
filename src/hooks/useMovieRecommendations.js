import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendations = (movieId) => {
    return api.get(`/movie/${movieId}/recommendations`);
};

export const useMovieRecommendationsQuery = (movieId) => {
    return useQuery({
        queryKey: ["movie-recommendations", movieId],
        queryFn: () => fetchMovieRecommendations(movieId),
        select: (results) => results.data,
        enabled: !!movieId, // movieId가 있을 때만 실행
    });
};
