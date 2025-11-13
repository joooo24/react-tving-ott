import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = (movieId) => {
    return api.get(`/movie/${movieId}/reviews`);
};

export const useMovieReviewsQuery = (movieId) => {
    return useQuery({
        queryKey: ["movie-reviews", movieId],
        queryFn: () => fetchMovieReviews(movieId),
        select: (results) => results.data,
        enabled: !!movieId, // movieId가 있을 때만 실행
    });
};