import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (movieId) => {
    return api.get(`/movie/${movieId}/videos`);
};

export const useMovieTrailerQuery = (movieId) => {
    return useQuery({
        queryKey: ["movie-trailer", movieId],
        queryFn: () => fetchMovieDetail(movieId),
        select: (results) => results.data,
    });
};
